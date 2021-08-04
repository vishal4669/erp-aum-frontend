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
import 'toastr/build/toastr.min.css';
import $ from 'jquery'; 
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function ViewEmployee (props) {
  const [customchk, setcustomchk] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
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

        const [employee, setemployee] = useState({ title: 'Mr.',first_name: '',middle_name: '',last_name: '',username_email: '',password: '',
        blood_group: 'None',gender: 'M',birth_date: '',marital_status:'Single',photo: '',machine_code: '',phone: '',mobile: '',
        notes: '',attendance:'1',signature:'',booking_action:'0',booking_sms:'0',booking_email:'0',is_resigned:'0',booking_copy: '0',nationality:'',
        religion: '',caste: '',is_reporting_authority:'0', deposit: '0',booking_rate: '0',
        aadhar_card_photo:'',aadhar_number:'',
        election_card_photo:'',election_card_number:'',pan_card_photo:'',pan_card_number:'',passport_photo:'',passport_number:'',
        driving_license_photo:'',driving_license_number:''
        });  

        const [address1, setemployeeaddress1] = useState({homestreet: '', area: '',pincode:'',country_id:'',
            emergency_contact_name:''});  

        const [address2, setemployeeaddress2] = useState({homestreet2: '',city: '',state_id:'',email: '',street:'',
        area1:'',pincode1:'',corr_country_id:'',emergency_contact_number:'',street2:'',city1:'',corr_state_id:'',website:''
        });  

        const [inputList, setInputList]  = useState([{ degree: "", university: "", from_year: "", to_year:"", 
          percentage_grade: "",specialization:"" }]);
        const [employmentList, setEmploymentList]  = useState([{ organisation: "", designation: "", emp_from_year: "", emp_to_year:"", 
          annual_ctc: ""}]);

       const [employmeeCompanyDetails, setEmploymeeCompanyDetails]  = useState([{  mst_companies_id:'',reporting_authority_id: '',mst_departments_id:'',mst_positions_id:'',join_date:'',resign_date:'',
        bank_name:'',bank_branch_name:'',salary_per_month:'',bank_acc_number:''}]);

        useEffect(() => { 
         EmployeeData(); 
         fetchCountry();
         fetchStates();
         fetchCompany();
         fetchPosition();
         fetchDepartment();
         fetchReportingAuthority();
        }, []);

        const EmployeeData=()=>{ 
        {setLoading1(true)} 
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getEmployee/`+employee_id,{headers})  
              .then(response => {  
                console.log(response.data.data.company[0])
                  setemployee(response.data.data);
                  setemployeeaddress1(response.data.data.address[0]);  // setting Permenant address 
                  setemployeeaddress2(response.data.data.address[1]);
                  setInputList(response.data.data.education);
                  setEmploymentList(response.data.data.employment);  // setting Correspondence address 
                  setEmploymeeCompanyDetails(response.data.data.company[0]); 
                  {setLoading1(false)}   
      
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

        const fetchCompany = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listCompany?is_dropdown=1`,{headers})
            .then(response => {
                     setData2(response.data.data);
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

        const fetchReportingAuthority = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee?is_reporting_authority=1`,{headers})
            .then(response => {
                     setData5(response.data.data);
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
        <Form>
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">HR</li>
                    <li className="breadcrumb-item"><a href="/employee">Employee</a></li>
                    <li className="breadcrumb-item active">Add Employee</li>
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
                                                        <input type="text" value={employee.title} className="form-control" readOnly/>
                                                    </div> 

                                                    <div className="col-md-2">
                                                        <label>First Name</label>
                                                        <input className="form-control" type="text" value={employee.first_name} placeholder="Enter First Name" id="example-text-input" name="first_name" readOnly/>
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Middle Name</label>
                                                        <input className="form-control" type="text" value={employee.middle_name} placeholder="Enter Middle Name" id="example-text-input" name="middle_name" readOnly />
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Last Name</label>
                                                        <input className="form-control" type="text" value={employee.last_name} name="last_name" placeholder="Enter Last Name" readOnly/>
                                                    </div>  
                                                    <div className="col-md-1">  
                                                        <label>Blood Group</label>
                                                        <input type="text" value={employee.blood_group} className="form-control" readOnly/>
                                                    </div> 
                                                    <div className="col-md-1">  
                                                        <label>Gender</label>
                                                        <select className="form-select" value={employee.gender} name="gender" disabled>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>
                                                           
                                                        </select>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Birth Date</label>
                                                        <input className="form-control" type="text"  value={employee.birth_date.split('-').reverse().join('-')} id="example-date-input" name="birth_date" readOnly/>
                                                    </div>      
                                                </div>  
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">  
                                                        <label>Marital Status</label>
                                                        <select className="form-select" value={employee.marital_status} name="marital_status" >
                                                            <option value="Single">Single</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Seperated">Seperated</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                        </select>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Photo</label>
                                                        <input className="form-control" type="file"  name="photo" />
                                                    </div>      

                                                   <div className="col-md-2">
                                                        <label>Machine Code</label>
                                                        <input className="form-control" type="text" value={employee.machine_code} name="machine_code" placeholder="Enter Machine Code" />
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Phone</label>
                                                        <input className="form-control" type="text" value={employee.phone} name="phone" placeholder="Enter Phone" />
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Mobile</label>
                                                        <input className="form-control" type="text" value={employee.mobile} name="mobile" placeholder="Enter Mobile" />
                                                    </div>  

                                                </div>  
                                            </div>  
                                        </div> 

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Email(Username)</label>
                                                        <input className="form-control" type="email" value={employee.username} name="username_email" placeholder="example@gmail.com" />
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Password</label>
                                                        <input className="form-control" type="password" value={employee.password} name="password" placeholder="Enter Password" />
                                                    </div> 

                                                    <div className="col-md-6">  
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" value={employee.notes} placeholder="Enter Notes" ></textarea>
                                                    </div>   

                                                </div>  
                                            </div>
                                        </div>
                                       
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">  
                                                        <label>Attendance</label>
                                                        <select className="form-select" value={employee.attendance} name="attendance" >
                                                            <option value="1">Yes</option>
                                                            <option value="0">No</option>
                                                        </select>
                                                    </div> 

                                                    <div className="col-md-3">  
                                                        <label>Signature</label>
                                                        <input className="form-control" type="file"  name="signature" />
                                                    </div>  
                                                    
                                                    <div className="col-md-2">  
                                                        <label>Booking Action</label>
                                                        <select className="form-select" value={employee.booking_action} name="booking_action" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Booking SMS</label>
                                                        <select className="form-select" value={employee.booking_sms} name="booking_sms" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Booking Email</label>
                                                        <select className="form-select" value={employee.booking_email} name="booking_email" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-1">  
                                                        <label>Resigned</label>
                                                        <select className="form-select" value={employee.is_resigned} name="is_resigned" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                </div>  
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">  
                                                        <label>Booking Copy</label>
                                                        <select className="form-select" value={employee.booking_copy} name="booking_copy" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div> 

                                                    <div className="col-md-2">
                                                        <label>Nationality</label>
                                                        <input className="form-control" value={employee.nationality} type="text" name="nationality" placeholder="Nationality" />
                                                    </div> 

                                                    <div className="col-md-1">
                                                        <label>Religion</label>
                                                        <input className="form-control" value={employee.religion} type="text" name="religion" placeholder="Religion" />
                                                    </div> 

                                                    <div className="col-md-1">
                                                        <label>Caste</label>
                                                        <input className="form-control" value={employee.caste} type="text" name="caste" placeholder="Caste" />
                                                    </div>

                                                    <div className="col-md-2">  
                                                        <label>Reporting Authority</label>
                                                        <select className="form-select" value={employee.is_reporting_authority} name="is_reporting_authority" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Deposit</label>
                                                        <select className="form-select" value={employee.deposit} name="deposit" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Booking Rate</label>
                                                        <select className="form-select" value={employee.booking_rate} name="booking_rate" >
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
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
                                                                    <label>Home Street</label>
                                                                    <input className="form-control" type="text" value={address1.street1} name="homestreet" placeholder="Enter Homestreet" /><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" value={address1.area} name="area" placeholder="Enter Area" /><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" value={address1.pincode} name="pincode" placeholder="Enter Pincode" /><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={address1.mst_countries_id} id="country_id" name="country_id"  >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Emergency Contact Name</label>
                                                                    <input className="form-control" type="text" value={address1.emergency_contact_name} name="emergency_contact_name" placeholder="Enter Emergency Contact Name" />
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input className="form-control" type="text" value={address1.street2} name="homestreet2" placeholder="Enter Home Street2" /><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" value={address1.city} name="city" placeholder="Enter City" /><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={address1.mst_states_id} id="state_id" name="state_id"  >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Email</label>
                                                                    <input className="form-control" type="email" value={address1.email} name="email" placeholder="Enter Email" />
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
                                                                    <input className="form-control" type="text" value={address2.street1} name="street" placeholder="Enter Street" /><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" value={address2.area} name="area1" placeholder="Enter Area" /><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" value={address2.pincode} name="pincode1" placeholder="Enter Pincode" /><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={address2.mst_countries_id} id="corr_country_id" name="corr_country_id"  >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Emergency Contact Number</label>
                                                                    <input className="form-control" type="text" value={address2.emergency_contact_number} name="emergency_contact_number" placeholder="Enter Emergency Contact Number" />
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" value={address2.street2} name="street2" placeholder="Enter Street2" /><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" value={address2.city} name="city1" placeholder="Enter City" /><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={address2.mst_states_id} id="corr_state_id" name="corr_state_id"  >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" value={address2.website} name="website" placeholder="Enter Website" />
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
            {inputList.map((x, i) => (
                <React.Fragment key={x}>
                            <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Degree</label>
                                                        <input className="form-control" type="text" name="degree" value={x.degree}/>

                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>University/ Institute</label>
                                                        <input className="form-control" type="text" name="university" value={x.university}/>
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>From</label>
                                                        <input className="form-control" type="text" name="from_year" value={x.from_year}/>
                                                    </div>  
                                                    <div className="col-md-1">  
                                                        <label>To</label>
                                                        <input className="form-control" type="text"  name="to_year" value={x.to_year}/>
                                                    </div>  

                                                    <div className="col-md-2">  
                                                        <label>Percentage/Grade</label>
                                                        <input className="form-control" type="text"  name="percentage_grade" value={x.percentage_grade}/>
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Specialization</label>
                                                        <input className="form-control" type="text"  name="specialization" value={x.specialization}/>
                                                    </div>   
                        </div>
                    </div>

                </div> 


    </React.Fragment>
                    ))}



                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Employment Details</i>
                    </Alert></h5>                            
              {employmentList.map((x, i) => (
                <React.Fragment key={x}>
                            <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                <div className="col-md-3">
                                                        <label>Organisation</label>
                                                        <input className="form-control" type="text" name="organisation" value={x.organisation} />
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Designation</label>
                                                        <input className="form-control" type="text" name="designation" value={x.designation} />
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>From</label>
                                                        <input className="form-control" type="text" name="emp_from_year" value={x.emp_from_year} />
                                                    </div>  
                                                    <div className="col-md-2">  
                                                        <label>To</label>
                                                        <input className="form-control" type="text"  name="emp_to_year" value={x.emp_to_year} />
                                                    </div>  

                                                    <div className="col-md-2">  
                                                        <label>Annual CTC</label>
                                                        <input className="form-control" type="text"  name="annual_ctc" value={x.annual_ctc} />
                                                    </div> 
                        </div>
                    </div>
        </div>
    </React.Fragment>
                    ))}


                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Comapny Info</i>
                                        </Alert></h5>
                                          <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Comapny</label>
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={employmeeCompanyDetails.mst_companies_id} id="mst_companies_id" name="mst_companies_id" >
                                                             <option value="">Select Company</option>
                                                            { data2.map((option, key) => <option value={option.id} key={key} >{option.company_name}</option>) }
                                                        </select> } 

                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={employmeeCompanyDetails.reporting_authority_id} id="reporting_authority_id" name="reporting_authority_id" >
                                                                    <option value="">Reporting Auhtority</option>
                                                                    { data5.map((option, key) => <option value={option.id} key={key} >{option.first_name}</option>) }</select> }
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Join Date</label>
                                                        <input className="form-control" value={employmeeCompanyDetails.join_date} type="date"  id="example-date-input" name="join_date" />
                                                    </div> 

                                                    <div className="col-md-2">  
                                                        <label>Resign Date</label>
                                                        <input className="form-control" value={employmeeCompanyDetails.resign_date} type="date"  id="example-date-input" name="resign_date" />
                                                    </div>          

                                                    <div className="col-md-2">
                                                        <label>Bank Name</label>
                                                        <input className="form-control" type="text" value={employmeeCompanyDetails.bank_name} name="bank_name" placeholder="Enter Bank Name" />
                                                    </div> 

                                                    <div className="col-md-2">
                                                        <label>Bank Branch Name</label>
                                                        <input className="form-control" value={employmeeCompanyDetails.bank_branch_name} type="text" name="bank_branch_name" placeholder="Enter Bank Branch" />
                                                    </div>  
                                                </div>  
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Salary Per Month</label>
                                                        <input className="form-control" value={employmeeCompanyDetails.salary_per_month} type="text" name="salary_per_month" placeholder="Salary Per Month" />
                                                    </div> 

                                                    <div className="col-md-3">
                                                        <label>Bank A/C No</label>
                                                        <input className="form-control" value={employmeeCompanyDetails.bank_acc_number} type="text" name="bank_acc_number" placeholder="Bank Account No" />
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Department Name</label>
                                                        {loading1 ? <LoadingSpinner /> :  
                                                          <select className="form-select" value={employmeeCompanyDetails.mst_departments_id} id="mst_departments_id" name="mst_departments_id" >
                                                             <option value="">Select Department</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select> } 
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Position</label>
                                                       {loading1 ? <LoadingSpinner /> :  
                                                        <select className="form-select" value={employmeeCompanyDetails.mst_positions_id} id="mst_positions_id" name="mst_positions_id" >
                                                             <option value="">Select Position</option>
                                                            { data3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>) }
                                                         </select> } 
                                                    </div> 
                                                </div>  
                                            </div>
                                        </div>

                                        {/*<div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>In Time</label>
                                                        <input className="form-control" type="time" name="in_time" id="example-time-input"/>
                                                    </div> 

                                                    <div className="col-md-2">
                                                        <label>Out Time</label>
                                                        <input className="form-control" type="time" name="out_time" id="example-time-input"/>
                                                    </div> 


                                                    <div className="col-md-4">
                                                        <label>Email Username</label>
                                                        <input className="form-control" type="text" name="email_username"/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Email Password</label>
                                                        <input className="form-control" type="password" name="email_password"/>
                                                    </div>        
                                                </div>  
                                            </div>
                                        </div>*/}

                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Employee Document's No And Upload</i>
                                        </Alert></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">  
                                                        <label>Aadhar Card</label>

                                                        <input name="aadhar_card_photo" type="file" className="form-control" />
                                                               
                                                    </div> 
                                                    <div className="col-md-3">  
                                                        <label>Aadhar Card No</label>
                                                        <input className="form-control" type="text"  name="aadhar_number" />
                                                    </div>  

                                                    <div className="col-md-3">  
                                                        <label>Election Card</label>

                                                        <input name="election_card_photo" type="file" className="form-control" />
                                                               
                                                    </div>

                                                    <div className="col-md-3">  
                                                        <label>Election Card No</label>
                                                        <input className="form-control" type="text"  name="election_card_number" />
                                                    </div>  
                                                    
                                                </div>  
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">  
                                                        <label>Pan Card Scan Copy</label>

                                                        <input name="pan_card_photo" type="file" className="form-control" />
                                                               
                                                    </div>

                                                     <div className="col-md-3">  
                                                        <label>Pan Card No</label>
                                                        <input className="form-control" type="text"  name="pan_card_number" />
                                                    </div> 

                                                      <div className="col-md-3">  
                                                        <label>Passport Scan Copy</label>

                                                        <input name="passport_photo" type="file" className="form-control" />
                                                               
                                                    </div>

                                                    <div className="col-md-3">  
                                                        <label>Passport No</label>
                                                        <input className="form-control" type="text"  name="passport_number" />
                                                    </div>   

                                                </div>  
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-6">  
                                                        <label>Driving Liecense Copy</label>

                                                        <input name="driving_license_photo" type="file" className="form-control" />
                                                               
                                                    </div>

                                                    <div className="col-md-6">  
                                                        <label>Driving Licence No</label>
                                                        <input className="form-control" type="text"  name="driving_license_number" />
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
