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

function EditLedger(props){
const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }
  const [ledger, setledger]= useState({ledger_name : '',mst_groups_id : '',balance_type:'',
    ledger_opening_balance : '',ledger_contact_type:''})
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
const url = window.location.href
const ledger_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_ledger_id =url.substring(url.lastIndexOf('/') + 1)

        const EditLedger = (event)=>{
         event.preventDefault();
         const data = {
          ledger_name: ledger.ledger_name,
          mst_groups_id :ledger.mst_groups_id,
          balance_type :ledger.balance_type,
          ledger_opening_balance: ledger.ledger_opening_balance,
          ledger_contact_type :ledger.ledger_contact_type,
         };
        
     
        {setLoading(true)};

         axios.post( `${process.env.REACT_APP_BASE_APIURL}editLedger/`+ledger_id,data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/ledger');
                        toastr.success(response.data.message);
                        {setLoading(false)}  
                    }else{
                        props.history.push('/edit-ledger/'+edit_ledger_id);
                        toastr.error(response.data.message);
                        {setLoading(false)}  
                    }
                })
                .catch((error) => {
                  {setLoading(false)}   
                  toastr.error(error.response.data.message);
                })      
      }


useEffect(() => {  
          GroupList(); 
          LedgerData(); 
        }, []);  

        const GroupList = () =>{
       {setLoading1(true)} 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listGroup?is_dropdown=1`,{headers})
        .then(response => {
                 setData(response.data.data);
                 {setLoading1(false)}   
           })
          .catch((error) => {
                  toastr.error(error.response.data.message);
               {setLoading1(false)}   
          })

  }

    const LedgerData=()=>{ 
    {setLoading1(true)} 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getLedger/`+ledger_id,{headers})  
          .then(response => {  
              setledger(response.data.data); 
               {setLoading1(false)}   
  
          })  
          .catch((error) => {  
              {setLoading1(false)} 
              toastr.error(error.response.data.message);
          })  
    } 

      const logChange = (e) =>{
        e.persist();  
        setledger({...ledger,[e.target.name]: e.target.value});  
    }

  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           EditLedger(e) }} method="POST" id="AddLedger">

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

                                                     <div className="col-md-3">
                                                        <label>Name</label>
                                                        <input type="text" value={ledger.ledger_name} name="ledger_name" onChange={logChange} className="form-control" placeholder="Enter Ledger Name" required/>
                                                    </div>  

                                                    <div className="col-md-3">
                                                        <label>Group</label>
                                                        
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" name="mst_groups_id" value={ledger.mst_groups_id} onChange={logChange}>

                                                            { data.map((option, key) => <option value={option.id} key={key} >{option.group_name}</option>) }
                                                            
                                                         </select> }
                                                    </div>  

                                                    <div className="col-md-1">
                                                        <label style={{visibility: 'hidden'}}>Debit/Credit</label>
                                                        
                                                         <select className="form-select" name="balance_type" value={ledger.balance_type} onChange={logChange}>
                                                             <option value="Dr">Dr</option>
                                                             <option value="Cr">Cr</option>
                                                             
                                                         </select> 
                                                    </div> 

                                                    <div className="col-md-3">
                                                        <label>Opening Balance</label>
                                                        <input type="text" name="ledger_opening_balance" value={ledger.ledger_opening_balance} onChange={logChange} className="form-control" placeholder="Enter Opening Balance" required/>
                                                    </div> 

                                                      <div className="col-md-2">  
                                                        <label>Contact Type</label>
                                                        <select className="form-select" name="ledger_contact_type" value={ledger.ledger_contact_type} onChange={logChange}>
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
                                        </div>}
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
export default EditLedger;
