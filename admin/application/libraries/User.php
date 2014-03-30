<?php

class CI_User {
	private $id;
	private $roleId;
	private $username;
	private $password;
	private $name;
	private $surname;
	private $email;
	
	public function getId() {return $this->id;}
	
	public function getEmail(){return $this->email;}
	public function setEmail($email){$this->email = $email;}
	
	public function getPassword(){return $this->password;}
	public function setPassword($password){$this->password = $password;}
	
	public function getName(){return $this->name;}
	public function setName($name){$this->name = $name;}
	
	public function getEnabled(){return $this->enabled;}
	public function setEnabled($enabled){$this->enabled = $enabled;}

	/**
	 * Devuelve la informacion cargada del objeto 
	 * 	
	 * Uso interno
	 *  
	 * @return object
	 */
	private function getData(){
		$object = new stdClass();
		$object->id = $this->id;
		$object->email = $this->email;
		$object->password = $this->password;
		$object->name = $this->name;
		return $object;
	}
	
	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$user = new self;
		$user->id = (isset($row->id)) ? $row->id : 0;
		$user->roleId = (isset($row->roleId)) ? $row->roleId : 0;
		$user->username = (isset($row->username)) ? $row->username : '';
		$user->password = (isset($row->password)) ? $row->password : '';
		$user->name = (isset($row->name)) ? $row->name : '';
		$user->surname = (isset($row->surname)) ? $row->surname : '';
		$user->email = (isset($row->email)) ? $row->email : '';
		return $user;
	}
	
	public static function listUsers($limit, $offset)
	{
		$CI = & get_instance();
		$CI->load->model('user_model');
		$results = $CI->user_model->listUsers($limit, $offset);
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
				$return = self::getInstance($result);
			}
		}
		return $return;
	}
	
	public function save(){
		$return = TRUE;
		$CI = & get_instance();
		$CI->load->model('user_model');
		if(isset($this->id) && $this->id > 0)
			$CI->user_model->update($this->getData());
		else{
			$this->id = $CI->user_model->create($this->getData());
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
	
	public static function login($username, $password)
	{
		$CI = & get_instance();
		$CI->load->model('user_model');
		$results = $CI->user_model->login($username, $password);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return = self::getInstance($result);
			}
		}
		return $return;
	}

}
