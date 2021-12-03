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

function GenerateROA(props) {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
  const url = window.location.href
  const booking_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_booking_id = url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [booking1, setBooking1] = useState({booking_no:'',customer_name:'',aum_serial_no:'',
  letter_head:'No',action:'VIEW'})

  useEffect(() => {
    {setLoading1(true)}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/` + booking_id, { headers })
    .then(response => {
      setBooking1({
        booking_no: response.data.data.booking_no,
        aum_serial_no : response.data.data.aum_serial_no,
        customer_name: response.data.data.customer_id.company_name,
        letter_head:'No',
        action:'VIEW'
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

  const generate_roa =() => {
    window.open('/view-roa/'+edit_booking_id+"/"+booking1.action+"/"+booking1.letter_head,"_blank");
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
                <li className="breadcrumb-item active">Generate ROA</li>
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
                          <td>ROA</td>
                          <th>Format</th>
                          <td>
                            ROA Print
                          </td>
                        </tr>
                        <tr>
                          <th>Action</th>
                          <td>
                            <select name="action" class="form-select" onChange={onChange}>
                              <option value="VIEW">VIEW</option>
                              <option value="PRINT">PRINT</option>
                              {/*<option value="PDF">PDF</option>
                              <option value="EMAIL">EMAIL</option>*/}
                            </select>
                          </td>
                          <th>Letter Head</th>
                          <td>
                            <select name="letter_head" class="form-select" onChange={onChange}>
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" className="text-center"><input type="button" name="generate" value="Generate" onClick={generate_roa} className="btn btn-info"/></td>
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

export default GenerateROA
