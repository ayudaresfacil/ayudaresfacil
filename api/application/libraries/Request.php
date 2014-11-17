<?php

class CI_Request extends CI_Publication {		
	private $votes;
	private $sponsors;
	private $isVote;

	public function getVotes(){return $this->votes;}
	public function setVotes($votes){$this->votes = $votes;}

	public function setImage($image){$this->image = CI_Image::getById($image);}
	public function getSponsor(){
		$sponsors = null;
		foreach ($this->sponsors as $key => $sponsor){
			$mySponsor = new stdClass();
			$mySponsor->id = $sponsor->getId();
			$mySponsor->userTw = $sponsor->getUserTw();
			$sponsors[$key] = $mySponsor;
		}
		return $sponsors;
	}
	public function setSponsor($sponsors){$this->sponsors = CI_Sponsor::getById($sponsors);}

	public function getIsVote(){return $this->isVote;}
	public function setIsVote($isVote){$this->isVote = $isVote;}

	public function getDataFromArray($options){
		$request = parent::getDataFromArray($options);
		$request->votes = CI_Request::getVote($options["publicationId"]);
		$request->sponsors = CI_Sponsor::getByPublicationId($options["publicationId"]);
		if (isset($options["isVote"])) {
			$request->isVote = $options["isVote"];			
		}
		return $request;
	}

	public function getData($options){
		$request = parent::getData($options);
		$request->votes = CI_Request::getVote($options->id);
		$request->sponsors = CI_Sponsor::getData($options->sponsors);
		if (isset($options->isVote)) {
			$request->isVote = $options->isVote;			
		}
		return $request;
	}

	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$request = parent::getInstance($row);		
		$request->votes = CI_Request::getVote($row->publication_id);
		$request->sponsors = CI_Sponsor::getByPublicationId($row->publication_id);
		if (isset($row->isVote)) {
			$request->isVote = $row->isVote;			
		}
		return $request;
	}

	public static function getById($id){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return;
	}

	public static function getByIdAndUserLog($id, $userLog){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getByIdAndUserLog($id, $userLog);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return;
	}
	
	public static function getByUser($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return;
	}

	public function save($arrInfo){
		$request = $arrInfo["request"];
		$arrInfo["request"] = CI_Request::getData($request);
		$CI =& get_instance();
		$CI->load->model('request_model');
		$id = ' ';
		if(isset($request->id) && $request->id > 0){
			$id = $request->id;
			$CI->request_model->update($arrInfo["request"]);
		}else{
			$id = $CI->request_model->create($arrInfo);
		}
		return $id;
	}

	public function delete($request){
		$CI =& get_instance();
		$CI->load->model('request_model');
		return $CI->request_model->delete($request->id);
	}

	public static function getCurrentRequests(){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getCurrentRequests();
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return; 
	}

	public static function getWithFavorites($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getWithFavorites($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return; 
	}

	public static function getFavoritesByUser($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getFavoritesByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public function checkExistingFavorite($data){
		$CI =& get_instance();
		$CI->load->model('request_model');
		
		return $CI->request_model->checkExistingFavorite($data);
	}

	public function setAsFavorite($options){
		$userId = $options['userId'];
		$request = $options['request'];

		$CI =& get_instance();
		$CI->load->model('request_model');
		$data = array (
			"publication_id" => $request->id, 
			"user_id" => $userId,
			"request" => $request
		);

		if (CI_Request::checkExistingFavorite($data)){
			unset($data["request"]);
			return $CI->request_model->setAsFavorite($data);					
		}
	}

	public function deleteFromFavorites($options){
		$userId = $options['userId'];
		$request = $options['request'];

		$CI =& get_instance();
		$CI->load->model('request_model');

		$data = array (
			"publication_id" => $request->id, 
			"user_id" => $userId,
			"request" => $request
		);

		if(!(CI_Offer::checkExistingFavorite($data))){
			unset($data["request"]);
			return $CI->request_model->deleteFromFavorites($data);					
		}
	}
	
	public static function getMonetaryRequestsByUser($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getMonetaryRequestsByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return;
	}

	public static function getObjectRequestsByUser($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getObjectRequestsByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = CI_Request::getInstance($result);
			}
		}
		return $return;
	}

	public static function getExpiredByUser($userId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$results = $CI->request_model->getExpiredByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public function setVote($options){
		$CI =& get_instance();
		$CI->load->model('request_model');

		$data = array (
			"publication_id" => $options["publicationId"], 
			"user_id" => $options["userId"]
		);
		
		return $CI->request_model->setVote($data);					
	}

	public static function getVote($publicationId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$return = $CI->request_model->getVotes($publicationId);
		return $return;
	}

	public function deleteVote($options){
		$userId = $options['userId'];
		$request = $options['request'];

		$CI =& get_instance();
		$CI->load->model('request_model');

		$data = array (
			"publication_id" => $request->id, 
			"user_id" => $userId
		);
		return $CI->request_model->deleteVote($data);					
	}
/*
	public function setSponsor($options){
		$CI =& get_instance();
		$CI->load->model('request_model');

		$data = array (
			"publication_id" => $options["publicationId"], 
			"user_tw" => $options["userTw"]
		);
		
		return $CI->request_model->setSponsor($data);					
	}
*/
	public static function getSponsors($publicationId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$sponsors = $CI->request_model->getSponsors($publicationId);
		$return = array();
		if($sponsors){
			foreach($sponsors as $sponsor){
				$return[] = $sponsor;
			}
		}
		return $return;
	}

	public static function getImages($publicationId){
		$CI =& get_instance();
		$CI->load->model('request_model');
		$images = $CI->request_model->getImages($publicationId);
		$return = array();
		if($images){
			foreach($images as $image){
				$return[] = $image;
			}
		}
		return $return;
	}
}