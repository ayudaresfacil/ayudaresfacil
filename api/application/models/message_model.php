<?php
class Message_model extends CI_Model
{
	public function getById($id){
		$this->db->select('*');	
		$this->db->from('message');
		$this->db->where('message_id',$id);
		$query = $this->db->get();
		return $query->result();
	}
    public function getConversationFromMyPublications($userId){
        $sql   = " SELECT * FROM MESSAGE WHERE MESSAGE_ID IN (";
        $sql  .= " SELECT MAX(message_id)";
        $sql  .= " FROM message m ";
        $sql  .= " WHERE EXISTS (SELECT publication_id FROM publication p";
        $sql  .= "         WHERE p.publication_id = m.publication_id";
        $sql  .= "         AND user_id = $userId)";
        $sql  .= " AND delete_date IS NULL";
        $sql  .= " GROUP BY conversation_id)";
        $sql  .= " ORDER BY message_id";
        $query = $this->db->query($sql);
        return $query->result();
    }
    public function getConversationFromOthersPublications($userId){
        $sql   = " SELECT * FROM MESSAGE WHERE MESSAGE_ID IN (";
        $sql  .= " SELECT MAX(message_id)";
        $sql  .= " FROM message m ";
        $sql  .= " WHERE (user_id_from = $userId OR user_id_to = $userId) ";
        $sql  .= " AND NOT EXISTS (SELECT publication_id FROM publication p";
        $sql  .= "         WHERE p.publication_id = m.publication_id";
        $sql  .= "         AND user_id = $userId)";
        $sql  .= " AND delete_date IS NULL";
        $sql  .= " GROUP BY conversation_id)";
        $sql  .= " ORDER BY message_id";
        $query = $this->db->query($sql);
        //echo $this->db->last_query();
        return $query->result();
    }
    public function getConversationFromAllPublications($userId){
        $sql   = " SELECT * FROM MESSAGE WHERE MESSAGE_ID IN (";
        $sql  .= " SELECT MAX(message_id)";
        $sql  .= " FROM message m ";
        $sql  .= " WHERE (user_id_from = $userId OR user_id_to = $userId) ";
        $sql  .= " AND delete_date IS NULL";
        $sql  .= " GROUP BY conversation_id)";
        $sql  .= " ORDER BY message_id";
        $query = $this->db->query($sql);
        return $query->result();
    }
	public function create($options){
        if(isset($options->conversationId)&&$options->conversationId>0){
            $conversationId = $options->conversationId;
        }else{
            $sql   = " SELECT distinct(conversation_id) FROM MESSAGE ";
            $sql  .= " WHERE (user_id_from = $options->userFrom OR  user_id_to = $options->userFrom)";
            $sql  .= " AND publication_id = $options->publication  AND delete_date is null";
            $query = $this->db->query($sql);
            $results = $query->result();
            if(!empty($results)){
                foreach($results as $result) {
                        $conversationId = $result->conversation_id;
                }
            }
            if (!(isset($conversationId))||$conversationId==0){
                $this->db->select('IFNULL(MAX(conversation_id),0)+1 conversation_id');
                $this->db->from('message');
                $this->db->where('delete_date',null);
                $results = $this->db->get()->result();
                foreach($results as $result) {
                        $conversationId = $result->conversation_id;
                }
            }
        }

        $this->db->trans_start();
        $data = array   (
                            'user_Id_From' => $options->userFrom,
                            'user_Id_To' => $options->userTo,
                            'publication_Id' => $options->publication,
                            'conversation_Id' => $conversationId,
                            //'FAQ' => $options->FAQ,
                            //'common_State_Id' => $options->commonState->getId(),
                            //'subject' => $options->subject,
                            'text' => $options->text
                        );
        $this->db->insert('message', $data);
        $this->db->trans_complete();

        $id = $this->db->insert_id();

        if ($this->db->trans_status() === FALSE){
            $id = null;
            log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
        }

        return $id;
	}
	public function update($options){
		$this->db->trans_start();
		
		$data = array 	(
							'user_Id_From' => $options->UserIdFrom,
							'user_Id_To' => $options->UserIdTo,
							'publication_Id' => $options->publicationId,
							'first_Message_Id' => $options->firstMessageId,
							'FAQ' => $options->FAQ,
							'common_State_Id' => $options->commonState->getId(),
							'subject' => $options->subject,
							'text' => $options->text,
							'update_Date' => $options->updateDate
						); 

		$this->db->where('message_id', $options->id);
		$this->db->trans_complete();

		if ($this->db->trans_status() === FALSE){
      		$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}

		return $this->db->update('message', $data);
	}
	public function delete($id){
		$this->db->trans_start();
		
		$data = array ('delete_date' => date('Y/m/d H:i:s'));
		$this->db->where('message_id', $id);
		$this->db->update('message',$data);
		$this->db->trans_complete();
		
		if ($this->db->trans_status() === FALSE){
			$id = null;
      		log_message('error', "DB Error: (".$this->db->_error_number().") ".$this->db->_error_message());
		}
		
		return $id;
	}
    public function getConversationByUserPublication($publicationId,$userId){
        $sql   = " SELECT MAX(conversation_id) conversation_id FROM MESSAGE ";
        $sql  .= " WHERE (user_id_from = $userId OR  user_id_to = $userId)";
        $sql  .= " AND publication_id = $publicationId  AND delete_date is null";
        $query = $this->db->query($sql);
        $results = $query->result();
        if(!empty($results)){
            foreach($results as $result) {
                    $conversationId = $result->conversation_id;
            }
        }
        if (!(isset($conversationId))||$conversationId==0){
            $this->db->select('IFNULL(MAX(conversation_id),0)+1 conversation_id');
            $this->db->from('message');
            $this->db->where('delete_date',null);
            $results = $this->db->get()->result();
            if(!empty($results)){
                foreach($results as $result) {
                        $conversationId = $result->conversation_id;
                }
            }
        }
        return $conversationId; 
    }

    public function getConversation($conversationId){
        $this->db->select('*');
        $this->db->from('message');
        $this->db->where('conversation_id',$conversationId);
        $this->db->where('delete_date',null);
        $this->db->order_by('create_date','asc');
        $query = $this->db->get()->result();
        return $query;
    }

    public function setMessagesRead($conversationId){
        $data = array   (
            'common_state_id' => 'L'
        );
        $this->db->where('conversation_id', $conversationId); 
        $this->db->update('message', $data);   
    }
    
    public function getQuantityUnreadMessages($userId){
        $sql   = " SELECT COUNT(*) AS quantity";
        $sql  .= " FROM message m ";
        $sql  .= " WHERE (user_id_from = $userId OR user_id_to = $userId) ";
        $sql  .= " AND common_state_id = 'N'";
        $sql  .= " GROUP BY conversation_id";
        $query = $this->db->query($sql);
        return $query->num_rows();
    }
}
