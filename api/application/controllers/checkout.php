<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Checkout extends REST_Controller{

	public function end_post(){
		//checkIsLoggedIn($this);
		$status = 200;
		$return["result"] = "OK";

		$datestring = "%Y/%m/%d %H:%i:%s";
		$currentDate = mdate($datestring, now());

		$arrOptions['userFromId'] = $this->post('userFromId');
		$arrOptions['userToId'] = $this->post('userToId');
		$arrOptions['publicationId'] = $this->post('publicationId');
		$arrOptions['publicationType'] = $this->post('publicationType');
		$arrOptions['objectId'] = $this->post('objectId');
		$arrOptions['comments'] = $this->post('comments');
		$arrOptions['quantity'] = $this->post('quantity');

		$processState = ($arrOptions['publicationType'] == "money") ? "F" : "W"; 
		
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

		if($status == 200){

			if($arrOptions['publicationType'] == "money"){
				$request = CI_Request::getById($arrOptions['publicationId'])[0];
				
				$amountCollected = $request->amountCollected[0]->quan;
				$quantityGoal = $request->quantity;

				if($amountCollected >= $quantityGoal){
					CI_Publication::pause($arrOptions['publicationId']);
				}
				
				$return["data"]['amountCollected'] = $amountCollected;				
				$return["data"]['quantityGoal'] = $quantityGoal;
			}else{
				CI_Publication::pause($arrOptions['publicationId']);
			}
		}

        $this->response($return, $status);
	}
}
