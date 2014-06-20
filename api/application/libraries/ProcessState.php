<?php

class CI_ProcessState {
	private $id;
	private $description;

	public function getId() {return $this->id;}
	
	public function getDescription(){return $this->description;}
	public function setDescription($description){$this->description = $description;}

	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */

	public function getData($options){
		$object = new stdClass();
		$object->id = $options->id;
		$object->description = $options->description;
		return $object;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$processState = new self;
		$processState->id = (isset($row->process_state_id)) ? $row->process_state_id : 0;
		$processState->description = (isset($row->description)) ? $row->description : '';
		return $processState;
	}
	
	public static function getProcessStates()
	{
		$CI = & get_instance();
		$CI->load->model('process_state_model');
		$results = $CI->process_state_model->getProcessStates();
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}
	
	public static function getById($id)
	{
		$CI = & get_instance();
		$CI->load->model('process_state_model');
		$results = $CI->process_state_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return = self::getInstance($result);
			}
		}
		return $return;
	}
}
