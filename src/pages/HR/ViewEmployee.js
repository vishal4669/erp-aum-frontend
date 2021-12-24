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
  Alert,Table
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
import 'toastr/build/toastr.min.css';
import $ from 'jquery';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {commonpath} from '../../commonPath'
import moment from 'moment'

function ViewEmployee (props) {
    var employee_document_path = commonpath.employee_document_path;
    var employee_photo_sign = commonpath.employee_photo_sign;
       const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

        const url = window.location.href
        const employee_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
        const edit_employee_id =url.substring(url.lastIndexOf('/') + 1)

        const [loading, setLoading] = useState(false);
        const [loading1, setLoading1] = useState(false);
        const [data, setData] = useState([]);
        const [data1, setData1] = useState([]);
        const [data2, setData2] = useState([]);
        const [data3, setData3] = useState([]);
        const [data4, setData4] = useState([]);
        const [data5, setData5] = useState([]);

        const [employee, setemployee] = useState({ title: 'Mr.',first_name: '',middle_name: '',last_name: '',
        blood_group: 'None',gender: 'M',birth_date: '',marital_status:'Single',photo: '',machine_code: '',phone: '',mobile: '',
        notes: '',attendance:'1',signature:'',booking_action:'0',booking_sms:'0',booking_email:'0',booking_copy: '0',nationality:'',
        religion: '',caste: '',is_reporting_authority:'0', deposit: '0',booking_rate: '0',homestreet: '', area: '',
        pincode:'',country_id:'',emergency_contact_name:'',homestreet2: '',city: '',state_id:'',email: '',street:'',
        area1:'',pincode1:'',corr_country_id:'',emergency_contact_number:'',street2:'',city1:'',corr_state_id:'',website:'',
        mst_companies_id:'',reporting_authority_id: '',mst_departments_id:'',mst_positions_id:'',join_date:'',resign_date:'',
        bank_name:'',bank_branch_name:'',salary_per_month:'',bank_acc_number:'',username:'',password:'',in_time:'',
        out_time:'',email_username:'',email_password:'',incoming_mail_type:'IMAP',incoming_mail_server:'',
        incoming_mail_server_port:'',outgoing_mail_server:'',outgoing_mail_server_port:'',aadhar_card_photo:'',aadhar_number:'',
        election_card_photo:'',election_card_number:'',pan_card_photo:'',pan_card_number:'',passport_photo:'',passport_number:'',
        driving_license_photo:'',driving_license_number:'',is_approved:''
        });

        const [attachments,setAttachments] = useState({attach_photo : '',attach_signature : '',attach_aadhar_card_photo : '',
        attach_election_card_photo : '',attach_pan_card_photo : '',attach_passport_photo : '',attach_driving_license_photo : '',approve_status:'Pending'});

        const [inputList, setInputList]  = useState([{ degree: "", university: "", from_year: "", to_year:"",
          percentage_grade: "",specialization:"" }]);
        const [employmentList, setEmploymentList]  = useState([{ organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
          annual_ctc: ""}]);
        useEffect(() => {
         EmployeeData();
         fetchCountry();
         fetchStates();
        }, []);

        const EmployeeData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getEmployee/`+employee_id,{headers})
              .then(response => {
                setAttachments({
                 attach_photo:response.data.data.photo !== null ? response.data.data.photo : '',
                 attach_signature : response.data.data.signature !== null ? response.data.data.signature : '',
                 attach_aadhar_card_photo : response.data.data.document[0].aadhar_card_photo !== null ?
                 response.data.data.document[0].aadhar_card_photo : '',
                 attach_election_card_photo : response.data.data.document[0].election_card_photo !== null ?
                 response.data.data.document[0].election_card_photo : '',
                 attach_pan_card_photo : response.data.data.document[0].pan_card_photo !== null ?
                 response.data.data.document[0].pan_card_photo : '',
                 attach_passport_photo : response.data.data.document[0].passport_photo !== null ?
                 response.data.data.document[0].passport_photo : '',
                 attach_driving_license_photo : response.data.data.document[0].driving_license_photo !== null ?
                 response.data.data.document[0].driving_license_photo : '',
                 approve_status : response.data.data.is_approved
               })
                  setemployee(response.data.data);
                  if(Array.isArray(response.data.data.employment) && response.data.data.employment.length){
                    setEmploymentList(response.data.data.employment);
                  } else {
                    setEmploymentList([{ organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
                      annual_ctc: ""}]);
                  }

                  if(Array.isArray(response.data.data.education) && response.data.data.education.length){
                    setInputList(response.data.data.education);
                  } else {
                    setInputList([{ degree: "", university: "", from_year: "", to_year:"",
                      percentage_grade: "",specialization:"" }])
                  }

                  setemployee(prevState => ({ ...prevState,
                    //attachments
                    photo:'',
                    signature :'',
                   //Company Details
                   mst_companies_id:response.data.data.company.company_name,
                   reporting_authority_id: response.data.data.company.first_name+" "+response.data.data.company.last_name,
                   mst_departments_id:response.data.data.company.department_name,
                   mst_positions_id:response.data.data.company.position_title,
                   join_date:response.data.data.company.join_date,
                   resign_date:response.data.data.company.resign_date,
                   bank_name:response.data.data.company.bank_name,
                   bank_branch_name:response.data.data.company.bank_branch_name,
                   salary_per_month:response.data.data.company.salary_per_month,
                   username:response.data.data.company.username,
                   password:response.data.data.company.password,
                   in_time:response.data.data.company.in_time,
                   out_time:response.data.data.company.out_time,
                   bank_acc_number : response.data.data.company.bank_acc_number,
                   email_username:response.data.data.company.email_username,
                   email_password:response.data.data.company.email_password,
                   incoming_mail_type:response.data.data.company.incoming_mail_type,
                   incoming_mail_server:response.data.data.company.incoming_mail_server,
                   incoming_mail_server_port:response.data.data.company.incoming_mail_server_port,
                   outgoing_mail_server:response.data.data.company.outgoing_mail_server,
                   outgoing_mail_server_port:response.data.data.company.outgoing_mail_server_port,
                   //Documents Details
                   aadhar_card_photo: '',
                   aadhar_number: response.data.data.document[0].aadhar_number,
                   election_card_photo: '',
                   election_card_number: response.data.data.document[0].election_card_number,
                   pan_card_photo: '',
                   pan_card_number:response.data.data.document[0].pan_card_number,
                   passport_photo:'',
                   passport_number:response.data.data.document[0].passport_number,
                   driving_license_photo: '',
                   driving_license_number:response.data.data.document[0].driving_license_number,
                   //address details Permanent Address
                   homestreet: response.data.data.address[0].street1,
                   homestreet2: response.data.data.address[0].street2,
                   area: response.data.data.address[0].area,
                   city: response.data.data.address[0].city,
                   pincode: response.data.data.address[0].pincode,
                   state_id: response.data.data.address[0].state_name,
                   country_id: response.data.data.address[0].country_name,
                   email: response.data.data.address[0].email,
                   emergency_contact_name: response.data.data.address[0].emergency_contact_name,
                   //address details Correspondence Address
                   street: response.data.data.address[1].street1,
                   street2: response.data.data.address[1].street2,
                   area1: response.data.data.address[1].area,
                   city1: response.data.data.address[1].city,
                   pincode1: response.data.data.address[1].pincode,
                   corr_state_id: response.data.data.address[1].state_name,
                   corr_country_id: response.data.data.address[1].country_name,
                   website: response.data.data.address[1].website,
                   emergency_contact_number: response.data.data.address[1].emergency_contact_number,
                 }))
                  {setLoading1(false)}

              })
              .catch((error) => {
                console.log(error)
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

  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form method="POST">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">HR</li>
                    <li className="breadcrumb-item"><a href="/employee">Employee</a></li>
                    <li className="breadcrumb-item active">View Employee</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><a href="/employee" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>
                </ol>
            </div>

        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Personal Info</i>
                    </Alert></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-1">
                                                        <label>Title</label>
                                                        <input className="form-control" type="text" value={employee.title} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">First Name</label>
                                                        <input className="form-control" type="text" value={employee.first_name} placeholder="Enter First Name" id="example-text-input" name="first_name" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Middle Name</label>
                                                        <input className="form-control" type="text" value={employee.middle_name} placeholder="Enter Middle Name" id="example-text-input" name="middle_name" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Last Name</label>
                                                        <input className="form-control" type="text" value={employee.last_name} name="last_name" placeholder="Enter Last Name" readOnly/>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <label>Blood Group</label>
                                                        <input className="form-control" type="text" value={employee.blood_group} readOnly/>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <label>Gender</label>
                                                        <input className="form-control" type="text" value={employee.gender == "M" ? "Male" : "Female"} readOnly/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="required-field">Birth Date</label>
                                                        <input className="form-control" type="text" value={moment(employee.birth_date).format('MM-DD-YYYY')} readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Marital Status</label>
                                                        <input className="form-control" type="text" value={employee.marital_status} readOnly/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Photo</label>
                                                        {attachments.attach_photo !== '' ? <a href={employee_photo_sign+attachments.attach_photo}
                                                        style={{fontSize:'14px'}} className="btn btn-primary form-control btn-sm" target="_blank">
                                                        Click To Open Photo</a> :
                                                        <span className="btn btn-primary form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Photo</span>}
                                                    </div>

                                                   <div className="col-md-2">
                                                        <label>Machine Code</label>
                                                        <input className="form-control" type="text" value={employee.machine_code} name="machine_code" placeholder="Enter Machine Code" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Phone</label>
                                                        <input className="form-control" type="text" value={employee.phone} name="phone" placeholder="Enter Phone" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Mobile</label>
                                                        <input className="form-control" type="text" value={employee.mobile} name="mobile" placeholder="Enter Mobile" readOnly/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" value={employee.notes} placeholder="Enter Notes" readOnly></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Attendance</label>
                                                        <input className="form-control" type="text" value={employee.attendance == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Signature</label>
                                                        {attachments.attach_signature !== '' ?
                                                            <a href={employee_photo_sign+attachments.attach_signature} style={{fontSize:'14px'}} className="btn btn-dark form-control btn-sm" target="_blank">Click To Open Signature</a>
                                                        : <span class="btn btn-dark form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Signature</span>}

                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Action</label>
                                                        <input className="form-control" type="text" value={employee.booking_action == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking SMS</label>
                                                        <input className="form-control" type="text" value={employee.booking_sms == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Email</label>
                                                        <input className="form-control" type="text" value={employee.booking_email == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Booking Copy</label>
                                                        <input className="form-control" type="text" value={employee.booking_copy == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Nationality</label>
                                                        <input className="form-control" value={employee.nationality} type="text" name="nationality" placeholder="Nationality" readOnly/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Religion</label>
                                                        <input className="form-control" value={employee.religion} type="text" name="religion" placeholder="Religion" readOnly/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Caste</label>
                                                        <input className="form-control" value={employee.caste} type="text" name="caste" placeholder="Caste" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        <input className="form-control" type="text" value={employee.is_reporting_authority == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Deposit</label>
                                                        <input className="form-control" type="text" value={employee.deposit == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Rate</label>
                                                        <input className="form-control" type="text" value={employee.booking_rate == "1" ? "Yes" : "No"} readOnly/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                    <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Contact Info</i>
                    </Alert></h5>

                    <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                     <div className="col-md-6">
                                                        <h5 className="alert alert-info"><i className="fa fa-home">&nbsp;Permanent Address</i></h5>
                                                         <div className="form-group">
                                                             <div className="row">
                                                                <div className="col-md-6">
                                                                    <label className="required-field">Home Street</label>
                                                                    <input className="form-control" type="text" value={employee.homestreet} name="homestreet" placeholder="Enter Homestreet" readOnly/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" value={employee.area} name="area" placeholder="Enter Area" readOnly/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" value={employee.pincode} name="pincode" placeholder="Enter Pincode" readOnly/><br/>
                                                                    <label className="required-field">Country</label>
                                                                    <input className="form-control" type="text" value={employee.country_id} readOnly/>
                                                                    <br/>
                                                                    <label className="required-field">Emergency Contact Name</label>
                                                                    <input className="form-control" type="text" value={employee.emergency_contact_name} name="emergency_contact_name" placeholder="Enter Emergency Contact Name" readOnly/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="required-field">Home Street2</label>
                                                                    <input className="form-control" type="text" value={employee.homestreet2} name="homestreet2" placeholder="Enter Home Street2" readOnly/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" value={employee.city} name="city" placeholder="Enter City" readOnly/><br/>
                                                                    <label className="required-field">State</label>
                                                                    <input className="form-control" type="text" value={employee.state_id} readOnly/><br/>
                                                                    <label>Email</label>
                                                                    <input className="form-control" type="email" value={employee.email} name="email" placeholder="Enter Email" readOnly/>
                                                                </div>
                                                              </div>
                                                         </div>

                                                     </div>
                                                     <div className="col-md-6">
                                                        <h5 className="alert alert-info"><i className="fa fa-address-book">&nbsp;Correspondence Address</i></h5>
                                                        <div className="form-group">
                                                             <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Street</label>
                                                                    <input className="form-control" type="text" value={employee.street} name="street" placeholder="Enter Street" readOnly/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" value={employee.area1} name="area1" placeholder="Enter Area" readOnly/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" value={employee.pincode1} name="pincode1" placeholder="Enter Pincode" readOnly/><br/>
                                                                    <label>Country</label>
                                                                    <input className="form-control" type="text" value={employee.corr_country_id} readOnly/><br/>
                                                                    <label className="required-field">Emergency Contact Number</label>
                                                                    <input className="form-control" type="text" value={employee.emergency_contact_number} name="emergency_contact_number" placeholder="Enter Emergency Contact Number" readOnly/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" value={employee.street2} name="street2" placeholder="Enter Street2" readOnly/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" value={employee.city1} name="city1" placeholder="Enter City" readOnly/><br/>
                                                                    <label>State</label>
                                                                    <input className="form-control" type="text" value={employee.corr_state_id} readOnly/>
                                                                    <br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" value={employee.website} name="website" placeholder="Enter Website" readOnly/>
                                                                </div>
                                                              </div>
                                                         </div>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>

                    <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Educational Details</i>
                    </Alert></h5>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="table-responsive">
                            <Table className="table mb-0 border">
                                <thead className="table-light">
                                    <tr>
                                        <th>Degree</th>
                                        <th>University/ Institute</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Percentage/Grade</th>
                                        <th>Specialization</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {inputList.map((x, i) => (
                                  <React.Fragment key={x}>
                                  <tr>
                                    <td><input className="form-control" placeholder="Enter The Degree" type="text" name="degree" value={x.degree} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter University Name" type="text" name="university" value={x.university} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Education From Year" type="text" name="from_year" value={x.from_year} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Education To Year" type="text"  name="to_year" value={x.to_year} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Percentage Grade" type="text"  name="percentage_grade" value={x.percentage_grade} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Specialization" type="text"  name="specialization" value={x.specialization} readOnly/></td>
                                  </tr>
                                  </React.Fragment>
                                                  ))}
                                </tbody>
                              </Table>
                          </div>
                        </div>
                      </div>
                    </div>

                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Employment Details</i>
                    </Alert></h5>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="table-responsive">
                            <Table className="table mb-0 border text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th>Organisation</th>
                                        <th>Designation</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Annual CTC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {employmentList.map((x, i) => (
                                  <React.Fragment key={x}>
                                  <tr>
                                    <td><input className="form-control" placeholder= "Enter Name of Organisation" type="text" name="organisation" value={x.organisation} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Designation" type="text" name="designation" value={x.designation} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Employment From Year" type="text" name="emp_from_year" value={x.emp_from_year} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Employment To Year" type="text"  name="emp_to_year" value={x.emp_to_year} readOnly/></td>
                                    <td><input className="form-control" placeholder="Enter Annual CTC" type="text"  name="annual_ctc" value={x.annual_ctc} readOnly/></td>
                                  </tr>
                                  </React.Fragment>
                                                  ))}
                                </tbody>
                              </Table>
                          </div>
                        </div>
                      </div>
                    </div>


                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Comapny Info</i>
                                        </Alert></h5>
                                          <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label className="required-field">Comapny</label>
                                                        <input className="form-control" type="text" value={employee.mst_companies_id} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        <input className="form-control" type="text" value={employee.reporting_authority_id} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Join Date</label>
                                                        <input className="form-control" value={employee.join_date} type="date"  id="example-date-input" name="join_date" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Resign Date</label>
                                                        <input className="form-control" value={employee.resign_date} type="date"  id="example-date-input" name="resign_date" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank Name</label>
                                                        <input className="form-control" type="text" value={employee.bank_name} name="bank_name" placeholder="Enter Bank Name" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank Branch Name</label>
                                                        <input className="form-control" value={employee.bank_branch_name} type="text" name="bank_branch_name" placeholder="Enter Bank Branch" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Salary Per Month</label>
                                                        <input className="form-control" value={employee.salary_per_month} type="text" name="salary_per_month" placeholder="Salary Per Month" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank A/C No</label>
                                                        <input className="form-control" value={employee.bank_acc_number} type="text" name="bank_acc_number" placeholder="Bank Account No" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Department Name</label>
                                                        <input className="form-control" type="text" value={employee.mst_departments_id} readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Position</label>
                                                       <input className="form-control" type="text" value={employee.mst_positions_id} readOnly/>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="required-field">Username</label>
                                                        <input className="form-control" value={employee.username} placeholder="Enter Username" type="text" name="username" id="username" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Password</label>
                                                        <input className="form-control" value={employee.password} placeholder="Enter Password" type="password" name="password" id="password" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>In Time</label>
                                                        <input className="form-control" value={employee.in_time} type="time" name="in_time" id="example-time-input" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Out Time</label>
                                                        <input className="form-control" type="time" value={employee.out_time} name="out_time" id="example-time-input" readOnly/>
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label>Email Username</label>
                                                        <input className="form-control" value={employee.email_username} placeholder="Enter Email Username" type="text" name="email_username" readOnly/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Email Password</label>
                                                        <input className="form-control" value={employee.email_password} placeholder="Enter Email Password" type="password" name="email_password" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Incoming Mail Type</label>
                                                        <input className="form-control" type="text" value={employee.incoming_mail_type} readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Incoming Mail Server</label>
                                                        <input className="form-control" placeholder="Enter Incoming Mail Server" type="text" value={employee.incoming_mail_server} name="incoming_mail_server" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Incoming Mail Server Port</label>
                                                        <input className="form-control" value={employee.incoming_mail_server_port} placeholder="Enter Incoming Mail Server Port" type="text" name="incoming_mail_server_port" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Outgoing Mail Server</label>
                                                        <input className="form-control" value={employee.outgoing_mail_server} placeholder="Enter Outgoing Mail Server" type="text" name="outgoing_mail_server" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Outgoing Mail Server Port</label>
                                                        <input className="form-control" value={employee.outgoing_mail_server_port} placeholder="Enter Outgoing Mail Server Port" type="text" name="outgoing_mail_server_port" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Employee Document's No And Upload</i>
                                        </Alert></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Aadhar Card</label>
                                                        {attachments.attach_aadhar_card_photo !== '' ?
                                                            <a href={employee_document_path+attachments.attach_aadhar_card_photo} style={{fontSize:'14px'}}
                                                             className="btn btn-info form-control btn-sm" target="_blank">Click To Open Aadhar Card</a>
                                                        : <span className="btn btn-info form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Aadhar Card</span>}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Aadhar Card No</label>
                                                        <input className="form-control" type="text"  value={employee.aadhar_number} name="aadhar_number" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Election Card</label>
                                                        {attachments.attach_election_card_photo !== '' ?
                                                            <a href={employee_document_path+attachments.attach_election_card_photo} style={{fontSize:'14px'}} className="btn btn-danger form-control btn-sm" target="_blank">Click To Open Election Card</a>
                                                        : <span className="btn btn-info form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Election Card</span>}
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Election Card No</label>
                                                        <input className="form-control" type="text"  value={employee.election_card_number} name="election_card_number" readOnly/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Pan Card Scan Copy</label>
                                                        {attachments.attach_pan_card_photo !== '' ?
                                                            <a href={employee_document_path+attachments.attach_pan_card_photo} style={{fontSize:'14px'}} className="btn btn-primary form-control btn-sm" target="_blank">Click To Open PanCard</a>
                                                        : <span className="btn btn-primary form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Pan Card</span>}
                                                    </div>

                                                     <div className="col-md-3">
                                                        <label>Pan Card No</label>
                                                        <input className="form-control" type="text"  value={employee.pan_card_number} name="pan_card_number" readOnly/>
                                                    </div>

                                                      <div className="col-md-3">
                                                        <label>Passport Scan Copy</label>
                                                        {attachments.attach_passport_photo !== '' ?
                                                            <a href={employee_document_path+attachments.attach_passport_photo} style={{fontSize:'14px'}} className="btn btn-success form-control btn-sm" target="_blank">Click To Open Passport Copy</a>
                                                        : <span className="btn btn-success form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Passport</span>}
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Passport No</label>
                                                        <input className="form-control" type="text" value={employee.passport_number} name="passport_number" readOnly/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <label>Driving Liecense Copy</label>
                                                        {attachments.attach_driving_license_photo !== '' ?
                                                            <a href={employee_document_path+attachments.attach_driving_license_photo} style={{fontSize:'14px'}} className="btn btn-warning form-control btn-sm" target="_blank">Click To Open Driving Licence</a>
                                                        : <span className="btn btn-warning form-control btn-sm" style={{fontSize:'14px',width:'100%'}}>No Driving Licence</span>}
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Driving Licence No</label>
                                                        <input className="form-control" type="text"  value={employee.driving_license_number} name="driving_license_number" readOnly/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
         </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ViewEmployee
