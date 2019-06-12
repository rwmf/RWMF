

			<div class="container-fluid">
                <div class="row page-titles">
                    <div class="col-md-6 col-8 align-self-center">
                        <h3 class="text-themecolor m-b-0 m-t-0">Programme Gallery</h3>
                    </div>
                    <div class="col-md-6 col-4 align-self-center">
                       <ol class="breadcrumb float-right">
                            <li class="breadcrumb-item"><a href="<?php echo base_url('admin'); ?>">Home</a></li>
                            <li class="breadcrumb-item "><a href="<?php echo base_url('programmes'); ?>">Programmes</a></li>
                            <li class="breadcrumb-item active">Gallery</li>
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
                                            <h4 class="mb-0"><?php echo $title; ?></h4>
                                        </div>
                                        <div class="col-lg-6 col-md-6 col-12">
                                            <a href="<?php echo base_url('gallery/'.$prg_id.'/new/'); ?>" class="btn pull-right hidden-sm-down btn-success btn-labeled fa fa-plus"> Add New </a>
                                        </div>
                                    </div>
                                </div>
                               

                                <div class="table-responsive" >
                                    <table class="table" id="gallery_list">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Type</th>
                                                <th>Date</th>
                                                <th >Options</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                if ($g_data) 
                                                {   $i=1;
                                                    foreach ($g_data as $key) 
                                                    {
                                                        echo "<tr>
                                                                <td>".$i."</td>
                                                                <td>".ucfirst($key->title)."</td>
                                                                <td>".ucfirst($key->gallery_type)."</td>
                                                                <td>".date('d-m-Y',strtotime($key->date))."</td>
                                                                <td >
                                                                    <!-- <a class='btn btn-success btn-xs ' data-toggle='tooltip' data-original-title='View' href='" . base_url('admin/gallery/view/').$prg_id.'/'.$key->id . "'> View</a>-->
                                                                    <a class='btn btn-info btn-xs' data-toggle='tooltip' data-original-title='Edit' href='" . base_url('gallery/').$prg_id.'/edit/'.$key->id . "'> Edit</a> 
                                                                    <button id='gal_".$key->id."' class='btn btn-danger btn-xs' data-toggle='tooltip' data-original-title='Delete' data-dhref='" . base_url('gallery/'.$prg_id.'/delete/'.$key->id)."'onclick='deldata(this.id)'> Delete</button> 
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
        $('#gallery_list').DataTable({
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