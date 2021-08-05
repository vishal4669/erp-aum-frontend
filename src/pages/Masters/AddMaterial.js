import React, { Component, useState,useEffect } from 'react';

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


function AddMaterial(props) { 
 const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
          
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data, setData] = useState([]); 
  const [data1, setData1] = useState([]); 
  const [data2, setData2] = useState([]); 
  const [material, setmaterial] = useState({ material_type: '', material_name: '',material_purchase_rate:'',material_code:'',
  category_id : '',sub_category_id:'',sub_sub_category_id:'',material_rate:'',material_amount:'',material_qty:'',mst_units_id:'',
  material_use_before_date:'',material_case_number:''});  
useEffect(() => {  

    ParentCategoryList();
         
        }, []); 

const ParentCategoryList = ()=>{

     {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listParentCategory`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading1(false)} 
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}   
              })
}

const InsertMaterial = (e)=>{
         e.preventDefault();

        {setLoading(true)};
        const data = { //category_name:category.category_name, parent_category_id: category.parent_category_id
        }; 
         axios.post( `${process.env.REACT_APP_BASE_APIURL}addCategory`, data, {headers} )

                .then(response => {
                    if(response.data.success == true){
                        props.history.push('/category');
                        toastr.success(response.data.message);
                        {setLoading(false)}; 
                    }else{
                        props.history.push('/add-category');
                        toastr.error(response.data.message);
                        {setLoading(false)};   
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })
     
      }


const ResetMaterial = () => { 
  document.getElementById("AddMaterial").reset();
}

  const onChange = (e) => {  
    e.persist();  
    setmaterial({...material, [e.target.name]: e.target.value});  
  } 
  

return(
    <React.Fragment>
      <HorizontalLayout/>

      <div className="page-content">
        <Container fluid={true}>
      {/* ref={(el) => this.myFormRef = el} in form tag last if form add has issue*/}
        <Form onSubmit={InsertMaterial} method="POST" id="AddMaterial">

        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><Link to="/material">Material</Link></li>
                    <li className="breadcrumb-item active">Add Material</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/material" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button onClick = {ResetMaterial} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                    </li>}
                </ol>
            </div>
        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                                        <h5 className="alert alert-success"><i className="fa fa-comment">&nbsp;Basic Info</i></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Type</label>
                                                        <select className="form-select" name="type">
                                                            <option value="Solid">Solid</option>
                                                            <option value="Liquid">Liquid</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>  
                                                    <div className="col-md-4">  
                                                        <label>Material Name</label>
                                                        <input className="form-control" type="text" name="material_name" placeholder="Enter Material Name"/>
                                                    </div>  

                                                    <div className="col-md-4">  
                                                        <label>Purchase Rate</label>
                                                        <input className="form-control" type="text" name="purchase_rate" placeholder="Enter Purchase Rate"/>
                                                    </div>  
                                                </div>  
                                            </div>  
                                        </div>    

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Code</label>
                                                        <input className="form-control" type="text" name="material_code" placeholder="Enter Material Code"/>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Category</label> {/*Need to fetch dynamically According to category selection sub category will displayed*/}
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="parent_category_id" name="parent_category_id" onChange={ onChange } >
                                                             <option value="">Select Category</option>
                                                            { data.map((option, key) => <option value={option.id} key={key} >{option.category_name}</option>) }
                                                            
                                                         </select> } 
                                                    </div>  
                                                    <div className="col-md-3">
                                                        <label>Sub Category</label>{/*Need to fetch dynamically According to sub category selection sub sub category will displayed*/}
                                                        <select className="form-select" name="sub_category">
                                                            <option value="Solid - Production">Solid - Production</option>
                                                            <option value="Liquid - Production">Liquid - Production</option>
                                                            <option value="Saftey Equipments">Saftey Equipments</option>
                                                        </select>
                                                    </div>  
                                                    <div className="col-md-3">  
                                                        <label>Sub Sub Category</label>{/*Need to fetch dynamically*/}
                                                        <select className="form-select" name="sub_sub_category">
                                                            <option value="Catetory 1">Catetory 1</option>
                                                            <option value="Catetory 2">Catetory 2</option>
                                                            <option value="Catetory 3">Catetory 3</option>
                                                        </select>
                                                    </div>      
                                                </div>  
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>Rate</label>
                                                        <input className="form-control" type="text" name="rate" placeholder="Enter Rate"/>
                                                    </div>  
                                                    <div className="col-md-4">  
                                                        <label>Amount</label>
                                                        <input className="form-control" type="text" name="amount" placeholder="Enter Amount"/>
                                                    </div>      

                                                    <div className="col-md-4">  
                                                        <label>Qty</label>
                                                        <input className="form-control" type="text" name="qty" placeholder="Enter Qty"/>
                                                    </div>  
                                                </div>  
                                            </div>
                                        </div>

                                      
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">   

                                                    <div className="col-md-4">  
                                                        <label>Unit</label>
                                                        <select name="unit" className="form-select"><option value="">None</option><option value="%">%</option><option value="% V/V">% V/V</option><option value="% W/V">% W/V</option><option value="% W/W">% W/W</option><option value="%RH">%RH</option><option value="°C">°C</option><option value="µg/gm">µg/gm</option><option value="µg/mg">µg/mg</option><option value="µm">µm</option><option value="µS">µS</option><option value="µS/Cm">µS/Cm</option><option value="Billion Spores">Billion Spores</option><option value="Billion Spores/gm">Billion Spores/gm</option><option value="Bottle">Bottle</option><option value="cfu/gm">cfu/gm</option><option value="cfu/ml">cfu/ml</option><option value="cm">cm</option><option value="cps">cps</option><option value="EU/Gm">EU/Gm</option><option value="EU/mg">EU/mg</option><option value="EU/ml">EU/ml</option><option value="EU/Unit">EU/Unit</option><option value="GM">GM</option><option value="Gm/ml">Gm/ml</option><option value="IU">IU</option><option value="IU/gm">IU/gm</option><option value="IU/Kg">IU/Kg</option><option value="IU/mg">IU/mg</option><option value="KG">KG</option><option value="Kg/cm²">Kg/cm²</option><option value="Kgs.">Kgs.</option><option value="kp">kp</option><option value="Liter">Liter</option><option value="Litre (Ltr)">Litre (Ltr)</option><option value="M (Molarity)">M (Molarity)</option><option value="mcg">mcg</option><option value="mEq">mEq</option><option value="mg">mg</option><option value="Million Spores">Million Spores</option><option value="Million Spores/gm">Million Spores/gm</option><option value="ml">ml</option><option value="mm">mm</option><option value="mol/Liter">mol/Liter</option><option value="mPs">mPs</option><option value="N ( Newton)">N ( Newton)</option><option value="N ( Normality)">N ( Normality)</option><option value="Nos.">Nos.</option><option value="ppm">ppm</option><option value="Spores">Spores</option><option value="Spores/gm">Spores/gm</option><option value="Unit/gm">Unit/gm</option><option value="Unit/mg">Unit/mg</option></select>
                                                    </div>

                                                    <div className="col-md-4">  
                                                        <label>Use Before Date</label>
                                                        <input className="form-control" type="date" name="use_before_date"/>
                                                    </div>

                                                    <div className="col-md-4">  
                                                        <label>Case Number</label>
                                                        <input className="form-control" type="text" name="case_number" placeholder="Enter Case Number"/>
                                                    </div>



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
export default AddMaterial;
