import React, { useState, useEffect } from 'react';

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


function AddMachine(props) { 

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]); 
  const [machine, setMachine] = useState({ machine_name: ''});  

const InsertMachine = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = { machine_name:machine.machine_name}; 
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addMachine`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/machine');
                        toastr.success(response.data.message);
                        {setLoading(false)}; 
                    }else{
                        props.history.push('/add-machine');
                        toastr.error(response.data.message);
                        {setLoading(false)};   
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })
     
      }


const ResetMachine = () => { 
  document.getElementById("AddMachine").reset();
}

  const onChange = (e) => {  
    e.persist();  
    setMachine({...machine, [e.target.name]: e.target.value});  
  } 

return(
 <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={InsertMachine} method="POST" id="AddMachine">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/machine">Machine</Link></li>
                    <li className="breadcrumb-item active">Add Machine</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/machine" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {ResetMachine} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                    </li>}
                </ol>
            </div>
        </div>
                          <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
        
                                        <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>

                                         <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                     <div className="col-md-12">
                                                        <label>Machine Name</label>
                                                        <input type="text" id="machine_name" name="machine_name" className="form-control" placeholder="Enter Machine Name" onChange={ onChange }/>
                                                    </div>  
                                                </div>  
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
      </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddMachine  