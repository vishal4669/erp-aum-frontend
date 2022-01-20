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
  Alert,Table
} from 'reactstrap';

import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import EditorToolbar, { modules, formats } from "../../components/Common/EditorToolbar";

function EditTest(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const test_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_test_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);

  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const [test, setTest] = useState({ procedure_name:'',price:'',test_code:'',test_category:'',parent_id:''});
  const [inputList, setInputList]  = useState([{ test_by_pass: "2", test_parameter_name: "",
    test_alpha: "", formula:"", type: "",unit:"",value:"V",sort:""}]);
  const [convertedText, setConvertedText] = useState("");

useEffect(() => {
         fetchParent();
         fetchFormula();
         fetchUnit();
         testData();
        }, []);

        const testData = async() => {
          {setLoading(true)};
          await axios.get(`${process.env.REACT_APP_BASE_APIURL}getTest/`+test_id,{headers})
          .then(response => {
                   setTest({
                     procedure_name:response.data.data[0].procedure_name,
                     price:response.data.data[0].price,
                     test_code:response.data.data[0].test_code,
                     test_category:response.data.data[0].test_category,
                     parent_id:response.data.data[0].parent_id ? response.data.data[0].parent_id: ''
                   });
                   setConvertedText(response.data.data[0].test_procedure)
                   if(Array.isArray(response.data.data[0].parameters) && response.data.data[0].parameters.length){
                     setInputList(response.data.data[0].parameters);
                   }
                   {setLoading(false)};
             })
        }

        const fetchParent = async() => {
          {setLoading(true)};
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_test_parent=1`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading(false)};
               })
        }

        const fetchFormula = async() => {
          {setLoading(true)};
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}listFormula?is_dropdown=1`,{headers})
            .then(response => {
                     setData3(response.data.data);
                     {setLoading(false)};
               })
        }

        const fetchUnit = async() => {
          {setLoading(true)};
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}listUnit?is_dropdown=1`,{headers})
            .then(response => {
                     setData4(response.data.data);
                     {setLoading(false)};
               })
        }

        const handleAddClick = () => {
          setInputList([...inputList, { test_by_pass: "2", test_parameter_name: "",
            test_alpha: "", formula:"", type: "",unit:"",value:"V",sort:""}]);
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


const InsertTest = (e)=>{
         e.preventDefault();
        {setLoading1(true)};
        const parameter_list_data = inputList;
        const data = {

          procedure_name:test.procedure_name,
          price:test.price,
          test_code:test.test_code,
          test_category:test.test_category,
          parent_id:test.parent_id,
          test_procedure:convertedText,
          "test_parameter": parameter_list_data,
        }
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addTest`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){

                       props.history.push('/test');
                      toastr.success(response.data.message);
                      {setLoading1(false)};
                    }
                    else{
                        props.history.push('/add-test');
                        toastr.error(response.data.message);
                        {setLoading1(false)};
                    }
                })
                .catch((error) => {
                 {setLoading1(false)};
                 toastr.error(error.response.data.message);
                })

      }

  const onChange = (e) => {
    e.persist();
    setTest({...test, [e.target.name]: e.target.value});
  }


return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form onSubmit={InsertTest} method="POST" id="AddTest">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Analytics</li>
                                            <li className="breadcrumb-item"><a href="/test">Test</a></li>
                                            <li className="breadcrumb-item active">Edit Test</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/test" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            &nbsp;
                                            { loading1 ? <center><LoadingSpinner /></center> :
                                                <li>
                                               <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                                            </li>
                                           }
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        { loading ? <center><LoadingSpinner /></center> :
                          <div className="row">
                             <div className="col-12">
                                 <div className="card">
                                     <div className="card-body">

                                         <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>
                                       <div className="mb-3 row">
                                           <div className="form-group">
                                             <div className="row">
                                               <div className="col-md-3">
                                                 <label className="required-field">Procedure Name</label>
                                                  <input className="form-control" value={test.procedure_name} type="text" name="procedure_name" placeholder="Enter Procedure Name" onChange={onChange}/>
                                               </div>
                                               <div className="col-md-2">
                                                 <label>Price</label>
                                                  <input className="form-control" value={test.price} type="text" name="price" placeholder="Enter Price" onChange={onChange}/>
                                               </div>
                                               <div class="col-md-2">
                                                 <label>Test Code</label>
                                                  <input className="form-control" type="text" value={test.test_code} name="test_code" placeholder="Enter Test Code" onChange={onChange}/>
                                               </div>
                                               <div class="col-md-2">
                                                 <label>Test Category</label>
                                                  <input className="form-control" type="text" value={test.test_category} name="test_category" placeholder="Enter Test Category" onChange={onChange}/>
                                               </div>
                                               <div class="col-md-3">
                                                 <label>Parent</label>
                                                 { loading ? <LoadingSpinner /> :
                                                   <select name="parent_id" value={test.parent_id} className="form-select" onChange={onChange}>
                                                      <option value="">Select Parent</option>
                                                      { data.map((option, key) => <option value={option.id} key={key} >{option.procedure_name}</option>) }
                                                   </select>
                                                 }
                                               </div>
                                             </div>
                                           </div>
                                       </div>

                                       <div className="mb-3 row">
                                           <div className="form-group">
                                             <div className="row">
                                               <div className="col-md-12">
                                                 <label className="required-field">Procedure</label>
                                                   <div className="text-editor">
                                                     <EditorToolbar />
                                                     <ReactQuill
                                                             theme='snow'
                                                             name="test_procedure"
                                                             value={convertedText}
                                                             onChange={setConvertedText}
                                                             modules={modules}
                                                            formats={formats}

                                                           />
                                                   </div>
                                               </div>
                                             </div>
                                           </div>
                                       </div>

                                       <h5> <Alert color="success" role="alert">
                                        <i className="fa fa-comment">&nbsp;Parameter</i>
                                       </Alert></h5>
                                       <div className="mb-3 row">
                                         <div className="form-group">
                                           <div className="row">
                                             <div className="table-responsive">
                                               <Table className="table mb-0 border">
                                                   <thead className="table-light">
                                                       <tr>
                                                           <th>By Pass</th>
                                                           <th>Parameter Name</th>
                                                           <th>Alfa</th>
                                                           <th>Formula</th>
                                                           <th>Type</th>
                                                           <th>Unit</th>
                                                           <th>Value</th>
                                                           <th>Sort</th>
                                                           <th></th>
                                                       </tr>
                                                   </thead>
                                                   <tbody>
                                                   {inputList.map((x, i) => (
                                                     <React.Fragment key={x}>
                                                     <tr>
                                                       <td>
                                                         <select className="form-select" name="test_by_pass" value={x.test_by_pass} onChange={e => handleInputChange(e, i)}>
                                                          <option value="2">No</option>
                                                          <option value="1">Yes</option>
                                                         </select>
                                                       </td>
                                                       <td><input className="form-control" type="text" placeholder="Enter Parameter Name" value={x.test_parameter_name} name="test_parameter_name" onChange={e => handleInputChange(e, i)}/></td>
                                                       <td><input className="form-control" type="text" placeholder="Enter Alfa" value={x.test_alpha} name="test_alpha" onChange={e => handleInputChange(e, i)}/></td>
                                                       <td>
                                                         { loading ? <LoadingSpinner /> :
                                                           <select name="formula" className="form-select" onChange={e => handleInputChange(e, i)} value={x.formula}>
                                                              <option value="">Select Formula</option>
                                                              { data3.map((option, key) => <option value={option.id} key={key} >{option.formula_name}</option>) }
                                                           </select>
                                                         }
                                                       </td>
                                                       <td><input className="form-control" type="text" placeholder="Enter Type" value={x.type} name="type" onChange={e => handleInputChange(e, i)}/></td>
                                                       <td>
                                                         { loading ? <LoadingSpinner /> :
                                                           <select name="unit" className="form-select" onChange={e => handleInputChange(e, i)} value={x.unit}>
                                                              <option value="">Select Unit</option>
                                                              { data4.map((option, key) => <option value={option.id} key={key} >{option.unit_name}</option>) }
                                                           </select>
                                                         }
                                                       </td>
                                                       <td>
                                                         <select className="form-select" name="value" value={x.value} onChange={e => handleInputChange(e, i)}>
                                                            <option value="V">V</option>
                                                            <option value="F">F</option>
                                                          </select>
                                                       </td>
                                                       <td><input className="form-control" type="text" placeholder="Enter Sort Val" value={x.sort} name="sort" onChange={e => handleInputChange(e, i)}/></td>
                                                       <td>{inputList.length > 1 ? <button
                                                                         className="mr10"
                                                                         onClick={e => handleRemoveClick(e,i)} className="btn btn-danger"><i class="fa fa-trash"></i></button> : ''}</td>
                                                     </tr>
                                                     </React.Fragment>
                                                                     ))}
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
                                                     {inputList.map((x, i) => ( <div className="col-md-2">
                                                     {inputList.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}
                                                     </div>))}
                                                 </center>
                                               </div>
                                         </div>
                                       </div>

                                     </div>
                                 </div>
                             </div>
                          </div>
                        }
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default EditTest
