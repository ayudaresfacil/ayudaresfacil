<?php

class Request_model extends CI_Model
{
	public function getById($id){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.publication_id', $id);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function getByIdAndUserLog($id, $userLog){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userLog .' AND publication_id = '. $id .') then 1 else 0 end as isFavorite, case when exists (SELECT * FROM publication_vote WHERE user_id = '. $userLog .' AND publication_id = '. $id .') then 1 else 0 end as isVote');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->join('publication_image', "publication.publication_id = publication_image.publication_id");
		$this->db->group_by('publication.publication_id');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$this->db->where('publication.publication_id =', $id);
		$query = $this->db->get();
		return $query->result();
	}

	public function getByUser($userId){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.user_id', $userId);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.process_state_id <>', 'B');
		$query = $this->db->get();
		return $query->result();
	}	

	public function getCurrentRequests(){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->order_by("publication.creation_date","desc");
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result(); 
	}

	public function getWithFavorites($userId){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userId .' AND publication_id = publication.publication_id) then 1 else 0 end as isFavorite');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->order_by("publication.creation_date","desc");
		$this->db->where('publication.process_state_id <> "B"');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function getWithFavoritesAndUserLog($userLog, $userId){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userLog .' AND publication_id = publication.publication_id AND user_id = '. $userLog .') then 1 else 0 end as isFavorite');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.user_id', $userId);
		$this->db->order_by("publication.creation_date","desc");	
		$this->db->where('publication.process_state_id <> "B"');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function create($arrInfo){
		$request = $arrInfo['request'];
		$category = $request->category;
		$subcategory = $request->subcategory;
		$processState = $request->processState;
		$object = $request->object;
		$sponsors = $arrInfo['sponsors'];

		$this->db->trans_start();
		$data = array 	(
			'user_id' => $arrInfo['user'],
			'publication_type_id' => $arrInfo['type'],
			'creation_date' => $request->creationDate,
			'title' => $request->title,
			'description' => $request->description,
			'expiration_date' => $request->expirationDate,
			'category_id' => $category->id,
			'subcategory_id' => $subcategory->id,
			'views' => $request->views,
			'process_state_id' => 'V',
			);
		$this->db->insert('publication', $data);
		$id = $this->db->insert_id();
		$data = array 	(
			'publication_id' => $id,
			'object_id' => $object->id,
			'quantity' => $request->quantity,
			);
		$this->db->insert('publication_object', $data);	
		$data = array 	(
			'publication_id' => $id,
			'path' => $arrInfo['path'],
			);
		$this->db->insert('publication_image', $data);	
		foreach ($sponsors as $sponsor){
			$data = array 	(
				'publication_id' => $id,
				'user_tw' => $sponsor['label'],
				);
			$this->db->insert('publication_sponsor', $data);
		};	
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$id = null;
			log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return $id;
	}

	public function update($options){
		$category = $options->category;
		$subcategory = $options->subcategory;
		$processState = $options->processState;
		$object = $options->object;

		$this->db->trans_start();
		$data = array 	(
			'creation_date' => $options->creationDate,
			'title' => $options->title,
			'description' => $options->description,
			'expiration_date' => $options->expirationDate,
			'category_id' => $category->id,
			'subcategory_id' => $subcategory->id,
			'views' => $options->views,
			'process_state_id' => $processState->id,
			);
		$this->db->where('publication_id', $options->id);
		$this->db->update('publication', $data);
		$data = array 	(
			'object_id' => $object->id,
			'quantity' => $options->quantity,
			);
		$this->db->where('publication_id', $options->id);
		$this->db->update('publication_object', $data);		
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

	public function getFavoritesByUser($userId){
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_favorite', "publication.publication_id = publication_favorite.publication_id");
		$this->db->join('publication_object', "publication_object.publication_id = publication_favorite.publication_id");
		$this->db->where('publication_favorite.user_id', $userId);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$this->db->where('publication.process_state_id <>', 'B');
		$query = $this->db->get();
		return $query->result();
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
	
	public function deleteVote($data){
		$this->db->trans_start();
		$this->db->where('publication_id', $data["publication_id"]);
		$this->db->where('user_id', $data["user_id"]);
		$this->db->delete('publication_vote');
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
			log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function getMonetaryRequestsByUser($userId){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.user_id', $userId);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication_object.object_id', 0); 
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function getObjectRequestsByUser($userId){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.user_id', $userId);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication_object.object_id <>', 0); 
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function getExpiredByUser($userId){
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication_object.publication_id = publication.publication_id");
		$this->db->where('publication.user_id', $userId);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date < current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function setVote($data){
		$this->db->trans_start();
		$this->db->insert('publication_vote', $data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
			log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function getVotes($publicationId){
		$this->db->select('count(*) AS quan');	
		$this->db->from('publication_vote');
		$this->db->where('publication_vote.publication_id', $publicationId);
		$query = $this->db->get();
		return $query->result();
	}

	public function setSponsor($data){
		$this->db->trans_start();
		$this->db->insert('publication_sponsor', $data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
			log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}
	
	public function getSponsors($publicationId){
		$this->db->select('user_tw');	
		$this->db->from('publication_sponsor');
		$this->db->where('publication_id', $publicationId);
		$query = $this->db->get();
		return $query->result();
	}

	public function setImages($data){
		$this->db->trans_start();
		$this->db->insert('publication_images', $data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$publicationId = null;
			log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}
	
	public function getImages($publicationId){
		$this->db->select('path');	
		$this->db->from('publication_image');
		$this->db->where('publication_id', $publicationId);
		$query = $this->db->get();
		return $query->result();
	}
}