<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require APPPATH.'/libraries/REST_Controller.php';

class Publication extends REST_Controller{

	public function index_get(){
		$publication = $this->get("publicationId")? CI_Publication::getById($this->get("publicationId"))[0]:'';
		$status = 404;
		$return["result"] = "NOOK";
		if($publication){
			$status = 200;
			$return["result"] = "OK";
			$return["data"] = "";
			$myPublication = new stdClass();
			$myPublication->id = $publication->id;
			$myPublication->userId = $publication->userId;
			$myPublication->title = $publication->title;
			$myPublication->description = $publication->description;
			$myPublication->creationDate = $publication->creationDate;
			$myPublication->expirationDate = $publication->expirationDate;
			$return["data"][0] = $myPublication;
		}
        $this->response($return, $status);
	}
}