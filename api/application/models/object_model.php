<?php

class Object_model extends CI_Model
{
	public function getObjects(){
		$this->db->select('*');	
		$this->db->from('object');
		$query = $this->db->get();
		return $query->result();
	}
	
	public function getById($id){
		$this->db->select('*');	
		$this->db->from('object');
		$this->db->where('object_id',$id);
		$query = $this->db->get();
		return $query->result();
	}

	public function getBySubcategory($category, $subcategoryId){
		$this->db->select('*');	
		$this->db->from('object');
		$this->db->where('subcategory_id',$subcategoryId);
		$this->db->where('category_id',$category);
		$query = $this->db->get();
		return $query->result();
	}
}