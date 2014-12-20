<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller{
    
	public function __construct(){
		parent::__construct();	
		//checkLogin();
	}
		
	public function index() {
        error_reporting(0);

        $options['clientId'] = '3622387872526969';
        $options['clientSecret'] = 'nM7RptdRoXtrD8DTAXkqQAVw6JlDDJmL';
        $options['redirectUri'] = 'https://github.com/ayudaresfacil/ayudaresfacil';
        $options['code'] = "TG-549513b5e4b0a8540f891937-171261795";
        $auth = CI_MercadoPago::auth($options);
        
        echo "auth"; 
        ma($auth);
        $auth = json_decode($auth);

        $options['refreshToken'] = $auth->{refresh_token};
        $token = CI_MercadoPago::token($options);
        echo "token";
        ma($token); 

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
        ma($checkout);
        
    }    
}
