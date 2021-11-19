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
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import moment from 'moment'

function TestResultAdd(props) {
  const [unit, setUnitData] = useState([]);
  const [testData, settestData] = useState({booking_type:'',report_type:'',receipte_date:'',booking_no:'',product_name:'',
  generic_name:'',batch_no:'',parent:'',test_name:'',min_limit:'',max_limit:'',result:'',method:'',unit:''});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const headers = {
    'Authorization' : "Bearer "+localStorage.getItem('token')
         }
  useEffect(() => {
      UnitList();
      ShowTestData();
          }, []);

  const url = window.location.href
  const test_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_test_id =url.substring(url.lastIndexOf('/') + 1)

  const UnitList = ()=>{

      {setLoading1(true)};
            axios.get(`${process.env.REACT_APP_BASE_APIURL}listUnit?is_dropdown=1`,{headers})
              .then(response => {
                       setUnitData(response.data.data);
                       {setLoading1(false)}
                 })
                .catch((error) => {
                    toastr.error(error.response.data.message);
                    {setLoading1(false)}
                })
  }
  const ShowTestData = ()=>{
      {setLoading1(true)};
            axios.get(`${process.env.REACT_APP_BASE_APIURL}showTest/`+test_id,{headers})
              .then(response => {
                const tests_data = response.data.data.map((d, index) => ({
                  "booking_type": d.booking_detail.booking_type,
                  "report_type": d.booking_detail.report_type,
                  "receipte_date": moment(d.booking_detail.receipte_date).format('DD-MM-YYYY'),
                  "booking_no": d.booking_detail.booking_no,
                  "product_name": d.booking_samples_detail.product_detail.product_name,
                  "generic_name": d.booking_samples_detail.product_detail.generic_product_id.product_name,
                  "batch_no": d.booking_samples_detail.batch_no,
                  "parent" : d.parent.parent_name,
                  "test_name" : d.test_name,
                  "min_limit" : d.min_limit,
                  "max_limit" : d.max_limit,
                  "result" : d.result,
                  "method" : d.method,
                  "unit" : d.unit
                }))
                settestData(tests_data[0])
                       {setLoading1(false)}
                 })
                .catch((error) => {
                  console.log(error)
                    toastr.error(error.response.data.message);
                    {setLoading1(false)}
                })
  }
  const onChange = (e) => {
    settestData({ ...testData, [e.target.name]: e.target.value });
  }
  const ResetResultData = () => {
    document.getElementById("AddTestResult").reset();
  }
  const AddTestResultData = (e) => {
    e.preventDefault();
    { setLoading(true) };

    const data = {
      result : testData.result,
      method: testData.method,
      unit: testData.unit
    }
    axios.post(`${process.env.REACT_APP_BASE_APIURL}updateTestResult/`+test_id, data, { headers })

      .then(response => {
        if (response.data && response.data.success == true) {
          props.history.push('/dashboard');
          toastr.success(response.data.message);
          { setLoading(false) };
        } else {
          props.history.push('/add-test-result/'+edit_test_id);
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
          <Form onSubmit={AddTestResultData} method="POST" id="AddTestResult">
            <div className="page-title-box d-flex align-items-center justify-content-between">

              <div className="page-title">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                  <li className="breadcrumb-item">Analytics</li>
                  <li className="breadcrumb-item"><a href="/dashboard">Booking</a></li>
                  <li className="breadcrumb-item active">Add Test Result Data</li>
                </ol>
              </div>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li><Link to="/dashboard" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                  <li><button type="reset" className="btn btn-primary btn-sm" onClick={ResetResultData}><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                  &nbsp;  <li>
                      {loading ? <LoadingSpinner/> : <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    }</li>
                </ol>
              </div>
            </div>
            {loading1 ? <center><LoadingSpinner/></center> :
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <h5>
                      <Alert color="success" role="alert">
                        <i className="fa fa-comment">&nbsp;Basic Info</i>
                      </Alert>
                    </h5>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label>Booking Type</label>
                            <input className="form-control" type="text" value={testData.booking_type} name="booking_type" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Report Type</label>
                            <input className="form-control" type="text" value={testData.report_type} name="report_type" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Receipt Date</label>
                            <input className="form-control" type="text" value={testData.receipte_date} name="receipte_date" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Booking No</label>
                            <input className="form-control" type="text" value={testData.booking_no} name="booking_no" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Product Name</label>
                            <input className="form-control" type="text" value={testData.product_name} name="product_name" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Generic Name</label>
                            <input className="form-control" type="text" value={testData.generic_name} name="generic_name" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Batch No</label>
                            <input className="form-control" type="text" value={testData.batch_no} name="batch_no" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h5>
                      <Alert color="success" role="alert">
                        <i className="fa fa-comment">&nbsp;Tests</i>
                      </Alert>
                    </h5>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-3">
                            <label>Parent</label>
                            <input className="form-control" type="text" value={testData.parent} name="parent" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Test Name</label>
                            <input className="form-control" type="text" value={testData.test_name} name="test_name" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Min Limit</label>
                            <input className="form-control" type="text" value={testData.min_limit} name="min_limit" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Max Limit</label>
                            <input className="form-control" type="text" value={testData.max_limit} name="max_limit" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Result</label>
                            <input className="form-control" type="text" value={testData.result} name="result" placeholder="Enter Result" required onChange={onChange}/>
                          </div>
                          <div className="col-md-4">
                            <label>Method</label>
                            <input className="form-control" type="text" value={testData.method} name="method" placeholder="Enter Method" onChange={onChange}/>
                          </div>
                          <div className="col-md-2">
                            <label>Unit</label>
                            {loading1 ? <LoadingSpinner /> : <select className="form-select" name="unit" value={testData.unit} onChange={onChange}>
                                  <option value="">Select Unit</option>
                                 { unit.map((option, key) => <option value={option.id} key={key} >{option.unit_name}</option>) }

                              </select>}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*<div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Result2 With Label Claim</label>
                            <input className="form-control" type="text" value="" name="result2_label_claim" readOnly />
                          </div>
                          <div className="col-md-6">
                            <label>Result2 With Label Claim Unit</label>
                            <input className="form-control" type="text" value="" name="result2_label_claim_unit" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>*/}
                  </CardBody>
                </Card>
              </Col>
            </Row>}
          </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default TestResultAdd;
