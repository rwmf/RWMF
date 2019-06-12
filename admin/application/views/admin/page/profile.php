

			<div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Profile</h3>
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo  base_url('admin'); ?>">Home</a></li>
                            <li class="breadcrumb-item active">Profile</li>
                        </ol>
                    </div>
                </div>
               
                <div class="row">
                    <!-- Column -->
                    <div class="col-lg-4 col-xlg-3 col-md-5">
                        <div class="card">
                            <div class="card-block">
                                <center class="m-t-30"> <img src="<?php echo base_url('template/assets/images/users/5.jpg'); ?>" class="img-circle" width="150" />
                                    <h4 class="card-title m-t-10">
                                        <?php echo ucfirst($user_data->name); ?>
                                            
                                    </h4>
                                    <!-- <h6 class="card-subtitle">Accoubts Manager Amix corp</h6>
                                    <div class="row text-center justify-content-md-center">
                                        <div class="col-4"><a href="javascript:void(0)" class="link"><i class="icon-people"></i> <font class="font-medium">254</font></a></div>
                                        <div class="col-4"><a href="javascript:void(0)" class="link"><i class="icon-picture"></i> <font class="font-medium">54</font></a></div>
                                    </div> -->
                                </center>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                    <div class="col-lg-8 col-xlg-9 col-md-7">
                        <div class="card">
                            <div class="card-block">
                                <form class="form-horizontal form-material">
                                    <div class="form-group">
                                        <label for="name" class="col-md-12">Name</label>
                                        <div class="col-md-12">
                                            <input type="text" name="name" placeholder="Name" class="form-control form-control-line" value="<?php echo set_value('name',$user_data->name); ?>" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="col-md-12">Email</label>
                                        <div class="col-md-12">
                                            <input type="email" name="email" placeholder="Email" class="form-control form-control-line" name="email" id="email" value="<?php echo set_value('name',$user_data->email); ?>" disabled>
                                        </div>
                                    </div>
                                    <!--<div class="form-group">
                                        <label for="password" class="col-md-12">Password (if need to change)</label>
                                        <div class="col-md-12">
                                            <input type="password" name="password" class="form-control form-control-line" autocomplete="off">
                                        </div>
                                    </div>
                                     <div class="form-group">
                                        <label for="phone" class="col-md-12">Phone No</label>
                                        <div class="col-md-12">
                                            <input type="text" name="phone" placeholder="Phone Number" class="form-control form-control-line" value="<?php echo set_value('name',$user_data->phone); ?>">
                                        </div>
                                    </div>
                                   
                                    <div class="form-group">
                                        <div class="col-sm-12">
                                            <button class="btn btn-success">Update Profile</button>
                                        </div>
                                    </div> -->
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                </div>
               
            </div>