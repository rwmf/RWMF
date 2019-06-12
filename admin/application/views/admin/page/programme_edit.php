

            <div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Programmes</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item "><a href="<?php echo base_url('programmes'); ?>">Programmes</a></li>
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
                                        $defimage=$this->Basic_model->image_link('programme','0');
                                        if(!$prg_data)
                                        {
                                            $prg_data=array();
                                            $prg_data['id']=0;
                                            $prg_data['name']=$prg_data['description']=$prg_data['type']='';
                                            $prg_data['code']=$prg_data['day']=$prg_data['stage']='';
                                            $prg_data['time']='';
                                            $prg_data = (object) $prg_data;
                                        }
                                        else
                                        {
                                            $prg_data->time=date('H:i',strtotime($prg_data->time));
                                            if(file_exists($prg_data->image))
                                            {
                                                $defimage =base_url().$prg_data->image.'?'.time();
                                            }
                                        }
                                        if($prg_data->id<=0)
                                        {
                                            echo form_open_multipart(base_url('programmes/new'), array('name' => 'new_programm', 'id' => 'new_programm', 'class' => 'form-horizontal form-material'));
                                        }
                                        else
                                        {
                                            echo form_open_multipart(base_url('programmes/edit/'.$prg_data->id), array('name' => 'edit_programm', 'id' => 'edit_programm', 'class' => 'form-horizontal form-material'));
                                        }
                                         
                                    ?>
                                   
                                            <div class="row">

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="name" class="">Programme Name</label>
                                                        <input type="text" name="name" placeholder="Name" class="form-control form-control-line" value="<?php echo set_value('name',$prg_data->name); ?>" >
                                                        <span class="from_validaton"><?php echo form_error('name');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="code" class="">Programme Code</label>
                                                        <input type="text" name="code" placeholder="Code" class="form-control form-control-line" value="<?php echo set_value('code',$prg_data->code); ?>" >
                                                        <span class="from_validaton"><?php echo form_error('code');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="date" class="">Day</label>
                                                        <?php
                                                            $app_id=$this->session->userdata('app_id');
                                                            $prgday=array(''=>'Select Day');
                                                            $prdyq=$this->db->where('status','1')->where('app_id',$app_id)->order_by('day','asc')->get('programme_days');
                                                            if($prdyq->num_rows()>0)
                                                            {
                                                                foreach ($prdyq->result() as $key)
                                                                {
                                                                    $prgday[$key->day]='Day '.$key->day.' ('.date('d-M-Y',strtotime($key->date)).')';
                                                                }
                                                            }

                                                            echo form_dropdown('day', $prgday, set_value('day',$prg_data->day), 'class="form-control form-control-line" id="day"');
                                                        ?>
                                                        <span class="from_validaton"><?php echo form_error('day');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="time" class="">Time</label>
                                                        <input autocomplete="off" type="text" id="time" name="time" placeholder="Time" class="form-control form-control-line" value="<?php echo set_value('time',$prg_data->time); ?>" >
                                                        <span class="from_validaton"><?php echo form_error('time');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="type" class="">Type</label>
                                                        <?php
                                                            $optiontype=array(''=>'Select Type');
                                                            $tpopq=$this->db->where('status','1')->get('programme_types');
                                                            if($tpopq->num_rows()>0)
                                                            {
                                                                foreach ($tpopq->result() as $key)
                                                                {
                                                                    $optiontype[$key->id]=$key->type;
                                                                }
                                                            }

                                                            echo form_dropdown('type', $optiontype, set_value('type',$prg_data->type), 'class="form-control form-control-line" id="type"');
                                                        ?>
                                                        <span class="from_validaton"><?php echo form_error('type');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="stage" class="">Stage</label>
                                                        <?php
                                                            $app_id=$this->session->userdata('app_id');
                                                            $prgstage=array(''=>'Select Stage');
                                                            $stopq=$this->db->where('status','1')->where('app_id',$app_id)->get('programme_stages');
                                                            if($stopq->num_rows()>0)
                                                            {
                                                                foreach ($stopq->result() as $key)
                                                                {
                                                                    $prgstage[$key->id]=$key->name;
                                                                }
                                                            }

                                                            echo form_dropdown('stage', $prgstage, set_value('stage',$prg_data->stage), 'class="form-control form-control-line" id="stage"');
                                                        ?>
                                                        <span class="from_validaton"><?php echo form_error('stage');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="description" class="">Description</label>
                                                        <textarea rows="4" name="description" placeholder="Enter Description" class="form-control form-control-line"><?php echo set_value('description',$prg_data->description); ?></textarea>
                                                    </div>
                                                    <span class="from_validaton"><?php echo form_error('description');?></span>
                                                </div>

                                                

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="image" class="">Image</label>
                                                        <input  name="image" id="primage" type="file" class="form-control "  accept="image/jpeg, image/png" onchange="imgdis(this);">
                                                        <span id="lyerrmsg" class="from_validaton"><?php echo form_error('image');?></span>
                                                        <div style="height: 250px;width: 250px;display: block;margin: auto;">
                                                            <img id="img_prew" src="<?php echo $defimage; ?>" />
                                                        </div>
                                                    </div>
                                                    
                                                </div>



                                            </div>
                                            <div class="form-group ">
                                                <div class="col-sm-12 ">
                                                    <button class=" btn btn-success float-right px-5 ml-1 mt-1 mr-1 "> Save </button> 
                                                    <a href="<?php echo base_url('programmes'); ?>" class="btn btn-info float-right  px-5 ml-1 mt-1 mr-1">Cancel</a>
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
    

  $(function() 
  {
    // $('#date').datetimepicker({
    //             format: 'dd-mm-yyyy',
               
    //             minView: 'month',
    //             autoclose: true,
    //             startDate: '+1d'
    // });
    
    $('#time').clockpicker(
    {
        placement: 'bottom',
        align: 'left',
        autoclose: true,
        'default': 'now'
    });



  });

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
                var reader = new FileReader();
                reader.onload = function (e) 
                {
                    $('#img_prew').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
    }

  

</script>

<style type="text/css">
    
    .timepicker
    {
        overflow: hidden;
    }
    .timepicker .datetimepicker-hours,
    .timepicker .datetimepicker-minutes > table
    {
     margin-top: -30px;
    }    

    #img_prew
    {
        height: 100%;
        width:100%;
    }
</style>