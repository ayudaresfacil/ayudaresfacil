<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class City extends REST_Controller{

	public function index_get(){

		$id = $this->get("id"); 
		$departmentId = $this->get("departmentId"); 

		if($id){
			$cities =  CI_City::getById($id);
		}elseif($departmentId){
			$cities =  CI_City::getCitiesByDepartmentId($departmentId);
		}

		$status = 404;
		$return["result"] = "NOOK";
		if($cities){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";
			foreach ($cities as $key => $city) {
			 	$myCity = new stdClass();
				$myCity->id = $city->getId();
				$myCity->description = $city->getDescription();
				$return["data"][$key] = $myCity;
			 }

		}

        $this->response($return, $status);
	}
}
