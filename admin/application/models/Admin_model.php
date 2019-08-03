<?php

class Admin_model extends CI_Model 
{

    function __construct() 
    	{
        	parent::__construct();
    	}


	public function adminLogin($username, $password) 
    	{
        	$query = $this->db->get_where('admin', array('email' => $username, 'password' => md5($password), 'status' => '1'));
        	if ($query->num_rows()== 1) 
        	{
            	return $query->row();
        	} 
        	else 
        	{
            	return false;
        	}
    	}

    public function adminloginstatus() 
        {
            $status=false;
            if ($this->session->userdata('admin_login') == 'yes') 
            {
                $admin_id=$this->session->userdata('admin_user')->id;
                $query = $this->db->get_where('admin', array('id' => $admin_id,'status' => '1'));
                if ($query->num_rows() == 1) 
                {
                    $status=true;
                    $this->session->set_userdata('admin_user', $query->row());
                }
                else
                {
                    $this->session->unset_userdata('admin_user');
                    $this->session->unset_userdata('admin_login');
                }
            }
            return $status;
        }

}
?>