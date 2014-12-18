<?php

class Donation_model extends CI_Model
{
	public function getDonations(){
		$this->db->select('*');	
		$this->db->from('donation');
		$query = $this->db->get();
		return $query->result();
	}
	
	public function getById($id){
		$this->db->select('*');	
		$this->db->from('donation');
		$this->db->where("donation_id",$id);
		$query = $this->db->get();
		return $query->result();
	}

	public function getByPublicationId($publicationId){
		$this->db->select('*');	
		$this->db->from('donation');
		$this->db->where("publication_id",$publicationId);
		$query = $this->db->get();
		return $query->result();
	}

	public function getByUserId($userId){
		$this->db->select('*');	
		$this->db->from('donation');
		$this->db->where("user_id",$userId);
		$query = $this->db->get();
		return $query->result();
	}

	public function create($options){
		$this->db->trans_start();
		$data = array 	(
							'user_Id' => $options->userId,
							'publication_Id' => $options->publicationId,
							'process_State_Id' => $options->processState
						);
		$this->db->insert('donation', $data);
		$id = $this->db->insert_id();
		$this->db->trans_complete();
		
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}

		return $id;
	}

	public function update($options){
		$this->db->trans_start();
		
		$data = array 	(
							'user_Id' => $options->userId,
							'publication_Id' => $options->publicationId,
							'process_State_Id' => $options->processState
						); 

		$this->db->where('donation_id', $options->id);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
      		$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}

		return $this->db->update('donation', $data);
	}

	public function delete($id){
		$this->db->trans_start();		
		$this->db->where('donation_id', $id);
		$this->db->update('donation',$data);
		$this->db->trans_complete();
		
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		
		return $id;
	}

	public function getByUserAndPublication($userId,$publicationId){
		$this->db->select('*');	
		$this->db->from('donation');
		$this->db->where("user_id",$userId);
		$this->db->where("publication_id",$publicationId);
        $this->db->order_by("donation_id","DESC");
		$query = $this->db->get();
		return $query->result();
	}
/*
        $this->db->select('user_id');   
        $this->db->select('publication_id');
        $this->db->select('object_id');
        $this->db->select('SUM(quantity) amountDonated');
        $this->db->select('COUNT(1) quantityDonated');
        $this->db->select('process_state_id');
        $this->db->from('donation');
        $this->db->join('donated_object', 'donation.donation_id = donated_object.donation_id');
        $this->db->where('user_id',$userId);
        $this->db->where('publication_id',$publicationId);
        $this->db->group_by('user_id,publication_id,object_id,process_state_id');
        $query = $this->db->get();
        return $query->result();
*/
}