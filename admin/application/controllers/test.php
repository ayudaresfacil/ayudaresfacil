<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller{
    
	public function __construct(){
		parent::__construct();	
		//checkLogin();
	}
		
	public function index() {
		// **
		// CI_PhoneType
		// **
        $phoneTypes = CI_PhoneType::getPhoneTypes();
        ma($phoneTypes);

		$phoneType = CI_PhoneType::getById(1);
        ma($phoneType);
        
        // **
		// CI_Phone
		// **
        $phones = CI_Phone::getPhonesByUserId(1);
        ma($phones);

        $phones = CI_Phone::getById(1);
        ma($phones);
    }    
}
