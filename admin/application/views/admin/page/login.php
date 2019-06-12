<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo base_url('template/assets/images/favicon.png'); ?>">
    <title>RWMF - Login</title>
    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url('template/assets/plugins/bootstrap/css/bootstrap.min.css') ?>" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="<?php echo base_url('template/css/style.css');?>" rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="<?php echo base_url('template/css/colors/green.css');?>" id="theme" rel="stylesheet">
    

</head>

<body class="hold-transition login-page card-no-border">
    

    <section id="wrapper" class="">
        <div class=" ">
            <div class="error-body text-center"> 
                <img src="<?php echo base_url('template/assets/images/logo-text.png');?>" alt="homepage" class="dark-logo" />       
                <!-- <h3 class="text-uppercase"><b>RWMF</b></h3> -->
                <p class="text-muted m-t-30 m-b-30">Sign in to RWMF Admin</p>
                <div class="container pt-3">
                    <div class="row justify-content-sm-center">
                        <div class="col-sm-6 col-md-4">
                            <div class="card border-info text-center">
                                <div class="card-body">
                                    <?php 
                                    echo form_open(base_url('admin/login/'), array('name' => 'login_form', 'id' => 'login_form','class'=>'form-signin')); 
                                        ?>
                                        <div class="form-group">
                                            <!-- <label for="email">Email</label> -->
                                            <input type="text" name="email" id="email" class="form-control mb-2" placeholder="Email" value="<?php echo set_value('email'); ?>" required autofocus>
                                        </div>
                                        <div class="form-group">
                                            <!-- <label for="password">Email</label> -->
                                            <input type="password" name="password" id="password" class="form-control mb-2" placeholder="Password" required>
                                        </div>
                                        <?php
                                            if (form_error('password')) 
                                            {
                                               echo "<div class='error' style='color:red;'>".form_error('password')."</div>";
                                            }
                                        ?>
                                        <button class="btn btn-info btn-rounded waves-effect waves-light m-b-40" type="submit">Sign in</button>
                                        <!-- <a style="float:right" class="btn  btn-rounded waves-effect waves-light m-b-40" href="#" class="float-right">Forget password?</a> -->
                                        <?php
                                    echo form_close();  
                                    ?>
                                    
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
       
    </section>
    

    <script src="<?php echo base_url('template/assets/plugins/jquery/jquery.min.js');?>"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="<?php echo base_url('template/assets/plugins/bootstrap/js/tether.min.js');?>"></script>
    <script src="<?php echo base_url('template/assets/plugins/bootstrap/js/bootstrap.min.js');?>"></script>
    <!--Wave Effects -->
    <script src="<?php echo base_url('template/js/waves.js');?>"></script>
</body>

</html>
