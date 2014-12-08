<?php

class User_model extends CI_Model
{
	public function getUsers(){
		$this->db->select('user.user_id user_id,email,enabled,deleted,name,last_name,birthday_date,description,gravatar_email');	
		$this->db->from('user');
		$this->db->join('user_data', 'user.user_id = user_data.user_id', 'left outer');	
		$query = $this->db->get();
		return $query->result();
	}
	
	public function getById($id){
		$this->db->select('user.user_id user_id,email,enabled,deleted,name,last_name,birthday_date,description,gravatar_email');	
		$this->db->from('user');
		$this->db->join('user_data', 'user.user_id = user_data.user_id', 'left outer');
		$this->db->where('user.user_id',$id);
		$query = $this->db->get();
		return $query->result();
	}
	
	public function create($options){
		$this->db->trans_start();
		$data = array 	(
							'email' => $options->email,
							'password' => sha1($options->password)
						);
		$this->db->insert('user', $data);
		$id = $this->db->insert_id();
		$data = array 	(
							'user_id' => $id,
							'name' => $options->name,
							'last_name' => $options->lastName,
							'description' => $options->description
						);
		$this->db->insert('user_data', $data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		return $id;
	}
	
	public function update($post){
		$this->db->trans_start();
		$data = array 	(
							'email' => $post->email
						); 
		$this->db->where('user_id', $post->id);
		$this->db->update('user', $data);

		$data = array 	(
							'name' => $post->name,
							'last_name' => $post->lastName,
							'birthday_date' => $post->birthdayDate,
							'description' => $post->description
						);
		$this->db->where('user_id', $post->id);
		$this->db->update('user_data', $data);
		$this->db->trans_complete();
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}

	}
	
	public function delete($id){
		$this->db->trans_start();
		
		$data = array ('deleted' => 1);
		$this->db->where('user_id', $id);
		$this->db->update('user',$data);
		$this->db->trans_complete();
		
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		
		return $id;
	}

	public function getByUsernameAndPassword($options){
		$this->db->select('user.user_id user_id,email,name,last_name,gravatar_email');	
		$this->db->from('user');
		$this->db->join('user_data', 'user.user_id = user_data.user_id', 'left outer');
		$this->db->where('email',$options['email']);
		$this->db->where('password',sha1($options['password']));
		$this->db->where('enabled',1);
		$this->db->where('deleted',0);
		
		$query = $this->db->get();

		return $query->result();
	}

	public function getByUsername($username){
		$this->db->select('*');	
		$this->db->from('user');
		$this->db->where('email',$username);
		$this->db->where('deleted',0);

		$query = $this->db->get();
		
		return $query->result();
	}
	
	public function confirmAccount($id){
		$this->db->trans_start();
		
		$data = array ('enabled' => 1);
		$this->db->where('user_id', $id);
		$this->db->update('user',$data);
		$this->db->trans_complete();
		
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		
		return $id;
	}
}