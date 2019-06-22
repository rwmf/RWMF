

            <div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Stages</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item "><a href="<?php echo base_url('stages'); ?>">Stages</a></li>
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
                                        if(!$stage)
                                        {
                                            $stage=array();
                                            $stage['id']=0;
                                            $stage['name']=$stage['description']=$stage['location']='';
                                            $stage['latitude']='1.749422';$stage['longitude']='110.316334';
                                            $stage = (object) $stage;
                                        }
                                        else
                                        {
                                            if(file_exists($stage->image))
                                            {
                                                $defimage =base_url().$stage->image.'?'.time();
                                            }
                                        }
                                        if($stage->id<=0)
                                        {
                                            echo form_open_multipart(base_url('stages/new'), array('name' => 'new_stage', 'id' => 'new_stage', 'class' => 'form-horizontal form-material'));
                                        }
                                        else
                                        {
                                            echo form_open_multipart(base_url('stages/edit/'.$stage->id), array('name' => 'edit_stage', 'id' => 'edit_stage', 'class' => 'form-horizontal form-material'));
                                        }
                                         
                                    ?>
                                            <div class="row">
                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="name" class="">Name</label>
                                                        <input type="text" name="name" placeholder="Name" class="form-control form-control-line" value="<?php echo set_value('name',$stage->name); ?>" >
                                                        <span class="from_validaton"><?php echo form_error('name');?></span>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="description" class="">Description</label>
                                                        <textarea name="description" placeholder="Description" class="form-control form-control-line"><?php echo set_value('description',$stage->description); ?></textarea>
                                                    </div>
                                                    <span class="from_validaton"><?php echo form_error('description');?></span>
                                                </div>


                                                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="form-group">
                                                        <label for="location" class="">Location</label>
                                                        <input name="location" id="searchTextField" type="text" class="form-control " value="<?php echo set_value('location',$stage->location); ?>" >
                                                        <span class="from_validaton"><?php echo form_error('location');?></span>
                                                        <div id="map_canvas" style="height: 300px;width: 500px;margin: 0.6em;"></div>
                                                        <input id='mp_lat' name="latitude" class="MapLat" value="" type="text" placeholder="Latitude" value="<?php echo set_value('latitude',$stage->latitude); ?>" >
                                                        <input id='mp_lon' name="longitude" class="MapLon" value="" type="text" placeholder="Longitude" value="<?php echo set_value('longitude',$stage->longitude); ?>" >
                                                    </div>
                                                    
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
                                                    <a href="<?php echo base_url('stages'); ?>" class="btn btn-info float-right  px-5 ml-1 mt-1 mr-1">Cancel</a>
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
    

         var lat = '<?php echo set_value('latitude',$stage->latitude); ?>';//8.513186,
         var lng = '<?php echo set_value('longitude',$stage->longitude); ?>';//76.960054,
         $('.MapLat').val(lat);
         $('.MapLon').val(lng);

         var latlng = new google.maps.LatLng(lat, lng),
             image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
         
         var mapOptions = {
             center: new google.maps.LatLng(lat, lng),
             zoom: 17,
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             panControl: true,
             panControlOptions: {
                 position: google.maps.ControlPosition.TOP_RIGHT
             },
             zoomControl: true,
             zoomControlOptions: {
                 style: google.maps.ZoomControlStyle.LARGE,
                 position: google.maps.ControlPosition.TOP_left
             }
         },
         map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions),
             marker = new google.maps.Marker({
                 position: latlng,
                 map: map,
                 icon: image
             });
         var input = document.getElementById('searchTextField');
         var autocomplete = new google.maps.places.Autocomplete(input, {
             types: ["geocode"]
         });
         autocomplete.bindTo('bounds', map);
         var infowindow = new google.maps.InfoWindow();
         google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
             infowindow.close();
             var place = autocomplete.getPlace();
             if (place.geometry.viewport) {
                 map.fitBounds(place.geometry.viewport);
             } else {
                 map.setCenter(place.geometry.location);
                 map.setZoom(17);
             }
             moveMarker(place.name, place.geometry.location);
             $('.MapLat').val(place.geometry.location.lat());
             $('.MapLon').val(place.geometry.location.lng());
         });
         google.maps.event.addListener(map, 'click', function (event) 
         {
             marker.setPosition(event.latLng);
             marker.setVisible(true);
             $('.MapLat').val(event.latLng.lat());
             $('.MapLon').val(event.latLng.lng());
             infowindow.close();
                     var geocoder = new google.maps.Geocoder();
                     geocoder.geocode({
                         "latLng":event.latLng
                     }, function (results, status) {
                         console.log(results, status);
                         if (status == google.maps.GeocoderStatus.OK) 
                         {
                             console.log(results);
                             var lat = results[0].geometry.location.lat(),
                                 lng = results[0].geometry.location.lng(),
                                 placeName = results[0].address_components[0].long_name,
                                 latlng = new google.maps.LatLng(lat, lng);
                             moveMarker(placeName, latlng);
                             $("#searchTextField").val(results[0].address_components[0].long_name);
                         }
                     });
         });
        
         function moveMarker(placeName, latlng) 
         {
             marker.setIcon(image);
             marker.setPosition(latlng);
             infowindow.setContent(placeName);
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
    #mp_lat,#mp_lon
    {
        display: none;
    }
</style>