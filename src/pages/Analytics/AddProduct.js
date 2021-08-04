import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,Table,Input
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import HorizontalLayout from "../../components/HorizontalLayout"
import { MDBDataTable } from "mdbreact"
import { withRouter, Link } from "react-router-dom"

const AddProduct = () => {
  const [customchk, setcustomchk] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

  const id = 1;

  const [rows2, setrows2] = useState([])
  
  // Educational Details
  function handleRemoveRow1(e, id) {
    if (typeof id != "undefined")
      document.getElementById("addre" + id).style.display = "none"
      
  }

  function handleRemoveRow2(e, id) {
    document.getElementById("form-first-repeater").style.display = "none"
  }

  function handleAddRowNested1() {
    const item2 = { name1: "" }
    setrows2([...rows2, item2])
  }

  return (
    <React.Fragment>
      <HorizontalLayout/>  
      <div className="page-content">
        <Container fluid={true}>
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
                    <li><Link to="/products" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                    <li><button type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                    &nbsp;
                    <li><a href="#" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Save</i></a></li>
                    
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
                                <label>Product Name</label>
                                <input className="form-control" type="text" placeholder="Enter Product Name" name="product_name"/>
                            </div>  

                            <div class="col-md-3">
                                <label>Product/Genric</label>
                                <select className="form-select" name="product_generic">
                                    <option value="Finished Product">Finished Product</option>
                                    <option value="Raw Material">Raw Material</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>  

                            <div class="col-md-3">
                                <label>Marker/Specifiction</label>
                                <input className="form-control" type="text" name="marker_specification" placeholder="Enter Marker/Specifiction" />
                            </div>  
                            <div class="col-md-3">  
                                <label>Pharmocopiea</label>
                                {/* <!--fetch dynamically-->*/}
                                <select class="form-select" name="pharmocopiea">
                                    <option value="IB">IB</option>
                                    <option value="BP">BP</option>
                                    <option value="USP">USP</option>
                                </select>
                            </div>      
                        </div>  
                    </div>
                    </div>


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-5">
                                <label>Generic Name</label>
                                <input className="form-control" list="generic_list" id="exampleDataList" placeholder="Type to search..."/>
                                <datalist id="generic_list">
                                    <option value="OAG-LAT-1"/>
                                    <option value="P.V.P.K - 30 IP"/>
                                    <option value="Water"/>
                                    <option value="Water Phase"/>
                                    <option value="UREA"/>
                                </datalist>
                            </div>  
                            <div class="col-md-2">  
                                <label style={{visibility: 'hidden'}}>Copy From Generic</label>
                                <button type="button" name="copy_generic" className="form-control btn btn-primary">Copy From Generic</button>
                            </div>      

                            <div class="col-md-5">  
                                <label>Packing Detail</label>
                                <input className="form-control" type="text"  name="packing_detail" placeholder="Enter Packng Detail"/>
                            </div>    

                        </div>  
                    </div>  
                    </div>    


                    <div class="mb-3 row">
                    <div class="form-group">
                        <div class="row">
                            
                            <div class="col-md-8">  
                                <label>Sample Description</label>
                                <textarea name="sample_description" className="form-control" placeholder="Enter Sample Description"></textarea>
                            </div>   

                            
                                <div class="col-md-4">  
                                <label>HSN Code</label>
                                {/*<!--Fetch Dynamically-->*/}
                                <input type="text" name="hsn_code" className="form-control" placeholder="Enter HSN Code"/>
                            </div>    

                        </div>  
                    </div>
                    </div>

                    <h5 class="alert alert-danger"><i class="fa fa-comment">&nbsp;Sample Details</i></h5>
                    <div data-repeater-list="group-a" id="form-first-repeater">
                        <div data-repeater-item className="mb-3 row">   
                                <div class="form-group">
                                    <div class="row">
                                    <div className="table-responsive">
                                        <Table className="table mb-0 border">
                                            <thead className="table-light">
                                                <tr>
                                                    <th></th>
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

                                                <tr>
                                                    <td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                    <td><select className="form-select" name="by_pass" style={{width:'70px !important'}}><option value="No">No</option><option value="Yes">Yes</option></select></td>
                                                    <td><select name="parent" className="form-select" style={{width:'100px !important'}}>
                                                    <option value="None">None</option>
                                                    <option value="Related">Related</option>
                                                    <option value="Assay">Assay</option>
                                                
                                                    <option value="By KFR">By KFR</option>
                                                    
                                                    <option value="By  IC">By  IC</option>
                                                    
                                                    <option value="By ELSD DETECTOR">By ELSD DETECTOR</option>
                                                    
                                                    <option value="By FLD DETECTOR">By FLD DETECTOR</option>
                                                    
                                                    <option value="By GCMS">By GCMS</option>
                                                    
                                                    <option value="By RID DETECTOR">By RID DETECTOR</option>
                                                    
                                                    <option value="By ICPMS">By ICPMS</option>
                                                    
                                                    <option value="By GC">By GC</option>
                                                    
                                                    <option value="By MPAES">By MPAES</option>
                                                    
                                                    <option value="By UV">By UV</option>
                                                    
                                                    <option value="By HPLC">By HPLC</option>
                                                    
                                                    <option value="By I.R.">By I.R.</option>
                                                    
                                                    <option value="BY CHEMICAL">BY CHEMICAL</option>
                                                    
                                                    <option value="By Microbiological Assay">By Microbiological Assay</option>
                                                    
                                                    <option value="By Potentiometric Titration">By Potentiometric Titration</option>
                                                    
                                                    <option value="By RT">By RT</option>
                                                    
                                                    <option value="BY TLC">BY TLC</option>
                                                    
                                                    <option value="By Titration">By Titration</option>
                                                    
                                                    <option value="By microbiology">By microbiology</option>
                                                    
                                                    <option value="By AES">By AES</option></select></td>

                                                    <td><input className="form-control" list="parameter_list" id="exampleDataList" placeholder="Type to search..." style={{width:'120px !important'}}/>
                                                    <datalist id="parameter_list">
                                                        <option value="D-isomer()"/>
                                                        <option value="PAN()"/>
                                                        <option value="Jelly Strength()"/>
                                                        <option value="n-hexane()"/>
                                                        <option value="Zinc()"/>
                                                    </datalist></td>
                                                    <td><Input type="text" name="label_claim" className="form-control"/></td>
                                                        <td><Input type="text" name="min_limit"  className="form-control"/></td>
                                                    <td><Input type="text" name="max_limit" className="form-control"/></td>
                                                        <td><Input type="text" name="amount"  className="form-control"/></td>
                                                        <td><Input type="text" name="method" className="form-control"/></td>
                                                        <td><Input type="text" name="description" className="form-control"/></td>
                                                        <td><Input type="text" name="division" className="form-control"/></td>
                                                        <td><Input type="text" name="nabl" className="form-control"/></td>
                                                    <td><Input type="text" name="formula" className="form-control"/></td>
                                                    
                                                    <td> <input data-repeater-delete type="button" className="btn btn-primary" onClick={e => {
                                                                    handleRemoveRow2(e, id)
                                                                    }} value="Delete" /></td>
                                                </tr>
                                            </tbody>    
                                        </Table>
                                        
                                    </div>  
                                </div>
                            </div>
                        </div> 
                    </div>        

                        {rows2.map((item2, idx) => (
                <React.Fragment key={idx}>
                    <div data-repeater-list="group-a" id={"addre" + idx}>
                    <div data-repeater-item className="mb-3 row"> 
                    <div class="form-group">
                        <div class="row">
                        <div className="table-responsive">
                            <Table className="table mb-0 border">
                                <thead className="table-light">
                                    <tr>
                                        <th></th>
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

                                    <tr>
                                        <td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                        <td width="100px"><select className="form-select" name="by_pass"><option value="No">No</option><option value="Yes">Yes</option></select></td>
                                        <td width="100px"><select name="parent" className="form-select">
                                        <option value="None">None</option>
                                        <option value="Related">Related</option>
                                        <option value="Assay">Assay</option>
                                    
                                        <option value="By KFR">By KFR</option>
                                        
                                        <option value="By  IC">By  IC</option>
                                        
                                        <option value="By ELSD DETECTOR">By ELSD DETECTOR</option>
                                        
                                        <option value="By FLD DETECTOR">By FLD DETECTOR</option>
                                        
                                        <option value="By GCMS">By GCMS</option>
                                        
                                        <option value="By RID DETECTOR">By RID DETECTOR</option>
                                        
                                        <option value="By ICPMS">By ICPMS</option>
                                        
                                        <option value="By GC">By GC</option>
                                        
                                        <option value="By MPAES">By MPAES</option>
                                        
                                        <option value="By UV">By UV</option>
                                        
                                        <option value="By HPLC">By HPLC</option>
                                        
                                        <option value="By I.R.">By I.R.</option>
                                        
                                        <option value="BY CHEMICAL">BY CHEMICAL</option>
                                        
                                        <option value="By Microbiological Assay">By Microbiological Assay</option>
                                        
                                        <option value="By Potentiometric Titration">By Potentiometric Titration</option>
                                        
                                        <option value="By RT">By RT</option>
                                        
                                        <option value="BY TLC">BY TLC</option>
                                        
                                        <option value="By Titration">By Titration</option>
                                        
                                        <option value="By microbiology">By microbiology</option>
                                        
                                        <option value="By AES">By AES</option></select></td>

                                        <td width="150px"><input className="form-control" list="parameter_list" id="exampleDataList" placeholder="Type to search..."/>
                                        <datalist id="parameter_list">
                                            <option value="D-isomer()"/>
                                            <option value="PAN()"/>
                                            <option value="Jelly Strength()"/>
                                            <option value="n-hexane()"/>
                                            <option value="Zinc()"/>
                                        </datalist></td>
                                        <td><Input type="text" name="label_claim" className="form-control"/></td>
                                            <td><Input type="text" name="min_limit"  className="form-control"/></td>
                                        <td><Input type="text" name="max_limit" className="form-control"/></td>
                                            <td><Input type="text" name="amount"  className="form-control"/></td>
                                            <td><Input type="text" name="method" className="form-control"/></td>
                                            <td><Input type="text" name="description" className="form-control"/></td>
                                            <td><Input type="text" name="division" className="form-control"/></td>
                                            <td><Input type="text" name="nabl" className="form-control"/></td>
                                        <td><Input type="text" name="formula" className="form-control"/></td>
                                        
                                        <td><input data-repeater-delete type="button" className="btn btn-primary" onClick={e => {
                                  handleRemoveRow1(e, idx)
                                }} value="Delete" /></td>
                                    </tr>
                                </tbody>    
                            </Table> 
                    </div>
                </div>
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
                                                        
                                                            <input data-repeater-create type="button" onClick={() => {
                                                            handleAddRowNested1()
                                                            }} className="btn btn-success mt-3 mt-lg-0" value="Add More" />
                                                            {/*<button name="add_more" type="button" className="btn btn-primary form-control">Add More</button>*/}
                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>   
                    
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddProduct
