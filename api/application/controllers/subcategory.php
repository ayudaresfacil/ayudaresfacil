<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Subcategory extends REST_Controller{

	public function index_get(){

		$status = 404;
		$return["result"] = "NOOK";
		
		$category = $this->get("categoryId");

		if ($category) {
			$subcategories = CI_Subcategory::getByCategory($category);	
		}else{
			$subcategories = CI_Subcategory::getSubcategories();		
		}

		if($subcategories){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($subcategories as $key => $subcategory) {
				$mySubcategory = CI_Subcategory::getData($subcategory);
				$return["data"][$key] = $mySubcategory;
			} 
		}
		$this->response($return, $status);
	}
}