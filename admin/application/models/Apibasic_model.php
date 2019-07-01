<?php

class Apibasic_model extends CI_Model 
{

    function __construct() 
    {
        parent::__construct();
        
    }
    
    function appdata($data='')
    {
        $value='';
        $apqry=$this->db->where('status',1)->get('apps');
        if($apqry->num_rows()==1)
        {
            $value=$apqry->row();
            if($data)
            {
               $value =$apqry->row()->$data;
            }
        }
        return $value;
    }
    
    //app icon
    public function appicon()
    {
      $icons=array();
      $app_id=$this->appdata('id');
      if($app_id)
      {
        $newicon=array('src'=>'',"type"=>'image/png',"sizes"=>'');
        $sizes=array('0'=>'192x192','1'=>'168x168','2'=>'144x144','3'=>'96x96','4'=>'72x72','5'=>'48x48');
        for ($i=0; $i <=5 ; $i++) 
        { 
          $newicon['src']=base_url('uploads/app_icons/app_'.$app_id.'/'.$sizes[$i].'.png');
          $newicon['sizes']=$sizes[$i];
          $icons[]=$newicon;
        }
      }
      return $icons;
    }

    //user token
    public function usertoken($uid)
    {
        $token = bin2hex(openssl_random_pseudo_bytes(3));
        if($this->check_exist('user','user_token',$token))
            {
              $this->usertoken($uid);
            }
         else
            {
              $d['user_token']=$token;
              $this->db->where('id',$uid);
              $this->db->update('user',$d);
              return $token;
        	}
    }

    // Check value exist in a field or not
    public function check_exist($table,$field,$value)
    {
        $this->db->where($field,$value);
        $result = $this->db->get($table);
        if($result->num_rows()>0)
        {
          return true;
        }
        else
        {
          return false;
        }
    }

    public function check_existuser($table,$field,$value)
    {
        $app_id=$this->appdata('id');
        $this->db->where('app_id',$app_id);
        $this->db->where('status','1');
        $this->db->where($field,$value);
        $result = $this->db->get($table);
        if($result->num_rows()>0)
        {
          return true;
        }
        else
        {
          return false;
        }
    }

    //User Registration
    public function register($data,$refcode='')
    {
        if($this->registervalidate($data)=='true')
            {
                $app_id=$this->appdata('id');
                $data['app_id']=$app_id;
                $data['signup_date']=date('Y-m-d H:i:s');
                $data['status']='1';
                $this->db->insert('user',$data);
                $uid=$this->db->insert_id();
                if($uid)
                {
                  $result['status']  = 200;
                  $result['message'] = 'success';
                  $result['data']['display']    = 'You have successfully registered.';
                  $result['data']['user_token'] = $this->usertoken($uid);
                }
            }
        else
            {
                $result['status']  = 400;
                $result['message'] = 'failed';
                $result['data']['display'] = $this->registervalidate($data);
            }
        return $result;
    }

    //User Register validate
    public function registervalidate($data)
    {
        $valid='true';
        $error=array();
        if($data['phone'])
            {
                if($this->check_existuser('user','phone',$data['phone']))
                  {
                    $valid='false';
                    $error='Phone number already registered';
                  }
                else
                  {
                    if($data['email'])
                    {
                       if($this->check_existuser('user','email',$data['email']))
                        {
                          $valid='false';
                          $error='Email is already registered';
                       }
                    }
                    else
                    {
                      $valid='false';
                      $error='Email id required';
                    }
                  }
              }
              else
              {
                $valid='false';
                $error='Mobile number required';
              }

              if($valid=='true')
              {
                return $valid;
              }
              else
              {
                return $error;
              }
    }

    //User Login
    public function login($data)
    {
    	$result=array();
        if($this->loginvalidate($data)=='true')
            {
                $app_id=$this->appdata('id');
                $longqry=$this->db->where(array('app_id'=>$app_id,'email'=>$data['email'],'password'=>md5($data['password']),'status'=>'1'))->get('user');
                if($longqry->num_rows()==1)
                {
                	$uid = $longqry->row()->id;
                	$result['status']  = 200;
                	$result['message'] = 'success';
                	$result['data']['display'] ='You have successfully logged in';
                  $result['data']['user_token'] = $longqry->row()->user_token;//$this->usertoken($uid);
                  $result['data']['user_data']  = $this->userdata($result['data']['user_token']);
                }
                else
                {
                	$result['status']  = 400;
                	$result['message'] = 'failed';
                	$result['data']['display'] ='Invalid email id or password';
                }
            }
        else
            {
                $result['status']  = 400;
                $result['message'] = 'failed';
                $result['data']['display'] = $this->loginvalidate($data);
            }
        return $result;
    }

    //User Login validate
    public function loginvalidate($data)
    {
        $valid='true';
        $error=array();
        if($data['email'])
        {
            if($data['password']=='')
        	{
        		$valid='false';
            	$error='Password required';
        	}   
        	  
        }
        else
        {
            $valid='false';
            $error='Email id required';
        }
             

        if($valid=='true')
        {
            return $valid;
        }
        else
        {
            return $error;
        }
    }

    //check valid usertoken and user
    public function uservalid($utoken)
    {
        if(!$utoken)
            {
              return false;
            }
        else
            {
              	$utokenstatus=$this->Apibasic_model->get_value('user','status','user_token',$utoken);
              	$app_id=$this->appdata('id');
              	$uapp_id=$this->Apibasic_model->get_value('user','app_id','user_token',$utoken);
              	if($utokenstatus=='1' && $app_id==$uapp_id)
                {
                  return true;
                }
              	else
                {
                  return false;
                }
            }
    }

    //Get value of a field in any table
  	public function get_value($table,$field,$where,$value)
    {
      $result = $this->db->query("select * from $table where $where = '$value'");
      if($result->num_rows()==1)
        {
          return $result->row()->$field;
        }
      else
        {
            return '';
        }
    }

    ///Get userdata
  	public function userdata($utoken)
    {
      $result = $this->db->query("select first_name,last_name,email,phone,image from user where user_token= '$utoken'");
      if($result->num_rows()==1)
        {
          $ggg=$result->result_array();	
          $ggg[0]['first_name']=ucfirst($ggg[0]['first_name']);
          if(file_exists($ggg[0]['image']))
          {
            $ggg[0]['image'] =base_url().$ggg[0]['image'].'?'.time();
            
          }
          else
          {
            $ggg[0]['image'] =$this->Basic_model->image_link('user',0);
          }
          $ggg[0]['image_name'] =pathinfo($ggg[0]['image'], PATHINFO_FILENAME);
            
            $type = pathinfo($ggg[0]['image'], PATHINFO_EXTENSION);
            $data = file_get_contents($ggg[0]['image']);
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            $ggg[0]['image']=$base64;

          return $ggg[0];
        }
      else
        {
            return null;
        }
    }

    ///Get programmes_list
  	public function programmes_list($limit='',$offset='',$type='',$search_Key='',$day='')
    {
    	$prgramlist=array();
    	$app_id=$this->appdata('id');
        
      	$this->db->select('p.id,p.name,p.code,p.day,pd.date as date,p.time,p.type,pt.type as type_name,p.image,p.stage,ps.name as stage_name');
      	$this->db->from('programmes as p,programme_types pt,programme_stages ps,programme_days pd');
      	$this->db->where('p.status=1 and p.type=pt.id and p.stage=ps.id and p.day=pd.day and p.app_id="'.$app_id.'"');
      	if($type)
          {
            $this->db->where('p.type="'.$type.'" ');
          }

        if($search_Key)
          {
            $this->db->where('( p.name like "%'.$search_Key.'%" or p.code like "%'.$search_Key.'%" )');
          }
        
        if($day>0)
          {
            $this->db->where('p.day="'.$day.'" ');
          }
          
        $this->db->order_by('time','asc');
        if($limit!='' && $offset!='')
          {
              $this->db->limit($limit, $offset);
          }
        $prlistquery =$this->db->get();
        if($prlistquery->num_rows()>0)
          {
            $prdtlist=array();
          	$prdtlist=$prlistquery->result_array();
            foreach($prdtlist as $row)
            {
            	$pimages=array();
            	$pvideos=array();
            	$row['name'] = ucfirst($row['name']);
            	$row['date'] = date('M d Y',strtotime($row['date']));
            	$row['time'] = date('h:i a',strtotime($row['time']));
            	$row['image']=  $this->Basic_model->image_link('programme',$row['id']);
            	$row['image_name']= pathinfo($row['image'], PATHINFO_FILENAME);
            	$prgramlist[]=$row;
            }
          }
        return $prgramlist;
    }    
    
    
    //Update Profile
    public function userdata_update($newdata)
    {
      if($this->user_updatevalid($newdata)=='true')
      {
          $kdata=array();
          $kdata['first_name']= trim($newdata['first_name']);
          $kdata['last_name'] = trim($newdata['last_name']);
          $kdata['email']     = trim($newdata['email']);
          $kdata['phone']     = trim($newdata['phone']);
          $this->db->where('user_token',$newdata['utoken'])->update('user',$kdata);
          $u_data=$this->db->where('user_token',$newdata['utoken'])->get('user')->row();
          if ($newdata['image'])
           {
             $filename3 = 'uploads/user_image/user_'.$u_data->id . '.png';
             $decoded=base64_decode(preg_replace('#^data:image/\w+;base64,#i', '',$newdata['image']));
             file_put_contents($filename3,$decoded);
             $this->db->where('id',$u_data->id)->update('user',array('image'=>$filename3));
           }

          $result['status']  = 200;
          $result['message'] = 'success';
          $result['data']['display'] ='Profile updated successfully.';
      }
      else
      {
        $result['status']  = 400;
        $result['message'] = 'failed';
        $result['data']['display'] = $this->user_updatevalid($newdata);
      }
      return $result;
    }
    
    public function user_updatevalid($data)
    {
        $u_data=$this->db->where('user_token',$data['utoken'])->get('user')->row();
        $valid='true';
        $error=array();
        if(trim($data['email']))
        {
          $emailvld=$this->db->where(array('email'=>trim($data['email']),'id !='=>$u_data->id,'status'=>'1'))->get('user');
          if($emailvld->num_rows()>0)
          {
            $valid='false';
            $error='Email id is already registered';
          }
          else
          {
            if(!trim($data['first_name']))
            {
              $valid='false';
              $error='First name is required';
            }
            else
            {
               if(trim($data['phone']))
               {
                 $emailvld=$this->db->where(array('phone'=>trim($data['phone']),'id !='=>$u_data->id,'status'=>'1'))->get('user');
                 if($emailvld->num_rows()>0)
                 {
                   $valid='false';
                   $error='Phone number is already registered';
                 }
               }

            }
          }   
            
        }
        else
        {
            $valid='false';
            $error='Email id required';
        }
             

        if($valid=='true')
        {
            return $valid;
        }
        else
        {
            return $error;
        }
    }
    
    //Get programme_data
    public function programme_data($id,$utoken='')
    {
      $prgramdata='';
      $app_id=$this->appdata('id');
        
      $this->db->select('p.id,p.name,p.code,p.day,pd.date as date,p.time,p.type,pt.type as type_name,p.image,p.stage,ps.name as stage_name,ps.location as stage_location,ps.latitude as stage_latitude,ps.longitude as stage_longitude,p.description,p.status');
      $this->db->from('programmes as p,programme_types pt,programme_stages ps,programme_days pd');
      $this->db->where('p.status>=1 and p.type=pt.id and p.stage=ps.id and p.day=pd.day and p.app_id="'.$app_id.'" and p.id="'.$id.'"');
      $prlistquery =$this->db->get();
        if($prlistquery->num_rows()==1)
        {
            $prdtlist=array();
            $prdtlist=$prlistquery->result_array();
            foreach($prdtlist as $row)
            {
              $row['name'] = ucfirst($row['name']);
              $row['date'] = date('M d Y',strtotime($row['date']));
              $row['time'] = date('h:i a',strtotime($row['time']));
              $row['image']=  $this->Basic_model->image_link('programme',$row['id']);
              $row['image_name']= pathinfo($row['image'], PATHINFO_FILENAME);
              $row['gallery']=$this->programme_gallery($row['id']);
              $row['register_status']=$this->register_status($id,$utoken);;
              $prgramdata=$row;
            }
        }
        return $prgramdata;
    } 


    //Get programme_gallery
    public function programme_gallery($id)
    {
      $gallery=array();
      $galqry=$this->db->where(array('programme_id'=>$id,'status'=>'1'))->get('programme_gallery');
      if($galqry->num_rows()>0)
      {
        $gallist=array();
        $gallist=$galqry->result_array();
        foreach($gallist as $row)
          {
            $row['date'] = date('d-m-Y',strtotime($row['date']));
            $row['title']=ucfirst($row['title']);
            unset($row['location_type']);unset($row['programme_id']);unset($row['status']);
            if($row['gallery_type']=='image')
            {
              if(file_exists($row['link']))
              {
                $row['link'] =base_url().$row['link'];
                $gallery[]=$row;
              }
            }
            else
            {
              $row['link'] =preg_replace("/\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i","https://www.youtube.com/embed/$1",$row['link']);
              $gallery[]=$row;
            }
            
          }
      }
      return $gallery;
    } 
    
    //Register Status
    public function register_status($pid,$utoken)
    {
      $rstatus="0";
      
      if($this->uservalid($utoken))
        {
          $uid=$this->get_value('user','id','user_token',$utoken);
          $rwgqry=$this->db->where(array('user_id'=>$uid,'programme_id'=>$pid))->get('registered_programmes');
          if($rwgqry->num_rows()>0)
          {
            $rstatus="1";
          }
        }
      return $rstatus;
      
    }
    
    public function registprogms($uid)
    {
      $prgramlist=array();
      $app_id=$this->appdata('id');
        
      $this->db->select('p.id,p.name,p.code,p.day,pd.date as date,p.time,p.type,pt.type as type_name,p.image,p.stage,ps.name as stage_name,ps.location as stage_location,ps.latitude as stage_latitude,ps.longitude as stage_longitude,p.description,p.status,rp.notifi_status');
      $this->db->from('programmes as p,programme_types pt,programme_stages ps,programme_days pd,registered_programmes rp');
      $this->db->where('p.status=1 and p.type=pt.id and p.stage=ps.id and p.day=pd.day and rp.programme_id=p.id and p.app_id="'.$app_id.'" and rp.user_id="'.$uid.'"');
      $this->db->order_by('time','asc');
      $prlistquery =$this->db->get();
      if($prlistquery->num_rows()>0)
        {
            $prdtlist=array();
            $prdtlist=$prlistquery->result_array();
            foreach($prdtlist as $row)
            {
              $pimages=array();
              $pvideos=array();
              $row['same_time'] = (string)$this->same_timeprgm($uid,$row['date'],$row['time']);
              $row['name'] = ucfirst($row['name']);
              $row['date'] = date('M d Y',strtotime($row['date']));
              $row['time'] = date('h:i a',strtotime($row['time']));
              $row['image']=  $this->Basic_model->image_link('programme',$row['id']);
              $row['image_name']=  pathinfo($row['image'], PATHINFO_FILENAME);
              $prgramlist[]=$row;
            }
        }
      return $prgramlist;

    }
    
    public function same_timeprgm($uid,$date,$time)
    {
     $app_id=$this->appdata('id');
     $this->db->select('p.id,p.name,p.code,p.day,pd.date as date,p.time,p.type,pt.type as type_name,p.image,p.stage,ps.name as stage_name,ps.location as stage_location,ps.latitude as stage_latitude,ps.longitude as stage_longitude,p.description,p.status,rp.notifi_status');
     $this->db->from('programmes as p,programme_types pt,programme_stages ps,programme_days pd,registered_programmes rp');
     $this->db->where('p.status=1 and p.type=pt.id and p.stage=ps.id and p.day=pd.day and rp.programme_id=p.id and p.app_id="'.$app_id.'" and rp.user_id="'.$uid.'" and pd.date="'.$date.'" and p.time="'.$time.'"');
     $prlistquery =$this->db->get();
      if($prlistquery->num_rows()>1)
      {
       return 1;
      }
      else
      { return 0;}
    }
    
    //venue list
    public function venues()
    {
      $venues=array();
      $app_id=$this->appdata('id');
      if($app_id)
      {
        $stqry=$this->db->where(array('app_id'=>$app_id,'status'=>'1'))->get('programme_stages');
        if($stqry->num_rows()>0)
        {
          $prdtlist=array();
          $prdtlist=$stqry->result_array();
          foreach($prdtlist as $row)
            {
              unset($row['app_id']);unset($row['status']);
              if(file_exists($row['image']))
              {
                $row['image'] =base_url().$row['image'];
              }
              else
              {
                $row['image']='';
              }
              $venues[]=$row;
            }
        }
      }
      return $venues;
    }
    
    //add list
    public function adds()
    {
      $add_array=array();
      $app_id=$this->appdata('id');
      if($app_id)
      {
        $ads_qry=$this->db->where('status','1')->where('app_id',$app_id)->order_by('last_update','desc')->get('advertisement');
        if($ads_qry->num_rows()>0)
        {
          $ads_array=$ads_qry->result_array();
          foreach ($ads_array as $row) 
          {
            if(file_exists($row['image']))
            {
              unset($row['app_id']); unset($row['last_update']); unset($row['status']);
              $row['image']=base_url().$row['image'].'?'.time();
              $row['image_name']=pathinfo($row['image'], PATHINFO_FILENAME);
              $add_array[]=$row;
            }
          }
        }
      }
      return $add_array;
    }


    //20-06-2019
    //User FB Login
    public function fblogin($data)
    {
      $result=array();
      if($data['fb_id'])
        {
            $app_id=$this->appdata('id');
            $longqry=$this->db->query('select * from user where app_id="'.$app_id.'" and (fb_id="'.$data['fb_id'].'" or email="'.$data['email'].'") and status="1"');
            if($longqry->num_rows()==1)
              {
                $uid = $longqry->row()->id;
                $result['status']  = 200;
                $result['message'] = 'success';
                $result['data']['display'] ='You have successfully logged in';
                $result['data']['user_token'] = $longqry->row()->user_token;
                $result['data']['user_data']  = $this->userdata($result['data']['user_token']);
                $newdata=array('fb_id'=>$data['fb_id']);
                $this->db->where('id',$uid)->update('user',$newdata);
                
              }
            else
              {
                $result['status']  = 400;
                $result['message'] = 'failed';
                $result['data']['display'] ='User not found';
                $result['data']['action'] ='socuser_register';
              }
        }
      else
        {
            $result['status']  = 400;
            $result['message'] = 'failed';
            $result['data']['display'] = 'check facebook login';
        }
        return $result;
    }
    //User google Login
    public function googlelogin($data)
    {
      $result=array();
      if($data['google_id'])
        {
            $app_id=$this->appdata('id');
            $longqry=$this->db->query('select * from user where app_id="'.$app_id.'" and (google_id="'.$data['google_id'].'" or email="'.$data['email'].'") and status="1"');
            if($longqry->num_rows()==1)
              {
                $uid = $longqry->row()->id;
                $result['status']  = 200;
                $result['message'] = 'success';
                $result['data']['display'] ='You have successfully logged in';
                $result['data']['user_token'] = $longqry->row()->user_token;
                $result['data']['user_data']  = $this->userdata($result['data']['user_token']);
                $newdata=array('google_id'=>$data['google_id']);
                $this->db->where('id',$uid)->update('user',$newdata);
                
              }
            else
              {
                $result['status']  = 400;
                $result['message'] = 'failed';
                $result['data']['display'] ='User not found';
                $result['data']['action'] ='socuser_register';
              }
        }
      else
        {
            $result['status']  = 400;
            $result['message'] = 'failed';
            $result['data']['display'] = 'check google login';
        }
        return $result;
    }
    //User SO Registration
    public function soregister($data)
    {
        if($this->sovalidate($data)=='true')
            {
                $app_id=$this->appdata('id');
                $data['app_id']=$app_id;
                $data['signup_date']=date('Y-m-d H:i:s');
                $data['status']='1';
                $this->db->insert('user',$data);
                $uid=$this->db->insert_id();
                if($uid)
                {
                  $result['status']  = 200;
                  $result['message'] = 'success';
                  $result['data']['display']    = 'You have successfully registered.';
                  $result['data']['user_token'] = $this->usertoken($uid);
                }
            }
        else
            {
                $result['status']  = 400;
                $result['message'] = 'failed';
                $result['data']['display'] = $this->sovalidate($data);
            }
        return $result;
    }
    //User SO Register validate
    public function sovalidate($data)
    {
        $valid='true';
        $error=array();
        if($data['fb_id'] || $data['google_id'])
            {
                if($this->check_existsocial($data['fb_id'],$data['google_id']))
                  {
                    $valid='false';
                    $error='User already registered';
                  }
                else
                  {
                    if($data['email'])
                    {
                       if($this->check_existuser('user','email',$data['email']))
                        {
                          $valid='false';
                          $error='Email is already registered';
                       }
                    }
                    else
                    {
                      $valid='false';
                      $error='Email id required';
                    }
                  }
            }
          else
            {
              $valid='false';
              $error='Fb or Google login failed';
            }
              if($valid=='true')
              {
                return $valid;
              }
              else
              {
                return $error;
              }
    }
    public function check_existsocial($fbid,$googleid)
    {
      $app_id=$this->appdata('id');
      if($fbid) 
      {
       $longqry=$this->db->query('select * from user where app_id="'.$app_id.'" and fb_id="'.$fbid.'"  and status="1"');
      }
      if($googleid)
      {
        $longqry=$this->db->query('select * from user where app_id="'.$app_id.'" and google_id="'.$googleid.'" and status="1"');
      }
      
      if($longqry->num_rows()>0)
      {
        return true;
      }
      else
      {
        return false;
      }
    }


}

?>