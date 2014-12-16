<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Checkout extends REST_Controller{

	public function end_get(){
		//checkIsLoggedIn($this);
		$status = 200;
		$return["result"] = "OK";

		$this->load->helper('date');
		$datestring = "%Y/%m/%d %H:%i:%s";
		$currentDate = mdate($datestring, now());

		$arrOptions['userFromId'] = $this->get('userFromId');
		$arrOptions['userToId'] = $this->get('userToId');
		$arrOptions['publicationId'] = $this->get('publicationId');
		$arrOptions['publicationType'] = $this->get('publicationType');
		$arrOptions['objectId'] = $this->get('objectId');
		$arrOptions['comments'] = $this->get('comments');
		$arrOptions['quantity'] = $this->get('quantity');
		
		$userFrom = CI_User::getById($arrOptions['userFromId']);
		$userTo = CI_User::getById($arrOptions['userToId']);
		// $publication = CI_Publication::getById($arrOptions['publicationId']);

		if($arrOptions['publicationType'] == "money"){
			//TODO: fijarse si se cumplio el objetivo y auto cerrar la publicación
			
			$processState = "C";
		}else{
			$processState = "W";
			CI_Publication::pause($arrOptions['publicationId']);
		}

		try {
			$donation = new CI_Donation();
			$donation->setUserId($arrOptions['userFromId']);
			$donation->setPublicationId($arrOptions['publicationId']);
			$donation->setDonationDate($currentDate);
			$donation->setProcessState($processState);
			
			$donationId = $donation->save();
			
			if($donationId){					
				$donatedObject = new CI_DonatedObject();
				$donatedObject->setDonationId($donationId);
				$donatedObject->setObjectId($arrOptions['objectId']);
				$donatedObject->setQuantity($arrOptions['quantity']);
				
				$donatedObjectId = $donatedObject->save();

				$message = new CI_Message();
				$message ->setUserFrom($arrOptions['userFromId']);
				$message ->setUserTo($arrOptions['userToId']);
				$message ->setPublication($arrOptions['publicationId']);
				$message ->setText($arrOptions['comments']);

				$message->save();
			}
		} 
		catch(Exception $ex){
			$status = 500;
			$return["result"] = "NOOK";
		}

        $this->response($return, $status);
	}
}
