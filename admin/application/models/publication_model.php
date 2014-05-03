<?php

class Publication_model extends CI_Model
{
	public function getPublications(){
		$this->db->select('*');	
		$this->db->from('publication');		
		$query = $this->db->get();
		return $query->result();
	}


	public function getById($id){
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->where('publication_id',$id);
		$this->db->where('deleted',0);
		$query = $this->db->get();
		return $query->result();
	}

	public function create($options){
		$this->db->trans_start();
		$data = array 	(
							'user_id' => $options->userId,
							'publication_type_id' => $options->publicationTypeId,
							'creation_date' => $options->creationDate,
							'title' => $options->title,
							'description' => $options->description,
							'expiration_date' => $options->expirationDate,
							'category_id' => $options->categoryId,
							'subcategory_id' => $options->subcategoryId,
							'views' => $options->views,
							'process_state_id' => $options->processStateId,
						);
		$this->db->insert('publication', $data);
		$id = $this->db->insert_id();
		$data = array 	(
							'publication_id' => $id,
							'object_id' => $options->objectId,
							'quantity' => $options->quantity,
						);
		$this->db->insert('publication_object', $data);
		if ($options->publicationTypeId == 1) {
			$data = array 	(
								'publication_id' => $id,
								'process_state_id' => $options->processStateIdOffer,
								'offer_type_id' => $options->offerTypeId,
								'quantity_users_to_paused' => $options->quantityUsersToPaused,
							);
			$this->db->insert('publication_offer', $data);
		}
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return $id;
	}

	public function delete($id){

		$this->db->trans_start();
		$data = array ('deleted' => 1);
		$this->db->where('publication_id', $id);
		$this->db->update('publication',$data);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}

		return $id;
	}

	public function update($options){
		$data = array 	(
							'user_id' => $options->userId,
							'creation_date' => $options->creationDate,
							'tittle' => $options->title,
							'description' => $options->description,
							'expiration_date' => $options->expirationDate,
							'category_id' => $options->categoryId,
							'subcategory_id' => $options->subcategoryId,
							'views' => $options->views,
						);
		$this->db->where('publication_id', $options->publicationId);
		return $this->db->update('publication', $data);
	}
}