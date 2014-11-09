<?php

class CI_Sponsor {
	private $id;
	private $userTw;

	public function getId() {return $this->id;}
	
	public function getUserTw(){return $this->userTw;}
	public function setUserTw($userTw){$this->userTw = $userTw;}
		
	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */

	public function getData($options){
		$return = array();
		foreach ($options as $key => $value) {
			$sponsor = new stdClass();
			$sponsor->id = $value->id;
			$sponsor->userTw = $value->userTw;
			$return[] = $sponsor;
		}
		return $return;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$sponsor = new CI_Sponsor();
		$sponsor->id = (isset($row->sponsor_id)) ? $row->sponsor_id : 0;
		$sponsor->userTw = (isset($row->user_tw)) ? $row->user_tw : '';
		return $sponsor;
	}
	
	public static function getSponsors()
	{
		$CI = & get_instance();
		$CI->load->model('sponsor_model');
		$results = $CI->sponsor_model->getSponsors();
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = CI_Sponsor::getInstance($result);
			}
		}
		return $return;
	}

	public static function getById($id)
	{
		$CI = & get_instance();
		$CI->load->model('sponsor_model');
		$results = $CI->sponsor_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return = CI_Sponsor::getInstance($result);
			}
		}
		return $return;
	}

	public static function getByPublicationId($publicationId)
	{
		$CI = & get_instance();
		$CI->load->model('sponsor_model');
		$results = $CI->sponsor_model->getByPublicationId($publicationId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = CI_Sponsor::getInstance($result);
			}
		}
		return $return;
	}
}

