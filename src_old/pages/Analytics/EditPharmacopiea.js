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

class EditPhramacopiea extends Component {
 
constructor(props) {

        super(props);
        this.state= {
          loading : false,
          loading1: false,
           pharmacopeia_name : '',
          pharmacopeia_year : '',
          pharmacopeia_edition : '',
          val_no : '',
        };
        const headers = {
           'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }
const url = window.location.href
const pharmacopiea_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_pharmacopiea_id = url.substring(url.lastIndexOf('/') + 1)

     this.UpdatePharmacopiea=(e)=> { 
    this.setState({ loading: true }, () => { 
    e.preventDefault();   
    axios.post(`${process.env.REACT_APP_BASE_APIURL}editPharmacopeia/`+pharmacopiea_id,{pharmacopeia_name : this.state.pharmacopeia_name,
      vol_no : this.state.vol_no,pharmacopeia_year:this.state.pharmacopeia_year,pharmacopeia_edition:this.state.pharmacopeia_edition
    },{headers})  
        .then(response => {  
          if(response.data.success == true){ 
            this.props.history.push('/pharmacopiea')  
            toastr.success(response.data.message);
            this.setState({loading: false}); 
          }
          else{
                props.history.push('/edit-pharmacopiea/'+edit_pharmacopiea_id);
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
          this.pharmacopieaData();
    } 

 this.pharmacopieaData = () =>{
        this.setState({ loading1: true }, () => { 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getPharmacopeia/`+pharmacopiea_id,{headers})  
          .then(response => {  
              this.setState({   
                pharmacopeia_name: response.data.data.pharmacopeia_name, 
                vol_no: response.data.data.vol_no,
                pharmacopeia_year : response.data.data.pharmacopeia_year, 
                pharmacopeia_edition : response.data.data.pharmacopeia_edition,    
                 });
                 this.setState({loading1: false});  
  
          })  
          .catch((error) => {  
              this.setState({loading1: false});
              toastr.error(error.response.data.message); 
          })  
      })

  }

this.onChangePharmacopieaName = (e) => {  
    this.setState({  
        pharmacopeia_name: e.target.value  
    });  
  }  


this.onChangeVolNo = (e) => {  
    this.setState({  
        vol_no: e.target.value  
    });  
  } 

  this.onChangePharmacopieaEdition = (e) => {  
    this.setState({  
        pharmacopeia_edition: e.target.value  
    });  
  }  

  this.onChangePharmacopieaYear = (e) => {  
    this.setState({  
        pharmacopeia_year: e.target.value  
    });  
  }  

// Constructor End
}
render(){
  const { data, loading } = this.state;
  const { data1, loading1 } = this.state;
  return (
    <React.Fragment>
      <HorizontalLayout/>  
      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           this.UpdatePharmacopiea(e) }} method="POST" id="AddPharmacopeia">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><Link to="/pharmacopiea">Pharmacopiea</Link></li>
                    <li className="breadcrumb-item active">Edit Pharmacopiea</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/pharmacopiea" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                   
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
                     { loading1 ? <center><LoadingSpinner /></center> :
                    <div className="mb-3 row">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Pharmacopeia Name</label>
                                    <input value={this.state.pharmacopeia_name} onChange={this.onChangePharmacopieaName} className="form-control" type="text" name="pharmacopeia_name" placeholder="Enter Pharmacopeia Name" required/>
                                </div>  

                                <div className="col-md-3">
                                    <label>Vol No</label>
                                    <input value={this.state.vol_no} onChange={this.onChangeVolNo} className="form-control" type="text" name="vol_no" placeholder="Enter Vol No" required/>
                                </div>  

                                <div className="col-md-3">
                                    <label>Year</label>
                                    <input value={this.state.pharmacopeia_year} onChange={this.onChangePharmacopieaYear} className="form-control" type="text" name="year" placeholder="Enter Year" required/>
                                </div>  

                                <div className="col-md-3">
                                    <label>Edition</label>
                                    <input value={this.state.pharmacopeia_edition} onChange={this.onChangePharmacopieaEdition} className="form-control" type="text" name="edition" placeholder="Enter Edition" required/>
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
  )
}
}
export default EditPhramacopiea
