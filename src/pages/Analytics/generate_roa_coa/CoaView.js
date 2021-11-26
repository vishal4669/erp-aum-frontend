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
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { MDBTable, MDBTableBody} from 'mdbreact';
import viewOnly from "../../../assets/images/Viewonly.png"

function CoaView(props) {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
  const url = window.location.href
  const booking_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_booking_id = url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [booking1, setBooking1] = useState({booking_no:'',customer_name:'',aum_serial_no:''})

  useEffect(() => {
    {setLoading1(true)}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}getBooking/` + booking_id, { headers })
    .then(response => {
      setBooking1({
        booking_no: response.data.data.booking_no,
        aum_serial_no : response.data.data.aum_serial_no,
        customer_name: response.data.data.customer_id.company_name
      });
      {setLoading1(false)}
    })
    .catch((error) => {
      if(error.response.data.message == "Token is Expired" || error.response.data.status == "401"){
        props.history.push('/');
      } else {
        toastr.error(error.response.data.message);
      }
      {setLoading1(false)}
    })
   document.addEventListener('contextmenu', (e) => {
     e.preventDefault();
   });
  }, []);

  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>

          {loading1 ? <center><LoadingSpinner /></center> :
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <img src={viewOnly} id="watermark" style={{width:'100%'}}/>
                    <MDBTable bordered style={{border:'2px solid grey',fontWeight:'500'}}>
                      <MDBTableBody>
                        <tr>
                          <th rowspan="3">
                            Lincoln Pharmaceuticals Ltd.<br/>
                            10,12,13, Trimul Estate, Near Khatraj Chokdi, After Vadsar<br/>
                            Village,Kalol--,Gandhinagar.,GUJARAT,India
                          </th>
                          <th colspan="2">Certificate No</th>
                          <td colspan="2">{booking1.booking_no}</td>
                        </tr>
                        <tr>
                          <th colspan="2">COA Release Date</th>
                          <td colspan="2">25/11/2021</td>
                        </tr>
                        <tr>
                          <th colspan="2">Sample Received Date</th>
                          <td colspan="2">25/11/2021</td>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <MDBTable bordered style={{border:'2px solid grey',fontWeight:'500'}}>
                      <MDBTableBody>
                        <tr>
                          <th colspan="3">Name of Sample</th>
                          <td colspan="3">PenZor 1 ml Injection</td>
                          <th colspan="3">Generic Name</th>
                          <td colspan="3">PenZor Injection BP 30 mg/ml</td>
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

export default CoaView
