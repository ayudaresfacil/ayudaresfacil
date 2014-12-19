<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Request extends REST_Controller{

	public function index_get(){

		$status = 404;
		$return["result"] = "NOOK";

		$id = $this->get("publicationId"); 
		$userId = $this->get("userId");
		$userLog = $this->get("userLog");
		
		if ($userId) {
			if ($userLog) {
				$requests = CI_Request::getWithFavoritesAndUserLog($userLog, $userId);
			}else{
				$requests = CI_Request::getByUser($userId);					
			}
			$userId = NULL;
			$userLog = NULL;			   
			$id = NULL;			   
		}elseif ($userLog){
			if ($id) {
				$requests = CI_Request::getByIdAndUserLog($id, $userLog);
			}else{
				$requests = CI_Request::getWithFavorites($userLog);
			}
			$userId = NULL;
			$userLog = NULL;			   
			$id = NULL;			   
		}elseif($id){
			$requests = CI_Request::getById($id);	
			$userId = NULL;
			$userLog = NULL;			   
			$id = NULL;			   
		}else{
			$requests = CI_Request::getCurrentRequests();
		}

		if($requests){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($requests as $key => $request) {
				$myRequest = CI_Request::getData($request);
				$return["data"][$key] = $myRequest;
			} 
		}
		$this->response($return, $status);
	}

	public function index_post(){
		
		//checkIsLoggedIn($this);
		$status = 404;
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = ($this->post('publicationId') > 0) ? $this->post('publicationId') : 0;
		$arrOptions['user'] = $this->post('userId');
		$arrOptions['type'] = '2';
		$arrOptions['title'] = $this->post('title');
		$arrOptions['description'] = $this->post('description');
		$arrOptions['expirationDate'] = mdate("%Y/%m/%d %H:%i:%s", $this->post('expirationDate'));
		$arrOptions['creationDate'] = '';
		$arrOptions['category'] = $this->post('categoryId');
		$arrOptions['subcategory'] = $this->post('subcategoryId');
		$arrOptions['views'] = $this->post('views');
		$arrOptions['processState'] = $this->post('processStateId');
		$arrOptions['object'] = $this->post('objectId');
		$arrOptions['quantity'] = $this->post('quantity');
		$arrOptions['image'] = $this->post('image');
		$arrOptions['votes'] = $this->post('votes');
		$arrOptions['sponsors'] = $this->post('sponsors');
		$arrOptions['sponsorsn'] = $this->post('sponsorsn');

		$request = CI_Request::getDataFromArray($arrOptions);

		if ($request <> NULL) {
			$arrInfo['user'] = $arrOptions['user'];
			$arrInfo['type'] = $arrOptions['type'];
			$arrInfo['image'] = $arrOptions['image'];
			$arrInfo['sponsors'] = $arrOptions['sponsors'];
			$arrInfo['sponsorsn'] = $arrOptions['sponsorsn'];
			$arrInfo['request'] = $request;

			$id = CI_Request::save($arrInfo);

			if($id <> NULL){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";			
				$return["publicationId"] = $id;
				$myRequest = CI_Request::getData($request);	
				$return["data"] = $myRequest;
                
                if(isset($arrOptions['sponsorsn'])){
                    foreach ($arrOptions['sponsorsn'] as $key => $sponsor) {
                        $myMsj = "$sponsor[label] Han pedido que seas el padrino de http://localhost/ayudaresfacil/client/build/#/detalle-mi-pedido/$id Ingresa para saber mas :)";
                        sendTweet($myMsj);
                    } 
                }
			}
		}
		$this->response($return, $status);
	}

	public function delete_post(){

		// checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";
		$publicationId = ($this->post('publicationId') > 0) ? $this->post('publicationId') :0;

		if($publicationId > 0){
			$request = CI_Request::getById($publicationId);
			if(CI_Request::delete($request[0])){
				$status = 200;
				$return["result"] = "OK";
			}
		}
		$this->response($return, $status);
	}

	public function favorite_get(){

		//checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";
		
		$userId = $this->get("userId");
		$requests = CI_Request::getFavoritesByUser($userId);

		if($requests){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($requests as $key => $request) {
				$myRequest = CI_Request::getData($request);
				$return["data"][$key] = $myRequest;
			} 
		}
		$this->response($return, $status);
	}

	public function favorite_post(){

		//checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->post('publicationId');
		$arrOptions['userId'] = $this->post('userId');

		if($arrOptions['publicationId'] > 0){
			$request = CI_Request::getById($arrOptions['publicationId']);
			$arrOptions['request'] = $request[0];

			if ($this->post('del') == 'true') {
				if(CI_Request::deleteFromFavorites($arrOptions)){
					$status = 200;
					$return["result"] = "OK";
				}
			}else{
				if(CI_Request::setAsFavorite($arrOptions)){
					$status = 200;
					$return["result"] = "OK";
				}
			}
		}
		$this->response($return, $status);
	}

	public function monetary_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";

		$userId = $this->get("userId");

		if($userId) {
			$requests = CI_Request::getMonetaryRequestsByUser($userId);	
		}
		
		if($requests){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($requests as $key => $request) {
				$myRequest = CI_Request::getData($request);
				$return["data"][$key] = $myRequest;
			} 
		}
		$this->response($return, $status);
	}

	public function object_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";

		$userId = $this->get("userId");
		
		if($userId) {
			$requests = CI_Request::getObjectRequestsByUser($userId);	
		}
		
		if($requests){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($requests as $key => $request) {
				$myRequest = CI_Request::getData($request);
				$return["data"][$key] = $myRequest;
			} 
		}
		$this->response($return, $status);
	}

	public function expired_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['userId'] = $this->get('userId');

		if($arrOptions['userId'] > 0){
			$requests = CI_Request::getExpiredByUser($arrOptions['userId']);
			
			if($requests){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";

				foreach ($requests as $key => $request) {
					$myRequest = CI_Request::getData($request);
					$return["data"][$key] = $myRequest;
				} 
			}
			$this->response($return, $status);
		}
	}

	public function vote_post(){
		
		//checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->post('publicationId');
		$arrOptions['userId'] = $this->post('userId');

		if($arrOptions['publicationId'] > 0){
			$request = CI_Request::getById($arrOptions['publicationId']);
			$arrOptions['request'] = $request[0];

			if ($this->post('del') == 'true') {
				if(CI_Request::deleteVote($arrOptions)){
					$status = 200;
					$return["result"] = "OK";
				}
			}else{
				if(CI_Request::setVote($arrOptions)){
					$status = 200;
					$return["result"] = "OK";
				}
			}
		}
		$this->response($return, $status);
	}

	public function vote_get(){

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->get('publicationId');

		if($arrOptions['publicationId'] > 0){
			$quantityVotes = CI_Request::getVotes($arrOptions['publicationId']);
			
			if($quantityVotes){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = $quantityVotes;
			}
			$this->response($return, $status);
		}
	}

	public function sponsor_post(){
		
		// checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->post('publicationId');
		$arrOptions['userTw'] = $this->post('userTw');

		if($arrOptions['publicationId'] > 0){
			if(CI_Request::setSponsor($arrOptions)){
				$status = 200;
				$return["result"] = "OK";
			}
		}
		$this->response($return, $status);
	}

	public function sponsord_post(){
		
		// checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		if($this->post('sponsorDel') > 0){
			if(CI_Request::deleteSponsor($this->post('sponsorDel'))){
				$status = 200;
				$return["result"] = "OK";
			}
		}
		$this->response($return, $status);
	}

	public function sponsor_get(){

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->get('publicationId');

		if($arrOptions['publicationId'] > 0){
			$sponsors = CI_Request::getSponsors($arrOptions['publicationId']);
			
			if($sponsors){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";

				foreach ($sponsors as $key => $sponsor) {
					$return["data"][$key] = $sponsor;
				} 
			}
			$this->response($return, $status);
		}	
	}

	public function image_get(){

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->get('publicationId');

		if($arrOptions['publicationId'] > 0){
			$images = CI_Request::getImages($arrOptions['publicationId']);
			
			if($images){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";

				foreach ($images as $key => $image) {
					$return["data"][$key] = $image;
				} 
			}
			$this->response($return, $status);
		}	
	}

	public function helps_get(){
		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";
		$userId = $this->get('userId');
        $requests = CI_Request::getHelpsByUser($userId);

        if($requests){
            $status = 200;
            $return["result"] = "OK";
            $return["data"] = "";

            foreach ($requests as $key => $request) {
                $myRequest = CI_Request::getData($request);
                $return["data"][$key] = $myRequest;
            } 
        }

        $this->response($return, $status);

	}
}