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
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function ViewBooking(props)  {
        const headers = {
              'Authorization' : "Bearer "+localStorage.getItem('token')
            }

const url = window.location.href
const booking_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_booking_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const[product,setProduct] = useState({product_id:''})

    const [booking, setBooking] = useState({booking_type:'',report_type:'',receipte_date:'',booking_no:'',
      booking_no: '',reference_no:'',remarks:'',mfg_date:'',mfg_options:'',exp_date:'',exp_options:'',
      analysis_date:'',aum_serial_no:'',d_format:'',d_format_options:'',grade: '',grade_options:'',project_name:'',
      project_options:'',mfg_lic_no:'',is_report_dispacthed:'',signature:'',verified_by:'',nabl_scope: '',
      cancel:'',cancel_remarks:'',priority:'',discipline:'',booking_group:'',statement_ofconformity:'',company_name:'',
      manufacturer_name:'',supplier_name:''});

    const [bookingSamples, setBookingSamples] = useState({batch_no:'',
    packsize:'',request_quantity:'',sample_code:'',sample_description:'',sample_quantity:'',sample_location:'',
    sample_packaging:'',sample_type:'',sampling_date_from:'',sampling_date_from_options:'N/S',
    sampling_date_to:'',sampling_date_to_options:'N/S',sample_received_through:'By Courier',chemist:'1',sample_condition:'',
    is_sample_condition:'0',batch_size_qty_rec:'',notes:'',sample_drawn_by:''});

    const [bookingSamples1, setBookingSamples1] = useState({generic_name:'',product_type:'',pharmacopeia_id:''});

      const[testData,setTestData] = useState([{parent_child:'Parent',p_sr_no:'',by_pass:'2',parent:'',product_details:'',
      test_name:'',label_claim:'',min_limit:'',max_limit:'',amount:''}])

        useEffect(() => {
                 GetBookingData();
                }, []);

    const my_style = {
    width: '120px !important',

    }

                        const GetBookingData=()=>{
                                {setLoading1(true)}
                                  axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/`+booking_id,{headers})
                                      .then(response => {
                                          setBooking(response.data.data);
                                          {setLoading1(false)};

                                      })
                                      .catch((error) => {
                                          {setLoading1(false)}
                                          toastr.error(error.response.data.message);
                                          this.setState({loading: false});
                                      })
                                }
  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form>
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
                                                <input type="text" value={booking.booking_type} className="form-control" readOnly/>
                                               </div>
                                              <div className="col-md-3">
                                                <label>Report Type</label>
                                                <input type="text" value={booking.report_type} className="form-control" readOnly/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Receipt Date</label>
                                                <input className="form-control" type="text" value={booking.receipte_date} readOnly/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Booking No</label>
                                                <input className="form-control" type="text" value={booking.booking_no} readOnly/>
                                              </div>
                                            </div>
                                          </div>
                                      </div>


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Customer</label>
                                                  <input className="form-control" type="text"  readOnly/>
                                               </div>

                                              <div className="col-md-4">
                                                <label>Reference No</label>
                                                  <input className="form-control" type="text" value={booking.reference_no} readOnly/>
                                              </div>

                                              <div className="col-md-5">
                                                <label>Remarks</label>
                                                <textarea name="remarks" className="form-control" placeholder="Enter Remarks" ></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Manufacturer</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select name="manufacturer_id"
                                                 placeholder="Select Manufacturer" isClearable/>}
                                              </div>
                                              <div className="col-md-3">
                                                <label>Supplier</label>
                                                  {loading1 ? <LoadingSpinner /> :<Select name="supplier_id"
                                                 placeholder="Select Supplier" isClearable/>}
                                              </div>

                                              <div className="col-md-2">
                                                <label>Mfg Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="mfg_date" />
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Mfg</label>
                                                <select name="mfg_options" className="form-select" >
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Exp Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="exp_date" />
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Exp</label>
                                                <select name="exp_options" className="form-select" >
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
                                                 <input  className="form-control" type="date" id="example-date-input" name="analysis_date"/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Aum Sr. No</label>
                                                   {loading1 ? <LoadingSpinner /> :<input type="text" className="form-control" name="aum_serial_no" readOnly/>
                                                   }
                                              </div>

                                              <div className="col-md-2">
                                                <label>D Formate</label>
                                                <input  className="form-control" type="text" name="d_format" placeholder="Enter D Formate"/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Formate</label>
                                                <select name="d_format_options" className="form-select" >
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Grade</label>
                                                <input  className="form-control" type="text" name="grade" placeholder="Enter Grade"/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Grade</label>
                                                <select  name="grade_options" className="form-select">
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
                                                <input  className="form-control" type="text" name="project_name" placeholder="Enter Project Name"/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>ProName</label>
                                                <select  name="project_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label> Mfg. Lic. No</label>
                                                 <input  className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no"/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Is Report Dispacthed?</label>
                                                <select  name="is_report_dispacthed" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Signature?</label>
                                                <select  name="signature" className="form-select">
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
                                                <label>Verified By</label>
                                                <select  name="verified_by" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="QA">QA</option>
                                                </select>

                                              </div>

                                              <div className="col-md-2">
                                                <label>NABL Scope?</label>
                                                <select  name="nabl_scope" className="form-select">
                                                  <option value="0">No</option>
                                                  <option value="1">Yes</option>
                                                </select>

                                              </div>

                                              <div className="col-md-2">
                                                <label>Cancel</label>
                                                <select  name="cancel" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Cancel Remarks</label>
                                                <textarea  name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Priority</label>
                                                <select  name="priority" className="form-select">
                                                  <option value="High">High</option>
                                                  <option value="Medium">Medium</option>
                                                  <option value="Low">Low</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Discipline</label>
                                                <select  name="discipline" className="form-select">
                                                  <option value="Chemical">Chemical</option>
                                                  <option value="Biological">Biological</option>
                                                </select>

                                              </div>

                                              <div className="col-md-3">
                                                <label>Group</label>
                                                <select  name="booking_group" className="form-select">
                                                  <option value="Drugs and Pharmaceuticals">Drugs and Pharmaceuticals</option>
                                                  <option value="Food of Agriculture Product">Food of Agriculture Product</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Statement Of Conformity</label>
                                                <select  name="statement_ofconformity" className="form-select">
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
                                                {loading1 ? <LoadingSpinner /> :<Select name="product_id"
                                               placeholder="Select Product" isClearable/>}
                                              </div>
                                              <div className="col-md-4">
                                                <label>Generic Name</label>
                                                  {loading1 ? <LoadingSpinner /> :<input className="form-control" type="text" name="generic_name" readOnly/>}
                                              </div>

                                              <div className="col-md-4">
                                                <label>Product Type</label>
                                                  {loading1 ? <LoadingSpinner /> :<select name="product_type" className="form-select">
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
                                                    <select className="form-select" id="pharmocopiea" name="pharmacopeia_id" >

                                                    </select>
                                                }
                                              </div>

                                              <div className="col-md-2">
                                                <label>Batch No</label>
                                                <input className="form-control" type="text" name="batch_no" />
                                              </div>

                                              <div className="col-md-1">
                                                <label>Pack Size</label>
                                                <input className="form-control" type="text" name="packsize" />
                                              </div>

                                              <div className="col-md-1">
                                                <label>Req Qty</label>
                                                <input className="form-control" type="text" name="request_quantity" />
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Code</label>
                                                <input className="form-control" type="text" name="sample_code" />
                                              </div>

                                              <div className="col-md-4">
                                                <label>Sample Desc</label>
                                                <input className="form-control" type="text" name="sample_description" />
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Sample Qty</label>
                                                <input className="form-control" type="text" name="sample_quantity" />
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Location</label>
                                                <input className="form-control" type="text" name="sample_location"  />
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Packaging</label>
                                                <input className="form-control" type="text" name="sample_packaging" />
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Type</label>
                                                <input className="form-control" type="text" name="sample_type" />
                                              </div>


                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Sampling Date From</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_from" />
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>SamplingFrom</label>
                                                <select name="sampling_date_from_options" className="form-select" >
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sampling Date To</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_to" />
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Sampling To</label>
                                                <select name="sampling_date_to_options" className="form-select" >
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Received Through</label>
                                                <select name="sample_received_through" className="form-select" >
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand">By Hand</option>
                                                  <option value="By Collection">By Collection</option>
                                                </select>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Chemist</label>
                                                <select name="chemist" className="form-select" >
                                                  <option value="1">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Condition</label>
                                                <input className="form-control" type="text" name="sample_condition" placeholder="Enter Sample Condition" />
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>sampleconoption</label>
                                                <select name="is_sample_condition" className="form-select" >
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
                                                <input className="form-control" type="text" name="batch_size_qty_rec" />
                                              </div>

                                              <div className="col-md-7">
                                                <label>Notes</label>
                                                <input className="form-control" type="text" name="notes" placeholder="Enter Note" />
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Drawn By</label>
                                                <input className="form-control" type="text" name="sample_drawn_by" />
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
                                                                    <td><select name="parent_child"  style={my_style} className="form-select">
                                                                      <option value="Parent">Parent</option>
                                                                      <option value="Child">Child</option>
                                                                    </select></td>
                                                                    <td><input type="text"  name="p_sr_no" className="form-control"/></td>
                                                                    <td><select value={x.by_pass}  style={my_style} className="form-select" name="by_pass"><option value="2">No</option><option value="1">Yes</option></select></td>
                                                                    <td><select value={x.parent}  name="parent" className="form-select" style={{width:'100px !important'}}>

                                                                    </select></td>

                                                                  <td><textarea name="product_details"  className="form-control" style={{width:'120px !important'}} value={x.product_details}></textarea></td>

                                                                    <td><input value={x.test_name} className="form-control"  name="test_name" style={{width:'150px !important'}}/>
                                                                    </td>
                                                                    <td><input value={x.label_claim} type="text" name="label_claim"  className="form-control"/></td>
                                                                     <td><input value={x.min_limit} type="text" name="min_limit"   className="form-control"/></td>
                                                                    <td><input value={x.max_limit} type="text" name="max_limit"  className="form-control"/></td>
                                                                     <td><input value={x.amount} type="text" name="amount"   className="form-control"/></td>

                                                                </tr>

                                                              </tbody>
                                                            </Table>

                                                    </div>
                                                </div>
                                            </div>

        </div>

    </React.Fragment>
       ))}


{/*Test Section End*/}


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
