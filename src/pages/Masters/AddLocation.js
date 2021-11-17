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


function AddLocation(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [location, setlocation] = useState({ location_name: ''});

const InsertLocation = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = { location_name:location.location_name};
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addLocation`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/location');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/add-location');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }


const ResetLocation = () => {
  document.getElementById("AddLocation").reset();
}

  const onChange = (e) => {
    e.persist();
    setlocation({...location, [e.target.name]: e.target.value});
  }

return(
 <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={InsertLocation} method="POST" id="AddLocation">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/location">Location</Link></li>
                    <li className="breadcrumb-item active">Add Location</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/location" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {ResetLocation} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                                        <label className="required-field">Location Name</label>
                                                        <input type="text" id="location_name" name="location_name" className="form-control" placeholder="Enter Location Name" onChange={ onChange } required/>
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

export default AddLocation
