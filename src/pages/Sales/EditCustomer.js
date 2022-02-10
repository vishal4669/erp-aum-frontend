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
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const [fordata3, setForData3] = useState([]);
  const [fordata4, setForData4] = useState([]);

  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [selectedFiles, setselectedFiles] = useState(null)
  const [customer, setCustomer] = useState({ company_name: '', gst_number: '',contact_person_name:'',tally_alias_name:'',
    user_name:'',password:'',birth_date:'',contact_type:'Customer',priority:'High',notes:'',is_active:'1',logo:'',
    education_details:'',prev_details:'',company_tin_no:'',company_service_tax_no:'',company_cust_discount:'',
    company_vat_no:'',company_cst_no:''});

    const [pass, setPassword] = useState();

    const [address1, setCustomerAddress1] = useState({
    homestreet:'',homestreet2:'',area:'',city:'',pincode:'',state_id:'',country_id:'',landline:'',admin_contact:'',
    qc_contact:'',admin_email:'',pancard_no:''});

    const [address2, setCustomerAddress2] = useState({street:'',street2:'',area1:'',city1:'',pincode1:'',corr_state_id:'',
    corr_country_id:'',website:'',qa_contact:'',qc_email:'',qa_email:'',pancard_copy:''});

    const [inputList, setInputList]  = useState([{ name: "", mobile: "",
    email: "", department:"", position: ""}]);

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
         GetCustomerData();
         fetchCountry1();
        }, []);

const GetCustomerData=async()=>{
        {setLoading1(true)}
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}getCustomer/`+customer_id,{headers})
              .then(response => {
                    var cust_data = response.data.data[0];
                    setCustomer(cust_data);
                    // home address
                    setCustomerAddress1({
                      homestreet:cust_data.home_street_1,
                      homestreet2:cust_data.home_street_2,
                      area:cust_data.home_area,
                      city:cust_data.home_city,
                      pincode:cust_data.home_pin,
                      state_id:cust_data.home_state_id,
                      country_id:cust_data.home_country_id,
                      landline:cust_data.home_landline,
                      admin_contact:cust_data.home_contact_no,
                      qc_contact:cust_data.home_qc_contact_no,
                      admin_email:cust_data.home_email,
                      pancard_no:cust_data.home_pan_card
                    });  // setting Permenant address
                    setCustomerAddress2({
                      street:cust_data.other_street_1 && cust_data.other_street_1 !== "undefined" ? cust_data.other_street_1 : '',
                      street2:cust_data.other_street_2,
                      area1:cust_data.other_area,
                      city1:cust_data.other_city,
                      pincode1:cust_data.other_pin,
                      corr_state_id:cust_data.other_state_id,
                      corr_country_id:cust_data.other_country_id,
                      website:cust_data.other_website,
                      qa_contact:cust_data.other_contact_no,
                      qc_email:cust_data.other_qc_email,
                      qa_email:cust_data.other_email,
                      pancard_copy:cust_data.other_pan_card_copy
                    });
                    if(Array.isArray(cust_data.contact_person) && cust_data.contact_person.length){
                      setInputList(cust_data.contact_person);

                      var position_data = cust_data.contact_person.map(d =>
                        d.position_dropdown.map(position =>position)
                      )
                        setData3(position_data)

                      var department_data = cust_data.contact_person.map(d =>
                          d.department_dropdown.map(department =>department)
                        )
                          setData4(department_data)
                    } /*else {
                      setInputList([...inputList, { name: "", mobile: "",
                        email: "", department:"", position: ""}]);
                    }*/
                    setPassword(cust_data.password);

                  setCustomer(prevState => ({...prevState,password:base64_decode(cust_data.password)}))

                  var fetch_country_id = cust_data.home_country_id ?
                  cust_data.home_country_id : '';
                  var fetch_country_id2 = cust_data.other_country_id ?
                  cust_data.other_country_id : '';

                  if(fetch_country_id > 0){
                    console.log("here")
                    axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+fetch_country_id,{headers})
                    .then(response => {
                      if(response.data.success == true){
                        const state_data = response.data.data[0].country_wise_states.map(d => ({
                            "state_id" : d.id,
                            "state_name" : d.state_name,
                          }))
                          setData1(state_data);
                      }
                     })
                  }

                  if(fetch_country_id2 > 0){

                      axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+fetch_country_id2,{headers})
                      .then(response => {
                      if(response.data.success == true){
                          const state_data1 = response.data.data[0].country_wise_states.map(d => ({
                              "state1_id" : d.id,
                              "state_name1" : d.state_name,
                            }))
                          setData6(state_data1);
                      }
                   })
                 }
                  {setLoading1(false)};

              })
              .catch((error) => {
                  {setLoading1(false)}
                  console.log(error)
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
              })
        }

        const fetchCountry = async() => {
             {setLoading1(true)};
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}listCountries`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }
        const fetchCountry1 = async() => {
             {setLoading1(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listCountries`,{headers})
            .then(response => {
                     setData5(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

        const fetchStates = async(e) => {
          var country_id_fetch = document.getElementById('country_id').value;
          if(country_id_fetch !== null){
            setCustomerAddress1(prevState => ({ ...prevState, country_id: country_id_fetch}))
             //{setLoading1(true)};
            await axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch,{headers})
            .then(response => {
                const state_data = response.data.data[0].country_wise_states.map(d => ({
                    "state_id" : d.id,
                    "state_name" : d.state_name,
                  }))
                  setData1(state_data);
                  //{setLoading1(false)}
               })
          }
      }

      const fetchCorStates = async(e) => {
          var country_id_fetch2 = document.getElementById('corr_country_id').value;
          if(country_id_fetch2 !== null){
            setCustomerAddress2(prevState => ({ ...prevState, corr_country_id: country_id_fetch2}))
              {setLoading2(true)};
             await axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch2,{headers})
             .then(response => {
                 const state_data = response.data.data[0].country_wise_states.map(d => ({
                     "state1_id" : d.id,
                     "state_name1" : d.state_name,
                   }))
                   setData6(state_data);
                   {setLoading2(false)}
                })
          }
      }

        const fetchPosition = async() => {
             {setLoading1(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listPosition?is_dropdown=1`,{headers})
            .then(response => {
                     setForData3(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchDepartment = async() => {
             {setLoading1(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listDepartment?is_dropdown=1`,{headers})
            .then(response => {
                     setForData4(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const DeleteLogo = (e) => {
          e.preventDefault();
           setCustomer(prevState => ({ ...prevState, logo: null}))
         }
         const DeletePancard = (e) => {
           e.preventDefault();
           setCustomerAddress2(prevState => ({ ...prevState, pancard_copy: null,other_pan_card_copy:null}))
          }

       const copy_data = async() => {
         {setLoading3(true)};
        var country_id_fetch = document.getElementById("country_id").value;
        await axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch,{headers})
        .then(response => {
        const state_data1 = response.data.data[0].country_wise_states.map(d => ({
            "state1_id" : d.id,
            "state_name1" : d.state_name,
          }))
            setData6(state_data1);
            setCustomerAddress2(prevState =>({...prevState,corr_country_id:document.getElementById("country_id").value,
            corr_state_id:document.getElementById("state_id").value,area1:customer.area}))
        })

        const copy_street1 = address1.homestreet;
        const copy_street2 = address1.homestreet2;
        const copy_area = address1.area;
        const copy_city = address1.city;
        const copy_pincode = address1.pincode;
        const copy_state_id = address1.state_id;
        const copy_country_id = address1.country_id;

        //show data in textboxes / field

        /*document.CustomerData.street.value = copy_street1;
        document.CustomerData.street2.value = copy_street2;
        document.CustomerData.area1.value = copy_area;
        document.CustomerData.city1.value = copy_city;
        document.CustomerData.pincode1.value = copy_pincode;
        document.CustomerData.corr_state_id.value = copy_state_id;
        document.CustomerData.corr_country_id.value = copy_country_id;*/

        setCustomerAddress2(prevState => ({...prevState,street: copy_street1,street2:copy_street2,area1:copy_area,city1:copy_city,
        pincode1:copy_pincode,corr_state_id:copy_state_id,corr_country_id:copy_country_id}))

        // set value

        /*address2.street = document.CustomerData.street.value;
        address2.street2 = document.CustomerData.street2.value;
        address2.area1 = document.CustomerData.area1.value;
        address2.city1 = document.CustomerData.city1.value;
        address2.pincode1 = document.CustomerData.pincode1.value;
        address2.corr_state_id = document.CustomerData.corr_state_id.value;
        address2.corr_country_id = document.CustomerData.corr_country_id.value;*/

        {setLoading3(false)};
       }


const EditCustomer = async (e)=>{
         e.preventDefault();
       //const contact_person_data = inputList;
        {setLoading(true)};
        if(address1.state_id !== '' && address1.country_id == null){
          toastr.error("Home Details Country Field is Required.");
          {setLoading(false)};
          return;
        }

        if(address2.corr_state_id !== '' && address2.corr_country_id == null){
          toastr.error("Other Contact Details Country Field is Required.");
          {setLoading(false)};
          return;
        }
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
        data1.append('user_name', customer.user_name ?  customer.user_name : '');
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

        if(customer.company_cst_no !== null){
         data1.append('company_cst_no', customer.company_cst_no);
        } else {
            data1.append('company_cst_no', '');
        }

        if(customer.company_vat_no !== null){
         data1.append('company_vat_no', customer.company_vat_no);
        } else {
            data1.append('company_vat_no', '');
        }
        //Home Address Details
        data1.append('customer_contact_info[home_contact_info][0][street_1]', customer.homestreet && customer.homestreet !== null ? customer.homestreet : '');
        data1.append('customer_contact_info[home_contact_info][0][street_2]', customer.homestreet2 && customer.homestreet2 !== null ? customer.homestreet2 : '');
        data1.append('customer_contact_info[home_contact_info][0][area]', customer.area && customer.area !== null ? customer.area : '');
        data1.append('customer_contact_info[home_contact_info][0][city]', customer.city && customer.city !== null ? customer.city : '');
        data1.append('customer_contact_info[home_contact_info][0][pin]', customer.pincode && customer.pincode !== null ? customer.pincode : '');
        data1.append('customer_contact_info[home_contact_info][0][state]', customer.state_id && customer.state_id !== null ? customer.state_id : '');
        data1.append('customer_contact_info[home_contact_info][0][country]', customer.country_id && customer.country_id !== null ? customer.country_id : '');
        data1.append('customer_contact_info[home_contact_info][0][home_landline]', customer.landline && customer.landline !== null ? customer.landline : '');
        data1.append('customer_contact_info[home_contact_info][0][contact_no]', customer.admin_contact && customer.admin_contact !== null ? customer.admin_contact : '');
        data1.append('customer_contact_info[home_contact_info][0][home_qc_contact_no]', customer.qc_contact && customer.qc_contact !== null ? customer.qc_contact : '');
        data1.append('customer_contact_info[home_contact_info][0][email]', customer.admin_email && customer.admin_email !== null ? customer.admin_email : '');
        data1.append('customer_contact_info[home_contact_info][0][home_pan_card]', customer.pancard_no && customer.pancard_no !== null ? customer.pancard_no : '');
        data1.append('customer_contact_info[home_contact_info][0][contact_info_type]', 1);

        //Correspondence Address Details
        data1.append('customer_contact_info[other_contact_info][0][street_1]', customer.street && customer.street !== null ? customer.street : '');
        data1.append('customer_contact_info[other_contact_info][0][street_2]', customer.street2 && customer.street2 !== null ? customer.street2 : '');
        data1.append('customer_contact_info[other_contact_info][0][area]', customer.area1 && customer.area1 !== null ? customer.area1 : '');
        data1.append('customer_contact_info[other_contact_info][0][city]', customer.city1 && customer.city1 !== null ? customer.city1 : '');
        data1.append('customer_contact_info[other_contact_info][0][pin]', customer.pincode1 && customer.pincode1 !== null ? customer.pincode1 : '');
        data1.append('customer_contact_info[other_contact_info][0][state]', customer.corr_state_id && customer.corr_state_id !== null ? customer.corr_state_id : '');
        data1.append('customer_contact_info[other_contact_info][0][country]', customer.corr_country_id && customer.corr_country_id !== null ? customer.corr_country_id : '');
        data1.append('customer_contact_info[other_contact_info][0][other_website]', customer.website && customer.website !== null ? customer.website : '');
        data1.append('customer_contact_info[other_contact_info][0][contact_no]', customer.qa_contact && customer.qa_contact !== null ? customer.qa_contact : '');
        data1.append('customer_contact_info[other_contact_info][0][other_qc_email]', customer.qc_email && customer.qc_email !== null ? customer.qc_email : '');
        data1.append('customer_contact_info[other_contact_info][0][email]', customer.qa_email && customer.qa_email !== null ? customer.qa_email : '');
        if(selectedPanFile != false)
        {
            //console.log(selectedPanFile)
            data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', selectedPanFile);
        } else {
            if(address2.pancard_copy !== '' || address2.pancard_copy !== null && address2.pancard_copy !== undefined){
              if(address2.pancard_copy !== undefined){
                data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', address2.pancard_copy);
              } else {
                data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', '');
              }
            } else if(address2.pancard_copy == undefined){
                 data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', '');
            }
         else{
                 data1.append('customer_contact_info[other_contact_info][0][other_pan_card_copy]', '');
            }
        }
        data1.append('customer_contact_info[other_contact_info][0][contact_info_type]', 2);

         var object = {};
        inputList.forEach(function(value, key){
            object[key] = value;
        });
        var contact_person_data = JSON.stringify(object);

        data1.append('contact_person_data', contact_person_data);

      /*  for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }*/

        await axios.post( `${process.env.REACT_APP_BASE_APIURL}editCustomer/`+customer_id, data1, {headers} )
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
  setInputList([...inputList, { name: "", mobile: "",
    email: "", department:"", position: ""}]);
};

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

// handle click event of the Remove button
const handleRemoveClick = (e,index) => {
  e.preventDefault();
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
                                                        <label className="required-field">GST No</label>
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
                                                        <input className="form-control" value={customer.password} type="text"  name="password" placeholder="Enter Password" onChange={ onChange }/>
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
                                                        {customer.logo !== "null" ? <div><img src={logo_path+customer.logo} width="70px" height="50px"/> &nbsp;&nbsp;
                                                        <button className="form-control btn btn-danger btn-sm" style={{width:'20%'}} onClick={e => DeleteLogo(e)}><i className='fa fa-trash'></i>&nbsp;&nbsp;Delete</button></div> :
                                                        <span className="btn btn-primary btn-sm form-control">No Logo Available</span>
                                                        }

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
                                                                    <label>State</label>
                                                                    <select value={address1.state_id} className="form-select" id="state_id" name="state_id" onChange={ onChangeAddress1 } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.state_id} key={key} >{option.state_name}</option>) }</select><br/>
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
                                                                    <label>Country</label>
                                                                    <select value={address1.country_id} className="form-select" id="country_id" name="country_id" onChange={ onChangeAddress1 } onChange={fetchStates}>
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select><br/>
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
                                                                    <label>State</label>
                                                                    <select value={address2.corr_state_id} className="form-select" id="corr_state_id" name="corr_state_id" onChange={ onChangeAddress2 }>
                                                                    <option value="">Select State</option>
                                                                    { data6.map((option, key) => <option value={option.state1_id} key={key} >{option.state_name1}</option>) }</select><br/>
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
                                                                    <label>Country</label>
                                                                    <select value={address2.corr_country_id} className="form-select" id="corr_country_id" name="corr_country_id" onChange={ onChangeAddress2 } onChange={fetchCorStates}>
                                                                    <option value="">Select Country</option>
                                                                    { data5.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select><br/>
                                                                    <label>Website</label>
                                                                    <input value={address2.website} className="form-control" type="text" name="website" placeholder="Enter Website" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>QC E-mail</label>
                                                                    <input value={address2.qc_email} className="form-control" type="text" name="qc_email" placeholder="Enter QC E-mail" onChange={ onChangeAddress2 }/><br/>
                                                                    <label>Pancard Copy</label>
                                                                    <input className="form-control" type="file" name="pancard_copy" onChange={ changePanHandler }/>
                                                                    <input className="form-control" type="hidden" value={address2.pancard_copy}/>

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
                                                          { loading3 ? <center><LoadingSpinner /></center> : <button name="copy_details" type="button" onClick={copy_data} className="btn btn-primary form-control">Copy Details</button>}
                                                    </div>
                                                    <div className="col-md-5 align-items-center">
                                                    {address2.pancard_copy !== null ?
                                                        <a href={pancard_copy_path+address2.pancard_copy} className="btn btn-primary form-control" target="_blank">Click To Open PanCard Copy</a>
                                                    : <span className="btn btn-primary form-control">No Pancard Copy Uploaded</span>}
                                                    </div>
                                                    <div className="col-md-1">
                                                    {address2.pancard_copy !== null ?
                                                        <button className="form-control btn btn-danger btn-sm" style={{lineHeight:'29.5px'}} onClick={e => DeletePancard(e)}><i className='fa fa-trash'></i>&nbsp;&nbsp;Delete</button>
                                                    : <span className="btn btn-primary form-control">No Pancard</span>}
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
                                                        <div className="col-md-3">
                                                            <label>VAT No</label>
                                                            <input value={customer.company_vat_no} className="form-control" type="text" placeholder="Enter VAT No" name="company_vat_no" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label>TIN No</label>
                                                            <input value={customer.company_tin_no} className="form-control" type="text" placeholder="Enter TIN No" name="company_tin_no" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Service Tax No</label>
                                                            <input value={customer.company_service_tax_no} className="form-control" type="text" name="company_service_tax_no" placeholder="Enter Service Tax No" onChange={ onChange }/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label>CST No</label>
                                                            <input value={customer.company_cst_no} className="form-control" type="text"  name="company_cst_no" placeholder="Enter CST No" onChange={ onChange }/>
                                                        </div>

                                                        <div className="col-md-2">
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
                                                            <input className="form-control" type="text" placeholder="Enter Name" value={x.name} name="name" onChange={e => handleInputChange(e, i)}/>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Mobile</label>
                                                            <input className="form-control" type="text" placeholder="Enter Mobile" value={x.mobile} name="mobile" onChange={e => handleInputChange(e, i)}/>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label>E-mail</label>
                                                            <input className="form-control" type="text" name="email" value={x.email} placeholder="Enter E-mail" onChange={e => handleInputChange(e, i)}/>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label>Department</label>
                                                            {loading1 ? <LoadingSpinner /> :
                                                          <select className="form-select" id="mst_departments_id" name="department" value={x.department} onChange={e => handleInputChange(e, i)}>
                                                             <option value="">Select Department</option>
                                                            { data4[i] ? (data4[i].map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>))  :

                                                              (fordata4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>))
                                                            }
                                                        </select> }
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label>Position</label>
                                                           {loading1 ? <LoadingSpinner /> :
                                                        <select className="form-select" id="mst_positions_id" name="position" value={x.position} onChange={e => handleInputChange(e, i)}>
                                                             <option value="">Select Position</option>
                                                            { data3[i] ? (data3[i].map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>)) :
                                                              (fordata3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>))
                                                            }
                                                         </select> }
                                                        </div>

                                                        <div className="col-md-1">
                                                            <label style={{ visibility:'hidden' }}>Delete</label><br/>
                                                            {inputList.length >= 1 && <button
                                                          className="mr10"
                                                          onClick={(e) => handleRemoveClick(e,i)} className="btn btn-danger"><i class="fa fa-trash"></i></button>}
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
