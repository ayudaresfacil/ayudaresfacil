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

	public function createMpConection($code){
		$options['clientId'] = MP_CLIENT_ID;
        $options['clientSecret'] = MP_CLIENT_SECRET;
        $options['redirectUri'] = 'https://github.com/ayudaresfacil/ayudaresfacil';
        $options['code'] = $code;

        $auth = CI_MercadoPago::auth($options);
        $auth = json_decode($auth);

        $options['refreshToken'] = $auth->{refresh_token};
        $token = CI_MercadoPago::token($options);
        $token = json_decode($token);

        $options['accessToken'] = $token->{access_token};
        $options['fee'] = 0;
        $item['title'] = "Donacion";
        $item['description'] = "Donacion";
        $item['quantity'] = 1;
        $item['unit_price'] = 1;
        $item['currency_id'] = "$";
        $item['picture_url'] = "";
        $options['items'][0] = $item;
        $checkout = CI_MercadoPago::integrateCheckout($options);
        $checkout = json_decode($checkout);

        return $checkout->{sandbox_init_point};
	}
}
