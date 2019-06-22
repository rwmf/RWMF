

			<div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">App Icon</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item active">App Icon</li>
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
                                        $bus_location=base_url().'uploads/default_image/programme.png';
                                        if($appicon_link)
                                        {
                                           $bus_location= $appicon_link.'?'.time();
                                        }
                                        //print_r($bus_data);
                                        // echo $bus_data->id;

                                        echo form_open_multipart(base_url('admin/appicon'), array('name' => 'appicon', 'id' => 'appicon', 'class' => ' form-material')); ?>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="imgprew col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <span class="priveiwimg">
                                                                
                                                                <img id="img_prew" src="<?php echo $bus_location; ?>" />
                                                            </span>

                                                            <label for="file-upload" class="custom-file-upload btn-info">
                                                                <i class="fa fa fa-picture-o"></i> Select Image
                                                            </label>
                                                            <input name="image" id="file-upload" type="file" accept="image/jpeg, image/png" onchange="imgdis(this);"/>
                                                            
                                                            <span id="lyerrmsg" class="from_validaton">* image size must be 512X512 and jpeg or png format  <!-- <br/> make sure that the image background is transparent  --></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                    
                                                
                                                
                                                <div class="form-group ">
                                                    <div class="col-sm-12 ">
                                                        <center>
                                                            <button class=" btn btn-success float-center px-5 ml-1 mt-1 mr-1 "> Save </button> 
                                                        </center>
                                                    </div>
                                                </div>

                                            <?php
                                            //print_r($bus_data);
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
    
    function imgdis(input) 
    {
        var _URL = window.URL || window.webkitURL;
        $('#lyerrmsg').html('');
        if (input.files && input.files[0]) 
        {
            var fileExtension = ['jpeg','png','jpg'];
            if ($.inArray($(input).val().split('.').pop().toLowerCase(), fileExtension) == -1) 
            {
                var src="<?php echo $bus_location; ?>";
                $('#del-rb').show();
                $("#lyerrmsg").html("Only formats are allowed : "+fileExtension.join(', '));
                $(input).val("");
                $('#img_prew').attr('src',src);
            }
            else
            {
                // var reader = new FileReader();
                // reader.onload = function (e) 
                // {
                //     $('#del-rb').hide();
                //     $('#img_prew').attr('src', e.target.result);
                // };
                // reader.readAsDataURL(input.files[0]);

                var file =input.files[0];
                img = new Image();
                var imgwidth = 0;
                var imgheight = 0;
                var maxwidth = 512;
                var maxheight= 512;

                img.src = _URL.createObjectURL(file);
                img.onload = function() 
                {
                    imgwidth = this.width;
                    imgheight = this.height;
                        if(imgwidth == maxwidth  && imgheight == maxheight)
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
                            var src="<?php echo $bus_location; ?>";
                            $("#lyerrmsg").html("* image size must be 512X512 ");
                            $(input).val("");
                            $('#img_prew').attr('src',src);
                        }
                }
            }
        }
    }

     
</script>