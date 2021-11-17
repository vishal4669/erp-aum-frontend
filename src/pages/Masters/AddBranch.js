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


class AddBranch extends Component{
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

        this.InsertBranch = (event)=>{
         event.preventDefault();

         const branch_name = this.refs.branch_name.value
         const mst_companies_id = this.refs.mst_companies_id.value
         const branch_type = this.refs.branch_type.value
         const branch_code = this.refs.branch_code.value
         const branch_office_no = this.refs.branch_office_no.value
         const branch_complex_name = this.refs.branch_complex_name.value
         const branch_street_name = this.refs.branch_street_name.value
         const branch_land_mark = this.refs.branch_land_mark.value
         const branch_area = this.refs.branch_area.value
         const branch_city = this.refs.branch_city.value
         const branch_state = this.refs.branch_state.value
         const branch_country = this.refs.branch_country.value
         const branch_pincode = this.refs.branch_pincode.value
         const branch_phone = this.refs.branch_phone.value
         const branch_fax = this.refs.branch_fax.value
         const branch_mobile = this.refs.branch_mobile.value
         const branch_email = this.refs.branch_email.value
         const branch_establish_year = this.refs.branch_establish_year.value

         this.setState({ loading: true }, () => {
         //add Group information
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addBranch`,
          { branch_name:branch_name, mst_companies_id:mst_companies_id, branch_type:branch_type,
          branch_code : branch_code, branch_office_no:branch_office_no, branch_complex_name: branch_complex_name,
           branch_street_name : branch_street_name,branch_land_mark : branch_land_mark, branch_area: branch_area,
           branch_city : branch_city,branch_state : branch_state,branch_country : branch_country,
           branch_pin: branch_pincode, branch_phone : branch_phone, branch_fax : branch_fax,
           branch_mobile : branch_mobile, branch_email: branch_email, branch_establish_year : branch_establish_year}
           , {headers} )

                .then(response => {
                    if(response.data.success == true){
                        this.props.history.push('/branch');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                        this.props.history.push('/add-branch');
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


this.componentDidMount = () => {
      this.fetchcompany();
  }

  this.fetchcompany = () => {
      this.setState({ loading1: true }, () => {
           axios.get(`${process.env.REACT_APP_BASE_APIURL}listCompanies`)
          .then(response => {return response.data.data})
            .then(data1 => {
                  this.setState({options: data1})
                  this.setState({loading1: false})
             })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                  this.setState({loading1: false})
            })
      })
  }

      this.logChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    this.ResetBranch = () => {
  document.getElementById("AddBranch").reset();
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
           this.InsertBranch(e) }} method="POST" id="AddBranch">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/branch">Branch</Link></li>
                    <li className="breadcrumb-item active">Add Branch</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/branch" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {this.ResetBranch} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                                        <label className="required-field">Name</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_name" name="branch_name" className="form-control" placeholder="Enter Branch Name" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Company Name</label>
                                                        {loading1 ? <LoadingSpinner /> :
                                                            <select onChange={this.logChange} ref="mst_companies_id" name="company_id" label="Select Company" className="form-select" required>
                                                                  { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.company_name}</option>) }
                                                              </select>
                                                          }
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Branch Type</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_type" name="branch_type" className="form-control" placeholder="Enter Branch Type" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Code</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_code" name="branch_code" className="form-control" placeholder="Enter Branch Code" required/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                         <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label className="required-field">Office No</label>
                                                        <input type="text" onChange={this.logChange}  ref="branch_office_no" name="office_no" className="form-control" placeholder="Enter Office No" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Complex Name</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_complex_name" name="complex_name" className="form-control" placeholder="Enter Complex Name" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Street Name</label>
                                                        <input type="text" onChange={this.logChange}  ref="branch_street_name" name="street_name" className="form-control" placeholder="Enter Street Name"/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Land Mark</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_land_mark" name="land_mark" className="form-control" placeholder="Enter Land Mark"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Area</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_area" name="area" className="form-control" placeholder="Enter Area"/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">City</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_city" name="city" className="form-control" placeholder="Enter City Name" required/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">State</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_state" name="state" className="form-control" placeholder="Enter State Name" required/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Country</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_country" name="country" className="form-control" placeholder="Enter Country" required/>
                                                    </div>

                                                     <div className="col-md-2">
                                                        <label className="required-field">Pincode</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_pincode" name="pincode" className="form-control" placeholder="Enter Pincode" required/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label className="required-field">Phone</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_phone" name="phone" className="form-control" placeholder="Enter Phone No" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Fax</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_fax" name="fax" className="form-control" placeholder="Enter Fax No"/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Mobile</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_mobile" name="mobile" className="form-control" placeholder="Enter Mobile No" required/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Email</label>
                                                        <input type="email" onChange={this.logChange} ref="branch_email" name="email" className="form-control" placeholder="Enter Email" required/>
                                                    </div>

                                                     <div className="col-md-2">
                                                        <label className="required-field">Establish Year</label>
                                                        <input type="text" onChange={this.logChange} ref="branch_establish_year" name="establish_year" className="form-control" placeholder="Enter Establish Year" required/>
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
export default AddBranch;
