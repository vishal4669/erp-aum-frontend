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

function EditFormula(props){
const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }
  const [formula, setFormula] = useState({ formula_name: '',formula_type:''});
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
const url = window.location.href
const formula_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_formula_id =url.substring(url.lastIndexOf('/') + 1)

        const EditFormula = (e)=>{
         e.preventDefault();
         const data = {
          formula_name: formula.formula_name,
          formula_type :formula.formula_type,
         };


        {setLoading(true)};

         axios.post( `${process.env.REACT_APP_BASE_APIURL}updateFormula/`+formula_id,data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/formula');
                        toastr.success(response.data.message);
                        {setLoading(false)}
                    }else{
                        props.history.push('/edit-formula/'+edit_formula_id);
                        toastr.error(response.data.message);
                        {setLoading(false)}
                    }
                })
                .catch((error) => {
                  {setLoading(false)}
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
                })
      }


useEffect(() => {
          FormulaData();
        }, []);

    const FormulaData=()=>{
    {setLoading1(true)}
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getFormula/`+formula_id,{headers})
          .then(response => {
              setFormula(response.data.data);
               {setLoading1(false)}

          })
          .catch((error) => {
              {setLoading1(false)}
              toastr.error(error.response.data.message);
              this.setState({loading: false});
          })
    }

      const logChange = (e) =>{
        e.persist();
        setFormula({...formula,[e.target.name]: e.target.value});
    }

  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           EditFormula(e) }} method="POST" id="EditFormula">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><Link to="/formula">Formula</Link></li>
                    <li className="breadcrumb-item active">Edit Formula</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/formula" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;

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
                    {loading1 ? <center><LoadingSpinner /></center> :
                    <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                     <div className="col-md-6">
                                                        <label className="required-field">Name</label>
                                                        <input type="text" value={formula.formula_name} name="formula_name" onChange={logChange} className="form-control" placeholder="Enter Formula Name"/>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Type</label>
                                                        <input type="text" value={formula.formula_type} name="formula_type" onChange={logChange} className="form-control" placeholder="Enter Formula Type"/>
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
export default EditFormula;
