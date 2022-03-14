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
import moment from 'moment'

function ViewBooking(props) {

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
    { setLoading(true) };

    const axiosrequest1 = axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/`+booking_id,{headers});

    axios.all([axiosrequest1])
      .then(axios.spread(function(res1) {

        var booking_data = res1.data.data[0]

        // setting booking and samples data
        setBooking1(res1.data.data[0])

        if(booking_data.is_report_dispacthed == "Yes"){
          $(".report_dispatch_yes").css("display","block")
        }
        if(booking_data.nabl_scope == "Yes"){
          $("#ulr_no").css("display","block")
        }

        // setting add tests for booking of selected product
        if(Array.isArray(res1.data.data[0].tests) && res1.data.data[0].tests.length)
        {
           setTestData(res1.data.data[0].tests)
        }
    { setLoading(false) };
    }));
        }, []);

  return (
    <React.Fragment>
      <HorizontalLayout />
      <div className="page-content">
        <Container fluid={true}>
          <Form method="POST" id="UpdateBooking" name="BookingData">
            <div className="page-title-box d-flex align-items-center justify-content-between">

              <div className="page-title">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                  <li className="breadcrumb-item">Analytics</li>
                  <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                  <li className="breadcrumb-item active">View Booking</li>
                </ol>
              </div>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li><Link to="/booking" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>
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
                            <input className="form-control" type="text" value={booking1.booking_type} readOnly/>
                          </div>
                          <div className="col-md-3">
                            <label className="required-field">Report Type</label>
                            <input className="form-control" type="text" value={booking1.report_type} readOnly/>
                          </div>
                          <div className="col-md-3">
                            <label className="required-field">Receipt Date</label>
                            <input className="form-control" type="text" value={booking1.receipte_date ? moment(booking1.receipte_date).format("DD-MM-YYYY") : ''} readOnly/>
                          </div>
                          <div className="col-md-3">
                            <label>Booking No</label>
                            <input className="form-control" type="text" value={booking1.booking_no} readOnly />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Invoice Details*/}

                    {booking1.booking_type == "Invoice" ?
                      <div className="mb-3 row invoice_data">
                        <div className="form-group">
                          <div className="row">

                            <div className="col-md-6">
                              <label>Invoice Date</label>
                              <input value={booking1.invoice_date ? moment(booking1.invoice_date).format("DD-MM-YYYY") : ''}  className="form-control" type="date"/>
                            </div>

                            <div className="col-md-6">
                              <label>Invoice Number</label>
                              <input value={booking1.invoice_no}  className="form-control" type="text" />
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

                          </div>

                          <div className="col-md-4">
                            <label>Reference No</label>
                            <input className="form-control" type="text" value={booking1.reference_no} name="reference_no" placeholder="Enter Reference No"  />
                          </div>

                          <div className="col-md-5">
                            <label>Remarks</label>
                            <textarea name="remarks" className="form-control" value={booking1.remarks} placeholder="Enter Remarks" ></textarea>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label>Manufacturer</label>
                              <input value={booking1.manufacturer_name} name="manufacturer_name" className="form-control"
                               list="manufacturer_name" id="exampleDataList" placeholder="Type to search For Manufacturer..." autoComplete="off"/>


                          </div>
                          <div className="col-md-3">
                            <label>Supplier</label>
                              <input value={booking1.supplier_name} name="supplier_name" className="form-control"
                               list="supplier_name" id="exampleDataList" placeholder="Type to search For Supplier..." autoComplete="off"/>

                          </div>

                          <div className="col-md-2">
                            <label className="required-field">Mfg Date</label>
                            <input className="form-control" value={booking1.mfg_date} type="date" id="example-date-input" name="mfg_date"  />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Mfg</label>

                          </div>

                          <div className="col-md-2">
                            <label className="required-field">Exp Date</label>
                            <input className="form-control" value={booking1.exp_date} type="date" id="example-date-input" name="exp_date"  />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Exp</label>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label>Date of Analysis</label>
                            <input  value={booking1.analysis_date} className="form-control" type="date" id="example-date-input" name="analysis_date" />
                          </div>
                          <div className="col-md-3">
                            <label>Aum Sr. No</label>
                             <input value={booking1.aum_serial_no} type="text" className="form-control" name="aum_serial_no" readOnly />

                          </div>

                          <div className="col-md-2">
                            <label>D Formate</label>
                            <input  value={booking1.d_format} className="form-control" type="text" name="d_format" placeholder="Enter D Formate" />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Formate</label>

                          </div>

                          <div className="col-md-2">
                            <label>Grade</label>
                            <input  value={booking1.grade} className="form-control" type="text" name="grade" placeholder="Enter Grade" />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Grade</label>

                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Project Name</label>
                            <input  value={booking1.project_name} className="form-control" type="text" name="project_name" placeholder="Enter Project Name" />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>ProName</label>

                          </div>

                          <div className="col-md-3">
                            <label> Mfg. Lic. No</label>
                            <input  value={booking1.mfg_lic_no} className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no" />
                          </div>

                          <div className="col-md-3">
                            <label>Is Report Dispacthed?</label>

                          </div>

                          <div className="col-md-3">
                            <label>Signature?</label>

                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row report_dispatch_yes" style={{ display: 'none' }}>
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-4">
                            <label>Dispatch Date Time</label>
                            <input id="dispatch_date_time" value={booking1.dispatch_date_time}  className="form-control" type="datetime-local" name="dispatch_date_time" placeholder="Enter Dispatch Date Time" />

                          </div>

                          <div className="col-md-4">
                            <label>Dispatch Mode</label>

                          </div>

                          <div className="col-md-4">
                            <label>Dispatch Details</label>
                            <input id="dispatch_details" value={booking1.dispatch_details}  className="form-control" type="text" name="dispatch_details" placeholder="Enter Dispatch Details" />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Verified By</label>

                          </div>

                          <div className="col-md-2">
                            <label>NABL Scope?</label>

                            <div style={{display:'none'}} id="ulr_no"><label>ULR No : {booking1.ulr_no}</label></div>
                          </div>

                          <div className="col-md-2">
                            <label>Cancel</label>

                          </div>

                          <div className="col-md-6">
                            <label>Cancel Remarks</label>
                            <textarea  value={booking1.cancel_remarks} name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-3">
                            <label>Priority</label>

                          </div>

                          <div className="col-md-3">
                            <label>Discipline</label>

                          </div>

                          <div className="col-md-3">
                            <label>Group</label>

                          </div>

                          <div className="col-md-2">
                            <label>Statement Of Conformity</label>

                          </div>

                          <div className="col-md-1">
                            <label>Block</label>

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

                          </div>
                          <div className="col-md-4">
                            <label>Generic Name</label>
                            <input className="form-control" value={booking1.generic_name} type="text" name="generic_name" readOnly />
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
                            <input className="form-control" type="text" name="batch_no" value={booking1.batch_no}  />
                          </div>

                          <div className="col-md-1">
                            <label>Pack Size</label>
                            <input className="form-control" type="text" name="packsize" value={booking1.packsize}  />
                          </div>

                          <div className="col-md-1">
                            <label>Req Qty</label>
                            <input className="form-control" type="text" name="request_quantity" value={booking1.request_quantity}  />
                          </div>

                          <div className="col-md-2">
                            <label>Sample Code</label>
                            <input className="form-control" type="text" name="sample_code" value={booking1.sample_code}  />
                          </div>

                          <div className="col-md-4">
                            <label>Sample Desc</label>
                            <input className="form-control" type="text" name="sample_description" value={booking1.sample_description}  />
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-3">
                            <label>Sample Qty</label>
                            <input className="form-control" type="text" name="sample_quantity" value={booking1.sample_quantity}  />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Location</label>
                            <input className="form-control" type="text" name="sample_location" value={booking1.sample_location}  />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Packaging</label>
                            <input className="form-control" type="text" name="sample_packaging" value={booking1.sample_packaging}  />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Type</label>
                            <input className="form-control" type="text" name="sample_type" value={booking1.sample_type}  />
                          </div>


                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Sampling Date From</label>
                            <input className="form-control" type="date" id="example-date-input" value={booking1.sampling_date_from} name="sampling_date_from"  />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>SamplingFrom</label>

                          </div>

                          <div className="col-md-2">
                            <label>Sampling Date To</label>
                            <input className="form-control" type="date" id="example-date-input" value={booking1.sampling_date_to} name="sampling_date_to"  />
                          </div>
                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>Sampling To</label>

                          </div>

                          <div className="col-md-2">
                            <label>Sample Received Through</label>

                          </div>

                          <div className="col-md-1">
                            <label>Chemist</label>

                          </div>

                          <div className="col-md-2">
                            <label>Sample Condition</label>
                            <input className="form-control" type="text" value={booking1.sample_condition} name="sample_condition" placeholder="Enter Sample Condition"  />
                          </div>

                          <div className="col-md-1">
                            <label style={{ visibility: 'hidden' }}>sampleconoption</label>

                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">

                          <div className="col-md-2">
                            <label>Batch Size/ Qty Received</label>
                            <input className="form-control" type="text" value={booking1.batch_size_qty_rec} name="batch_size_qty_rec"  />
                          </div>

                          <div className="col-md-7">
                            <label>Notes</label>
                            <input className="form-control" type="text" value={booking1.notes} name="notes" placeholder="Enter Note"  />
                          </div>

                          <div className="col-md-3">
                            <label>Sample Drawn By</label>
                            <input className="form-control" type="text" value={booking1.sample_drawn_by} name="sample_drawn_by"  />
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
                                      <td></td>
                                      <td><input value={x.p_sr_no} type="text" value={x.p_sr_no}  name="p_sr_no" className="form-control" readOnly /></td>
                                      <td></td>
                                      <td></td>

                                      <td><textarea style={{width:'180px'}} value={x.product_details} name="product_details"  className="form-control"></textarea></td>

                                      <td>
                                      <input style={{width:'180px'}} class="form-control" value={x.test_name} name="test_name" list="sample_name" id="product_list"  placeholder="Type to Test Name..." />

                                      </td>
                                      <td><input style={{width:'104px'}} value={x.label_claim} type="text" name="label_claim"  className="form-control" /></td>
                                      <td><input value={x.label_claim_percentage} type="text" name="label_claim_percentage"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.min_limit} type="text" name="min_limit"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.max_limit} type="text" name="max_limit"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.result} type="text" name="result"  className="form-control" /></td>
                                      <td><input value={x.label_claim_result} type="text" name="label_claim_result"  className="form-control" readOnly/></td>
                                      <td><input value={x.label_claim_unit} type="text" name="label_claim_unit"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.result2} type="result2" name="mean"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.mean} type="text" name="mean"  className="form-control" /></td>
                                      <td><input value={x.na_content} type="text" name="na_content"  className="form-control" /></td>
                                      <td><input value={x.final_na_content} type="text" name="final_na_content"  className="form-control" /></td>
                                      <td>

                                      </td>
                                      <td><input value={x.expanded_uncertainty} type="text" name="expanded_uncertainty"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.amount} type="text" name="amount"  className="form-control" /></td>
                                      <td><input style={{width:'104px'}} value={x.division} type="text" name="division"  className="form-control" /></td>
                                      <td>

                                      </td>
                                      <td><input style={{width:'104px'}} value={x.test_time} type="time" name="test_time"  className="form-control" /></td>
                                      <td><input value={x.test_date_time} type="datetime-local" name="test_date_time"  className="form-control" /></td>
                                      <td><input value={x.approval_date_time} type="datetime-local" name="approval_date_time"  className="form-control" /></td>
                                      <td>

                                     </td>
                                      <td>

                                      </td>
                                    </tr>

                                  </tbody>
                                </Table>

                              </div>
                            </div>
                          </div>

                        </div>

                      </React.Fragment>
                    ))}
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
                              <textarea name="audit_reamrks" value={booking1.audit_reamrks} id="audit_reamrks" className="form-control" placeholder="Enter Remarks" ></textarea>
                            </div>

                            <div className="col-md-4">
                              <label>Reason</label>
                              <textarea name="reason" id="reason" value={booking1.reason} className="form-control" placeholder="Enter Reason" ></textarea>
                            </div>

                            <div className="col-md-4">
                              <label>Comments</label>
                              <textarea name="comments" id="comments" value={booking1.comments} className="form-control" placeholder="Enter Comments" ></textarea>
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

export default ViewBooking
