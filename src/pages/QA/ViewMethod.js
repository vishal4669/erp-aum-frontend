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
import moment from 'moment'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import EditorToolbar, { modules, formats } from "../../components/Common/EditorToolbar";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {commonpath} from '../../commonPath'

function ViewMethod(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const method_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_method_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [method, setMethod] = useState({ name:'',type:'',date:'',file1:'',file2:'',file3:'',file4:''});
  const [convertedText, setConvertedText] = useState("");
  const [attachments,setAttachments] = useState({attach_file1 : '',attach_file2 : '',attach_file3 : '',
        attach_file4 : '',});

var path = commonpath.method_file_attach;
   const delete_btn_style = {
    height:'31px'
   }

   const attachment_style = {
    fontSize:'14px',
    width:'100%'
   }

useEffect(() => {
         getMethod();

        }, []);

        const getMethod =  async() => {
           {setLoading1(true)}; 
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}getMethod/`+method_id,{headers})
            .then(response => {
                        setMethod({
                        name : response.data.data[0].name,
                        type : response.data.data[0].pharmacopeia.pharmacopeia_name ? response.data.data[0].pharmacopeia.pharmacopeia_name : '',
                        date : response.data.data[0].date ? response.data.data[0].date : '',
                        file1: '',
                        file2: '',
                        file3:'',
                        file4:'',
                    });
                    setAttachments({
                     attach_file1:response.data.data[0].file_1 !== null ? response.data.data[0].file_1 : '',
                     attach_file2:response.data.data[0].file_2 !== null ? response.data.data[0].file_2 : '',
                     attach_file3:response.data.data[0].file_3 !== null ? response.data.data[0].file_3 : '',
                     attach_file4:response.data.data[0].file_4 !== null ? response.data.data[0].file_4 : '',
                   })
                    setConvertedText(response.data.data[0].description);
                    {setLoading1(false)};
               })
        }

return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form method="POST">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">QA</li>
                                            <li className="breadcrumb-item"><a href="/method">Method</a></li>
                                            <li className="breadcrumb-item active">View Method</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/method" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        { loading1 ? <center><LoadingSpinner /></center> :
                        <div className="row">
                           <div className="col-12">
                               <div className="card">
                                   <div className="card-body">

                                       <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>
                                     <div className="mb-3 row">
                                         <div className="form-group">
                                           <div className="row">
                                             <div className="col-md-4">
                                               <label className="required-field">Name</label>
                                                <input className="form-control" type="text" value={method.name} name="name" placeholder="Enter Method Name" readOnly/>
                                             </div>
                                             <div className="col-md-4">
                                               <label className="required-field">Method Type</label>
                                               <input className="form-control" type="text" value={method.type} readOnly/>
                                             </div>
                                             <div className="col-md-4">
                                               <label>Date</label>
                                                <input className="form-control" type="date" name="date" value={method.date} readOnly/>
                                             </div>

                                           </div>
                                         </div>
                                     </div>

                                       <div className="mb-3 row">
                                           <div className="form-group">
                                               <div className="row">

                                                   <div className="col-md-3">
                                                       <label>File</label>
                                                      {attachments.attach_file1 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <a href={path+attachments.attach_file1} style={attachment_style} className="btn btn-primary form-control btn-sm" target="_blank">Click To Open File 1</a>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <span style={attachment_style} className="btn btn-primary form-control btn-sm" target="_blank">No File</span>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>}
                                                   </div>

                                                   <div className="col-md-3">
                                                       <label>File 2</label>
                                                       {attachments.attach_file2 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <a href={path+attachments.attach_file2} style={attachment_style} className="btn btn-dark form-control btn-sm" target="_blank">Click To Open File 2</a>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <span style={attachment_style} className="btn btn-dark form-control btn-sm" target="_blank">No File</span>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>}  
                                                   </div>


                                                   <div className="col-md-3">
                                                       <label>File 3</label>
                                                              {attachments.attach_file3 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <a href={path+attachments.attach_file3} style={attachment_style} className="btn btn-info form-control btn-sm" target="_blank">Click To Open File 3</a>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <span style={attachment_style} className="btn btn-info form-control btn-sm" target="_blank">No File</span>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>} 
                                                   </div>

                                                   <div className="col-md-3">
                                                       <label>File 4</label>
                                                            {attachments.attach_file4 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <a href={path+attachments.attach_file4} style={attachment_style} className="btn btn-success form-control btn-sm" target="_blank">Click To Open File 4</a>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-12">
                                                                      <span style={attachment_style} className="btn btn-success form-control btn-sm" target="_blank">No File</span>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>} 
                                                   </div>
                                               </div>
                                           </div>
                                       </div>

                                     <div className="mb-3 row">
                                         <div className="form-group">
                                           <div className="row">
                                             <div className="col-md-12">
                                               <label className="required-field">Description</label>
                                                   <ReactQuill
                                                           theme='snow'
                                                           name="description"
                                                           value={convertedText}
                                                           readOnly
                                                         />
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

export default ViewMethod
