<?php

class Offer_model extends CI_Model
{
	public function getById($id){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication.publication_id = publication_offer.publication_id");
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		// $this->db->join('publication_image', "publication.publication_id = publication_image.publication_id", 'left');
		$this->db->group_by('publication.publication_id');
		$this->db->where('publication.publication_id', $id);	
		$query = $this->db->get();
		return $query->result();
	}

	public function getByIdAndUserLog($id, $userLog){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userLog .' AND publication_id = '. $id .') then 1 else 0 end as isFavorite ,
						case when publication.user_id = '. $userLog .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication.publication_id = publication_offer.publication_id");
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->group_by('publication.publication_id');
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$this->db->where('publication.publication_id =', $id);
		$query = $this->db->get();
		return $query->result();
	}

	public function getByUser($userId){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication.publication_id = publication_offer.publication_id");
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->group_by('publication.publication_id');
		$this->db->order_by("publication.creation_date","desc");	
		$this->db->where('publication.user_id', $userId);	
		$query = $this->db->get();
		return $query->result();
	}	

	public function create($arrInfo){
		$offer = $arrInfo['offer'];
		$category = $offer->category;
		$subcategory = $offer->subcategory;
		$processState = $offer->processState;
		$object = $offer->object;
		$processStateOffer = $offer->processStateOffer;
		$type = $offer->type;
		// $images = $arrInfo["image"];

		$this->db->trans_start();
		$data = array 	(
							'user_id' => $arrInfo['user'],
							'publication_type_id' => $arrInfo['type'],
							'title' => $offer->title,
							'description' => $offer->description,
							'expiration_date' => $offer->expirationDate,
							'category_id' => $category->id,
							'subcategory_id' => $subcategory->id,
							'views' => $offer->views,
							'process_state_id' => $processState->id,
						);
		$this->db->insert('publication', $data);
		$id = $this->db->insert_id();
		$data = array 	(
							'publication_id' => $id,
							'object_id' => $object->id,
							'quantity' => 1,
						);
		$this->db->insert('publication_object', $data);
		$data = array 	(
							'publication_id' => $id,
							'process_state_offer' => $processStateOffer->id,
							'offer_type_id' => 3,
							'quantity_users_to_paused' => 1,
						);
		$this->db->insert('publication_offer', $data);
		// foreach ($images as $image){
			$data = array 	(
				'publication_id' => $id,
				'path' => $arrInfo["image"],
				);
			$this->db->insert('publication_image', $data);	
		// };			
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return $id;
	}

	public function update($arrInfo){
		$offer = $arrInfo['offer'];
		$category = $offer->category;
		$subcategory = $offer->subcategory;
		$processState = $offer->processState;
		$object = $offer->object;
		$processStateOffer = $offer->processStateOffer;
		$images = $arrInfo["image"];

		$this->db->trans_start();
		$data = array 	(
							'title' => $offer->title,
							'description' => $offer->description,
							'expiration_date' => $offer->expirationDate,
							'category_id' => $category->id,
							'subcategory_id' => $subcategory->id
						);
		$this->db->where('publication_id', $offer->id);
		$this->db->update('publication', $data);
		$data = array 	(
							'object_id' => $object->id,
							'quantity' => $offer->quantity,
						);
		$this->db->where('publication_id', $offer->id);
		$this->db->update('publication_object', $data);
		foreach ($images as $image){
			$data = array 	(
				'publication_id' => $offer->id,
				'path' => $image["path"],
				);
			$this->db->where('image_id', $image["id"]);	
			$this->db->update('publication_image', $data);	
		};					
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
	}

	public function delete($publicationId){

		$this->db->trans_start();
		$data = array ('process_state_id' => 'B');
		$this->db->where('publication_id', $publicationId);
		$this->db->update('publication',$data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function getWithFavoritesAndUserLog($userLog, $userId){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userLog .' AND publication_id = publication.publication_id AND user_id = '. $userLog .') then 1 else 0 end as isFavorite, 
			case when publication.user_id = '. $userLog .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication.publication_id = publication_offer.publication_id");
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.user_id', $userId);	
		$this->db->where('publication.process_state_id <> "B"');
		$this->db->where('publication.expiration_date > current_timestamp');
		$this->db->order_by("publication.creation_date","desc");
		$query = $this->db->get();
		return $query->result();
	}

	public function getCurrentOffers(){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication.publication_id = publication_offer.publication_id");
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->group_by('publication.publication_id');
		$this->db->order_by("publication.creation_date","desc");	
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function getFavorite($publicationId){
		$this->db->select('count(*) AS quan');	
		$this->db->from('publication_favorite');
		$this->db->where('publication_id', $publicationId);
		$query = $this->db->get();
		return $query->result(); 
	}
	
	public function getWithFavorites($userId){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userId .' AND publication_id = publication.publication_id) then 1 else 0 end as isFavorite,
			case when publication.user_id = '. $userId .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication.publication_id = publication_offer.publication_id");
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->group_by('publication.publication_id');
		$this->db->order_by("publication.creation_date","desc");	
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		//ma($this->db->queries);
		return $query->result();
	}

	public function pause($publicationId){
		$this->db->trans_start();
		$data = array ('process_state_offer' => 'P');
		$this->db->where('publication_id', $publicationId);
		$this->db->update('publication_offer',$data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function checkExistingFavorite($data){
		$this->db->select('*');	
		$this->db->from('publication_favorite');
		$this->db->where('publication_id', $data["publication_id"]);	
		$this->db->where('user_id', $data["user_id"]);	
		$query = $this->db->get();

		if (!empty($query->result())){
			return FALSE;
		}else{
			return TRUE;			
		}				
	}

	public function setAsFavorite($data){
		$this->db->trans_start();
		$this->db->insert('publication_favorite', $data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function deleteFromFavorites($data){
		$this->db->trans_start();
		$this->db->where('publication_id', $data["publication_id"]);
		$this->db->where('user_id', $data["user_id"]);
		$this->db->delete('publication_favorite');
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function getFavoritesByUser($userId){
		$this->db->select('*, case when publication.user_id = '. $userId .' then 1 else 0 end as isOwner, 
						case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userId .' AND publication_id = publication.publication_id) then 1 else 0 end as isFavorite');	
		$this->db->from('publication');
		$this->db->join('publication_favorite', "publication.publication_id = publication_favorite.publication_id");
		$this->db->join('publication_offer', "publication_offer.publication_id = publication_favorite.publication_id");
		$this->db->join('publication_object', "publication_object.publication_id = publication_favorite.publication_id");
		$this->db->where('publication_favorite.user_id', $userId);	
		$query = $this->db->get();
		return $query->result();
	}

	public function changeState($options){

		$state = $options["state"];
		$offer = $options["offer"];

		$this->db->trans_start();
		$data = array ('process_state_offer' => $state);
		$this->db->where('publication_id', $offer->id);
		$this->db->update('publication_offer', $data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function getExpiredByUser($userId){
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_offer', "publication_offer.publication_id = publication.publication_id");
		$this->db->join('publication_object', "publication_object.publication_id = publication.publication_id");
		$this->db->where('publication.user_id', $userId);	
		$this->db->where('publication.expiration_date <', date('Y/m/d H:i:s'));
		$query = $this->db->get();
		return $query->result();
	}
}