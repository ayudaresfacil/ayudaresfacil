<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Offer extends REST_Controller {

	public function index_get(){

		$status = 404;
		$return["result"] = "NOOK";

		$id = $this->get("publicationId"); 
		$userId = $this->get("userId");
		$userLog = $this->get("userLog");
		
		if ($userId) {
			if ($userLog) {
				$offers = CI_Offer::getWithFavoritesAndUserLog($userLog, $userId);
			}else{
				$offers = CI_Offer::getByUser($userId);					
			}
			$userId = NULL;
			$userLog = NULL;			   
			$id = NULL;			   
		}elseif ($userLog){
			if ($id) {
				$offers = CI_Offer::getByIdAndUserLog($id, $userLog);
			}else{
				$offers = CI_Offer::getWithFavorites($userLog);
			}
			$userId = NULL;
			$userLog = NULL;			   
			$id = NULL;			   
		}elseif($id){
			$offers = CI_Offer::getById($id);	
			$userId = NULL;
			$userLog = NULL;			   
			$id = NULL;			   
		}else{
			$offers = CI_Offer::getCurrentOffers();
		}

		// ma($offers);
		if($offers){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($offers as $key => $offer) {
				$myOffer = CI_Offer::getData($offer);
				$return["data"][$key] = $myOffer;
			} 
		}
		$this->response($return, $status);
	}

	public function index_post(){
		
		// checkIsLoggedIn($this);
		$status = 404;
		$return["result"] = "NOOK";
		$arrOptions['publicationId'] = ($this->post('publicationId') > 0) ? $this->post('publicationId') : 0;

		$arrOptions['user'] = $this->post('userId');
		$arrOptions['type'] = '1';
		$arrOptions['creationDate'] = $this->post('creationDate');
		$arrOptions['title'] = $this->post('title');
		$arrOptions['description'] = $this->post('description');
		$arrOptions['expirationDate'] = $this->post('expirationDate');
		$arrOptions['category'] = $this->post('categoryId');
		$arrOptions['subcategory'] = $this->post('subcategoryId');
		$arrOptions['views'] = $this->post('views');
		$arrOptions['processState'] = $this->post('processStateId');
		$arrOptions['object'] = $this->post('objectId');
		$arrOptions['quantity'] = $this->post('quantity');
		$arrOptions['image'] = $this->post('image');
		$arrOptions['processStateIdOffer'] = $this->post('processStateIdOffer');
		$arrOptions['offerTypeId'] = '3';
		$arrOptions['quantityUsersToPaused'] = '1';

		$offer = CI_Offer::getDataFromArray($arrOptions);

		if ($offer <> NULL) {
			$arrInfo['user'] = $arrOptions['user'];
			$arrInfo['type'] = $arrOptions['type'];
			$arrInfo['image'] = $arrOptions['image'];
			$arrInfo['offer'] = $offer;
			
			$id = CI_Offer::save($arrInfo);
			if($id <> NULL){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";			
				$return["publicationId"] = $id;
				$myOffer = CI_Offer::getData($offer);	
				$return["data"] = $myOffer;
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
			$offer = CI_Offer::getById($publicationId);
			if(CI_Offer::delete($offer[0])){
				$status = 200;
				$return["result"] = "OK";
			}
		}
		$this->response($return, $status);
	}

	public function pause_post(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";
		$publicationId = ($this->post('publicationId') > 0) ? $this->post('publicationId') :0;

		if($publicationId > 0){
			$offer = CI_Offer::getById($publicationId);
			if(CI_Offer::pause($offer[0])){
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
		$offers = CI_Offer::getFavoritesByUser($userId);

		if($offers){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($offers as $key => $offer) {
				$myOffer = CI_Offer::getData($offer);
				$return["data"][$key] = $myOffer;
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
			$offer = CI_Offer::getById($arrOptions['publicationId']);
			$arrOptions['offer'] = $offer[0];

			if ($this->post('del') == 'true') {
				if(CI_Offer::deleteFromFavorites($arrOptions)){
					$status = 200;
					$return["result"] = "OK";
				}
			}else{
				if(CI_Offer::setAsFavorite($arrOptions)){
					$status = 200;
					$return["result"] = "OK";
				}
			}
		}
		$this->response($return, $status);
	}

	public function state_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";

		$publicationId = $this->get("publicationId");
		$offers = CI_Offer::getById($publicationId);
		$state = " ";

		if($offers){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($offers as $key => $offer) {
				$myOffer = CI_Offer::getData($offer);
				$state = $myOffer->processStateOffer;
				$return["data"][$key] = $state->id;
			} 
		}
		$this->response($return, $status);
	}

	public function changestate_post(){
		
		checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";       
		$publicationId = $this->post('publicationId');
		$state = $this->post('state');

		$arrOptions = "";
		
		if($publicationId > 0){
			$offers = CI_Offer::getById($publicationId);

			foreach ($offers as $key => $offer) {
				$myOffer = CI_Offer::getData($offer);
				$arrOptions["offer"] = $myOffer;
				$arrOptions["state"] = $state;
			} 

			if(CI_Offer::changeState($arrOptions)){
				$status = 200;
				$return["result"] = "OK";
			}
		}
		$this->response($return, $status);
	}

	public function type_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->get('publicationId');

		if($arrOptions['publicationId'] > 0){
			$offers = CI_Offer::getById($arrOptions['publicationId']);
			
			if($offers){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";

				foreach ($offers as $key => $offer) {
					$myOffer = CI_Offer::getData($offer);
					$type = $myOffer->type;
					$return["data"][$key] = $type->id;
				} 
			}
			$this->response($return, $status);
		}
	}	

	public function quantity_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = $this->get('publicationId');

		if($arrOptions['publicationId'] > 0){
			$offers = CI_Offer::getById($arrOptions['publicationId']);
			
			if($offers){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";

				foreach ($offers as $key => $offer) {
					$myOffer = CI_Offer::getData($offer);
					$type = $myOffer->quantityUsersToPaused;
					$return["data"][$key] = $type;
				} 
			}
			$this->response($return, $status);
		}
	}

	public function expired_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$arrOptions['userId'] = $this->get('userId');

		if($arrOptions['userId'] > 0){
			$offers = CI_Offer::getExpiredByUser($arrOptions['userId']);
			
			if($offers){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";

				foreach ($offers as $key => $offer) {
					$myOffer = CI_Offer::getData($offer);
					$return["data"][$key] = $myOffer;
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
			$images = CI_Offer::getImages($arrOptions['publicationId']);
			
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
}
