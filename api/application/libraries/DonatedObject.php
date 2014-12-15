<?php

class CI_DonatedObject {
	private $id;
	private $donationId;
	private $objectId;
	private $quantity;

	public function getId() {return $this->id;}

	public function getDonationId() {return $this->donationId;}
	public function setDonationId($donationId){$this->donationId = $donationId;}
	
	public function getObjectId(){return $this->objectId;}
	public function setObjectId($objectId){$this->objectId = $objectId;}
	
	public function getQuantity(){return $this->quantity;}
	public function setQuantity($quantity){$this->quantity = $quantity;}
	
	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */

	public function getDataFromArray($options){
		$objects = null;
		if(isset($options)){
			foreach ($options  as $key => $object){
					 	$myObject = new stdClass();
						$myObject->id = $object->id;
						$myObject->donationId = $object->donationId;
						$myObject->objectId = $object->objectId;
						$myObject->quantity = $object->quantity;
						$objects[$key] = $myObject;
					}
		}
		return $objects;
	}

	public function getData($options){
		$object = new stdClass();
		$object->id = $options->id;
		$object->donationId = $options->donationId;
		$object->objectId = $options->objectId;
		$object->quantity = $options->quantity;
		return $object;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$object = new self;
		$object->id = (isset($row->donated_obj_id)) ? $row->donated_obj_id : 0;
		$object->donationId = (isset($row->donation_id)) ? $row->donation_id : '';
		$object->objectId = (isset($row->object_id)) ? $row->object_id : '';//(isset($row->object_id)) ? CI_Object::getById($row->object_id) : '';
		$object->quantity = (isset($row->quantity)) ? $row->quantity : '';
		return $object;
	}

	public static function getById($id){
		$CI = & get_instance();
		$CI->load->model('donated_object_model');
		$results = $CI->donated_object_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getByPublicationId($publicationId){
		$CI = & get_instance();
		$CI->load->model('donated_object_model');
		$results = $CI->donated_object_model->getByPublicationId($publicationId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}
	
	public static function getByDonationId($donationId){
		$CI = & get_instance();
		$CI->load->model('donated_object_model');
		$results = $CI->donated_object_model->getByDonationId($donationId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public function save(){
		$return = TRUE;
		$CI =& get_instance();
		$CI->load->model('donated_object_model');
		if(isset($this->id) && $this->id > 0)
			$CI->donated_object_model->update($this->getData($this));
		else{
			$this->id = $CI->donated_object_model->create($this->getData($this));
			if($this->id === null)
				$return = FALSE;
			else
				$return = $this->id;
		}
		return $return;
	}

}
