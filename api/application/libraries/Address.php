<?php

class CI_Address {
	private $id;
	private $street;
	private $number;
	private $floor;
	private $apartment;
	private $postalCode;
	private $provinceId;
	private $departmentId;
	private $cityId;
	private $principal;

	public function getId() {return $this->id;}
	
	public function getStreet(){return $this->street;}
	public function setStreet($street){$this->street = $street;}

	public function getNumber(){return $this->number;}
	public function setNumber($number){$this->number = $number;}
	
	public function getFloor(){return $this->floor;}
	public function setFloor($floor){$this->floor = $floor;}

	public function getApartment(){return $this->apartment;}
	public function setApartment($apartment){$this->apartment = $apartment;}

	public function getPostalCode(){return $this->postalCode;}
	public function setPostalCode($postalCode){$this->postalCode = $postalCode;}

	public function getProvinceId(){return $this->provinceId;}
	public function setProvinceId($provinceId){$this->provinceId = $provinceId;}
	
	public function getDepartmentId(){return $this->departmentId;}
	public function setDepartmentId($departmentId){$this->departmentId = $departmentId;}

	public function getCityId(){return $this->cityId;}
	public function setCityId($cityId){$this->cityId = $cityId;}

	public function getPrincipal(){return $this->principal;}
	public function setPrincipal($principal){$this->principal = $principal;}
	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */
	private function getData(){
		$object = new stdClass();
		$object->id = $this->id;
		$object->street = $this->street;
		$object->number = $this->number;
		$object->floor = $this->floor;
		$object->apartment = $this->apartment;
		$object->postalCode = $this->postalCode;
		$object->principal = $this->principal;
		$object->provinceId = $this->provinceId;
		$object->departmentId = $this->departmentId;
		$object->cityId = $this->cityId;
		return $object;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$address = new self;
		$address->id = (isset($row->user_id)) ? $row->user_id : 0;
		$address->street = (isset($row->street)) ? $row->street : '';
		$address->number = (isset($row->number)) ? $row->number : '';
		$address->floor = (isset($row->floor)) ? $row->floor : '';
		$address->apartment = (isset($row->apartment)) ? $row->apartment : '';
		$address->postalCode = (isset($row->postal_code)) ? $row->postal_code : '';
		$address->cityId = (isset($row->city_id)) ? $row->city_id : '';
		$address->departmentId = (isset($row->department_id)) ? $row->department_id : '';
		$address->provinceId = (isset($row->province_id)) ? $row->province_id : '';
		$address->principal = (isset($row->principal)) ? $row->principal : '';
		return $address;
	}
	
	public static function getAddressesByUserId($userId)
	{
		$CI = & get_instance();
		$CI->load->model('address_model');
		$results = $CI->address_model->getAddressesByUserId($userId);
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
		$CI->load->model('address_model');
		$results = $CI->address_model->getAddressById($id);
		$return = array();
		if(!empty($results)){
			$return = self::getInstance($results[0]);
		}
		return $return;
	}
	
	public function save($userId){
		$return = TRUE;
		$CI = & get_instance();
		$CI->load->model('address_model');
		$data = $this->getData();
		$data->userId = $userId;
		if(isset($this->id) && $this->id > 0)
			$CI->address_model->update($data);
		else{
			$this->id = $CI->address_model->create($data);
			if($this->id === null)
				$return = FALSE;
		}
		return $return;
	}
	
	public function delete()
	{
		$CI =& get_instance();
		$CI->load->model('address_model');
		return $CI->address_model->delete($this->id);
	}

	public static function deleteByUserId($userId)
	{
		$CI =& get_instance();
		$CI->load->model('address_model');
		return $CI->address_model->deleteByUserId($userId);
	}
}
