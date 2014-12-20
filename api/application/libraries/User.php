<?php

class CI_User {
	private $id;
	private $email;
	private $password;
	private $name;
	private $lastName;
	private $birthdayDate;
	private $description;
	private $phones;
	private $addresses;
	private $gravatarEmail;
	private $enabled;
	private $deleted;
	private $mpAuthCode;

	public function getId() {return $this->id;}
	
	public function getEmail(){return $this->email;}
	public function setEmail($email){$this->email = $email;}
	
	public function getPassword(){return $this->password;}
	public function setPassword($password){$this->password = $password;}
	
	public function getName(){return $this->name;}
	public function setName($name){$this->name = $name;}
	
	public function getLastName(){return $this->lastName;}
	public function setLastName($lastName){$this->lastName = $lastName;}

	public function getBirthdayDate(){return $this->birthdayDate;}
	public function setBirthdayDate($birthdayDate){$this->birthdayDate = $birthdayDate;}

	public function getDescription(){return $this->description;}
	public function setDescription($description){$this->description = $description;}

	public function getPhones(){
                    return CI_Phone::getDataFromArray($this->phones);
			 	}

	public function setPhones($phones){
				CI_Phone::deleteByUserId($this->id);
				if (!empty($this->phones)){
					$this->phones=null;
				}
				if (!empty($phones)){
					foreach ($phones as $key => $phone){
							$myUserPhone = new CI_Phone();
							$myUserPhone->setNumber($phone['number']);
							$myUserPhone->setAreaCode($phone['areaCode']);
							$myUserPhone->setTypeId($phone['typeId']);
							$this->phones[$key] = $myUserPhone;
						}
				}
		 	}

	public function getAddresses(){
                    return CI_Address::getDataFromArray($this->addresses);}

	public function setAddresses($addresses){
				CI_Address::deleteByUserId($this->id);
				if (!empty($this->addresses)){
					$this->addresses=null;
				}
				if (!empty($addresses)){
					foreach ($addresses as $key => $address){
							$myUserAddress = new CI_Address();		
							$myUserAddress->setStreet($address['street']);
							$myUserAddress->setNumber($address['number']);
							$myUserAddress->setFloor($address['floor']);
							$myUserAddress->setApartment($address['apartment']);
							$myUserAddress->setPostalCode($address['postalCode']);
							$myUserAddress->setProvinceId($address['provinceId']);
							$myUserAddress->setDepartmentId($address['departmentId']);
							$myUserAddress->setCityId($address['cityId']);
							$myUserAddress->setPrincipal('S');
							$this->addresses[$key] = $myUserAddress;
						}
				}
			}

	public function getEnabled(){return $this->enabled;}
	public function setEnabled($enabled){$this->enabled = $enabled;}

	public function getDeleted(){return $this->deleted;}
	public function setDeleted($deleted){$this->deleted = $deleted;}

	public function getGravatarEmail(){return $this->gravatarEmail;}
	public function setGravatarEmail($gravatarEmail){$this->gravatarEmail = $gravatarEmail;}

	public function getMPAuthCode(){return $this->mpAuthCode;}
	public function setMPAuthCode($mpAuthCode){$this->mpAuthCode = $mpAuthCode;}
	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */
	public function getData($options){
		$object = new stdClass();
		$object->id = $options->id;
		$object->email = $options->email;
		$object->password = $options->password;
		$object->name = $options->name;
		$object->lastName = $options->lastName;
		$object->birthdayDate = $options->birthdayDate;
		$object->description = $options->description;
		$object->phones = CI_Phone::getDataFromArray($options->phones);
		$object->addresses = CI_Address::getDataFromArray($options->addresses);
		$object->gravatarEmail = $options->gravatarEmail;
		$object->enabled = $options->enabled;
		$object->deleted = $options->deleted;
		return $object;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}
		$user = new self;
		$user->id = (isset($row->user_id)) ? $row->user_id : 0;
		$user->email = (isset($row->email)) ? $row->email : '';
		$user->password = (isset($row->password)) ? $row->password : '';
		$user->name = (isset($row->name)) ? $row->name : '';
		$user->lastName = (isset($row->last_name)) ? $row->last_name : '';
		$user->birthdayDate = (isset($row->birthday_date)) ? $row->birthday_date : '';
		$user->description = (isset($row->description)) ? $row->description : '';
		$user->enabled = (isset($row->enabled)) ? $row->enabled : '';
		$user->deleted = (isset($row->deleted)) ? $row->deleted : '';
		$user->phones = CI_Phone::getPhonesByUserId ($user->id);
		$user->addresses = CI_Address::getAddressesByUserId($user->id);
		$user->gravatarEmail = (isset($row->gravatar_email)) ? $row->gravatar_email : '';
		$user->mpAuthCode = (isset($row->mp_auth_code)) ? $row->mp_auth_code : '';
		return $user;
	}
	
	public static function getUsers()
	{
		$CI = & get_instance();
		$CI->load->model('user_model');
		$results = $CI->user_model->getUsers();
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
		$CI->load->model('user_model');
		$results = $CI->user_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public static function getByUsername($username)
	{
		$CI = & get_instance();
		$CI->load->model('user_model');
		$results = $CI->user_model->getByUsername($username);
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
		$CI = & get_instance();
		$CI->load->model('user_model');
		if(isset($this->id) && $this->id > 0){
			$CI->user_model->update($this->getData($this));
			if(!empty($this->phones)){
				foreach($this->phones as $phone) {
					$phone->save($this->id);
				}
			}
			if(!empty($this->addresses)){
				foreach($this->addresses as $address) {
					$address->save($this->id);
				}
			}
		}else{
			$this->id = $CI->user_model->create($this->getData($this));
			if($this->id === null)
				$return = FALSE;
		}
		return $return;
	}

	public function delete()
	{
		$CI =& get_instance();
		$CI->load->model('user_model');
		return $CI->user_model->delete($this->id);
	}

	public static function addPaymentCode($options){
		$CI =& get_instance();
		$CI->load->model('user_model');
		if($options['userId'] > 0 && !empty($options['code'])){
			$CI->user_model->addPaymentCode($options);
		}
		return true;
	}
}
