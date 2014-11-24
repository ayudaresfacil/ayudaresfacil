<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Category extends REST_Controller{

	public function index_get(){

		$status = 404;
		$return["result"] = "NOOK";
	
		$categories = CI_Category::getCategories();
	
		if($categories){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($categories as $key => $category) {
				$myCategory = CI_Category::getData($category);
				$return["data"][$key] = $myCategory;
			} 
		}
		$this->response($return, $status);
	}
}