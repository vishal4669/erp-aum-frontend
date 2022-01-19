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

function AddMethod(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [method, setMethod] = useState({ name:'',type:'',date:moment(new Date()).format("YYYY-MM-DD"),file1:'',file2:'',file3:'',file4:''});
  const [convertedText, setConvertedText] = useState("");
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

useEffect(() => {
         fetchPharmacopeia();

        }, []);

        const fetchPharmacopeia =  async() => {
           await axios.get(`${process.env.REACT_APP_BASE_APIURL}listPharmacopeia?is_dropdown=1`,{headers})
            .then(response => {
                     setData(response.data.data);
               })
        }


const InsertMethod = (e)=>{
         e.preventDefault();
        {setLoading(true)};
        /*const data =
        {
            name:method.name,
            type: method.type,
            date: method.date,
            file_1: method.file1 !== false ? method.file1: '',
            file_2: method.file2 !== false ? method.file2: '',
            file_3: method.file3 !== false ? method.file3: '',
            file_4: method.file4 !== false ? method.file4: '',
            description : convertedText
        };*/

        const data = new FormData();

        data.append("name",method.name);
        data.append("type",method.type);
        data.append("date",method.date);
        data.append("file_1",method.file1 !== false ? method.file1: '');
        data.append("file_2",method.file2 !== false ? method.file2: '');
        data.append("file_3",method.file3 !== false ? method.file3: '');
        data.append("file_4",method.file4 !== false ? method.file4: '');
        data.append("description",convertedText);

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addMethod`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){

                       props.history.push('/method');
                      toastr.success(response.data.message);
                      {setLoading(false)};
                    }
                    else{
                        props.history.push('/add-method');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }


const ResetMethod = () => {
  document.getElementById("AddMethod").reset();
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
                     <Form onSubmit={InsertMethod} method="POST" id="AddMethod">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">QA</li>
                                            <li className="breadcrumb-item"><a href="/method">Method</a></li>
                                            <li className="breadcrumb-item active">Add Method</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/method" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            <li><button type="reset" onClick = {ResetMethod} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                                            &nbsp;
                                            { loading ? <center><LoadingSpinner /></center> :
                                                <li>
                                               <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                                            </li>
                                           }
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
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
                                                <input className="form-control" type="text" name="name" placeholder="Enter Method Name" onChange={onChange}/>
                                             </div>
                                             <div className="col-md-4">
                                               <label className="required-field">Method Type</label>
                                               <select name="type" className="form-select" onChange={onChange}>
                                                  <option value="">Select Method Type</option>
                                                  { data.map((option, key) => <option value={option.id} key={key} >{option.pharmacopeia_name}</option>) }
                                               </select>
                                             </div>
                                             <div className="col-md-4">
                                               <label>Date</label>
                                                <input className="form-control" type="date" name="date" defaultValue={method.date} onChange={onChange}/>
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

                                                   </div>

                                                   <div className="col-md-3">
                                                       <label>File 2</label>
                                                       <input name="file1" type="file" className="form-control" onChange={changeFile2Handler}/>
                                                   </div>


                                                   <div className="col-md-3">
                                                       <label>File 3</label>
                                                       <input name="file2" type="file" className="form-control" onChange={changeFile3Handler}/>
                                                   </div>

                                                   <div className="col-md-3">
                                                       <label>File 4</label>
                                                       <input name="file3" type="file" className="form-control" onChange={changeFile4Handler}/>
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
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default AddMethod
