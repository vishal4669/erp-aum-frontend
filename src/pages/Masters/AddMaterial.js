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


function AddMaterial(props) {
 const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [unit, setUnitData] = useState([]);
  const [material, setmaterial] = useState({ material_type: 'Solid', material_name: '',material_purchase_rate:'',material_code:'',
  category_id : '',sub_category_id:'',sub_sub_category_id:'',material_rate:'',material_amount:'',material_qty:'',mst_units_id:'',
  material_use_before_date:'',material_case_number:''});
useEffect(() => {

    ParentCategoryList();
    UnitList();
        }, []);

const ParentCategoryList = ()=>{

     {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listParentCategory`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  //toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
}

const UnitList = ()=>{

    {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listUnit?is_dropdown=1`,{headers})
            .then(response => {
                     setUnitData(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                  {setLoading1(false)}
              })
}

const getSubCategory = ()=>{

        var category_id = document.getElementById("category_id").value;

            if(category_id !='') {
              axios.get(`${process.env.REACT_APP_BASE_APIURL}listSubCategory/`+category_id,{headers})
                .then(response => {

                        console.log(response.data.data);

                         setData1(response.data.data);
                   })
                  .catch((error) => {
                    console.log(error);
                      toastr.error(error.response.data.message);
                  })
                }
    }

    const getSubSubCategory = ()=>{
        var sub_category_id = document.getElementById("sub_category_id").value;

        if(sub_category_id != "") {
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listSubSubCategory/`+sub_category_id,{headers})
            .then(response => {
                     setData2(response.data.data);
               })
              .catch((error) => {
                  //console.log(error);
                  toastr.error(error.response.data.message);
              })
          }

    }

const InsertMaterial = (e)=>{
         e.preventDefault();
         var cat_id = document.getElementById('category_id').value;
         var sub_cat_id = document.getElementById('sub_category_id').value;
        {setLoading(true)};
        const data = { material_type: material.material_type, material_name:  material.material_name,
        material_purchase_rate: material.material_purchase_rate,material_code: material.material_code,
        category_id :  cat_id,sub_category_id: sub_cat_id,
        sub_sub_category_id: material.sub_sub_category_id,material_rate: material.material_rate,
        material_amount: material.material_amount,material_qty: material.material_qty,
        mst_units_id: material.mst_units_id,material_use_before_date: material.material_use_before_date,
        material_case_number: material.material_case_number
        };
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addMaterial`, data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/material');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/add-material');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }

const ResetMaterial = () => {
  document.getElementById("AddMaterial").reset();
}

const onChange = (e) => {
        e.persist();
        setmaterial({...material, [e.target.name]: e.target.value});

        var category_id = document.getElementById("category_id").value;

        if(category_id != "") {
            // {setLoading1(true)};
              axios.get(`${process.env.REACT_APP_BASE_APIURL}listSubCategory/`+category_id,{headers})
                .then(response => {
                         setData1(response.data.data);
                   })
                  .catch((error) => {
                      toastr.error(error.response.data.message);
                  })

        }

        var sub_category_id = document.getElementById("sub_category_id").value;

        if(sub_category_id != "" ) {

          axios.get(`${process.env.REACT_APP_BASE_APIURL}listSubSubCategory/`+sub_category_id,{headers})
            .then(response => {
                     setData2(response.data.data);
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
              })
          }

  }


return(
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
      {/* ref={(el) => this.myFormRef = el} in form tag last if form add has issue*/}
        <Form onSubmit={InsertMaterial} method="POST" id="AddMaterial">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/material">Material</Link></li>
                    <li className="breadcrumb-item active">Add Material</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/material" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {ResetMaterial} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                        <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Type</label>
                                                        <select className="form-select" name="material_type" onChange={ onChange }>
                                                            <option value="Solid">Solid</option>
                                                            <option value="Liquid">Liquid</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="required-field">Material Name</label>
                                                        <input className="form-control" type="text" name="material_name" placeholder="Enter Material Name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label className="required-field">Purchase Rate</label>
                                                        <input className="form-control" type="text" name="material_purchase_rate" placeholder="Enter Purchase Rate" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label className="required-field">Code</label>
                                                        <input className="form-control" type="text" name="material_code" placeholder="Enter Material Code" onChange={ onChange }/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="required-field">Category</label> {/*Need to fetch dynamically According to category selection sub category will displayed*/}
                                                       <select className="form-select" id="category_id"  name="category_id" onChange={onChange} onChange={getSubCategory}>
                                                             <option value="">Select Category</option>
                                                            { data.map((option, key) => <option value={option.id} key={key} >{option.category_name}</option>) }

                                                         </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Sub Category</label>{/*Need to fetch dynamically According to sub category selection sub sub category will displayed*/}

                                                         <select className="form-select" id="sub_category_id" name="sub_category_id" onChange={ onChange } onChange={getSubSubCategory}>
                                                             <option value="">Select Sub Category</option>
                                                            { data1.map((option, key) => <option value={option.id} key={key} >{option.category_name}</option>) }

                                                         </select>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Sub Sub Category</label>{/*Need to fetch dynamically*/}
                                                        <select className="form-select" id="sub_sub_category_id" name="sub_sub_category_id" onChange={ onChange }>
                                                             <option value="">Select Sub Sub Category</option>
                                                            { data2.map((option, key) => <option value={option.id} key={key} >{option.category_name}</option>) }

                                                         </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label className="required-field">Rate</label>
                                                        <input className="form-control" type="text" name="material_rate" placeholder="Enter Rate" onChange={ onChange }/>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className="required-field">Amount</label>
                                                        <input className="form-control" type="text" name="material_amount" placeholder="Enter Amount" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label className="required-field">Qty</label>
                                                        <input className="form-control" type="text" name="material_qty" placeholder="Enter Qty" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-4">
                                                        <label>Unit</label>
                                                       {loading1 ? <LoadingSpinner /> : <select className="form-select" name="mst_units_id" onChange={ onChange }>
                                                             <option value="">Select Unit</option>
                                                            { unit.map((option, key) => <option value={option.id} key={key} >{option.unit_name}</option>) }

                                                         </select>}
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Use Before Date</label>
                                                        <input className="form-control" type="date" name="material_use_before_date" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Case Number</label>
                                                        <input className="form-control" type="text" name="material_case_number" placeholder="Enter Case Number" onChange={ onChange }/>
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

  )
}
export default AddMaterial;
