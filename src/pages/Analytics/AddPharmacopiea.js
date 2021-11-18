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


class AddPhramacopiea extends Component {

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
        this.InsertPharamacopiea = (event)=>{
         event.preventDefault();

         const pharmacopeia_name = this.refs.pharmacopeia_name.value
         const vol_no = this.refs.vol_no.value
         const pharmacopeia_year = this.refs.pharmacopeia_year.value
         const pharmacopeia_edition = this.refs.pharmacopeia_edition.value

         this.setState({ loading: true }, () => {
         //add Group information

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addPharmacopeia`,
          { pharmacopeia_name:pharmacopeia_name, vol_no:vol_no, pharmacopeia_year:pharmacopeia_year,
            pharmacopeia_edition:pharmacopeia_edition} , {headers} )

                .then(response => {
                    if(response.data.success == true){
                        this.props.history.push('/pharmacopiea');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                        this.props.history.push('/add-pharmacopiea');
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

    this.ResetPharmacopiea = () => {
  document.getElementById("AddPharmacopeia").reset();
}

// Constructor End
}
render(){
  const { data, loading } = this.state;
  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           this.InsertPharamacopiea(e) }} method="POST" id="AddPharmacopeia">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><Link to="/pharmacopiea">Pharmacopiea</Link></li>
                    <li className="breadcrumb-item active">Add Pharmacopiea</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/pharmacopiea" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {this.ResetPharmacopiea} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Basic Info</i>
                    </Alert></h5>

                    <div className="mb-3 row">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="required-field">Pharmacopeia Name</label>
                                    <input onChange={this.logChange} ref="pharmacopeia_name" className="form-control" type="text" name="pharmacopeia_name" placeholder="Enter Pharmacopeia Name" required/>
                                </div>

                                <div className="col-md-3">
                                    <label className="required-field">Vol No</label>
                                    <input onChange={this.logChange} ref="vol_no" className="form-control" type="text" name="vol_no" placeholder="Enter Vol No" required/>
                                </div>

                                <div className="col-md-3">
                                    <label className="required-field">Year</label>
                                    <input onChange={this.logChange} ref="pharmacopeia_year" className="form-control" type="text" name="year" placeholder="Enter Year" required/>
                                </div>

                                <div className="col-md-3">
                                    <label className="required-field">Edition</label>
                                    <input onChange={this.logChange} ref="pharmacopeia_edition" className="form-control" type="text" name="edition" placeholder="Enter Edition" required/>
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
}
export default AddPhramacopiea
