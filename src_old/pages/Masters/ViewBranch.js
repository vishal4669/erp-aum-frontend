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
import {decode as base64_decode, encode as base64_encode} from 'base-64';

class ViewBranch extends Component{
props = "";
constructor() {

        super();
        this.state= {
          loading1: false,
          branch_name : '',
          company_name : '',
          branch_type : '',
          branch_code : '',
          branch_office_no : '',
          branch_complex_name : '',
          branch_street_name : '',
          branch_land_mark : '',
          branch_area : '',
          branch_city : '',
          branch_state : '',
          branch_country : '',
          branch_pincode : '',
          branch_phone : '',
          branch_fax : '',
          branch_mobile : '',
          branch_email : '',
          branch_establish_year : '',  

        };
        const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }
const url = window.location.href
const branch_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
 this.componentDidMount=()=>{ 
          this.BranchData();
    } 


  this.BranchData=()=>{ 
    this.setState({ loading1: true }, () => { 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getBranch/`+branch_id,{headers})  
          .then(response => {  
              this.setState({   
                branch_name : response.data.data.branch_name,
                company_name : response.data.data.company_name,
                branch_type : response.data.data.branch_type,
                branch_code : response.data.data.branch_code,
                branch_office_no : response.data.data.branch_office_no,
                branch_complex_name : response.data.data.branch_complex_name,
                branch_street_name : response.data.data.branch_street_name,
                branch_land_mark : response.data.data.branch_land_mark,
                branch_area : response.data.data.branch_area,
                branch_city : response.data.data.branch_city,
                branch_state : response.data.data.branch_state,
                branch_country : response.data.data.branch_country,
                branch_pin : response.data.data.branch_pin,
                branch_phone : response.data.data.branch_phone,
                branch_fax : response.data.data.branch_fax,
                branch_mobile : response.data.data.branch_mobile,
                branch_email : response.data.data.branch_email,
                branch_establish_year : response.data.data.branch_establish_year,   
                 });
                 this.setState({loading1: false});  
  
          })  
          .catch((error) => {  
              this.setState({loading1: false});
              toastr.error(error.response.data.message);
          })  
      })
    } 



}



render() {
const { data1, loading1 } = this.state;
  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
      
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/branch">Branch</Link></li>
                    <li className="breadcrumb-item active">View Branch</li>
                </ol>
            </div>

          <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/branch" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>
                </ol>
            </div>        
        </div>

          { loading1 ? <center><LoadingSpinner /></center> :<Row>
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
                                                        <label>Name</label>
                                                        <input type="text" value={this.state.branch_name} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Company Name</label>
                                                       <input type="text" value={this.state.company_name} className="form-control" readOnly/>
                                                    </div> 

                                                    <div className="col-md-3">
                                                        <label>Branch Type</label>
                                                        <input type="text" value={this.state.branch_type} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Code</label>
                                                        <input type="text" value={this.state.branch_code} className="form-control" readOnly/>
                                                    </div>       
                                                </div>  
                                            </div>
                                        </div>

                                         <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Office No</label>
                                                        <input type="text" value={this.state.branch_office_no} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Complex Name</label>
                                                        <input type="text" value={this.state.branch_complex_name} className="form-control" readOnly/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Street Name</label>
                                                        <input type="text" value={this.state.branch_street_name} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Land Mark</label>
                                                        <input type="text" value={this.state.branch_land_mark} className="form-control" readOnly/>
                                                    </div>       
                                                </div>  
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Area</label>
                                                        <input type="text" value={this.state.branch_area} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>City</label>
                                                        <input type="text" value={this.state.branch_city} className="form-control" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>State</label>
                                                        <input type="text" value={this.state.branch_state} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Country</label>
                                                        <input type="text" value={this.state.branch_country} className="form-control" readOnly/>
                                                    </div>   

                                                     <div className="col-md-2">
                                                        <label>Pincode</label>
                                                        <input type="text" value={this.state.branch_pin} className="form-control" readOnly/>
                                                      </div>  

                                                </div> 
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Phone</label>
                                                        <input type="text" value={this.state.branch_phone} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Fax</label>
                                                        <input type="text" value={this.state.branch_fax} className="form-control" readOnly/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Mobile</label>
                                                        <input type="text" value={this.state.branch_mobile} className="form-control" readOnly/>
                                                    </div>  

                                                    <div className="col-md-2">
                                                        <label>Email</label>
                                                        <input type="text" value={this.state.branch_email} className="form-control" readOnly/>
                                                    </div>   

                                                     <div className="col-md-2">
                                                        <label>Establish Year</label>
                                                        <input type="text" value={this.state.branch_establish_year} className="form-control" readOnly/>
                                                    </div>  

                                                </div>  
                                            </div>
                                        </div>
                
                                
                </CardBody>
              </Card>
            </Col>
          </Row>}
        </Container>
      </div>
    </React.Fragment>

  );
};
}
export default ViewBranch;
