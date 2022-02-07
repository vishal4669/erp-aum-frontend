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
  Table,
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
import Select from 'react-select';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function ViewProduct(props)  {

    const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const product_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [product, setProduct] = useState({product_name:'',product_generic:'Finished Product',marker_specification:'',
    pharmacopiea_id: '',is_generic:'0',packing_detail:'',sample_description:'',hsn_Code:'',generic_name:'' });
  const [inputList, setInputList]  = useState([{ by_pass: "2", parent:"",
    parameter_name: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: ""}]);


  useEffect(() => {
         GetProductData();
        }, []);

  const GetProductData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getproduct/`+product_id,{headers})
              .then(response => {
                 const samples_data = response.data.data[0].samples.map(d => ({
                        "by_pass" : d.by_pass,
                        "parent" : d.parent_name,
                        "parameter_name" : d.parameter_name,
                        "label_claim" :d.label_claim,
                        "min_limit" : d.min_limit,
                        "max_limit" : d.max_limit,
                        "amount": d.amount,
                        "method" : d.method_name,
                        "description" : d.description,
                        "division" : d.division,
                        "nabl": d.nabl,
                        "formula" : d.formula_name

                      }))
                 setProduct(response.data.data[0]);
                 setInputList(samples_data);
                  {setLoading1(false)};

              })
              .catch((error) => {
                console.log(error)
                  {setLoading1(false)}
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
              })
        }

  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form>
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><a href="/products">Product</a></li>
                    <li className="breadcrumb-item active">View Product</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><a href="/products" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                </ol>
            </div>

        </div>
        {loading1 ? <center><LoadingSpinner /></center> :
          <Row>
            <Col>
              <Card>
                <CardBody>
                <h5 class="alert alert-success"><i class="fa fa-comment">&nbsp;Basic Info</i></h5>

                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-3">
                                <label>Product Name</label>
                                <input className="form-control" type="text" placeholder="Enter Product Name" name="product_name" value={product.product_name} readOnly/>
                            </div>

                            <div class="col-md-3">
                                <label>Product/Genric</label>
                                <input className="form-control" type="text" value={product.product_generic} readOnly/>
                            </div>

                            <div class="col-md-3">
                                <label>Marker/Specifiction</label>
                                <input className="form-control" value={product.marker_specification} type="text" name="marker_specification" placeholder="Enter Marker/Specifiction" readOnly/>
                            </div>
                            <div class="col-md-3">
                                <label>Pharmocopiea</label>
                                <input className="form-control" value={product.pharmacopeia_name} type="text" readOnly/>
                            </div>
                        </div>
                    </div>
                    </div>


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-7">
                                <label>Generic Name</label>
                                 <input className="form-control" value={product.generic_product_name} type="text" readOnly/>
                            </div>

                            <div class="col-md-5">
                                <label>Packing Detail</label>
                                <input className="form-control" value={product.packing_detail} type="text"  name="packing_detail" readOnly/>
                            </div>

                        </div>
                    </div>
                    </div>


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-8">
                                <label>Sample Description</label>
                                <textarea name="sample_description" value={product.sample_description} className="form-control" readOnly></textarea>
                            </div>


                                <div class="col-md-4">
                                <label>HSN Code</label>
                                <input type="text" value={product.hsn_Code} name="hsn_code" className="form-control" placeholder="Enter HSN Code" readOnly/>
                            </div>

                        </div>
                    </div>
                    </div>

                    <h5 class="alert alert-danger"><i class="fa fa-comment">&nbsp;Sample Details</i></h5>


                    <div className="mb-3 row">
                    <div class="form-group">
                        <div class="row">
                        <div className="table-responsive">
                            <Table className="table mb-0 border">
                                <thead className="table-light">
                                    <tr>
                                        <th>By Pass</th>
                                        <th>Parent</th>
                                        <th>Parameter Name</th>
                                        <th>Label Claim</th>
                                        <th>Min.Limit</th>
                                        <th>Max.Limit</th>
                                        <th>Amount</th>
                                        <th>Method</th>
                                        <th>Description</th>
                                        <th>Division</th>
                                        <th>NABL</th>
                                        <th>Formula</th>
                                    </tr>
                                </thead>
                                {inputList && inputList.length ?
                                <tbody>
                                {inputList.map((x, i) => (
                                    <React.Fragment key={x}>
                                        {loading2 ? <LoadingSpinner /> :
                                            <tr>

                                                    <td class="col-1">
                                                    {x.by_pass==2 ?
                                                        <label>Yes</label>
                                                        : <label>No</label>}
                                                    </td>
                                                    <td class="col-2">
                                                       <label>{x.parent}</label>
                                                    </td>

                                                    <td class="col-2"><label>{x.parameter_name}</label></td>
                                                    <td class="col-1"><label>{x.label_claim}</label></td>
                                                        <td class="col-1"><label>{x.min_limit}</label></td>
                                                    <td class="col-1"><label>{x.max_limit}</label></td>
                                                        <td class="col-1"><label>{x.amount}</label></td>
                                                        <td class="col-1"><label>{x.method}</label></td>
                                                        <td class="col-1"><label>{x.description}</label></td>
                                                        <td class="col-1"><label>{x.division}</label></td>
                                                        <td class="col-1"><label>{x.nabl}</label></td>
                                                    <td class="col-1"><label>{x.formula}</label></td>


                                    </tr>
                                                       }

    </React.Fragment>
                    ))}


                                </tbody>
                                 : <tr><td colspan="12"><h6><center>No Sample Details Found</center></h6></td></tr>}
                            </Table>
                    </div>
                </div>

                        </div>
                    </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
      }
         </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ViewProduct
