import React, { useState, Component } from "react"

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
} from "reactstrap"

import { withRouter, Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import HorizontalLayout from "../../components/HorizontalLayout"
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios'
import PropTypes from 'prop-types'
import LoadingSpinner from '../../components/LoadingSpinner';

const AddCompany = (props) => {
const {customchk, setcustomchk} = useState(true)
const {toggleSwitch, settoggleSwitch} = useState(true)
const {toggleSwitchSize, settoggleSwitchSize} = useState(true)
const [companyName, setCompanyname] = useState('')
const [loading, setLoading] = useState(false);

const headers = {
    'Authorization' : "Bearer "+localStorage.getItem('token')
  }
const ResetCompany = () => {
  document.getElementById("AddCompany").reset();
}
const Insertcompany=(event)=>{
  {setLoading(true)};
 event.preventDefault();
 //add year and company id both
 axios.post( `${process.env.REACT_APP_BASE_APIURL}addCompany`, { company_name:companyName } , {headers} )

        .then((response) => {

            if(response.data.success == true){
                props.history.push('/company');
                toastr.success(response.data.message);
                { setLoading(false) }
            }else{
                props.history.push('/add-company');
                toastr.error(response.data.message);
                { setLoading(false) }
            }

        })

          .catch((error) => {
              { setLoading(false) }
              toastr.error(error.response.data.message);
          })
}


  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
          <Form onSubmit={(e) => {
                        Insertcompany(e) }} method="POST" id="AddCompany">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><a href="/company">Company</a></li>
                    <li className="breadcrumb-item active">Add Company</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/company" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button type="submit" className="btn btn-primary btn-sm" onClick = {ResetCompany}><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp; { loading ? <center><LoadingSpinner /></center> :<li><button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button></li>}
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

                                <div className="col-md-12">
                                    <label className="required-field">Company Name</label>
                                    <input type="text" onChange={event => setCompanyname(event.target.value)}  name="company_name" className="form-control" placeholder="Enter Company Name" required/>
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
export default AddCompany
