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

function EditCustomer(props) {

  const headers = {
           'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const customer_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_customer_id =url.substring(url.lastIndexOf('/') + 1)
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

  const [pass, setPassword] = useState();

  const [address1, setCustomerAddress1] = useState({
  homestreet:'',homestreet2:'',area:'',city:'',pincode:'',state_id:'',country_id:'',landline:'',admin_contact:'',
  qc_contact:'',admin_email:'',pancard_no:''});

   const [address2, setCustomerAddress2] = useState({street:'',street2:'',area1:'',city1:'',pincode1:'',corr_state_id:'',
  corr_country_id:'',website:'',qa_contact:'',qc_email:'',qa_email:'',pancard_copy:''});

  const [inputList, setInputList]  = useState([{ contact_person_name: "", contact_person_mobile: "",
    contact_person_email: "", mst_departments_id:"", mst_positions_id: ""}]);
  const [selectedFile, setSelectedFile] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedPanFile, setSelectedPanFile] = useState(false);
  const [isPanFilePicked, setIsPanFilePicked] = useState(false);

    const changeHandler = event => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const changePanHandler = event => {
        setSelectedPanFile(event.target.files[0]);
        setIsPanFilePicked(true);
    };

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
                  setPassword(response.data.data.password);
                    console.log(customer.logo)
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


       const copy_data = () => {

        const copy_street1 = address1.homestreet;
        const copy_street2 = address1.homestreet2;
        const copy_area = address1.area;
        const copy_city = address1.city;
        const copy_pincode = address1.pincode;
        const copy_state_id = address1.state_id;
        const copy_country_id = address1.country_id;

        //show data in textboxes / field

        document.CustomerData.street.value = copy_street1;
        document.CustomerData.street2.value = copy_street2;
        document.CustomerData.area1.value = copy_area;
        document.CustomerData.city1.value = copy_city;
        document.CustomerData.pincode1.value = copy_pincode;
        document.CustomerData.corr_state_id.value = copy_state_id;
        document.CustomerData.corr_country_id.value = copy_country_id;

        // set value

        address2.street = document.CustomerData.street.value;
        address2.street2 = document.CustomerData.street2.value;
        address2.area1 = document.CustomerData.area1.value;
        address2.city1 = document.CustomerData.city1.value;
        address2.pincode1 = document.CustomerData.pincode1.value;
        address2.corr_state_id = document.CustomerData.corr_state_id.value;
        address2.corr_country_id = document.CustomerData.corr_country_id.value;
       }


const EditCustomer = (e)=>{
         e.preventDefault();
       //const contact_person_data = inputList;
        {setLoading(true)};
        const data1 = new FormData();
        //Customer Details
        data1.append('company_name', customer.company_name);
        if(customer.gst_number !== null){
        data1.append('gst_number', customer.gst_number);
        } else {
            data1.append('gst_number', '');
        }
        if(customer.contact_person_name !== null){
        data1.append('contact_person_name', customer.contact_person_name);
        } else{
             data1.append('contact_person_name', '');
        }
        if(customer.tally_alias_name !== null){
        data1.append('tally_alias_name', customer.tally_alias_name);
        } else {
            data1.append('tally_alias_name', '');
        }
        data1.append('user_name', customer.user_name);
        if(customer.password !== pass){
            data1.append('password', customer.password);
        } else {
            data1.append('password', pass);
        }
        data1.append('birth_date', customer.birth_date);
        data1.append('contact_type', customer.contact_type);
        data1.append('priority', customer.priority);
        if(customer.notes !== null){
         data1.append('notes', customer.notes);
        } else {
            data1.append('notes', '');
        }

        if(selectedFile != false)
        {
            data1.append('logo', selectedFile);
        } else {
            if(customer.logo !== '' || customer.logo !== null && customer.logo !== undefined){

                data1.append('logo', customer.logo);

            }
            else if(customer.logo == undefined)
                {
                data1.append('logo', '');
                }
            else{
                data1.append('logo', '');
            }
        }
        data1.append('is_active', customer.is_active);

        //History & Other Details
        if(customer.education_details !== null){
        data1.append('education_details', customer.education_details);
        } else {
            data1.append('education_details', '');
        }
        if(customer.prev_details !== null){
          data1.append('prev_details', customer.prev_details);
        } else {
          data1.append('prev_details', '');
        }

        //Company Info Details
        if(customer.company_tin_no !== null){
        data1.append('company_tin_no', customer.company_tin_no);
        } else {
            data1.append('company_tin_no', '');
        }
        if(customer.company_service_tax_no !== null){
         data1.append('company_service_tax_no', customer.company_service_tax_no);
        } else {
            data1.append('company_service_tax_no', '');
        }
        if(customer.company_cust_discount !== null){
         data1.append('company_cust_discount', customer.company_cust_discount);
        } else {
            data1.append('company_cust_discount', '');
        }

        //Home Address Details
        data1.append('customer_contact_info[home_contact_info][0][street_1]', address1.homestreet);
        data1.append('customer_contact_info[home_contact_info][0][street_2]', address1.homestreet2);
        data1.append('customer_contact_info[home_contact_info][0][area]', address1.area);
        data1.append('customer_contact_info[home_contact_info][0][city]', address1.city);
        data1.append('customer_contact_info[home_contact_info][0][pin]', address1.pincode);
        data1.append('customer_contact_info[home_contact_info][0][state]', address1.state_id);
        data1.append('customer_contact_info[home_contact_info][0][country]', address1.country_id);
        data1.append('customer_contact_info[home_contact_info][0][home_landline]', address1.landline);
        data1.append('customer_contact_info[home_contact_info][0][contact_no]', address1.admin_contact);
        data1.append('customer_contact_info[home_contact_info][0][home_qc_contact_no]', address1.qc_contact);
        data1.append('customer_contact_info[home_contact_info][0][email]', address1.admin_email);
        data1.append('customer_contact_info[home_contact_info][0][home_pan_card]', address1.pancard_no);
        data1.append('customer_contact_info[home_contact_info][0][contact_info_type]', 1);

        //Correspondence Address Details
        data1.append('customer_contact_info[other_contact_info][0][street_1]', address2.street);
        data1.append('customer_contact_info[other_contact_info][0][street_2]', address2.street2);
        data1.append('customer_contact_info[other_contact_info][0][area]', address2.area1);
        data1.append('customer_contact_info[other_contact_info][0][city]', address2.city1);
        data1.append('customer_contact_info[other_contact_info][0][pin]', address2.pincode1);
        data1.append('customer_contact_info[other_contact_info][0][state]', address2.corr_state_id);
        data1.append('customer_contact_info[other_contact_info][0][country]', address2.corr_country_id);
        data1.append('customer_contact_info[other_contact_info][0][other_website]', address2.website);
        data1.append('customer_contact_info[other_contact_info][0][contact_no]', address2.qa_contact);
        data1.append('customer_contact_info[other_contact_info][0][other_qc_email]', address2.qc_email);
        data1.append('customer_contact_info[other_contact_info][0][email]', address2.qa_email);
        if(selectedPanFile != false)
        {
            data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', selectedPanFile);
        } else {
            if(address2.pancard_copy !== '' || address2.pancard_copy !== null && customer.pancard_copy !== undefined){
              data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', address2.pancard_copy);
            } else if(address2.pancard_copy == undefined){
                 data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', '');
            }
         else{
                 data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', '');
            }
        }
        //console.log("=====",address2.street);
        // if(selectedFile != false)
        // {
        //     data1.append('logo', selectedFile);
        // } else {
        //     if(customer.logo !== '' || customer.logo !== null && customer.logo !== undefined){

        //         data1.append('logo', customer.logo);

        //         console.log("null===",customer.logo)

        //     }
        //     else if(customer.logo == undefined)
        //         {
        //         data1.append('logo', '');
        //         console.log("undef===",customer.logo)
        //         }
        //     else{
        //         data1.append('logo', '');
        //         console.log("else===",customer.logo)
        //     }
        // }
        data1.append('customer_contact_info[other_contact_info][0][contact_info_type]', 2);

         var object = {};
        inputList.forEach(function(value, key){
            object[key] = value;
        });
        var contact_person_data = JSON.stringify(object);

        data1.append('contact_person_data', contact_person_data);

        axios.post( `${process.env.REACT_APP_BASE_APIURL}editCustomer/`+customer_id, data1, {headers} )
                .then(response => {
                    if(response.data.success == true){

                       props.history.push('/customer');
                      toastr.success(response.data.message);
                      {setLoading(false)};
                    }
                    else{
                        props.history.push('/edit-customer/'+edit_customer_id);
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }


  const onChange = (e) => {
    e.persist();
    setCustomer({...customer, [e.target.name]: e.target.value});
  }

  const onChangeAddress1 = (e) => {
    e.persist();
    setCustomerAddress1({...address1, [e.target.name]: e.target.value});
  }

  const onChangeAddress2 = (e) => {
        e.persist();
        setCustomerAddress2({...address2, [e.target.name]: e.target.value});
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
                     <Form onSubmit={EditCustomer} method="POST" id="EditCustomer" name="CustomerData">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Sales</li>
                                            <li className="breadcrumb-item"><a href="/customer">Customers</a></li>
                                            <li className="breadcrumb-item active">Edit Customers</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/customer" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            &nbsp;
                                            { loading ? <center><LoadingSpinner /></center> :
                                                <li>
                                               <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                                            </li>
                                           }
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
                                                        <label className="required-field">Company Name</label>
                                                        <input className="form-control" value={customer.company_name} type="text" placeholder="Enter Company Name" id="example-text-input" name="company_name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>GST No</label>
                                                        <input className="form-control" value={customer.gst_number} type="text" placeholder="Enter GST No" id="example-text-input" name="gst_number" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Contact Person Name</label>
                                                        <input className="form-control" value={customer.contact_person_name} type="text" name="contact_person_name" placeholder="Enter Contact Person Name" onChange={ onChange }/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Tally Alias Name</label>
                                                        <input className="form-control" value={customer.tally_alias_name} type="text"  name="tally_alias_name" placeholder="Enter Tally Alias Name" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <label className="required-field">Username</label>
                                                        <input className="form-control" value={customer.user_name} type="text" name="user_name" placeholder="Enter Username" onChange={ onChange }/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="required-field">Password</label>
                                                        <input className="form-control" value={customer.password} type="password"  name="password" placeholder="Enter Password" onChange={ onChange }/>
                                                        <input className="form-control" value={pass} type="hidden"/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Birth Date</label>
                                                        <input className="form-control" value={customer.birth_date} type="date"  id="example-date-input" name="birth_date" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <label>Contact Type</label>
                                                        <select value={customer.contact_type} className="form-select" name="contact_type" onChange={ onChange }>
                                                            <option value="Customer">Customer</option>
                                                            <option value="Supplier">Supplier</option>
                                                            <option value="Service Provider">Service Provider</option>
                                                            <option value="Other">Other</option>
                                                            <option value="Ledger">Ledger</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Priority</label>
                                                        <select value={customer.priority} className="form-select" name="priority" onChange={ onChange }>
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>

                                                        </select>
                                                    </div>

                                                     <div className="col-md-4">
                                                        <label>Active/Inactive</label>
                                                        <select value={customer.is_active} className="form-select" name="is_active" onChange={ onChange }>
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
                                                        <textarea value={customer.notes} name="notes" className="form-control" placeholder="Enter Notes" onChange={ onChange }></textarea>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Logo</label>
                                                        <input className="form-control" type="file" name="logo" onChange={ changeHandler }/>
                                                        <input className="form-control" type="hidden" value={customer.logo}/>
                                                        {customer.logo !== null ? <img src={logo_path+customer.logo} width="70px" height="50px"/> : ''}

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
                                                                    <input value={address1.homestreet} className="form-control" type="text" name="homestreet" placeholder="Enter Homestreet" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>Area</label>
                                                                    <input value={address1.area} className="form-control" type="text" name="area" placeholder="Enter Area" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input value={address1.pincode} className="form-control" type="text" name="pincode" placeholder="Enter Pincode" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select value={address1.country_id} className="form-select" id="country_id" name="country_id" onChange={ onChangeAddress1 } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Account/Admin Contact No</label>
                                                                    <input value={address1.admin_contact} className="form-control" type="text" name="admin_contact" placeholder="Enter Account/Admin Contact No" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>Account/Admin E-mail</label>
                                                                    <input value={address1.admin_email} className="form-control" type="text" name="admin_email" placeholder="Enter Account/Admin E-mail" onChange={ onChangeAddress1 }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input value={address1.homestreet2} className="form-control" type="text" name="homestreet2" placeholder="Enter Home Street2" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>City</label>
                                                                    <input value={address1.city} className="form-control" type="text" name="city" placeholder="Enter City" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select value={address1.state_id} className="form-select" id="state_id" name="state_id" onChange={ onChangeAddress1 } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>LandLine</label>
                                                                    <input value={address1.landline} className="form-control" type="text" name="landline" placeholder="Enter Landline" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>QC Contact No</label>
                                                                    <input value={address1.qc_contact} className="form-control" type="text" name="qc_contact" placeholder="Enter QC Contact No" onChange={ onChangeAddress1 }/><br/>
                                                                    <label>Pancard No</label>
                                                                    <input value={address1.pancard_no} className="form-control" type="text" name="pancard_no" placeholder="Enter Pancard No" onChange={ onChangeAddress1 }/>
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
                                                                    <input value={address2.street} className="form-control" type="text" id="street" name="street" placeholder="Enter Street" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>Area</label>
                                                                    <input value={address2.area1} className="form-control" type="text" name="area1" placeholder="Enter Area" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input value={address2.pincode1} className="form-control" type="text" name="pincode1" placeholder="Enter Pincode" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>Country</label>
                                                                   {loading1 ? <LoadingSpinner /> :  <select value={address2.corr_country_id} className="form-select" id="corr_country_id" name="corr_country_id" onChange={ onChangeAddress2 } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>QA Contact No</label>
                                                                    <input value={address2.qa_contact} className="form-control" type="text" name="qa_contact" placeholder="Enter QA Contact No" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input value={address2.qa_email} className="form-control" type="text" name="qa_email" placeholder="Enter QA E-mail" onChange={ onChangeAddress2 }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input value={address2.street2} className="form-control" id="street2" type="text" name="street2" placeholder="Enter Street2" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>City</label>
                                                                    <input value={address2.city1} className="form-control" type="text" name="city1" placeholder="Enter City" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select value={address2.corr_state_id} className="form-select" id="corr_state_id" name="corr_state_id" onChange={ onChangeAddress2 } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Website</label>
                                                                    <input value={address2.website} className="form-control" type="text" name="website" placeholder="Enter Website" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input value={address2.qc_email} className="form-control" type="text" name="qc_email" placeholder="Enter QC E-mail" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    <input className="form-control" type="file" name="other_pan_card_copy" onChange={ changePanHandler }/>
                                                                    <input className="form-control" type="hidden" value={address2.other_pan_card_copy}/>

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
                                                        <button name="copy_details" type="button" onClick={copy_data} className="btn btn-primary form-control">Copy Details</button>
                                                    </div>
                                                    <div className="col-md-6 align-items-center">
                                                    {address2.other_pan_card_copy !== null ?
                                                        <a href={pancard_copy_path+address2.other_pan_card_copy} className="btn btn-primary form-control" target="_blank">Click To Open PanCard Copy</a>
                                                    : <span className="btn btn-primary form-control">No Pancard Copy Uploaded</span>}
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
                                                        <textarea value={customer.education_details} name="education_details" className="form-control" placeholder="Enter Education Details" onChange={ onChange }></textarea>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Prev. Details</label>
                                                        <textarea value={customer.prev_details} name="prev_details" className="form-control" placeholder="Enter Previous Details" onChange={ onChange }></textarea>
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
                                                            <input value={customer.company_tin_no} className="form-control" type="text" placeholder="Enter TIN No" name="company_tin_no" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label>Service Tax No</label>
                                                            <input value={customer.company_service_tax_no} className="form-control" type="text" name="company_service_tax_no" placeholder="Enter Service Tax No" onChange={ onChange }/>
                                                        </div>
                                                        {/*<div className="col-md-2">
                                                            <label>CST No</label>
                                                            <input className="form-control" type="text"  name="cst_no" placeholder="Enter CST No" onChange={ onChange }/>
                                                        </div> */}

                                                        <div className="col-md-4">
                                                            <label>Customer Discount</label>
                                                            <input value={customer.company_cust_discount} className="form-control" type="text"  name="company_cust_discount" placeholder="Enter Customer Discount" onChange={ onChange }/>
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
                                                            <label style={{ visibility:'hidden' }}>Delete</label><br/>
                                                            {inputList.length >= 1 && <button
                                                          className="mr10"
                                                          onClick={() => handleRemoveClick(i)} className="btn btn-danger"><i class="fa fa-trash"></i></button>}
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
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center>
                                                        <div className="col-md-2">

                                                        {inputList.length === 0 && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}

                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>
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

export default EditCustomer
