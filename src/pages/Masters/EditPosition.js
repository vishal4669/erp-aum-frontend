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

class EditPosition extends Component{
constructor(props) {

        super(props);
        this.state= {
          data : [],
          options : [],
          loading : false,
          loading1: false,
          mst_departments_id : '',
          position_title : '',

        };
         const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }
const url = window.location.href
const position_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_position_id = url.substring(url.lastIndexOf('/') + 1)


  this.componentDidMount=()=>{
          this.PositionData();
          this.DepartmentList();
    }

  this.PositionData=()=>{
    this.setState({ loading1: true }, () => {
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getPosition/`+position_id,{headers})
          .then(response => {
              this.setState({
                mst_departments_id: response.data.data.mst_departments_id,
                position_title: response.data.data.position_title,
                 });
                 this.setState({loading1: false});

          })
          .catch((error) => {
              this.setState({loading1: false});
              toastr.error(error.response.data.message);
          })
      })
    }


        this.UpdatePosition = (event)=>{
         event.preventDefault();

         const mst_departments_id = this.state.mst_departments_id
         const position_title = this.state.position_title

         this.setState({ loading: true }, () => {
         //add Group information

         axios.post( `${process.env.REACT_APP_BASE_APIURL}editPosition/`+position_id,
          { mst_departments_id:mst_departments_id, position_title:position_title} , {headers} )

                .then(response => {
                    if(response.data.success == true){
                        this.props.history.push('/position');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                        this.props.history.push('/edit-position/'+edit_position_id);
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


        this.DepartmentList = () =>{
          this.setState({ loading1: true }, () => {
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listDepartment?is_dropdown=1`,{headers})
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

this.onChangeMstDepartmentID = (e) => {
    this.setState({
        mst_departments_id: e.target.value
    });
  }

  this.onChangePositionTitle = (e) => {
    this.setState({
        position_title: e.target.value
    });
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
        <Form onSubmit={ (e) => {
           this.UpdatePosition(e) }} method="POST" id="AddPosition">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/position">Position Master</Link></li>
                    <li className="breadcrumb-item active">Edit Position</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/position" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
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
                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Basic Info</i>
                    </Alert></h5>

                    <div className="mb-3 row">
                        <div className="form-group">
                            {loading1 ? <LoadingSpinner /> :
                            <div className="row">
                                  <div className="col-md-6">
                                    <label className="required-field">Department</label>

                                          <select value={this.state.mst_departments_id} onChange={this.onChangeMstDepartmentID} className="form-select" required>
                                           <option value="">Select Department</option>
                                           { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                        </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="required-field">Position</label>
                                    <input value={this.state.position_title} onChange={this.onChangePositionTitle} type="text" className="form-control" placeholder="Enter Department Name" required/>

                                 </div>
                            </div>
                            }
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
export default EditPosition;
