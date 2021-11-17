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

class EditBranch extends Component{
constructor(props) {

        super();
        this.state= {
          loading1: false,
          loading : false,
          data : [],
          options : [],
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
const edit_branch_id = url.substring(url.lastIndexOf('/') + 1)
 this.componentDidMount=()=>{
          this.BranchData();
          this.fetchcompany();
    }


    this.UpdateBranch=(e)=> {
    this.setState({ loading: true }, () => {
    e.preventDefault();
    const branch_name = this.state.branch_name
    const company_name = this.state.company_name
    const branch_type = this.state.branch_type
    const branch_code = this.state.branch_code
    const branch_office_no = this.state.branch_office_no
    const branch_complex_name = this.state.branch_complex_name
    const branch_street_name = this.state.branch_street_name
    const branch_land_mark = this.state.branch_land_mark
    const branch_area = this.state.branch_area
    const branch_city = this.state.branch_city
    const branch_state = this.state.branch_state
    const branch_country = this.state.branch_country
    const branch_pin = this.state.branch_pin
    const branch_phone = this.state.branch_phone
    const branch_fax = this.state.branch_fax
    const branch_mobile = this.state.branch_mobile
    const branch_email = this.state.branch_email
    const branch_establish_year = this.state.branch_establish_year
    axios.post(`${process.env.REACT_APP_BASE_APIURL}editBranch/`+branch_id,{branch_name:branch_name,
      mst_companies_id:company_name, branch_type:branch_type,
          branch_code : branch_code, branch_office_no:branch_office_no, branch_complex_name: branch_complex_name,
           branch_street_name : branch_street_name,branch_land_mark : branch_land_mark, branch_area: branch_area,
           branch_city : branch_city,branch_state : branch_state,branch_country : branch_country,
           branch_pin: branch_pin, branch_phone : branch_phone, branch_fax : branch_fax,
           branch_mobile : branch_mobile, branch_email: branch_email, branch_establish_year : branch_establish_year}
           ,{headers})
        .then(response => {
          if(response.data.success == true){
            this.props.history.push('/branch')
           toastr.success(response.data.message);
            this.setState({loading: false});
          }
          else{
                props.history.push('/edit-branch/'+edit_branch_id);
                toastr.error(response.data.message);
                this.setState({loading: false});
            }
        })
        .catch((error) => {
              this.setState({loading: false});
              toastr.error(error.response.data.message);
          })
    })
  }


  this.BranchData=()=>{
    this.setState({ loading1: true }, () => {
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getBranch/`+branch_id,{headers})
          .then(response => {
              this.setState({
                branch_name : response.data.data.branch_name,
                company_name : response.data.data.mst_companies_id,
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
              //console.log(this.state.company_name)
                 this.setState({loading1: false});

          })
          .catch((error) => {
              this.setState({loading1: false});
              toastr.error(error.response.data.message);
          })
      })
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
//setting value in fields while editing
this.onChangeBranchName = (e) => {
    this.setState({
        branch_name: e.target.value
    });
  }


this.onChangeCompany = (e) => {
    this.setState({
        company_name: e.target.value
    });
  }


  this.onChangeBranchType = (e) => {
    this.setState({
        branch_type: e.target.value
    });
  }

   this.onChangeBranchCode = (e) => {
    this.setState({
        branch_code: e.target.value
    });
  }

    this.onChangeBranchOfficeNo = (e) => {
    this.setState({
        branch_office_no: e.target.value
    });
  }

    this.onChangeBranchComplexName = (e) => {
    this.setState({
        branch_complex_name: e.target.value
    });
  }

    this.onChangeBranchStreetName = (e) => {
    this.setState({
        branch_street_name: e.target.value
    });
  }

    this.onChangeBranchLandMark = (e) => {
    this.setState({
        branch_land_mark: e.target.value
    });
  }

    this.onChangeBranchArea = (e) => {
    this.setState({
        branch_area: e.target.value
    });
  }

    this.onChangeBranchCity = (e) => {
    this.setState({
        branch_city: e.target.value
    });
  }

    this.onChangeBranchState = (e) => {
    this.setState({
        branch_state: e.target.value
    });
  }

    this.onChangeBranchCountry = (e) => {
    this.setState({
        branch_country: e.target.value
    });
  }

  this.onChangeBranchPin = (e) => {
    this.setState({
        branch_pin: e.target.value
    });
  }

      this.onChangeBranchPhone = (e) => {
    this.setState({
        branch_phone: e.target.value
    });
  }

      this.onChangeBranchFax = (e) => {
    this.setState({
        branch_fax: e.target.value
    });
  }

      this.onChangeBranchMobile = (e) => {
    this.setState({
        branch_mobile: e.target.value
    });
  }

      this.onChangeBranchEmail = (e) => {
    this.setState({
        branch_email: e.target.value
    });
  }

      this.onChangeBranchEstablishYear = (e) => {
    this.setState({
        branch_establish_year: e.target.value
    });
  }

}



render() {
const { data1, loading1 } = this.state;
const { data, loading } = this.state;
  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
       <Form onSubmit={ (e) => {
           this.UpdateBranch(e) }} method="POST" id="EditBranch">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/branch">Branch</Link></li>
                    <li className="breadcrumb-item active">Edit Branch</li>
                </ol>
            </div>

          <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/branch" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>
                    &nbsp;{ loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>}
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
                                                        <label className="required-field">Name</label>
                                                        <input type="text" value={this.state.branch_name} onChange={this.onChangeBranchName} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Company Name</label>
                                                         {loading1 ? <LoadingSpinner /> :
                                                            <select value={this.state.company_name} onChange={this.onChangeCompany} label="Select Company" className="form-select" required>
                                                                  { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.company_name}</option>) }
                                                              </select>
                                                          }

                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Branch Type</label>
                                                        <input type="text" value={this.state.branch_type} onChange={this.onChangeBranchType} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Code</label>
                                                        <input type="text" value={this.state.branch_code} onChange={this.onChangeBranchCode} className="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                         <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label className="required-field">Office No</label>
                                                        <input type="text" value={this.state.branch_office_no} onChange={this.onChangeBranchOfficeNo} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Complex Name</label>
                                                        <input type="text" value={this.state.branch_complex_name} onChange={this.onChangeBranchComplexName} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Street Name</label>
                                                        <input type="text" value={this.state.branch_street_name} onChange={this.onChangeBranchStreetName} className="form-control"/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Land Mark</label>
                                                        <input type="text" value={this.state.branch_land_mark} onChange={this.onChangeBranchLandMark} className="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Area</label>
                                                        <input type="text" value={this.state.branch_area} onChange={this.onChangeBranchArea} className="form-control"/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">City</label>
                                                        <input type="text" value={this.state.branch_city} onChange={this.onChangeBranchCity} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">State</label>
                                                        <input type="text" value={this.state.branch_state} onChange={this.onChangeBranchState} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Country</label>
                                                        <input type="text" value={this.state.branch_country} onChange={this.onChangeBranchCountry} className="form-control" required/>
                                                    </div>

                                                     <div className="col-md-2">
                                                        <label className="required-field">Pincode</label>
                                                        <input type="text" value={this.state.branch_pin} onChange={this.onChangeBranchPin}className="form-control" required/>
                                                      </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label className="required-field">Phone</label>
                                                        <input type="text" value={this.state.branch_phone} onChange={this.onChangeBranchPhone} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Fax</label>
                                                        <input type="text" value={this.state.branch_fax} onChange={this.onChangeBranchFax} className="form-control"/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Mobile</label>
                                                        <input type="text" value={this.state.branch_mobile} onChange={this.onChangeBranchMobile} className="form-control" required/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Email</label>
                                                        <input type="text" value={this.state.branch_email} onChange={this.onChangeBranchEmail} className="form-control" required/>
                                                    </div>

                                                     <div className="col-md-2">
                                                        <label className="required-field">Establish Year</label>
                                                        <input type="text" value={this.state.branch_establish_year} onChange={this.onChangeBranchEstablishYear} className="form-control" required/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                </CardBody>
              </Card>
            </Col>
          </Row>}
         </Form>
        </Container>
      </div>
    </React.Fragment>

  );
};
}
export default EditBranch;
