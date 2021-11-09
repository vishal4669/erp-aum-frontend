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

class EditGroup extends Component{

constructor(props) {

        super(props);
        this.state= {
          data : [],
          options : [],
          loading : false,
          loading1: false,
          groupName : '',
          groupCode : '',
          parentGroup : '',

        };
        const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }
const url = window.location.href
const group_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_group_id = url.substring(url.lastIndexOf('/') + 1)

        this.UpdateGroup=(e)=> { 
    this.setState({ loading: true }, () => { 
    e.preventDefault();   
    axios.post(`${process.env.REACT_APP_BASE_APIURL}editGroup/`+group_id,{group_name : this.state.groupName,
      group_code : this.state.groupCode,parent_group:this.state.parentGroup},{headers})  
        .then(response => {  
          if(response.data.success == true){ 
            this.props.history.push('/group')  
            toastr.success(response.data.message);
            this.setState({loading: false}); 
          }
          else{
                props.history.push('/edit-group/'+edit_group_id);
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

        this.componentDidMount=()=>{ 
          this.listParentGroup();
          this.GroupData();
    } 


        this.listParentGroup = () =>{
          this.setState({ loading1: true }, () => { 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listParentGroup`,{headers})
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

  this.GroupData=()=>{ 
    this.setState({ loading1: true }, () => { 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getGroup/`+group_id,{headers})  
          .then(response => {  
              this.setState({   
                groupName: response.data.data.group_name, 
                groupCode: response.data.data.group_code,
                parentGroup : response.data.data.parent_group,    
                 });
                 this.setState({loading1: false});  
  
          })  
          .catch((error) => {  
              this.setState({loading1: false});
               toastr.error(error.response.data.message); 
          })  
      })
    } 




this.onChangeGroupName = (e) => {  
    this.setState({  
        groupName: e.target.value  
    });  
  }  


this.onChangeGroupCode = (e) => {  
    this.setState({  
        groupCode: e.target.value  
    });  
  } 

  this.onChangeParentGroup = (e) => {  
    this.setState({  
        parentGroup: e.target.value  
    });  
  }  
//constructor end
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
           this.UpdateGroup(e) }} method="POST" id="EditGroup">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/group">Group</Link></li>
                    <li className="breadcrumb-item active">Edit Group</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/group" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                   
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
                    {loading1 ? <LoadingSpinner /> : 
                    <div className="mb-3 row">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4">
                                    <label>Name</label>
                                    <input type="text" value={this.state.groupName} onChange={this.onChangeGroupName} name="group_name" className="form-control" placeholder="Enter Group Name" required/>
                                </div>
                                 
                                  <div className="col-md-4">
                                    <label>Parent Group</label>
                                       
                                          {loading1 ? <LoadingSpinner /> : <select value={this.state.parentGroup} onChange={this.onChangeParentGroup} className="form-select" name="parent_group">
                                           <option value="">Select Parent Group</option>
                                           { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.group_name}</option>) }
                                        </select> }
                                </div>

                                <div className="col-md-4">
                                    <label>Code</label>
                                    <input value={this.state.groupCode} onChange={this.onChangeGroupCode} type="text" name="group_code" className="form-control" placeholder="Enter Group Code" required/>

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
}
export default EditGroup;
