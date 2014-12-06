<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Authentication extends REST_Controller{

	public function signin_get(){
		$arrOptions['email'] = $this->get('username');
		$arrOptions['password'] = $this->get('password');

		$status = 403;
		$return["result"] = "EMPTY_VALUES";

		if(!empty($arrOptions['email']) && !empty($arrOptions['password'])){

			$status = 403;
			$return["result"] = "USER_NOT_FOUND";
			
			$data = CI_Authentication::signin($arrOptions); 

			if($data){
				$myUser = new stdClass();
				$myUser->id = $data['user']->getId();
				$myUser->email = $data['user']->getEmail();
				$myUser->name = $data['user']->getName();
				$myUser->lastName = $data['user']->getLastName();
				$myUser->profileImage = !empty($data['user']->getGravatarEmail()) ? 'http://www.gravatar.com/avatar/' . md5($data['user']->getGravatarEmail()) : "http://www.gravatar.com/avatar/?s=100&d=mm";

				$status = 200;
				$return["result"] = "OK";
				$return["data"] = $myUser;
				$return["token"] = $data['token'];
			}
		}

        $this->response($return, $status);
	}

	private function isLoggedIn(){
		$token = $this->get('token');
		$return["isLoggedIn"] = CI_Authentication::isLoggedIn($token);

		$this->response($return, 200);	
	}
}