import React, { useState, useEffect } from 'react';

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Form,
  Container,
  Label,
  Input,
  FormGroup,
  Button,
  Alert,
} from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {commonpath} from '../../commonPath'
import moment from 'moment'

function ViewCustomer(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const customer_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  var logo_path = commonpath.logo_path;
  var pancard_copy_path = commonpath.pancard_copy_path;

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [customer, setCustomer] = useState({
  // ----Basic Info----
  company_name: '', gst_number: '',contact_person_name:'',tally_alias_name:'',
  user_name:'',password:'',birth_date:'',contact_type:'',priority:'',notes:'',is_active:'',logo:'',

  // ----History & Other Details
  education_details:'',prev_details:'',

  // ----Company Info----
  company_tin_no:'',company_service_tax_no:'',company_cust_discount:'',

  // -----Contact Info----
  //address1
  home_contact_no:'',home_qc_contact_no:'',home_landline:'',home_pan_card:'',home_email:'',home_street_1:'',
  home_street_2:'',home_city:'',home_country:'',home_state:'',home_area:'',home_pin:'',
  //address2
  other_contact_no:'',other_email:'',other_qc_email:'',other_street_1:'',other_street_2:'',other_city:'',
  other_country:'',other_state:'',other_area:'',other_pin:'',other_website:'',other_pan_card_copy:''
});

  const [inputList, setInputList]  = useState([{ name: "", mobile: "",
    email: "", department_name:"", position_title: ""}]);


useEffect(() => {
         GetCustomerData();
        }, []);

const GetCustomerData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getCustomer/`+customer_id,{headers})
              .then(response => {
                  setCustomer(response.data.data[0]);
                  setInputList(response.data.data[0].contact_person);
                  {setLoading1(false)};

              })
              .catch((error) => {
                  {setLoading1(false)}
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
              })
        }

return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form method="POST" id="EditCustomer" name="CustomerData">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Sales</li>
                                            <li className="breadcrumb-item"><a href="/customer">Customers</a></li>
                                            <li className="breadcrumb-item active">View Customer</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/customer" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                         <div className="row">
                            <div className="col-12">
                              {loading1 ? <center><LoadingSpinner /></center> :
                                <div className="card">
                                    <div className="card-body">

                                        <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Personal Info</i></h5>

                                         <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Company Name</label>
                                                        <input className="form-control" value={customer.company_name ? customer.company_name : 'No Data' } type="text" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>GST No</label>
                                                        <input className="form-control" value={customer.gst_number ? customer.gst_number : 'No Data'} type="text" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Contact Person Name</label>
                                                        <input className="form-control" value={customer.contact_person_name ? customer.contact_person_name : 'No Data'} type="text" readOnly/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Tally Alias Name</label>
                                                        <input className="form-control" value={customer.tally_alias_name ? customer.tally_alias_name : 'No Data'} type="text" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <label>Username</label>
                                                        <input className="form-control" value={customer.user_name ? customer.user_name : 'No Data'} type="text" readOnly/>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Birth Date</label>
                                                        <input className="form-control" value={customer.birth_date ? moment(customer.birth_date).format('DD-MM-YYYY') : 'No Data'} type="text" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <label>Contact Type</label>
                                                        <input className="form-control" value={customer.contact_type ? customer.contact_type : ''} type="text" readOnly/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Priority</label>
                                                       <input className="form-control" value={customer.priority ? customer.priority : 'No Data'} type="text" readOnly/>
                                                    </div>

                                                     <div className="col-md-4">
                                                        <label>Active/Inactive</label>
                                                        <input className="form-control" value={customer.is_active == 1 ? 'Active' : 'Inactive'} type="text" readOnly/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <label>Notes</label>
                                                        <textarea value={customer.notes ? customer.notes : 'No Data'} name="notes" className="form-control" readOnly></textarea>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Logo</label><br/>
                                                        {customer.logo && customer.logo !== "null" ? <img src={logo_path+customer.logo} width="80px" height="50px"/>  : <span class="btn btn-primary form-control">No Logo Available</span>}

                                                    </div>


                                                </div>
                                            </div>
                                        </div>

                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Contact Info</i></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                     <div className="col-md-6">
                                                        <h5 className="alert alert-info"><i className="fa fa-home">&nbsp;Home Details</i></h5>
                                                         <div className="form-group">
                                                             <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Home Street</label>
                                                                    <input value={customer.home_street_1 && customer.home_street_1 !== "undefined" ? customer.home_street_1 : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Area</label>
                                                                    <input value={customer.home_area && customer.home_area !== "undefined" ? customer.home_area : 'No Data' } className="form-control" type="text" readOnly/><br/>
                                                                    <label>Pincode</label>
                                                                    <input value={customer.home_pin && customer.home_pin !== "undefined" ? customer.home_pin : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Country</label>
                                                                    <input value={customer.home_country && customer.home_country !== "undefined" ? customer.home_country : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Account/Admin Contact No</label>
                                                                    <input value={customer.home_contact_no && customer.home_contact_no !== "undefined" ? customer.home_contact_no : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Account/Admin E-mail</label>
                                                                    <input value={customer.home_email && customer.home_email !== "undefined" ? customer.home_email : 'No Data'} className="form-control" type="text" readOnly/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input value={customer.home_street_2 && customer.home_street_2 !== "undefined" ? customer.home_street_2 : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>City</label>
                                                                    <input value={customer.home_city && customer.home_city !== "undefined" ? customer.home_city : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>State</label>
                                                                    <input value={customer.home_state && customer.home_state !== "undefined" ? customer.home_state : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>LandLine</label>
                                                                    <input value={customer.home_landline && customer.home_landline !== "undefined" ? customer.home_landline : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>QC Contact No</label>
                                                                    <input value={customer.home_qc_contact_no && customer.home_qc_contact_no !== "undefined" ? customer.home_qc_contact_no : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Pancard No</label>
                                                                    <input value={customer.home_pan_card && customer.home_pan_card !== "undefined" ? customer.home_pan_card : 'No Data'} className="form-control" type="text" readOnly/>
                                                                </div>
                                                              </div>
                                                         </div>

                                                     </div>
                                                     <div className="col-md-6">
                                                        <h5 className="alert alert-info"><i className="fa fa-address-book">&nbsp;Other Contact Details</i></h5>
                                                        <div className="form-group">
                                                             <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Street</label>
                                                                    <input value={customer.other_street_1 && customer.other_street_1 !== "undefined" ? customer.other_street_1 : 'No Data'} className="form-control" type="text" id="street" readOnly/><br/>
                                                                    <label>Area</label>
                                                                    <input value={customer.other_area && customer.other_area !== "undefined" ? customer.other_area : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Pincode</label>
                                                                    <input value={customer.other_pin && customer.other_pin !== "undefined" ? customer.other_pin : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Country</label>
                                                                    <input value={customer.other_country && customer.other_country !== "undefined" ? customer.other_country : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>QA Contact No</label>
                                                                    <input value={customer.other_contact_no && customer.other_contact_no !== "undefined" ? customer.other_contact_no : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input value={customer.other_email && customer.other_email !== "undefined" ? customer.other_email : 'No Data'} className="form-control" type="text" readOnly/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input value={customer.other_street_2 && customer.other_street_2 !== "undefined" ? customer.other_street_2 : 'No Data'} className="form-control" id="street2" type="text" readOnly/><br/>
                                                                    <label>City</label>
                                                                    <input value={customer.other_city && customer.other_city !== "undefined" ? customer.other_city : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>State</label>
                                                                    <input value={customer.other_state && customer.other_state !== "undefined" ? customer.other_state : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Website</label>
                                                                    <input value={customer.other_website && customer.other_website !== "undefined" ? customer.other_website : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input value={customer.other_qc_email && customer.other_qc_email !== "undefined" ? customer.other_qc_email : 'No Data'} className="form-control" type="text" readOnly/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    {customer.other_pan_card_copy !== null ?
                                                                   <a href={pancard_copy_path+customer.other_pan_card_copy} class="btn btn-primary form-control" target="_blank">Click To Open PanCard Copy</a>
                                                                   : <span class="btn btn-primary form-control">No Pancard Copy Uploaded</span>}
                                                                </div>
                                                              </div>
                                                         </div>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>

                                         <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;History & Other Details</i></h5>

                                          <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <label>Education Details</label>
                                                        <textarea value={customer.education_details ? customer.education_details : 'No Data' } className="form-control" readOnly></textarea>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Prev. Details</label>
                                                        <textarea value={customer.prev_details ? customer.prev_details : 'No Data'}  className="form-control" readOnly></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                          </div>

                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Comapny Info</i></h5>

                                              <div className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label>VAT No</label>
                                                            <input value={customer.company_vat_no ? customer.company_vat_no : 'No Data'} className="form-control" type="text" readOnly/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>TIN No</label>
                                                            <input value={customer.company_tin_no ? customer.company_tin_no : 'No Data'} className="form-control" type="text" readOnly/>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label>Service Tax No</label>
                                                            <input value={customer.company_service_tax_no ? customer.company_service_tax_no : 'No Data'} className="form-control" type="text" readOnly/>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label>CST No</label>
                                                            <input value={customer.company_cst_no ? customer.company_cst_no : 'No Data'} className="form-control" type="text" readOnly/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Customer Discount</label>
                                                            <input value={customer.company_cust_discount ? customer.company_cust_discount : 'No Data'} className="form-control" type="text" readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>

                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Contact Person</i></h5>
                                        {inputList && inputList.length ? inputList.map((x, i) => (
                                         <React.Fragment key={x}>

                                            <div className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label>Name</label>
                                                            <input className="form-control" type="text" value={x.name ? x.name : 'No Data'} readOnly/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Mobile</label>
                                                            <input className="form-control" type="text" value={x.mobile ? x.mobile : 'No Data'}  readOnly/>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label>E-mail</label>
                                                            <input className="form-control" type="email" value={x.email ? x.email : 'No Data'} readOnly/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label>Department</label>
                                                            <input className="form-control" type="text" value={x.department_name ? x.department_name : 'No Data'} readOnly/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Position</label>
                                                            <input className="form-control" type="text" value={x.position_title ? x.position_title : 'No Data'} readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </React.Fragment>
                                        ))
                                          : <h6><center>No Contact Person Details Found</center></h6>}
                                        </div>
                                </div>
                              }
                            </div>
                        </div>
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default ViewCustomer
