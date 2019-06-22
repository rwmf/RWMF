<?php
  defined('BASEPATH') OR exit('No direct script access allowed');

  require(APPPATH.'/libraries/REST_Controller.php');
  class Rwmf extends REST_Controller
  {

  public function __construct()
    {
          parent::__construct();
          $this->load->database();
          $this->load->model('Apibasic_model');
          $this->load->model('Basic_model');
          //$app_data=$this->db->where('status',1)->get('apps')->row();
          //$app_id=$this->db->where('status',1)->get('apps')->row()->id;
    }

    //version check
    public function version_get()
    {
      $result['status'] = 200;
      //$result['message']= 'failed';
      $version = $this->db->get_where('version')->row()->version;
      $result['message']= 'success';
      $result['data']['version']= $version;
      $this->response($result);
    }
    
    public function appicon_get()
    {
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['icons']= array();
      
      $icons= $this->Apibasic_model->appicon();
      if($icons)
       {
        $result['status'] = 200;
        $result['message']= 'success';
        $result['data']['icons']= $icons;
       }
      $this->response($result);
    }

    //Signup
    public function signup_post()
    {
      if($this->post())
      {
        $data=array();

        $data['first_name'] = trim($this->post("first_name"));
        $data['last_name']  = trim($this->post("last_name"));
        $data['phone']      = trim($this->post("phone"));
        $data['email']      = trim($this->post("email"));
        $data['password']   = md5(trim($this->post("password")));
        //$data['device_id']  = trim($this->post("device_id"));
        //$data['device_type']= trim($this->post("device_type"));
        $this->response($this->Apibasic_model->register($data));
      
      }
      else
      {
        $result['status'] = 400;
        $result['message']= 'failed';
        $result['data']['display'] = 'Enter valid data';
        $this->response($result);
      }

    }
    
    //login
    public function login_post()
    {
      if($this->post())
      {
        $data=array();

        $data['email']      = trim($this->post("email"));
        $data['password']   = trim($this->post("password"));
        //$data['device_id']  = trim($this->post("device_id"));
        //$data['device_type']= trim($this->post("device_type"));
        $this->response($this->Apibasic_model->login($data));
      
      }
      else
      {
        $result['status'] = 400;
        $result['message']= 'failed';
        $result['data']['display'] = 'Enter valid data';
        $this->response($result);
      }
    }


    //forgot password
    public function forgotpassword_post()
    {
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      if($this->post("email"))
      {
        $userqry=$this->db->where(array('email'=>trim($this->post("email")),'status'=>'1'))->get('user');
        if($userqry->num_rows()==1)
        {
          $udata=$userqry->row();
          $email=$udata->email;
          $passwordplain = "";
          $passwordplain = bin2hex(openssl_random_pseudo_bytes(3));
          $this->email->from('admin@rwmf.com', 'Rwmf:Password Change');
          $this->email->reply_to('no_replay@rwmf.com','no_replay');
          $this->email->to($email);   
          $this->email->subject('Password Reset');
          $this->email->message('<br/>You recently requested to reset your password , Here is your new password: <b>'.$passwordplain.' </b>' ); 
          $this->email->set_mailtype('html');
          if ($this->email->send()) 
          {
              $newpass['password'] = md5($passwordplain);
              $this->db->where(array('email'=>trim($email),'status'=>'1'))->update('user',$newpass); 
              $this->Apibasic_model->usertoken($udata->id);
              $result['status'] = 200;
              $result['message']= 'success';
              $result['data']['display'] = 'New password is sent to your email id';
          }
        }
        else
        {
          $result['data']['display'] = 'Email id not registed with us';
        }
      }
      else
      {
        $result['data']['display'] = 'Enter valid email id';
        
      }
      $this->response($result);
    }

    //dasboard
    public function dashboard_post()
    {
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
        }
      }
    
      $app_id=$this->Apibasic_model->appdata('id');

      $result['status'] = 200;
      $result['message']= 'success';
      $result['data']['login_status']= $login_status;
      $result['data']['notifi_count']= $notifi_count;
      $result['data']['user_data']   = $u_data;
      $result['data']['programme_types'] = $this->db->select('id,type')->where('status',1)->where('app_id',$app_id)->get('programme_types')->result();
      $result['data']['programme_days']  = $this->db->select('day,date')->where('status',1)->where('app_id',$app_id)->order_by('day')->get('programme_days')->result();
      $result['data']['programme_list']  = $this->Apibasic_model->programmes_list($limit='',$offset='',$type='',$search_Key='');

      $this->response($result);

    }


    //Bus Scheduler 
    public function busschedule_post()
    {   
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
        }
      }

          $result=array();  
          $result['status'] = 400;
          $result['message']= 'failed';
          $result['data']['bus_schedule']=null;  
      $app_id=$this->Apibasic_model->appdata('id');    
      $bus_qry=$this->db->select('location as schedule,updated_date')->where('filename','bus')->where('app_id',$app_id)->get('rwmf_files');
      if($bus_qry->num_rows()==1)
      {
        $bus_array=$bus_qry->result_array();
        if(file_exists($bus_array[0]['schedule']))
        {
          $bus_array[0]['schedule']=base_url().$bus_array[0]['schedule'].'?'.time();
          $bus_array[0]['image_name']=pathinfo($bus_array[0]['schedule'], PATHINFO_FILENAME);
          $bus_schedule=$bus_array[0];
          $result=array();
          $result['status'] = 200;
          $result['message']= 'success';
          $result['data']['bus_schedule']= $bus_array[0];
        }
      }

      $this->response($result);

    }
    
    //Ticket Info
    public function ticketinfo_post()
    {   
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
        }
      }

      $result=array();  
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['ticket_info']=null;

      $tck_qry=$this->db->select('location as ticket_image,link as booking_link,updated_date')->where('filename','ticket')->get('rwmf_files');
      if($tck_qry->num_rows()==1)
      {
        $tck_array=$tck_qry->result_array();
        if(file_exists($tck_array[0]['ticket_image']))
        {
          $tck_array[0]['ticket_image']=base_url().$tck_array[0]['ticket_image'].'?'.time();
          $tck_array[0]['image_name']=pathinfo($tck_array[0]['ticket_image'], PATHINFO_FILENAME);
          $bus_schedule=$tck_array[0];
          $result=array();
          $result['status'] = 200;
          $result['message']= 'success';
          $result['data']['ticket_info']= $tck_array[0];
        }
      }

      $this->response($result);

    }
    
    
    //programme list with search and sort by type
    public function programmes_post()
    {
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
        }
      }

      $type='';$search_key='';$limit=$offset='';$day='';
      if($this->post("type"))
      {
        $type=trim($this->post("type"));
      }
      if($this->post("search_key"))
      {
        $search_key=trim($this->post("search_key"));
      }
      if($this->post("day"))
      {
        $day=trim($this->post("day"));
      }

      $result=array();
      $result['status'] = 200;
      $result['message']= 'success';
      $result['data']['programme_list']=array();

      $programme_list = $this->Apibasic_model->programmes_list($limit,$offset,$type,$search_key,$day);
      if($programme_list)
      {
        $result['data']['programme_list']=$programme_list;
        $result['data']['display']='Programme List';
      }
      else
      {
        $result['status'] = 400;
        $result['message']= 'failed';
        $result['data']['display']='No Programmes';
      }
      $this->response($result);  

    }    
    
    //user profile
    public function userprofile_post()
    {
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['display']='profile not found';
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
          $result['status'] = 200;
          $result['message']= 'success';
          $result['data']['display']='profile';
        }
      }
      $result['data']['user_data']   = $u_data;
      $this->response($result);
    }
    
    //user profile update
    public function updateprofile_post()
    {
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['display']='profile not found';
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $result=array();
          $new_data=$this->post();
          $result=$this->Apibasic_model->userdata_update($new_data);
        }
      }
      $this->response($result);

    }
    
    //Programme details
    public function programme_detail_post()
    {
      $u_token='';$login_status=0;$notifi_count=0;$u_data=null;
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
        }
      }

      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['programme_data']=null;
      $result['data']['display']='No Programmes';
      if($this->post("programmeid"))
      {
        $programme_id=trim($this->post("programmeid"));
        $programme_data =$this->Apibasic_model->programme_data($programme_id,$u_token);
        if($programme_data)
        {
          $result['data']['programme_data']=$programme_data;

          $result['data']['ads']=array();
          $add_array= $this->Apibasic_model->adds();
          if($add_array)
          {
           $result['data']['ads']=$add_array;
          }


          $result['status'] = 200;
          $result['message']= 'success';
          $result['data']['display']='Programme data';
        }
        else
        {
          $result['data']['display']='Programme not found';
        }        
      }
      else
      {
        $result['data']['display']='Please select any programme';
      }
     
      $this->response($result);  

    }
    
    //Programme registration
    public function register_programme_post()
    {
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['display']='Please login to register';
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $login_status=1;
          $u_data=$this->Apibasic_model->userdata($u_token);
          $uid=$this->Apibasic_model->get_value('user','id','user_token',$u_token);
          $result['data']['display']='Programme no found';
          if($this->post("programme_id"))
          {
            $programme_id=trim($this->post("programme_id"));
            if($this->db->where('id',$programme_id)->where('status','1')->get('programmes')->num_rows()>0)
            {
                $regarry=array('user_id' =>$uid,'programme_id'=>$programme_id);
                if($this->db->where($regarry)->get('registered_programmes')->num_rows()<=0)
                {
                  $regarry['date']=date('Y-m-d H:i:s');
                  $this->db->insert('registered_programmes',$regarry);
                  $result['status'] = 200;
                  $result['message']= 'success';
                  $result['data']['display']='Registered';
                }
                else
                {
                  $result['data']['display']='Already registered';
                }
                
            }
              
          }
        }
      }
      $this->response($result);  
    }
    
    //Registered programmes
    public function registered_programmes_post()
    {
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['display']='Please login';
      if($this->post("utoken"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $app_id=$this->Apibasic_model->appdata('id');
          $u_token=trim($this->post('utoken'));
          $uid=$this->Apibasic_model->get_value('user','id','user_token',$u_token);
          $result['status'] = 200;
          $result['message']= 'success';
          $result['data']['display']='';
          $reg_prgs=$this->Apibasic_model->registprogms($uid);
          if(!$reg_prgs)
          {
            $result['data']['display']='No data found';
          }
          $result['data']['registered_prgms']=$reg_prgs;
          
          $result['data']['programme_types'] = $this->db->select('id,type')->where('status',1)->where('app_id',$app_id)->get('programme_types')->result();

        }
      }
      $this->response($result); 
    }
    
    //Venus locator
    public function venues_get()
    {
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['venues']= array();
      
      $venues= $this->Apibasic_model->venues();
      if($venues)
       {
        $result['status'] = 200;
        $result['message']= 'success';
        $result['data']['venues']= $venues;
       }
      $this->response($result);
    }
    
    //update notifi status
    public function notifi_update_post()
    {
      $result=array();
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['display']='Please login';
      if($this->post("utoken") && $this->post("programme_id"))
      {
        if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
        {
          $u_token=trim($this->post('utoken'));
          $p_id=$this->post("programme_id");
          $uid=$this->Apibasic_model->get_value('user','id','user_token',$u_token);
          if($this->db->where(array('user_id'=>$uid,'programme_id'=>$p_id))->get('registered_programmes')->num_rows()>0)
          {
              $not=1;
              if($this->post("notifi_status")!=1)
              {
                  $not=0;
              }
            $this->db->where(array('user_id'=>$uid,'programme_id'=>$p_id))->update('registered_programmes',array('notifi_status'=>$not));
            $result['status'] = 200;
            $result['message']= 'success';
            $result['data']['display']='Status Updated';
          }
          else
          {
            $result['data']['display']='programme not found';  
          }
        }
      }
      else
      {
        $result['data']['display']='Parameters missing';
      }
      $this->response($result);
    }
    
    
    
    //file list 
    public function filelist_get()
    {
      $file_list=array();
      $this->load->helper('directory');
      $map = directory_map('./uploads/programme_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/programme_image/'.$row;
        $file_list[]=$file_row;
      }
      $map = directory_map('./uploads/gallery_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/gallery_image/'.$row;
        $file_list[]=$file_row;
      }
      $map = directory_map('./uploads/default_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/default_image/'.$row;
        $file_list[]=$file_row;
      }
      $map = directory_map('./uploads/rwmf_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/rwmf_image/'.$row;
        $file_list[]=$file_row;
      }
      $map = directory_map('./uploads/stage_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/stage_image/'.$row;
        $file_list[]=$file_row;
      }
      $map = directory_map('./uploads/user_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/user_image/'.$row;
        $file_list[]=$file_row;
      }
      
      $map = directory_map('./uploads/ads_image', FALSE, TRUE);
      foreach ($map as $row) 
      {
        $file_row=array();
        $file_row['name']=pathinfo($row, PATHINFO_FILENAME);
        $file_row['path']='/admin/uploads/ads_image/'.$row;
        $file_list[]=$file_row;
      }

      $this->response($file_list);
    }
    
    //Advertisements
    public function ads_get()
    {   
      $result=array();  
      $result['status'] = 400;
      $result['message']= 'failed';
      $result['data']['ads']=array();
      $add_array=array();
      $add_array= $this->Apibasic_model->adds();
      if($add_array)
       {
        $result['status'] = 200;
        $result['message']= 'success';
        $result['data']['ads']= $add_array;
       }
      $this->response($result);
    }

    public function notify_post()
    {
       $to=$this->post("to");
       $title=$this->post("title");
       $body=$this->post("body");
       
       $data = array();
       $msg=array('title' => $title, 'body' => $body, 'time'=>time(),'notf_id'=>'5');
       $data['data']['notification']=$msg;
       
       $data['data']['webpush']['headers']['Urgency'] = "high";
       $data['to'] = $to;

       $ch = curl_init();

       curl_setopt($ch, CURLOPT_POST, 1);
       $headers = array();
       $headers[] = "Authorization: key = AIzaSyC00dv4aWJDmgl1KnyXZRwLH2MeW8jjF_I";
       $headers[] = "Content-Type: application/json";
       curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

       curl_setopt($ch, CURLOPT_URL , "https://fcm.googleapis.com/fcm/send");
       curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
       curl_setopt($ch,CURLOPT_CUSTOMREQUEST, "POST");
       curl_setopt($ch,CURLOPT_POSTFIELDS, json_encode($data));

       curl_setopt($ch,CURLOPT_SSL_VERIFYHOST, false);
       curl_setopt($ch,CURLOPT_SSL_VERIFYPEER , false);

       $result = curl_exec($ch);
       if (curl_errno($ch))
       echo 'Error:' . curl_error($ch);

       curl_close($ch);

       echo $result;
       //echo "<pre>Result : ";
       //print_r(json_decode($result,1));
       //echo '<br>sent through</pre>';
       //echo $result;
    }

    //20-06-2019

   //fb_login
   public function fblogin_post()
   {
     if($this->post())
     {
       $data=array();
       $data['email']   = trim($this->post("email"));
       $data['fb_id']   = trim($this->post("fbid"));
       //$data['device_id']  = trim($this->post("device_id"));
       //$data['device_type']= trim($this->post("device_type"));
       $this->response($this->Apibasic_model->fblogin($data));

     }
     else
     {
       $result['status'] = 400;
       $result['message']= 'failed';
       $result['data']['display'] = 'Enter valid data';
       $this->response($result);
     }
   }

   //google_login
   public function googlelogin_post()
   {
     if($this->post())
     {
       $data=array();
       $data['email']    = trim($this->post("email"));
       $data['google_id']= trim($this->post("googleid"));
       //$data['device_id']  = trim($this->post("device_id"));
       //$data['device_type']= trim($this->post("device_type"));
       $this->response($this->Apibasic_model->googlelogin($data));

     }
     else
     {
       $result['status'] = 400;
       $result['message']= 'failed';
       $result['data']['display'] = 'Enter valid data';
       $this->response($result);
     }
   }

   //Social Signup
   public function socialsignup_post()
   {
     if($this->post())
     {
       $data=array();

       $data['first_name'] = trim($this->post("first_name"));
       $data['last_name']  = trim($this->post("last_name"));
       $data['phone']      = trim($this->post("phone"));
       $data['email']      = trim($this->post("email"));
       $data['fb_id']      = trim($this->post("fbid"));
       $data['google_id']  = trim($this->post("googleid"));

       //$data['device_id']  = trim($this->post("device_id"));
       //$data['device_type']= trim($this->post("device_type"));
       $this->response($this->Apibasic_model->soregister($data));

     }
     else
     {
       $result['status'] = 400;
       $result['message']= 'failed';
       $result['data']['display'] = 'Enter valid data';
       $this->response($result);
     }

   }

   //22-06-2019

   //Programme remove registration
   public function remove_programme_post()
   {
     $result=array();
     $result['status'] = 400;
     $result['message']= 'failed';
     $result['data']['display']='Please login';
     if($this->post("utoken"))
     {
       $app_id=$this->Apibasic_model->appdata('id');
       if($this->Apibasic_model->uservalid(trim($this->post('utoken'))))
       {
         $u_token=trim($this->post('utoken'));
         $login_status=1;
         $u_data=$this->Apibasic_model->userdata($u_token);
         $uid=$this->Apibasic_model->get_value('user','id','user_token',$u_token);
         $result['data']['display']='Programme no found';
         if($this->post("programme_id"))
         {
           $programme_id=trim($this->post("programme_id"));
           if($this->db->where('programme_id',$programme_id)->where('user_id',$uid)->where('status','1')->get('registered_programmes')->num_rows()>0)
           {
             $this->db->where(array('user_id'=>$uid,'programme_id'=>$programme_id))->delete('registered_programmes');
           }
         }
         $result['status'] = 200;
         $result['message']= 'success';
         $result['data']['display']='';
         $reg_prgs=$this->Apibasic_model->registprogms($uid);
         if(!$reg_prgs)
         {
           $result['data']['display']='No data found';
         }
         $result['data']['registered_prgms']=$reg_prgs;
         $result['data']['programme_types'] = $this->db->select('id,type')->where('status',1)->where('app_id',$app_id)->get('programme_types')->result();
       }

     }
     $this->response($result);
   }
   
 }

?>
