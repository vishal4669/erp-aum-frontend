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


class AddDepartment extends Component{
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

        this.InsertDepartment = (event)=>{
         event.preventDefault();

         const mst_branches_id = this.refs.mst_branches_id.value
         const department_name = this.refs.department_name.value

         this.setState({ loading: true }, () => {
         //add Group information

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addDepartment`,
          { mst_branches_id:mst_branches_id, department_name:department_name} , {headers} )

                .then(response => {
                    if(response.data.success == true){
                        this.props.history.push('/department');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                        this.props.history.push('/add-department');
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


        this.componentDidMount = () =>{
          this.setState({ loading1: true }, () => {
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listBranch?is_dropdown=1`,{headers})
        .then(response => {
                this.setState({options: response.data.data})
                 this.setState({loading1: false});
           })
          .catch((error) => {
                toastr.error(error.response.data.message);
                this.setState({loading1: false});
          })

      })

  }

      this.logChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }

    this.ResetDepartment = () => {
  document.getElementById("AddDepartment").reset();
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
           this.InsertDepartment(e) }} method="POST" id="AddDepartment">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/department">Department</Link></li>
                    <li className="breadcrumb-item active">Add Department</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/department" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {this.ResetDepartment} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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

                                  <div className="col-md-6">
                                    <label className="required-field">Branch</label>

                                          {loading1 ? <LoadingSpinner /> : <select onChange={this.logChange} ref="mst_branches_id" className="form-select" name="mst_branches_id" required>
                                           <option value="">Select Branch</option>
                                           { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.branch_name}</option>) }
                                        </select> }
                                </div>

                                <div className="col-md-6">
                                    <label className="required-field">Department Name</label>
                                    <input onChange={this.logChange} ref="department_name" type="text" name="department_name" className="form-control" placeholder="Enter Department Name" required/>

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
export default AddDepartment;
