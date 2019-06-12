

			<div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Users</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo('admin'); ?>">Home</a></li>
                            <li class="breadcrumb-item active">Users</li>
                        </ol>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-block">
                                <h4 class="card-title">User list</h4>
                                <!-- <h6 class="card-subtitle">Add class <code>.table</code></h6> -->
                                <div class="table-responsive" >
                                    <table class="table" id="user_list">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>User Name</th>
                                                <th>Phone Number</th>
                                                <th>Email Id</th>
                                                <th>Signup Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                if($u_data) 
                                                {   $i=1;
                                                    foreach ($u_data as $key) 
                                                    {
                                                        echo "<tr>
                                                                <td>".$i."</td>
                                                                <td>".ucfirst($key->first_name).' '.$key->last_name."</td>
                                                                <td>".$key->phone."</td>
                                                                <td>".$key->email."</td>
                                                                <td>".date('d-m-Y',strtotime($key->signup_date))."</td>
                                                              </tr>";
                                                        $i++;
                                                    }
                                                }
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

<script type="text/javascript">
    $(document).ready(function() 
    {
        $('#user_list').DataTable({
            'paging': true,
            'lengthChange': false,
            'searching': true,
            'ordering': false,
            'info': false,
            'autoWidth': false,
            "bStateSave": true,
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables', JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('DataTables'));
            }

        });
    } );
</script>