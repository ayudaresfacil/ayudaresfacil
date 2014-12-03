<?php

class Subcategory_model extends CI_Model
{
	public function getSubcategories(){
		$this->db->select('*');	
		$this->db->from('publication_subcategory');
		$query = $this->db->get();
		return $query->result();
	}
	
	public function getById($categoryId, $id){
		$this->db->select('*');	
		$this->db->from('publication_subcategory');
		$this->db->where('subcategory_id',$id);
		$this->db->where('category_id',$categoryId);
		$query = $this->db->get();
		return $query->result();
	}

	public function getByCategory($categoryId){
		$this->db->select('*');	
		$this->db->from('publication_subcategory');
		$this->db->where('category_id',$categoryId);
		$query = $this->db->get();
		return $query->result();
	}
}