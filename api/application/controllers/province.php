<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Province extends REST_Controller{

	public function index_get(){

		$id = $this->get("id"); 

		$provinces =  $id ? CI_Province::getById($id) : CI_Province::getProvinces();

		$status = 404;
		$return["result"] = "NOOK";
		if($provinces){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";

			foreach ($provinces as $key => $province) {
			 	$myProvince = new stdClass();
				$myProvince->id = $province->getId();
				$myProvince->description = $province->getDescription();
				$return["data"][$key] = $myProvince;
			 } 
		}

        $this->response($return, $status);
	}
}
