

		<header class="topbar">
            <nav class="navbar top-navbar navbar-toggleable-sm navbar-light">
                <!-- ============================================================== -->
                <!-- Logo -->
                <!-- ============================================================== -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="<?php echo base_url('admin')?>">
                        <!-- Logo icon -->
                        <b>
                            <!--You can put here icon as well // <i class="wi wi-sunset"></i> //-->
                            <!-- Dark Logo icon -->
                            <img sizes="32x32" src="<?php echo base_url('template/assets/images/favicon.png');?>" alt="homepage" class="dark-logo" />
                            
                        </b>
                        <!--End Logo icon -->
                        <!-- Logo text -->
                        <span>
                            <!-- <b>
                                RWMF
                            </b> -->
                         <!-- dark Logo text -->
                         <img src="<?php echo base_url('template/assets/images/logo-text.png');?>" alt="homepage" class="dark-logo" /> 

                        </span> 
                    </a>
                </div>
                <!-- ============================================================== -->
                <!-- End Logo -->
                <!-- ============================================================== -->
                <div class="navbar-collapse">
                    <!-- ============================================================== -->
                    <!-- toggle and nav items -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav mr-auto mt-md-0 ">
                        
                        <!-- <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                        <li class="nav-item hidden-sm-down">
                            <form class="app-search p-l-20">
                                <input type="text" class="form-control" placeholder="Search for..."> <a class="srh-btn"><i class="ti-search"></i></a>
                            </form>
                        </li> -->
                    </ul>
                    <!-- ============================================================== -->
                    <!-- User profile and search -->
                    <!-- ============================================================== -->
                    <ul class="navbar-nav my-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="<?php echo base_url('template/assets/images/users/5.jpg'); ?>" alt="user" class="profile-pic m-r-5" /><?php echo ucfirst($this->session->userdata('admin_user')->name); ?>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>	
        
        
        <section class="message">
         <?php
           if($this->session->flashdata('success'))
          {
           ?>
            <div class="alert btn-success alert-dismissible floatmsg" id="petalert">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <?php
                if($this->session->flashdata('success')){ ?><?php echo $this->session->flashdata('success')?><?php } ?>
           </div><?php
           }
          if($this->session->flashdata('error'))
          { ?>
            <div class="alert btn-danger alert-dismissible floatmsg" id="petalert">
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><?php
                if($this->session->flashdata('error')){ ?><?php echo $this->session->flashdata('error')?><?php } ?>
           </div><?php
          }
         ?>
       </section>

<style type="text/css">
    .floatmsg
    {
        position: fixed;
        z-index: 99;
        right: 0;
        top: 70px;
        padding: 10px;
    }
    .floatmsg button.close
    {
        padding: 0 10px;
        right: 0;
        top: 0;
    }

</style>
<script type="text/javascript">
    $(function ()
    {
       $('#petalert').delay(2500).fadeOut('slow');
    });
</script>