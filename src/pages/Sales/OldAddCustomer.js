import React, { useState, useEffect, Component } from 'react';

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
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Dropzone from "react-dropzone"

class AddCustomer extends Component {

    constructor(props) {

        super(props);
        this.state = {
            image: '',
            loading: '',
            loading1: '',
            data: '',
            data1: '',
            data3: '',
            data4: '',
            company_name: '',
            gst_no: '',
            contact_person_name: '',
            tally_alias_name: '',
            username: '',
            password: '',
            birth_date: '',
            contact_type: 'Customer',
            priority: 'High',
            notes: '',
            active_inactive: '1',
            logo: '',
            homestreet: '',
            homestreet2: '',
            area: '',
            city: '',
            pincode: '',
            state_id: '',
            country_id: '',
            landline: '',
            admin_contact: '',
            qc_contact: '',
            admin_email: '',
            pancard_no: '',
            street: '',
            street2: '',
            area1: '',
            city1: '',
            pincode1: '',
            corr_state_id: '',
            corr_country_id: '',
            website: '',
            qa_contact: '',
            qc_email: '',
            qa_email: '',
            pancard_copy: '',
            education_details: '',
            prev_details: '',
            tin_no: '',
            service_tax_no: '',
            customer_discount: ''

        }

        const headers = {
            'content-type': "multipart/form-data",
            'Authorization': "Bearer " + localStorage.getItem('token')
        }

        //const [loading, setLoading] = useState(false);
        //const [loading1, setLoading1] = useState(false);
        // const [data, setData] = useState([]);
        //const [data1, setData1] = useState([]); 
        //const [data3, setData3] = useState([]);
        //const [data4, setData4] = useState([]); 

        /*const [inputList, setInputList]  = this.state[{ contact_person_name: "", contact_person_mobile: "", 
        contact_person_email: "", mst_departments_id:"", mst_positions_id: ""}];*/



        this.componentDidMount = () => {
            this.fetchCountry();
            this.fetchStates();
            this.fetchPosition();
            this.fetchDepartment();
        }

        this.fetchCountry = () => {
            this.setState({ loading1: true }, () => {
                axios.get(`${process.env.REACT_APP_BASE_APIURL}listCountries`, { headers })
                    .then(response => {
                        this.setState({ data: response.data.data });
                        //setData(response.data.data);
                        this.setState({ loading1: false });
                    })
                    .catch((error) => {
                        toastr.error(error.response.data.message);
                        this.setState({ loading1: false });
                    })
            })
        }

        this.fetchStates = () => {
            this.setState({ loading1: true }, () => {
                axios.get(`${process.env.REACT_APP_BASE_APIURL}listStates`, { headers })
                    .then(response => {
                        //setData1(response.data.data);
                        this.setState({ data1: response.data.data });
                        this.setState({ loading1: false });
                    })
                    .catch((error) => {
                        toastr.error(error.response.data.message);
                        this.setState({ loading1: false });
                    })
            })
        }

        this.fetchPosition = () => {
            this.setState({ loading1: true }, () => {
                axios.get(`${process.env.REACT_APP_BASE_APIURL}listPosition?is_dropdown=1`, { headers })
                    .then(response => {
                        //setData3(response.data.data);
                        this.setState({ data3: response.data.data });
                        this.setState({ loading1: false });
                    })
                    .catch((error) => {
                        toastr.error(error.response.data.message);

                        this.setState({ loading1: false });
                    })
            })
        }

        this.fetchDepartment = () => {
            this.setState({ loading1: true }, () => {
                axios.get(`${process.env.REACT_APP_BASE_APIURL}listDepartment?is_dropdown=1`, { headers })
                    .then(response => {
                        //setData4(response.data.data);
                        this.setState({ data4: response.data.data });
                        this.setState({ loading1: false });
                    })
                    .catch((error) => {
                        toastr.error(error.response.data.message);

                        this.setState({ loading1: false });
                    })
            })
        }

        this.InsertCustomer = (e) => {
            e.preventDefault();

            const contact_person_data = inputList;

            this.setState({ loading: true }, () => {
                const data = {
                    company_name: this.refs.company_name,
                    gst_number: this.refs.gst_no,
                    contact_person_name: this.refs.contact_person_name,
                    tally_alias_name: this.refs.tally_alias_name,
                    user_name: this.refs.username,
                    password: this.refs..password,
                    birth_date: this.refs.birth_date,
                    contact_type: this.refs.contact_type,
                    priority: this.refs.priority,
                    notes: this.refs.notes,
                    is_active: this.refs.active_inactive,
                    //logo:setselectedFiles,
                    education_details: this.refs.education_details,
                    prev_details: this.refs.prev_details,
                    company_tin_no: this.refs.tin_no,
                    company_service_tax_no: this.refs.service_tax_no,
                    company_cust_discount: this.refs.customer_discount,
                    "customer_contact_info": {
                        "home_contact_info": [{
                            street_1: customer.homestreet,
                            street_2: customer.homestreet2,
                            area: customer.area,
                            city: customer.city,
                            pin: customer.pincode,
                            state: customer.state_id,
                            country: customer.country_id,
                            home_landline: customer.landline,
                            contact_no: customer.admin_contact, //Admin OR Account Contact No
                            home_qc_contact_no: customer.qc_contact,
                            email: customer.admin_email, // Account OR Admin Email
                            home_pan_card: customer.pancard_no,
                            "contact_info_type": 1,
                        }],
                        "other_contact_info": [
                            /*Correspondence Address - Address Type 2*/
                            {
                                street_1: customer.street,
                                street_2: customer.street2,
                                area: customer.area1,
                                city: customer.city1,
                                pin: customer.pincode1,
                                state: customer.corr_state_id,
                                country: customer.corr_country_id,
                                other_website: customer.website,
                                contact_no: customer.qa_contact, //QA Contact No
                                other_qc_email: customer.qc_email,
                                email: customer.qa_email, //QA Email
                                other_pan_card_copy: "",
                                "contact_info_type": 2,
                            }
                        ]
                    },
                    "customer_contact_person": contact_person_data,
                };
                //console.log(setselectedFiles)
                axios.post(`${process.env.REACT_APP_BASE_APIURL}addCustomer`, data, { headers })
                    .then(response => {
                        if (response.data.success == true) {
                            props.history.push('/customer');
                            toastr.success(response.data.message);
                            this.setState({ loading: false });
                        } else {
                            props.history.push('/add-customer');
                            toastr.error(response.data.message);
                            this.setState({ loading: false });
                        }
                    })
                    .catch((error) => {
                        this.setState({ loading: false });
                        toastr.error(error.response.data.message);
                    })
            })
        }

        this.ResetCustomer = () => {
            document.getElementById("AddCustomer").reset();
        }

        this.onChange = (e) => {
            // e.persist();  
            //customer({...customer, [e.target.name]: e.target.value});

            this.setState({
                [e.target.name]: e.target.value });
        }

        this.onImageChange = (e) => {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        }

        this.createImage = (file) => {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    image: e.target.result
                })
            };
            reader.readAsDataURL(file);
        }

        // handle click event of the Add button
        this.handleAddClick = () => {
            setInputList([...inputList, {
                contact_person_name: "",
                contact_person_mobile: "",
                contact_person_email: "",
                mst_departments_id: "",
                mst_positions_id: ""
            }]);
        };

        // handle input change for Degree Details
        this.handleInputChange = (e, index) => {
            const { name, value } = e.target;
            const list = [...inputList];
            list[index][name] = value;
            setInputList(list);
        };

        // handle click event of the Remove button
        this.handleRemoveClick = index => {
            const list = [...inputList];
            list.splice(index, 1);
            setInputList(list);
        };
    }

    render() {
        const { data5, loading } = this.state;
        const { data6, loading1 } = this.state;
        const { setData, data } = this.state;
        const { setData1, data1 } = this.state;
        const { setData3, data3 } = this.state;
        const { setData4, data4 } = this.state;
        return (
            <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid"> 
                     <Form onSubmit={(e) => {
                      this.InsertCustomer(e) }} method="POST" id="AddCustomer">
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
                                            <li><button type="reset" onClick = {this.ResetCustomer} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                                        <input className="form-control" type="text" placeholder="Enter Company Name" id="example-text-input" ref="company_name" onChange={ this.onChange }/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>GST No</label>
                                                        <input className="form-control" type="text" placeholder="Enter GST No" id="example-text-input" ref="gst_no" onChange={ this.onChange }/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Contact Person Name</label>
                                                        <input className="form-control" type="text" ref="contact_person_name" placeholder="Enter Contact Person Name" onChange={ this.onChange }/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Tally Alias Name</label>
                                                        <input className="form-control" type="text"  ref="tally_alias_name" placeholder="Enter Tally Alias Name" onChange={ this.onChange }/>
                                                    </div>      
                                                </div>  
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Username</label>
                                                        <input className="form-control" type="text" ref="username" placeholder="Enter Username" onChange={ this.onChange }/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Password</label>
                                                        <input className="form-control" type="password"  ref="password" placeholder="Enter Password" onChange={ this.onChange }/>
                                                    </div>      

                                                    <div className="col-md-3">  
                                                        <label>Birth Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" ref="birth_date" onChange={ this.onChange }/>
                                                    </div>    

                                                    <div className="col-md-3">  
                                                        <label>Contact Type</label>
                                                        <select className="form-select" ref="contact_type" onChange={ this.onChange }>
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
                                                        <select className="form-select" ref="priority" onChange={ this.onChange }>
                                                            <option value="High">High</option>
                                                            <option value="Medium">Medium</option>
                                                            <option value="Low">Low</option>
                                                          
                                                        </select>
                                                    </div>  

                                                    <div className="col-md-4">  
                                                        <label>Notes</label>
                                                        <textarea ref="notes" className="form-control" placeholder="Enter Notes" onChange={ this.onChange }></textarea>
                                                    </div>   

                                                    
                                                     <div className="col-md-4">  
                                                        <label>Active/Inactive</label>
                                                        <select className="form-select" ref="status" onChange={ this.onChange }>
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
                                                        <input type="file" ref="logo" onChange={this.onImageChange}/> 
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
                                                                    <input className="form-control" type="text" ref="homestreet" placeholder="Enter Homestreet" onChange={ this.onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" ref="area" placeholder="Enter Area" onChange={ this.onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" ref="pincode" placeholder="Enter Pincode" onChange={ this.onChange }/><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="country_id" ref="country_id" onChange={ this.onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Account/Admin Contact No</label>
                                                                    <input className="form-control" type="text" ref="admin_contact" placeholder="Enter Account/Admin Contact No" onChange={ this.onChange }/><br/>
                                                                    <label>Account/Admin E-mail</label>
                                                                    <input className="form-control" type="text" ref="admin_email" placeholder="Enter Account/Admin E-mail" onChange={ this.onChange }/>
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input className="form-control" type="text" ref="homestreet2" placeholder="Enter Home Street2" onChange={ this.onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" ref="city" placeholder="Enter City" onChange={ this.onChange }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="state_id" ref="state_id" onChange={ this.onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>LandLine</label>
                                                                    <input className="form-control" type="text" ref="landline" placeholder="Enter Landline" onChange={ this.onChange }/><br/>
                                                                    <label>QC Contact No</label>
                                                                    <input className="form-control" type="text" ref="qc_contact" placeholder="Enter QC Contact No" onChange={ this.onChange }/><br/>
                                                                    <label>Pancard No</label>
                                                                    <input className="form-control" type="text" ref="pancard_no" placeholder="Enter Pancard No" onChange={ this.onChange }/>
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
                                                                    <input className="form-control" type="text" ref="street" placeholder="Enter Street" onChange={ this.onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" ref="area1" placeholder="Enter Area" onChange={ this.onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" ref="pincode1" placeholder="Enter Pincode" onChange={ this.onChange }/><br/>
                                                                    <label>Country</label>
                                                                   {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_country_id" ref="corr_country_id" onChange={ this.onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>QA Contact No</label>
                                                                    <input className="form-control" type="text" ref="qa_contact" placeholder="Enter QA Contact No" onChange={ this.onChange }/><br/>
                                                                    <label>QA E-mail</label>
                                                                    <input className="form-control" type="text" ref="qa_email" placeholder="Enter QA E-mail" onChange={ this.onChange }/>
                                                                </div> 
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" ref="street2" placeholder="Enter Street2" onChange={ this.onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" ref="city1" placeholder="Enter City" onChange={ this.onChange }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_state_id" ref="corr_state_id" onChange={ this.onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" ref="website" placeholder="Enter Website" onChange={ this.onChange }/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input className="form-control" type="text" ref="qc_email" placeholder="Enter QC E-mail" onChange={ this.onChange }/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    <input className="form-control" type="file" ref="pancard_copy" onChange={ this.onChange }/>
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
                                                        <button ref="copy_details" type="button" className="btn btn-primary form-control">Copy Details</button>
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
                                                        <textarea ref="education_details" className="form-control" placeholder="Enter Education Details" onChange={ this.onChange }></textarea>
                                                    </div>   
                                                    
                                                    <div className="col-md-6">  
                                                        <label>Prev. Details</label>
                                                        <textarea ref="prev_details" className="form-control" placeholder="Enter Previous Details" onChange={ this.onChange }></textarea>
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
                                                            <input className="form-control" type="text" placeholder="Enter VAT No" ref="vat_no" onChange={ this.onChange }/>
                                                        </div>  */}

                                                        <div className="col-md-4">
                                                            <label>TIN No</label>
                                                            <input className="form-control" type="text" placeholder="Enter TIN No" ref="tin_no" onChange={ this.onChange }/>
                                                        </div>  

                                                        <div className="col-md-4">
                                                            <label>Service Tax No</label>
                                                            <input className="form-control" type="text" ref="service_tax_no" placeholder="Enter Service Tax No" onChange={ this.onChange }/>
                                                        </div>  
                                                        {/*<div className="col-md-2">  
                                                            <label>CST No</label>
                                                            <input className="form-control" type="text"  ref="cst_no" placeholder="Enter CST No" onChange={ this.onChange }/>
                                                        </div> */}

                                                        <div className="col-md-4">  
                                                            <label>Customer Discount</label>
                                                            <input className="form-control" type="text"  ref="customer_discount" placeholder="Enter Customer Discount" onChange={ this.onChange }/>
                                                        </div>        
                                                    </div>  
                                                </div>
                                              </div>
                                        
                                        {/*<h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Contact Person</i></h5>
                                        {inputList.map((x, i) => (
                                         <React.Fragment key={x}>
                                            <div className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <label>Name</label>
                                                            <input className="form-control" type="text" placeholder="Enter Name" value={x.contact_person_name} ref="contact_person_name" onChange={e => this.handleInputChange(e, i)}/>
                                                        </div>  

                                                        <div className="col-md-2">
                                                            <label>Mobile</label>
                                                            <input className="form-control" type="text" placeholder="Enter Mobile" value={x.contact_person_mobile} ref="contact_person_mobile" onChange={e => this.handleInputChange(e, i)}/>
                                                        </div>  

                                                        <div className="col-md-3">
                                                            <label>E-mail</label>
                                                            <input className="form-control" type="text" ref="contact_person_email" value={x.contact_person_email} placeholder="Enter E-mail" onChange={e => this.handleInputChange(e, i)}/>
                                                        </div>  
                                                        <div className="col-md-2">  
                                                            <label>Department</label>
                                                            {loading1 ? <LoadingSpinner /> :  
                                                          <select className="form-select" id="mst_departments_id" ref="mst_departments_id" value={x.mst_departments_id} onChange={e => this.handleInputChange(e, i)}>
                                                             <option value="">Select Department</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select> } 
                                                        </div>  

                                                        <div className="col-md-2">  
                                                            <label>Position</label>
                                                           {loading1 ? <LoadingSpinner /> :  
                                                        <select className="form-select" id="mst_positions_id" ref="mst_positions_id" value={x.mst_positions_id} onChange={e => this.handleInputChange(e, i)}>
                                                             <option value="">Select Position</option>
                                                            { data3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>) }
                                                         </select> }
                                                        </div>   

                                                        <div className="col-md-1">  
                                                            <label style={{ visibility:'hidden' }}>Delete</label>
                                                            {inputList.length !== 1 && <button
                                                          className="mr10"
                                                          onClick={() => this.handleRemoveClick(i)} className="btn btn-primary">Delete</button>}
                                                        </div>             
                                                    </div>  
                                                </div>
                                            </div>

                                           <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center> 
                                                        <div className="col-md-2">

                                                        {inputList.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={this.handleAddClick}>Add More</button>}
                                                        
                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>   
                                        
                                        </React.Fragment>
                                        ))}*/}
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
}

export default AddCustomer