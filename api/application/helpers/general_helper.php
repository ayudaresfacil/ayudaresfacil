<?php

function ma($array, $die = 0){
	//IMPRIME EN PANTALLA UN ARRAY FORMATEADO
	echo '<pre>';
	print_r($array);
	echo '</pre>';
	if($die == 1) die(); 
}

function getImgSrc($img,$path,$thumb = FALSE){
	$error = FALSE;	
	if(isset($img) && strlen($img)>0){
		if(file_exists($path.trim($img))){
			if($thumb) $img = getThumbName($img);	
			$imgSrc = $path.trim($img);
		}else $error = TRUE; 
	}else $error = TRUE;

	if($error){
		if($thumb)$imgSrc = base_url().'data/images/sinImagen_thumb.jpg';
		else $imgSrc = base_url().'data/images/sinImagen.jpg';
	}
	
	return $imgSrc;
}

function getThumbName($img){
	$aux = array_reverse(explode(".", $img));
	if($aux[0] == "jpg") $img = str_replace(".jpg", "_thumb.jpg",$img);
	elseif($aux[0] == "png") $img = str_replace(".png", "_thumb.png",$img);
	elseif($aux[0] == "gif") $img = str_replace(".gif", "_thumb.gif",$img);
	return $img;
}

function convertDecimalToDataBaseFormat($decimal){
	return str_replace(',', '.', $decimal);		
}

function convertDecimalToUserFormat($decimal){
	return str_replace('.', ',', $decimal);	
}

function sendTweet($msg){
require APPPATH.'/libraries/OAuth.php';
require APPPATH.'/libraries/TwitterOAuth.php';

    $consumerKey    = 'QgE2NWrvsrTrGjg0bVCo6VIwU';
	$consumerSecret = 'MpNr7EdGlJQClAMuCsmrGqSblEzoCXDbagYlwVvJs6eVFggrp0';
	$oAuthToken     = '2912192883-nI7A2LMfh8z2M7IwvwSAfpZAHeG5eLOsdu2ZDNn';
	$oAuthSecret    = 'sDFejAvhmRYYJGbR1JMwLCfZmRlfy7wc1SC9GuzS4hZZ0';

	if(isset($msg)){
		$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $oAuthToken, $oAuthSecret);
		$tweet->post('statuses/update',array('status' => $msg));
	}

	return true;
}