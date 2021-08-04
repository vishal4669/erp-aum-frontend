import React, { useEffect, useState } from "react"

import { Link, input } from "react-router-dom"

import PropTypes from "prop-types"
import { connect } from "react-redux"

import {
    Button,
    Card,
    CardBody,
    Col,
    
    Container,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//css
import "@fullcalendar/bootstrap/main.css"
import Commingsoon from "../../assets/images/coming-soon-img.png"

const Employee = props => {
    const { events, categories } = props
    const [modal, setModal] = useState(false)
    const [event, setEvent] = useState({})
    const [isEdit, setIsEdit] = useState(false)

  /**
  * Handling the modal state
  */
    const toggle = () => {
        setModal(!modal)
        setTimeout(() => {
            setEvent({})
            setIsEdit(false)
        }, 500)
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-flex align-items-center justify-content-between">                               
                                 <div class="page-title">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                        <li class="breadcrumb-item">HR</li>
                                        <li class="breadcrumb-item active">Employee</li>
                                    </ol>
                                </div>

                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li><Link to="assign_rights" class="btn btn-primary"><i class="fa fa-check">&nbsp;Assign Rights</i></Link></li>&nbsp;
                                        <li><Link to="add_employee" class="btn btn-primary"><i class="fa fa-plus">&nbsp;New Employee</i></Link></li>&nbsp;
                                        </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* End Render Breadcrumb */}

                    { /*Start Table */}

                    <Row>
                        <Col className="col-12">
                            <Card>
                                <CardBody className="d-grid">
                                    <Row>
                                        
                                    <div class="col-8">
                                        <div class="dt-buttons btn-group flex-wrap">
                                            <button class="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatable-buttons" type="button">
                                                <span>Copy</span></button>
                                            <button class="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="datatable-buttons" type="button"><span>Excel</span></button>
                                            <button class="btn btn-secondary buttons-pdf buttons-html5" tabindex="0" aria-controls="datatable-buttons" type="button"><span>PDF</span></button> <div class="btn-group">
                                            <button class="btn btn-secondary buttons-collection dropdown-toggle buttons-colvis" tabindex="0" aria-controls="datatable-buttons" type="button" aria-haspopup="true" aria-expanded="false"><span>Column visibility</span></button></div> </div>
                                    </div>

                                        <div class="col-4">
                                            <div id="datatable-buttons_filter" class="dataTables_filter"><label>Search:</label>
                                                <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="datatable-buttons" />
                                            </div>
                                        </div>
                                    </Row>

                                <Row>
                                    <Col className="col-12">

                                        <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed"  role="grid" aria-describedby="datatable-buttons_info">
                                            <thead>
                                                    <tr role="row">
                                                        <th class="sorting_asc" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="System ID: activate to sort column descending">System ID</th>
                                                        <th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Approved: activate to sort column ascending">Approved</th>
                                                        <th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Company: activate to sort column ascending">Company</th>
                                                        <th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending">Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Username: activate to sort column ascending">Username</th>
                                                        <th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Machine Code: activate to sort column ascending">Machine Code</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending">Position</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Department: activate to sort column ascending">Department</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Actions: activate to sort column ascending">Actions</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Mobile: activate to sort column ascending">Mobile</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Phone: activate to sort column ascending">Phone</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending">Email</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Address: activate to sort column ascending">Address</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Attendance: activate to sort column ascending">Attendance</th><th class="sorting" tabindex="0" aria-controls="datatable-buttons" rowspan="1" colspan="1" aria-label="Parent: activate to sort column ascending">Parent</th></tr>
                                            </thead>

                                            <tbody>

                                                <tr role="row" class="odd">
                                                    <td class="sorting_1 dtr-control">1</td>
                                                    <td><button type="button" class="btn btn-warning waves-effect waves-light">Pending</button></td>
                                                    <td>Aum Research Laboratories</td>
                                                    <td>Aashi Sanjaybhai Sanghavi</td>
                                                    <td>Aashi97</td>
                                                    <td>1000</td>
                                                    <td>Chemist</td>
                                                    <td>QC</td>
                                                    <td><div class="btn-group">
                                                        <button type="button" class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Action <i class="fa fa-chevron-down"></i>
                                                        </button>
                                                        <div class="dropdown-menu dropdown-menu-right">
                                                            <a class="dropdown-item display_block" href="#">Print Offer Letter</a>
                                                            <a class="dropdown-item display_block" href="#">Print Appointment Letter</a>
                                                            <a class="dropdown-item display_block" href="#">Print Experience Letter</a>
                                                            <a class="dropdown-item display_block" href="#">All Rights Print</a>
                                                            <a class="dropdown-item display_block" href="#">Edit</a>
                                                            <a class="dropdown-item display_block" href="#">Delete</a>
                                                            <a class="dropdown-item display_block" href="#">View</a>

                                                        </div>
                                                    </div></td>
                                                    <td >8200935890</td>
                                                    <td ></td>
                                                    <td >darshanasanghavi28@gmail.com</td>
                                                    <td >8/88, Vishvanagar Flat, Outside Amadavadi Darvaja, Nadiad Nadiad
                                                    
                                            </td>
                                                    <td >Yes</td>
                                                    <td >Kamlesh</td>

                                                </tr></tbody></table>


                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="col-12">
                                            <div class="col-sm-12 col-md-5">
                                             <div class="dataTables_info" id="datatable-buttons_info" role="status" aria-live="polite">Showing 1 to 1 of 1 entries</div></div>
                                    </Col>
                                </Row>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    
                </Container>
            </div>
        </React.Fragment>

     )

}


export default Employee