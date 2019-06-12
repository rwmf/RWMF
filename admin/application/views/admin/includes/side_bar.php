

        <aside class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li>
                            <a href="<?php echo base_url(); ?>" class="waves-effect"><i class="fa fa-clock-o m-r-10" aria-hidden="true"></i>Dashboard</a>
                        </li>

                            <?php
                                $actstage='';
                                if($this->router->fetch_method()=='stages')
                                {
                                    $actstage=' active';
                                }
                            ?>

                        <li class="<?php echo $actstage; ?>" >
                            <a href="<?php echo base_url('stages'); ?>" class="waves-effect"><i class="fa fa-bank m-r-10" aria-hidden="true"></i>Manage Stages</a>
                        </li>


                            <?php
                                $actprg='';
                                if($this->router->fetch_method()=='programmes' || $this->router->fetch_method()=='gallery')
                                {
                                    $actprg=' active';
                                }
                            ?>

                        <li class="<?php echo $actprg; ?>" >
                            <a href="<?php echo base_url('programmes'); ?>" class="waves-effect"><i class="fa fa-table m-r-10" aria-hidden="true"></i>Manage Programmes</a>
                        </li>

                            <?php
                                $actuser='';
                                if($this->router->fetch_method()=='users')
                                {
                                    $actuser=' active';
                                }
                            ?>

                        <li class="<?php echo $actuser; ?>">
                            <a href="<?php echo base_url('users'); ?>" class="waves-effect"><i class="fa fa-users m-r-10" aria-hidden="true"></i>Manage Users</a>
                        </li>

                            <?php
                                $actbus='';
                                if($this->router->fetch_method()=='busschedule')
                                {
                                    $actbus=' active';
                                }
                            ?>

                        <li class="<?php echo $actbus; ?>">
                            <a href="<?php echo base_url('busschedule'); ?>" class="waves-effect"><i class="fa fa-bus m-r-10" aria-hidden="true"></i>Bus Scheduler</a>
                        </li>

                            <?php
                                $acttick='';
                                if($this->router->fetch_method()=='ticketinfo')
                                {
                                    $acttick=' active';
                                }
                            ?>

                        <li class="<?php echo $acttick; ?>">
                            <a href="<?php echo base_url('ticketinfo'); ?>" class="waves-effect"><i class="fa fa-ticket m-r-10" aria-hidden="true"></i>Ticket Info</a>
                        </li>
                        
                            <?php
                                $actadv='';
                                if($this->router->fetch_method()=='ads')
                                {
                                    $actadv=' active';
                                }
                            ?>
                        <li class="<?php echo $actadv; ?>">
                            <a href="<?php echo base_url('ads'); ?>" class="waves-effect"><i class="fa fa-audio-description m-r-10" aria-hidden="true"></i>Advertisements</a>
                        </li>
                        
                        <!-- <li>
                            <a href="pages-error-404.html" class="waves-effect"><i class="fa fa-info-circle m-r-10" aria-hidden="true"></i>Error 404</a>
                        </li> -->
                            <?php
                                $actprf='';
                                if($this->router->fetch_method()=='profile')
                                {
                                    $actprf=' active';
                                }
                            ?>
                        <li class="<?php echo $actprf; ?>">
                            <a href="<?php echo base_url('profile'); ?>" class="waves-effect"><i class="fa fa-user m-r-10" aria-hidden="true"></i>Profile</a>
                        </li>
                        
                        
                    </ul>
                    <div class="text-center m-t-30">
                        <a href="<?php echo base_url('logout'); ?>" class="btn btn-danger"> Log Out </a>
                    </div>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </aside>