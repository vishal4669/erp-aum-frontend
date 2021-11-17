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


function AddUnit(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [unit, setUnit] = useState({ unit_name: ''});

const InsertUnit = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = { unit_name:unit.unit_name};
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addUnit`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/unit');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/add-unit');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }


const ResetUnit = () => {
  document.getElementById("AddUnit").reset();
}

  const onChange = (e) => {
    e.persist();
    setUnit({...unit, [e.target.name]: e.target.value});
  }

return(
 <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={InsertUnit} method="POST" id="AddUnit">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/unit">Unit</Link></li>
                    <li className="breadcrumb-item active">Add Unit</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/unit" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {ResetUnit} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                                        <label className="required-field">Unit Name</label>
                                                        <input type="text" id="unit_name" name="unit_name" className="form-control" placeholder="Enter Unit Name" onChange={ onChange } required/>
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

export default AddUnit
