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
  Table,
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
import Select from 'react-select';
import $ from 'jquery'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import moment from 'moment'

function EditBooking(props)  {
  const headers = {
        'Authorization' : "Bearer "+localStorage.getItem('token')
      }
  const url = window.location.href
  const booking_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_booking_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const[customer,setCustomer] = useState({customer_id:''})
  const[manufacturer,setManufacturer] = useState({manufacturer_id:''})
  const[supplier,setSupplier] = useState({supplier_id:''})
  const[product,setProduct] = useState({product_id:''})

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [chemist, setChemist] = useState([]);

  var date1 = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  var dateString1 = date1.toLocaleTimeString();

    const [booking1, setBooking1] = useState({booking_type:'Received',report_type:'',receipte_date:'',
      booking_no: '',aum_serial_no:'',reference_no:'',remarks:'',mfg_date:'',mfg_options:'N/S',exp_date:'',exp_options:'N/S',
      analysis_date:'',d_format:'',d_format_options:'N/S',grade: '',grade_options:'N/S',project_name:'',
      project_options:'N/S',mfg_lic_no:'',is_report_dispacthed:'0',signature:'0',verified_by:'None',nabl_scope: '0',
      cancel:'None',cancel_remarks:'',priority:'High',discipline:'Chemical',booking_group:'Drugs and Pharmaceuticals',
      statement_ofconformity:'PASS',dispatch_mode:'',dispatch_date_time:'',dispatch_details:'',invoice_date:'',invoice_no:'',
      audit_reamrks:'',remark:'',comments:'',coa_release_date:'',block:'0'});

    const [bookingSamples, setBookingSamples] = useState({batch_no:'',
    packsize:'',request_quantity:'',sample_code:'',sample_description:'',sample_quantity:'',sample_location:'',
    sample_packaging:'',sample_type:'',sampling_date_from:'',sampling_date_from_options:'N/S',
    sampling_date_to:'',sampling_date_to_options:'N/S',sample_received_through:'By Courier',chemist:'1',sample_condition:'',
    is_sample_condition:'0',batch_size_qty_rec:'',notes:'',sample_drawn_by:''});

    const [bookingSamples1, setBookingSamples1] = useState({generic_name:'',product_type:'',pharmacopeia_name:''});

      const[testData,setTestData] = useState([{parent_child:'Parent',p_sr_no:'',by_pass:'2',parent:'',product_details:'',
      test_name:'',label_claim:'',percentage_of_label_claim:'',min_limit:'',max_limit:'',result:'',label_claim_result:'',
      label_claim_unit:'',result2:'',mean:'',na_content:'',final_na_content:'',unit:'',expanded_uncertanity:'',amount:'',
      division:'',method:'',test_time:'',test_date_time:'',approval_date_time:'',approved:'Pending',chemist_name:''}])

        useEffect(() => {
                 fetchCustomerData();
                 fetchManufacturerData();
                 fetchSupplierData();
                 fetchProduct();
                 fetchPharamcopiea();
                 fetchparentList();
                 GetBookingData();
                 chemist_data();
                }, []);


    const my_style = {
    width: '120px !important',

    }

    const table_th_style = {
    minWidth: '120px',
  }

  const table_textarea_th_style = {
  minWidth: '140px',
}

      const handleAddClick = () => {
        setTestData([...testData, { parent_child:'Parent',p_sr_no:'',by_pass:'2',parent:'',product_details:'',
        test_name:'',label_claim:'',percentage_of_label_claim:'',min_limit:'',max_limit:'',result:'',label_claim_result:'',
        label_claim_unit:'',result2:'',mean:'',na_content:'',final_na_content:'',unit:'',expanded_uncertanity:'',amount:'',
        division:'',method:'',test_time:'',test_date_time:'',approval_date_time:'',approved:'Pending',chemist_name:''}]);
      };

        // handle input change for Degree Details
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...testData];
        list[index][name] = value;
        setTestData(list);

      /*  var getSecondLastData = testData.slice(-2,-1).pop();
        var getLastData = testData.slice(-1).pop();

        if(testData.length >= 2) {
          if(getLastData.parent_child === "Child"){
            var get_p_sr_no = getSecondLastData.p_sr_no;
            console.log(get_p_sr_no)

            if(get_p_sr_no.includes('.')){
              console.log(get_p_sr_no.split(".").pop())
            }

            var final_cr_no = get_p_sr_no+"."+ 1
            getLastData.p_sr_no = final_cr_no;
            document.BookingData.p_sr_no.value = final_cr_no;

            //console.log(getLastData)

            //console.log(final_cr_no)
          }

          if(getLastData.parent_child === "Parent"){
            var get_p_sr_no = getSecondLastData.p_sr_no;
            console.log(get_p_sr_no)
          }
        } else {
          getLastData.p_sr_no = "1";
          document.BookingData.p_sr_no.value = "1";
          //console.log(get_p_sr_no)
        }*/
      };

      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...testData];
        list.splice(index, 1);
        setTestData(list);
      };

      const GetBookingData=()=>{
            {setLoading1(true)}
              axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/`+booking_id,{headers})
                  .then(response => {
                      setBooking1(response.data.data);
                      setCustomer(response.data.data.customer_id)
                      setManufacturer(response.data.data.manufacturer_id)
                      setSupplier(response.data.data.supplier_id)
                      setProduct(response.data.data.samples[0].product_id)
                      setBookingSamples(response.data.data.samples[0])
                      setBookingSamples1({
                        product_type:response.data.data.samples[0].product_id.product_generic,
                        pharmacopeia_name: response.data.data.samples[0].product_id.pharmacopeia_id.pharmacopeia_name,
                        generic_name : response.data.data.samples[0].product_id.generic_product_name
                      })

                      if(response.data.data.dispatch_date_time !== null || response.data.data.dispatch_date_time !== ''){

                          var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
                          var dateString = date.toLocaleTimeString();

                          //apparently toLocaleTimeString() has a bug in Chrome. toString() however returns 12/24 hour formats. If one of two contains AM/PM execute 12 hour coding.
                          if (dateString.match(/am|pm/i) || date.toString().match(/am|pm/i) )
                          {
                            setBooking1(prevState => ({...prevState,
                              dispatch_date_time: moment(response.data.data.dispatch_date_time).format('YYYY-MM-DDTHH:mm')}))
                              //12 hour clock
                              //console.log("12 hour");
                            //  console.log(moment(response.data.data.dispatch_date_time).format('YYYY-MM-DDTHH:mm:SS'))
                          }
                          else
                          {
                              //24 hour clock
                              //console.log(moment(booking1.dispatch_date_time).format('YYYY-MM-DDTHH:MM:SS'))
                              setBooking1(prevState => ({...prevState,
                                dispatch_date_time: moment(response.data.data.dispatch_date_time).format('YYYY-MM-DDTHH:MM')}))
                            //  console.log("24 hour");
                          }
                        } else {
                          setBooking1(prevState => ({...prevState,
                            dispatch_date_time: ''}))
                        }

                      if(response.data.data.booking_type == "Report"){
                        setBooking1(prevState => ({...prevState,
                          audit_reamrks: response.data.data.audit[0].audit_remarks,
                          reason: response.data.data.audit[0].reason,
                          comments:response.data.data.audit[0].comments}))
                      }
                      setTestData(response.data.data.tests)
                      {setLoading1(false)};

                  })
                  .catch((error) => {
                      {setLoading1(false)}
                      console.log(error)
                      toastr.error(error.response.data.message);
                      this.setState({loading: false});
                  })
            }

      const onChange = (e) => {
        setBooking1({...booking1, [e.target.name]: e.target.value});

        booking1.is_report_dispacthed = document.BookingData.is_report_dispacthed.value;
        var report_dispatch_count = booking1.is_report_dispacthed

        booking1.booking_type = document.BookingData.booking_type.value;
        var chnage_booking_type = booking1.booking_type

        if(report_dispatch_count !== null){
          {
             if(report_dispatch_count == 1){
               $(".report_dispatch_yes").css("display", "block");
             } else {
               $("#dispatch_date_time").val("");
               $("#dispatch_mode").val("");
               $("#dispatch_details").val("");
               setBooking1(prevState => ({...prevState,dispatch_date_time: "",dispatch_mode: "",dispatch_details:""}))
               $(".report_dispatch_yes").css("display", "none");
             }
          }
        }

        if(chnage_booking_type !== null){
          if(chnage_booking_type == 'Invoice'){
          //  $("#invoice_date").val("");
            //$("#invoice_no").val("");
            //$(".invoice_data").remove();
            $(".invoice_data").css("display", "block");
          //  setBooking1(prevState => ({...prevState,invoice_date: "",invoice_no: ""}))
          } else {
            $("#invoice_date").val("");
            $("#invoice_no").val("");
            $(".invoice_data").css("display", "none");
            setBooking1(prevState => ({...prevState,invoice_date: "",invoice_no: ""}))
          }

          if(chnage_booking_type == 'Report'){
            $(".audit_details").css("display", "block");
          } else {
            $("#audit_reamrks").val("");
            $("#reason").val("");
            $("#comments").val("");
            setBooking1(prevState => ({...prevState,audit_reamrks: "",reason: "",comments:""}))
            $(".audit_details").css("display", "none");
          }
        }
      }

      const onChangeProductSamples = (e) => {
        setBookingSamples({...bookingSamples, [e.target.name]: e.target.value});
      }

      const onChangeProductSamplesFromDB = (e) => {
        setBookingSamples1({...bookingSamples1, [e.target.name]: e.target.value});
      }

      const changeCustomer = (e) =>{

        if(e !== null){
            if(e.value){
              setCustomer({id:e.value,company_name:e.label});
            } else {
              setCustomer({customer_id:e});
            }
          } else {
            setCustomer({customer_id:e});
          }

      }

      const changeManufacturer = (e) =>{
        //  setManufacturer({manufacturer_id: e });

        if(e !== null){
            if(e.value){
              setManufacturer({id:e.value,company_name:e.label});
            } else {
              setManufacturer({customer_id:e});
            }
          } else {
            setManufacturer({customer_id:e});
          }

      }

      const changeSupplier = (e) =>{
          //setSupplier({supplier_id: e });

          if(e !== null){
              if(e.value){
                setSupplier({id:e.value,company_name:e.label});
              } else {
                setSupplier({customer_id:e});
              }
            } else {
              setSupplier({customer_id:e});
            }
      }

      const changeProductID = (e) =>{
          //setProduct({product_id: e });

          if(e !== null){
              if(e.value){
                setProduct({id:e.value});
              } else {
                setProduct({product_id:e});
              }
            getProductData(e);
            } else {
              setProduct({product_id:e});
            }
      }

      const getProductData = (e) => {
                      var final_product_id = e.value
                      axios.get(`${process.env.REACT_APP_BASE_APIURL}getproduct/`+final_product_id,{headers})
                          .then(response => {
                            const tests_data = response.data.data.samples.map(d => ({
                                    "parent_child" : "Parent",
                                    "p_sr_no" : '',
                                    "by_pass" : d.by_pass,
                                    "parent" : d.parent.id,
                                    "product_details" : d.description,
                                    "test_name" : d.parameter.parameter_name,
                                    "label_claim" :d.label_claim,
                                    "min_limit" : d.min_limit,
                                    "max_limit" : d.max_limit,
                                    "amount": d.amount,

                                  }))
                             setTestData(tests_data)
                             setBookingSamples1({product_type:response.data.data.product_generic,
                               generic_name:response.data.data.generic.generic_product_name,
                               pharmacopeia_name: response.data.data.pharmacopeia.pharmacopeia_name
                             })

                          })
                          .catch((error) => {
                            console.log(error)
                              toastr.error(error.response.data.message);
                          })
      }

      const fetchCustomerData = () => {
                   {setLoading1(true)};
                axios.get(`${process.env.REACT_APP_BASE_APIURL}contact_type/Customer`,{headers})
                  .then(response => {
                           const options = response.data.data.map(d => ({
                              "value" : d.id,
                              "label" : d.company_name
                           }))
                           setData1(options);
                           {setLoading1(false)}
                     })
                    .catch((error) => {
                        toastr.error(error.response.data.message);
                         {setLoading1(false)}
                    })
      }

      const fetchManufacturerData = () => {
                   {setLoading1(true)};
                axios.get(`${process.env.REACT_APP_BASE_APIURL}contact_type/Manufacturer`,{headers})
                  .then(response => {
                           const options1 = response.data.data.map(d => ({
                              "value" : d.id,
                              "label" : d.company_name
                           }))

                           setData2(options1);
                           {setLoading1(false)}
                     })
                    .catch((error) => {
                        toastr.error(error.response.data.message);
                         {setLoading1(false)}
                    })
      }

      const fetchSupplierData = () => {
                   {setLoading1(true)};
                axios.get(`${process.env.REACT_APP_BASE_APIURL}contact_type/Supplier`,{headers})
                  .then(response => {
                           const options2 = response.data.data.map(d => ({
                              "value" : d.id,
                              "label" : d.company_name
                           }))
                           setData3(options2);
                           {setLoading1(false)}
                     })
                    .catch((error) => {
                        toastr.error(error.response.data.message);
                         {setLoading1(false)}
                    })
      }

        const fetchProduct = () => {
                     {setLoading1(true)};
                  axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?is_dropdown=1`,{headers})
                    .then(response => {
                             const product_option = response.data.data.map(d => ({
                                "value" : d.id,
                                "label" : d.product_name
                             }))
                             setData4(product_option);
                             {setLoading1(false)}
                       })
                      .catch((error) => {
                          toastr.error(error.response.data.message);
                           {setLoading1(false)}
                      })
                }

                const fetchPharamcopiea = () => {
                            {setLoading1(true)};
                         axios.get(`${process.env.REACT_APP_BASE_APIURL}listPharmacopeia?is_dropdown=1`,{headers})
                           .then(response => {
                                    setData(response.data.data);
                                    {setLoading1(false)}
                              })
                             .catch((error) => {
                                 toastr.error(error.response.data.message);

                                  {setLoading1(false)}
                             })
                }

                const fetchparentList = () => {
                             {setLoading1(true)};
                          axios.get(`${process.env.REACT_APP_BASE_APIURL}parentList`,{headers})
                            .then(response => {
                                     setData5(response.data.data);
                                     {setLoading1(false)}
                               })
                              .catch((error) => {
                                  toastr.error(error.response.data.message);
                                   {setLoading1(false)}
                              })
                        }


                        const chemist_data = () => {
                                     {setLoading1(true)};
                                  axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee?is_chemist=1`,{headers})
                                    .then(response => {
                                             setChemist(response.data.data);
                                             {setLoading1(false)}
                                       })
                                      .catch((error) => {
                                          toastr.error(error.response.data.message);
                                           {setLoading1(false)}
                                      })
                        }


      const UpdateBooking = (e)=>{
               e.preventDefault();
           {setLoading(true)};
               var final_customer_id = customer;
               var final_supplier_id = supplier;
               var final_manufacturer_id = manufacturer;
               var final_product_id = product;
               // Customer ID

                 if(typeof customer == "number"){
                   final_customer_id = customer.id
                 } else if(typeof customer == "object"){
                   if(customer.customer_id !== null){
                       final_customer_id = customer.id;
                   }
                  else{
                     final_customer_id = '';
                   }
                 } else {
                   final_customer_id = '';
                 }


              //Supplier ID
              if(typeof supplier == "number"){
                final_supplier_id = supplier.id
              } else if(typeof supplier == "object"){
                if(supplier.id !== null){
                    final_supplier_id = supplier.id;
                } else{
                  final_supplier_id = '';
                }

              } else {
                final_supplier_id = '';
              }

              // Manufacturer ID

              if(typeof manufacturer == "number"){
                final_manufacturer_id = manufacturer.id
              } else if(typeof manufacturer == "object"){
                if(manufacturer.id !== null){
                    final_manufacturer_id = manufacturer.id;
                } else{
                  final_manufacturer_id = '';
                }

              } else {
                final_manufacturer_id = '';
              }


              // Product ID
              if(typeof product == "number"){
                final_product_id = product.product_id
              } else if(typeof product == "object"){
                if(product.product_id !== null){
                    final_product_id = product.id;
                } else{
                  final_product_id = '';
                }

              } else {
                final_product_id = '';
              }


              const test_details = testData;


               const data = {
                   booking_type:booking1.booking_type,
                   report_type:booking1.report_type,
                   invoice_date:booking1.invoice_date,
                   invoice_no:booking1.invoice_no,
                   receipte_date:booking1.receipte_date,
                   booking_no:booking1.booking_no,
                   customer_id:final_customer_id,
                   reference_no:booking1.reference_no,
                   remarks:booking1.remarks,
                   manufacturer_id:final_manufacturer_id,
                   supplier_id:final_supplier_id,
                   mfg_date:booking1.mfg_date,
                   mfg_options:booking1.mfg_options,
                   exp_date:booking1.exp_date,
                   exp_options:booking1.exp_options,
                   analysis_date:booking1.analysis_date,
                   aum_serial_no:booking1.aum_serial_no,
                   d_format:booking1.d_format,
                   d_format_options:booking1.d_format_options,
                   grade:booking1.grade,
                   grade_options:booking1.grade_options,
                   project_name:booking1.project_name,
                   project_options:booking1.project_options,
                   mfg_lic_no:booking1.mfg_lic_no,
                   is_report_dispacthed:booking1.is_report_dispacthed,
                   dispatch_date_time:booking1.dispatch_date_time,
                   dispatch_mode : booking1.dispatch_mode,
                   dispatch_details : booking1.dispatch_details,
                   signature:booking1.signature,
                   verified_by:booking1.verified_by,
                   nabl_scope:booking1.nabl_scope,
                   cancel:booking1.cancel,
                   cancel_remarks:booking1.cancel_remarks,
                   priority:booking1.priority,
                   discipline:booking1.discipline,
                   booking_group:booking1.booking_group,
                   statement_ofconformity:booking1.statement_ofconformity,
                   coa_release_date:booking1.coa_release_date,
                   block:booking1.block,
                   "booking_sample_details":[{
                     product_id: final_product_id,
                    // product_type: bookingSamples1.product_type,
                    // pharmacopiea_id:bookingSamples1.pharmacopeia_id,
                     batch_no:bookingSamples.batch_no,
                     packsize:bookingSamples.packsize,
                     request_quantity:bookingSamples.request_quantity,
                     sample_code:bookingSamples.sample_code,
                     sample_description:bookingSamples.sample_description,
                     sample_quantity:bookingSamples.sample_quantity,
                     sample_location:bookingSamples.sample_location,
                     sample_packaging:bookingSamples.sample_packaging,
                     sample_type:bookingSamples.sample_type,
                     sampling_date_from:bookingSamples.sampling_date_from,
                     sampling_date_from_options:bookingSamples.sampling_date_from_options,
                     sampling_date_to:bookingSamples.sampling_date_to,
                     sampling_date_to_options:bookingSamples.sampling_date_to_options,
                     sample_received_through:bookingSamples.sample_received_through,
                     chemist:bookingSamples.chemist,
                     sample_condition:bookingSamples.sample_condition,
                     is_sample_condition:bookingSamples.is_sample_condition,
                     batch_size_qty_rec:bookingSamples.batch_size_qty_rec,
                     notes:bookingSamples.notes,
                     sample_drawn_by:bookingSamples.sample_drawn_by,
                   }],
                   "booking_tests": test_details,
                    "booking_audit_details": {
                        audit_remarks:booking1.audit_reamrks,
                        reason:booking1.reason,
                        comments:booking1.comments
                    }
               }

               console.log(data);

              axios.post( `${process.env.REACT_APP_BASE_APIURL}editBooking/`+booking_id, data, {headers} )

                       .then(response => {
                           if(response.data && response.data.success == true){
                               props.history.push('/booking');
                               toastr.success(response.data.message);
                               {setLoading(false)};
                           }else{
                               props.history.push('/edit-booking/'+edit_booking_id);
                               toastr.error(response.data.message);
                               {setLoading(false)};
                           }
                       })
                       .catch((error) => {
                        {setLoading(false)};
                        toastr.error(error.response.data.message);
                      })
     }

  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           UpdateBooking(e) }} method="POST" id="AddBooking" name="BookingData">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                    <li className="breadcrumb-item active">Edit Booking</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/booking" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    { loading ? <center><LoadingSpinner /></center> :
                    <li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>
                    }
                </ol>
            </div>

        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                      <h5> <Alert color="success" role="alert">
                               <i className="fa fa-comment">&nbsp;Basic Info</i>
                      </Alert></h5>

                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Booking Type</label>
                                                <select className="form-select" value={booking1.booking_type} name="booking_type" onChange={ onChange }>
                                                        <option value="Received">Received</option>
                                                      <option value="Entry">Entry</option>
                                                      <option value="Temp">Temp</option>
                                                      <option value="W">W</option>
                                                      <option value="Testing">Testing</option>
                                                      <option value="Data Fillup">Data Fillup</option>
                                                      <option value="Report">Report</option>
                                                      <option value="Dispatched">Dispatched</option>
                                                      <option value="Invoice">Invoice</option>
                                                      <option value="Cancel">Cancel</option>
                                                      </select>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Report Type</label>
                                                <select className="form-select" value={booking1.report_type} name="report_type" isOptionDisabled={(option) => option.disabled}>
                                                        <option value="">None</option>
                                                      <option value="FP">FP</option>
                                                      <option value="RM">RM</option>
                                                      <option value="OT">OT</option>
                                                      <option value="TP">TP</option>
                                                      <option value="ADL">ADL</option>
                                                      <option value="AYUSH">AYUSH</option>
                                                      </select>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Receipt Date</label>
                                                <input className="form-control" value={booking1.receipte_date} type="date" id="example-date-input" name="receipte_date" onChange={ onChange } readOnly/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Booking No</label>
                                                <input className="form-control" type="text" value={booking1.booking_no} onChange={ onChange } name="booking_no" readOnly/>
                                              </div>
                                            </div>
                                          </div>
                                      </div>

                                      {/*<div className="mb-3 row invoice_data" style={{display:'none'}}>
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-6">
                                                <label>Invoice Date</label>
                                                <input id="invoice_date" onChange={ onChange } className="form-control" type="date" name="invoice_date" placeholder="Enter Invoice Date"/>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Invoice Number</label>
                                                <input id="invoice_no" onChange={ onChange } className="form-control" type="text" name="invoice_no" placeholder="Enter Invoice Number"/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>*/}

                                      {booking1.booking_type == "Invoice" ?
                                        <div className="mb-3 row invoice_data">
                                            <div className="form-group">
                                              <div className="row">

                                                <div className="col-md-6">
                                                  <label>Invoice Date</label>
                                                  <input id="invoice_date" value={booking1.invoice_date} onChange={ onChange } className="form-control" type="date" name="invoice_date" placeholder="Enter Invoice Date"/>
                                                </div>

                                                <div className="col-md-6">
                                                  <label>Invoice Number</label>
                                                  <input id="invoice_no"  value={booking1.invoice_no} onChange={ onChange } className="form-control" type="text" name="invoice_no" placeholder="Enter Invoice Number"/>
                                                </div>

                                              </div>
                                            </div>
                                        </div>
                                      : ''
                                      }


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Customer</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select value={data1.find(obj => obj.value === customer.id)} onChange={ changeCustomer } options={data1} name="customer_id"
                                                 placeholder="Select Customer" isClearable/>}
                                               </div>

                                              <div className="col-md-4">
                                                <label>Reference No</label>
                                                <input className="form-control" type="text" name="reference_no" value={booking1.reference_no} placeholder="Enter Reference No" onChange={ onChange }/>
                                              </div>

                                              <div className="col-md-5">
                                                <label>Remarks</label>
                                                <textarea name="remarks" className="form-control" value={booking1.remarks} placeholder="Enter Remarks" onChange={ onChange }></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Manufacturer</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select value={data2.find(obj => obj.value === manufacturer.id)} onChange={ changeManufacturer } options={data2} name="manufacturer_id"
                                                 placeholder="Select Manufacturer" isClearable/>}
                                              </div>
                                              <div className="col-md-3">
                                                <label>Supplier</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select value={data3.find(obj => obj.value === supplier.id)} onChange={ changeSupplier } options={data3} name="supplier_id"
                                                 placeholder="Select Supplier" isClearable/>}
                                              </div>

                                              <div className="col-md-2">
                                                <label>Mfg Date</label>
                                                <input className="form-control" value={booking1.mfg_date} type="date" id="example-date-input" name="mfg_date" onChange={ onChange }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Mfg</label>
                                                <select name="mfg_options" value={booking1.mfg_options} className="form-select" onChange={ onChange }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Exp Date</label>
                                                <input className="form-control" value={booking1.exp_date} type="date" id="example-date-input" name="exp_date" onChange={ onChange }/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Exp</label>
                                                <select name="exp_options" value={booking1.exp_options} className="form-select" onChange={ onChange }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                      </div>

                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Date of Analysis</label>
                                                 <input onChange={ onChange } value={booking1.analysis_date} className="form-control" type="date" id="example-date-input" name="analysis_date"/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Aum Sr. No</label>
                                                   <input value={booking1.aum_serial_no} type="text" className="form-control" name="aum_serial_no" readOnly/>

                                              </div>

                                              <div className="col-md-2">
                                                <label>D Formate</label>
                                                <input value={booking1.d_format} onChange={ onChange } className="form-control" type="text" name="d_format" placeholder="Enter D Formate"/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Formate</label>
                                                <select value={booking1.d_format_options} name="d_format_options" className="form-select" onChange={ onChange }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Grade</label>
                                                <input value={booking1.grade} onChange={ onChange } className="form-control" type="text" name="grade" placeholder="Enter Grade"/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Grade</label>
                                                <select value={booking1.grade_options} onChange={ onChange } name="grade_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>
                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Project Name</label>
                                                <input value={booking1.project_name} onChange={ onChange } className="form-control" type="text" name="project_name" placeholder="Enter Project Name"/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>ProName</label>
                                                <select value={booking1.project_options} onChange={ onChange } name="project_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label> Mfg. Lic. No</label>
                                                 <input value={booking1.mfg_lic_no} onChange={ onChange } className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no"/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Is Report Dispacthed?</label>
                                                <select value={booking1.is_report_dispacthed} onChange={ onChange } name="is_report_dispacthed" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Signature?</label>
                                                <select value={booking1.signature} onChange={ onChange } name="signature" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      {/*<div className="mb-3 row report_dispatch_yes" style={{display:'none'}}>
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-4">
                                                <label>Dispatch Date Time</label>
                                                <input value={booking1.dispatch_date_time} id="dispatch_date_time" onChange={ onChange } className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time"/>
                                              </div>

                                              <div className="col-md-4">
                                                <label>Dispatch Mode</label>
                                                <select value={booking1.dispatch_mode} onChange={ onChange } name="dispatch_mode" className="form-select" id="dispatch_mode">
                                                  <option value="">Select Dispatch Mode</option>
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand Delivery">By Hand Delivery</option>
                                                  <option value="Collect by Party">Collect by Party</option>
                                                </select>

                                              </div>

                                              <div className="col-md-4">
                                                <label>Dispatch Details</label>
                                                <input value={booking1.dispatch_details} id="dispatch_details" onChange={ onChange } className="form-control" type="text" name="dispatch_details" placeholder="Enter Dispatch Details"/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>*/}

                                      {booking1.is_report_dispacthed == "1" ?
                                      <div className="mb-3 row report_dispatch_yes">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-4">
                                                <label>Dispatch Date Time</label>
                                                {booking1.dispatch_date_time?
                                                <input value={booking1.dispatch_date_time} id="dispatch_date_time" onChange={ onChange } className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time"/>
                                                : <input value={booking1.dispatch_date_time} id="dispatch_date_time" onChange={ onChange } className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time"/>}
                                              </div>

                                              <div className="col-md-4">
                                                <label>Dispatch Mode</label>
                                                <select value={booking1.dispatch_mode} onChange={ onChange } name="dispatch_mode" className="form-select" id="dispatch_mode">
                                                  <option value="">Select Dispatch Mode</option>
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand Delivery">By Hand Delivery</option>
                                                  <option value="Collect by Party">Collect by Party</option>
                                                </select>

                                              </div>

                                              <div className="col-md-4">
                                                <label>Dispatch Details</label>
                                                <input value={booking1.dispatch_details} id="dispatch_details" onChange={ onChange } className="form-control" type="text" name="dispatch_details" placeholder="Enter Dispatch Details"/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>
                                      : ''
                                      }

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Verified By</label>
                                                <select value={booking1.verified_by} onChange={ onChange } name="verified_by" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="QA">QA</option>
                                                </select>

                                              </div>

                                              <div className="col-md-2">
                                                <label>NABL Scope?</label>
                                                <select value={booking1.nabl_scope} onChange={ onChange } name="nabl_scope" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>

                                              </div>

                                              <div className="col-md-2">
                                                <label>Cancel</label>
                                                <select value={booking1.cancel} onChange={ onChange } name="cancel" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Cancel Remarks</label>
                                                <textarea value={booking1.cancel_remarks} onChange={ onChange } name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Priority</label>
                                                <select value={booking1.priority} onChange={ onChange } name="priority" className="form-select">
                                                  <option value="High">High</option>
                                                  <option value="Medium">Medium</option>
                                                  <option value="Low">Low</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Discipline</label>
                                                <select value={booking1.discipline} onChange={ onChange } name="discipline" className="form-select">
                                                  <option value="Chemical">Chemical</option>
                                                  <option value="Biological">Biological</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Group</label>
                                                <select value={booking1.booking_group} onChange={ onChange } name="booking_group" className="form-select">
                                                  <option value="Drugs and Pharmaceuticals">Drugs and Pharmaceuticals</option>
                                                  <option value="Food of Agriculture Product">Food of Agriculture Product</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Statement Of Conformity</label>
                                                <select value={booking1.statement_ofconformity} onChange={ onChange } name="statement_ofconformity" className="form-select">
                                                  <option value="PASS">PASS</option>
                                                  <option value="INDETERMINATE">INDETERMINATE</option>
                                                  <option value="FAIL">FAIL</option>
                                                </select>

                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-6">
                                                <label>COA Release Date</label>
                                                <input value={booking1.coa_release_date} id="coa_release_date" onChange={ onChange } className="form-control" type="date" name="coa_release_date" placeholder="Enter COA Release Date"/>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Block</label>
                                                <select value={booking1.block} onChange={ onChange } name="block" className="form-select">
                                                <option value="0">No</option>
                                                <option value="1">Yes</option>
                                                </select>

                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                        <h5> <Alert color="danger" role="alert">
                                            <i className="fa fa-comment">&nbsp;Sample Details</i>
                                        </Alert></h5>


                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-4">
                                                <label>Product</label>
                                                {loading1 ? <LoadingSpinner /> :<Select value={data4.find(obj => obj.value === product.id)} options={data4} name="product_id"
                                               placeholder="Select Product" onChange={ changeProductID } isClearable/>}
                                              </div>
                                              <div className="col-md-4">
                                                <label>Generic Name</label>
                                                  {loading1 ? <LoadingSpinner /> :<input className="form-control" value={bookingSamples1.generic_name} type="text" name="generic_name" readOnly/>}
                                              </div>

                                              <div className="col-md-4">
                                                <label>Product Type</label>
                                                  <input type="text" name="product_type" className="form-control" value={bookingSamples1.product_type}/>

                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Pharmacopiea</label>
                                                <input type="text" name="product_type" className="form-control" value={bookingSamples1.pharmacopeia_name}/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Batch No</label>
                                                <input className="form-control" type="text" name="batch_no" onChange={ onChangeProductSamples } value={bookingSamples.batch_no}/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Pack Size</label>
                                                <input className="form-control" type="text" name="packsize" onChange={ onChangeProductSamples } value={bookingSamples.packsize}/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Req Qty</label>
                                                <input className="form-control" type="text" name="request_quantity" onChange={ onChangeProductSamples } value={bookingSamples.request_quantity}/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Code</label>
                                                <input className="form-control" type="text" name="sample_code" onChange={ onChangeProductSamples } value={bookingSamples.sample_code}/>
                                              </div>

                                              <div className="col-md-4">
                                                <label>Sample Desc</label>
                                                <input className="form-control" type="text" name="sample_description" onChange={ onChangeProductSamples } value={bookingSamples.sample_description}/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Sample Qty</label>
                                                <input className="form-control" type="text" name="sample_quantity" onChange={ onChangeProductSamples } value={bookingSamples.sample_quantity}/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Location</label>
                                                <input className="form-control" type="text" name="sample_location"  onChange={ onChangeProductSamples } value={bookingSamples.sample_location}/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Packaging</label>
                                                <input className="form-control" type="text" name="sample_packaging" onChange={ onChangeProductSamples } value={bookingSamples.sample_packaging}/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Type</label>
                                                <input className="form-control" type="text" name="sample_type" onChange={ onChangeProductSamples } value={bookingSamples.sample_type}/>
                                              </div>


                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Sampling Date From</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_from" onChange={ onChangeProductSamples } value={bookingSamples.sampling_date_from}/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>SamplingFrom</label>
                                                <select name="sampling_date_from_options" className="form-select" onChange={ onChangeProductSamples} value={bookingSamples.sampling_date_from_options}>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sampling Date To</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_to" onChange={ onChangeProductSamples } value={bookingSamples.sampling_date_to}/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Sampling To</label>
                                                <select name="sampling_date_to_options" className="form-select" onChange={ onChangeProductSamples } value={bookingSamples.sampling_date_to_options}>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Received Through</label>
                                                <select name="sample_received_through" className="form-select" onChange={ onChangeProductSamples } value={bookingSamples.sample_received_through}>
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand">By Hand</option>
                                                  <option value="By Collection">By Collection</option>
                                                </select>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Chemist</label>
                                                <select name="chemist" className="form-select" onChange={ onChangeProductSamples } value={bookingSamples.chemist}>
                                                  <option value="1">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Condition</label>
                                                <input className="form-control" type="text" name="sample_condition" value={bookingSamples.sample_condition} placeholder="Enter Sample Condition" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>sampleconoption</label>
                                                <select name="is_sample_condition" className="form-select" onChange={ onChangeProductSamples } value={bookingSamples.is_sample_condition}>
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
                                                <label>Batch Size/ Qty Received</label>
                                                <input className="form-control" type="text" name="batch_size_qty_rec" onChange={ onChangeProductSamples } value={bookingSamples.batch_size_qty_rec}/>
                                              </div>

                                              <div className="col-md-7">
                                                <label>Notes</label>
                                                <input className="form-control" type="text" name="notes" placeholder="Enter Note" onChange={ onChangeProductSamples } value={bookingSamples.notes}/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Drawn By</label>
                                                <input className="form-control" type="text" name="sample_drawn_by" onChange={ onChangeProductSamples } value={bookingSamples.sample_drawn_by}/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

{/*Test Section Start*/}
                                      <h5> <Alert color="success" role="alert">
                                        <i className="fa fa-comment">&nbsp;Tests</i>
                                      </Alert></h5>

              {testData.map((x, i) => (
                <React.Fragment key={x}>
                        <div className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                         <div className="table-responsive">
                                                            <Table className="table mb-0 border" style={{width:'100%'}}>
                                                            <thead className="table-light">
                                                                <tr>
                                                                <th style={table_th_style}>Parent Child</th>
                                                                <th style={table_th_style}>P Sr No</th>
                                                                <th style={table_th_style}>By Pass</th>
                                                                <th style={table_th_style}>Parent</th>
                                                                <th style={table_textarea_th_style}>Product Details</th>
                                                                <th style={table_textarea_th_style}>Test Name</th>
                                                                <th style={table_th_style}>Label Claim</th>
                                                                <th style={table_th_style}>% of Label Claim</th>
                                                                <th style={table_th_style}>Min. Limit</th>
                                                                <th style={table_th_style}>Max. Limit</th>
                                                                <th style={table_th_style}>Result</th>
                                                                <th style={table_th_style}>Label Claim Result</th>
                                                                <th style={table_th_style}>Label Claim Unit</th>
                                                                <th style={table_th_style}>Result2</th>
                                                                <th style={table_th_style}>Mean</th>
                                                                <th style={table_th_style}>Na Content</th>
                                                                <th style={table_th_style}>Final Na Content</th>
                                                                <th style={table_th_style}>Unit</th>
                                                                <th style={table_th_style}>Expanded Uncertainty</th>
                                                                <th style={table_th_style}>Amount</th>
                                                                <th style={table_th_style}>Division</th>
                                                                <th style={table_th_style}>Method</th>
                                                                <th style={table_th_style}>Test Time</th>
                                                                <th style={table_th_style}>Test Date Time</th>
                                                                <th style={table_th_style}>Approval Date Time</th>
                                                                <th style={table_th_style}>Approved</th>
                                                                <th style={table_textarea_th_style}>Chemist Name</th>
                                                                <th style={{textAlign:'center'}}><i className="fa fa-trash"></i></th>
                                                                </tr>
                                                            </thead>
                                                                <tbody>
                                                                <tr>
                                                                    {/*<td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                                    <td><input type="checkbox"/></td>*/}
                                                                    <td><select name="parent_child" value={x.parent_child} onChange={e => handleInputChange(e, i)} style={my_style} className="form-select">
                                                                      <option value="Parent">Parent</option>
                                                                      <option value="Child">Child</option>
                                                                    </select></td>
                                                                    <td><input value={x.p_sr_no} type="text" onChange={e => handleInputChange(e, i)} name="p_sr_no" className="form-control"/></td>
                                                                    <td><select value={x.by_pass} onChange={e => handleInputChange(e, i)} style={my_style} className="form-select" name="by_pass"><option value="2">No</option><option value="1">Yes</option></select></td>
                                                                    <td><select value={x.parent.id} onChange={e => handleInputChange(e, i)} name="parent" className="form-select" style={{width:'100px !important'}}>
                                                                        <option value="">Select Parent</option>
                                                                         { data5.map((option, key) => <option value={option.id} key={key} >
                                                                         {option.parent_name}</option>) }
                                                                    </select></td>

                                                                  <td><textarea name="product_details" onChange={e => handleInputChange(e, i)} className="form-control" style={{width:'120px !important'}} value={x.product_details}></textarea></td>

                                                                    <td><input value={x.test_name} className="form-control" onChange={e => handleInputChange(e, i)} name="test_name" style={{width:'150px !important'}}/>
                                                                    </td>
                                                                    <td><input value={x.label_claim} type="text" name="label_claim" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    {//
                                                                    }
                                                                    <td><input value={x.percentage_of_label_claim} type="text" name="percentage_of_label_claim" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    {//end
                                                                    }

                                                                     <td><input value={x.min_limit} type="text" name="min_limit"  onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.max_limit} type="text" name="max_limit" onChange={e => handleInputChange(e, i)} className="form-control"/></td>

                                                                    {//
                                                                    }
                                                                    <td><input value={x.result} type="text" name="result" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.label_claim_result} type="text" name="label_claim_result" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.label_claim_unit} type="text" name="label_claim_unit" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.result2} type="text" name="result2" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.mean} type="text" name="mean" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.na_content} type="text" name="na_content" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.final_na_content} type="text" name="final_na_content" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.unit} type="text" name="unit" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.expanded_uncertanity} type="text" name="expanded_uncertanity" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    {//end
                                                                    }

                                                                     <td><input value={x.amount} type="text" name="amount"  onChange={e => handleInputChange(e, i)} className="form-control"/></td>

                                                                     {//
                                                                     }
                                                                     <td><input value={x.division} type="text" name="division" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                     <td><input value={x.method} type="text" name="method" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                     <td><input value={x.test_time} type="text" name="test_time" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                     <td> {x.test_date_time !== null || x.test_date_time !== '' ?
                                                                     (dateString1.match(/am|pm/i) || date1.toString().match(/am|pm/i) ?
                                                                      <input value={moment(x.test_date_time).format('YYYY-MM-DDTHH:mm')} type="datetime-local" name="test_date_time" onChange={e => handleInputChange(e, i)} className="form-control"/>
                                                                     :<input value={moment(x.test_date_time).format('YYYY-MM-DDTHH:MM')} type="datetime-local" name="test_date_time" onChange={e => handleInputChange(e, i)} className="form-control"/>)
                                                                     :
                                                                     <input value={x.test_date_time} type="time" name="test_date_time" onChange={e => handleInputChange(e, i)} className="form-control"/>
                                                                     }
                                                                     </td>
                                                                     <td> {x.approval_date_time !== null || x.approval_date_time !== '' ?
                                                                     (dateString1.match(/am|pm/i) || date1.toString().match(/am|pm/i) ?
                                                                      <input value={moment(x.approval_date_time).format('YYYY-MM-DDTHH:mm')} type="datetime-local" name="approval_date_time" onChange={e => handleInputChange(e, i)} className="form-control"/>
                                                                     :<input value={moment(x.approval_date_time).format('YYYY-MM-DDTHH:MM')} type="datetime-local" name="approval_date_time" onChange={e => handleInputChange(e, i)} className="form-control"/>)
                                                                     :
                                                                     <input value={x.approval_date_time} type="time" name="approval_date_time" onChange={e => handleInputChange(e, i)} className="form-control"/>
                                                                     }
                                                                     </td>
                                                                     <td>
                                                                       <select name="approved" className="form-select" onChange={e => handleInputChange(e, i)} value={x.approved}>
                                                                         <option value="Pending">Pending</option>
                                                                         <option value="Approved">Approved</option>
                                                                         <option value="Reject">Reject</option>
                                                                       </select>
                                                                     </td>

                                                                      <td>
                                                                        {loading1 ? <LoadingSpinner /> :
                                                                             <select className="form-select" value={x.chemist_name} name="chemist_name" onChange={e => handleInputChange(e, i)}>
                                                                                 <option value="">Select Chemist</option>
                                                                                     { chemist.map((option, key) => <option value={option.id} key={key} >
                                                                                     {option.first_name+" "+option.middle_name+" "+option.last_name}</option>) }
                                                                             </select>
                                                                         }
                                                                       </td>
                                                                     {//end
                                                                     }

                                                                     <td>{testData.length >= 1 && <button
                                                                                       className="mr10"
                                                                                       onClick={() => handleRemoveClick(i)} className="btn btn-danger"><i class="fa fa-trash"></i></button>}</td>
                                                                </tr>

                                                              </tbody>
                                                            </Table>

                                                    </div>
                                                </div>
                                            </div>

        </div>
        <div className="mb-3 row">
                               <div className="form-group">
                                   <div className="row">
                                      <center>
                                           <div className="col-md-2">

                                              {testData.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}
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

                       {testData.length === 0 && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}

                       </div>
                   </center>
                </div>
           </div>
       </div>

{/*Test Section End*/}
      {/*<h5 className="audit_details" style={{display:'none'}}> <Alert color="danger" role="alert">
          <i className="fa fa-comment">&nbsp;Audit Details</i>
      </Alert></h5>
      <div className="mb-3 row audit_details" style={{display:'none'}}>
          <div className="form-group">
            <div className="row">

              <div className="col-md-4">
                <label>Audit Remarks</label>
                <textarea name="audit_reamrks" id="audit_reamrks" className="form-control" placeholder="Enter Remarks" onChange={ onChange }></textarea>
              </div>

              <div className="col-md-4">
                <label>Reason</label>
                <textarea name="reason" id="reason" className="form-control" placeholder="Enter Reason" onChange={ onChange }></textarea>
              </div>

              <div className="col-md-4">
                <label>Comments</label>
                <textarea name="comments" id="comments" className="form-control" placeholder="Enter Comments" onChange={ onChange }></textarea>
              </div>

            </div>
          </div>
      </div>*/}

      {booking1.booking_type == "Report" ?
      <div className="audit_details">
        <h5> <Alert color="danger" role="alert">
            <i className="fa fa-comment">&nbsp;Audit Details</i>
        </Alert></h5>
        <div className="mb-3 row audit_details">
            <div className="form-group">
              <div className="row">

                <div className="col-md-4">
                  <label>Audit Remarks</label>
                  <textarea name="audit_reamrks" value={booking1.audit_reamrks} id="audit_reamrks" className="form-control" placeholder="Enter Remarks" onChange={ onChange }></textarea>
                </div>

                <div className="col-md-4">
                  <label>Reason</label>
                  <textarea name="reason" id="reason" value={booking1.reason} className="form-control" placeholder="Enter Reason" onChange={ onChange }></textarea>
                </div>

                <div className="col-md-4">
                  <label>Comments</label>
                  <textarea name="comments" id="comments" value={booking1.comments} className="form-control" placeholder="Enter Comments" onChange={ onChange }></textarea>
                </div>

              </div>
            </div>
        </div>
      </div>
      : ''
      }

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

export default EditBooking
