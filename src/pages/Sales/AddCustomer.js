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
import $ from 'jquery'

function AddCustomer(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [selectedFiles, setselectedFiles] = useState(null)
  const [customer, setCustomer] = useState({ company_name: '', gst_no: '',contact_person_name:'',tally_alias_name:'',
  username:'',password:'',birth_date:'',contact_type:'Customer',priority:'High',notes:'',active_inactive:'1',logo:'',
  homestreet:'',homestreet2:'',area:'',city:'',pincode:'',state_id:'',country_id:'',landline:'',admin_contact:'',
  qc_contact:'',admin_email:'',pancard_no:'',street:'',street2:'',area1:'',city1:'',pincode1:'',corr_state_id:'',
  corr_country_id:'',website:'',qa_contact:'',qc_email:'',qa_email:'',pancard_copy:'',education_details:'',prev_details:'',
  tin_no:'',service_tax_no:'',customer_discount:'',company_vat_no:'',company_cst_no:''});
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
         fetchCountry1();
         //fetchStates();
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

        const fetchCountry1 = () => {
             {setLoading1(true)};
           axios.get(`${process.env.REACT_APP_BASE_APIURL}listCountries`,{headers})
            .then(response => {
                     setData5(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchStates =  () => {
            var country_id_fetch = document.getElementById('country_id').value;
            if(country_id_fetch !== null){
              setCustomer(prevState => ({ ...prevState, country_id: country_id_fetch}))
               {setLoading1(true)};
               axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch,{headers})
              .then(response => {
                  const state_data = response.data.data[0].country_wise_states.map(d => ({
                      "state_id" : d.id,
                      "state_name" : d.state_name,
                    }))
                    setData1(state_data);
                    {setLoading1(false)}
                 })
            }
        }

        const fetchCorStates = () => {
            var country_id_fetch2 = document.getElementById('corr_country_id').value;
            if(country_id_fetch2 !== null){
              setCustomer(prevState => ({ ...prevState, corr_country_id: country_id_fetch2}))
               {setLoading2(true)};
               axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch2,{headers})
              .then(response => {
                  const state_data = response.data.data[0].country_wise_states.map(d => ({
                      "state_id1" : d.id,
                      "state_name1" : d.state_name,
                    }))
                    setData6(state_data);
                    {setLoading2(false)}
                 })
            }
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

          var country_id_fetch = document.getElementById("country_id").value;
          axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch,{headers})
          .then(response => {
          const state_data1 = response.data.data[0].country_wise_states.map(d => ({
              "state1_id" : d.id,
              "state_name1" : d.state_name,
            }))
              setData6(state_data1);
              setCustomer(prevState =>({...prevState,corr_state_id:document.getElementById("state_id").value}))
          })

        const copy_street1 = customer.homestreet;
        const copy_street2 = customer.homestreet2;
        const copy_area = customer.area;
        const copy_city = customer.city;
        const copy_pincode = customer.pincode;
        const copy_state_id = customer.state_id;
        const copy_country_id = customer.country_id;

        //show data in textboxes / field
        document.CustomerData.street.value = copy_street1;
        document.CustomerData.street2.value = copy_street2;
        document.CustomerData.area1.value = copy_area;
        document.CustomerData.city1.value = copy_city;
        document.CustomerData.pincode1.value = copy_pincode;
        document.CustomerData.corr_country_id.value = copy_country_id;
        document.CustomerData.corr_state_id.value = copy_state_id;
        // set value

        customer.street = document.CustomerData.street.value;
        customer.street2 = document.CustomerData.street2.value;
        customer.area1 = document.CustomerData.area1.value;
        customer.city1 = document.CustomerData.city1.value;
        customer.pincode1 = document.CustomerData.pincode1.value;
        customer.corr_country_id = document.CustomerData.corr_country_id.value;
        customer.corr_state_id =  document.CustomerData.corr_state_id.value;


        return
       }


const InsertCustomer = (e)=>{
         e.preventDefault();

       //const contact_person_datas = inputList;
        {setLoading(true)};
        /*const data =
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
                     Correspondence Address - Address Type 2
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
        }; */

        if(customer.state_id !== '' && customer.country_id == ''){
          toastr.error("Home Details Country Field is Required.");
          {setLoading(false)};
          return;
        }

        if(customer.corr_state_id !== '' && customer.corr_country_id == ''){
          toastr.error("Other Contact Details Country Field is Required.");
          {setLoading(false)};
          return;
        }
        const data1 = new FormData();
        //Customer Details
        data1.append('company_name', customer.company_name);
        data1.append('gst_number', customer.gst_no);
        data1.append('contact_person_name', customer.contact_person_name);
        data1.append('tally_alias_name', customer.tally_alias_name);
        data1.append('user_name', customer.username);
        data1.append('password', customer.password);
        data1.append('birth_date', customer.birth_date);
        data1.append('contact_type', customer.contact_type);
        data1.append('priority', customer.priority);
        data1.append('notes', customer.notes);

        if(selectedFile != false)
        {
            data1.append('logo', selectedFile);
        }
        else{
            data1.append('logo', '');
        }

        data1.append('is_active', customer.active_inactive);

        //History & Other Details
        data1.append('education_details', customer.education_details);
        data1.append('prev_details', customer.prev_details);

        //Company Info Details
        data1.append('company_tin_no', customer.tin_no);
        data1.append('company_service_tax_no', customer.service_tax_no);
        data1.append('company_cust_discount', customer.customer_discount);
        data1.append('company_cst_no', customer.company_cst_no);
        data1.append('company_vat_no', customer.company_vat_no);

        //Home Address Details
        data1.append('customer_contact_info[home_contact_info][0][street_1]', customer.homestreet);
        data1.append('customer_contact_info[home_contact_info][0][street_2]', customer.homestreet2);
        data1.append('customer_contact_info[home_contact_info][0][area]', customer.area);
        data1.append('customer_contact_info[home_contact_info][0][city]', customer.city);
        data1.append('customer_contact_info[home_contact_info][0][pin]', customer.pincode);
        data1.append('customer_contact_info[home_contact_info][0][state]', customer.state_id);
        data1.append('customer_contact_info[home_contact_info][0][country]', customer.country_id);
        data1.append('customer_contact_info[home_contact_info][0][home_landline]', customer.landline);
        data1.append('customer_contact_info[home_contact_info][0][contact_no]', customer.admin_contact);
        data1.append('customer_contact_info[home_contact_info][0][home_qc_contact_no]', customer.qc_contact);
        data1.append('customer_contact_info[home_contact_info][0][email]', customer.admin_email);
        data1.append('customer_contact_info[home_contact_info][0][home_pan_card]', customer.pancard_no);
        data1.append('customer_contact_info[home_contact_info][0][contact_info_type]', 1);

        //Correspondence Address Details
        data1.append('customer_contact_info[other_contact_info][0][street_1]', customer.street);
        data1.append('customer_contact_info[other_contact_info][0][street_2]', customer.street2);
        data1.append('customer_contact_info[other_contact_info][0][area]', customer.area1);
        data1.append('customer_contact_info[other_contact_info][0][city]', customer.city1);
        data1.append('customer_contact_info[other_contact_info][0][pin]', customer.pincode1);
        data1.append('customer_contact_info[other_contact_info][0][state]', customer.corr_state_id);
        data1.append('customer_contact_info[other_contact_info][0][country]', customer.corr_country_id);
        data1.append('customer_contact_info[other_contact_info][0][other_website]', customer.website);
        data1.append('customer_contact_info[other_contact_info][0][contact_no]', customer.qa_contact);
        data1.append('customer_contact_info[other_contact_info][0][other_qc_email]', customer.qc_email);
        data1.append('customer_contact_info[other_contact_info][0][email]', customer.qa_email);
        if(selectedPanFile != false)
        {
            data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', selectedPanFile);
        }
        else{
            data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', '');
        }
        data1.append('customer_contact_info[other_contact_info][0][contact_info_type]', 2);

        var object = {};
        inputList.forEach(function(value, key){
            object[key] = value;
        });
        var contact_person_data = JSON.stringify(object);

        //console.log(json)

        //contact_person_datas.forEach(contact_person_data => data1.append('contact_person_data[]', JSON.stringify(contact_person_data)))

        data1.append('contact_person_data', contact_person_data);

                 /*inputList.forEach(function(contact,index){
                  data1.append('customer_contact_person[index][contact_person_name]', inputList[index].contact_person_name);
                  data1.append('customer_contact_person[index][contact_person_mobile]', inputList[index].contact_person_mobile);
                  data1.append('customer_contact_person[index][contact_person_email]', inputList[index].contact_person_email);
                  data1.append('customer_contact_person[index][mst_departments_id]', inputList[index].mst_departments_id);
                  data1.append('customer_contact_person[index][mst_positions_id]', inputList[index].mst_positions_id);

             })*/

         //const final_data = [...data1];
       // console.log(final_data);

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addCustomer`, data1, {headers} )
                .then(response => {
                    if(response.data.success == true){

                       props.history.push('/customer');
                      toastr.success(response.data.message);
                      {setLoading(false)};

                       /*const contact_details = {
                         "customer_contact_person": contact_person_data,
                         "customer_id" : response.data.data.id
                       }


   // if contact person not empty then otherwise not
                       //console.log(contact_details)
                       axios.post( `${process.env.REACT_APP_BASE_APIURL}addCustomerContactPerson`,
                     contact_details, {headers} )
                       .then(response => {
                            if(response.data.success == true){
                                props.history.push('/customer');
                                toastr.success(response.data.message);
                                {setLoading(false)};
                              }
                            else{
                                props.history.push('/add-customer');
                                toastr.error(response.data.message);
                                {setLoading(false)};
                            }
                        })
                       {setLoading(false)};
                       //console.log(response.data.data.id);*/
                    }
                    else{
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


return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form onSubmit={InsertCustomer} method="POST" id="AddCustomer" name="CustomerData">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Sales</li>
                                            <li className="breadcrumb-item"><a href="/customer">Customers</a></li>
                                            <li className="breadcrumb-item active">Add Customers</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/customer" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            <li><button type="reset" onClick = {ResetCustomer} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                                            &nbsp;
                                            { loading ? <center><LoadingSpinner /></center> :
                                                <li>
                                               <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                                            </li>
                                           }
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
                                                        <label className="required-field">Company Name</label>
                                                        <input className="form-control" type="text" placeholder="Enter Company Name" id="example-text-input" name="company_name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">GST No</label>
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

                                                    <div className="col-md-4">
                                                        <label className="required-field">Username</label>
                                                        <input className="form-control" type="text" name="username" placeholder="Enter Username" onChange={ onChange } autoComplete='off'/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="required-field">Password</label>
                                                        <input className="form-control" type="text"  name="password" placeholder="Enter Password" onChange={ onChange } autoComplete='off'/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Birth Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" name="birth_date" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <label>Contact Type</label>
                                                        <select className="form-select" name="contact_type" onChange={ onChange }>
                                                            <option value="Customer">Customer</option>
                                                            <option value="Supplier">Supplier</option>
                                                            <option value="Service Provider">Service Provider</option>
                                                            <option value="Other">Other</option>
                                                            <option value="Ledger">Ledger</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Priority</label>
                                                        <select className="form-select" name="priority" onChange={ onChange }>
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>

                                                        </select>
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
                                                    <div className="col-md-8">
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" placeholder="Enter Notes" onChange={ onChange }></textarea>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Logo</label>
                                                        <input className="form-control" type="file" name="logo" onChange={ changeHandler }/>

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
                                                                    <input className="form-control" type="text" id="homestreet" name="homestreet" placeholder="Enter Homestreet" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    <select className="form-select" id="state_id" name="state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.state_id} key={key} >{option.state_name}</option>) }</select><br/>
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
                                                                    <label>Select Country</label>
                                                                    <select className="form-select" id="country_id" name="country_id" onChange={ onChange } onChange={fetchStates}>
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select><br/>
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
                                                                    <input className="form-control" type="text" id="street" name="street" placeholder="Enter Street" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area1" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode1" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    <select className="form-select" id="corr_state_id" name="corr_state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data6.map((option, key) => <option value={option.state_id1} key={key} >{option.state_name1}</option>) }</select><br/>
                                                                    <label>QA Contact No</label>
                                                                    <input className="form-control" type="text" name="qa_contact" placeholder="Enter QA Contact No" onChange={ onChange }/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input className="form-control" type="text" name="qa_email" placeholder="Enter QA E-mail" onChange={ onChange }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" id="street2" type="text" name="street2" placeholder="Enter Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city1" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label>Country</label>
                                                                    <select className="form-select" id="corr_country_id" name="corr_country_id" onChange={ onChange } onChange={fetchCorStates}>
                                                                    <option value="">Select Country</option>
                                                                    { data5.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select><br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" name="website" placeholder="Enter Website" onChange={ onChange }/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input className="form-control" type="text" name="qc_email" placeholder="Enter QC E-mail" onChange={ onChange }/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    <input className="form-control" type="file" name="other_pan_card_copy" onChange={ changePanHandler }/>
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
                                                        <div className="col-md-3">
                                                            <label>VAT No</label>
                                                            <input className="form-control" type="text" placeholder="Enter VAT No" name="company_vat_no" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label>TIN No</label>
                                                            <input className="form-control" type="text" placeholder="Enter TIN No" name="tin_no" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Service Tax No</label>
                                                            <input className="form-control" type="text" name="service_tax_no" placeholder="Enter Service Tax No" onChange={ onChange }/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label>CST No</label>
                                                            <input className="form-control" type="text"  name="company_cst_no" placeholder="Enter CST No" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-2">
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
                            </div>
                        </div>
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default AddCustomer
