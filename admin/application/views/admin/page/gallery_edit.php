

            <div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Programme Gallery</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item "><a href="<?php echo base_url('programmes'); ?>">Programmes</a></li>
                            <li class="breadcrumb-item"><a href="<?php echo base_url('gallery/'.$prg_id); ?>">Gallery</a></li>
                            <li class="breadcrumb-item active"><?php echo $title; ?></li>
                        </ol>
                    </div>
                </div>
               
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-block">
                                <h4 class="card-title "><?php echo $title; ?></h4>

                                <div class="m-t-30">
                                    <?php
                                        $ticket_location=base_url().'uploads/default_image/programme.png?'.time();
                                        $vidodiv='style="display: none"';
                                        $imprdiv='';
                                        if(!$gal_data)
                                        {
                                            $gal_data['programme_id']=$prg_id;
                                            $gal_data['gallery_type']='image';
                                            $gal_data['location_type']='file';
                                            $gal_data['link']='';
                                            $gal_data['title']='';
                                            $gal_data['caption']='';
                                            $gal_data['id']=0;
                                            $gal_data=(object)$gal_data;
                                        }
                                        else
                                        {
                                            
                                            if($gal_data->gallery_type=='youtube')
                                            {
                                               $vidodiv='';
                                               $imprdiv='style="display: none"';
                                            }

                                            if(file_exists($gal_data->link) && $gal_data->gallery_type=='image')
                                            {
                                                $ticket_location=base_url().$gal_data->link.'?'.time();
                                            }

                                        }
                                        
                                        // print_r($gal_data);
                                        // echo $gal_data->id;
                                        $typedis='';
                                        if($gal_data->id>0)
                                        {
                                            echo form_open_multipart(base_url('admin/gallery/'.$prg_id.'/edit/'.$gal_data->id), array('name' => 'addgallery', 'id' => 'addgallery', 'class' => ' form-material','onsubmit'=>'return validate_edgm()'));
                                            $typedis='disabled';
                                        }
                                        else
                                        {
                                         echo form_open_multipart(base_url('admin/gallery/'.$prg_id.'/new/'), array('name' => 'addgallery', 'id' => 'addgallery', 'class' => ' form-material','onsubmit'=>'return validate_gm()')); 
                                        }   

                                        ?>     
                                                <div class="form-group ">
                                                    <label for="type" class="mr-3">Gallery Type</label>
                                                    <?php
                                                        $optiontype=array('image'=>'Image','youtube'=>'Youtube Video');
                                                        echo form_dropdown('gallery_type', $optiontype, set_value('type',$gal_data->gallery_type), 'class="form-control form-control-line" id="gallery_type" onchange="changetype(this.value)"'.$typedis);
                                                    ?>
                                                    <span class="from_validaton">
                                                        <?php echo form_error('gallery_type');?>
                                                    </span>
                                                </div>

                                                <div class="form-group gl_types" id="image_type" <?php echo $imprdiv;?> >
                                                    <div class="row">
                                                        <div class="imgprew col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <span class="priveiwimg">
                                                                <img id="img_prew" src="<?php echo $ticket_location; ?>" />
                                                            </span>
                                                            
                                                            <label for="file-upload" class="custom-file-upload btn-info">
                                                                <i class="fa fa fa-picture-o"></i> Select Image
                                                            </label>
                                                            <input name="image" id="file-upload" type="file" accept="image/jpeg, image/png" onchange="imgdis(this);"/>
                                                            
                                                            <span id="lyerrmsg" class="from_validaton">
                                                                <?php 
                                                                    echo form_error('image');
                                                                    if($this->session->flashdata('ticket_info'))
                                                                    { echo $this->session->flashdata('ticket_info'); }
                                                                ?>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group gl_types" id="youtube_type"  <?php echo $vidodiv;?> >
                                                    <label for="link" class="mr-3">Youtube Link</label>
                                                    <input type="url" id="link" name="link" placeholder="Youtube link" class="form-control form-control-line" value="<?php echo set_value('link',$gal_data->link); ?>" onchange="video_preview(this.value)">
                                                    <span class="from_validaton " id="link_val">
                                                        <?php echo form_error('link');?>
                                                    </span>

                                                    <div class="row">
                                                        <div class="imgprew col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <span id="video_preview" class="priveiwimg mt-2">
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                                   
                                                <div class="form-group ">
                                                    <label for="title" class="mr-3">Title</label>
                                                    <input required type="title" name="title" placeholder="Title" class="form-control form-control-line" value="<?php echo set_value('title',$gal_data->title); ?>">
                                                    <span class="from_validaton">
                                                        <?php echo form_error('title');?>
                                                    </span>
                                                </div>
                                                
                                                <div class="form-group ">
                                                    <label for="caption" class="mr-3">Caption</label>
                                                    <input required type="text" name="caption" placeholder="Caption" class="form-control form-control-line" value="<?php echo set_value('caption',$gal_data->caption); ?>">
                                                    <span class="from_validaton">
                                                        <?php echo form_error('caption');?>
                                                    </span>
                                                </div>
                                                
                                                <div class="form-group ">
                                                    <div class="col-sm-12 ">
                                                        <center>
                                                            <a href="<?php echo base_url('gallery/'.$prg_id); ?>" class=" btn btn-warning float-center px-5 ml-1 mt-1 mr-1 "> Cancel </a>
                                                            <button class=" btn btn-success float-center px-5 ml-1 mt-1 mr-1 "> Save </button> 
                                                        </center>
                                                    </div>
                                                </div>

                                            <?php
                                            //print_r($gal_data);
                                        echo form_close();
                                    ?>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



<style type="text/css">
    #img_prew
    {
        height: 250px;
        width:250px;
    }
    .imgprew 
    {
        text-align: center;
    }
    #primage {
        display: block;
        margin: 15px auto 0;
        text-align: center !important;
        width: 250px;
    }
    .priveiwimg {
        position: relative;
        display: inline-block;
    }
    .priveiwimg i{
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        color: #f62d51;
        font-size: 22px;
    }
    input[type="file"] 
    {
        display: none;
    }
    .custom-file-upload 
    {
        border: 1px solid #ccc;
        display: block;
        padding: 6px 12px;
        cursor: pointer;
        text-align: center !important;
        width: 200px;
        margin: 15px auto 0;
        border-radius: 25px;
    }
</style>

<script type="text/javascript">

    $(document).ready(function() 
    {
        if($("#link").val())
        {
            video_preview($("#link").val());
        }
    });
    function imgdis(input) 
    {
        $('#lyerrmsg').html('');
        if (input.files && input.files[0]) 
        {
            var fileExtension = ['jpeg','png','jpg'];
            if ($.inArray($(input).val().split('.').pop().toLowerCase(), fileExtension) == -1) 
            {
                var src="<?php echo $ticket_location; ?>";
                $('#del-rb').show();
                $("#lyerrmsg").html("Only formats are allowed : "+fileExtension.join(', '));
                $(input).val("");
                $('#img_prew').attr('src',src);
            }
            else
            {
                var reader = new FileReader();
                reader.onload = function (e) 
                {
                    $('#del-rb').hide();
                    $('#img_prew').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    }

    function changetype(val) 
    {
        $(".gl_types").hide();
        $("#"+val+"_type").show();
        if(val=='youtube')
        {
            $("#file-upload").val('');
            var src="<?php echo $ticket_location; ?>";
            $("#lyerrmsg").html('');
            $('#img_prew').attr('src',src);
        }
        else
        {
            $('#link_val').html('');
            $("#link").val('');
            $("#video_preview").html('');
        }
        
    }


    function video_preview(v_link)
    {
        $('#link_val').html('');
        var site = 'youtube';//$('#site').val();
                var video_url   =   v_link; 
                video_url       =   video_url.replace('https://www.', ''); 
                video_url       =   video_url.replace('https://', ''); 
                video_url       =   video_url.replace('http', ''); 
                video_url       =   video_url.replace('/', '---');

        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        
        if(site == 'youtube' && v_link.match(p))
        {
            var x = v_link.split('=');
            var video_link = x[1];
            $('#video_preview').html('<iframe width="400" height="300" src="https://www.youtube.com/embed/'+video_link+'" frameborder="0"></iframe>');

        }
        else
        {
            $("#link").val('');
            $('#video_preview').html('');
            $('#link_val').html('enter youtube link');
            
        }
    }

    function validate_gm() 
    {
        $('#link_val').html('');
        var valid=true;
        var imtype=$("#gallery_type").val();
        if(imtype=='image')
        {
            if(!$("#file-upload").val())
            {
                valid=false;
                $('#lyerrmsg').html('select any image');
            }
        }
        else
        {
            if(!$("#link").val())
            {
                valid=false;
                $('#link_val').html('enter youtube link');
            }
        }
        return valid;
    }

    function validate_edgm() 
    {
        $('#link_val').html('');
        var valid=true;
        var imtype=$("#gallery_type").val();
        
        if(imtype=='youtube' && !$("#link").val())
        {
            valid=false;
            $('#link_val').html('enter youtube link');
        }
        
        if (valid == true) 
        {
            $("#gallery_type").prop('disabled', false);
        }
        return valid;
    }
     
     
</script>