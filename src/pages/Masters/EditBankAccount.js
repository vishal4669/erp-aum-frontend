import React, { Component, useState, useEffect } from 'react';

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
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function EditBankAccount(props){
const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }
  const [bankaccount, setbankaccount]= useState({bank_name : '',branch_name : '',customer_id : '',account_no:''
    ,micr_code:'',ifsc_code:''})
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
const url = window.location.href
const bank_account_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_bank_account_id =url.substring(url.lastIndexOf('/') + 1)
        const EditBankAccount = (event)=>{
         event.preventDefault();
         const data = {
          bank_name : bankaccount.bank_name,
          branch_name : bankaccount.branch_name,
          customer_id : bankaccount.customer_id,
          account_no : bankaccount.account_no,
          micr_code : bankaccount.micr_code,
          ifsc_code : bankaccount.ifsc_code
         };


        {setLoading(true)};

         axios.post( `${process.env.REACT_APP_BASE_APIURL}editBank/`+bank_account_id,data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/bankaccount');
                        toastr.success(response.data.message);
                        {setLoading(false)}
                    }else{
                        props.history.push('/edit-bank-account/'+edit_bank_account_id);
                        toastr.error(response.data.message);
                        {setLoading(false)}
                    }
                })
                .catch((error) => {
                  {setLoading(false)}
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
                })
      }

useEffect(() => {
          BankAccountData();
}, []);

    const BankAccountData=()=>{
    {setLoading1(true)}
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getBank/`+bank_account_id,{headers})
          .then(response => {
              setbankaccount(response.data.data);
               {setLoading1(false)}

          })
          .catch((error) => {
              {setLoading1(false)}
              toastr.error(error.response.data.message);
              this.setState({loading: false});
          })
    }

      const logChange = (e) =>{
        e.persist();
        setbankaccount({...bankaccount,[e.target.name]: e.target.value});
    }

  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           EditBankAccount(e) }} method="POST" id="EditBankAccount">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/bankaccount">Bank Account Master</Link></li>
                    <li className="breadcrumb-item active">Edit Bank Account Master</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/bankaccount" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;

                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>}
                </ol>
            </div>
        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  {loading1 ? <center><LoadingSpinner /></center> :
                    <div>
                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="required-field">Bank Name</label>
                                                        <input value={bankaccount.bank_name} className="form-control" type="text" name="bank_name" placeholder="Enter Bank Name" onChange={logChange} required/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Branch Name</label>
                                                        <input value={bankaccount.branch_name} className="form-control" type="text" name="branch_name" placeholder="Enter Branch Name" onChange={logChange}/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Customer ID</label>
                                                        <input value={bankaccount.customer_id} className="form-control" type="text" name="customer_id" placeholder="Enter Customer ID" onChange={logChange}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                       <div className="mb-3 row">
                                            <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <label className="required-field">Account No</label>
                                                            <input value={bankaccount.account_no} className="form-control" type="text" name="account_no" placeholder="Enter Account No" onChange={logChange} required/>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label className="required-field">MICR Code</label>
                                                            <input value={bankaccount.micr_code} className="form-control" id="example-text-input" name="micr_code" placeholder="Enter MICR Code" onChange={logChange} required/>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="required-field">IFSC Code</label>
                                                            <input value={bankaccount.ifsc_code} className="form-control" id="example-text-input" name="ifsc_code" placeholder="Enter IFSC Code" onChange={logChange} required/>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                    </div>
                    }
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
export default EditBankAccount;
