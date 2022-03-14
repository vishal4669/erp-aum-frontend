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
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {booking_dropdown} from '../constant'

function EditBooking(props) {

  const headers = {
           'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }
const th_style = {
    whiteSpace: 'nowrap'
}

  const url = window.location.href
  const booking_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_booking_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  //parent dropdown from get api
  const [data5, setData5] = useState([]);
  //parent dropdown on click of add more
  const [fordata5, forsetData5] = useState([]);
  //test dropdown from get api
  const [data6, setData6] = useState([]);
  //test dropdown on click of add more
  const [fordata6, forsetData6] = useState([]);
  //unit dropdown from get api
  const [data7, setData7] = useState([]);
  //unit dropdown on click of add more
  const [fordata7, forsetData7] = useState([]);
  //chemist dropdown from get api
  const [data8, setData8] = useState([]);
  //chemist dropdown on click of add more
  const [fordata8, forsetData8] = useState([]);
  //method dropdown from get api
  const [data9, setData9] = useState([]);
  //method dropdown on click of add more
  const [fordata9, forsetData9] = useState([]);

  const [booking1, setBooking1] = useState({
    booking_type: '0',reference_no: '', remarks: '', mfg_date: '', mfg_options: '0', exp_date: '', exp_options: '0',
    analysis_date: '', d_format: '', d_format_options: '0', grade: '', grade_options: '0', project_name: '',
    project_options: '0', mfg_lic_no: '', is_report_dispacthed: '0', signature: '0', verified_by: '0', nabl_scope: '0',
    cancel: '0', cancel_remarks: '', priority: '0', discipline: '0', booking_group: '0',
    statement_ofconformity: '0', dispatch_mode: '', dispatch_date_time: '', dispatch_details: '',
    aum_serial_no : '',report_type:'',receipte_date:'', booking_no:'',ulr_no:'',generic_name: '', product_generic: '', pharmacopeia_name: ''
    ,customer_id: '',manufacturer_name:'',supplier_name:'',invoice_no:'',invoice_date:'',coa_print_count:'',block:'0',
    // Samples details,
    product_id:'',batch_no: '',packsize: '', request_quantity: '', sample_code: '', sample_description: '', sample_quantity: '', sample_location: '',
    sample_packaging: '', sample_type: '', sampling_date_from: '', sampling_date_from_options: '0',
    sampling_date_to: '', sampling_date_to_options: '0', sample_received_through: '0', chemist: '0', sample_condition: '',
    is_sample_condition: '0', batch_size_qty_rec: '', notes: '', sample_drawn_by: '',
    // audit details,
    audit_reamrks: '',reason:'',comments:''
  });

  const[getUlrno,setUlrNo] = useState({check_ulr_no:''})

// test data of particular selected product
  const [testData, setTestData] = useState([{
    parent_child: '0', p_sr_no: '1', by_pass: '0', parent: '', product_details: '',
    test_id: '', label_claim: '', label_claim_percentage : '0',min_limit: '', max_limit: '',
    result: '', label_claim_result: '', label_claim_unit : '',result2: '', mean: '',
    na_content: '', final_na_content: '', unit : '',expanded_uncertainty: '',
    amount: '',division: '', method: '', test_time : '',test_date_time: '',approval_date_time:'',
    approved:'0',chemist_id:'',assigned_date:''
  }])

  useEffect(() => {
    { setLoading1(true) };

    const axiosrequest1 = axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/`+booking_id,{headers});
    const axiosrequest2 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listUnit?is_dropdown=1`,{headers});
    const axiosrequest3 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee?is_chemist=1`,{headers});
    const axiosrequest4 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listMethod?is_dropdown=1`,{headers});
    const axiosrequest5 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parent=1`,{headers});
    const axiosrequest7 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parameter=1`,{headers});

    axios.all([axiosrequest1,axiosrequest2,axiosrequest3,axiosrequest4,axiosrequest5,axiosrequest7])
      .then(axios.spread(function(res1, res2, res3, res4,res5, res7) {
        //setting customer dropdown data
        if(res1){
          const options = res1.data.data[0].customer_dropdown.map(d => ({
            "value": d.id,
            "label": d.company_name
          }))
          setData1(options);
          // setting manufacturer dropdown data
          setData2(res1.data.data[0].manufacturer_dropdown);
          // setting supplier dropdown data
          setData3(res1.data.data[0].supplier_dropdown);
          //setting product dropdown data
          if(res1){
            const product_option = res1.data.data[0].samples.product_dropdown.map(d => ({
              "value": d.id,
              "label": d.product_name
            }))
            setData4(product_option);
          }
        }

        var booking_data = res1.data.data[0]
        // find numeric value for selected options form constant
        var get_booking_type = booking_dropdown.booking_type.find((book) => book.label.includes(res1.data.data[0].booking_type));
        var get_report_type = booking_dropdown.report_type.find((book) => book.label.includes(res1.data.data[0].report_type));
        var get_mfg_options = booking_dropdown.common_options1.find((book) => book.label.includes(res1.data.data[0].mfg_options));
        var get_exp_options = booking_dropdown.common_options1.find((book) => book.label.includes(res1.data.data[0].exp_options));
        var get_d_format_options = booking_dropdown.common_options2.find((book) => book.label.includes(res1.data.data[0].d_format_options));
        var get_grade_options = booking_dropdown.common_options2.find((book) => book.label.includes(res1.data.data[0].grade_options));
        var get_project_options = booking_dropdown.common_options2.find((book) => book.label.includes(res1.data.data[0].project_options));
        var get_is_report_dispacthed = booking_dropdown.yes_no_options.find((book) => book.label.includes(res1.data.data[0].is_report_dispacthed));
        var get_signature = booking_dropdown.yes_no_options.find((book) => book.label.includes(res1.data.data[0].signature));
        var get_verified_by = booking_dropdown.verified_by.find((book) => book.label.includes(res1.data.data[0].verified_by));
        var get_nabl_scope = booking_dropdown.yes_no_options.find((book) => book.label.includes(res1.data.data[0].nabl_scope));
        var get_cancel = booking_dropdown.cancel.find((book) => book.label.includes(res1.data.data[0].cancel));
        var get_priority = booking_dropdown.priority.find((book) => book.label.includes(res1.data.data[0].priority));
        var get_discipline = booking_dropdown.discipline.find((book) => book.label.includes(res1.data.data[0].discipline));
        var get_booking_group = booking_dropdown.group.find((book) => book.label.includes(res1.data.data[0].booking_group));
        var get_statement_ofconformity = booking_dropdown.statement_confirmity.find((book) => book.label.includes(res1.data.data[0].statement_of_conformity));

        var get_sampling_date_to_options = booking_dropdown.common_options2.find((book) => book.label.includes(res1.data.data[0].samples.sampling_date_to_options));
        var get_sampling_date_from_options = booking_dropdown.common_options2.find((book) => book.label.includes(res1.data.data[0].samples.sampling_date_from_options));
        var get_sample_received_through = booking_dropdown.sample_received_through.find((book) => book.label.includes(res1.data.data[0].samples.sample_received_through));
        var get_chemist = booking_dropdown.chemist.find((book) => book.label.includes(res1.data.data[0].samples.chemist));
        var get_is_sample_condition = booking_dropdown.yes_no_options.find((book) => book.label.includes(res1.data.data[0].samples.is_sample_condition));
        var get_block = booking_dropdown.yes_no_options.find((book) => book.label.includes(res1.data.data[0].block));

        // set just ulr no
        setUlrNo({check_ulr_no:booking_data.ulr_no})

        // setting booking and samples data
        setBooking1({
          // Booking Basic info
          booking_type : get_booking_type.id,//
          report_type : get_report_type.id,//
          receipte_date : booking_data.receipte_date ? booking_data.receipte_date : '',
          booking_no : booking_data.booking_no,
          customer_id : booking_data.customer_id,
          reference_no : booking_data.reference_no,
          remarks : booking_data.remarks,
          manufacturer_name : booking_data.manufaturer_company_name,
          supplier_name : booking_data.supplier_company_name,
          mfg_date : booking_data.mfg_date ? booking_data.mfg_date : '',
          mfg_options : get_mfg_options.id, //
          exp_date : booking_data.exp_date ? booking_data.exp_date : '',
          exp_options : get_exp_options.id,//
          analysis_date : booking_data.analysis_date ? booking_data.analysis_date : '',
          aum_serial_no : booking_data.aum_serial_no,
          d_format : booking_data.d_format,
          d_format_options : get_d_format_options.id,//
          grade : booking_data.grade,
          grade_options : get_grade_options.id,//
          project_name : booking_data.project_name,
          project_options : get_project_options.id,//
          mfg_lic_no : booking_data.mfg_lic_no,
          is_report_dispacthed : get_is_report_dispacthed.id,//
          signature : get_signature.id,//
          verified_by : get_verified_by.id,//
          nabl_scope :get_nabl_scope.id,//
          cancel : get_cancel.id, //
          cancel_remarks : booking_data.cancel_remarks,
          priority : get_priority.id,//
          discipline : get_discipline.id,//
          booking_group : get_booking_group.id,//
          statement_ofconformity : get_statement_ofconformity ? get_statement_ofconformity.id : '0',//
          ulr_no : booking_data.ulr_no,
          dispatch_date_time : booking_data.dispatch_date_time ? booking_data.dispatch_date_time : '',
          dispatch_mode : booking_data.dispatch_mode,//
          dispatch_details : booking_data.dispatch_details,
          coa_print_count : booking_data.coa_print_count,
          block: get_block ? get_block.id : '0', //
          // Sample Details

          product_id:booking_data.samples.product_id,
          batch_no: booking_data.samples.batch_no,
          packsize: booking_data.samples.packsize,
          request_quantity: booking_data.samples.request_quantity,
          sample_code: booking_data.samples.sample_code,
          sample_description: booking_data.samples.sample_description,
          sample_quantity: booking_data.samples.sample_quantity,
          sample_location: booking_data.samples.sample_location,
          sample_packaging: booking_data.samples.sample_packaging,
          sample_type: booking_data.samples.sample_type,
          sampling_date_from: booking_data.samples.sampling_date_from ?  booking_data.samples.sampling_date_from: '',
          sampling_date_from_options: get_sampling_date_from_options.id,//
          sampling_date_to: booking_data.samples.sampling_date_to ?  booking_data.samples.sampling_date_to : '',
          sampling_date_to_options: get_sampling_date_to_options.id,//
          sample_received_through: get_sample_received_through.id,//
          chemist: get_chemist.id,
          sample_condition: booking_data.samples.sample_condition,
          is_sample_condition: get_is_sample_condition.id,//
          batch_size_qty_rec: booking_data.samples.batch_size_qty_rec,
          notes: booking_data.samples.notes,
          sample_drawn_by: booking_data.samples.sample_drawn_by,

          // audit Details
          audit_reamrks : booking_data.audit_reamrks,
          reason: booking_data.reason,
          comments : booking_data.comments,
        })

        if(booking_data.is_report_dispacthed == "Yes"){
          $(".report_dispatch_yes").css("display","block")
        }
        if(booking_data.nabl_scope == "Yes"){
          $("#ulr_no").css("display","block")
        }

        // setting add tests for booking of selected product
        if(Array.isArray(res1.data.data[0].tests) && res1.data.data[0].tests.length)
        {

          // set Test Data
          const tests_data_edit = res1.data.data[0].tests.map((d, index) => ({
            parent_child: d.parent_child == "Parent" ? '0' : '1',//
            p_sr_no: d.p_sr_no,
            by_pass: d.by_pass == "No" ? '0' : '1', //
            parent: d.parent,
            product_details: d.product_details,
            test_id: d.test_id,
            label_claim: d.label_claim,
            label_claim_percentage : d.label_claim_percentage,
            min_limit: d.min_limit,
            max_limit: d.max_limit,
            result: d.result,
            label_claim_result: d.label_claim_result,
            label_claim_unit : d.label_claim_unit,
            result2: d.result2,
            mean: d.mean,
            na_content: d.na_content,
            final_na_content: d.final_na_content,
            unit : d.unit,
            expanded_uncertainty: d.expanded_uncertainty,
            amount: d.amount,
            division: d.division,
            method: d.method,
            test_time : d.test_time,
            test_date_time: d.test_date_time,
            approval_date_time:d.approval_date_time,
            approved:d.approved,
            chemist_id:d.chemist_id,
            assigned_date:d.assigned_date
          }))

          setTestData(tests_data_edit)

            // parent dropdown form get
            var parent_data = res1.data.data[0].tests.map(d =>
              d.parent_dropdown.map(parent =>parent)
            )

            setData5(parent_data);

            // test dropdown from get
            var test_dropown = res1.data.data[0].tests.map(d =>
              d.test_dropdown.map(test =>test)
            )

            setData6(test_dropown);

            // unit dropdown from get
            var unit_dropown = res1.data.data[0].tests.map(d =>
              d.unit_dropdown.map(unit =>unit)
            )

            setData7(unit_dropown);

            // chemist dropdown from get
            var chemist_dropdown = res1.data.data[0].tests.map(d =>
              d.chemist_dropdown.map(chemist =>chemist)
            )

            setData8(chemist_dropdown);

            // method dropdown from get
            var method_dropdown = res1.data.data[0].tests.map(d =>
              d.method_dropdown.map(method =>method)
            )

            setData9(method_dropdown);

        }
    // for add more parent dropdown
    forsetData5(res5.data.data);
    // for add more test dropdown
    forsetData6(res7.data.data)
    // for add more unit dropdown
    forsetData7(res2.data.data)
    // for add more chemist dropdown
    forsetData8(res3.data.data)
    // for add more method dropdown
    forsetData8(res4.data.data)
    { setLoading1(false) };
    }));
        }, []);


  const ResetBooking = () => {
    document.getElementById("UpdateBooking").reset();
  }

  const handleAddClick = (e,index) => {
    setTestData([...testData, {
      parent_child: '0', p_sr_no: '1', by_pass: '0', parent: '', product_details: '',
      test_id: '', label_claim: '', label_claim_percentage : '0',min_limit: '', max_limit: '',
      result: '', label_claim_result: '', label_claim_unit : '',result2: '', mean: '',
      na_content: '', final_na_content: '', unit : '',expanded_uncertainty: '',
      amount: '',division: '', method: '', test_time : '',test_date_time: '',approval_date_time:'',
      approved:'0',chemist_id:'',assigned_date:''
    }]);

    let arr_len = testData.length;
    for (let i = 0; i < arr_len; i++) {
      var parent;
      if (i == 0) {
        if (testData[i]['parent_child'] == '0') {
          console.log("here")
          parent = 2;
          setTestData([...testData, {
            parent_child: '0', p_sr_no: parent, by_pass: '0', parent: '', product_details: '',
            test_id: '', label_claim: '', label_claim_percentage : '0',min_limit: '', max_limit: '',
            result: '', label_claim_result: '', label_claim_unit : '',result2: '', mean: '',
            na_content: '', final_na_content: '', unit : '',expanded_uncertainty: '',
            amount: '',division: '', method: '', test_time : '',test_date_time: '',approval_date_time:'',
            approved:'0',chemist_id:'',assigned_date:''
          }]);

        }
        else {
          testData[i]['p_sr_no'] = '';
          setTestData([...testData, {
            parent_child: '0', p_sr_no: '', by_pass: '0', parent: '', product_details: '',
            test_id: '', label_claim: '', label_claim_percentage : '0',min_limit: '', max_limit: '',
            result: '', label_claim_result: '', label_claim_unit : '',result2: '', mean: '',
            na_content: '', final_na_content: '', unit : '',expanded_uncertainty: '',
            amount: '',division: '', method: '', test_time : '',test_date_time: '',approval_date_time:'',
            approved:'0',chemist_id:'',assigned_date:''
          }]);
        }
      }
      if (i >= 1) {
        if (testData[i]['parent_child'] == '0') {
          parent = parent + 1;
          //setdata();
          setTestData([...testData, {
            parent_child: '0', p_sr_no: parent, by_pass: '0', parent: '', product_details: '',
            test_id: '', label_claim: '', label_claim_percentage : '0',min_limit: '', max_limit: '',
            result: '', label_claim_result: '', label_claim_unit : '',result2: '', mean: '',
            na_content: '', final_na_content: '', unit : '',expanded_uncertainty: '',
            amount: '',division: '', method: '', test_time : '',test_date_time: '',approval_date_time:'',
            approved:'0',chemist_id:'',assigned_date:''
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

      if(testData[index].label_claim !== '' && testData[index].result !== ''){
        var get_result = parseFloat(testData[index].result ? testData[index].result : 0);
        var get_label_claim = parseFloat(testData[index].label_claim ? testData[index].label_claim : 0);

        var calc_label_claim_result = get_result * get_label_claim / 100

        list[index]['label_claim_result'] = calc_label_claim_result ? calc_label_claim_result.toFixed(5) : '0'
      }
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

  const onChange = (e) => {
    setBooking1(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    booking1.is_report_dispacthed = document.BookingData.is_report_dispacthed.value;
    var report_dispatch_count = booking1.is_report_dispacthed

    booking1.booking_type = document.BookingData.booking_type.value;
    var booking_type_count = booking1.booking_type

    if(booking_type_count == "8"){
      $(".invoice_data").css("display", "block");
    } else {
      $("#invoice_date").val("");
      $("#invoice_no").val("");
      setBooking1(prevState => ({ ...prevState, invoice_date: "", invoice_no: ""}))
      $(".invoice_data").css("display", "none");
    }
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

  const changeCustomer = (e) => {
    setBooking1(prevState => ({ ...prevState, customer_id: e}));
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

  const onChangeNABL = (e) => {
    setBooking1(prevState => ({ ...prevState,nabl_scope:e.target.value}))
    if(e.target.value == "0"){
      setBooking1(prevState => ({ ...prevState, ulr_no: ''}))
      $("#ulr_no").css("display","none")
    }
    if(e.target.value == "1"){
       if(getUlrno.check_ulr_no !== null){
         setBooking1(prevState => ({ ...prevState, ulr_no: getUlrno.check_ulr_no}))
         $("#ulr_no").css("display","block")
       } else {
         axios.get(`${process.env.REACT_APP_BASE_APIURL}booking_no`, { headers })
             .then(response => {
               setBooking1(prevState => ({ ...prevState, ulr_no: response.data.data.ulr_no}))
               $("#ulr_no").css("display","block")
             })
       }
    }
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
              "parent": d.parent,
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
        toastr.error(error.response.data.message);
      })
    }
  }

  const UpdateBooking = (e) => {
    e.preventDefault();
   //{ setLoading(true) };

  // If Booking Type is Invoice than Invoice and Invoice Date is Required
   if(booking1.booking_type == "8"){
     if(booking1.invoice_date == null || booking1.invoice_date == ""){
       toastr.error("Invoice Date Field is Required.");
       return;
     }
     if(booking1.invoice_no == null || booking1.invoice_no == ""){
       toastr.error("Invoice No Field is Required.");
       return;
     }
   }

  // If Is Report Dispatch Yes than Dispatch Date Time, Dispatch Mode and  Dispatch Details is required
   if(booking1.is_report_dispacthed == "1"){
     if(booking1.dispatch_date_time == null || booking1.dispatch_date_time == ""){
       toastr.error("Dispatch Date Time Field is Required.");
       return;
     }
     if(booking1.dispatch_mode == null || booking1.dispatch_mode == ""){
       toastr.error("Dispatch Mode Field is Required.");
       return;
     }
     if(booking1.dispatch_details == null || booking1.dispatch_details == ""){
       toastr.error("Dispatch Details Field is Required.");
       return;
     }
   }

   // coa print count is 1 than following fields are required
   if(booking1.coa_print_count == "1"){
     if(booking1.audit_reamrks == null || booking1.audit_reamrks == ""){
       toastr.error("Audit Remarks Field is Required.");
       return;
     }
     if(booking1.reason == null || booking1.reason == ""){
       toastr.error("Audit Reason Field is Required.");
       return;
     }
     if(booking1.comments == null || booking1.comments == ""){
       toastr.error("Audit Comments Field is Required.");
       return;
     }
   }

    var final_customer_id = booking1.customer_id;
    var final_product_id = booking1.product_id;


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

    /*var final_booking_no = ''
    if (booking1.booking_no == undefined) {
      final_booking_no = ''
    } else if (booking1.booking_no == null) {
      final_booking_no = ''
    } else {
      final_booking_no = booking1.booking_no
    }*/

    const data = {
      booking_type:booking1.booking_type,
      report_type:booking1.report_type,
      invoice_date:booking1.invoice_date,
      invoice_no:booking1.invoice_no,
      receipte_date:booking1.receipte_date,
      booking_no:booking1.booking_no,
      customer_id:final_customer_id,// added some conditions above beacuse used react-select2 for final_customer_id
      reference_no:booking1.reference_no,
      remarks:booking1.remarks,
      manufacturer_id:booking1.manufacturer_name,
      supplier_id:booking1.supplier_name,
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
      dispatch_mode:booking1.dispatch_mode,
      dispatch_details:booking1.dispatch_details,
      signature:booking1.signature,
      verified_by:booking1.verified_by,
      nabl_scope:booking1.nabl_scope,
      ulr_no:booking1.ulr_no,
      cancel:booking1.cancel,
      cancel_remarks:booking1.cancel_remarks,
      priority:booking1.priority,
      discipline:booking1.discipline,
      group:booking1.booking_group,
      statement_of_conformity:booking1.statement_ofconformity,
      block:booking1.block,
      "booking_sample_details": {
      product_id:final_product_id,// added some conditions above beacuse used react-select2 for final_product_id
      batch_no:booking1.batch_no,
      packsize:booking1.packsize,
      request_quantity:booking1.request_quantity,
      sample_code:booking1.sample_code,
      sample_description:booking1.sample_description,
      sample_quantity:booking1.sample_quantity,
      sample_location:booking1.sample_location,
      sample_packaging:booking1.sample_packaging,
      sample_type:booking1.sample_type,
      sampling_date_from:booking1.sampling_date_from,
      sampling_date_from_options:booking1.sampling_date_from_options,
      sampling_date_to:booking1.sampling_date_to,
      sampling_date_to_options:booking1.sampling_date_to_options,
      sample_received_through:booking1.sample_received_through,
      chemist:booking1.chemist,
      sample_condition:booking1.sample_condition,
      is_sample_condition:booking1.is_sample_condition,
      batch_size_qty_rec:booking1.batch_size_qty_rec,
      notes:booking1.notes,
      sample_drawn_by:booking1.sample_drawn_by,
      },
      "booking_tests": testData,
      "booking_audit_details": {
        audit_remarks: booking1.audit_reamrks,
        reason: booking1.reason,
        comments: booking1.comments
      }
    }
    console.log(data)
    return
    axios.post(`${process.env.REACT_APP_BASE_APIURL}editBooking` + booking_id, data, { headers })

      .then(response => {
        if (response.data && response.data.success == true) {
          props.history.push('/booking');
          toastr.success(response.data.message);
          { setLoading(false) };
        } else {
          props.history.push('/edit-booking/' + edit_booking_id);
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
          <Form onSubmit={(e) => { UpdateBooking(e) }} method="POST" id="UpdateBooking" name="BookingData">
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
                  {loading ? <center><LoadingSpinner /></center> :
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
                            <select className="form-select" name="booking_type" value={booking1.booking_type} onChange={onChange}>
                            {booking_dropdown.booking_type.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label className="required-field">Report Type</label>
                            <select className="form-select" name="report_type" onChange={onChange} value={booking1.report_type}>
                              <option value="">None</option>
                              {booking_dropdown.report_type.map((option, key) => <option value={option.id} key={key} >
                                {option.label}</option>)}
                            </select>
                          </div>
                          <div className="col-md-3">
                            <label className="required-field">Receipt Date</label>
                            <input className="form-control" type="date" id="example-date-input" value={booking1.receipte_date} name="receipte_date" onChange={onChange} />
                          </div>
                          <div className="col-md-3">
                            <label>Booking No</label>
                            <input className="form-control" type="text" value={booking1.booking_no} onChange={onChange} name="booking_no" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Details*/}

                    {booking1.booking_type == "8" ?
                      <div className="mb-3 row invoice_data">
                        <div className="form-group">
                          <div className="row">

                            <div className="col-md-6">
                              <label>Invoice Date</label>
                              <input id="invoice_date" value={booking1.invoice_date} onChange={onChange} className="form-control" type="date" name="invoice_date" placeholder="Enter Invoice Date" />
                            </div>

                            <div className="col-md-6">
                              <label>Invoice Number</label>
                              <input id="invoice_no" value={booking1.invoice_no} onChange={onChange} className="form-control" type="text" name="invoice_no" placeholder="Enter Invoice Number" />
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
                            <label className="required-field">Customer</label>
                            {loading1 ? <LoadingSpinner /> : <Select onChange={changeCustomer} options={data1} name="customer_id"
                              placeholder="Select Customer" isClearable value = {
                                data1.find(obj => obj.value == booking1.customer_id)}/>}
                          </div>

                          <div className="col-md-4">
                            <label>Reference No</label>
                            <input className="form-control" type="text" value={booking1.reference_no} name="reference_no" placeholder="Enter Reference No" onChange={onChange} />
                          </div>

                          <div className="col-md-5">
                            <label>Remarks</label>
                            <textarea name="remarks" className="form-control" value={booking1.remarks} placeholder="Enter Remarks" onChange={onChange}></textarea>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label>Manufacturer</label>
                              <input value={booking1.manufacturer_name} onChange={changeManufacturer} name="manufacturer_name" className="form-control"
                               list="manufacturer_name" id="exampleDataList" placeholder="Type to search For Manufacturer..." autoComplete="off"/>
                               <datalist id="manufacturer_name">
                                   { data2.map((option, key) => <option data-value={option.id} value={option.company_name} key={key} >
                                     </option>) }
                                </datalist>

                          </div>
                          <div className="col-md-3">
                            <label>Supplier</label>
                              <input value={booking1.supplier_name} onChange={changeSupplier} name="supplier_name" className="form-control"
                               list="supplier_name" id="exampleDataList" placeholder="Type to search For Supplier..." autoComplete="off"/>
                               <datalist id="supplier_name">
                                   { data3.map((option, key) => <option data-value={option.id} value={option.company_name} key={key} >
                                     </option>) }
                                </datalist>
                          </div>

                          <div className="col-md-2">
                            <label className="required-field">Mfg Date</label>
                            <input className="form-control" value={booking1.mfg_date} type="date" id="example-date-input" name="mfg_date" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Mfg</label>
                            <select name="mfg_options" value={booking1.mfg_options} className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options1.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label className="required-field">Exp Date</label>
                            <input className="form-control" value={booking1.exp_date} type="date" id="example-date-input" name="exp_date" onChange={onChange} />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Exp</label>
                            <select name="exp_options" value={booking1.exp_options} className="form-select" onChange={onChange}>
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
                            <input onChange={onChange} value={booking1.analysis_date} className="form-control" type="date" id="example-date-input" name="analysis_date" />
                          </div>
                          <div className="col-md-3">
                            <label>Aum Sr. No</label>
                            {loading1 ? <LoadingSpinner /> : <input value={booking1.aum_serial_no} type="text" className="form-control" name="aum_serial_no" readOnly />
                            }
                          </div>

                          <div className="col-md-2">
                            <label>D Formate</label>
                            <input onChange={onChange} value={booking1.d_format} className="form-control" type="text" name="d_format" placeholder="Enter D Formate" />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Formate</label>
                            <select name="d_format_options" value={booking1.d_format_options} className="form-select" onChange={onChange}>
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Grade</label>
                            <input onChange={onChange} value={booking1.grade} className="form-control" type="text" name="grade" placeholder="Enter Grade" />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Grade</label>
                            <select onChange={onChange} value={booking1.grade_options} name="grade_options" className="form-select">
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
                            <input onChange={onChange} value={booking1.project_name} className="form-control" type="text" name="project_name" placeholder="Enter Project Name" />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>ProName</label>
                            <select onChange={onChange} name="project_options" value={booking1.project_options} className="form-select">
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-3">
                            <label> Mfg. Lic. No</label>
                            <input onChange={onChange} value={booking1.mfg_lic_no} className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no" />
                          </div>

                          <div className="col-md-3">
                            <label>Is Report Dispacthed?</label>
                            <select onChange={onChange} value={booking1.is_report_dispacthed} name="is_report_dispacthed" className="form-select">
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-3">
                            <label>Signature?</label>
                            <select onChange={onChange} value={booking1.signature} name="signature" className="form-select">
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
                            <input id="dispatch_date_time" value={booking1.dispatch_date_time} onChange={onChange} className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time" />

                          </div>

                          <div className="col-md-4">
                            <label>Dispatch Mode</label>
                            <select onChange={onChange} value={booking1.dispatch_mode} name="dispatch_mode" className="form-select" id="dispatch_mode">
                              <option value="">Select Dispatch Mode</option>
                              {booking_dropdown.dispatch_mode.map((option, key) => <option value={option} key={key} >
                                {option}</option>)}
                            </select>

                          </div>

                          <div className="col-md-4">
                            <label>Dispatch Details</label>
                            <input id="dispatch_details" value={booking1.dispatch_details} onChange={onChange} className="form-control" type="text" name="dispatch_details" placeholder="Enter Dispatch Details" />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Verified By</label>
                            <select onChange={onChange} value={booking1.verified_by} name="verified_by" className="form-select">
                            {booking_dropdown.verified_by.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-2">
                            <label>NABL Scope?</label>
                            <select value={booking1.nabl_scope} onChange={onChangeNABL} name="nabl_scope" className="form-select">
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                            <div style={{display:'none'}} id="ulr_no"><label>ULR No : {booking1.ulr_no}</label></div>
                          </div>

                          <div className="col-md-2">
                            <label>Cancel</label>
                            <select onChange={onChange} value={booking1.cancel} name="cancel" className="form-select">
                            {booking_dropdown.cancel.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label>Cancel Remarks</label>
                            <textarea onChange={onChange} value={booking1.cancel_remarks} name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-3">
                            <label>Priority</label>
                            <select onChange={onChange} value={booking1.priority} name="priority" className="form-select">
                            {booking_dropdown.priority.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-3">
                            <label>Discipline</label>
                            <select onChange={onChange} value={booking1.discipline} name="discipline" className="form-select">
                            {booking_dropdown.discipline.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-3">
                            <label>Group</label>
                            <select onChange={onChange} value={booking1.booking_group} name="booking_group" className="form-select">
                            {booking_dropdown.group.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Statement Of Conformity</label>
                            <select onChange={onChange} value={booking1.statement_ofconformity} name="statement_ofconformity" className="form-select">
                            {booking_dropdown.statement_confirmity.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>

                          </div>

                          <div className="col-md-1">
                            <label>Block</label>
                            <select name="block" value={booking1.block} className="form-select" onChange={onChange}>
                            {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
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
                              placeholder="Select Product" onChange={changeProductID} isClearable value = {
                                data4.find(obj => obj.value == booking1.product_id)}/>}
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
                            <input className="form-control" type="text" name="batch_no" value={booking1.batch_no} onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label>Pack Size</label>
                            <input className="form-control" type="text" name="packsize" value={booking1.packsize} onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label>Req Qty</label>
                            <input className="form-control" type="text" name="request_quantity" value={booking1.request_quantity} onChange={onChange} />
                          </div>

                          <div className="col-md-2">
                            <label>Sample Code</label>
                            <input className="form-control" type="text" name="sample_code" value={booking1.sample_code} onChange={onChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Sample Desc</label>
                            <input className="form-control" type="text" name="sample_description" value={booking1.sample_description} onChange={onChange} />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-3">
                            <label>Sample Qty</label>
                            <input className="form-control" type="text" name="sample_quantity" value={booking1.sample_quantity} onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Location</label>
                            <input className="form-control" type="text" name="sample_location" value={booking1.sample_location} onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Packaging</label>
                            <input className="form-control" type="text" name="sample_packaging" value={booking1.sample_packaging} onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Type</label>
                            <input className="form-control" type="text" name="sample_type" value={booking1.sample_type} onChange={onChange} />
                          </div>


                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Sampling Date From</label>
                            <input className="form-control" type="date" id="example-date-input" value={booking1.sampling_date_from} name="sampling_date_from" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>SamplingFrom</label>
                            <select name="sampling_date_from_options" className="form-select" value={booking1.sampling_date_from_options} onChange={onChange}>
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Sampling Date To</label>
                            <input className="form-control" type="date" id="example-date-input" value={booking1.sampling_date_to} name="sampling_date_to" onChange={onChange} />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Sampling To</label>
                            <select name="sampling_date_to_options" className="form-select" value={booking1.sampling_date_to_options} onChange={onChange}>
                            {booking_dropdown.common_options2.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Sample Received Through</label>
                            <select name="sample_received_through" className="form-select" value={booking1.sample_received_through} onChange={onChange}>
                            {booking_dropdown.sample_received_through.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-1">
                            <label>Chemist</label>
                            <select name="chemist" className="form-select" value={booking1.chemist} onChange={onChange}>
                            {booking_dropdown.chemist.map((option, key) => <option value={option.id} key={key} >
                              {option.label}</option>)}
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label>Sample Condition</label>
                            <input className="form-control" type="text" value={booking1.sample_condition} name="sample_condition" placeholder="Enter Sample Condition" onChange={onChange} />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>sampleconoption</label>
                            <select name="is_sample_condition" value={booking1.is_sample_condition} className="form-select" onChange={onChange}>
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
                            <input className="form-control" type="text" value={booking1.batch_size_qty_rec} name="batch_size_qty_rec" onChange={onChange} />
                          </div>

                          <div className="col-md-7">
                            <label>Notes</label>
                            <input className="form-control" type="text" value={booking1.notes} name="notes" placeholder="Enter Note" onChange={onChange} />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Drawn By</label>
                            <input className="form-control" type="text" value={booking1.sample_drawn_by} name="sample_drawn_by" onChange={onChange} />
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
                        <div className="mb-3">
                          <div className="form-group">
                            <div className="row">
                              <div className="table-responsive">
                                <Table className="table mb-0 border" style={{ width: '100%' }}>
                                  <thead className="table-light">
                                    <tr>
                                      <th style={th_style}>Parent Child</th>
                                      <th style={th_style}>P Sr No</th>
                                      <th style={th_style}>By Pass</th>
                                      <th style={th_style}>Parent</th>
                                      <th style={th_style}>Product Details</th>
                                      <th style={th_style}>Test Name</th>
                                      <th style={th_style}>Label Claim</th>
                                      <th style={th_style}>% of Label Claim</th>
                                      <th style={th_style}>Min.Limit</th>
                                      <th style={th_style}>Max.Limit</th>
                                      <th style={th_style}>Result</th>
                                      <th style={th_style}>Lable Claim Result</th>
                                      <th style={th_style}>Lable Claim Unit</th>
                                      <th style={th_style}>Result2</th>
                                      <th style={th_style}>Mean</th>
                                      <th style={th_style}>Na Content</th>
                                      <th style={th_style}>Final Na Content</th>
                                      <th style={th_style}>Unit</th>
                                      <th style={th_style}>Expanded Uncertanity</th>
                                      <th style={th_style}>Amount</th>
                                      <th style={th_style}>Division</th>
                                      <th style={th_style}>Method</th>
                                      <th style={th_style}>Test Time</th>
                                      <th style={th_style}>Test Date Time</th>
                                      <th style={th_style}>Approval Date Time</th>
                                      <th style={th_style}>Approved</th>
                                      <th style={th_style}>Chemist Name</th>
                                      {testData.length > 1 ? <th style={{ textAlign: 'center',whiteSpace:'nowrap' }}><i className="fa fa-trash"></i></th> : ''}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {/*<td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                                    <td><input type="checkbox"/></td>*/}
                                      <td><select name="parent_child" value={x.parent_child} onChange={e => handleInputChange(e, i)} id={'parent_child_' + i} className="form-select" disabled={i == 0 ?  true : false}>
                                      {booking_dropdown.parent_child.map((option, key) => <option value={option.id} key={key} >
                                        {option.label}</option>)}
                                      </select></td>
                                      <td><input value={x.p_sr_no} type="text" value={x.p_sr_no} onChange={e => handleInputChange(e, i)} name="p_sr_no" className="form-control" readOnly /></td>
                                      <td><select style={{width:'100px'}} value={x.by_pass} onChange={e => handleInputChange(e, i)} className="form-select" name="by_pass">
                                      {booking_dropdown.yes_no_options.map((option, key) => <option value={option.id} key={key} >
                                        {option.label}</option>)}
                                      </select></td>
                                      <td>

                                      <select style={{width:'140px'}} value={x.parent} onChange={e => handleInputChange(e, i)} name="parent" className="form-select">
                                        <option value="">Select Parent</option>
                                        { data5[i] ?
                                        (data5[i].map((option,key) =>
                                          <option value={option.id} key={key} >{option.procedure_name}</option>
                                        )) :  (fordata5.map((option,key) =>
                                           <option value={option.id} key={key} >{option.procedure_name}</option>
                                         ))}

                                      </select></td>

                                      <td><textarea style={{width:'180px'}} value={x.product_details} name="product_details" onChange={e => handleInputChange(e, i)} className="form-control"></textarea></td>

                                      <td>
                                      <input style={{width:'180px'}} class="form-control" value={x.test_name} name="test_name" list="sample_name" id="product_list"  placeholder="Type to Test Name..." onChange={e => handleInputChange(e, i)}/>
                                         <datalist id="sample_name">
                                             { data6[i] ?
                                             (data6[i].map((option,key) =>
                                             <option value={option.id+" - "+option.procedure_name}>
                                               </option>
                                             )) :  (fordata6.map((option,key) =>
                                             <option value={option.id+" - "+option.procedure_name}>
                                               </option>
                                              ))}
                                         </datalist>
                                      </td>
                                      <td><input style={{width:'104px'}} value={x.label_claim} type="text" name="label_claim" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.label_claim_percentage} type="text" name="label_claim_percentage" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.min_limit} type="text" name="min_limit" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.max_limit} type="text" name="max_limit" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.result} type="text" name="result" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.label_claim_result} type="text" name="label_claim_result" onChange={e => handleInputChange(e, i)} className="form-control" readOnly/></td>
                                      <td><input value={x.label_claim_unit} type="text" name="label_claim_unit" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.result2} type="result2" name="mean" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.mean} type="text" name="mean" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.na_content} type="text" name="na_content" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.final_na_content} type="text" name="final_na_content" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td>
                                        <select style={{width:'120px'}} value={x.unit} onChange={e => handleInputChange(e, i)} name="unit" className="form-select">
                                          <option value="">Select Unit</option>
                                          { data7[i] ?
                                          (data7[i].map((option,key) =>
                                            <option value={option.id} key={key} >{option.unit_name}</option>
                                          )) :  (fordata7.map((option,key) =>
                                             <option value={option.id} key={key} >{option.unit_name}</option>
                                           ))}

                                        </select>
                                      </td>
                                      <td><input value={x.expanded_uncertainty} type="text" name="expanded_uncertainty" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.amount} type="text" name="amount" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.division} type="text" name="division" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td>
                                        <select style={{width:'120px'}} value={x.method} onChange={e => handleInputChange(e, i)} name="method" className="form-select">
                                          <option value="">Select Method</option>
                                          { data9[i] ?
                                          (data9[i].map((option,key) =>
                                            <option value={option.id} key={key} >{option.method_name}</option>
                                          )) :  (fordata9.map((option,key) =>
                                             <option value={option.id} key={key} >{option.method_name}</option>
                                           ))}

                                        </select>
                                      </td>
                                      <td><input style={{width:'104px'}} value={x.test_time} type="time" name="test_time" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.test_date_time} type="datetime-local" name="test_date_time" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td><input value={x.approval_date_time} type="datetime-local" name="approval_date_time" onChange={e => handleInputChange(e, i)} className="form-control" /></td>
                                      <td>
                                        <select style={{width:'125px'}} name="approved" onChange={e => handleInputChange(e, i)} value={x.approved} className="form-select">
                                        {booking_dropdown.test_status.map((option, key) => <option value={option.id} key={key} >
                                          {option.label}</option>)}
                                        </select>
                                        <input type="hidden" value={x.assigned_date}/>
                                     </td>
                                      <td>
                                        <select style={{width:'125px'}} value={x.chemist_id} onChange={e => handleInputChange(e, i)} name="chemist_id" className="form-select">
                                          <option value="">Select Chemist</option>
                                          { data8[i] ?
                                          (data8[i].map((option,key) =>
                                            <option value={option.id} key={key} >{option.chemist_name}</option>
                                          )) :  (fordata8.map((option,key) =>
                                             <option value={option.id} key={key} >{option.first_name+" "+option.middle_name+" "+option.last_name}</option>
                                           ))}

                                        </select>
                                      </td>
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

                    {
                      booking1.coa_print_count == "1" ?
                      <div><h5 className="audit_details"> <Alert color="danger" role="alert">
                      <i className="fa fa-comment">&nbsp;Audit Trail</i>
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
