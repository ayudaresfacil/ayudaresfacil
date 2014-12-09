<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Message extends REST_Controller{

	public function index_get(){

		//checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";
		$return["data"] = "";

        $id = $this->get("id"); 
        $userNoOwner = $this->get("userNoOwner"); 
        $userOwner = $this->get("userOwner"); 
        $userInConversations = $this->get("userInConversations"); 
        $conversationId = $this->get("conversationId"); 

        if($id){
            $messages = CI_Message::getById($id);   
        }elseif ($userNoOwner) {
            $messages = CI_Message::getConversationFromOthersPublications($userNoOwner);
        }elseif ($userOwner) {
            $messages = CI_Message::getConversationFromMyPublications($userOwner);
        }elseif ($userInConversations) {
            $messages = CI_Message::getConversationFromAllPublications($userInConversations);
        }elseif ($conversationId) {
            $messages = CI_Message::getConversation($conversationId);
        }

		if($messages){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";
			
			foreach ($messages as $key => $message) {
                $myMessage = new  stdClass();
                $myMessage->userTo = $message->getUserTo();
                $myMessage->userFrom = $message->getUserFrom();
                $myMessage->id = $message->getId();
                $myMessage->publication = $message->getPublication();
                $myMessage->conversationId = $message->getConversationId();
                $myMessage->FAQ = $message->getFAQ();
                $myMessage->commonState = $message->getCommonState();
                $myMessage->subject = $message->getSubject();
                $myMessage->text = $message->getText();
                $myMessage->createDate = $message->getCreateDate();
                $myMessage->updateDate = $message->getUpdateDate();
                $return["data"][$key] = $myMessage;
			 } 
		}


        $this->response($return, $status);
	}

	public function index_post(){
		//checkIsLoggedIn($this);

		$status = 404;
		$return["result"] = "NOOK";
		$return["data"] = "";

		$this->load->helper('date');
		$datestring = "%Y/%m/%d %H:%i:%s";
		$currDate = mdate($datestring, now());

		$arrOptions['userFrom'] = $this->post('userFrom');
		$arrOptions['userTo'] = $this->post('userTo');
		$arrOptions['publication'] = $this->post('publication');
		//$arrOptions['FAQ'] = $this->post('FAQ');
		//$arrOptions['commonStateId'] = $this->post('commonStateId');
        //$arrOptions['subject'] = $this->post('subject');
		$arrOptions['text'] = $this->post('text');
		//$arrOptions['updateDate'] = $currDate;
		$message = new CI_Message();
		//$message ->setUpdateDate($arrOptions['updateDate']);
		$message ->setUserFrom($arrOptions['userFrom']);
		$message ->setUserTo($arrOptions['userTo']);
		$message ->setPublication($arrOptions['publication']);
		//$message ->setFAQ($arrOptions['FAQ']);
		//$message ->setCommonState(CI_CommonState::getById($arrOptions['commonStateId']));
		//$message ->setSubject($arrOptions['subject']);
		$message ->setText($arrOptions['text']);
	
		if($message->save()){
			$myMessage = new stdClass();
			$myMessage->id = $message->getId();
			$myMessage->userTo = $message->getUserTo();
			$myMessage->userFrom = $message->getUserFrom();
			$myMessage->publication = $message->getPublication();
			$myMessage->conversationId = $message->getConversationId();
			$myMessage->FAQ = $message->getFAQ();			
			$myMessage->commonState = $message->getCommonState();			
			$myMessage->subject = $message->getSubject();
			$myMessage->text = $message->getText();
			$myMessage->createDate = $message->getCreateDate();
			$myMessage->updateDate = $message->getUpdateDate();
			
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = $myMessage;
		} 

		$this->response($return, $status);
	}

	public function index_delete(){
		$status = 404;
		$return["data"] = "";
		$return["result"] = "NOOK";

		$id = ($this->delete('id') > 0) ? $this->delete('id') :0;
		if($id > 0){
			$message = CI_Message::getById($id);
			$message = $message[0];
			if($message->delete()){
				$status = 200;
				$return["result"] = "OK";
			}
		}
		$this->response($return, $status);
	}
    
    public function getConversationByUserPublication_get(){
        $status = 404;
        $return["data"] = "";
        $return["result"] = "NOOK";
        $userId = $this->get("userId");
        $publicationId = $this->get("publicationId");
        $conversationId = CI_Message::getConversationByUserPublication($publicationId,$userId);
        if(isset($conversationId["conversationId"])){
            $status = 200;
            $return["data"] = $conversationId;
            $return["result"] = "OK";
        }
        $this->response($return, $status);
    }
}