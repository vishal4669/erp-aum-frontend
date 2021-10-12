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

function AddBooking(props)  {
        const headers = {
              'Authorization' : "Bearer "+localStorage.getItem('token')
            }

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

  const [booking, setBooking] = useState({booking_no: ''});
  const [reporttype, setreportType] = useState({report_type:''});
  const [aumserialno, setaumserialno] = useState({aum_serial_no:''});

    const [booking1, setBooking1] = useState({booking_type:'Received',receipte_date:'',
      booking_no: '',reference_no:'',remarks:'',mfg_date:'',mfg_options:'N/S',exp_date:'',exp_options:'N/S',
      analysis_date:'',d_format:'',d_format_options:'N/S',grade: '',grade_options:'N/S',project_name:'',
      project_options:'N/S',mfg_lic_no:'',is_report_dispacthed:'0',signature:'0',verified_by:'None',nabl_scope: '0',
      cancel:'None',cancel_remarks:'',priority:'High',discipline:'Chemical',booking_group:'Drugs and Pharmaceuticals',
      statement_ofconformity:'PASS',dispatch_mode:'',dispatch_date_time:'',dispatch_details:'',invoice_date:'',invoice_number:'',
      audit_reamrks:'',remark:'',comments:''});

    const [bookingSamples, setBookingSamples] = useState({batch_no:'',
    packsize:'',request_quantity:'',sample_code:'',sample_description:'',sample_quantity:'',sample_location:'',
    sample_packaging:'',sample_type:'',sampling_date_from:'',sampling_date_from_options:'N/S',
    sampling_date_to:'',sampling_date_to_options:'N/S',sample_received_through:'By Courier',chemist:'1',sample_condition:'',
    is_sample_condition:'0',batch_size_qty_rec:'',notes:'',sample_drawn_by:''});

    const [bookingSamples1, setBookingSamples1] = useState({generic_name:'',product_type:'',pharmacopeia_id:''});

      const[testData,setTestData] = useState([{parent_child:'Parent',p_sr_no:'',by_pass:'2',parent:'',product_details:'',
      test_name:'',label_claim:'',min_limit:'',max_limit:'',amount:''}])

        useEffect(() => {
                 fetchCustomerData();
                 fetchManufacturerData();
                 fetchSupplierData();
                 fetchAumSrNo();
                 fetchProduct();
                 fetchPharamcopiea();
                 fetchparentList();
                }, []);

    const my_style = {
    width: '120px !important',

    }

      const ResetBooking = () => {
        document.getElementById("AddBooking").reset();
      }

      const handleAddClick = () => {
        setTestData([...testData, { parent_child:'Parent',p_sr_no:'',by_pass:'2',parent:'',product_details:'',
        test_name:'',label_claim:'',min_limit:'',max_limit:'',amount:''}]);
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
            $(".invoice_data").css("display", "block");
          } else {
            $("#invoice_date").val("");
            $("#invoice_number").val("");
            setBooking1(prevState => ({...prevState,invoice_date: "",invoice_number: ""}))
            $(".invoice_data").css("display", "none");
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

      const reporttypeonChange = (e) =>{
        setBooking({...booking, [e.target.name]: e.target.value});
        setreportType({...reporttype, [e.target.name]: e.target.value});
          //if(booking.report_type !== null){
              getBookingNo(e.target.value);
            //}
      }

      const AumSerialNoonChange = (e) =>{
        setaumserialno({...aumserialno, [e.target.name]: e.target.value});
      }

      const getBookingNo = (e) => {

        var final_report_type = e;

          axios.get(`${process.env.REACT_APP_BASE_APIURL}booking_no/`+final_report_type,{headers})
            .then(response => {
                      setBooking({booking_no:response.data.data.booking_no});
                      console.log(response.data.data)
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })

      }

      const onChangeProductSamples = (e) => {
        setBookingSamples({...bookingSamples, [e.target.name]: e.target.value});
      }

      const onChangeProductSamplesFromDB = (e) => {
        setBookingSamples1({...bookingSamples1, [e.target.name]: e.target.value});
      }

      const changeCustomer = (e) =>{
          setCustomer({customer_id: e });
        }

      const changeManufacturer = (e) =>{
          setManufacturer({manufacturer_id: e });
      }

      const changeSupplier = (e) =>{
          setSupplier({supplier_id: e });
      }

      const changeProductID = (e) =>{
          setProduct({product_id: e });

          getProductData(e);
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
                               pharmacopeia_id: response.data.data.pharmacopeia_id
                             })

                          })
                          .catch((error) => {
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


      const fetchAumSrNo = () => {
        {setLoading1(true)};
                  axios.get(`${process.env.REACT_APP_BASE_APIURL}booking_no/`+null,{headers})
                    .then(response => {
                             setaumserialno({aum_serial_no:response.data.data.aum_serial_no});
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

      const InsertBooking = (e)=>{
               e.preventDefault();
               {setLoading(true)};

               var final_customer_id = customer;
               var final_supplier_id = supplier;
               var final_manufacturer_id = manufacturer;
               var final_product_id = product;
               // Customer ID

                 if(typeof customer == "number"){
                   final_customer_id = customer.customer_id
                 } else if(typeof customer == "object"){
                   if(customer.customer_id !== null){
                       final_customer_id = customer.customer_id.value;
                   }else{
                     final_customer_id = '';
                   }

                 } else {
                   final_customer_id = '';
                 }


              //Supplier ID
              if(typeof supplier == "number"){
                final_supplier_id = supplier.supplier_id
              } else if(typeof supplier == "object"){
                if(supplier.customer_id !== null){
                    final_supplier_id = supplier.supplier_id.value;
                } else{
                  final_supplier_id = '';
                }

              } else {
                final_supplier_id = '';
              }

              // Manufacturer ID

              if(typeof manufacturer == "number"){
                final_manufacturer_id = manufacturer.manufacturer_id
              } else if(typeof manufacturer == "object"){
                if(manufacturer.customer_id !== null){
                    final_manufacturer_id = manufacturer.manufacturer_id.value;
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
                if(product.customer_id !== null){
                    final_product_id = product.product_id.value;
                } else{
                  final_product_id = '';
                }

              } else {
                final_product_id = '';
              }

              var final_booking_no = ''
              if(booking.booking_no == undefined){
                final_booking_no = ''
              } else if(booking.booking_no == null){
                  final_booking_no = ''
              } else {
                final_booking_no = booking.booking_no
              }

              const test_details = testData;


               const data = {
                   booking_type:booking1.booking_type,
                   report_type:reporttype.report_type,
                   invoice_date:booking1.invoice_date,
                   invoice_no:booking1.invoice_number,
                   receipte_date:booking1.receipte_date,
                   booking_no:final_booking_no,
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
                   aum_serial_no:aumserialno.aum_serial_no,
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
                   "booking_sample_details":[{
                     product_id: final_product_id,
                     product_type: bookingSamples1.product_type,
                     pharmacopiea_id:bookingSamples1.pharmacopeia_id,
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

              axios.post( `${process.env.REACT_APP_BASE_APIURL}addBooking`, data, {headers} )

                       .then(response => {
                           if(response.data && response.data.success == true){
                               props.history.push('/booking');
                               toastr.success(response.data.message);
                               {setLoading(false)};
                           }else{
                               props.history.push('/add-booking');
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
        <Form onSubmit={InsertBooking} method="POST" id="AddBooking" name="BookingData">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                    <li className="breadcrumb-item active">Add Booking</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/booking" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button type="reset" onClick = {ResetBooking} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :
                    <li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
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
                                                <select className="form-select" name="booking_type" onChange={ onChange }>
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
                                                <select className="form-select" name="report_type" onChange={ reporttypeonChange }>
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
                                                <input className="form-control" type="date" id="example-date-input" name="receipte_date" onChange={ onChange }/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Booking No</label>
                                                <input className="form-control" type="text" value={booking.booking_no} onChange={ onChange } name="booking_no" readOnly/>
                                              </div>
                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row invoice_data" style={{display:'none'}}>
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-6">
                                                <label>Invoice Date</label>
                                                <input id="invoice_date" onChange={ onChange } className="form-control" type="date" name="invoice_date" placeholder="Enter Invoice Date"/>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Invoice Number</label>
                                                <input id="invoice_number" onChange={ onChange } className="form-control" type="text" name="invoice_number" placeholder="Enter Invoice Number"/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Customer</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select onChange={ changeCustomer } options={data1} name="customer_id"
                                                 placeholder="Select Customer" isClearable/>}
                                               </div>

                                              <div className="col-md-4">
                                                <label>Reference No</label>
                                                <input className="form-control" type="text" name="reference_no" placeholder="Enter Reference No" onChange={ onChange }/>
                                              </div>

                                              <div className="col-md-5">
                                                <label>Remarks</label>
                                                <textarea name="remarks" className="form-control" placeholder="Enter Remarks" onChange={ onChange }></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Manufacturer</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select onChange={ changeManufacturer } options={data2} name="manufacturer_id"
                                                 placeholder="Select Manufacturer" isClearable/>}
                                              </div>
                                              <div className="col-md-3">
                                                <label>Supplier</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select onChange={ changeSupplier } options={data3} name="supplier_id"
                                                 placeholder="Select Supplier" isClearable/>}
                                              </div>

                                              <div className="col-md-2">
                                                <label>Mfg Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="mfg_date" onChange={ onChange }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Mfg</label>
                                                <select name="mfg_options" className="form-select" onChange={ onChange }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Exp Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="exp_date" onChange={ onChange }/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Exp</label>
                                                <select name="exp_options" className="form-select" onChange={ onChange }>
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
                                                 <input onChange={ onChange } className="form-control" type="date" id="example-date-input" name="analysis_date"/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Aum Sr. No</label>
                                                   {loading1 ? <LoadingSpinner /> :<input value={aumserialno.aum_serial_no} type="text" className="form-control" name="aum_serial_no" readOnly/>
                                                   }
                                              </div>

                                              <div className="col-md-2">
                                                <label>D Formate</label>
                                                <input onChange={ onChange } className="form-control" type="text" name="d_format" placeholder="Enter D Formate"/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Formate</label>
                                                <select name="d_format_options" className="form-select" onChange={ onChange }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Grade</label>
                                                <input onChange={ onChange } className="form-control" type="text" name="grade" placeholder="Enter Grade"/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Grade</label>
                                                <select onChange={ onChange } name="grade_options" className="form-select">
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
                                                <input onChange={ onChange } className="form-control" type="text" name="project_name" placeholder="Enter Project Name"/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>ProName</label>
                                                <select onChange={ onChange } name="project_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label> Mfg. Lic. No</label>
                                                 <input onChange={ onChange } className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no"/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Is Report Dispacthed?</label>
                                                <select onChange={ onChange } name="is_report_dispacthed" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Signature?</label>
                                                <select onChange={ onChange } name="signature" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row report_dispatch_yes" style={{display:'none'}}>
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-4">
                                                <label>Dispatch Date Time</label>
                                                <input id="dispatch_date_time" onChange={ onChange } className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time"/>
                                              </div>

                                              <div className="col-md-4">
                                                <label>Dispatch Mode</label>
                                                <select onChange={ onChange } name="dispatch_mode" className="form-select" id="dispatch_mode">
                                                  <option value="">Select Dispatch Mode</option>
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand Delivery">By Hand Delivery</option>
                                                  <option value="Collect by Party">Collect by Party</option>
                                                </select>

                                              </div>

                                              <div className="col-md-4">
                                                <label>Dispatch Details</label>
                                                <input id="dispatch_details" onChange={ onChange } className="form-control" type="text" name="dispatch_details" placeholder="Enter Dispatch Details"/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Verified By</label>
                                                <select onChange={ onChange } name="verified_by" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="QA">QA</option>
                                                </select>

                                              </div>

                                              <div className="col-md-2">
                                                <label>NABL Scope?</label>
                                                <select onChange={ onChange } name="nabl_scope" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>

                                              </div>

                                              <div className="col-md-2">
                                                <label>Cancel</label>
                                                <select onChange={ onChange } name="cancel" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Cancel Remarks</label>
                                                <textarea onChange={ onChange } name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Priority</label>
                                                <select onChange={ onChange } name="priority" className="form-select">
                                                  <option value="High">High</option>
                                                  <option value="Medium">Medium</option>
                                                  <option value="Low">Low</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Discipline</label>
                                                <select onChange={ onChange } name="discipline" className="form-select">
                                                  <option value="Chemical">Chemical</option>
                                                  <option value="Biological">Biological</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Group</label>
                                                <select onChange={ onChange } name="booking_group" className="form-select">
                                                  <option value="Drugs and Pharmaceuticals">Drugs and Pharmaceuticals</option>
                                                  <option value="Food of Agriculture Product">Food of Agriculture Product</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Statement Of Conformity</label>
                                                <select onChange={ onChange } name="statement_ofconformity" className="form-select">
                                                  <option value="PASS">PASS</option>
                                                  <option value="INDETERMINATE">INDETERMINATE</option>
                                                  <option value="FAIL">FAIL</option>
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
                                                {loading1 ? <LoadingSpinner /> :<Select options={data4} name="product_id"
                                               placeholder="Select Product" onChange={ changeProductID } isClearable/>}
                                              </div>
                                              <div className="col-md-4">
                                                <label>Generic Name</label>
                                                  {loading1 ? <LoadingSpinner /> :<input className="form-control" value={bookingSamples1.generic_name} type="text" name="generic_name" readOnly/>}
                                              </div>

                                              <div className="col-md-4">
                                                <label>Product Type</label>
                                                  {loading1 ? <LoadingSpinner /> :<select name="product_type" className="form-select" onChange={ onChangeProductSamplesFromDB } value={bookingSamples1.product_type}>
                                                  <option value="Finished Product">Finished Product</option>
                                                  <option value="Raw Material">Raw Material</option>
                                                  <option value="Other">Other</option>
                                                </select>}
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Pharmacopiea</label>
                                                {loading1 ? <LoadingSpinner /> :
                                                    <select className="form-select" value={bookingSamples1.pharmacopeia_id} id="pharmocopiea" name="pharmacopeia_id" onChange={ onChangeProductSamplesFromDB }>
                                                        <option value="">Select Pharmocopiea</option>
                                                            { data.map((option, key) => <option value={option.id} key={key} >
                                                            {option.pharmacopeia_name}</option>) }
                                                    </select>
                                                }
                                              </div>

                                              <div className="col-md-2">
                                                <label>Batch No</label>
                                                <input className="form-control" type="text" name="batch_no" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Pack Size</label>
                                                <input className="form-control" type="text" name="packsize" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Req Qty</label>
                                                <input className="form-control" type="text" name="request_quantity" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Code</label>
                                                <input className="form-control" type="text" name="sample_code" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-4">
                                                <label>Sample Desc</label>
                                                <input className="form-control" type="text" name="sample_description" onChange={ onChangeProductSamples }/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Sample Qty</label>
                                                <input className="form-control" type="text" name="sample_quantity" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Location</label>
                                                <input className="form-control" type="text" name="sample_location"  onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Packaging</label>
                                                <input className="form-control" type="text" name="sample_packaging" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Type</label>
                                                <input className="form-control" type="text" name="sample_type" onChange={ onChangeProductSamples }/>
                                              </div>


                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Sampling Date From</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_from" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>SamplingFrom</label>
                                                <select name="sampling_date_from_options" className="form-select" onChange={ onChangeProductSamples }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sampling Date To</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_to" onChange={ onChangeProductSamples }/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Sampling To</label>
                                                <select name="sampling_date_to_options" className="form-select" onChange={ onChangeProductSamples }>
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Received Through</label>
                                                <select name="sample_received_through" className="form-select" onChange={ onChangeProductSamples }>
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand">By Hand</option>
                                                  <option value="By Collection">By Collection</option>
                                                </select>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Chemist</label>
                                                <select name="chemist" className="form-select" onChange={ onChangeProductSamples }>
                                                  <option value="1">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Condition</label>
                                                <input className="form-control" type="text" name="sample_condition" placeholder="Enter Sample Condition" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>sampleconoption</label>
                                                <select name="is_sample_condition" className="form-select" onChange={ onChangeProductSamples }>
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
                                                <input className="form-control" type="text" name="batch_size_qty_rec" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-7">
                                                <label>Notes</label>
                                                <input className="form-control" type="text" name="notes" placeholder="Enter Note" onChange={ onChangeProductSamples }/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Drawn By</label>
                                                <input className="form-control" type="text" name="sample_drawn_by" onChange={ onChangeProductSamples }/>
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
                                                            <Table className="table mb-0 border">
                                                            <thead className="table-light">
                                                                <tr>
                                                                <th>Parent Child</th>
                                                                <th>P Sr No</th>
                                                                <th>By Pass</th>
                                                                <th>Parent</th>
                                                                <th>Product Details</th>
                                                                <th>Test Name</th>
                                                                <th>Label Claim</th>
                                                                <th>Min.Limit</th>
                                                                <th>Max.Limit</th>
                                                                <th>Amount</th>
                                                                <th style={{textAlign:'center'}}><i className="fa fa-trash"></i></th>
                                                                </tr>
                                                            </thead>
                                                                <tbody>
                                                                <tr>
                                                                    {/*<td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                                    <td><input type="checkbox"/></td>*/}
                                                                    <td><select name="parent_child" onChange={e => handleInputChange(e, i)} style={my_style} className="form-select">
                                                                      <option value="Parent">Parent</option>
                                                                      <option value="Child">Child</option>
                                                                    </select></td>
                                                                    <td><input type="text" onChange={e => handleInputChange(e, i)} name="p_sr_no" className="form-control"/></td>
                                                                    <td><select value={x.by_pass} onChange={e => handleInputChange(e, i)} style={my_style} className="form-select" name="by_pass"><option value="2">No</option><option value="1">Yes</option></select></td>
                                                                    <td><select value={x.parent} onChange={e => handleInputChange(e, i)} name="parent" className="form-select" style={{width:'100px !important'}}>
                                                                        <option value="">Select Parent</option>
                                                                         { data5.map((option, key) => <option value={option.id} key={key} >
                                                                         {option.parent_name}</option>) }
                                                                    </select></td>

                                                                  <td><textarea name="product_details" onChange={e => handleInputChange(e, i)} className="form-control" style={{width:'120px !important'}} value={x.product_details}></textarea></td>

                                                                    <td><input value={x.test_name} className="form-control" onChange={e => handleInputChange(e, i)} name="test_name" style={{width:'150px !important'}}/>
                                                                    </td>
                                                                    <td><input value={x.label_claim} type="text" name="label_claim" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                     <td><input value={x.min_limit} type="text" name="min_limit"  onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                    <td><input value={x.max_limit} type="text" name="max_limit" onChange={e => handleInputChange(e, i)} className="form-control"/></td>
                                                                     <td><input value={x.amount} type="text" name="amount"  onChange={e => handleInputChange(e, i)} className="form-control"/></td>

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
      <h5 className="audit_details" style={{display:'none'}}> <Alert color="danger" role="alert">
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

export default AddBooking
