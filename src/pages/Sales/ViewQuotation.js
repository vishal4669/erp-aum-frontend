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
  Alert,Table
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
import Select from 'react-select'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import moment from 'moment'

function AddQuotation(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }
  const url = window.location.href
  const quotation_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const [loading, setLoading] = useState(false);

  // setting quotation fields array
  const [quotation, setQuotation] = useState({ quotation_no: '', type: '',customer_id:'',subject:'',
  quotation_date:'',valid_until:'',status:'',kind_attention:'',turn_around_time:'',quotation_remarks:'',currency_type:'',grand_total:'',
  payment_terms:'',product_info_grand_total:''});

  // setting product info fields array

  const [inputList, setInputList]  = useState([{ sample_name: "", test_required: "",
    method_technique: "", sample_qty:"", first_sample: "",sample_in_row: "", sample_preperation: "",
      total: "", remark:""}]);

useEffect(() => {
{ setLoading(true) };

const axiosrequest1 = axios.get(`${process.env.REACT_APP_BASE_APIURL}getQuotation/`+quotation_id,{headers});

axios.all([axiosrequest1]).then(axios.spread(function(res1) {
  setQuotation(res1.data.data[0]);
  setInputList(res1.data.data[0].quotation_product_info)
  { setLoading(false) };
}));
    }, []);


return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form method="POST">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Sales</li>
                                            <li className="breadcrumb-item"><a href="/quotation">Quotation</a></li>
                                            <li className="breadcrumb-item active">View Quotation</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/quotation" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {loading ? <center><LoadingSpinner/></center> :
                         <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">

                                    <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>

                                     <div className="mb-3 row">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label>Quotation No</label>
                                                    <input className="form-control" type="text" value={quotation.quotation_no ? quotation.quotation_no : 'No Data'} readOnly />
                                                </div>

                                                <div className="col-md-3">
                                                    <label>Type</label>
                                                    <input className="form-control" type="text" value={quotation.type ? quotation.type : 'No Data'} readOnly />
                                                </div>

                                                <div className="col-md-3">
                                                    <label>Customer</label>
                                                    <input className="form-control" type="text" value={quotation.company_name ? quotation.company_name : 'No Data'} readOnly />
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Subject</label>
                                                    <input className="form-control" type="text" value={quotation.subject ? quotation.subject : 'No Data'} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-3 row">
                                        <div className="form-group">
                                            <div className="row">

                                                <div className="col-md-3">
                                                    <label>Quotation Date</label>
                                                    <input className="form-control" type="text" value={quotation.quotation_date ? moment(quotation.quotation_date).format('DD-MM-YYYY hh:mm:ss') : 'No Data'} readOnly />
                                                </div>

                                                 <div className="col-md-3">
                                                    <label>Valid Until</label>
                                                    <input className="form-control" type="text" value={quotation.valid_until ? moment(quotation.valid_until).format('DD-MM-YYYY hh:mm:ss') : 'No Data'} readOnly />
                                                </div>

                                                 <div className="col-md-2">
                                                    <label>Status</label>
                                                    <input className="form-control" type="text" value={quotation.status ? quotation.status : 'No Data'} readOnly />
                                                </div>


                                                <div className="col-md-2">
                                                    <label>Kind Attention to</label>
                                                    <input className="form-control" type="text" value={quotation.kind_attention_to ? quotation.kind_attention_to : 'No Data'} readOnly />
                                                </div>

                                                 <div className="col-md-2">
                                                    <label>Turn Around Time</label>
                                                    <input className="form-control" type="text" value={quotation.turn_around_time ? quotation.turn_around_time : 'No Data'} readOnly />
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-3 row">
                                        <div className="form-group">
                                            <div className="row">

                                                <div className="col-md-6">
                                                    <label>Remarks</label>
                                                    <textarea className="form-control" value={quotation.remarks ? quotation.remarks : 'No Data'} readOnly></textarea>
                                                </div>



                                                <div className="col-md-2">
                                                    <label>Currency Type</label>
                                                      <input className="form-control" type="text" value={quotation.symbol ? quotation.symbol : 'No Data'} readOnly />
                                                </div>


                                                 <div className="col-md-2">
                                                    <label>Grand Total</label>
                                                    <input className="form-control" type="text" value={quotation.grand_total ? quotation.grand_total == "1" ? 'Yes' : 'No' : 'No Data'} readOnly />
                                                </div>

                                                <div className="col-md-2">
                                                    <label>Payment Terms</label>
                                                    <input className="form-control" type="text" value={quotation.payment_terms ? quotation.payment_terms : 'No Data'} readOnly />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Product Info</i></h5>
                                        {inputList && inputList.length ? inputList.map((x, i) => (
                                         <React.Fragment key={x}>
                                            <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                <div className="table-responsive">
                                                  <Table className="table mb-0 border text-center" id="quotation_data">
                                                      <thead className="table-light">
                                                            <tr>
                                                                <th rowspan="2">Sample Name</th>
                                                                <th rowspan="2">Test Required</th>
                                                                <th rowspan="2">Method Technique</th>
                                                                <th colspan="4" style={{textAlign: "center"}}>Charges</th>
                                                                <th rowspan="2">Total</th>
                                                                <th rowspan="2">Remarks</th>
                                                                <th rowspan="2"></th>
                                                            </tr>

                                                            <tr>
                                                                <th>Sample Qty</th>
                                                                <th>First Sample</th>
                                                                <th>Sample in Raw</th>
                                                                <th>Sample Preperation</th>
                                                            </tr>

                                                          </thead>
                                                          <tbody>
                                                            <tr>
                                                                <td>
                                                                <input className="form-control" type="text" value={x.product_name ? x.product_name : 'No Data'} readOnly />
                                                                </td>
                                                                <td>
                                                                <input className="form-control" type="text" value={x.procedure_name ? x.procedure_name : 'No Data'} readOnly />                                                                </td>
                                                                <td>
                                                                <input className="form-control" type="text" value={x.method_technique ? x.method_technique : 'No Data'} readOnly />
                                                                </td>
                                                                <td><input className="form-control" type="text" value={x.sample_qty ? x.sample_qty : 'No Data'} readOnly /></td>
                                                                <td><input className="form-control" type="text" value={x.first_sample ? x.first_sample : 'No Data'} readOnly /></td>
                                                                <td><input className="form-control" type="text" value={x.sample_in_row ? x.sample_in_row : 'No Data'} readOnly /></td>
                                                                <td><input className="form-control" type="text" value={x.sample_preperation ? x.sample_preperation : 'No Data'} readOnly /></td>
                                                                <td><input className="form-control" type="text" value={x.total ? x.total : 'No Data'} readOnly /></td>
                                                                <td><input className="form-control" type="text" value={x.remark ? x.remark : 'No Data'} readOnly /></td>
                                                            </tr>
                                                          </tbody>
                                                        </Table>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        </React.Fragment>
                                      )) : <h6><center>No Product Info Details Found</center></h6> }
                                        <div className="mb-3 row">
                                          { inputList && inputList.length ? <div className="form-group">
                                            <div className="row">
                                              <div className="table-responsive">
                                                <Table className="table mb-0 border text-center">
                                                  <tbody>
                                                    <tr>
                                                       <td style={{width:'1260px'}}></td>
                                                       <th>Total</th>
                                                       <td><input className="form-control" type="text" value={quotation.product_info_grand_total ? quotation.product_info_grand_total : 'No Data'} readOnly /></td>
                                                       <td></td>
                                                    </tr>
                                                  </tbody>
                                                </Table>
                                               </div>
                                              </div>
                                          </div>: '' }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      }
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default AddQuotation
