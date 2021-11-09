import React, { Component, useState, useEffect } from 'react';

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
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

function EditCategory(props){
const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }
  const [category, setcategory]= useState({category_name : '',parent_category_id : ''})
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
const url = window.location.href
const category_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_category_id =url.substring(url.lastIndexOf('/') + 1)
        const EditCategory = (e)=>{
         e.preventDefault();
         const data = {
          category_name: category.category_name,
          parent_category_id :category.parent_category_id,
         };
        
     
        {setLoading(true)};

         axios.post( `${process.env.REACT_APP_BASE_APIURL}editCategory/`+category_id,data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/category');
                        toastr.success(response.data.message);
                        {setLoading(false)}  
                    }else{
                        props.history.push('/edit-category/'+edit_category_id);
                        toastr.error(response.data.message);
                        {setLoading(false)}  
                    }
                })
                .catch((error) => {
                  {setLoading(false)}   
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
                })      
      }


useEffect(() => {  
          CategoryList(); 
          CategoryData(); 
        }, []);  

        const CategoryList = () =>{
       {setLoading1(true)} 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listCategory?is_dropdown=1`,{headers})
        .then(response => {
                 setData(response.data.data);
                 {setLoading1(false)}   
           })
          .catch((error) => {
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
               {setLoading1(false)}   
          })

  }

    const CategoryData=()=>{ 
    {setLoading1(true)} 
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getCategory/`+category_id,{headers})  
          .then(response => {  
              setcategory(response.data.data); 
               {setLoading1(false)}   
  
          })  
          .catch((error) => {  
              {setLoading1(false)} 
              toastr.error(error.response.data.message);
              this.setState({loading: false}); 
          })  
    } 

      const logChange = (e) =>{
        e.persist();  
        setcategory({...category,[e.target.name]: e.target.value});  
    }

  return (
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={ (e) => {
           EditCategory(e) }} method="POST" id="EditCategory">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/category">Category</Link></li>
                    <li className="breadcrumb-item active">Edit Category</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/category" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                   
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>}
                </ol>
            </div>
        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Basic Info</i>
                    </Alert></h5>
{loading1 ? <center><LoadingSpinner /></center> : 
                    <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                     <div className="col-md-6">
                                                        <label>Name</label>
                                                        <input type="text" value={category.category_name} name="category_name" onChange={logChange} className="form-control" placeholder="Enter Category Name" required/>
                                                    </div>  

                                                    <div className="col-md-6">
                                                        <label>Category Parent</label>
                                                        
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" name="parent_category_id" value={category.parent_category_id} onChange={logChange}>
                                                              <option value="">Select Category</option>                  
                                                            { data.map((option, key) => <option value={option.id} key={key} >{option.category_name}</option>) }
                                                            
                                                         </select> }
                                                    </div>  
                                                </div>  
                                            </div>
                                        </div>}
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>

  );
};
export default EditCategory;
