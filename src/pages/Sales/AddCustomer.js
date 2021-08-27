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
import Dropzone from "react-dropzone"

function AddCustomer(props) { 

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]); 
  const [data2, setData2] = useState([]); 
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);  
  const [selectedFiles, setselectedFiles] = useState([])
  const [customer, setCustomer] = useState({ company_name: '', gst_no: '',contact_person_name:'',tally_alias_name:'',
  username:'',password:'',birth_date:'',contact_type:'Customer',priority:'',notes:'',active_inactive:'1',logo:'',
  homestreet:'',homestreet2:'',area:'',city:'',pincode:'',state_id:'',country_id:'',landline:'',admin_contact:'',
  qc_contact:'',admin_email:'',pancard_no:'',street:'',street2:'',area1:'',city1:'',pincode1:'',corr_state_id:'',
  corr_country_id:'',website:'',qa_contact:'',qc_email:'',qa_email:'',pancard_copy:'',education_details:'',prev_details:'',
  vat_no:'',tin_no:'',service_tax_no:'',cst_no:'',customer_discount:''});  
  const [inputList, setInputList]  = useState([{ contact_person_name: "", contact_person_mobile: "", 
    contact_person_email: "", mst_departments_id:"", mst_positions_id: ""}]);
    function handleAcceptedFiles(files) {
    setselectedFiles(files)
  }
useEffect(() => {  
         fetchCountry();
         fetchStates();
         fetchPosition();
         fetchDepartment();
        }, []); 

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


const InsertCustomer = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = { category_name:customer.category_name, parent_category_id: customer.parent_category_id}; 
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addCustomer`, data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/category');
                        toastr.success(response.data.message);
                        {setLoading(false)}; 
                    }else{
                        props.history.push('/add-category');
                        toastr.error(response.data.message);
                        {setLoading(false)};   
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })
     
      }


const ResetCustomer = () => { 
  document.getElementById("AddCustomer").reset();
}

  const onChange = (e) => {  
    e.persist();  
    setCustomer({...customer, [e.target.name]: e.target.value});  
  } 

  // handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { contact_person_name: "", contact_person_mobile: "", 
    contact_person_email: "", mst_departments_id:"", mst_positions_id: ""}]);
};

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};
 
// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form onSubmit={InsertCustomer} method="POST" id="AddCustomer">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Sales</li>
                                            <li className="breadcrumb-item"><a href="view_customer_list.php">Customers</a></li>
                                            <li className="breadcrumb-item active">Add Customers</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="view_customer_list.php" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            <li><button type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                                            &nbsp;
                                            <li><a href="#" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Save</i></a></li>
                                            
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                         <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
        
                                        <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Personal Info</i></h5>

                                         <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Company Name</label>
                                                        <input className="form-control" type="text" placeholder="Enter Company Name" id="example-text-input" name="company_name"/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>GST No</label>
                                                        <input className="form-control" type="text" placeholder="Enter GST No" id="example-text-input" name="gst_no"/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Contact Person Name</label>
                                                        <input className="form-control" type="text" name="contact_person_name" placeholder="Enter Contact Person Name"/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Tally Alias Name</label>
                                                        <input className="form-control" type="text"  name="tally_alias_name" placeholder="Enter Tally Alias Name"/>
                                                    </div>      
                                                </div>  
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Username</label>
                                                        <input className="form-control" type="text" name="username" placeholder="Enter Username"/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Password</label>
                                                        <input className="form-control" type="password"  name="password" placeholder="Enter Password"/>
                                                    </div>      

                                                    <div className="col-md-3">  
                                                        <label>Birth Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" name="birth_date"/>
                                                    </div>    

                                                    <div className="col-md-3">  
                                                        <label>Contact Type</label>
                                                        <select className="form-select" name="contact_type">
                                                            <option value="Customer">Customer</option>
                                                            <option value="Supplier">Supplier</option>
                                                            <option value="Service Provider">Service Provider</option>
                                                            <option value="Other">Other</option>
                                                            <option value="Ledger">Ledger</option>
                                                        </select>
                                                    </div>  
                                                </div>  
                                            </div>  
                                        </div>    

                                       
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">  
                                                        <label>Priority</label>
                                                        <select className="form-select" name="priority">
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>
                                                          
                                                        </select>
                                                    </div>  

                                                    <div className="col-md-4">  
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" placeholder="Enter Notes"></textarea>
                                                    </div>   

                                                    
                                                     <div className="col-md-4">  
                                                        <label>Active/Inactive</label>
                                                        <select className="form-select" name="status">
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
                                                    <div className="col-md-12">  
                                                        <label>Logo</label>
                                                        <Dropzone
                                                          onDrop={acceptedFiles => {
                                                            handleAcceptedFiles(acceptedFiles)
                                                          }}
                                                        >
                                                          {({ getRootProps, getInputProps }) => (
                                                            <div className="dropzone">
                                                              <div
                                                                className="dz-message needsclick"
                                                                {...getRootProps()}
                                                              >
                                                                <input {...getInputProps()} name="logo"/>
                                                                <div className="mb-3">
                                                                  <i className="display-4 text-muted uil uil-cloud-upload"/>
                                                                </div>
                                                                <h4>Drop files here or click to upload.</h4>
                                                              </div>
                                                            </div>
                                                          )}
                                                        </Dropzone>
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
                                                                    <input className="form-control" type="text" name="homestreet" placeholder="Enter Homestreet"/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area" placeholder="Enter Area"/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode" placeholder="Enter Pincode"/><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="country_id" name="country_id" onChange={ onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Account/Admin Contact No</label>
                                                                    <input className="form-control" type="text" name="admin_contact" placeholder="Enter Account/Admin Contact No"/><br/>
                                                                    <label>Account/Admin E-mail</label>
                                                                    <input className="form-control" type="text" name="admin_email" placeholder="Enter Account/Admin E-mail"/>
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input className="form-control" type="text" name="homestreet2" placeholder="Enter Home Street2"/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city" placeholder="Enter City"/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="state_id" name="state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>LandLine</label>
                                                                    <input className="form-control" type="text" name="landline" placeholder="Enter Landline"/><br/>
                                                                    <label>QC Contact No</label>
                                                                    <input className="form-control" type="text" name="qc_contact" placeholder="Enter QC Contact No"/><br/>
                                                                    <label>Pancard No</label>
                                                                    <input className="form-control" type="text" name="pancard_no" placeholder="Enter Pancard No"/>
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
                                                                    <input className="form-control" type="text" name="street" placeholder="Enter Street"/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area1" placeholder="Enter Area"/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode1" placeholder="Enter Pincode"/><br/>
                                                                    <label>Country</label>
                                                                   {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_country_id" name="corr_country_id" onChange={ onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>QA Contact No</label>
                                                                    <input className="form-control" type="text" name="qa_contact" placeholder="Enter QA Contact No"/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input className="form-control" type="text" name="qa_email" placeholder="Enter QA E-mail"/>
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" name="street2" placeholder="Enter Street2"/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city1" placeholder="Enter City"/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_state_id" name="corr_state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" name="website" placeholder="Enter Website"/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input className="form-control" type="text" name="qc_email" placeholder="Enter QC E-mail"/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    <input className="form-control" type="file" name="pancard_copy"/>
                                                                </div>
                                                              </div>
                                                         </div> 
                                                     </div>   
                                                </div>
                                            </div> 
                                        </div>
                                         <div className="mb-3 row">
                                          
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <button name="copy_details" type="button" className="btn btn-primary form-control">Copy Details</button>
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
                                                        <textarea name="education_details" className="form-control" placeholder="Enter Education Details"></textarea>
                                                    </div>   
                                                    
                                                    <div className="col-md-6">  
                                                        <label>Prev. Details</label>
                                                        <textarea name="prev_details" className="form-control" placeholder="Enter Previous Details"></textarea>
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
                                                            <input className="form-control" type="text" placeholder="Enter VAT No" name="vat_no"/>
                                                        </div>  */}

                                                        <div className="col-md-4">
                                                            <label>TIN No</label>
                                                            <input className="form-control" type="text" placeholder="Enter TIN No" name="tin_no"/>
                                                        </div>  

                                                        <div className="col-md-4">
                                                            <label>Service Tax No</label>
                                                            <input className="form-control" type="text" name="service_tax_no" placeholder="Enter Service Tax No"/>
                                                        </div>  
                                                        {/*<div className="col-md-2">  
                                                            <label>CST No</label>
                                                            <input className="form-control" type="text"  name="cst_no" placeholder="Enter CST No"/>
                                                        </div> */}

                                                        <div className="col-md-4">  
                                                            <label>Customer Discount</label>
                                                            <input className="form-control" type="text"  name="customer_discount" placeholder="Enter Customer Discount"/>
                                                        </div>        
                                                    </div>  
                                                </div>
                                              </div>
                                        
                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Contact Person</i></h5>
                                        {inputList.map((x, i) => (
                                         <React.Fragment key={x}>
                                            <div className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label>Name</label>
                                                            <input className="form-control" type="text" placeholder="Enter Name" name="contact_person_name"/>
                                                        </div>  

                                                        <div className="col-md-2">
                                                            <label>Mobile</label>
                                                            <input className="form-control" type="text" placeholder="Enter Mobile" name="contact_person_mobile"/>
                                                        </div>  

                                                        <div className="col-md-3">
                                                            <label>E-mail</label>
                                                            <input className="form-control" type="text" name="contact_person_email" placeholder="Enter E-mail"/>
                                                        </div>  
                                                        <div className="col-md-2">  
                                                            <label>Department</label>
                                                            {loading1 ? <LoadingSpinner /> :  
                                                          <select className="form-select" id="mst_departments_id" name="mst_departments_id" onChange={ onChange }>
                                                             <option value="">Select Department</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select> } 
                                                        </div>  

                                                        <div className="col-md-2">  
                                                            <label>Position</label>
                                                           {loading1 ? <LoadingSpinner /> :  
                                                        <select className="form-select" id="mst_positions_id" name="mst_positions_id" onChange={ onChange }>
                                                             <option value="">Select Position</option>
                                                            { data3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>) }
                                                         </select> }
                                                        </div>   

                                                        <div className="col-md-1">  
                                                            <label style={{ visibility:'hidden' }}>Delete</label>
                                                            {inputList.length !== 1 && <button
                                                          className="mr10"
                                                          onClick={() => handleRemoveClick(i)} className="btn btn-primary">Delete</button>}
                                                        </div>             
                                                    </div>  
                                                </div>
                                            </div>

                                           <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center> 
                                                        <div className="col-md-2">

                                                        {inputList.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}
                                                        
                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>   
                                        
                                        </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div> 
                        </div>
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default AddCustomer  