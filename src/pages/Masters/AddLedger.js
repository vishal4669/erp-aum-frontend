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
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
class AddLedger extends Component{
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

        this.InsertLedger = (event)=>{
         event.preventDefault();

         const ledger_name = this.refs.ledger_name.value
         const mst_groups_id = this.refs.mst_groups_id.value
         const balance_type = this.refs.balance_type.value
         const ledger_opening_balance = this.refs.ledger_opening_balance.value
         const ledger_contact_type = this.refs.ledger_contact_type.value
     
         this.setState({ loading: true }, () => { 
         //add Group information

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addLedger`, 
          { ledger_name:ledger_name, mst_groups_id:mst_groups_id,
            balance_type : balance_type,ledger_opening_balance : ledger_opening_balance,ledger_contact_type : ledger_contact_type} , {headers} )

                .then(response => {
                    if(response.data.success == true){
                        this.props.history.push('/ledger');
                        toastr.success(response.data.message);
                        this.setState({loading: false});  
                    }else{
                        this.props.history.push('/add-ledger');
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
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listGroup?is_dropdown=1`,{headers})
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

    this.ResetLedger = () => { 
  document.getElementById("AddLedger").reset();
}


}
  

render() {
const { data, loading } = this.state;
const { data1, loading1 } = this.state;
  return (
    <React.Fragment>
      <HorizontalLayout/>
      {/*<ToastContainer autoClose={1500}/>*/}

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           this.InsertLedger(e) }} method="POST" id="AddLedger">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/ledger">Ledger</Link></li>
                    <li className="breadcrumb-item active">Add Ledger</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/ledger" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {this.ResetLedger} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                                        <label>Name</label>
                                                        <input type="text" onChange={this.logChange} ref="ledger_name" className="form-control" placeholder="Enter Ledger Name" required/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Group</label>
                                                        
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" onChange={this.logChange} ref="mst_groups_id">

                                                            { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.group_name}</option>) }
                                                            
                                                         </select> }
                                                    </div>  

                                                    <div className="col-md-1">
                                                        <label style={{visibility: 'hidden'}}>Debit/Credit</label>
                                                        
                                                         <select className="form-select" onChange={this.logChange} ref="balance_type">
                                                             <option value="Dr">Dr</option>
                                                             <option value="Cr">Cr</option>
                                                             
                                                         </select> 
                                                    </div> 

                                                    <div className="col-md-3">
                                                        <label>Opening Balance</label>
                                                        <input type="text" onChange={this.logChange} ref="ledger_opening_balance" className="form-control" placeholder="Enter Opening Balance" required/>
                                                    </div> 

                                                      <div className="col-md-2">  
                                                        <label>Contact Type</label>
                                                        <select className="form-select" onChange={this.logChange} ref="ledger_contact_type">
                                                            <option value="Ledger">Ledger</option>
                                                            <option value="Customer">Customer</option>
                                                            <option value="Supplier">Supplier</option>
                                                            <option value="Manufacturer">Manufacturer</option>
                                                            <option value="Service Provider">Service Provider</option>
                                                            <option value="Other">Other</option>
                                                        </select>
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
export default AddLedger;
