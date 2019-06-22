<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller 
{

	function __construct() 
	{
        parent::__construct();
        $this->load->database();
        $this->load->model('Admin_model');
        $this->load->model('Basic_model');
    }

	public function index()
	{
		//$this->load->view('admin/login');
		if ($this->Admin_model->adminloginstatus()) 
        {
			$page_data=array();
			$page_data['title']='';
			$page_data['page']='page/dashboard';
			$this->load->view('admin/index',$page_data);
		}
		else
		{
			$this->form_validation->set_rules('email', 'Email', 'trim|required');
            $this->form_validation->set_rules('password', 'Password', 'trim|required|callback_check_login');
            if ($this->form_validation->run() == FALSE) 
            {
                //Field validation failed.  User redirected to login page
                $data['page'] = 'login';
                $data['title'] = 'Login';
                $this->load->view('admin/page/login', $data);
            } else {
                redirect('admin');
            }
		}
	}

	public function login()
	{
		$this->form_validation->set_rules('email', 'Email', 'trim|required');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|callback_check_login');
        if ($this->form_validation->run() == FALSE) 
        {
            $data['page'] = 'login';
            $data['title'] = 'Login';
            $this->load->view('admin/page/login');
        } 
        else 
        {
            redirect('');
        }
	}

	function check_login($password) 
    {
        $username = $this->input->post('email');
        $password = $this->input->post('password');
        $result   = $this->Admin_model->adminLogin($username,$password);
        if($result) 
        {
            $this->session->set_userdata('admin_user', $result);
            $this->session->set_userdata('admin_login', 'yes');
            $this->session->set_userdata('app_id', '1');
            return true;
        } 
        else 
        {
            $this->form_validation->set_message('check_login', 'Invalid username or password');
            return false;
        }
    }


	public function logout()
	{
	    $this->session->unset_userdata('admin_user');
	    $this->session->unset_userdata('admin_login');
	    $this->session->unset_userdata('app_id');
        redirect('');
	}

	public function notfound()
	{
		$this->output->set_status_header('404');
		$this->load->view('admin/404');
	}

	public function blank()
	{
		$page_data=array();
		$page_data['title']='blank';
		$page_data['page']='page/blank';
		$this->load->view('admin/index',$page_data);
	}

	public function dashboard()
	{
		if (!$this->Admin_model->adminloginstatus()) 
        {
        	redirect('admin');
        }
		$page_data=array();
		$page_data['title']='blank';
		$page_data['page']='page/dashboard';
		$this->load->view('admin/index',$page_data);
	}

	public function profile()
	{
		if(!$this->Admin_model->adminloginstatus()) 
        {
        	redirect('admin');
        }

		$page_data=array();
		$page_data['title']='Profile';
		$page_data['page']='page/profile';
		$admin_id=$this->session->userdata('admin_user')->id;
		$page_data['user_data']=$this->db->get_where('admin', array('id' => $admin_id,'status' => '1'))->row();
		$this->load->view('admin/index',$page_data);
	}


	
	public function programmes($argu='',$argu2='')
    {
        if(!$this->Admin_model->adminloginstatus()) 
        {
            redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if($argu=='new')
        {
            $this->form_validation->set_rules('name', 'Name', 'trim|required');
            $this->form_validation->set_rules('code', 'Code', 'trim|required');
            $this->form_validation->set_rules('day', 'Day', 'trim|required');
            $this->form_validation->set_rules('time', 'Time', 'trim|required');
            $this->form_validation->set_rules('type', 'Type', 'trim|required');
            $this->form_validation->set_rules('stage', 'Stage', 'required');
            if($this->form_validation->run() == FALSE)
            { 
                $page_data=array();
                $page_data['title']='New Programme';
                $page_data['page'] ='page/programme_edit';
                $page_data['prg_data']=array();
                
                $page_data['prg_code']='pgm01';
                $lstcode=$this->db->query('select id from programmes order by id desc limit 1');
                if($lstcode->num_rows()>=1)
                {
                    $num=$lstcode->row()->id+1;
                    $page_data['prg_code']='pgm_0'.$num;
                }
                $this->load->view('admin/index',$page_data);
            }
            else
            {
                
                $pdata=array('name'=>$this->input->post('name'),'code'=>$this->input->post('code'),'description'=>trim($this->input->post('description')),'type'=>$this->input->post('type'),'stage'=>$this->input->post('stage'),'day'=>$this->input->post('day'));
                $pdata['time']=date('H:i',strtotime($this->input->post('time')));
                $pdata['added_date']=date('Y-m-d H:i:s'); $pdata['edited_date']=date('Y-m-d H:i:s');
                $pdata['app_id']=$this->session->userdata('app_id');
                $this->db->insert('programmes',$pdata);
                $prgid=$this->db->insert_id();
                if($prgid>0)
                {
                    if (isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                    {
                        $filename3 = 'uploads/programme_image/programme_'.$prgid . '.png';
                        move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                        $this->db->where('id',$prgid)->update('programmes',array('image'=>$filename3));
                    }
                    $this->session->set_flashdata('success', 'Programme has been added successfully!'); 
                }
                else
                {
                    $this->session->set_flashdata('error', 'Error.. try again!'); 
                }
                
                redirect('programmes');
            }
        }
        else if($argu=='edit')
        {
            $prqry=$this->db->where('id',$argu2)->where('app_id',$app_id)->where('status >','0')->get('programmes');
            if($prqry->num_rows()==1)
            {
                $this->form_validation->set_rules('name', 'Name', 'trim|required');
                $this->form_validation->set_rules('code', 'Code', 'trim|required');
                $this->form_validation->set_rules('day', 'Day', 'trim|required');
                $this->form_validation->set_rules('time', 'Time', 'trim|required');
                $this->form_validation->set_rules('type', 'Type', 'trim|required');
                $this->form_validation->set_rules('stage', 'Stage', 'required');
                if($this->form_validation->run() == FALSE)
                { 
                    $page_data=array();
                    $page_data['title']='Edit Programme';
                    $page_data['page'] ='page/programme_edit';
                    $page_data['prg_data']=$prqry->row();
                    $this->load->view('admin/index',$page_data);
                }
                else
                {
                    
                    $pdata=array('name'=>$this->input->post('name'),'code'=>$this->input->post('code'),'description'=>trim($this->input->post('description')),'type'=>$this->input->post('type'),'stage'=>$this->input->post('stage'),'day'=>$this->input->post('day'));
                    $pdata['time']=date('H:i',strtotime($this->input->post('time')));
                    $pdata['app_id']=$this->session->userdata('app_id');
                    $pdata['edited_date']=date('Y-m-d H:i:s');
                    $this->db->where('id',$argu2)->update('programmes',$pdata);
                    $prgid=$this->db->insert_id();
                    if (isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                        {
                            $filename3 = 'uploads/programme_image/programme_'.$argu2 . '.png';
                            move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                            $this->db->where('id',$argu2)->update('programmes',array('image'=>$filename3));
                        }
                    $this->session->set_flashdata('success', 'Programme has been updateed successfully!'); 
                    redirect('programmes');
                }
            }
            else
            {
                redirect('programmes');
            }
            
            
        }
        else if($argu=='delete')
        {   
            $delqry=$this->db->where(array('id'=>$argu2,'status !='=>'0','app_id'=>$app_id))->get('programmes');
            if($delqry->num_rows()==1)
            {
                $this->db->where('id',$argu2)->update('programmes',array('status'=>'0'));
                $this->session->set_flashdata('success', 'Stage has been deleted successfully!'); 
            }
            redirect('programmes');
        }
        else if($argu=='users')
        {
            $tt=$this->db->where('id',$argu2)->get('programmes');
            if($tt->num_rows()!=1)
            {
                $this->session->set_flashdata('error', 'Error.. try again!'); 
                redirect('programmes');
            }
            $rusers=array();
            $reuser=$this->db->query('select u.id,u.first_name,u.last_name,u.email,u.phone,rp.date from user u,registered_programmes rp where rp.programme_id="'.$argu2.'" and rp.user_id=u.id')->result();
            $page_data=array();
            $page_data['rudata']=$reuser;
            $page_data['prg_id']=$argu2;
            $page_data['prg_data']=$tt->row();
            $page_data['title']='Registered Users';
            $page_data['page']='page/registered_users';
            $this->load->view('admin/index',$page_data);
        }
        else
        {
            $page_data=array();
            $page_data['title']='Programmes';
            $page_data['page']='page/programmes';
            $pdata=$this->db->select('p.*,pt.type as ptype,ps.name as sname')->from('programme_types pt,programmes p,programme_stages ps')->where('p.status=1 and p.type=pt.id and p.stage=ps.id and p.app_id="'.$app_id.'"')->order_by('date','desc')->get()->result();
            $page_data['p_data']=$pdata;
            $this->load->view('admin/index',$page_data);
        }
    
    }	

	public function users($argu='',$argu2='')
	{
		if(!$this->Admin_model->adminloginstatus()) 
        {
        	redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if($argu=='view')
        {
        	$page_data=array();
			$page_data['title']='Users';
			$page_data['page']='page/users';
			$this->load->view('admin/index',$page_data);
        }
        else
        {
        	$page_data=array();
			$page_data['title']='Users';
			$page_data['page']='page/users';
			$udata=$this->db->select('*')->from('user')->where('status=1')->where('app_id',$app_id)->order_by('signup_date','desc')->get()->result();
			$page_data['u_data']=$udata;
			$this->load->view('admin/index',$page_data);
        }
		
	}
	
	

	public function busschedule($argu1="")
	{
		if(!$this->Admin_model->adminloginstatus()) 
        {
        	redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if($argu1=="delete")
        {
        	$usdata=$this->db->where('filename','bus')->where('app_id',$app_id)->get('rwmf_files')->row();
        	unlink($usdata->location);
        	$this->db->where('filename','bus')->where('app_id',$app_id)->delete('rwmf_files');
        	$this->session->set_flashdata('success', 'Busschedule deleted successfully!');
        	redirect('busschedule');
        }
        else if(isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '')
        {
        	$file_ext3 = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
           	$filename3 = 'uploads/rwmf_image/rwmf_bus_'.$app_id.'.png';
           	move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
        	$file_data=array('filename'=>'bus','file_type'=>'image','updated_date'=>date('Y-m-d H:i:s'),'location'=>$filename3,'app_id'=>$app_id);
        	$buscq=$this->db->where('filename','bus')->where('app_id',$app_id)->get('rwmf_files');
        	if($buscq->num_rows()>0)
        	{
        		$this->db->where('filename','bus')->where('app_id',$app_id)->update('rwmf_files',$file_data);
        	}
        	else
        	{
        		$this->db->insert('rwmf_files',$file_data);
        	}
        	$this->session->set_flashdata('success', 'Busschedule updated successfully!');
        	redirect('busschedule');
        }
        else
        {
		    $page_data=array();
		    $page_data['title']='Bus Scheduler';
		    $page_data['page']='page/busschedule';
		    $page_data['bus_data']=$this->db->where(array('filename'=>'bus','app_id'=>$app_id))->get('rwmf_files')->row();
	    	$this->load->view('admin/index',$page_data);
        }
	}


	public function ticketinfo($argu1="")
	{
		if(!$this->Admin_model->adminloginstatus()) 
        {
            redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if($argu1=="delete")
        {
            $usdata=$this->db->where('filename','ticket')->where('app_id',$app_id)->get('rwmf_files')->row();
            unlink($usdata->location);
            $this->db->where('filename','ticket')->where('app_id',$app_id)->delete('rwmf_files');
            $this->session->set_flashdata('success', 'Ticket info deleted successfully!');
            redirect('ticketinfo');
        }
        else if($this->input->post())
        {
            $file_data=array('app_id'=>$app_id,'filename'=>'ticket','file_type'=>'image','updated_date'=>date('Y-m-d H:i:s'),'link'=>trim($this->input->post('link')));
            
            $buscq=$this->db->where('filename','ticket')->where('app_id',$app_id)->get('rwmf_files');

            if(isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '')
            {
                $file_ext3 = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
                $filename3 = 'uploads/rwmf_image/rwmf_ticket_'.$app_id.'.png';
                move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                $file_data['location']=$filename3;
                if($buscq->num_rows()>0)
                {
                    $this->db->where('filename','ticket')->update('rwmf_files',$file_data);
                }
                else 
                {
                    $this->db->insert('rwmf_files',$file_data);
                }
                $this->session->set_flashdata('success', 'Ticket info updated successfully!');
            }
            else
            {
                if($buscq->num_rows()>0)
                {
                    $this->db->where('filename','ticket')->update('rwmf_files',$file_data);
                    $this->session->set_flashdata('success', 'Ticket info updated successfully!');
                }
                else
                {
                    $this->session->set_flashdata('ticket_info','Select an image');
                }
            }
            redirect('ticketinfo');
        }
        
        else
        {
            $page_data=array();
            $page_data['title']='Ticket Info';
            $page_data['page']='page/ticketinfo';
            $page_data['ticket_data']=$this->db->where(array('filename'=>'ticket','app_id'=>$app_id))->get('rwmf_files')->row();
            $this->load->view('admin/index',$page_data);
        }
        
	}
	
	public function stages($argu='',$argu2='')
    {
        if(!$this->Admin_model->adminloginstatus()) 
        {
            redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if($argu=='new')
        {
            $this->form_validation->set_rules('name','Name','trim|required');
            $this->form_validation->set_rules('location','Location','trim|required');
            if($this->form_validation->run() == FALSE)
            { 
                $page_data=array();
                $page_data['title']='New Stage';
                $page_data['page'] ='page/stage';
                $page_data['stage']=array();
                $this->load->view('admin/index',$page_data);
            }
            else
            {
                $pdata=array('name'=>trim($this->input->post('name')),'description'=>trim($this->input->post('description')),'location'=>$this->input->post('location'),'latitude'=>$this->input->post('latitude'),'longitude'=>$this->input->post('longitude'));
                $pdata['app_id']=$app_id;
                $this->db->insert('programme_stages',$pdata);
                $prgid=$this->db->insert_id();
                if($prgid>0)
                {
                    if (isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                    {
                        $filename3 = 'uploads/stage_image/stage_'.$prgid . '.png';
                        move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                        $this->db->where('id',$prgid)->update('programme_stages',array('image'=>$filename3));
                    }
                    $this->session->set_flashdata('success', 'Stage has been added successfully!'); 
                }
                else
                {
                    $this->session->set_flashdata('error', 'Error.. try again!'); 
                }
                
                redirect('stages');
            }
        }
        else if($argu=='edit')
        {
            $stageqry=$this->db->where('id',$argu2)->where('app_id',$app_id)->where('status >','0')->get('programme_stages');
            if($stageqry->num_rows()==1)
            {
                $this->form_validation->set_rules('name','Name','trim|required');
                $this->form_validation->set_rules('location','Location','trim|required');
                if($this->form_validation->run() == FALSE)
                { 
                    $page_data=array();
                    $page_data['title']='Edit Stage';
                    $page_data['page'] ='page/stage';
                    $page_data['stage']=$stageqry->row();
                    $this->load->view('admin/index',$page_data);
                }
                else
                {
                    
                    $pdata=array('name'=>trim($this->input->post('name')),'description'=>trim($this->input->post('description')),'location'=>$this->input->post('location'),'latitude'=>$this->input->post('latitude'),'longitude'=>$this->input->post('longitude'));
                    $pdata['app_id']=$app_id;
                    $this->db->where('id',$argu2)->update('programme_stages',$pdata);
                    if (isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                    {
                        $filename3 = 'uploads/stage_image/stage_'.$argu2 . '.png';
                        move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                        $this->db->where('id',$argu2)->update('programme_stages',array('image'=>$filename3));
                    }
                    $this->session->set_flashdata('success', 'Stage has been updated successfully!'); 
                    redirect('stages');
                }
            }
            else
            {
                redirect('stages');
            }
            
            
        }
        else if($argu=='delete')
        {
            if($argu2)
            {
                $this->db->where('id',$argu2)->where('app_id',$app_id)->update('programme_stages',array('status'=>'0'));
                $this->session->set_flashdata('success', 'Stage has been deleted successfully!'); 
            }
            redirect('stages');
        }
        else
        {
            $page_data=array();
            $page_data['title']='Stages';
            $page_data['page']='page/stages';
            $pdata=$this->db->select('*')->from('programme_stages')->where('status=1')->where('app_id',$app_id)->order_by('name')->get()->result();
            $page_data['s_data']=$pdata;
            $this->load->view('admin/index',$page_data);
        }
        
    }
    
    public function gallery($argu='',$action='',$argu2='')
    {
        $tt=$this->db->where('id',$argu)->get('programmes');
        if($tt->num_rows()!=1)
        {
            $this->session->set_flashdata('error', 'Error.. try again!'); 
            redirect('programmes');
        }
        if($action=='edit' && $argu2>0)
        {
            $gqry=$this->db->where(array('programme_id'=>$argu,'id'=>$argu2))->get('programme_gallery');
            if($gqry->num_rows()==1)
            {
                $this->form_validation->set_rules('gallery_type','Gallery_type','trim|required');
                if($this->form_validation->run() == FALSE)
                {
                    $page_data=array();
                    $page_data['title']='Gallery Edit';
                    $page_data['page']='page/gallery_edit';
                    $page_data['gal_data']=$gqry->row();
                    $page_data['prg_id']=$argu;
                    $this->load->view('admin/index',$page_data);
                }
                else
                {
                    //print_r($this->input->post());
                    $gallery_data=array('programme_id'=>$argu,'gallery_type'=>trim($this->input->post('gallery_type')),'caption'=>trim($this->input->post('caption')),'title'=>trim($this->input->post('title')));
                    $gallery_data['date']=date('Y-m-d H:i:s');
                    if(trim($this->input->post('gallery_type'))=='youtube')
                    {
                        $gallery_data['link']=$this->input->post('link');
                        $gallery_data['location_type']='link';
                    }
                    $this->db->where('id',$argu2)->update('programme_gallery',$gallery_data);
                    $gal_id=$this->db->insert_id();
                    if($argu2)
                    {
                        if (trim($this->input->post('gallery_type'))=='image' && isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                        {
                            $filename3 = 'uploads/gallery_image/gallery_'.$argu2 . '.png';
                            move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                            $this->db->where('id',$argu2)->update('programme_gallery',array('link'=>$filename3));
                        }
                        $this->session->set_flashdata('success', 'gallery has been updated successfully!');
                    }
                
                    redirect('gallery/'.$argu);
                }
            }
            else
            {
                redirect('gallery/'.$argu);
            }
        }
        else if($action=='new' && $argu2<=0)
        {
            $this->form_validation->set_rules('gallery_type','Gallery_type','trim|required');
            if($this->form_validation->run() == FALSE)
            { 
                $page_data=array();
                $page_data['title']='Gallery New';
                $page_data['page']='page/gallery_edit';
                $page_data['gal_data']=array();
                $page_data['prg_id']=$argu;
                $this->load->view('admin/index',$page_data);
            }
            else
            {
                $gallery_data=array('programme_id'=>$argu,'gallery_type'=>trim($this->input->post('gallery_type')),'caption'=>trim($this->input->post('caption')),'title'=>trim($this->input->post('title')));
                $gallery_data['date']=date('Y-m-d H:i:s');
                if(trim($this->input->post('gallery_type'))=='youtube')
                {
                    $gallery_data['link']=$this->input->post('link');
                    $gallery_data['location_type']='link';
                }
                $this->db->insert('programme_gallery',$gallery_data);
                $gal_id=$this->db->insert_id();
                if($gal_id)
                {
                    if (trim($this->input->post('gallery_type'))=='image' && isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                    {
                        $filename3 = 'uploads/gallery_image/gallery_'.$gal_id . '.png';
                        move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                        $this->db->where('id',$gal_id)->update('programme_gallery',array('link'=>$filename3));
                    }
                    $this->session->set_flashdata('success', 'Stage has been added successfully!');
                }
                
                redirect('gallery/'.$argu);
            }
        }
        else if($action=='delete' && $argu2>0)
        {
            if($argu2)
            {
                $this->db->where('id',$argu2)->where('programme_id',$argu)->update('programme_gallery',array('status'=>'0'));
                $this->session->set_flashdata('success', 'Gallery item has been deleted successfully!'); 
            }
            redirect('gallery/'.$argu);
        }
        else
        {
            $page_data=array();
            $page_data['title']='Programme Gallery';
            $page_data['page']='page/programme_gallery';
            $gdata=$this->db->select('*')->from('programme_gallery')->where('status=1 and programme_id='.$argu)->order_by('date','desc')->get('')->result();
            $page_data['g_data']=$gdata;
            $page_data['prg_id']=$argu;
            $this->load->view('admin/index',$page_data);
        }
    }
    
    public function ads($argu='',$argu2='')
    {
        if(!$this->Admin_model->adminloginstatus()) 
        {
            redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if($argu=='new')
        {
            $this->form_validation->set_rules('name','Name','trim|required');
            $this->form_validation->set_rules('link','Link','trim|required');
            if($this->form_validation->run() == FALSE)
            { 
                $page_data=array();
                $page_data['title']='New Advertisement';
                $page_data['page'] ='page/ads';
                $page_data['ads']=array();
                $this->load->view('admin/index',$page_data);
            }
            else
            {
                $pdata=array('name'=>trim($this->input->post('name')),'link'=>trim($this->input->post('link')),'status'=>trim($this->input->post('status')),'last_update'=>date('Y-m-d H:i:s'));
                $pdata['app_id']=$app_id;
                $this->db->insert('advertisement',$pdata);
                $prgid=$this->db->insert_id();
                if($prgid>0)
                {
                    if (isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                    {
                        $filename3 = 'uploads/ads_image/ads_'.$prgid . '.png';
                        move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                        $this->db->where('id',$prgid)->update('advertisement',array('image'=>$filename3));
                    }
                    $this->session->set_flashdata('success', 'Advertisement has been added successfully!'); 
                }
                else
                {
                    $this->session->set_flashdata('error', 'Error.. try again!'); 
                }
                
                redirect('ads');
            }
        }
        else if($argu=='edit')
        {
            $stageqry=$this->db->where('id',$argu2)->where('app_id',$app_id)->where('status >','0')->get('advertisement');
            if($stageqry->num_rows()==1)
            {
                $this->form_validation->set_rules('name','Name','trim|required');
                $this->form_validation->set_rules('link','Link','trim|required');
                if($this->form_validation->run() == FALSE)
                { 
                    $page_data=array();
                    $page_data['title']='Edit Advertisement';
                    $page_data['page'] ='page/ads';
                    $page_data['ads']=$stageqry->row();
                    $this->load->view('admin/index',$page_data);
                }
                else
                {
                    
                    $pdata=array('name'=>trim($this->input->post('name')),'link'=>trim($this->input->post('link')),'status'=>trim($this->input->post('status')),'last_update'=>date('Y-m-d H:i:s'));
                    $pdata['app_id']=$app_id;
                    $this->db->where('id',$argu2)->update('advertisement',$pdata);
                    if (isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '') 
                    {
                        $filename3 = 'uploads/ads_image/ads_'.$argu2 . '.png';
                        move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
                        $this->db->where('id',$argu2)->update('advertisement',array('image'=>$filename3));
                    }
                    $this->session->set_flashdata('success', 'Advertisement has been updated successfully!'); 
                    redirect('ads');
                }
            }
            else
            {
                redirect('ads');
            }
            
            
        }
        else if($argu=='delete')
        {
            if($argu2)
            {
                $this->db->where('id',$argu2)->where('app_id',$app_id)->update('advertisement',array('status'=>'0'));
                $this->session->set_flashdata('success', 'Advertisement has been deleted successfully!'); 
            }
            redirect('ads');
        }
        else
        {
            $page_data=array();
            $page_data['title']='Advertisement';
            $page_data['page']='page/adslist';
            $pdata=$this->db->select('*')->from('advertisement')->where('status>=1')->where('app_id',$app_id)->order_by('name')->get()->result();
            $page_data['ads_data']=$pdata;
            $this->load->view('admin/index',$page_data);
        }
        
    }
    
    //21-06-2019
    
    public function appicon($argu1="")
    {
        if(!$this->Admin_model->adminloginstatus()) 
        {
            redirect('admin');
        }
        $app_id=$this->session->userdata('app_id');
        if(isset($_FILES["image"]["tmp_name"]) && $_FILES["image"]["tmp_name"] != '')
        {
            $file_ext3 = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
            $filename3 = 'uploads/app_icons/app_'.$app_id.'/512x512.png';
            move_uploaded_file($_FILES["image"]['tmp_name'], $filename3);
            $this->appiconsup('48','48');
            $this->appiconsup('72','72');
            $this->appiconsup('96','96');
            $this->appiconsup('144','144');
            $this->appiconsup('168','168');
            $this->appiconsup('192','192');
            $this->session->set_flashdata('success', 'App icon updated successfully!');
            redirect('appicon');
        }
        else
        {
            $page_data=array();
            $page_data['title']='App Icon';
            $page_data['page']='page/appicon';

            $applink=base_url('uploads/app_icons/app_').$app_id.'/512x512.png';
            $page_data['appicon_link']=$applink;

            $this->load->view('admin/index',$page_data);
        }
    }
    

    function appiconsup($width = '512', $height = '512')
    {
        $app_id=$this->session->userdata('app_id');
        $this->load->library('image_lib');
        ini_set("memory_limit", "-1");
        $config1['image_library']  = 'gd2';
        $config1['new_image']   = 'uploads/app_icons/app_'.$app_id.'/'.$width.'x'.$height.'.png';
        $config1['maintain_ratio'] = TRUE;
        $config1['width']          = $width;
        $config1['height']         = $height;
        $config1['source_image']   = 'uploads/app_icons/app_'.$app_id.'/512x512.png';
        $this->image_lib->initialize($config1);
        $this->image_lib->resize();
        $this->image_lib->clear();
    }
    
    
}

?>