

			<div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Programmes</h3>
                        
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                        <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url(); ?>">Home</a></li>
                            <li class="breadcrumb-item active">Programmes</li>
                        </ol>
                        
                    </div>
                </div>
               
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-block">

                                <div class="card-title">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 col-12">
                                            <h4 class="mb-0">Programme list</h4>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-12">
                                            <a href="<?php echo base_url('programmes/new'); ?>" class="btn pull-right hidden-sm-down btn-success btn-labeled fa fa-plus"> Add New Programme</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- <h6 class="card-subtitle">Add class <code>.table</code></h6> -->
                                <div class="table-responsive" >
                                    <table class="table" id="programme_list">
                                        <thead>
                                            <tr >
                                                <th>#</th>
                                                <th class='text-center'>Name</th>
                                                <th class='text-center'>Code</th>
                                                <th class='text-center'>Day</th>
                                                <th class='text-center'>Time</th>
                                                <th class='text-center'>Stage</th>
                                                <th class='text-center'>Type</th>
                                                <th class='text-center'>Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                if ($p_data) 
                                                {   $i=1;
                                                    foreach ($p_data as $key) 
                                                    {
                                                        echo "<tr class='text-center'>
                                                                <td>".$i."</td>
                                                                <td>".$key->name."</td>
                                                                <td>".$key->code."</td>
                                                                <td class='text-center'>".$key->day."</td>
                                                                <td>".date("h:i a",strtotime($key->time))."</td>
                                                                <td>".$key->sname."</td>
                                                                <td>".$key->ptype."</td>
                                                                <td class='float-right'>
                                                                    <a class='btn btn-success btn-xs ' data-toggle='tooltip' title='Registered Users' href='" . base_url('programmes/users/'). $key->id . "'> Users</a>
                                                                    <a class='btn btn-primary btn-xs' data-toggle='tooltip' data-original-title='Gallery' href='" . base_url('gallery/'). $key->id . "'> Gallery</a>
                                                                    <a class='btn btn-info btn-xs' data-toggle='tooltip' data-original-title='Edit' href='" . base_url('programmes/edit/'). $key->id . "'> Edit</a> 
                                                                    <button id='prg_".$key->id."' class='btn btn-danger btn-xs' data-toggle='tooltip' data-original-title='Delete' data-dhref='" .base_url('admin/programmes/delete/'). $key->id . "' onclick='deldata(this.id)'> Delete</button>
                                                                </td>
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

<div id="del-modal" class="modal fade">
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
                <a id='del-hrf' href=""><button type="button" class="btn btn-danger">Delete</button></a>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    $(document).ready(function() 
    {
        $('#programme_list').DataTable({
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
    });

    function deldata(id)
    {
        if(id)
        {
            var delhrf=$("#"+id).data("dhref");
            $("#del-hrf").attr("href",delhrf)
            $('#del-modal').modal('show');
        }
        
    }
</script>