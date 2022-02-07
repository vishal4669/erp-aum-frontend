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

function AddProduct(props)  {

    const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [product, setProduct] = useState({product_name:'',product_generic:'Finished Product',marker_specification:'',
    pharmocopiea: '',packing_detail:'',sample_description:'',hsn_code:'',generic_name:'' });
  const [inputList, setInputList]  = useState([{ by_pass: "2", parent:"",
    mst_sample_parameter_id: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: ""}]);
  //const[genericProduct,setGenericProduct] = useState({generic_name:''})


  useEffect(() => {
         fetchPharamcopiea();
         fetchGenericProduct();
         fetchparentList();
         fetchparamsList();
         fetchMethodList();
         fetchFormulaList();
        }, []);

 const fetchPharamcopiea = async() => {
             {setLoading3(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listPharmacopeia?is_dropdown=1`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading3(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading3(false)}
              })
        }
const fetchGenericProduct = async() => {
             {setLoading1(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?is_generic=1`,{headers})
            .then(response => {
                     /*const options = response.data.data.map(d => ({
                        "value" : d.generic_product_name,
                        "label" : d.generic_product_name
                     }))*/
                     setData1(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

const fetchparentList = async() => {
             {setLoading1(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parent=1`,{headers})
            .then(response => {
                     setData2(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

const fetchparamsList = async() => {
             {setLoading1(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parameter=1`,{headers})
            .then(response => {
              const options1 = response.data.data.map(d => ({
                 "value" : d.id,
                 "label" : d.procedure_name,
              }))
                     setData3(options1);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                   {setLoading1(false)}
              })
        }

const fetchMethodList = async() => {
        {setLoading1(true)};
    await axios.get(`${process.env.REACT_APP_BASE_APIURL}listMethod?is_dropdown=1`,{headers})
      .then(response => {
                setData4(response.data.data);
                {setLoading1(false)}
          })
        .catch((error) => {
            toastr.error(error.response.data.message);
              {setLoading1(false)}
        })
}

const fetchMethodListonChange = async(e) => {
  if(document.getElementById("pharmocopiea").value !== null){
    var pharmacopeia_id = document.getElementById("pharmocopiea").value;
  } else {
    var pharmacopeia_id = '';
  }
  setProduct(prevState => ({...prevState,pharmocopiea: pharmacopeia_id}))
  await axios.get(`${process.env.REACT_APP_BASE_APIURL}methodDropdown?pharmacopiea_id=`+pharmacopeia_id,{headers})
    .then(response => {
              setData4(response.data.data);
              {setLoading1(false)}
        })
      .catch((error) => {
          toastr.error(error.response.data.message);
            {setLoading1(false)}
      })
}

const fetchFormulaList = () => {
        {setLoading1(true)};
    axios.get(`${process.env.REACT_APP_BASE_APIURL}listFormula?is_dropdown=1`,{headers})
      .then(response => {
                setData5(response.data.data);
                {setLoading1(false)}
          })
        .catch((error) => {
            toastr.error(error.response.data.message);
              {setLoading1(false)}
        })
}

const copyFormGeneric = () => {

        /* var final_generic_product = product.generic_name;
         if(typeof genericProduct == "number"){
           final_generic_product = product.generic_name
         } else if(typeof genericProduct == "object"){
           if(product.generic_name !== null){
             final_generic_product = product.generic_name.value;
           } else{
             final_generic_product = '';
           }

         } else {
           final_generic_product = '';
         }*/
     {setLoading2(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}copyfromGeneric?generic_product_name=`+product.generic_name,{headers})
            .then(response => {
                const samples_data = response.data.data.samples.map(d => ({
                        "by_pass" : d.by_pass,
                        "parent" : d.parent,
                        "mst_sample_parameter_id" : d.mst_sample_parameter_id ? d.mst_sample_parameter_id : '',
                        "label_claim" :d.label_claim,
                        "min_limit" : d.min_limit,
                        "max_limit" : d.max_limit,
                        "amount": d.amount,
                        "method" : d.method,
                        "description" :  d.parameter_name == 'Description' || d.parameter_name == 'description' ? response.data.data.sample_description : d.description,
                        "division" : d.division,
                        "nabl": d.nabl,
                        "formula" : d.formula

                      }))
                     setInputList(samples_data);
                     {setLoading2(false)}
               })
              .catch((error) => {
                  //toastr.error(error.response.data.message);
                  props.history.push('/add-product');
                   {setLoading2(false)}
              })

}

  const onChange = (e) => {
    e.persist();
    setProduct({...product, [e.target.name]: e.target.value});
  }

  /*const changeGenericName = (e) =>{
      setGenericProduct({generic_name: e });
    }*/

    // handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { by_pass: "2", parent: "",
    mst_sample_parameter_id: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: ""}]);
};

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
    const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

const handleInputChange1 = (e,index) => {
  if(e !== null){
    if (e.value) {
      let item = {...inputList};
      item[index]['mst_sample_parameter_id'] = e.value
    } else {
      let item = {...inputList};
      item[index]['mst_sample_parameter_id'] = e
    }
  } else {
    let item = {...inputList};
    item[index]['mst_sample_parameter_id'] = e
  }
};


// handle click event of the Remove button
const handleRemoveClick = (e,index) => {
  e.preventDefault();
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

const ResetProduct = () => {
  document.getElementById("AddProduct").reset();
}

const InsertProduct = (e)=>{
         e.preventDefault();
        {setLoading(true)};

        /*  var final_generic_product = genericProduct;
         if(typeof genericProduct == "number"){
           final_generic_product = genericProduct.generic_name
         } else if(typeof genericProduct == "object"){
           if(genericProduct.generic_name !== null){
             final_generic_product = genericProduct.generic_name.value;
           } else{
             final_generic_product = '';
           }

         } else {
           final_generic_product = '';
         }*/

        const sample_details = inputList;
        const data = {
            product_name:product.product_name,
            product_generic:product.product_generic,
            marker_specification:product.marker_specification,
            pharmacopeia_id:product.pharmocopiea,
            generic_product_name:product.generic_name,
            packing_detail:product.packing_detail,
            sample_description:product.sample_description,
            hsn_code:product.hsn_code,
            "sample_details": sample_details,

        }
        axios.post( `${process.env.REACT_APP_BASE_APIURL}addProduct`, data, {headers} )

                .then(response => {
                    if(response.data && response.data.success == true){
                        props.history.push('/products');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/add-product');
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
        <Form onSubmit={InsertProduct} method="POST" id="AddProduct" name="ProductData">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><a href="/products">Product</a></li>
                    <li className="breadcrumb-item active">Add Product</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><a href="/products" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                    <li><button type="reset" onClick = {ResetProduct} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :
                    <li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                    </li>
                    }
                </ol>
            </div>

        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                <h5 class="alert alert-success"><i class="fa fa-comment">&nbsp;Basic Info</i></h5>

                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-3">
                                <label className="required-field">Product Name</label>
                                <input className="form-control" type="text" placeholder="Enter Product Name" name="product_name" onChange={ onChange }/>
                            </div>

                            <div class="col-md-3">
                                <label>Product/Genric</label>
                                <select className="form-select" name="product_generic" onChange={ onChange }>
                                    <option value="Finished Product">Finished Product</option>
                                    <option value="Raw Material">Raw Material</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div class="col-md-3">
                                <label>Marker/Specifiction</label>
                                <input className="form-control" type="text" name="marker_specification" placeholder="Enter Marker/Specifiction" onChange={ onChange }/>
                            </div>
                            <div class="col-md-3">
                                <label className="required-field">Pharmacopeia</label>

                                {loading3 ? <LoadingSpinner /> :
                                    <select className="form-select" id="pharmocopiea" name="pharmocopiea" onChange={ onChange } onChange= {fetchMethodListonChange}>
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
                                 {/*<Select onChange={ changeGenericName } options={data1} name="generic_name" placeholder="Select Generic Product" isClearable/>*/}
                                 <input onChange={onChange} name="generic_name" className="form-control"
                                  list="generic_name" id="exampleDataList" placeholder="Type to search For Generic Product..." autoComplete="off"/>
                                  <datalist id="generic_name">
                                      { data1.map((option, key) => <option data-value={option.id}>{option.generic_product_name}
                                        </option>) }
                                   </datalist>
                            </div>
                            <div class="col-md-2">
                                <label style={{visibility: 'hidden'}}>Copy From Generic</label>
                                <button type="button" name="copy_generic" className="form-control btn btn-primary" onClick={copyFormGeneric}>Copy From Generic</button>
                            </div>

                            <div class="col-md-6">
                                <label>Packing Detail</label>
                                <input className="form-control" type="text"  name="packing_detail" placeholder="Enter Packng Detail" onChange={ onChange }/>
                            </div>

                        </div>
                    </div>
                    </div>


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-8">
                                <label>Sample Description</label>
                                <textarea name="sample_description" className="form-control" placeholder="Enter Sample Description" onChange={ onChange }></textarea>
                            </div>


                                <div class="col-md-4">
                                <label>HSN Code</label>
                                <input type="text" name="hsn_code" className="form-control" placeholder="Enter HSN Code" onChange={ onChange }/>
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
                        <div>
                            <Table className="table mb-0 border" responsive="xl">
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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading2 ? <LoadingSpinner /> :
                                    <tr>
                                                    <td class="col-1"><select value={x.by_pass} onChange={e => handleInputChange(e, i)} className="form-select" name="by_pass" style={{width:'70px !important'}}><option value="2">No</option><option value="1">Yes</option></select></td>
                                                    <td class="col-2">
                                                       <select value={x.parent} onChange={e => handleInputChange(e, i)} name="parent" className="form-select" style={{width:'100px !important'}}>
                                                           <option value="">Select Parent</option>
                                                            { data2.map((option, key) => <option value={option.id} key={key} >
                                                            {option.procedure_name}</option>) }
                                                       </select>
                                                    </td>

                                                    <td class="col-2">
                                                    {/*<input value={x.param_name} onChange={e => fetch_param_id(e,i)} name="param_name" className="form-control"
                                                     list="parameter_name" id="exampleDataList" placeholder="Type to search For Parameter..." autoComplete="off"/>
                                                     <datalist id="parameter_name">
                                                         { data3.map((option, key) => <option data-value={option.id}>{option.procedure_name}
                                                           </option>) }
                                                      </datalist>*/}
                                                      <Select onChange={e => handleInputChange1(e,i)} options={data3} name="mst_sample_parameter_id" placeholder="Search Parameter" isClearable/>
                                                  </td>
                                                    <td class="col-1"><Input value={x.label_claim} onChange={e => handleInputChange(e, i)} type="text" name="label_claim" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.min_limit} onChange={e => handleInputChange(e, i)} type="text" name="min_limit"  className="form-control"/></td>
                                                    <td class="col-1"><Input value={x.max_limit} onChange={e => handleInputChange(e, i)} type="text" name="max_limit" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.amount} onChange={e => handleInputChange(e, i)} type="text" name="amount"  className="form-control"/></td>
                                                        <td class="col-1">{loading1 ? <LoadingSpinner /> :  <select value={x.method} className="form-select"  name="method" onChange={ e => handleInputChange(e, i) } >
                                                             <option value="">Select Method</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.name}</option>) }
                                                        </select> }</td>
                                                        <td class="col-1"><Input value={x.description} onChange={e => handleInputChange(e, i)} type="text" name="description" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.division} onChange={e => handleInputChange(e, i)} type="text" name="division" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.nabl} onChange={e => handleInputChange(e, i)} type="text" name="nabl" className="form-control"/></td>
                                                        <td class="col-1">{loading1 ? <LoadingSpinner /> :  <select value={x.formula} className="form-select"  name="formula" onChange={ e => handleInputChange(e, i) } >
                                                             <option value="">Select Formula</option>
                                                            { data5.map((option, key) => <option value={option.id} key={key} >{option.formula_name}</option>) }
                                                        </select> }</td>

                                        <td>{inputList.length >= 1 && <button
                                                          className="mr10"
                                                          onClick={(e) => handleRemoveClick(e,i)} className="btn btn-danger"><i class="fa fa-trash"></i></button>}</td>
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
         </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddProduct
