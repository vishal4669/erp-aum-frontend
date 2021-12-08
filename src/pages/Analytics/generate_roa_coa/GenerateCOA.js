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
} from 'reactstrap';
//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import HorizontalLayout from '../../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { MDBTable, MDBTableBody} from 'mdbreact';

function GenerateCOA(props) {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
  const url = window.location.href
  const booking_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_booking_id = url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [booking1, setBooking1] = useState({booking_no:'',customer_name:'',aum_serial_no:'',
  coa_format:'COA PRINT',letter_head:'No',action:'VIEW',coa_print_count:'',coa_print:''})

  useEffect(() => {
    {setLoading1(true)}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/` + booking_id, { headers })
    .then(response => {
      setBooking1({
        booking_no: response.data.data.booking_no,
        aum_serial_no : response.data.data.aum_serial_no,
        customer_name: response.data.data.customer_id.company_name,
        coa_format:'COA PRINT',
        letter_head:'No',
        action:'VIEW',
        coa_print_count: response.data.data.coa_print_count,
        coa_print: response.data.data.coa_print
      });
      {setLoading1(false)}
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
      {setLoading1(false)}
    })
  }, []);

  const onChange = (e) => {
      e.persist();
      setBooking1({...booking1, [e.target.name]: e.target.value});
    }

  const generate_coa =() => {

    if(window.confirm("Are you sure you want to Perfrom this Action?")){
        if(booking1.coa_format == 'COA PRINT'){
          window.open('/view-coa/'+edit_booking_id+"/"+booking1.action+"/"+booking1.letter_head,"_blank");
        } else if(booking1.coa_format == 'NABL PRINT'){
            window.open('/view-nabl/' + edit_booking_id+"/"+booking1.action+"/"+booking1.letter_head,"_blank");
        } else if(booking1.coa_format == 'COA AYUSH') {
            window.open('/view-aayush/' + edit_booking_id+"/"+booking1.action+"/"+booking1.letter_head,"_blank");
        }
    }
    else{
        return false;
    }
  }

  return (

    <React.Fragment>
      <HorizontalLayout />
      <div className="page-content">
        <Container fluid={true}>
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <div className="page-title">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                <li className="breadcrumb-item">Analytics</li>
                <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                <li className="breadcrumb-item active">Generate COA</li>
              </ol>
            </div>
          </div>
          {loading1 ? <center><LoadingSpinner /></center> :
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <MDBTable bordered striped>
                      <MDBTableBody>
                        <tr>
                          <th>Sample No</th>
                          <td>{booking1.booking_no}</td>
                          <th>Report No</th>
                          <td>{booking1.booking_no}</td>
                        </tr>
                        <tr>
                          <th>Client Name</th>
                          <td>{booking1.customer_name}</td>
                          <th>Aum Sr. No.</th>
                          <td>{booking1.aum_serial_no}</td>
                        </tr>
                        <tr>
                          <th>Type</th>
                          <td>COA</td>
                          <th>Format</th>
                          <td>
                            <select name="coa_format" class="form-select" onChange={onChange}>
                              <option value="COA PRINT">COA PRINT</option>
                              <option value="NABL PRINT">NABL PRINT</option>
                              <option value="COA AYUSH">COA AYUSH</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th>Action</th>
                          <td>
                            <select name="action" class="form-select" onChange={onChange}>
                              <option value="VIEW">VIEW</option>
                              <option value="PRINT" disabled={booking1.coa_print_count==1 ? true : false}>PRINT</option>
                              <option value="PDF">PDF</option>
                              {/*<option value="EMAIL">EMAIL</option>*/}
                            </select>
                          </td>
                          <th>Letter Head</th>
                          <td>
                            <select name="letter_head" class="form-select" onChange={onChange}>
                              <option value="No">No</option>
                              {booking1.action !== 'PRINT' ? <option value="Yes">Yes</option> : ''}
                            </select>
                          </td>
                        </tr>
                        {booking1.coa_print_count == "1" ? <tr>
                          <th>Print is Generated For</th>
                          <th>{booking1.coa_print.replace("_"," ")}</th>
                        </tr> : ''}
                        <tr>
                          <td colspan="4" className="text-center"><input type="button" name="generate" value="Generate" onClick={generate_coa} className="btn btn-info"/></td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          }
        </Container>
      </div>
    </React.Fragment>

  )
}

export default GenerateCOA
