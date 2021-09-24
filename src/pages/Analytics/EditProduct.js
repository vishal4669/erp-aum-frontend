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

function EditProduct(props)  {

    const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const product_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_product_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [product, setProduct] = useState({product_name:'',product_generic:'Finished Product',marker_specification:'',
    pharmacopeia_id: '',is_generic:'0',packing_detail:'',sample_description:'',hsn_Code:''});
  const [inputList, setInputList]  = useState([{ by_pass: "2", parent:"",
    parameter_name: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: ""}]);
  const[genericProduct,setGenericProduct] = useState({generic_product_id:''})


  useEffect(() => {
         fetchPharamcopiea();
         fetchGenericProduct();
         fetchparentList();
         fetchparamsList();
         GetProductData();
        }, []);

  const GetProductData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getproduct/`+product_id,{headers})
              .then(response => {
                  const samples_data = response.data.data.samples.map(d => ({
                        "by_pass" : d.by_pass,
                        "parent" : d.parent.id,
                        "parameter_name" : d.parameter.parameter_name,
                        "label_claim" :d.label_claim,
                        "min_limit" : d.min_limit,
                        "max_limit" : d.max_limit,
                        "amount": d.amount,
                        "method" : d.method,
                        "description" : d.description,
                        "division" : d.division,
                        "nabl": d.nabl,
                        "formula" : d.formula

                      }))
                 setProduct(response.data.data);
                 setGenericProduct(response.data.data.generic_product_id);
                 setInputList(samples_data);
                  {setLoading1(false)};

              })
              .catch((error) => {
                  {setLoading1(false)}
                  toastr.error(error.response.data.message);
              })
        }

 const fetchPharamcopiea = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listPharmacopeia?is_dropdown=1`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }
const fetchGenericProduct = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?is_generic=1`,{headers})
            .then(response => {
                     const options = response.data.data.map(d => ({
                        "value" : d.id,
                        "label" : d.product_name
                     }))
                     setData1(options);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

const fetchparentList = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}parentList`,{headers})
            .then(response => {
                     setData2(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

const fetchparamsList = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}paramsList`,{headers})
            .then(response => {
                     setData3(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

const copyFormGeneric = () => {

  var final_generic_product_id = genericProduct;
  if(typeof genericProduct == "number"){
    final_generic_product_id = genericProduct
  } else if(typeof genericProduct == "object"){
    final_generic_product_id = genericProduct.generic_product_id.value;
  } else {
    final_generic_product_id = 0;
  }


     {setLoading2(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getproduct/`+final_generic_product_id,{headers})
            .then(response => {

                const samples_data = response.data.data.samples.map(d => ({
                        "by_pass" : d.by_pass,
                        "parent" : d.parent.id,
                        "parameter_name" : d.parameter.parameter_name,
                        "label_claim" :d.label_claim,
                        "min_limit" : d.min_limit,
                        "max_limit" : d.max_limit,
                        "amount": d.amount,
                        "method" : d.method,
                        "description" : d.description,
                        "division" : d.division,
                        "nabl": d.nabl,
                        "formula" : d.formula

                      }))

                     setInputList(samples_data);
                     {setLoading2(false)}
               })
              .catch((error) => {
                //  toastr.error(error.response.data.message);
                props.history.push('/edit-product/'+edit_product_id);
                   {setLoading2(false)}
              })

}

  const onChange = (e) => {
    e.persist();
    setProduct({...product, [e.target.name]: e.target.value});
  }

  const changeGenericName = (e) =>{
    setGenericProduct({generic_product_id: '' });
      setGenericProduct({generic_product_id: e });
    }

    // handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { by_pass: "2", parent: "",
    parameter_name: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: ""}]);
};

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

const UpdateProduct = (e)=>{
         e.preventDefault();
         var final_generic_product_id = genericProduct;
         if(typeof genericProduct == "number"){
           final_generic_product_id = genericProduct
         } else if(typeof genericProduct == "object"){
           if(genericProduct.generic_product_id !== null){
             final_generic_product_id = genericProduct.generic_product_id.value;
           } else{
             final_generic_product_id = '';
           }

         } else {
           final_generic_product_id = '';
         }

        const sample_details = inputList;
        const data = {
            product_name:product.product_name,
            product_generic:product.product_generic,
            marker_specification:product.marker_specification,
            pharmacopeia_id:product.pharmacopeia_id,
            generic_product_id:final_generic_product_id,
            packing_detail:product.packing_detail,
            sample_description:product.sample_description,
            hsn_code:product.hsn_code,
            is_generic:product.is_generic,
            "sample_details": sample_details,
          }
                  {setLoading(true)};
            axios.post(`${process.env.REACT_APP_BASE_APIURL}editProduct/`+product_id,data,{headers})
                .then(response => {
                  if(response.data.success == true){
                    props.history.push('/products');
                    toastr.success(response.data.message);
                    {setLoading(false)};
                  }
                  else{
                        props.history.push('/edit-product/'+edit_product_id);
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                      {setLoading(false)};
                      toastr.error(error.response.data.message);
                  })
        }

  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           UpdateProduct(e) }} method="POST" name="ProductData">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><a href="/products">Product</a></li>
                    <li className="breadcrumb-item active">Edit Product</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><a href="/products" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                    { loading ? <center><LoadingSpinner /></center> :
                    <li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>
                    }
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
                                <input value={product.product_name} className="form-control" type="text" placeholder="Enter Product Name" name="product_name" onChange={ onChange }/>
                            </div>

                            <div class="col-md-3">
                                <label>Product/Genric</label>
                                <select value={product.product_generic} className="form-select" name="product_generic" onChange={ onChange }>
                                    <option value="Finished Product">Finished Product</option>
                                    <option value="Raw Material">Raw Material</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div class="col-md-3">
                                <label>Marker/Specifiction</label>
                                <input value={product.marker_specification} className="form-control" type="text" name="marker_specification" placeholder="Enter Marker/Specifiction" onChange={ onChange }/>
                            </div>
                            <div class="col-md-3">
                                <label>Pharmacopeia</label>

                                {loading1 ? <LoadingSpinner /> :
                                    <select className="form-select" value={product.pharmacopeia_id} id="pharmocopiea" name="pharmacopeia_id" onChange={ onChange }>
                                        <option value="">Select Pharmocopiea</option>
                                            { data.map((option, key) => <option value={option.id} key={key} >
                                            {option.pharmacopeia_name}</option>) }
                                    </select>
                                }

                            </div>
                        </div>
                    </div>
                    </div>


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-4">
                                <label>Generic Name</label>
                                 <Select onChange={ changeGenericName } options={data1} value = {
       data1.find(obj => obj.value === genericProduct)} name="generic_product_id" placeholder="Select Generic Product" isClearable/>
                            </div>
                            <div class="col-md-2">
                                <label style={{visibility: 'hidden'}}>Copy From Generic</label>
                                <button type="button" name="copy_generic" className="form-control btn btn-primary" onClick={copyFormGeneric}>Copy From Generic</button>
                            </div>

                            <div class="col-md-1">
                                <label>Is Generic?</label>
                                <select value={product.is_generic} className="form-select" name="is_generic" onChange={ onChange }>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            <div class="col-md-5">
                                <label>Packing Detail</label>
                                <input value={product.packing_detail} className="form-control" type="text"  name="packing_detail" placeholder="Enter Packng Detail" onChange={ onChange }/>
                            </div>

                        </div>
                    </div>
                    </div>


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-8">
                                <label>Sample Description</label>
                                <textarea value={product.sample_description} name="sample_description" className="form-control" placeholder="Enter Sample Description" onChange={ onChange }></textarea>
                            </div>


                                <div class="col-md-4">
                                <label>HSN Code</label>
                                <input value={product.hsn_Code} type="text" name="hsn_Code" className="form-control" placeholder="Enter HSN Code" onChange={ onChange }/>
                            </div>

                        </div>
                    </div>
                    </div>

                    <h5 class="alert alert-danger"><i class="fa fa-comment">&nbsp;Sample Details</i></h5>

                        {inputList.map((x, i) => (
                <React.Fragment key={x}>
                    <div className="mb-3 row">
                    <div class="form-group">
                        <div class="row">
                        <div className="table-responsive">
                            <Table className="table mb-0 border">
                                <thead className="table-light">
                                    <tr>
                                        <th></th>
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
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
{loading2 ? <LoadingSpinner /> :
                                    <tr>
                                        <td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                    <td class="col-1"><select value={x.by_pass} onChange={e => handleInputChange(e, i)} className="form-select" name="by_pass" style={{width:'70px !important'}}><option value="2">No</option><option value="1">Yes</option></select></td>
                                                    <td class="col-2">
                                                       <select value={x.parent} onChange={e => handleInputChange(e, i)} name="parent" className="form-select" style={{width:'100px !important'}}>
                                                           <option value="">Select Parent</option>
                                                            { data2.map((option, key) => <option value={option.id} key={key} >
                                                            {option.parent_name}</option>) }
                                                       </select>
                                                    </td>

                                                    <td class="col-2"><input value={x.parameter_name} onChange={e => handleInputChange(e, i)} name="parameter_name" className="form-control" list="parameter_name" id="exampleDataList" placeholder="Type to search..." style={{width:'120px !important'}}/>
                                                    <datalist id="parameter_name">
                                                         { data3.map((option, key) => <option data-value={option.id} value={option.parameter_name} key={key} >
                                                           </option>) }
                                                    </datalist></td>
                                                    <td class="col-1"><Input value={x.label_claim} onChange={e => handleInputChange(e, i)} type="text" name="label_claim" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.min_limit} onChange={e => handleInputChange(e, i)} type="text" name="min_limit"  className="form-control"/></td>
                                                    <td class="col-1"><Input value={x.max_limit} onChange={e => handleInputChange(e, i)} type="text" name="max_limit" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.amount} onChange={e => handleInputChange(e, i)} type="text" name="amount"  className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.method} onChange={e => handleInputChange(e, i)} type="text" name="method" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.description} onChange={e => handleInputChange(e, i)} type="text" name="description" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.division} onChange={e => handleInputChange(e, i)} type="text" name="division" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.nabl} onChange={e => handleInputChange(e, i)} type="text" name="nabl" className="form-control"/></td>
                                                    <td class="col-1"><Input value={x.formula} onChange={e => handleInputChange(e, i)} type="text" name="formula" className="form-control"/></td>

                                        <td>{inputList.length !== 1 && <button
                                                          className="mr10"
                                                          onClick={() => handleRemoveClick(i)} className="btn btn-primary">Delete</button>}</td>
                                    </tr>
                                  }

                                </tbody>
                            </Table>
                    </div>
                </div>

                        </div>
                    </div>

                     <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center>
                                                        <div className="col-md-2">

                                                           {inputList.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}
                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    ))}
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center>
                                                        <div className="col-md-2">

                                                        {inputList.length === 0 && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}

                                                        </div>
                                                    </center>
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

export default EditProduct
