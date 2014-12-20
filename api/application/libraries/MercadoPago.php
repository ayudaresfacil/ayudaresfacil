<?php

class CI_MercadoPago {

	/**
	 * Request
 	 * 
	 * curl -H "Accept: application/json" -H "Content-type: application/x-www-form-urlencoded" -X POST -d \
	 * "grant_type=authorization_code&client_id=APP_ID&client_secret=SECRET_KEY&code=AUTHORIZATION_CODE&redirect_uri=MARKETPLACE_REDIRECT_URI" \
	 * "https://api.mercadolibre.com/oauth/token"
	 * 
	 * Response
     * 
	 * {
	 *     "access_token":"seller_access_token", 
	 *     "token_type":"bearer", 
	 *     "expires_in":10800, 
	 *     "scope":"offline_access read write", 
	 *     "refresh_token":"TG-XXXXXXXX"
	 * }
	 */
	public function auth($options){
		$service_url = 'https://api.mercadolibre.com/oauth/token';
		$curl = curl_init($service_url);

		$curl_post_data = "";
		$curl_post_data .= "grant_type=authorization_code";
		$curl_post_data .= "&client_id=".$options["clientId"];
		$curl_post_data .= "&client_secret=".$options["clientSecret"];
		$curl_post_data .= "&code=".$options["code"];
		$curl_post_data .= "&redirect_uri=".$options["redirectUri"];

	   	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	   	curl_setopt($curl, CURLOPT_POST, true);
	   	curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);

	   	$headers[0] = 'Content-Type: application/x-www-form-urlencoded';
	   	$headers[1] = 'Accept: application/json'; 
	   	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		    
	   	$curl_response = curl_exec($curl);
	   	curl_close($curl);

	   	return $curl_response;
	}

	/**
	 * 
	 * Request
 	 * 
	 * curl -H "Accept: application/json" -H "Content-type: application/x-www-form-urlencoded" -X POST -d \
	 * "grant_type=refresh_token&client_id=APP_ID&client_secret=SECRET_KEY&refresh_token=SELLER_REFRESH_TOKEN" \
	 * "https://api.mercadolibre.com/oauth/token"
	 * Response
	 * 
	 * {
	 *     "access_token":"seller_access_token", 
	 *     "token_type":"bearer", 
	 *     "expires_in":10800, 
	 *     "scope":"offline_access read write", 
	 *     "refresh_token":"TG-XXXXXXXX"
	 * }
	 */
	public function token($options){
		$service_url = 'https://api.mercadolibre.com/oauth/token';
		$curl = curl_init($service_url);

	   	$curl_post_data = "";
		$curl_post_data .= "grant_type=refresh_token";
		$curl_post_data .= "&client_id=".$options["clientId"];
		$curl_post_data .= "&client_secret=".$options["clientSecret"];
		$curl_post_data .= "&refresh_token=".$options["refreshToken"];

	   	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	   	curl_setopt($curl, CURLOPT_POST, true);
	   	curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
	   	
	   	$headers[0] = 'Content-Type: application/x-www-form-urlencoded';
	   	$headers[1] = 'Accept: application/json'; 
	   	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

	   	$curl_response = curl_exec($curl);
	   	curl_close($curl);

	   	return $curl_response;
	}
	
	/**
	 * 
	 * curl -X POST \
	 * -H 'accept: application/json' \
	 * -H 'content-type: application/json' \
	 * 'https://api.mercadolibre.com/checkout/preferences?access_token=SELLER_ACCESS_TOKEN' \
	 * -d '{
	 *     "items": [
	 *         {
	 *             "title": "Título de lo que se está pagando",
	 *             "description": "Description",
	 *             "quantity": 1,
	 *             "unit_price": 50,
	 *             "currency_id": "Tipo de moneda",
	 *             "picture_url": "https: //www.mercadopago.com/org-img/MP3/home/logomp3.gif"
	 *         }
	 *     ],
	 *     "marketplace_fee": 2.29
	 * }'
	 */
	public function integrateCheckout($options){
		$service_url = 'https://api.mercadolibre.com/checkout/preferences?access_token=' . $options['accessToken'];
		$curl = curl_init($service_url);

	   	
		$curl_post_data["items"] = $options["items"];
		$curl_post_data["marketplace_fee"] = $options["fee"];
		
		$curl_post_data = json_encode($curl_post_data);
		
		echo $curl_post_data;

	   	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	   	curl_setopt($curl, CURLOPT_POST, true);
	   	curl_setopt($curl, CURLOPT_POSTFIELDS, $curl_post_data);
	   	
	   	$headers[0] = 'Content-Type: application/json';
	   	$headers[1] = 'Accept: application/json'; 
	   	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

	   	$curl_response = curl_exec($curl);
	   	curl_close($curl);

	   	return $curl_response;
	}
}

?>