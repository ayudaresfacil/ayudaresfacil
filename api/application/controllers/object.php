<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Object extends REST_Controller{

	public function index_get(){

		$status = 404;
		$return["result"] = "NOOK";
		
		$subcategory = $this->get("subcategoryId");
		$category = $this->get("categoryId");
		
		if ($subcategory) {
			if ($category) {
			$objects = CI_Object::getBySubcategory($category, $subcategory);
			}	
		}else{
			$objects = CI_Object::getObjects();		
		}

		if($objects){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($objects as $key => $object) {
				$myObject = CI_Object::getData($object);
				$return["data"][$key] = $myObject;
			} 
		}
		$this->response($return, $status);
	}
}