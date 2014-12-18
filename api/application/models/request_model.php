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
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userLog .' AND publication_id = '. $id .') then 1 else 0 end as isFavorite, 
			case when exists (SELECT * FROM publication_vote WHERE user_id = '. $userLog .' AND publication_id = '. $id .') then 1 else 0 end as isVote,
			case when publication.user_id = '. $userLog .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->group_by('publication.publication_id');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
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
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
		$query = $this->db->get();
		return $query->result();
	}

	public function getCurrentRequests(){	
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->order_by("publication.creation_date","desc");
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result(); 
	}

	public function getWithFavorites($userId){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userId .' AND publication_id = publication.publication_id) then 1 else 0 end as isFavorite,
								case when publication.user_id = '. $userId .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->order_by("publication.creation_date","desc");
		$this->db->where('publication.process_state_id <> "B"');
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$query = $this->db->get();
		return $query->result();
	}

	public function getWithFavoritesAndUserLog($userLog, $userId){	
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userLog .' AND publication_id = publication.publication_id AND user_id = '. $userLog .') then 1 else 0 end as isFavorite,
			case when publication.user_id = '. $userLog .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
		$this->db->where('publication.user_id', $userId);
		$this->db->order_by("publication.creation_date","desc");	
		$this->db->where('publication.process_state_id <> "B"');
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
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
		if ($request->quantity) {
			$data = array 	(
				'publication_id' => $id,
				'object_id' => $object->id,
				'quantity' => $request->quantity,
			);
		}else{
			$data = array 	(
				'publication_id' => $id,
				'object_id' => $object->id,
				'quantity' => 1,
			);			
		}
		$this->db->insert('publication_object', $data);	
			$data = array 	(
				'publication_id' => $id,
				'path' => $arrInfo["image"],
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

	public function deleteSponsor($sponsorDel){
		$this->db->trans_start();
		foreach ($sponsorDel as $sponsor){
			$this->db->where('sponsor_id', $sponsor["sponsorId"]);
			$this->db->delete('publication_sponsor');
			$this->db->trans_complete();
		}
		if ($this->db->trans_status() === FALSE){
			$sponsorId = null;
			log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return TRUE;
	}

	public function update($arrInfo){
		$request = $arrInfo['request'];
		$category = $request->category;
		$subcategory = $request->subcategory;
		$processState = $request->processState;
		$object = $request->object;
		$images = $arrInfo["image"];
		$sponsors = $arrInfo["sponsors"];
		$sponsorsn = $arrInfo["sponsorsn"];

		$this->db->trans_start();
		$data = array 	(
			'title' => $request->title,
			'description' => $request->description,
			'expiration_date' => $request->expirationDate,
			'category_id' => $category->id,
			'subcategory_id' => $subcategory->id,
			'process_state_id' => $processState->id
			);
		$this->db->where('publication_id', $request->id);
		$this->db->update('publication', $data);
		if ($category->id == '9') {
			$data = array 	(
				'object_id' => $object->id,
				'quantity' => $request->quantity,
				);
		}else{
			$data = array 	(
				'object_id' => $object->id,
				'quantity' => 1,
				);			
		}
		$this->db->where('publication_id', $request->id);
		$this->db->update('publication_object', $data);		
		foreach ($images as $image){
			$data = array 	(
				'publication_id' => $request->id,
				'path' => $image["path"],
				);
			$this->db->where('image_id', $image["id"]);	
			$this->db->update('publication_image', $data);	
		};				
		foreach ($sponsors as $sponsor){
			if (empty($sponsor['userTw'])) {
				$this->db->where('sponsor_id', $sponsor["id"]);
				$this->db->delete('publication_sponsor');
			}else{
				$data = array 	(
					'publication_id' => $request->id,
					'user_tw' => $sponsor['userTw'],
					);
				$this->db->where('sponsor_id', $sponsor["id"]);	
				$this->db->update('publication_sponsor', $data);
			}
		};			
		foreach ($sponsorsn as $sponsorn){
			$data = array 	(
				'publication_id' => $request->id,
				'user_tw' => $sponsorn['label'],
				);
			$this->db->insert('publication_sponsor', $data);
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

	public function getFavoritesByUser($userId){
		$this->db->select('*, case when exists (SELECT * FROM publication_favorite WHERE user_id = '. $userId .' AND publication_id = publication.publication_id) then 1 else 0 end as isFavorite,
			case when publication.user_id = '. $userId .' then 1 else 0 end as isOwner');	
		$this->db->from('publication');
		$this->db->join('publication_favorite', "publication.publication_id = publication_favorite.publication_id");
		$this->db->join('publication_object', "publication_object.publication_id = publication_favorite.publication_id");
		$this->db->where('publication_favorite.user_id', $userId);	
		$this->db->where('publication.publication_type_id', 2);
		$this->db->where('publication.expiration_date > current_timestamp');
		$this->db->where('publication.process_state_id <>', 'B');
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
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
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
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
		$this->db->where('publication.process_state_id <>', 'C');
		$this->db->where('publication.process_state_id <>', 'F');
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
		$this->db->where('publication_id', $publicationId);
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

    public function getAmountCollectedById($publicationId){
        $this->db->select('IFNULL(SUM(quantity),0) AS quan');  
        $this->db->from('donation');
        $this->db->join('donated_object', "donation.donation_id = donated_object.donation_id");        
        $this->db->where('publication_id', $publicationId);
        $this->db->where('process_state_id', 'F');
        $query = $this->db->get();
        return $query->result(); 
    }

    public function getQuantityDonatedById($publicationId){
        $this->db->select('count(*) AS quan');  
        $this->db->from('donation');
        $this->db->where('publication_id', $publicationId);
        $this->db->where('process_state_id', 'F');
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

    public function getHelpsByUser($userId){ 
        $this->db->select('distinct publication.*,publication_object.*'); 
        $this->db->from('publication');
        $this->db->join('publication_object', "publication.publication_id = publication_object.publication_id");
        $this->db->join('donation', "publication.publication_id = donation.publication_id");
        $this->db->where('donation.user_id', $userId);   
        $this->db->where('publication.publication_type_id', 2);
        $this->db->where('publication.process_state_id <>', 'B');
        $this->db->where('publication.process_state_id <>', 'C');
        $query = $this->db->get();
        return $query->result();
    }
}