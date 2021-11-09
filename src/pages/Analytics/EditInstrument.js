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
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function EditInstrument(props) {

  const headers = {
            'Content-Type': "application/json",
            'Authorization' : "Bearer "+localStorage.getItem('token')

          }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [instrument, setInstrument] = useState({ instrument_name: '',instrument_code:'',make:'',model:'',
  last_service_date:'',service_due_date:'',last_calibration_date:'',calibration_due_date:''});
  const url = window.location.href
  const instrument_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_instrument_id =url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
           {setLoading1(true)}
        axios.get(`${process.env.REACT_APP_BASE_APIURL}getInstrument/`+instrument_id,{headers})
            .then(response => {
                setInstrument(response.data.data);
                 {setLoading1(false)}

            })
            .catch((error) => {
                {setLoading1(false)}
                toastr.error(error.response.data.message);
                this.setState({loading: false});
            })
          }, []);

const EditInstrument = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = {
          instrument_name:instrument.instrument_name,
          instrument_code:instrument.instrument_code,
          make:instrument.make,
          model:instrument.model,
          last_service_date:instrument.last_service_date,
          service_due_date:instrument.service_due_date,
          last_calibration_date:instrument.last_calibration_date,
          calibration_due_date:instrument.calibration_due_date,
        };
         axios.post( `${process.env.REACT_APP_BASE_APIURL}editInstrument/`+instrument_id, data, {headers} )
                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/instruments');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/edit-instrument/'+edit_instrument_id);
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }

  const onChange = (e) => {
    e.persist();
    setInstrument({...instrument, [e.target.name]: e.target.value});
  }

return(
 <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={EditInstrument} method="POST" id="Instrument">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><Link to="/instruments">Instruments</Link></li>
                    <li className="breadcrumb-item active">Edit Instruments</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/instruments" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>}
                </ol>
            </div>
        </div>
        <div className="row">
           <div className="col-12">
               <div className="card">
                   <div className="card-body">
                    {loading1 ? <center><LoadingSpinner /></center> : <div>
                       <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>
                     <div className="mb-3 row">
                         <div className="form-group">
                           <div className="row">
                             <div className="col-md-3">
                               <label>Instrument Name</label>
                                <input value={instrument.instrument_name} className="form-control" type="text" name="instrument_name" onChange={ onChange } placeholder="Enter Instrument Name"/>
                             </div>
                             <div className="col-md-3">
                                <label>Instrument Code</label>
                                <input value={instrument.instrument_code} className="form-control" type="text" name="instrument_code" onChange={ onChange } placeholder="Enter Instrument Code"/>
                            </div>

                            <div className="col-md-3">
                                <label>Make</label>
                                <input value={instrument.make} className="form-control" type="text" name="make" onChange={ onChange } placeholder="Enter Instrument Make"/>
                            </div>

                            <div className="col-md-3">
                                <label>Model</label>
                                <input value={instrument.model} className="form-control" type="text" name="model" onChange={ onChange } placeholder="Enter Instrument Model"/>
                            </div>

                           </div>
                         </div>
                     </div>

                     <div className="mb-3 row">
                           <div className="form-group">
                               <div className="row">
                                   <div className="col-md-3">
                                       <label>Last Service Date</label>
                                        <input value={instrument.last_service_date} className="form-control" type="date" id="example-date-input" name="last_service_date" onChange={ onChange } placeholder="Enter Last Service Date"/>
                                   </div>
                                   <div className="col-md-3">
                                       <label>Service Due Date</label>
                                        <input value={instrument.service_due_date} className="form-control" type="date" id="example-date-input" name="service_due_date" onChange={ onChange } placeholder="Enter Service Due Date"/>
                                   </div>

                                   <div className="col-md-3">
                                       <label>Last Calibration Date</label>
                                        <input value={instrument.last_calibration_date} className="form-control" type="date" id="example-date-input" name="last_calibration_date" onChange={ onChange } placeholder="Enter Last Calibration Date"/>
                                   </div>

                                   <div className="col-md-3">
                                       <label>Calibration Due Date</label>
                                        <input value={instrument.calibration_due_date} className="form-control" type="date" id="example-date-input" name="calibration_due_date" onChange={ onChange } placeholder="Enter Calibration Due Date"/>
                                   </div>

                               </div>
                           </div>
                       </div>
                    </div> }
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

export default EditInstrument
