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
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Select from 'react-select';
import $ from 'jquery'
import { parse } from '@babel/core';
import { PassThrough } from 'stream';

import {booking_dropdown} from '../constant'

function AddBooking(props) {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);

  const [booking1, setBooking1] = useState({
    booking_type: '0',reference_no: '', remarks: '', mfg_date: '', mfg_options: '0', exp_date: '', exp_options: '0',
    analysis_date: '', d_format: '', d_format_options: '0', grade: '', grade_options: '0', project_name: '',
    project_options: '0', mfg_lic_no: '', is_report_dispacthed: '0', signature: '0', verified_by: '0', nabl_scope: '0',
    cancel: '0', cancel_remarks: '', priority: '0', discipline: '0', booking_group: '0',
    statement_ofconformity: '0', dispatch_mode: '', dispatch_date_time: '', dispatch_details: '',
    aum_serial_no : '',report_type:'',receipte_date:'', booking_no:'',ulr_no:'',generic_name: '', product_generic: '', pharmacopeia_name: ''
    ,customer_id: '',manufacturer_name:'',supplier_name:'',product_id:'',check_customer_active:'1'
    // Samples details,
    ,batch_no: '',packsize: '', request_quantity: '', sample_code: '', sample_description: '', sample_quantity: '', sample_location: '',
    sample_packaging: '', sample_type: '', sampling_date_from: '', sampling_date_from_options: '0',
    sampling_date_to: '', sampling_date_to_options: '0', sample_received_through: '0', chemist: '0', sample_condition: '',
    is_sample_condition: '0', batch_size_qty_rec: '', notes: '', sample_drawn_by: ''
  });

  const [testData, setTestData] = useState([{
    parent_child: '0', p_sr_no: '1', by_pass: '0', parent_id: '', product_details: '',
    test_id: '', label_claim: '', min_limit: '', max_limit: '', amount: '',approved:'0',assigned_date:''
  }])

  useEffect(() => {
    { setLoading1(true) };

    const axiosrequest1 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer?contact_type_customer=1&customer_type=Customer`,{headers});
    const axiosrequest2 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer?contact_type_customer=1&customer_type=Manufacturer`,{headers});
    const axiosrequest3 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer?contact_type_customer=1&customer_type=Supplier`,{headers});
    const axiosrequest4 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?is_dropdown=1`,{headers});
    const axiosrequest5 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parent=1`,{headers});
    const axiosrequest6 = axios.get(`${process.env.REACT_APP_BASE_APIURL}booking_no`,{headers});
    const axiosrequest7 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parameter=1`,{headers});

    axios.all([axiosrequest1,axiosrequest2,axiosrequest3,axiosrequest4,axiosrequest5,axiosrequest6,axiosrequest7])
      .then(axios.spread(function(res1, res2, res3, res4, res5, res6, res7) {
    if(res1){
      const options = res1.data.data.map(d => ({
        "value": d.id,
        "label": d.company_name
      }))
      setData1(options);
    }
    setData2(res2.data.data);
    setData3(res3.data.data);
    if(res4){
      const product_option = res4.data.data.map(d => ({
        "value": d.id,
        "label": d.product_name
      }))
      setData4(product_option);
    }
    setData5(res5.data.data);
    setBooking1(prevState => ({ ...prevState, aum_serial_no: res6.data.data.aum_serial_no}));
    setData6(res7.data.data)
    { setLoading1(false) };
    }));
        }, []);


  const my_style = {
    width: '120px !important',

  }

  const ResetBooking = () => {
    document.getElementById("AddBooking").reset();
  }

  const handleAddClick = (e,index) => {

    setTestData([...testData, {
      parent_child: '0', p_sr_no: '1', by_pass: '0', parent_id: '', product_details: '',
      test_id: '', label_claim: '', min_limit: '', max_limit: '', amount: '',approved:'0',assigned_date:''
    }]);

    let arr_len = testData.length;
    for (let i = 0; i < arr_len; i++) {
      var parent;
      if (i == 0) {
        if (testData[i]['parent_child'] == '0') {
          parent = 2;
          //setdata();
          setTestData([...testData, {
            parent_child: '0', p_sr_no: parent, by_pass: '0', parent_id: '', product_details: '',
            test_id: '', label_claim: '', min_limit: '', max_limit: '', amount: '',approved:'0',assigned_date:''
          }]);

        }
        else {
          testData[i]['p_sr_no'] = '';
          setTestData([...testData, {
            parent_child: '0', p_sr_no: '', by_pass: '0', parent_id: '', product_details: '',
            test_id: '', label_claim: '', min_limit: '', max_limit: '', amount: '',approved:'0',assigned_date:''
          }]);
        }
      }
      if (i >= 1) {
        if (testData[i]['parent_child'] == '0') {
          parent = parent + 1;
          //setdata();
          setTestData([...testData, {
            parent_child: '0', p_sr_no: parent, by_pass: '0', parent_id: '', product_details: '',
            test_id: '', label_claim: '', min_limit: '', max_limit: '', amount: '',approved:'0',assigned_date:''
          }]);
        }
      }


    }


  };

  // handle input change for Degree Details
  const handleInputChange = (e, index) => {
    const list = [...testData];
    if(e.target.name == "test_name"){
      list[index]["test_name"] = e.target.value;
      list[index]["test_id"] = e.target.value.split(/[ -]+/)[0];
    } else {
      const { name, value } = e.target;
      list[index][name] = value;
    }
    setTestData(list);
    if ($.isEmptyObject(testData[index + 1])) {
      console.log("No Child Available");
    }
    else {
      let x = document.getElementById(`parent_child_${index}`);
      if (x.value == "0") {
        let is_disable = $(`#parent_child_${index}`).is(':disabled');
        // console.log("target",testData.index.p_sr_no);
        if(e.target.name == 'parent_child')
        {
          toastr.error("Please delete all the Childs before changing the Child");
          $(`#parent_child_${index}`).val("1");
          testData[index]['parent_child'] = "1";
          // $(`#parent_child_${index}`).prop("disabled", true);
        }

      }
      else {
        let is_disable = $(`#parent_child_${index}`).is(':disabled');
        if(e.target.name == 'parent_child')
        {
          toastr.error("Please delete all the Childs before changing the parent");
          $(`#parent_child_${index}`).val("0");
          testData[index]['parent_child'] = "0";
          // $(`#parent_child_${index}`).prop("disabled", true);
        }
      }
    }

    let arr_len = testData.length;
    for (let i = 0; i < arr_len; i++) {
      var parent;
      if (i == 0) {
        if (testData[i]['parent_child'] == '0') {
          parent = 1;
          testData[i]['p_sr_no'] = parent;
        }
        else {
          testData[i]['p_sr_no'] = '';
        }
      }
      var arr = [];
      for (let j = 0; j < testData.length; j++) {
        arr.push({ 'parent_child': testData[j]['parent_child'] })
      }
      const lastIndexOf = (array, key) => {
        for (let x = array.length - 1; x >= 0; x--) {
          if (testData[x].parent_child === key) {
            return x;
          }
        }
        return -1;
      };
      var last_index_parent = lastIndexOf(testData, "0");
      var last_index_child = lastIndexOf(testData, "1");
      if (i >= 1) {
        if (testData[i]['parent_child'] == '0') {
          parent = parent + 1;
          testData[i]['p_sr_no'] = parent;
        }
        else {
          if (testData[i]['parent_child'] == '1') {
            if (testData[i - 1]['parent_child'] == '0') {
              testData[i]['p_sr_no'] = testData[i - 1]['p_sr_no'] + 0.1;
            }
            else {
              let index = last_index_child - 1;
              let p_sr_no_child_value = testData[index]['p_sr_no'];
              let str = p_sr_no_child_value.toString();
              let numarray = str.split('.');
              let num_val = parseInt(numarray[1]) + parseInt(1);
              let last_child_no = numarray[0] + "." + num_val;
              testData[last_index_child]['p_sr_no'] = last_child_no;
            }

          }

        }
      }
    }
    setTestData(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e.preventDefault()
    if ($.isEmptyObject(testData[index + 1])) {
      const list = [...testData];
      let x = document.getElementById(`parent_child_${index}`);
      if (x.value == "0") {
        toastr.success("Parent Element Deleted Successfully.");
        $(`#parent_child_${index}`).val("1");
        testData[index]['parent_child'] = "1";
        // $(`#parent_child_${testData.length - 2}`).removeAttr('disabled');
      }
      else {
        toastr.success("Child Element Deleted Successfully.");
        $(`#parent_child_${index}`).val("Parent");
        testData[index]['parent_child'] = "Parent";
        // $(`#parent_child_${testData.length - 2}`).removeAttr('disabled');
      }
      list.splice(index, 1);
      setTestData(list);
    } else {
      toastr.error("Delete all the Child element before deleting parent elements");
    }
  };

  const onChangeNABL = (e) => {

    if(e.target.value == "1"){
      axios.get(`${process.env.REACT_APP_BASE_APIURL}booking_no`, { headers })
          .then(response => {
            setBooking1(prevState => ({ ...prevState, ulr_no: response.data.data.ulr_no,
              nabl_scope:e.target.value}))
            $("#ulr_no").css("display","block")
          })
    } else {
      setBooking1(prevState => ({ ...prevState, ulr_no: '',nabl_scope:e.target.value}))
      $("#ulr_no").css("display","none")
    }
  }

  const onChange = (e) => {
    setBooking1(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    booking1.is_report_dispacthed = document.BookingData.is_report_dispacthed.value;
    var report_dispatch_count = booking1.is_report_dispacthed

    if (report_dispatch_count !== null) {
      {
        if (report_dispatch_count == "1") {
          $(".report_dispatch_yes").css("display", "block");
        } else {
          $("#dispatch_date_time").val("");
          $("#dispatch_mode").val("");
          $("#dispatch_details").val("");
          setBooking1(prevState => ({ ...prevState, dispatch_date_time: "", dispatch_mode: "", dispatch_details: "" }))
          $(".report_dispatch_yes").css("display", "none");
        }
      }
    }
  }

  const reporttypeonChange = (e) => {
    setBooking1(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    booking1.report_type = document.BookingData.report_type.value;
    var report_type_value = booking1.report_type

    booking1.receipte_date = document.BookingData.receipte_date.value;
    var receipte_date_value = booking1.receipte_date

    booking1.booking_type = document.BookingData.booking_type.value;
    var booking_type_value = booking1.booking_type

    if (report_type_value !== '' && receipte_date_value !== '' && booking_type_value !== '') {
      getBookingNo(booking_dropdown.report_type[booking1.report_type].label, receipte_date_value,booking_dropdown.booking_type[booking1.booking_type].label);
    }

  }

  const getBookingNo = (report_type_value, receipte_date_value, booking_type_value) => {

    axios.get(`${process.env.REACT_APP_BASE_APIURL}booking_no/` + report_type_value + "/" + receipte_date_value + "/" + booking_type_value, { headers })
      .then(response => {
        setBooking1(prevState => ({ ...prevState, booking_no: response.data.data.booking_no }));
        { setLoading1(false) }
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
        { setLoading1(false) }
      })

  }

  const changeCustomer = (e) => {
    setBooking1(prevState => ({ ...prevState, customer_id: e}));
    var customer_id = '';
    if(e !== null){
      customer_id = e.value
    }

    if(customer_id == ''){
      if($("#submit-btn").prop('disabled')){
        // it enables submit button if already disabled and customer is active
        $("#submit-btn").prop("disabled",null)
      }
    }
    axios.get(`${process.env.REACT_APP_BASE_APIURL}getCustomer/`+customer_id,{headers})
     .then(response => {
              setBooking1(prevState => ({ ...prevState, check_customer_active: response.data.data[0].is_active }));
              if(response.data.data[0].is_active == '0'){
                alert("You can't Take Booking for the Inactive Customer.")
                $("#submit-btn").attr("disabled","true")
              } if(response.data.data[0].is_active == null || response.data.data[0].is_active == '1') {
                if($("#submit-btn").prop('disabled')){
                  $("#submit-btn").prop("disabled",null)
                }
              }
        })
  }

  const changeManufacturer = (e) => {
    setBooking1(prevState => ({ ...prevState, manufacturer_name: e.target.value}));
  }

  const changeSupplier = (e) => {
    //setSupplier({ supplier_id: e });
    setBooking1(prevState => ({ ...prevState, supplier_name: e.target.value}));
  }

  const changeProductID = (e) => {
    setBooking1(prevState => ({ ...prevState, product_id: e}));
    getProductData(e);
  }

  const getProductData = (e) => {
    if(e !== null){
          var final_product_id = e.value
        var index = 0
        axios.get(`${process.env.REACT_APP_BASE_APIURL}getproduct/` + final_product_id, { headers })
          .then(response => {
            const sample_description = response.data.data[0].sample_description
            const tests_data = response.data.data[0].samples.map((d, index) => ({
              "parent_child": "0",
              "p_sr_no": index + 1,
              "by_pass": d.by_pass == 2 ? '0' : '1',
              "parent_id": d.parent,
              "product_details": d.description == '' &&  d.parameter_name && d.parameter_name.toLowerCase() == "description" ? sample_description : d.description,
              "test_id": d.mst_sample_parameter_id,
              "test_name": d.parameter_name && d.mst_sample_parameter_id ? d.mst_sample_parameter_id+" - "+ d.parameter_name : '',
              "label_claim": d.label_claim,
              "min_limit": d.min_limit,
              "max_limit": d.max_limit,
              "amount": d.amount,
              "approved":'Pending',
              "assigned_date":''

            }))
            setTestData(tests_data)
            setBooking1(prevState => ({ ...prevState, product_generic: response.data.data[0].product_generic,
            pharmacopeia_name: response.data.data[0].pharmacopeia_name,
            generic_name: response.data.data[0].generic_product_name }))
      })
      .catch((error) => {
        console.log(error)
        toastr.error(error.response.data.message);
      })
    }
  }

  const InsertBooking = (e) => {
    e.preventDefault();
   { setLoading(true) };

    var final_customer_id = booking1.customer_id;
    //var final_supplier_id = supplier;
    //var final_manufacturer_id = manufacturer;
    var final_product_id = booking1.product_id;

    // Customer ID

    /*var dispatch_date_time_final = '';

    if(booking1.dispatch_date_time !== null || booking1.dispatch_date_time !== ''){

      dispatch_date_time_final = moment(booking1.dispatch_date_time).format("YYYY-MM-DDTHH:mm");

    } else {
      dispatch_date_time_final = '';
    }*/

    //console.log(moment(booking1.dispatch_date_time).format("YYYY-MM-DDTHH:mm:ss"))

    if (typeof booking1.customer_id == "number") {
      final_customer_id = booking1.customer_id
    } else if (typeof booking1.customer_id == "object") {
      if (booking1.customer_id !== null) {
        final_customer_id = booking1.customer_id.value;
      } else {
        final_customer_id = '';
      }

    } else {
      final_customer_id = '';
    }


  /*  //Supplier ID
    if (typeof supplier == "number") {
      final_supplier_id = supplier.supplier_id
    } else if (typeof supplier == "object") {
      if (supplier.supplier_id !== null) {
        final_supplier_id = supplier.supplier_id.value;
      } else {
        final_supplier_id = '';
      }

    } else {
      final_supplier_id = '';
    }*/

   // Manufacturer ID

  /*  if (typeof manufacturer == "number") {
      final_manufacturer_id = manufacturer.manufacturer_name
    } else if (typeof manufacturer == "object") {
      if (manufacturer.manufacturer_name !== null) {
        final_manufacturer_id = manufacturer.manufacturer_name.value;
      } else {
        final_manufacturer_id = '';
      }

    } else {
      final_manufacturer_id = '';
    }

    console.log(manufacturer)*/


    // Product ID

    if (typeof booking1.product_id == "number") {
      final_product_id = booking1.product_id
    } else if (typeof booking1.product_id == "object") {
      if (booking1.product_id !== null) {
        final_product_id = booking1.product_id.value;
      } else {
        final_product_id = '';
      }

    } else {
      final_product_id = '';
    }

    var final_booking_no = ''
    if (booking1.booking_no == undefined) {
      final_booking_no = ''
    } else if (booking1.booking_no == null) {
      final_booking_no = ''
    } else {
      final_booking_no = booking1.booking_no
    }

    const test_details = testData;


    const data = {
      booking_type: booking1.booking_type,
      report_type: booking1.report_type,
      receipte_date: booking1.receipte_date,
      booking_no: final_booking_no,
      customer_id: final_customer_id,// need to add some conditions beacuse used react-select2
      reference_no: booking1.reference_no,
      remarks: booking1.remarks,
      manufacturer_id: booking1.manufacturer_name,
      supplier_id: booking1.supplier_name,
      mfg_date: booking1.mfg_date,
      mfg_options: booking1.mfg_options,
      exp_date: booking1.exp_date,
      exp_options: booking1.exp_options,
      analysis_date: booking1.analysis_date,
      aum_serial_no: booking1.aum_serial_no,
      d_format: booking1.d_format,
      d_format_options: booking1.d_format_options,
      grade: booking1.grade,
      grade_options: booking1.grade_options,
      project_name: booking1.project_name,
      project_options: booking1.project_options,
      mfg_lic_no: booking1.mfg_lic_no,
      is_report_dispacthed: booking1.is_report_dispacthed,
      dispatch_date_time: booking1.dispatch_date_time,
      dispatch_mode: booking1.dispatch_mode,
      dispatch_details: booking1.dispatch_details,
      signature: booking1.signature,
      verified_by: booking1.verified_by,
      nabl_scope: booking1.nabl_scope,
      cancel: booking1.cancel,
      cancel_remarks: booking1.cancel_remarks,
      priority: booking1.priority,
      discipline: booking1.discipline,
      booking_group: booking1.booking_group,
      statement_of_conformity: booking1.statement_ofconformity,
      ulr_no : booking1.ulr_no,
      check_customer_active : booking1.check_customer_active,
      "booking_sample_details": {
        product_id: final_product_id,// need to add some conditions beacuse used react-select2
        batch_no: booking1.batch_no,
        packsize: booking1.packsize,
        request_quantity: booking1.request_quantity,
        sample_code: booking1.sample_code,
        sample_description: booking1.sample_description,
        sample_quantity: booking1.sample_quantity,
        sample_location: booking1.sample_location,
        sample_packaging: booking1.sample_packaging,
        sample_type: booking1.sample_type,
        sampling_date_from: booking1.sampling_date_from,
        sampling_date_from_options: booking1.sampling_date_from_options,
        sampling_date_to: booking1.sampling_date_to,
        sampling_date_to_options: booking1.sampling_date_to_options,
        sample_received_through: booking1.sample_received_through,
        chemist: booking1.chemist,
        sample_condition: booking1.sample_condition,
        is_sample_condition: booking1.is_sample_condition,
        batch_size_qty_rec: booking1.batch_size_qty_rec,
        notes: booking1.notes,
        sample_drawn_by: booking1.sample_drawn_by,
      },
      "booking_tests": test_details,
    }
    console.log(data)
    axios.post(`${process.env.REACT_APP_BASE_APIURL}addBooking`, data, { headers })

      .then(response => {
        if (response.data && response.data.success == true) {
          props.history.push('/booking');
          toastr.success(response.data.message);
          { setLoading(false) };
        } else {
          props.history.push('/add-booking');
          toastr.error(response.data.message);
          { setLoading(false) };
        }
      })
      .catch((error) => {
        { setLoading(false) };
        toastr.error(error.response.data.message);
      })
  }

  return (
    <React.Fragment>
      <HorizontalLayout />
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
                  <li><button type="reset" onClick={ResetBooking} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                  &nbsp;
                  {loading ? <center><LoadingSpinner /></center> :
                    <li>
                      <button type="submit" className="btn btn-primary btn-sm" id="submit-btn"><i className="fa fa-check">&nbsp;Submit</i></button>
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
                            <select className="form-select" name="booking_type" onChange={reporttypeonChange}>
                            {booking_dropdown.booking_type.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label className="required-field">Report Type</label>
                            <select className="form-select" name="report_type" onChange={reporttypeonChange}>
                              <option value="">None</option>
                              {booking_dropdown.report_type.map((option, key) => <option value={option.id} key={key} >
                                {option.label}</option>)}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label className="required-field">Receipt Date</label>
                            <input className="form-control" type="date" id="example-date-input" name="receipte_date" onChange={reporttypeonChange} />
                          </div>
                          <div className="col-md-3">
                            <label>Booking No</label>
                            <input className="form-control" type="text" value={booking1.booking_no} onChange={onChange} name="booking_no" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="required-field">Customer</label>
                            {loading1 ? <LoadingSpinner /> : <Select onChange={changeCustomer} options={data1} name="customer_id"
                              placeholder="Select Customer" isClearable />}
                          </div>

                          <div className="col-md-4">
                            <label>Reference No</label>
                            <input className="form-control" type="text" name="reference_no" placeholder="Enter Reference No" onChange={onChange} />
                          </div>

                          <div className="col-md-5">
                            <label>Remarks</label>
                            <textarea name="remarks" className="form-control" placeholder="Enter Remarks" onChange={onChange}></textarea>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label>Manufacturer</label>

                          {/*{loading1 ? <LoadingSpinner /> : <Select onChange={changeManufacturer} options={data2} name="manufacturer_id"
                              placeholder="Select Manufacturer" isClearable />}*/}
                              <input value={booking1.manufacturer_name} onChange={changeManufacturer} name="manufacturer_name" className="form-control"
                               list="manufacturer_name" id="exampleDataList" placeholder="Type to search For Manufacturer..." autoComplete="off"/>
                               <datalist id="manufacturer_name">
                                   { data2.map((option, key) => <option data-value={option.id} value={option.company_name} key={key} >
                                     </option>) }
                                </datalist>

                          </div>
                          <div className="col-md-3">
                            <label>Supplier</label>
                            {/*{loading1 ? <LoadingSpinner /> : <Select onChange={changeSupplier} options={data3} name="supplier_id"
                              placeholder="Select Supplier" isClearable />}*/}

                              <input value={booking1.supplier_name} onChange={changeSupplier} name="supplier_name" className="form-control"
                               list="supplier_name" id="exampleDataList" placeholder="Type to search For Supplier..." autoComplete="off"/>
                               <datalist id="supplier_name">
                                   { data3.map((option, key) => <option data-value={option.id} value={option.company_name} key={key} >
                                     </option>) }
                                </datalist>
                          </div>

                          <div className="col-md-2">
                            <label className="required-field">Mfg Date</label>
                            <input className="form-control" type="date" id="example-date-input" name="mfg_date" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Mfg</label>
                            <select name="mfg_options" className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options1.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label className="required-field">Exp Date</label>
                            <input className="form-control" type="date" id="example-date-input" name="exp_date" onChange={onChange} />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Exp</label>
                            <select name="exp_options" className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options1.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
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
                            <input onChange={onChange} className="form-control" type="date" id="example-date-input" name="analysis_date" />
                          </div>
                          <div className="col-md-3">
                            <label>Aum Sr. No</label>
                            {loading1 ? <LoadingSpinner /> : <input value={booking1.aum_serial_no} type="text" className="form-control" name="aum_serial_no" readOnly />
                            }
                          </div>

                          <div className="col-md-2">
                            <label>D Formate</label>
                            <input onChange={onChange} className="form-control" type="text" name="d_format" placeholder="Enter D Formate" />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Formate</label>
                            <select name="d_format_options" className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Grade</label>
                            <input onChange={onChange} className="form-control" type="text" name="grade" placeholder="Enter Grade" />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Grade</label>
                            <select onChange={onChange} name="grade_options" className="form-select">
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
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
                            <input onChange={onChange} className="form-control" type="text" name="project_name" placeholder="Enter Project Name" />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>ProName</label>
                            <select onChange={onChange} name="project_options" className="form-select">
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-3">
                            <label> Mfg. Lic. No</label>
                            <input onChange={onChange} className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no" />
                          </div>

                          <div className="col-md-3">
                            <label>Is Report Dispacthed?</label>
                            <select onChange={onChange} name="is_report_dispacthed" className="form-select">
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-3">
                            <label>Signature?</label>
                            <select onChange={onChange} name="signature" className="form-select">
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row report_dispatch_yes" style={{ display: 'none' }}>
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-4">
                            <label>Dispatch Date Time</label>
                            <input id="dispatch_date_time" onChange={onChange} className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time" />

                          </div>

                          <div className="col-md-4">
                            <label>Dispatch Mode</label>
                            <select onChange={onChange} name="dispatch_mode" className="form-select" id="dispatch_mode">
                              <option value="">Select Dispatch Mode</option>
                              {booking_dropdown.dispatch_mode.map((option, key) => <option value={option} key={key} >
                                {option}</option>)}
                            </select>

                          </div>

                          <div className="col-md-4">
                            <label>Dispatch Details</label>
                            <input id="dispatch_details" onChange={onChange} className="form-control" type="text" name="dispatch_details" placeholder="Enter Dispatch Details" />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Verified By</label>
                            <select onChange={onChange} name="verified_by" className="form-select">
                            {booking_dropdown.verified_by.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-2">
                            <label>NABL Scope?</label>
                            <select onChange={onChangeNABL} name="nabl_scope" className="form-select">
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                            <div style={{display:'none'}} id="ulr_no"><label>ULR No : {booking1.ulr_no}</label></div>
                          </div>

                          <div className="col-md-2">
                            <label>Cancel</label>
                            <select onChange={onChange} name="cancel" className="form-select">
                            {booking_dropdown.cancel.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label>Cancel Remarks</label>
                            <textarea onChange={onChange} name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-3">
                            <label>Priority</label>
                            <select onChange={onChange} name="priority" className="form-select">
                            {booking_dropdown.priority.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-3">
                            <label>Discipline</label>
                            <select onChange={onChange} name="discipline" className="form-select">
                            {booking_dropdown.discipline.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-3">
                            <label>Group</label>
                            <select onChange={onChange} name="booking_group" className="form-select">
                            {booking_dropdown.group.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-3">
                            <label>Statement Of Conformity</label>
                            <select onChange={onChange} name="statement_ofconformity" className="form-select">
                            {booking_dropdown.statement_confirmity.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
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
                            <label className="required-field">Product</label>
                            {loading1 ? <LoadingSpinner /> : <Select options={data4} name="product_id"
                              placeholder="Select Product" onChange={changeProductID} isClearable />}
                          </div>
                          <div className="col-md-4">
                            <label>Generic Name</label>
                            {loading1 ? <LoadingSpinner /> : <input className="form-control" value={booking1.generic_name} type="text" name="generic_name" readOnly />}
                          </div>

                          <div className="col-md-4">
                            <label>Product Type</label>
                            <input type="text" name="product_type" className="form-control" value={booking1.product_generic} readOnly />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Pharmacopiea</label>
                            <input type="text" className="form-control" value={booking1.pharmacopeia_name} id="pharmocopiea" name="pharmacopeia_name" readOnly />
                          </div>

                          <div className="col-md-2">
                            <label>Batch No</label>
                            <input className="form-control" type="text" name="batch_no" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label>Pack Size</label>
                            <input className="form-control" type="text" name="packsize" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label>Req Qty</label>
                            <input className="form-control" type="text" name="request_quantity" onChange={onChange} />
                          </div>

                          <div className="col-md-2">
                            <label>Sample Code</label>
                            <input className="form-control" type="text" name="sample_code" onChange={onChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Sample Desc</label>
                            <input className="form-control" type="text" name="sample_description" onChange={onChange} />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-3">
                            <label>Sample Qty</label>
                            <input className="form-control" type="text" name="sample_quantity" onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Location</label>
                            <input className="form-control" type="text" name="sample_location" onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Packaging</label>
                            <input className="form-control" type="text" name="sample_packaging" onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Type</label>
                            <input className="form-control" type="text" name="sample_type" onChange={onChange} />
                          </div>


                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Sampling Date From</label>
                            <input className="form-control" type="date" id="example-date-input" name="sampling_date_from" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>SamplingFrom</label>
                            <select name="sampling_date_from_options" className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Sampling Date To</label>
                            <input className="form-control" type="date" id="example-date-input" name="sampling_date_to" onChange={onChange} />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Sampling To</label>
                            <select name="sampling_date_to_options" className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Sample Received Through</label>
                            <select name="sample_received_through" className="form-select" onChange={onChange}>
                            {booking_dropdown.sample_received_through.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-1">
                            <label>Chemist</label>
                            <select name="chemist" className="form-select" onChange={onChange}>
                            {booking_dropdown.chemist.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Sample Condition</label>
                            <input className="form-control" type="text" name="sample_condition" placeholder="Enter Sample Condition" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>sampleconoption</label>
                            <select name="is_sample_condition" className="form-select" onChange={onChange}>
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
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
                            <input className="form-control" type="text" name="batch_size_qty_rec" onChange={onChange} />
                          </div>

                          <div className="col-md-7">
                            <label>Notes</label>
                            <input className="form-control" type="text" name="notes" placeholder="Enter Note" onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Drawn By</label>
                            <input className="form-control" type="text" name="sample_drawn_by" onChange={onChange} />
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
                                      {testData.length > 1 ? <th style={{ textAlign: 'center' }}><i className="fa fa-trash"></i></th> : '' }
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {/*<td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                                    <td><input type="checkbox"/></td>*/}
                                      <td><select name="parent_child" onChange={e => handleInputChange(e, i)} style={my_style} id={'parent_child_' + i} className="form-select" disabled={i == 0 ?  true : false}>
                                      {booking_dropdown.parent_child.map((option, key) => <option value={option.id} key={key} >
                                        {option.label}</option>)}
                                      </select></td>
                                      <td><input value={x.p_sr_no} type="text" onChange={e => handleInputChange(e, i)} name="p_sr_no" className="form-control" readOnly /></td>
                                      <td><select value={x.by_pass} onChange={e => handleInputChange(e, i)} style={my_style} className="form-select" name="by_pass">
                                      {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                                        {option.label}</option>)}
                                      </select></td>
                                      <td>

                                      <select value={x.parent_id} onChange={e => handleInputChange(e, i)} name="parent_id" className="form-select" style={{ width: '100px !important' }}>
                                        <option value="">Select Parent</option>
                                        {data5.map((option, key) => <option value={option.id} key={key} >
                                          {option.procedure_name}</option>)}
                                      </select></td>

                                      <td><textarea value={x.product_details} name="product_details" onChange={e => handleInputChange(e, i)} className="form-control" style={{ width: '120px !important' }}></textarea></td>

                                      <td>
                                      <input class="form-control" value={x.test_name} name="test_name" list="sample_name" id="product_list"  placeholder="Type to Test Name..." onChange={e => handleInputChange(e, i)}/>
                                         <datalist id="sample_name">
                                         {data6.map((option, key) => <option value={option.id+" - "+option.procedure_name}>
                                           </option>)}
                                         </datalist>
                                    {/*  <select value={x.test_id} onChange={e => handleInputChange(e, i)} name="test_id" className="form-select" style={{ width: '150px !important' }}>
                                        <option value="">Select Test</option>
                                        {data6.map((option, key) => <option value={option.id} key={key} >
                                          {option.procedure_name}</option>)}
                                      </select>*/}

                                      </td>
                                      <td><input value={x.label_claim} type="text" name="label_claim" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.min_limit} type="text" name="min_limit" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.max_limit} type="text" name="max_limit" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.amount} type="text" name="amount" onChange={e => handleInputChange(e, i)} className="form-control" /></td>

                                      {testData.length > 1 && <td><button
                                        className="mr10"
                                        onClick={e => handleRemoveClick(e, i)} className="btn btn-danger"><i class="fa fa-trash"></i></button></td>}
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

                                  {testData.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={e => handleAddClick(e,i)}>Add More</button>}
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
