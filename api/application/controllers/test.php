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
        $options['code'] = "TG-549507b5e4b07c737ec15df4-171261795";
        $auth = CI_MercadoPago::auth($options);
        
        echo "auth"; 
        ma($auth);
        // {
        // access_token: "APP_USR-3622387872526969-122000-a62860ff17a4b48ca737e048e253b100__I_N__-171261795",
        // token_type: "bearer",
        // expires_in: 21600,
        // scope: "offline_access read write",
        // user_id: 171261795,
        // refresh_token: "TG-54950247e4b0620cd7a097a0-171261795"
        // }
        $auth = json_decode($auth);

        $options['refreshToken'] = $auth->{refresh_token};
        $token = CI_MercadoPago::token($options);
        echo "token";
        ma($token); 

        $token = json_decode($token);

        $options['accessToken'] = $auth->{access_token};
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
