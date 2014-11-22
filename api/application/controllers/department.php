<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Department extends REST_Controller{

	public function index_get(){

		$id = $this->get("id"); 
		$provinceId = $this->get("provinceId"); 

		if($id){
			$departments =  CI_Department::getById($id);
		}elseif($provinceId){
			$departments =  CI_Department::getDepartmentsByProvinceId($provinceId);
		}

		$status = 404;
		$return["result"] = "NOOK";
		if($departments){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";
			foreach ($departments as $key => $department) {
			 	$myDepartment = new stdClass();
				$myDepartment->id = $department->getId();
				$myDepartment->description = $department->getDescription();
				$return["data"][$key] = $myDepartment;
			 }

		}

        $this->response($return, $status);
	}
}
