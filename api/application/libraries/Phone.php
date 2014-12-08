<?php

class CI_Phone {
	private $id;
	private $number;
	private $areaCode;
	private $typeId;

	public function getId() {return $this->id;}
	
	public function getNumber(){return $this->number;}
	public function setNumber($number){$this->number = $number;}
	
	public function getAreaCode(){return $this->areaCode;}
	public function setAreaCode($areaCode){$this->areaCode = $areaCode;}

	public function getTypeId(){return $this->typeId;}
	public function setTypeId($typeId){$this->typeId = $typeId;}
	
	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */
	public function getData($options){
		$object = new stdClass();
		$object->id = $options->id;
		$object->number = $options->number;
		$object->areaCode = $options->areaCode;
		$object->typeId = $options->typeId;
		return $object;
	}

	public function getDataFromArray($options){
		$phones = null;
		foreach ($options as $key => $phone){
				 	$myUserPhone = new stdClass();
					$myUserPhone->number = $phone->getNumber();
					$myUserPhone->areaCode = $phone->getAreaCode();
					$myUserPhone->typeId = $phone->getTypeId();
					$phones[$key] = $myUserPhone;
				}
		return $phones;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$phone = new self;
		$phone->id = (isset($row->user_id)) ? $row->user_id : 0;
		$phone->number = (isset($row->number)) ? $row->number : '';
		$phone->areaCode = (isset($row->area_code)) ? $row->area_code : '';
		$phone->typeId = (isset($row->type_phone_id)) ? $row->type_phone_id : '';
		return $phone;
	}
	
	public static function getPhonesByUserId($userId)
	{
		$CI = & get_instance();
		$CI->load->model('phone_model');
		$results = $CI->phone_model->getPhonesByUserId($userId);
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
		$CI->load->model('phone_model');
		$results = $CI->phone_model->getPhoneById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return = self::getInstance($result);
			}
		}
		return $return;
	}
	
	public function save($userId){
		$return = TRUE;
		$CI = & get_instance();
		$CI->load->model('phone_model');
		$data = $this->getData($this);
		$data->userId = $userId;
		$this->id = $CI->phone_model->create($data);
		
		if($this->id === null)
			$return = FALSE;
		
		return $return;
	}
	
	public function delete()
	{
		$CI =& get_instance();
		$CI->load->model('phone_model');
		return $CI->phone_model->delete($this->id);
	}

	static public function deleteByUserId($userId)
	{
		$CI =& get_instance();
		$CI->load->model('phone_model');
		return $CI->phone_model->deleteByUserId($userId);
	}
}
