<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');


class Message extends CI_Controller{

	public function __construct()
	{
		parent::__construct();
	}


	public function save()
	{
		$arrOptions['id'] = ($this->input->post('id') > 0) ? $this->input->post('id') : 0;
		$arrOptions['userIdFrom'] = $this->input->post('userIdFrom');
		$arrOptions['userIdTo'] = $this->input->post('userIdTo');
		$arrOptions['publicationId'] = $this->input->post('publicationId');
		$arrOptions['firstMessageId'] = $this->input->post('firstMessageId');
		$arrOptions['FAQ'] = $this->input->post('FAQ');
		$arrOptions['commonStateId'] = $this->input->post('commonStateId');
		$arrOptions['text'] = $this->input->post('text');
		$arrOptions['createDate'] = $arrOptions['updateDate'] = date('Y/m/d H:i:s');
		
		if($arrOptions['id'] > 0){

			$message = CI_Message::getById($arrOptions['id']);

			$message->setUserIdFrom($arrOptions['userIdFrom']);
			$message->setUserIdTo($arrOptions['userIdTo']);
			$message->setPublicationId($arrOptions['publicationId']);
			$message->setFirstMessageId($arrOptions['firstMessageId']);
			$message->setFAQ($arrOptions['FAQ']);
			$message->setCommonStateId($arrOptions['commonStateId']);
			$message->setText($arrOptions['text']);
			$message->setUpdateDate($arrOptions['updateDate']);

		}else{

			$object = new stdClass();
			
			$object->userIdFrom = $arrOptions['userIdFrom'];
			$object->userIdTo = $arrOptions['userIdTo'];
			$object->publicationId = $arrOptions['publicationId'];
			$object->firstMessageId = $arrOptions['firstMessageId'];
			$object->FAQ = $arrOptions['FAQ'];
			$object->commonStateId = $arrOptions['commonStateId'];
			$object->text = $arrOptions['text'];
			$object->createDate = $arrOptions['createDate'];
			
			$message = CI_Message::getInstance($object);

		}
		
		if($message->save()){
			$return["result"] = "OK";

			$myMessage = new stdClass();

			$myMessage->id = $message->getId();
			$myMessage->userIdTo = $message->getUserIdTo();
			$myMessage->userIdFrom = $message->getUserIdFrom();
			$myMessage->publicationId = $message->getPublicationId();
			$myMessage->firstMessageId = $message->getFirstMessageId();
			$myMessage->FAQ = $message->getFAQ();			
			$myMessage->commonStateId = $message->getCommonStateId();			
			$myMessage->text = $message->getText();
			$myMessage->createDate = $message->getCreateDate();
			$myMessage->updateDate = $message->getUpdateDate();

			$return["data"] = $myMessage;

		}else{

			$return["result"] = "NOOK";

		}

		echo json_encode($return);
	}

	public function delete() 
	{
		$error = $info = $success = "";
		$return["result"] = "NOOK";
		
		$id = ($this->input->post('id') > 0) ? $this->input->post('id') :0;
		
		if($id > 0){

			$message = CI_Message::getById($id);
			if($message->delete()){
				$return["result"] = "OK";
			}
		}
		
		echo json_encode($return);	
	}

}