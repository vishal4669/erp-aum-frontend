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
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const [fordata2, forsetData2] = useState([]);
  const [fordata3, forsetData3] = useState([]);
  const [fordata4, forsetData4] = useState([]);
  const [fordata5, forsetData5] = useState([]);

  const [product, setProduct] = useState({product_name:'',product_generic:'Finished Product',marker_specification:'',
    pharmocopiea: '',generic_product_name:'',packing_detail:'',sample_description:'',hsn_Code:''});
  const [inputList, setInputList]  = useState([{ by_pass: "2", parent:"",
    mst_sample_parameter_id: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: "",pharmacopeia_id:'',pharmacopeia_deleted_at:''}]);


  useEffect(() => {
         fetchGenericProduct();
         GetProductData();
         if(inputList[0].pharmacopeia_id === '' || inputList[0].pharmacopeia_deleted_at === null){
           fetchMethodListonChange();
         }
        }, []);

  const GetProductData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getproduct/`+product_id,{headers})
              .then(response => {

                if(Array.isArray(response.data.data[0].samples) && response.data.data[0].samples.length){
                    const samples_data = response.data.data[0].samples.map(d => ({
                            "by_pass" : d.by_pass,
                            "parent" : d.parent,
                            "mst_sample_parameter_id" : d.mst_sample_parameter_id ? d.mst_sample_parameter_id : '',
                            "label_claim" :d.label_claim,
                            "min_limit" : d.min_limit,
                            "max_limit" : d.max_limit,
                            "amount": d.amount,
                            "method" : d.method,
                            "description" :  d.description ? d.description : d.parameter_name == 'Description' || d.parameter_name == 'description' ? response.data.data[0].sample_description : d.description,
                            "division" : d.division,
                            "nabl": d.nabl,
                            "formula" : d.formula,
                            "pharmacopeia_id":response.data.data[0].pharmacopeia_id,
                            "pharmacopeia_deleted_at" : response.data.data[0].pharmacopeia_deleted_at,

                          }))
                          setInputList(samples_data);
                          //parent data
                          var parent_data = response.data.data[0].samples.map(d =>
                            d.parent_dropdown.map(parent =>parent)
                          )
                            setData2(parent_data)

                            // parameter data
                            var parameter_data = response.data.data[0].samples.map(d =>
                              d.parameter_dropdown.map(parameter =>
                                ({
                                   "value" : parameter.id,
                                   "label" : parameter.procedure_name,
                                }))
                            )
                              setData3(parameter_data)

                              //Method data
                              var method_data = response.data.data[0].samples.map(d =>
                                d.method_dropdown.map(method =>method)
                              )
                                setData4(method_data)

                                //Formula data
                                var formula_data = response.data.data[0].samples.map(d =>
                                  d.formula_dropdown.map(formula =>formula)
                                )
                                  setData5(formula_data)
                }
                  setProduct({product_name:response.data.data[0].product_name,
                              product_generic:response.data.data[0].product_generic,
                              marker_specification:response.data.data[0].marker_specification,
                              pharmocopiea:response.data.data[0].pharmacopeia_id,
                              generic_product_name:response.data.data[0].generic_product_name,
                              packing_detail:response.data.data[0].packing_detail,
                              sample_description:response.data.data[0].sample_description,
                              hsn_Code:response.data.data[0].hsn_Code});
                  setData(response.data.data[0].pharmacopeia_dropdown);
                  {setLoading1(false)};

              })
              .catch((error) => {
                  {setLoading1(false)}
                  toastr.error(error.response.data.message);
              })
        }

        const fetchparentList = async() => {
                  await axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parent=1`,{headers})
                    .then(response => {
                             forsetData2(response.data.data);
                       })
                      .catch((error) => {
                          toastr.error(error.response.data.message);
                      })
                }

        const fetchparamsList = async() => {
                  await axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_parameter=1`,{headers})
                    .then(response => {
                      const options1 = response.data.data.map(d => ({
                         "value" : d.id,
                         "label" : d.procedure_name,
                      }))
                             forsetData3(options1);
                       })
                      .catch((error) => {
                          toastr.error(error.response.data.message);
                      })
                }

        const fetchGenericProduct = async() => {
                     {setLoading1(true)};
                  await axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?is_generic=1`,{headers})
                    .then(response => {
                             setData1(response.data.data);
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
                              forsetData4(response.data.data);
                        })
                      .catch((error) => {
                          toastr.error(error.response.data.message);
                      })
                }

                const fetchFormulaList = () => {
                    axios.get(`${process.env.REACT_APP_BASE_APIURL}listFormula?is_dropdown=1`,{headers})
                      .then(response => {
                                forsetData5(response.data.data);
                          })
                        .catch((error) => {
                            toastr.error(error.response.data.message);
                        })
                }

const copyFormGeneric = () => {

     {setLoading2(true)};
         axios.get(`${process.env.REACT_APP_BASE_APIURL}copyfromGeneric?generic_product_name=`+product.generic_product_name,{headers})
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
                props.history.push('/edit-product/'+edit_product_id);
                   {setLoading2(false)}
              })

}

  const onChange = (e) => {
    e.persist();
    setProduct({...product, [e.target.name]: e.target.value});
  }

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

    // handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { by_pass: "2", parent: "",
    parameter_name: "", label_claim:"", min_limit: "", max_limit: "",amount: "", method: "", description: "",
    division: "", nabl: "", formula: ""}]);
    fetchMethodListonChange();
    fetchparentList();
    fetchparamsList();
    fetchFormulaList();
};

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

// handle click event of the Remove button
const handleRemoveClick = (e,index) => {
  e.preventDefault();
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

const UpdateProduct = (e)=>{
         e.preventDefault();

        const sample_details = inputList;
        const data = {
            product_name:product.product_name,
            product_generic:product.product_generic,
            marker_specification:product.marker_specification,
            pharmacopeia_id:product.pharmocopiea,
            generic_product_name:product.generic_product_name,
            packing_detail:product.packing_detail,
            sample_description:product.sample_description,
            hsn_code:product.hsn_Code,
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
                                <label className="required-field">Product Name</label>
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
                                <label className="required-field">Pharmacopeia</label>
                                {loading1 ? <LoadingSpinner /> :

                                    <select className="form-select" value={product.pharmocopiea} id="pharmocopiea" name="pharmocopiea" onChange={ onChange } onChange={fetchMethodListonChange}>
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

                            <div class="col-md-5">
                                <label>Generic Name</label>
                                 {/*<Select onChange={ changeGenericName } options={data1} value = {
                                   data1.find(obj => obj.value === genericProduct)}
                                   name="generic_product_id" placeholder="Select Generic Product" isClearable/>*/}
                                   <input onChange={onChange} name="generic_product_name" className="form-control" value={product.generic_product_name}
                                    list="generic_product_name" id="exampleDataList" placeholder="Type to search For Generic Product..." autoComplete="off"/>
                                    <datalist id="generic_product_name">
                                        { data1.map((option, key) => <option data-value={option.id}>{option.generic_product_name}
                                          </option>) }
                                     </datalist>
                            </div>
                            <div class="col-md-2">
                                <label style={{visibility: 'hidden'}}>Copy From Generic</label>
                                <button type="button" name="copy_generic" className="form-control btn btn-primary" onClick={copyFormGeneric}>Copy From Generic</button>
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
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
{loading2 ? <LoadingSpinner /> :
                                    <tr>

                                                    <td class="col-1"><select value={x.by_pass} onChange={e => handleInputChange(e, i)} className="form-select" name="by_pass" style={{width:'70px !important'}}><option value="2">No</option><option value="1">Yes</option></select></td>
                                                    <td class="col-2">
                                                       <select value={x.parent} onChange={e => handleInputChange(e, i)} name="parent" className="form-select" style={{width:'100px !important'}}>
                                                           <option value="">Select Parent</option>
                                                           { data2[i] ?
                                                             data2[i].map((option, key) => <option value={option.id} key={key} >
                                                             {option.procedure_name}</option>)
                                                             :
                                                             fordata2.map((option, key) => <option value={option.id} key={key} >
                                                             {option.procedure_name}</option>)
                                                           }

                                                       </select>
                                                    </td>

                                                    <td class="col-2">
                                                    { data3[i] ? <Select value={data3[i].find(obj => obj.value == x.mst_sample_parameter_id)} onChange={e => handleInputChange1(e,i)} options={data3[i]} name="mst_sample_parameter_id" placeholder="Search Parameter" isClearable/>
                                                    :
                                                    <Select value={fordata3.find(obj => obj.value == x.mst_sample_parameter_id)} onChange={e => handleInputChange1(e,i)} options={fordata3} name="mst_sample_parameter_id" placeholder="Search Parameter" isClearable/>
                                                    }


                                                    {/*<input value={x.parameter_name} onChange={e => handleInputChange(e, i)} name="parameter_name" className="form-control" list="parameter_name" id="exampleDataList" placeholder="Type to search..." style={{width:'120px !important'}}/>
                                                    <datalist id="parameter_name">
                                                         { data3.map((option, key) => <option data-value={option.id} value={option.parameter_name} key={key} >
                                                           </option>) }
                                                    </datalist>*/}
                                                    </td>
                                                    <td class="col-1"><Input value={x.label_claim} onChange={e => handleInputChange(e, i)} type="text" name="label_claim" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.min_limit} onChange={e => handleInputChange(e, i)} type="text" name="min_limit"  className="form-control"/></td>
                                                    <td class="col-1"><Input value={x.max_limit} onChange={e => handleInputChange(e, i)} type="text" name="max_limit" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.amount} onChange={e => handleInputChange(e, i)} type="text" name="amount"  className="form-control"/></td>
                                                        <td class="col-1">
                                                        <select name="method" className="form-select" onChange={e => handleInputChange(e, i)} value={x.method}>
                                                           <option value="">Select Method</option>
                                                           {x.pharmacopeia_id == product.pharmocopiea && x.pharmacopeia_id !== '' ? (data4[i].map((option,key) =>
                                                             <option value={option.id} key={key} >{option.method_name}</option>
                                                           )) : (fordata4.map((option,key) =>
                                                              <option value={option.id} key={key} >{option.name}</option>
                                                            ))}

                                                        </select>
                                                        </td>
                                                        <td class="col-1"><Input value={x.description} onChange={e => handleInputChange(e, i)} type="text" name="description" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.division} onChange={e => handleInputChange(e, i)} type="text" name="division" className="form-control"/></td>
                                                        <td class="col-1"><Input value={x.nabl} onChange={e => handleInputChange(e, i)} type="text" name="nabl" className="form-control"/></td>
                                                    <td class="col-1">
                                                    <select name="formula" className="form-select" onChange={e => handleInputChange(e, i)} value={x.formula}>
                                                       <option value="">Select Formula</option>
                                                       { data5[i] ?
                                                       (data5[i].map((option,key) =>
                                                         <option value={option.id} key={key} >{option.formula_name}</option>
                                                       )) :  (fordata5.map((option,key) =>
                                                          <option value={option.id} key={key} >{option.formula_name}</option>
                                                        ))}
                                                    </select>

                                                    </td>

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
}
         </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EditProduct
