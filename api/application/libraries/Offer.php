<?php

class CI_Offer extends CI_Publication {
	private $processStateOffer;
	private $type;
	private $quantityUsersToPaused;
	private $favorites;
	
	public function getProcessStateOffer(){
		$processStateOffer = null;
		foreach ($this->processStateOffer as $key => $state){
			$myState = new stdClass();
			$myState->id = $state->getId();
			$myState->description = $state->getDescription();
			$processStateOffer[$key] = $myState;
		}
		return $processStateOffer;
	}
	public function setProcessStateOffer($processStateOffer){$this->processStateOffer = CI_ProcessState::getById($processStateOffer);}

	public function getType(){
		$type = null;
		foreach ($this->type as $key => $typ){
			$myType = new stdClass();
			$myType->id = $typ->getId();
			$myType->description = $typ->getDescription();
			$myType->comment = $typ->getComment();
			$type[$key] = $myType;
		}
		return $type;
	}
	public function setType($type){$this->type = CI_OfferType::getById($type);}

	public function getQuantityUsersToPaused(){return $this->quantityUsersToPaused;}
	public function setQuantityUsersToPaused($quantityUsersToPaused){$this->quantityUsersToPaused = $quantityUsersToPaused;}
	
	public function getFavorites(){return $this->favorites;}
	public function setFavorites($favorites){$this->favorites = $favorites;}
	
	/**
	 * Devuelve la informacion cargada del objeto 
	 * Uso interno
	 * @return object
	 */

	public function getDataFromArray($options){
		$offer = parent::getDataFromArray($options);
		$offer->processStateOffer = CI_ProcessState::getById($options["processStateIdOffer"]);
		$offer->type = CI_OfferType::getById($options["offerTypeId"]);
		$offer->quantityUsersToPaused = $options["quantityUsersToPaused"];
		$offer->favorites = CI_Offer::getFavorite($options["publicationId"]);
		return $offer;
	}

	public function getData($options){
		$offer = parent::getData($options);
		$offer->processStateOffer = CI_ProcessState::getData($options->processStateOffer);
		$offer->type = CI_OfferType::getData($options->type);
		$offer->quantityUsersToPaused = $options->quantityUsersToPaused;
		if(isset($options->id)){
			$offer->favorites = CI_Offer::getFavorite($options->id);
		}
		return $offer;
	}

	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}	
		$offer = parent::getInstance($row);
		$offer->processStateOffer = CI_ProcessState::getById($row->process_state_offer);
		$offer->type = CI_OfferType::getById($row->offer_type_id);
		$offer->quantityUsersToPaused = (isset($row->quantity_users_to_paused)) ? $row->quantity_users_to_paused : '';
		$offer->favorites = CI_Offer::getFavorite($row->publication_id);
		
		return $offer;
	}

	public static function getById($id){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Offer::getInstance($result);
			}
		}
		return $return;
	}
	
	public static function getByIdAndUserLog($id, $userLog){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getByIdAndUserLog($id, $userLog);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Offer::getInstance($result);
			}
		}
		return $return;
	}

	public static function getByUser($userId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public function save($arrInfo){
		$offer = $arrInfo["offer"];
		$arrInfo["offer"] = CI_Offer::getData($offer);
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$id = ' ';
		if(isset($offer->id) && $offer->id > 0){
			$id = $offer->id;
			$CI->offer_model->update($arrInfo);
		}else{
			$id = $CI->offer_model->create($arrInfo);
		}
		return $id;
	}

	public static function getFavorite($publicationId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$return = $CI->offer_model->getFavorite($publicationId);
		return $return;
	}

	public function delete($offer){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		return $CI->offer_model->delete($offer->id);
	}

	public static function getWithFavoritesAndUserLog($userLog, $userId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getWithFavoritesAndUserLog($userLog, $userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Offer::getInstance($result);
			}
		}
		return $return; 
	}
	
	public static function getCurrentOffers(){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getCurrentOffers();
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Offer::getInstance($result);
			}
		}
		return $return;
	}

	public static function getWithFavorites($userId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getWithFavorites($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = CI_Offer::getInstance($result);
			}
		}
		return $return; 
	}
	
	// public function pause($offer){
	// 	$CI =& get_instance();
	// 	$CI->load->model('offer_model');
	// 	return $CI->offer_model->pause($offer->id);
	// }

	public function checkExistingFavorite($data){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		
		return $CI->offer_model->checkExistingFavorite($data);
	}

	public function setAsFavorite($options){
		$userId = $options['userId'];
		$offer = $options['offer'];

		$CI =& get_instance();
		$CI->load->model('offer_model');

		$data = array (
			"publication_id" => $offer->id, 
			"user_id" => $userId,
			"offer" => $offer
		);

		if (CI_Offer::checkExistingFavorite($data)){
			unset($data["offer"]);
			return $CI->offer_model->setAsFavorite($data);					
		}
	}

	public function deleteFromFavorites($options){
		$userId = $options['userId'];
		$offer = $options['offer'];

		$CI =& get_instance();
		$CI->load->model('offer_model');

		$data = array (
			"publication_id" => $offer->id, 
			"user_id" => $userId,
			"offer" => $offer
		);

		if(!(CI_Offer::checkExistingFavorite($data))){
			unset($data["offer"]);
			return $CI->offer_model->deleteFromFavorites($data);					
		}
	}

	public static function getFavoritesByUser($userId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getFavoritesByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

	public function changeState($options){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		return $CI->offer_model->changeState($options);
	}

	public static function getExpiredByUser($userId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$results = $CI->offer_model->getExpiredByUser($userId);
		$return = array();
		if(!empty($results)){
			foreach($results as $result){
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}
	
	public static function getImages($publicationId){
		$CI =& get_instance();
		$CI->load->model('offer_model');
		$images = $CI->offer_model->getImages($publicationId);
		$return = array();
		if($images){
			foreach($images as $image){
				$return[] = $image;
			}
		}
		return $return;
	}
}