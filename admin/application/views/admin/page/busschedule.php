

			<div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Bus Scheduler</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item active">Bus Scheduler</li>
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
                                        if(!$bus_data)
                                        {
                                           $bus_data['file_type']='image';
                                           $bus_data['location']='';
                                           $bus_data['link']='';
                                           $bus_data['id']=0;
                                           // (object)$bus_data;
                                           $bus_data=(object)$bus_data;
                                        }
                                        else
                                        {
                                            if(file_exists($bus_data->location))
                                            {
                                                $bus_location=base_url().$bus_data->location;
                                            }
                                        }
                                        
                                        //print_r($bus_data);
                                        // echo $bus_data->id;

                                        echo form_open_multipart(base_url('admin/busschedule'), array('name' => 'bus_schedule', 'id' => 'bus_schedule', 'class' => ' form-material')); ?>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="imgprew col-lg-12 col-md-12 col-sm-12 col-12">
                                                            <span class="priveiwimg">
                                                                <?php
                                                                    if($bus_data->id > 0)
                                                                    {
                                                                        echo '<i id="del-rb" class="fa fa-close" data-toggle="modal" data-target="#myModal" ></i>';
                                                                    }
                                                                ?>
                                                                <img id="img_prew" src="<?php echo $bus_location; ?>" />
                                                            </span>

                                                            <!-- <input  name="image" id="primage" type="file" class="form-control "  accept="image/jpeg, image/png" onchange="imgdis(this);"> -->
                                                            <label for="file-upload" class="custom-file-upload btn-info">
                                                                <i class="fa fa fa-picture-o"></i> Select Image
                                                            </label>
                                                            <input name="image" id="file-upload" type="file" accept="image/jpeg, image/png" onchange="imgdis(this);"/>
                                                            
                                                            <span id="lyerrmsg" class="from_validaton"><?php echo form_error('image');?></span>
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

                <!-- Modal HTML -->
<div id="myModal" class="modal fade">
    <div class="modal-dialog modal-confirm">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title ">Are you sure?</h4>  
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <p class="m-b-0" >Do you really want to delete these records? This process cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-dark" data-dismiss="modal">Cancel</button>
                <a href="<?php echo base_url('busschedule/delete'); ?>"><button type="button" class="btn btn-danger">Delete</button></a>
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



    .modal-confirm 
    {        
        color: #636363;
        width: 500px;
    }
    .modal-confirm .modal-content {
        padding: 10px;
        border-radius: 5px;
        border: none;
        text-align: center;
        font-size: 14px;
    }
    .modal-confirm .modal-header {
        border-bottom: none;   
        position: relative;
    }
    .modal-confirm h4 {
        text-align: center;
        font-size: 26px;
        display: block;
        width: 100%;
    }
    .modal-confirm .close {
        position: absolute;
        top: -5px;
        right: -2px;
    }
    .modal-confirm .modal-body {
        color: #999;
    }
    .modal-confirm .modal-footer {
        border: none;
        text-align: center;     
        border-radius: 5px;
        font-size: 13px;
        /*padding: 10px 15px 25px;*/
    }
    .modal-confirm .modal-footer  {
        color: #999;
    }       
    .modal-confirm .btn{
        color: #fff;
        border-radius: 4px;
        background: #60c7c1;
        text-decoration: none;
        transition: all 0.4s;
        line-height: normal;
        min-width: 120px;
        border: none;
        min-height: 40px;
        border-radius: 3px;
        margin: 0 5px;
        outline: none !important;
    }
   
    .modal-confirm .btn-danger {
        background: #f15e5e;
    }
    .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
        background: #ee3535;
    }
    .trigger-btn {
        display: inline-block;
        margin: 100px auto;
    }


</style>

<script type="text/javascript">
    
    function imgdis(input) 
    {
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

     
</script>