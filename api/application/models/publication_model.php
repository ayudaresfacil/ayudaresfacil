<?php

class Publication_model extends CI_Model
{

		public function getById($id){
		$this->db->select('*');	
		$this->db->from('publication');
		$this->db->where('publication_id',$id);
		$query = $this->db->get();
		return $query->result();
	}

}