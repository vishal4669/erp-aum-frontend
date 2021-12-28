import React, { useState, useEffect } from 'react';

import {
  Form,
  Container,
} from 'reactstrap';

//Import Breadcrumb
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'


function AddFormula(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

  const [loading, setLoading] = useState(false);
  const [formula, setFormula] = useState({ formula_name: '',formula_type:''});

const InsertFormula = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = {
          formula_name:formula.formula_name,
          formula_type:formula.formula_type,
        };
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addFormula`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/formula');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/add-formula');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }


const ResetFormula = () => {
  document.getElementById("formula").reset();
}

  const onChange = (e) => {
    e.persist();
    setFormula({...formula, [e.target.name]: e.target.value});
  }

return(
 <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={InsertFormula} method="POST" id="formula">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item"><Link to="/formula">Formula</Link></li>
                    <li className="breadcrumb-item active">Add Formula</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/formula" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {ResetFormula} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                    </li>}
                </ol>
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
                             <div className="col-md-6">
                               <label className="required-field">Name</label>
                                <input className="form-control" type="text" name="formula_name" onChange={ onChange } placeholder="Enter Formula Name"/>
                             </div>
                             <div className="col-md-6">
                                <label>Type</label>
                                <input className="form-control" type="text" name="formula_type" onChange={ onChange } placeholder="Enter Formula Type"/>
                             </div>
                           </div>
                         </div>
                     </div>
                   </div>
               </div>
           </div>
        </div>
      </Form>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddFormula
