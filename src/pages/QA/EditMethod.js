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

function EditMethod(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const url = window.location.href
  const method_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
  const edit_method_id =url.substring(url.lastIndexOf('/') + 1)

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]);
  const [method, setMethod] = useState({ name:'',type:'',date:'',file1:'',file2:'',file3:'',file4:''});
  const [convertedText, setConvertedText] = useState("");
  const [attachments,setAttachments] = useState({attach_file1 : '',attach_file2 : '',attach_file3 : '',
        attach_file4 : '',});

   const delete_btn_style = {
    height:'31px'
   }

   const attachment_style = {
    fontSize:'14px',
    width:'100%'
   }

  //File1 Change Event
  const changeFile1Handler = event => {
    setMethod(prevState => ({ ...prevState, file1: event.target.files[0]}))
  };

  //File2 Change Event
  const changeFile2Handler = event => {
    setMethod(prevState => ({ ...prevState, file2: event.target.files[0]}))
  };

  //File3 Change Event
  const changeFile3Handler = event => {
    setMethod(prevState => ({ ...prevState, file3: event.target.files[0]}))
  };

  //File4 Change Event
  const changeFile4Handler = event => {
    setMethod(prevState => ({ ...prevState, file4: event.target.files[0]}))
  };

var path = commonpath.method_file_attach;

useEffect(() => {
         fetchPharmacopeia();
         getMethod();

        }, []);

        const fetchPharmacopeia =  async() => {
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}listPharmacopeia?is_dropdown=1`,{headers})
            .then(response => {
                     setData(response.data.data);
               })
        }

        const getMethod =  async() => {
           {setLoading1(true)}; 
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}getMethod/`+method_id,{headers})
            .then(response => {
                        setMethod({
                        name : response.data.data[0].name,
                        type : response.data.data[0].type,
                        date : response.data.data[0].date,
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

const DeleteFile1 = (e) => {
          e.preventDefault();
           setMethod(prevState => ({ ...prevState, file1: ''}))
           setAttachments(prevState => ({ ...prevState, attach_file1: ''}))
}

const DeleteFile2 = (e) => {
          e.preventDefault();
           setMethod(prevState => ({ ...prevState, file2: ''}))
           setAttachments(prevState => ({ ...prevState, attach_file2: ''}))
}

const DeleteFile3 = (e) => {
          e.preventDefault();
           setMethod(prevState => ({ ...prevState, file3: ''}))
           setAttachments(prevState => ({ ...prevState, attach_file3: ''}))
}

const DeleteFile4 = (e) => {
          e.preventDefault();
           setMethod(prevState => ({ ...prevState, file4: ''}))
           setAttachments(prevState => ({ ...prevState, attach_file4: ''}))
}

const EditMethod = (e)=>{
         e.preventDefault();
        {setLoading(true)};

        const data = new FormData();

        data.append("name",method.name);
        data.append("type",method.type);
        data.append("date",method.date);

        if(method.file1 != false)
        {
          data.append('file_1', method.file1);
        } else {
          if(method.file1 == null){
            data.append('file_1', method.file1);
          } else {
            data.append('file_1', attachments.attach_file1);
          }
        }

        if(method.file2 != false)
        {
          data.append('file_2', method.file2);
        } else {
          if(method.file2 == null){
            data.append('file_2', method.file2);
          } else {
            data.append('file_2', attachments.attach_file2);
          }
        }

        if(method.file3 != false)
        {
          data.append('file_3', method.file3);
        } else {
          if(method.file3 == null){
            data.append('file_3', method.file3);
          } else {
            data.append('file_3', attachments.attach_file3);
          }
        }

        if(method.file4 != false)
        {
          data.append('file_4', method.file4);
        } else {
          if(method.file4 == null){
            data.append('file_4', method.file4);
          } else {
            data.append('file_4', attachments.attach_file4);
          }
        }

        data.append("description",convertedText);


         axios.post( `${process.env.REACT_APP_BASE_APIURL}updateMethod/`+method_id, data, {headers} )
                .then(response => {
                    if(response.data.success == true){

                       props.history.push('/method');
                      toastr.success(response.data.message);
                      {setLoading(false)};
                    }
                    else{
                        props.history.push('/edit-method/'+edit_method_id);
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }

  const onChange = (e) => {
    e.persist();
    setMethod({...method, [e.target.name]: e.target.value});
  }


return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form onSubmit={EditMethod} method="POST" id="EditMethod">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">QA</li>
                                            <li className="breadcrumb-item"><a href="/method">Method</a></li>
                                            <li className="breadcrumb-item active">Edit Method</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/method" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            { loading ? <center><LoadingSpinner /></center> :
                                                <li>
                                               <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                                            </li>
                                           }
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
                                                <input className="form-control" type="text" value={method.name} name="name" placeholder="Enter Method Name" onChange={onChange}/>
                                             </div>
                                             <div className="col-md-4">
                                               <label className="required-field">Method Type</label>
                                               <select name="type" className="form-select" onChange={onChange} value={method.type}>
                                                  <option value="">Select Method Type</option>
                                                  { data.map((option, key) => <option value={option.id} key={key} >{option.pharmacopeia_name}</option>) }
                                               </select>
                                             </div>
                                             <div className="col-md-4">
                                               <label>Date</label>
                                                <input className="form-control" type="date" name="date" value={method.date} onChange={onChange}/>
                                             </div>

                                           </div>
                                         </div>
                                     </div>

                                       <div className="mb-3 row">
                                           <div className="form-group">
                                               <div className="row">

                                                   <div className="col-md-3">
                                                       <label>File</label>
                                                      <input name="file" type="file" className="form-control" onChange={changeFile1Handler}/>
                                                      {attachments.attach_file1 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-10">
                                                                      <a href={path+attachments.attach_file1} style={attachment_style} className="btn btn-primary form-control btn-sm" target="_blank">Click To Open File 1</a>
                                                                      </div>
                                                                      <div className="col-md-2">
                                                                      <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteFile1(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : ''}
                                                   </div>

                                                   <div className="col-md-3">
                                                       <label>File 2</label>
                                                       <input name="file1" type="file" className="form-control" onChange={changeFile2Handler}/>
                                                       {attachments.attach_file2 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-10">
                                                                      <a href={path+attachments.attach_file2} style={attachment_style} className="btn btn-dark form-control btn-sm" target="_blank">Click To Open File 2</a>
                                                                      </div>
                                                                      <div className="col-md-2">
                                                                      <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteFile2(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : ''}  
                                                   </div>


                                                   <div className="col-md-3">
                                                       <label>File 3</label>
                                                       <input name="file2" type="file" className="form-control" onChange={changeFile3Handler}/>
                                                            {attachments.attach_file3 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-10">
                                                                      <a href={path+attachments.attach_file3} style={attachment_style} className="btn btn-info form-control btn-sm" target="_blank">Click To Open File 3</a>
                                                                      </div>
                                                                      <div className="col-md-2">
                                                                      <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteFile3(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : ''} 
                                                   </div>

                                                   <div className="col-md-3">
                                                       <label>File 4</label>
                                                       <input name="file3" type="file" className="form-control" onChange={changeFile4Handler}/>
                                                            {attachments.attach_file4 !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-10">
                                                                      <a href={path+attachments.attach_file4} style={attachment_style} className="btn btn-success form-control btn-sm" target="_blank">Click To Open File 4</a>
                                                                      </div>
                                                                      <div className="col-md-2">
                                                                      <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteFile4(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div>
                                                        : ''} 
                                                   </div>
                                               </div>
                                           </div>
                                       </div>

                                     <div className="mb-3 row">
                                         <div className="form-group">
                                           <div className="row">
                                             <div className="col-md-12">
                                               <label className="required-field">Description</label>
                                                 <div className="text-editor">
                                                   <EditorToolbar />
                                                   <ReactQuill
                                                           theme='snow'
                                                           name="description"
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

export default EditMethod
