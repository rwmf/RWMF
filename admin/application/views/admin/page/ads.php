

            <div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Advertisements</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item "><a href="<?php echo base_url('ads'); ?>">Advertisements</a></li>
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
                                        $defimage=$this->Basic_model->image_link('ads','0');
                                        if(!$ads)
                                        {
                                            $ads=array();
                                            $ads['id']=0;
                                            $ads['name']=$ads['link']='';
                                            
                                            $ads = (object) $ads;
                                        }
                                        else
                                        {
                                            if(file_exists($ads->image))
                                            {
                                                $defimage =base_url().$ads->image.'?'.time();
                                            }
                                        }
                                        $imgreq=' required';
                                        if($ads->id<=0)
                                        {
                                            echo form_open_multipart(base_url('ads/new'), array('name' => 'new_add', 'id' => 'new_add', 'class' => 'form-horizontal form-material'));
                                        }
                                        else
                                        {
                                            $imgreq='';
                                            echo form_open_multipart(base_url('ads/edit/'.$ads->id), array('name' => 'edit_add', 'id' => 'edit_add', 'class' => 'form-horizontal form-material'));
                                        }
                                         
                                    ?>
                                            <div class="row">
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="name" class="">Name</label>
                                                        <input type="text" name="name" placeholder="Name" class="form-control form-control-line" value="<?php echo set_value('name',$ads->name); ?>" required>
                                                        <span class="from_validaton"><?php echo form_error('name');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="description" class="">Link</label>
                                                        <input type="url" name="link" placeholder="Redirect url" class="form-control form-control-line" value="<?php echo set_value('link',$ads->link); ?>" required>
                                                        <span class="from_validaton"><?php echo form_error('link');?></span>
                                                    </div>
                                                    
                                                </div>
                                                

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="image" class="">Image</label>
                                                        <input  name="image" id="primage" type="file" class="form-control "  accept="image/jpeg, image/png" onchange="imgdis(this);" <?php echo $imgreq; ?>>
                                                        <span id="lyerrmsg" class="from_validaton"><?php echo form_error('image');?></span>
                                                    </div>
                                                </div>
                                            </div>
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div style="height: 90px;width: 728px;display: block;margin: auto;">
                                                        <img id="img_prew" src="<?php echo $defimage; ?>" />
                                                    </div>
                                                </div>
                                            <div class="form-group ">
                                                <div class="col-sm-12 ">
                                                    <center>
                                                        <a href="<?php echo base_url('ads'); ?>" class="btn btn-info float-center  px-5 ml-1 mt-3 mr-1">Cancel</a>
                                                        <button class=" btn btn-success float-center px-5 ml-1 mt-3 mr-1 "> Save </button> 
                                                    </center>
                                                </div>
                                            </div>
                                            <?php
                                        echo form_close();

                                    ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





<script type="text/javascript">
    
 var _URL = window.URL || window.webkitURL;
  function imgdis(input) 
   {
        $('#lyerrmsg').html('');
        if (input.files && input.files[0]) 
        {
            var fileExtension = ['jpeg','png','jpg'];
            if ($.inArray($(input).val().split('.').pop().toLowerCase(), fileExtension) == -1) 
            {

                var src="<?php echo $defimage; ?>";
                $("#lyerrmsg").html("Only formats are allowed : "+fileExtension.join(', '));
                $(input).val("");
                $('#img_prew').attr('src',src);
            }
            else
            {
                var file =input.files[0];
                img = new Image();
                var imgwidth = 0;
                var imgheight = 0;
                var maxwidth = 900;
                var maxwidth2 = 728;
                var maxheight = 90;

                img.src = _URL.createObjectURL(file);
                img.onload = function() 
                {
                    imgwidth = this.width;
                    imgheight = this.height;
                        if((imgwidth == maxwidth || imgwidth == maxwidth2) && imgheight == maxheight)
                        {
                            var reader = new FileReader();
                            reader.onload = function (e) 
                            {
                                $('#img_prew').attr('src', e.target.result);
                            };
                            reader.readAsDataURL(input.files[0]);
                        }
                        else
                        {
                            var src="<?php echo $defimage; ?>";
                            $("#lyerrmsg").html("Image must be 728*90 or 900*90");
                            $(input).val("");
                            $('#img_prew').attr('src',src);
                        }
                }
                
            }
        }
   }

</script>


