<?php
	function checkIsLoggedIn($self){
        $token = "";

        if(!empty($self->get('token'))){
            $token = $self->get('token');
        }elseif(!empty($self->post('token'))){
            $token = $self->post('token');
        }elseif(!empty($self->put('token'))){
            $token = $self->put('token');
        }elseif(!empty($self->delete('token'))){
            $token = $self->delete('token');
        }

		if(!CI_Authentication::isLoggedIn($token))
			$self->response(array('status' => 'UNAUTHORIZED'), 401);		
	}
?>