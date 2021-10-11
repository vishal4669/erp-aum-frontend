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

  const [customer,setCustomer] = useState({company_name:''})
  const [manufacturer,setManufacturer] = useState({company_name:''})
  const [supplier,setSupplier] = useState({company_name:''})
  const [product,setProduct] = useState({product_name:''})
  const [pharmacopeia,setPharmacopeia] = useState({pharmacopeia_name:''})

    const [booking, setBooking] = useState({booking_type:'',report_type:'',receipte_date:'',booking_no:'',
      booking_no: '',reference_no:'',remarks:'',mfg_date:'',mfg_options:'',exp_date:'',exp_options:'',
      analysis_date:'',aum_serial_no:'',d_format:'',d_format_options:'',grade: '',grade_options:'',project_name:'',
      project_options:'',mfg_lic_no:'',is_report_dispacthed:'',signature:'',verified_by:'',nabl_scope: '',
      cancel:'',cancel_remarks:'',priority:'',discipline:'',booking_group:'',statement_ofconformity:'',
      manufacturer_name:'',supplier_name:''});

    const [bookingSamples, setBookingSamples] = useState({product_type:'',batch_no:'',
    packsize:'',request_quantity:'',sample_code:'',sample_description:'',sample_quantity:'',sample_location:'',
    sample_packaging:'',sample_type:'',sampling_date_from:'',sampling_date_from_options:'',
    sampling_date_to:'',sampling_date_to_options:'',sample_received_through:'',chemist:'',sample_condition:'',
    is_sample_condition:'',batch_size_qty_rec:'',notes:'',sample_drawn_by:''});

      const[testData,setTestData] = useState([{parent_child:'',p_sr_no:'',by_pass:'',parent:'',product_details:'',
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
                setCustomer(response.data.data.customer_id)
                setManufacturer(response.data.data.manufacturer_id)
                setSupplier(response.data.data.supplier_id)
                setProduct(response.data.data.samples[0].product_id)
                setPharmacopeia(response.data.data.samples[0].pharmacopiea_id)
                setBookingSamples(response.data.data.samples[0])
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
                                                  <input className="form-control" value={customer.company_name} type="text"  readOnly/>
                                               </div>

                                              <div className="col-md-4">
                                                <label>Reference No</label>
                                                  <input className="form-control" type="text" value={booking.reference_no} readOnly/>
                                              </div>

                                              <div className="col-md-5">
                                                <label>Remarks</label>
                                                <textarea name="remarks" className="form-control" value={booking.remarks} readOnly></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Manufacturer</label>
                                                  <input className="form-control" value={manufacturer.company_name} type="text"  readOnly/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Supplier</label>
                                                  <input className="form-control" value={supplier.company_name} type="text"  readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Mfg Date</label>
                                                <input className="form-control" type="text" value={booking.mfg_date} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Mfg</label>
                                                <input className="form-control" type="text" value={booking.mfg_options} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Exp Date</label>
                                                <input className="form-control" type="text" value={booking.exp_date} readOnly/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Exp</label>
                                                <input className="form-control" type="text" value={booking.exp_options} readOnly/>
                                              </div>
                                            </div>
                                          </div>
                                      </div>

                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Date of Analysis</label>
                                                 <input className="form-control" type="text" value={booking.analysis_date} readOnly/>
                                              </div>
                                              <div className="col-md-3">
                                                <label>Aum Sr. No</label>
                                                <input className="form-control" type="text" value={booking.aum_serial_no} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>D Formate</label>
                                                  <input className="form-control" type="text" value={booking.d_format} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Formate</label>
                                                  <input className="form-control" type="text" value={booking.d_format_options} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Grade</label>
                                                <input className="form-control" type="text" value={booking.grade} readOnly/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Grade</label>
                                                <input className="form-control" type="text" value={booking.grade_options} readOnly/>
                                              </div>
                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Project Name</label>
                                                <input className="form-control" type="text" value={booking.project_name} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>ProName</label>
                                                <input className="form-control" type="text" value={booking.project_options} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label> Mfg. Lic. No</label>
                                                 <input className="form-control" type="text" value={booking.mfg_lic_no} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Is Report Dispacthed?</label>
                                                {booking.is_report_dispacthed == 0 ?
                                                    <input className="form-control" type="text" value="No" readOnly/>
                                                  :
                                                  <input className="form-control" type="text" value="Yes" readOnly/>
                                                }


                                              </div>

                                              <div className="col-md-3">
                                                <label>Signature?</label>
                                                {booking.signature == 0 ?
                                                    <input className="form-control" type="text" value="No" readOnly/>
                                                  :
                                                  <input className="form-control" type="text" value="Yes" readOnly/>
                                                }
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Verified By</label>
                                                  <input className="form-control" type="text" value={booking.verified_by} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>NABL Scope?</label>
                                                  {booking.nabl_scope == 0 ?
                                                      <input className="form-control" type="text" value="No" readOnly/>
                                                    :
                                                    <input className="form-control" type="text" value="Yes" readOnly/>
                                                  }

                                              </div>

                                              <div className="col-md-2">
                                                <label>Cancel</label>
                                                <input className="form-control" type="text" value={booking.cancel} readOnly/>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Cancel Remarks</label>
                                                <textarea className="form-control" value={booking.cancel_remarks} readOnly></textarea>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Priority</label>
                                                <input className="form-control" type="text" value={booking.priority} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Discipline</label>
                                                <input className="form-control" type="text" value={booking.discipline} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Group</label>
                                                <input className="form-control" type="text" value={booking.booking_group} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Statement Of Conformity</label>
                                                <input className="form-control" type="text" value={booking.statement_ofconformity} readOnly/>
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
                                                <input className="form-control" type="text"  value={product.product_name} readOnly/>
                                              </div>
                                              <div className="col-md-4">
                                                <label>Generic Name</label>
                                                  {loading1 ? <LoadingSpinner /> :<input className="form-control" type="text" name="generic_name" readOnly/>}
                                              </div>

                                              <div className="col-md-4">
                                                <label>Product Type</label>
                                                <input className="form-control" type="text"  value={bookingSamples.product_type} readOnly/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Pharmacopiea</label>
                                                <input className="form-control" type="text"  value={pharmacopeia.pharmacopeia_name} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Batch No</label>
                                                <input className="form-control" type="text"  value={bookingSamples.batch_no} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Pack Size</label>
                                                <input className="form-control" type="text"  value={bookingSamples.packsize} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Req Qty</label>
                                                <input className="form-control" type="text"  value={bookingSamples.request_quantity} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Code</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_code} readOnly/>
                                              </div>

                                              <div className="col-md-4">
                                                <label>Sample Desc</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_description} readOnly/>
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">
                                                <label>Sample Qty</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_quantity} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Location</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_location} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Packaging</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_packaging} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Type</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_type} readOnly/>
                                              </div>


                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Sampling Date From</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sampling_date_from} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>SamplingFrom</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sampling_date_from_options} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sampling Date To</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sampling_date_to} readOnly/>
                                              </div>
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>Sampling To</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sampling_date_to_options} readOnly/>
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Received Through</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_received_through} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label>Chemist</label>
                                                {bookingSamples.chemist == 1 ?
                                                    <input className="form-control" type="text" value="Yes" readOnly/>
                                                  : <input className="form-control" type="text" value="No" readOnly/>

                                                }
                                              </div>

                                              <div className="col-md-2">
                                                <label>Sample Condition</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_condition} readOnly/>
                                              </div>

                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>sampleconoption</label>
                                                {bookingSamples.is_sample_condition == 0 ?
                                                    <input className="form-control" type="text" value="No" readOnly/>
                                                  : <input className="form-control" type="text" value="Yes" readOnly/>

                                                }
                                              </div>

                                            </div>
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">
                                                <label>Batch Size/ Qty Received</label>
                                                <input className="form-control" type="text"  value={bookingSamples.batch_size_qty_rec} readOnly/>
                                              </div>

                                              <div className="col-md-7">
                                                <label>Notes</label>
                                                <input className="form-control" type="text"  value={bookingSamples.notes} readOnly/>
                                              </div>

                                              <div className="col-md-3">
                                                <label>Sample Drawn By</label>
                                                <input className="form-control" type="text"  value={bookingSamples.sample_drawn_by} readOnly/>
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
