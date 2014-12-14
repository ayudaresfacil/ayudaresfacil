<?php

class CI_Province {
	private $id;
	private $description;

	public function getId() {return $this->id;}
	
	public function getDescription(){return ucwords(strtolower($this->description));}
	public function setDescription($description){$this->description = $description;}

	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */
	private function getData(){
		$object = new stdClass();
		$object->id = $this->id;
		$object->description = $this->description;
		return $object;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$province = new self;
		$province->id = (isset($row->province_id)) ? $row->province_id : 0;
		$province->description = (isset($row->description)) ? $row->description : '';
		return $province;
	}
	
	public static function getProvinces()
	{
		$CI = & get_instance();
		$CI->load->model('province_model');
		$results = $CI->province_model->getProvinces();
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getProvinceByDepartmentId($id)
	{
		$CI = & get_instance();
		$CI->load->model('province_model');
		$results = $CI->province_model->getProvinceByDepartmentId($id);
		$return = array();
		if(!empty($results)){
			$return = self::getInstance($results[0]);
		}
		return $return;
	}
		
	public static function getById($id)
	{
		$CI = & get_instance();
		$CI->load->model('province_model');
		$results = $CI->province_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}
}
