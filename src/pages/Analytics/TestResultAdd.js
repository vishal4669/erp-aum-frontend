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

function TestResultAdd(props) {
  const [unit, setUnitData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const headers = {
    'Authorization' : "Bearer "+localStorage.getItem('token')
         }
  useEffect(() => {
      UnitList();
          }, []);
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
  return (
    <React.Fragment>
      <HorizontalLayout />
      <div className="page-content">
        <Container fluid={true}>
          <Form method="POST">
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
                  <li><button type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                  &nbsp;  <li>
                      <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>
                </ol>
              </div>
            </div>
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
                            <input className="form-control" type="text" value="" name="booking_type" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Report Type</label>
                            <input className="form-control" type="text" value="" name="report_type" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Receipt Date</label>
                            <input className="form-control" type="text" value="" name="receipt_date" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Booking No</label>
                            <input className="form-control" type="text" name="booking_no" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Product Name</label>
                            <input className="form-control" type="text" value="" name="product_name" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Generic Name</label>
                            <input className="form-control" type="text" value="" name="generic_name" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Batch No</label>
                            <input className="form-control" type="text" value="" name="batch_no" readOnly />
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
                            <input className="form-control" type="text" value="" name="parent" readOnly />
                          </div>
                          <div className="col-md-3">
                            <label>Test Name</label>
                            <input className="form-control" type="text" value="" name="test_name" readOnly />
                          </div>
                          <div className="col-md-6">
                            <label>Product Details</label>
                            <textarea className="form-control" type="text" value="" name="test_name" readOnly></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Min Limit</label>
                            <input className="form-control" type="text" value="" name="min_limit" readOnly />
                          </div>
                          <div className="col-md-6">
                            <label>Max Limit</label>
                            <input className="form-control" type="text" value="" name="max_limit" readOnly />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-6">
                            <label>Result</label>
                            <input className="form-control" type="text" value="" name="result" placeholder="Enter Result"/>
                          </div>
                          <div className="col-md-4">
                            <label>Method</label>
                            <input className="form-control" type="text" value="" name="method" placeholder="Enter Method"/>
                          </div>
                          <div className="col-md-2">
                            <label>Unit</label>
                            {loading1 ? <LoadingSpinner /> : <select className="form-select" name="mst_units_id">
                                  <option value="">Select Unit</option>
                                 { unit.map((option, key) => <option value={option.id} key={key} >{option.unit_name}</option>) }

                              </select>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
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

export default TestResultAdd;
