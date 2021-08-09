import React, { Component, useState,useEffect } from 'react';

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


function ViewMaterial(props) { 
const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]); 
  const [data1, setData1] = useState([]); 
  const [data2, setData2] = useState([]); 
  const [unit, setUnitData] = useState([]); 
  const [material, setmaterial] = useState({ material_type: '', material_name: '',material_purchase_rate:'',material_code:'',
  category_id : '',sub_category_id:'',sub_sub_category_id:'',material_rate:'',material_amount:'',material_qty:'',mst_units_id:'',
  material_use_before_date:'',material_case_number:''});  

  const url = window.location.href
  const material_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))

useEffect(() => {  
   {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getMaterial/`+material_id,{headers})
            .then(response => {
                     setmaterial(response.data.data);
                     {setLoading1(false)} 
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                  {setLoading1(false)}    
              })
        }, []); 

return(
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
      {/* ref={(el) => this.myFormRef = el} in form tag last if form add has issue*/}
        <Form>

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/material">Material</Link></li>
                    <li className="breadcrumb-item active">Edit Material</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/material" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>
                </ol>
            </div>
        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                {loading1 ? <center><LoadingSpinner /></center> : <div>
                                        <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Type</label>
                                                       <input value={material.material_type} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                    <div className="col-md-4">  
                                                        <label>Material Name</label>
                                                        <input value={material.material_name} className="form-control" type="text" readOnly/>
                                                    </div>  

                                                    <div className="col-md-4">  
                                                        <label>Purchase Rate</label>
                                                        <input value={material.material_purchase_rate} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                </div>  
                                            </div>  
                                        </div>    

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Code</label>
                                                        <input value={material.material_code} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Category</label>
                                                       <input value={material.parent_category_name} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                    <div className="col-md-3">
                                                        <label>Sub Category</label>
                                                        <input value={material.sub_category_name} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Sub Sub Category</label>
                                                        <input value={material.sub_sub_category_name} className="form-control" type="text" readOnly/>
                                                    </div>      
                                                </div>  
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Rate</label>
                                                        <input value={material.material_rate} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                    <div className="col-md-4">  
                                                        <label>Amount</label>
                                                        <input value={material.material_amount} className="form-control" type="text" readOnly/>
                                                    </div>      

                                                    <div className="col-md-4">  
                                                        <label>Qty</label>
                                                        <input value={material.material_qty} className="form-control" type="text" readOnly/>
                                                    </div>  
                                                </div>  
                                            </div>
                                        </div>

                                      
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">   

                                                    <div className="col-md-4">  
                                                        <label>Unit</label>
                                                       <input value={material.unit_name} className="form-control" type="text" readOnly/>
                                                    </div>

                                                    <div className="col-md-4">  
                                                        <label>Use Before Date</label>
                                                        <input value={material.material_use_before_date} className="form-control" type="text" readOnly/>
                                                    </div>

                                                    <div className="col-md-4">  
                                                        <label>Case Number</label>
                                                        <input value={material.material_case_number} className="form-control" type="text" readOnly/>
                                                    </div>



                                                </div>  
                                            </div>
                                        </div>
                        </div> }             
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
export default ViewMaterial;
