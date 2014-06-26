<?php

class CI_Request extends CI_Publication {
		
	public function getDataFromArray($options){
		$request = parent::getDataFromArray($options);
		return $request;
	}

	public function getData($options){
		$request = parent::getData($options);
		return $request;
	}

	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$request = parent::getInstance($row);
		return $request;
	}

	public static function getById($id){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return = CI_Request::getInstance($result);
			}
		}
		return $return;
	}


	/*
	public static function getRequests(){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getRequests();
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getById($id){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getById($id);
		$return = array();
		if(!empty($results)){
			$return = self::getInstance($results[0]);
		}
		return $return;
	}

	public static function getRequestsByUserId($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getRequestsByUserId($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getMonetaryRequestsByUserId($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getMonetaryRequestsByUserId($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getObjectRequestsByUserId($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getObjectRequestsByUserId($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getFavoritesByUserId($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getFavoritesByUserId($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}*/
}