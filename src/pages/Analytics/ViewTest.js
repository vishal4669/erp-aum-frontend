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

function ViewTest(props) {

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
  const [inputList, setInputList]  = useState([{ test_by_pass: "", test_parameter_name: "",
    test_alpha: "", formula:"", type: "",unit:"",value:"",sort:""}]);
  const [convertedText, setConvertedText] = useState("");

useEffect(() => {
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
                     parent_id:response.data.data[0].parent_name[0] ? response.data.data[0].parent_name[0].procedure_name: ''
                   });
                   setConvertedText(response.data.data[0].test_procedure)
                   if(Array.isArray(response.data.data[0].parameters) && response.data.data[0].parameters.length){
                     setInputList(response.data.data[0].parameters);
                   } else {
                     setInputList();
                   }
                   {setLoading(false)};
             })
        }

return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form>
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Analytics</li>
                                            <li className="breadcrumb-item"><a href="/test">Test</a></li>
                                            <li className="breadcrumb-item active">View Test</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/test" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>
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
                                                  <input className="form-control" value={test.procedure_name} type="text" placeholder="Procedure Name" readOnly/>
                                               </div>
                                               <div className="col-md-2">
                                                 <label>Price</label>
                                                  <input className="form-control" value={test.price} type="text" placeholder="Price" readOnly/>
                                               </div>
                                               <div class="col-md-2">
                                                 <label>Test Code</label>
                                                  <input className="form-control" type="text" value={test.test_code} placeholder="Test Code" readOnly/>
                                               </div>
                                               <div class="col-md-2">
                                                 <label>Test Category</label>
                                                  <input className="form-control" type="text" value={test.test_category} placeholder="Test Category" readOnly/>
                                               </div>
                                               <div class="col-md-3">
                                                 <label>Parent</label>
                                                 <input className="form-control" type="text" value={test.parent_id} placeholder="Parent" readOnly/>
                                               </div>
                                             </div>
                                           </div>
                                       </div>

                                       <div className="mb-3 row">
                                           <div className="form-group">
                                             <div className="row">
                                               <div className="col-md-12">
                                                 <label className="required-field">Procedure</label>
                                                     <ReactQuill
                                                             theme='snow'
                                                             name="test_procedure"
                                                             value={convertedText}
                                                            readOnly
                                                           />
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
                                                       </tr>
                                                   </thead>
                                                   <tbody>
                                                   {
                                                     inputList && inputList.length ?
                                                     inputList.map((x, i) => (
                                                     <React.Fragment key={x}>
                                                     <tr>
                                                       <td><input className="form-control" type="text" placeholder="By Pass" value={x.test_by_pass == 2 ? "No" : "Yes"} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="Parameter Name" value={x.test_parameter_name} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="Alfa" value={x.test_alpha} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="Formula" value={x.formula_name} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="Type" value={x.type} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="Unit" value={x.unit_name} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="By Pass" value={x.value == "V" ? "V" : "F"} readOnly/></td>
                                                       <td><input className="form-control" type="text" placeholder="Sort" value={x.sort} readOnly/></td>
                                                     </tr>
                                                     </React.Fragment>
                                                                     ))
                                                                  : <tr><td colspan="8" className="text-center"><b>No Parameters For Test Available</b></td></tr> }
                                                   </tbody>
                                                 </Table>
                                             </div>
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

export default ViewTest
