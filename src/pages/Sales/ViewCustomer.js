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
import Moment from 'moment';

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
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [selectedFiles, setselectedFiles] = useState(null)
  const [customer, setCustomer] = useState({ company_name: '', gst_number: '',contact_person_name:'',tally_alias_name:'',
  user_name:'',password:'',birth_date:'',contact_type:'Customer',priority:'High',notes:'',is_active:'1',logo:'',
  education_details:'',prev_details:'',company_tin_no:'',company_service_tax_no:'',company_cust_discount:''});

  const [address1, setCustomerAddress1] = useState({
  homestreet:'',homestreet2:'',area:'',city:'',pincode:'',state_id:'',country_id:'',landline:'',admin_contact:'',
  qc_contact:'',admin_email:'',pancard_no:''});

   const [address2, setCustomerAddress2] = useState({street:'',street2:'',area1:'',city1:'',pincode1:'',corr_state_id:'',
  corr_country_id:'',website:'',qa_contact:'',qc_email:'',qa_email:'',pancard_copy:''});

  const [inputList, setInputList]  = useState([{ contact_person_name: "", contact_person_mobile: "",
    contact_person_email: "", mst_departments_id:"", mst_positions_id: ""}]);


useEffect(() => {
         fetchCountry();
         fetchStates();
         fetchPosition();
         fetchDepartment();
         GetCustomerData();
        }, []);

const GetCustomerData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getCustomer/`+customer_id,{headers})
              .then(response => {
                  setCustomer(response.data.data);
                  setCustomerAddress1(response.data.data.contact_info[0]);  // setting Permenant address
                  setCustomerAddress2(response.data.data.contact_info[1]);
                  setInputList(response.data.data.contact_person);
                  {setLoading1(false)};

              })
              .catch((error) => {
                  {setLoading1(false)}
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
              })
        }

        const fetchCountry = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listCountries`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchStates = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listStates`,{headers})
            .then(response => {
                     setData1(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchPosition = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listPosition?is_dropdown=1`,{headers})
            .then(response => {
                     setData3(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchDepartment = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listDepartment?is_dropdown=1`,{headers})
            .then(response => {
                     setData4(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
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
                                                        <input className="form-control" value={customer.company_name} type="text" placeholder="Enter Company Name" id="example-text-input" name="company_name" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>GST No</label>
                                                        <input className="form-control" value={customer.gst_number} type="text" placeholder="Enter GST No" id="example-text-input" name="gst_number" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Contact Person Name</label>
                                                        <input className="form-control" value={customer.contact_person_name} type="text" name="contact_person_name" placeholder="Enter Contact Person Name" readOnly/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Tally Alias Name</label>
                                                        <input className="form-control" value={customer.tally_alias_name} type="text"  name="tally_alias_name" placeholder="Enter Tally Alias Name" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <label>Username</label>
                                                        <input className="form-control" value={customer.user_name} type="text" name="user_name" placeholder="Enter Username" readOnly/>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Birth Date</label>
                                                        <input className="form-control" value={customer.birth_date} type="text"  id="example-date-input" name="birth_date" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <label>Contact Type</label>
                                                        <input className="form-control" value={customer.contact_type} type="text" readOnly/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Priority</label>
                                                       <input className="form-control" value={customer.priority} type="text" readOnly/>
                                                    </div>

                                                     <div className="col-md-4">
                                                        <label>Active/Inactive</label>
                                                        <select value={customer.is_active} className="form-select" name="is_active" disabled>
                                                            <option value="1">Active</option>
                                                            <option value="0">Inactive</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <label>Notes</label>
                                                        <textarea value={customer.notes} name="notes" className="form-control" placeholder="Enter Notes" readOnly></textarea>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Logo</label><br/>
                                                        <img src={logo_path+customer.logo} width="80px" height="50px"/>

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
                                                                    <input value={address1.homestreet} className="form-control" type="text" name="homestreet" placeholder="Enter Homestreet" readOnly/><br/>
                                                                    <label>Area</label>
                                                                    <input value={address1.area} className="form-control" type="text" name="area" placeholder="Enter Area" readOnly/><br/>
                                                                    <label>Pincode</label>
                                                                    <input value={address1.pincode} className="form-control" type="text" name="pincode" placeholder="Enter Pincode" readOnly/><br/>
                                                                    <label>Country</label>
                                                                    <select value={address1.country_id} id="country_id" className="form-control" name="country_id" disabled>
                                                                    <option value="">No Country Selected</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> <br/>
                                                                    <label>Account/Admin Contact No</label>
                                                                    <input value={address1.admin_contact} className="form-control" type="text" name="admin_contact" placeholder="Enter Account/Admin Contact No" readOnly/><br/>
                                                                    <label>Account/Admin E-mail</label>
                                                                    <input value={address1.admin_email} className="form-control" type="text" name="admin_email" placeholder="Enter Account/Admin E-mail" readOnly/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input value={address1.homestreet2} className="form-control" type="text" name="homestreet2" placeholder="Enter Home Street2" readOnly/><br/>
                                                                    <label>City</label>
                                                                    <input value={address1.city} className="form-control" type="text" name="city" placeholder="Enter City" readOnly/><br/>
                                                                    <label>State</label>
                                                                    <select value={address1.state_id} className="form-control" id="state_id" name="state_id" disabled>
                                                                    <option value="">No State Selected</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> <br/>
                                                                    <label>LandLine</label>
                                                                    <input value={address1.landline} className="form-control" type="text" name="landline" placeholder="Enter Landline" readOnly/><br/>
                                                                    <label>QC Contact No</label>
                                                                    <input value={address1.qc_contact} className="form-control" type="text" name="qc_contact" placeholder="Enter QC Contact No" readOnly/><br/>
                                                                    <label>Pancard No</label>
                                                                    <input value={address1.pancard_no} className="form-control" type="text" name="pancard_no" placeholder="Enter Pancard No" readOnly/>
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
                                                                    <input value={address2.street} className="form-control" type="text" id="street" name="street" placeholder="Enter Street" readOnly/><br/>
                                                                    <label>Area</label>
                                                                    <input value={address2.area1} className="form-control" type="text" name="area1" placeholder="Enter Area" readOnly/><br/>
                                                                    <label>Pincode</label>
                                                                    <input value={address2.pincode1} className="form-control" type="text" name="pincode1" placeholder="Enter Pincode" readOnly/><br/>
                                                                    <label>Country</label>
                                                                    <select value={address2.corr_country_id} className="form-control" id="corr_country_id" name="corr_country_id" disabled>
                                                                    <option value="">No Country Selected</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select>  <br/>
                                                                    <label>QA Contact No</label>
                                                                    <input value={address2.qa_contact} className="form-control" type="text" name="qa_contact" placeholder="Enter QA Contact No" readOnly/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input value={address2.qa_email} className="form-control" type="text" name="qa_email" placeholder="Enter QA E-mail" readOnly/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input value={address2.street2} className="form-control" id="street2" type="text" name="street2" placeholder="Enter Street2" readOnly/><br/>
                                                                    <label>City</label>
                                                                    <input value={address2.city1} className="form-control" type="text" name="city1" placeholder="Enter City" readOnly/><br/>
                                                                    <label>State</label>
                                                                    <select value={address2.corr_state_id} className="form-control" id="corr_state_id" name="corr_state_id" disabled>
                                                                    <option value="">No State Selected</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> <br/>
                                                                    <label>Website</label>
                                                                    <input value={address2.website} className="form-control" type="text" name="website" placeholder="Enter Website" readOnly/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input value={address2.qc_email} className="form-control" type="text" name="qc_email" placeholder="Enter QC E-mail" readOnly/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    {address2.other_pan_card_copy !== null ?
                                                                   <a href={pancard_copy_path+address2.other_pan_card_copy} class="btn btn-primary form-control" target="_blank">Click To Open PanCard Copy</a>
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
                                                        <textarea value={customer.education_details} name="education_details" className="form-control" placeholder="Enter Education Details" readOnly></textarea>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Prev. Details</label>
                                                        <textarea value={customer.prev_details} name="prev_details" className="form-control" placeholder="Enter Previous Details" readOnly></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                          </div>

                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Comapny Info</i></h5>

                                              <div className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                        {/*<div className="col-md-3">
                                                            <label>VAT No</label>
                                                            <input className="form-control" type="text" placeholder="Enter VAT No" name="vat_no" onChange={ onChange }/>
                                                        </div>  */}

                                                        <div className="col-md-4">
                                                            <label>TIN No</label>
                                                            <input value={customer.company_tin_no} className="form-control" type="text" placeholder="Enter TIN No" name="company_tin_no" readOnly/>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label>Service Tax No</label>
                                                            <input value={customer.company_service_tax_no} className="form-control" type="text" name="company_service_tax_no" placeholder="Enter Service Tax No" readOnly/>
                                                        </div>
                                                        {/*<div className="col-md-2">
                                                            <label>CST No</label>
                                                            <input className="form-control" type="text"  name="cst_no" placeholder="Enter CST No" onChange={ onChange }/>
                                                        </div> */}

                                                        <div className="col-md-4">
                                                            <label>Customer Discount</label>
                                                            <input value={customer.company_cust_discount} className="form-control" type="text"  name="company_cust_discount" placeholder="Enter Customer Discount" readOnly/>
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
                                                            <input className="form-control" type="text" placeholder="Enter Name" value={x.contact_person_name} name="contact_person_name" readOnly/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Mobile</label>
                                                            <input className="form-control" type="text" placeholder="Enter Mobile" value={x.contact_person_mobile} name="contact_person_mobile" readOnly/>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label>E-mail</label>
                                                            <input className="form-control" type="email" name="contact_person_email" value={x.contact_person_email} placeholder="Enter E-mail" readOnly/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label>Department</label>
                                                            <select className="form-control" id="mst_departments_id" name="mst_departments_id" value={x.mst_departments_id} disabled>
                                                             <option value="">No Department Selected</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Position</label>
                                                            <select className="form-control" id="mst_positions_id" name="mst_positions_id" value={x.mst_positions_id} disabled>
                                                             <option value="">No Position Selected</option>
                                                            { data3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>) }
                                                         </select>
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
