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

    public function pause($publicationId){
        $this->db->trans_start();
        $data = array ('process_state_id' => 'P');
        $this->db->where('publication_id', $publicationId);
        $this->db->update('publication',$data);
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE){
            $publicationId = null;
            log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
        }
        return TRUE;
    }

    public function finish($publicationId){
        $this->db->trans_start();
        $data = array ('process_state_id' => 'F');
        $this->db->where('publication_id', $publicationId);
        $this->db->update('publication',$data);
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE){
            $publicationId = null;
            log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
        }
        return TRUE;
    }

    public function resume($publicationId){
        $this->db->trans_start();
        $data = array ('process_state_id' => 'V');
        $this->db->where('publication_id', $publicationId);
        $this->db->update('publication',$data);
        $this->db->trans_complete();

        if ($this->db->trans_status() === FALSE){
            $publicationId = null;
            log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
        }
        return TRUE;
    }

}