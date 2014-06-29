<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Request extends REST_Controller{

	public function index_get(){

		checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";

		$id = $this->get("publicationId"); 
		$userId = $this->get("userId");
		
		if($id){
			$requests = CI_Request::getById($id);	
		}elseif ($userId) {
			$requests = CI_Request::getByUser($userId);	
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
		
		checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";

		$arrOptions['publicationId'] = ($this->post('publicationId') > 0) ? $this->post('publicationId') : 0;
		$arrOptions['user'] = $this->post('userId');
		$arrOptions['type'] = $this->post('publicationTypeId');
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

		if($arrOptions['publicationId'] > 0){
			$request = CI_Request::getById($arrOptions['publicationId']);
			if ($request <> NULL) {
				$request = CI_Request::getDataFromArray($arrOptions);
			}						
		}else{
			$request = CI_Request::getDataFromArray($arrOptions);
		}

		if ($request <> NULL) {
			$arrInfo['user'] = $arrOptions['user'];
			$arrInfo['type'] = $arrOptions['type'];
			$arrInfo['request'] = $request;

			$id = CI_Request::save($arrInfo);

			if($id <> NULL){
				$status = 200;
				$return["result"] = "OK";
				$return["data"] = "";			
				$return["publicationId"] = $id;
				$myRequest = CI_Request::getData($request);	
				$return["data"] = $myRequest;
			}
		}
        $this->response($return, $status);
	}
}