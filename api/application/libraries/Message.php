<?php

class CI_Message {
	private $id;
	private $userFrom;
	private $userTo;
	private $publication;
	private $conversationId;
	private $FAQ;
	private $commonState;
	private $subject;
	private $text;
	private $createDate;
	private $updateDate;
	private $deleteDate;

	public function getId() {return $this->id;}

    public function getUserFrom() { $userFrom   = CI_User::getById($this->userFrom)[0];
                                    $myUserFrom = new  stdClass();
                                    $myUserFrom->id     = $userFrom->getId();
                                    $myUserFrom->name   = $userFrom->getName();
                                    $myUserFrom->email  = $userFrom->getEmail();
                                    $myUserFrom->profileImage = 'http://www.gravatar.com/avatar/' . md5($userFrom->getGravatarEmail());
                                return $myUserFrom;}
    public function setUserFrom($userFrom) {return $this->userFrom = $userFrom;}

    public function getUserTo() {$userTo    = CI_User::getById($this->userTo)[0];
                                 $myUserTo  = new  stdClass();
                                 $myUserTo->id          = $userTo->getId();
                                 $myUserTo->name        = $userTo->getName();
                                 $myUserTo->email       = $userTo->getEmail();
                                 $myUserTo->profileImage = 'http://www.gravatar.com/avatar/' . md5($userTo->getGravatarEmail());
                                 return $myUserTo;}
    public function setUserTo($userTo) {return $this->userTo = $userTo;}

    public function getPublication(){$publication = CI_Publication::getById($this->publication)[0];
                                    $myPublication = new  stdClass();
                                    $myPublication->id = $publication->id ;
                                    $myPublication->title = $publication->title;
                                    $myPublication->description = $publication->description;
                                    return $myPublication;}
    public function setPublication($publication){return $this->publication = $publication;}

	public function getConversationId(){return $this->conversationId; }
	public function setConversationId($conversationId){return $this->conversationId = $conversationId;}

	public function getFAQ(){return $this->FAQ;}
	public function setFAQ($FAQ){return $this->FAQ = $FAQ;}

	public function getCommonState(){return $this->commonState;}
	public function setCommonState($commonState){return $this->commonState = $commonState;}

	public function getSubject(){return $this->subject;}
	public function setSubject($subject){return $this->subject = $subject;}

	public function getText(){return $this->text;}
	public function setText($text){return $this->text = $text;}

	public function getCreateDate(){return $this->createDate;}

	public function getUpdateDate(){return $this->updateDate;}
	public function setUpdateDate($updateDate){return $this->updateDate = $updateDate;}

	public function getDeleteDate(){return $this->deleteDate;}
	public function setDeleteDate($deleteDate){return $this->deleteDate = $deleteDate;}

/**
	* Devuelve la informacion cargada del objeto 
	* 	
	* Uso interno
	*  
	* @return object
*****/

	private function getData(){
		$object = new stdClass();

		$object->id = $this->id;
		$object->userFrom = $this->userFrom;
		$object->userTo = $this->userTo;
		$object->publication = $this->publication;
		$object->conversationId = $this->conversationId;
		$object->FAQ = $this->FAQ;
		$object->commonState = $this->commonState;
		$object->subject = $this->subject;
		$object->text = $this->text;
		$object->createDate = $this->createDate;
		$object->updateDate = $this->updateDate;
		$object->deleteDate = $this->deleteDate;
		
		return $object;
	}

	public static function getInstance($row){
		if(!($row instanceof stdClass)){
			show_error("El row debe ser una instancia de stdClass.");
		}
		$message = new self;
		$message->id = (isset($row->message_id)) ? $row->message_id : 0;
		$message->userFrom = (isset($row->user_id_from)) ? $row->user_id_from : '';
		$message->userTo = (isset($row->user_id_to)) ? $row->user_id_to : '';
		$message->publication = (isset($row->publication_id)) ? $row->publication_id : '';
		$message->conversationId = (isset($row->conversationId)) ? $row->conversationId : '';
		$message->FAQ = (isset($row->FAQ)) ? $row->FAQ : '';
		$message->commonState = (isset($row->common_state_id)) ? CI_CommonState::getById ($row->common_state_id):'';
		$message->subject = (isset($row->subject)) ? $row->subject : '';		
		$message->text = (isset($row->text)) ? $row->text : '';
		$message->createDate = (isset($row->create_date)) ? $row->create_date : '';
		$message->updateDate = (isset($row->update_date)) ? $row->update_date : '';
		$message->deleteDate = (isset($row->delete_date)) ? $row->delete_date : '';
		return $message;
	}

	public static function getById($id){
		$CI = & get_instance();
		$CI->load->model('message_model');
		$results = $CI->message_model->getById($id);
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

    public function getConversationFromOthersPublications($userIdFrom){
        $CI = & get_instance();
        $CI->load->model('message_model');
        $results = $CI->message_model->getConversationFromOthersPublications($userIdFrom);
        $return = array();
        if(!empty($results)){
            foreach($results as $result) {
                $return[] = self::getInstance($result);
            }
        }
        return $return;
    }
    
    public function getConversationFromMyPublications($userIdTo){
        $CI = & get_instance();
        $CI->load->model('message_model');
        $results = $CI->message_model->getConversationFromMyPublications($userIdTo);
        $return = array();
        if(!empty($results)){
            foreach($results as $result) {
                $return[] = self::getInstance($result);
            }
        }
        return $return;
    }
    
    public function getConversationFromAllPublications($userId){
        $CI = & get_instance();
        $CI->load->model('message_model');
        $results = $CI->message_model->getConversationFromAllPublications($userId);
        $return = array();
        if(!empty($results)){
            foreach($results as $result) {
                $return[] = self::getInstance($result);
            }
        }
        return $return;
    }

	public static function getAll(){
		$CI = & get_instance();
		$CI->load->model('message_model');
		$results = $CI->message_model->getAll();
		$return = array();
		if(!empty($results)){
			foreach($results as $result) {
				$return[] = self::getInstance($result);
			}
		}
		return $return;
	}

    public static function getConversationByUserPublication($publicationId,$userId){
        $CI = & get_instance();
        $CI->load->model('message_model');
        $results = $CI->message_model->getConversationByUserPublication($publicationId,$userId);
        $return = array();
        if(!empty($results)){
            foreach($results as $result) {
                $return["conversationId"] = (isset($result->conversation_id)) ? $result->conversation_id : '';
            }
        }
        return $return;
    }

	public function save(){
		$return = TRUE;
		
		$CI =& get_instance();
		$CI->load->model('message_model');

		if(isset($this->id) && $this->id > 0)
			$CI->message_model->update($this->getData());
		else{
			$this->id = $CI->message_model->create($this->getData());
			if($this->id === null)
				$return = FALSE;
		}
		return $return;
	}

	public function delete(){
		$CI =& get_instance();
		$CI->load->model('message_model');
		return $CI->message_model->delete($this->id);
	}

    public static function getConversation($conversationId){
        $CI = & get_instance();
        $CI->load->model('message_model');
        $results = $CI->message_model->getConversation($conversationId);
        $return = array();
        if(!empty($results)){
            foreach($results as $result) {
                $return[] = self::getInstance($result);
            }
        }
        return $return;
    }

}