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
          //'content-type': 'multipart/form-data',
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]); 
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);  
  const [selectedFiles, setselectedFiles] = useState([])
  const [customer, setCustomer] = useState({ company_name: '', gst_no: '',contact_person_name:'',tally_alias_name:'',
  username:'',password:'',birth_date:'',contact_type:'Customer',priority:'High',notes:'',active_inactive:'1',logo:'',
  homestreet:'',homestreet2:'',area:'',city:'',pincode:'',state_id:'',country_id:'',landline:'',admin_contact:'',
  qc_contact:'',admin_email:'',pancard_no:'',street:'',street2:'',area1:'',city1:'',pincode1:'',corr_state_id:'',
  corr_country_id:'',website:'',qa_contact:'',qc_email:'',qa_email:'',pancard_copy:'',education_details:'',prev_details:'',
  tin_no:'',service_tax_no:'',customer_discount:''});  
  const [inputList, setInputList]  = useState([{ contact_person_name: "", contact_person_mobile: "", 
    contact_person_email: "", mst_departments_id:"", mst_positions_id: ""}]);
    function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }
    /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
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

         const contact_person_data = inputList;

        {setLoading(true)};
        const data = 
        { 
            company_name:customer.company_name, 
            gst_number: customer.gst_no,
            contact_person_name: customer.contact_person_name,
            tally_alias_name: customer.tally_alias_name,
            user_name: customer.username,
            password: customer.password,
            birth_date: customer.birth_date,
            contact_type: customer.contact_type,
            priority: customer.priority,
            notes: customer.notes,
            is_active: customer.active_inactive,
            logo:selectedFiles.path,
            education_details:customer.education_details,
            prev_details:customer.prev_details,
            company_tin_no: customer.tin_no,
            company_service_tax_no :customer.service_tax_no,
            company_cust_discount:customer.customer_discount,
            "customer_contact_info" : {
                "home_contact_info":[
                   {
                        street_1:customer.homestreet,
                        street_2:customer.homestreet2,
                        area:customer.area,
                        city:customer.city,
                        pin:customer.pincode,
                        state:customer.state_id,
                        country:customer.country_id,
                        home_landline:customer.landline,
                        contact_no:customer.admin_contact,   //Admin OR Account Contact No
                        home_qc_contact_no:customer.qc_contact,
                        email:customer.admin_email, // Account OR Admin Email
                        home_pan_card:customer.pancard_no,
                        "contact_info_type" : 1,
                    }
                ],
                "other_contact_info":[
                     /*Correspondence Address - Address Type 2*/
                       {
                        street_1:customer.street,
                        street_2:customer.street2,
                        area:customer.area1,
                        city:customer.city1,
                        pin:customer.pincode1,
                        state:customer.corr_state_id,
                        country:customer.corr_country_id,
                        other_website:customer.website,
                        contact_no:customer.qa_contact, //QA Contact No
                        other_qc_email:customer.qc_email,
                        email: customer.qa_email,//QA Email
                        other_pan_card_copy:"",
                        "contact_info_type" : 2,
                       }
                ]
            }, "customer_contact_person": contact_person_data,
        }; 
        //console.log(setselectedFiles)
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addCustomer`, data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/customer');
                        toastr.success(response.data.message);
                        {setLoading(false)}; 
                    }else{
                        props.history.push('/add-customer');
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

const handleInputChangeLogo=(event) => {
        setselectedFiles([
            ...selectedFiles, {[event.target.name]: event.target.files[0]}
          ])
    }

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
                                            <li><button type="reset" onClick = {ResetCustomer} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                                            &nbsp;
                                            { loading ? <center><LoadingSpinner /></center> :<li>
                                               <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                                            </li>}
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
                                                        <input className="form-control" type="text" placeholder="Enter Company Name" id="example-text-input" name="company_name" onChange={ onChange }/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>GST No</label>
                                                        <input className="form-control" type="text" placeholder="Enter GST No" id="example-text-input" name="gst_no" onChange={ onChange }/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Contact Person Name</label>
                                                        <input className="form-control" type="text" name="contact_person_name" placeholder="Enter Contact Person Name" onChange={ onChange }/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Tally Alias Name</label>
                                                        <input className="form-control" type="text"  name="tally_alias_name" placeholder="Enter Tally Alias Name" onChange={ onChange }/>
                                                    </div>      
                                                </div>  
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Username</label>
                                                        <input className="form-control" type="text" name="username" placeholder="Enter Username" onChange={ onChange }/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Password</label>
                                                        <input className="form-control" type="password"  name="password" placeholder="Enter Password" onChange={ onChange }/>
                                                    </div>      

                                                    <div className="col-md-3">  
                                                        <label>Birth Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" name="birth_date" onChange={ onChange }/>
                                                    </div>    

                                                    <div className="col-md-3">  
                                                        <label>Contact Type</label>
                                                        <select className="form-select" name="contact_type" onChange={ onChange }>
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
                                                        <select className="form-select" name="priority" onChange={ onChange }>
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>
                                                          
                                                        </select>
                                                    </div>  

                                                    <div className="col-md-4">  
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" placeholder="Enter Notes" onChange={ onChange }></textarea>
                                                    </div>   

                                                    
                                                     <div className="col-md-4">  
                                                        <label>Active/Inactive</label>
                                                        <select className="form-select" name="status" onChange={ onChange }>
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
                                                          }} onChange = {handleInputChangeLogo}
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
                      <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
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
                                                                    <input className="form-control" type="text" name="homestreet" placeholder="Enter Homestreet" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="country_id" name="country_id" onChange={ onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Account/Admin Contact No</label>
                                                                    <input className="form-control" type="text" name="admin_contact" placeholder="Enter Account/Admin Contact No" onChange={ onChange }/><br/>
                                                                    <label>Account/Admin E-mail</label>
                                                                    <input className="form-control" type="text" name="admin_email" placeholder="Enter Account/Admin E-mail" onChange={ onChange }/>
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input className="form-control" type="text" name="homestreet2" placeholder="Enter Home Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="state_id" name="state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>LandLine</label>
                                                                    <input className="form-control" type="text" name="landline" placeholder="Enter Landline" onChange={ onChange }/><br/>
                                                                    <label>QC Contact No</label>
                                                                    <input className="form-control" type="text" name="qc_contact" placeholder="Enter QC Contact No" onChange={ onChange }/><br/>
                                                                    <label>Pancard No</label>
                                                                    <input className="form-control" type="text" name="pancard_no" placeholder="Enter Pancard No" onChange={ onChange }/>
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
                                                                    <input className="form-control" type="text" name="street" placeholder="Enter Street" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area1" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode1" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>Country</label>
                                                                   {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_country_id" name="corr_country_id" onChange={ onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>QA Contact No</label>
                                                                    <input className="form-control" type="text" name="qa_contact" placeholder="Enter QA Contact No" onChange={ onChange }/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input className="form-control" type="text" name="qa_email" placeholder="Enter QA E-mail" onChange={ onChange }/>
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" name="street2" placeholder="Enter Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city1" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_state_id" name="corr_state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" name="website" placeholder="Enter Website" onChange={ onChange }/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input className="form-control" type="text" name="qc_email" placeholder="Enter QC E-mail" onChange={ onChange }/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    <input className="form-control" type="file" name="pancard_copy" onChange={ onChange }/>
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
                                                        <textarea name="education_details" className="form-control" placeholder="Enter Education Details" onChange={ onChange }></textarea>
                                                    </div>   
                                                    
                                                    <div className="col-md-6">  
                                                        <label>Prev. Details</label>
                                                        <textarea name="prev_details" className="form-control" placeholder="Enter Previous Details" onChange={ onChange }></textarea>
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
                                                            <input className="form-control" type="text" placeholder="Enter TIN No" name="tin_no" onChange={ onChange }/>
                                                        </div>  

                                                        <div className="col-md-4">
                                                            <label>Service Tax No</label>
                                                            <input className="form-control" type="text" name="service_tax_no" placeholder="Enter Service Tax No" onChange={ onChange }/>
                                                        </div>  
                                                        {/*<div className="col-md-2">  
                                                            <label>CST No</label>
                                                            <input className="form-control" type="text"  name="cst_no" placeholder="Enter CST No" onChange={ onChange }/>
                                                        </div> */}

                                                        <div className="col-md-4">  
                                                            <label>Customer Discount</label>
                                                            <input className="form-control" type="text"  name="customer_discount" placeholder="Enter Customer Discount" onChange={ onChange }/>
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
                                                            <input className="form-control" type="text" placeholder="Enter Name" value={x.contact_person_name} name="contact_person_name" onChange={e => handleInputChange(e, i)}/>
                                                        </div>  

                                                        <div className="col-md-2">
                                                            <label>Mobile</label>
                                                            <input className="form-control" type="text" placeholder="Enter Mobile" value={x.contact_person_mobile} name="contact_person_mobile" onChange={e => handleInputChange(e, i)}/>
                                                        </div>  

                                                        <div className="col-md-3">
                                                            <label>E-mail</label>
                                                            <input className="form-control" type="text" name="contact_person_email" value={x.contact_person_email} placeholder="Enter E-mail" onChange={e => handleInputChange(e, i)}/>
                                                        </div>  
                                                        <div className="col-md-2">  
                                                            <label>Department</label>
                                                            {loading1 ? <LoadingSpinner /> :  
                                                          <select className="form-select" id="mst_departments_id" name="mst_departments_id" value={x.mst_departments_id} onChange={e => handleInputChange(e, i)}>
                                                             <option value="">Select Department</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select> } 
                                                        </div>  

                                                        <div className="col-md-2">  
                                                            <label>Position</label>
                                                           {loading1 ? <LoadingSpinner /> :  
                                                        <select className="form-select" id="mst_positions_id" name="mst_positions_id" value={x.mst_positions_id} onChange={e => handleInputChange(e, i)}>
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