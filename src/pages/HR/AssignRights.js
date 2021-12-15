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
import Breadcrumbs from '../../components/Common/Breadcrumb';
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { MDBTable, MDBTableBody,MDBTableHead} from 'mdbreact';
import moment from 'moment'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import $ from 'jquery'

function AssignRights(props) {
  const headers = {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer '+localStorage.getItem('token')
    };

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [rightsData, setRightsData] = useState([{section:'',modules:'',id:'',can_view:'',can_sms:'',
  can_quick_access_tabs:'',can_print:'',can_email:'',can_delete:'',can_add:''}])

  useEffect(() => {
    {setLoading1(true)}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}assignRoleDesign`,{ headers })
    .then(response => {
      setRightsData(response.data.data)
      {setLoading1(false)}
  })
  .catch((error) => {
      console.log(error)
      if(error.response.data.message == "Token is Expired" || error.response.data.status == "401"){
        props.history.push('/');
      } else {
        toastr.error(error.response.data.message);
      }
      {setLoading1(false)}
    })
  }, []);

  return (

    <React.Fragment>
     <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>

        <Form  method="POST">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">HR</li>
                    <li className="breadcrumb-item"><a href="/employee">Employee</a></li>
                    <li className="breadcrumb-item active">Assign Rights</li>
                </ol>
            </div>
        </div>

          {loading1 ? <center><LoadingSpinner /></center> :
            <Row>
              <Col>
                <Card>
                  <CardBody>
                       <h5> <Alert color="info" role="alert">
                       <i className="fa fa-comment">&nbsp;Assign Rights Info</i>
                      </Alert></h5>

                      <MDBTable bordered style={{textAlign:'center'}}>
                        <MDBTableHead>
                          <tr>
                            <th>Sections</th>
                            <th>Modules</th>
                            <th>Add</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View</th>
                            <th>Email</th>
                            <th>Print</th>
                            <th>Quick Access Tab</th>
                            <th>SMS</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {rightsData.length ?
                          rightsData.map((x, i) => (
                            <tr>
                              <td>{x.section}</td>
                              <td>{x.modules}</td>
                              <td>{x.can_add == '1' ? <input type="checkbox" name="can_add" value=""/>: ''}</td>
                              <td>{x.can_edit == '1' ? <input type="checkbox" name="can_edit" value=""/>: ''}</td>
                              <td>{x.can_delete == '1' ? <input type="checkbox" name="can_delete" value=""/>: ''}</td>
                              <td>{x.can_view == '1' ? <input type="checkbox" name="can_view" value=""/>: ''}</td>
                              <td>{x.can_email == '1' ? <input type="checkbox" name="can_email" value=""/>: ''}</td>
                              <td>{x.can_print == '1' ? <input type="checkbox" name="can_print" value=""/>: ''}</td>
                              <td>{x.can_quick_access_tabs == '1' ? <input type="checkbox" name="can_quick_access_tabs" value=""/>: ''}</td>
                              <td>{x.can_sms == '1' ? <input type="checkbox" name="can_sms" value=""/>: ''}</td>
                            </tr>
                          )) : <tr className="text-center"><td colspan="10">No Data Available</td></tr>}
                        </MDBTableBody>
                      </MDBTable>


                  </CardBody>
                </Card>
              </Col>
            </Row>
          }
       </Form>
        </Container>
      </div>
    </React.Fragment>

  )
}

export default AssignRights
