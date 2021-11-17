import React, { Component, useState } from 'react';

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
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';


class AddBankAccount extends Component{
props = "";
constructor() {

        super();
        this.state= {
          data : [],
          options : [],
          loading : false,
          loading1: false,

        };
        const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

        this.InsertBankAccount = (event)=>{
         event.preventDefault();

         const bank_name = this.refs.bank_name.value
         const branch_name = this.refs.branch_name.value
         const customer_id = this.refs.customer_id.value
         const account_no = this.refs.account_no.value
         const micr_code = this.refs.micr_code.value
         const ifsc_code = this.refs.ifsc_code.value

         this.setState({ loading: true }, () => {
         //add Group information
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addBank`,
          { bank_name:bank_name, branch_name:branch_name, customer_id:customer_id,
          account_no : account_no, micr_code:micr_code, ifsc_code:ifsc_code}
           , {headers} )

                .then(response => {
                    if(response.data.success == true){
                        this.props.history.push('/bankaccount');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                        this.props.history.push('/add-bank-account');
                        toastr.error(response.data.message);
                        this.setState({loading: false});
                    }
                })
                .catch((error) => {
                  this.setState({loading: false});
                  toastr.error(error.response.data.message);
                })
         })
         return
      }

      this.logChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    this.ResetBankAccount = () => {
  document.getElementById("AddBankAccount").reset();
}


}


render() {
const { data, loading } = this.state;
const { data1, loading1 } = this.state;
  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
      {/* ref={(el) => this.myFormRef = el} in form tag last if form add has issue*/}
        <Form onSubmit={ (e) => {
           this.InsertBankAccount(e) }} method="POST" id="AddBankAccount">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/bankaccount">Bank Account Master</Link></li>
                    <li className="breadcrumb-item active">Add Bank Account Master</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/bankaccount" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {this.ResetBankAccount} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                    </li>}
                </ol>
            </div>
        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="required-field">Bank Name</label>
                                                        <input className="form-control" type="text" id="example-text-input" name="bank_name" placeholder="Enter Bank Name" onChange={this.logChange} ref="bank_name" required/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Branch Name</label>
                                                        <input className="form-control" type="text" id="example-text-input" name="branch_name" placeholder="Enter Branch Name" onChange={this.logChange} ref="branch_name"/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Customer ID</label>
                                                        <input className="form-control" type="text" id="example-text-input" name="customer_id" placeholder="Enter Customer ID" onChange={this.logChange} ref="customer_id"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                       <div className="mb-3 row">
                                            <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <label className="required-field">Account No</label>
                                                            <input className="form-control" type="text" id="example-text-input" name="account_no" placeholder="Enter Account No" onChange={this.logChange} ref="account_no" required/>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="required-field">MICR Code</label>
                                                            <input className="form-control" type="text" id="example-text-input" name="micr_code" placeholder="Enter MICR Code" onChange={this.logChange} ref="micr_code" required/>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="required-field">IFSC Code</label>
                                                            <input className="form-control" type="text" id="example-text-input" name="ifsc_code" placeholder="Enter IFSC Code" onChange={this.logChange} ref="ifsc_code" required/>
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

  );
};
}
export default AddBankAccount;
