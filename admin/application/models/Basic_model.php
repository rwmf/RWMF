<?php
class Basic_model extends CI_Model
{
    function __construct()
    {
			   parent::__construct();
		      $this->load->database();
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

   // FILE_UPLOAD
    function file_up($name, $type, $id, $ext ='.png',$thumb = '')
    {
        move_uploaded_file($_FILES[$name]['tmp_name'], 'uploads/' . $type . '_image/' . $type . '_' . $id . $ext);
        if ($thumb == '1')
        {
          $this->img_thumb($type,$id,$ext);
        }
    }

	  function img_thumb($type, $id, $ext ='.png', $width = '512', $height = '512')
    {
        $this->load->library('image_lib');
        ini_set("memory_limit", "-1");
        $config1['image_library']  = 'gd2';
        $config1['create_thumb']   = TRUE;
        $config1['maintain_ratio'] = TRUE;
        $config1['width']          = $width;
        $config1['height']         = $height;
        $config1['source_image']   = 'uploads/' . $type . '_image/' . $type . '_' . $id .$ext;
        $this->image_lib->initialize($config1);
        $this->image_lib->resize();
        $this->image_lib->clear();
    }

    function file_dlt($type, $id, $ext = '.png')
    {
        if (file_exists('uploads/' . $type . '_image/' . $type . '_' . $id . $ext))
         {
            unlink("uploads/" . $type . "_image/" . $type . "_" . $id . $ext);
         }
        if (file_exists("uploads/" . $type . "_image/" . $type . "_" . $id . "_thumb" . $ext))
         {
            unlink("uploads/" . $type . "_image/" . $type . "_" . $id . "_thumb" . $ext);
         }
    }

    function remove_files($source,$ftype)
    {
        if ($ftype=='video' && file_exists("uploads/poem_video/".$source))
        {
           unlink("uploads/poem_video/".$source);
        }
        if ($ftype=='audio' && file_exists("uploads/poem_mp3/".$source))
        {
           unlink("uploads/poem_mp3/".$source);
        }
        if ($ftype=='image' && file_exists("uploads/lyric_image/".$source))
        {
           unlink("uploads/lyric_image/".$source);
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
        $this->db->where('status !=','no');
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

    //image_link
    public function image_link($type,$id,$thumb='no',$ext ='.png')
    {
     if (file_exists('uploads/' . $type . '_image/' . $type . '_' . $id . $ext))
     {
      if ($thumb == 'no')
        {
          $srcl = base_url().'uploads/'.$type.'_image/'.$type.'_'.$id.$ext;
        }
      else
        {
          $srcl = base_url().'uploads/'.$type.'_image/' .$type .'_'. $id .'_'.'thumb'.$ext;
        }
     }
     else
     {
      if ($thumb == 'no')
        {
          $srcl = base_url().'uploads/'.'default_image/'.$type.$ext;
        }
      else
        {
          $srcl = base_url().'uploads/'.'default_image/'.$type.'_'.'thumb'.$ext;
        }
     }
     return $srcl.'?'.time();
    }




}
