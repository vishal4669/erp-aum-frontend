import React, { useState } from "react"

import {
  Card,
  CardBody,
  Col,
  Row,
  Container,Table,Input,Alert
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import HorizontalLayout from "../../components/HorizontalLayout"


const AddBooking = () => {
  const [customchk, setcustomchk] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

    const [rows2, setrows2] = useState([])
    const [rows3, setrows3] = useState([])
  
    const id = 1;
    const id1 = 1;

    const my_style = {
    width: '120px !important',

    }
  
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

    // Employement Details

    function handleRemoveRow4(e, id1) {
        if (typeof id != "undefined")
          document.getElementById("emp" + id1).style.display = "none"
          
      }
    
      function handleRemoveRow3(e, id1) {
        document.getElementById("form-first-repeater1").style.display = "none"
      }
    
      function handleAddRowNested2() {
        const item3 = { name2: "" }
        setrows3([...rows3, item3])
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
                    <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                    <li className="breadcrumb-item active">Add Booking</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/booking" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
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
                      <h5> <Alert color="success" role="alert">
                               <i className="fa fa-comment">&nbsp;Basic Info</i>
                      </Alert></h5>

                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Booking Type</label>
                                                <select className="form-select" name="booking_type">
                                                        <option value="Received">Received</option>
                                                      <option value="Entry">Entry</option>
                                                      <option value="Temp">Temp</option>
                                                      <option value="W">W</option>
                                                      <option value="Testing">Testing</option>
                                                      <option value="Data Fillup">Data Fillup</option>
                                                      <option value="Report">Report</option>
                                                      <option value="Dispatched">Dispatched</option>
                                                      <option value="Invoice">Invoice</option>
                                                      <option value="Cancel">Cancel</option>
                                                      </select>
                                              </div>  
                                              <div className="col-md-3">  
                                                <label>Report Type</label>
                                                <select className="form-select" name="report_type">
                                                        <option value="">None</option>
                                                      <option value="FP">FP</option>
                                                      <option value="RM">RM</option>
                                                      <option value="OT">OT</option>
                                                      <option value="TP">TP</option>
                                                      <option value="ADL">ADL</option>
                                                      </select>
                                              </div>
                                              <div className="col-md-3">  
                                                <label>Receipt Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="receipt_date"/>
                                              </div>  
                                              <div className="col-md-3">
                                                <label>Booking No</label>
                                                <input className="form-control" type="text" value="ARL/COA//210420/001" name="booking_no" readOnly/>
                                              </div>    
                                            </div>  
                                          </div>  
                                      </div>  


                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Customer</label>
                                                 <div className="input-group mb-3">{/*<div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><Link to="/add-customer" target="_blank"><i className="fa fa-plus-circle"></i></Link></span> </div>*/}  <input className="form-control" list="customer_list" id="exampleDataList" placeholder="Type to search..."/>
                                                    <datalist id="customer_list">
                                                        <option value="Ader Pharmachem"/>
                                                        <option value="Qualimed Pharma"/>
                                                        <option value="Jain Shop"/>
                                                        <option value="jaylian Pharma"/>
                                                        <option value="Olive Health Care"/>
                                                    </datalist></div>
                                              </div>  
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>ID</label>
                                                <input className="form-control" type="text" name="customer_id" readOnly/>
                                              </div>  
                                              <div className="col-md-4">  
                                                <label>Reference No</label>
                                                <input className="form-control" type="text" name="ref_no" placeholder="Enter Reference No"/>
                                              </div>

                                              <div className="col-md-4">  
                                                <label>Remarks</label>
                                                <textarea name="remarks" className="form-control" placeholder="Enter Remarks"></textarea>
                                              </div>    

                                            </div>  
                                          </div>
                                      </div>
  

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Manufacturer</label>
                                                 <input className="form-control" list="manufacturer_list" id="exampleDataList" placeholder="Type to search..."/>
                                                    <datalist id="manufacturer_list">
                                                        <option value="Ader Pharmachem"/>
                                                        <option value="Qualimed Pharma"/>
                                                        <option value="Jain Shop"/>
                                                        <option value="jaylian Pharma"/>
                                                        <option value="Olive Health Care"/>
                                                    </datalist>
                                              </div>  
                                              <div className="col-md-3">  
                                                <label>Supplier</label>
                                                 <input className="form-control" list="supplier_list" id="exampleDataList" placeholder="Type to search..."/>
                                                    <datalist id="supplier_list">
                                                        <option value="Ader Pharmachem"/>
                                                        <option value="Qualimed Pharma"/>
                                                        <option value="Jain Shop"/>
                                                        <option value="jaylian Pharma"/>
                                                        <option value="Olive Health Care"/>
                                                    </datalist>
                                              </div>  
                                              
                                              <div className="col-md-2">  
                                                <label>Mfg Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="mfg_date"/>
                                              </div>  

                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>Mfg</label>
                                                <select name="mfg_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>  

                                              <div className="col-md-2">  
                                                <label>Exp Date</label>
                                                <input className="form-control" type="date" id="example-date-input" name="exp_date"/>
                                              </div>  
                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>Exp</label>
                                                <select name="exp_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>    
                                            </div>  
                                          </div>
                                      </div>

                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Date of Analysis</label>
                                                 <input className="form-control" type="date" id="example-date-input" name="analysis_date"/>
                                              </div>  
                                              <div className="col-md-3">  
                                                <label>Aum Sr. No</label>
                                                 <input type="text" className="form-control" name="aum_sr_no" value="3145" readOnly/>
                                                    
                                              </div>  
                                              
                                              <div className="col-md-2">  
                                                <label>D Formate</label>
                                                <input className="form-control" type="text" name="d_formate" placeholder="Enter D Formate"/>
                                              </div>  

                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>Formate</label>
                                                <select name="formate_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>  

                                              <div className="col-md-2">  
                                                <label>Grade</label>
                                                <input className="form-control" type="text" name="grade" placeholder="Enter Grade"/>
                                              </div>  
                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>Grade</label>
                                                <select name="grade_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>    
                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">  
                                                <label>Project Name</label>
                                                <input className="form-control" type="text" name="project_name" placeholder="Enter Project Name"/>
                                              </div>  

                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>ProName</label>
                                                <select name="project_name_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">
                                                <label> Mfg. Lic. No</label>
                                                 <input className="form-control" type="text" placeholder="Enter Mfg Lic No" name="mfg_lic_no"/>
                                              </div>

                                              <div className="col-md-3">  
                                                <label>Is Report Dispacthed?</label>
                                                <select name="report_dispachted" className="form-select">
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                                    
                                              </div>  
                                              
                                              <div className="col-md-3">  
                                                <label>Signature?</label>
                                                <select name="signature" className="form-select">
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>  
                                                
                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-2">  
                                                <label>Verified By</label>
                                                <select name="verified_By" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="QA">QA</option>
                                                </select>
                                                    
                                              </div>  
                                              
                                              <div className="col-md-2">  
                                                <label>NABL Scope?</label>
                                                <select name="nabl_scope" className="form-select">
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                                    
                                              </div>  
                                              
                                              <div className="col-md-2">  
                                                <label>Cancel</label>
                                                <select name="cancel" className="form-select">
                                                  <option value="None">None</option>
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>

                                              <div className="col-md-6">
                                                <label>Cancel Remarks</label>
                                                <textarea name="cancel_remarks" className="form-control" placeholder="Enter Cancel Remarks"></textarea>
                                              </div>    
                                                
                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">

                                              <div className="col-md-3">  
                                                <label>Priority</label>
                                                <select name="priority" className="form-select">
                                                  <option value="High">High</option>
                                                  <option value="Medium">Medium</option>
                                                  <option value="Low">Low</option>
                                                </select>
                                                    
                                              </div>  
                                              
                                              <div className="col-md-3">  
                                                <label>Discipline</label>
                                                <select name="discipline" className="form-select">
                                                  <option value="Chemical">Chemical</option>
                                                  <option value="Biological">Biological</option>
                                                </select>
                                                    
                                              </div>  
                                              
                                              <div className="col-md-3">  
                                                <label>Group</label>
                                                <select name="group" className="form-select">
                                                  <option value="Drugs and Pharmaceuticals">Drugs and Pharmaceuticals</option>
                                                  <option value="Food of Agriculture Product">Food of Agriculture Product</option>
                                                </select>
                                              </div>

                                              <div className="col-md-3">  
                                                <label>Statement Of Conformity</label>
                                                <select name="priority" className="form-select">
                                                  <option value="PASS">PASS</option>
                                                  <option value="INDETERMINATE">INDETERMINATE</option>
                                                  <option value="FAIL">FAIL</option>
                                                </select>
                                                    
                                              </div>      
                                                
                                            </div>  
                                          </div>
                                      </div>  

                                        <h5> <Alert color="danger" role="alert">
                                            <i className="fa fa-comment">&nbsp;Sample Details</i>
                                        </Alert></h5>


                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="col-md-3">
                                                <label>Product</label>
                                                 <div className="input-group mb-3">{/*<div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><a href="add_products.php" target="_blank"><i className="fa fa-plus-circle"></i></a></span> </div><div className="input-group-prepend"><span className="input-group-text" id="basic-addon1"><a href="#" target="_blank">Edit</a></span> </div> */} <input className="form-control" list="product_list" id="exampleDataList" placeholder="Type to search..."/>
                                                    <datalist id="product_list">
                                                        <option value="ORS"/>
                                                        <option value="OLM"/>
                                                        <option value="MOX"/>
                                                        <option value="M & E"/>
                                                        <option value="Joylex Plus"/>
                                                    </datalist></div>
                                              </div>  
                                              <div className="col-md-1">
                                                <label style={{visibility: 'hidden'}}>ID</label>
                                                <input className="form-control" type="text" name="customer_id" readOnly/>
                                              </div>  
                                              <div className="col-md-4">  
                                                <label>Generic Name</label>
                                                <input className="form-control" type="text" name="generic_name" readOnly/>
                                              </div>

                                              <div className="col-md-4">  
                                                <label>Product Type</label>
                                                <select name="product_type" className="form-select">
                                                  <option value="Finished Product">Finished Product</option>
                                                  <option value="Raw Material">Raw Material</option>
                                                  <option value="Other">Other</option>
                                                </select>
                                              </div>    

                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              
                                              <div className="col-md-2">  
                                                <label>Pharmacopiea</label>
                                                <input className="form-control" type="text" name="pharmacopiea"/>
                                              </div>

                                              <div className="col-md-2">  
                                                <label>Batch No</label>
                                                <input className="form-control" type="text" name="batch_no"/>
                                              </div>

                                              <div className="col-md-1">  
                                                <label>Pack Size</label>
                                                <input className="form-control" type="text" name="pack_size"/>
                                              </div>

                                              <div className="col-md-1">  
                                                <label>Req Qty</label>
                                                <input className="form-control" type="text" name="req_qty"/>
                                              </div>

                                              <div className="col-md-2">  
                                                <label>Sample Code</label>
                                                <input className="form-control" type="text" name="sample_code"/>
                                              </div>

                                              <div className="col-md-4">  
                                                <label>Sample Desc</label>
                                                <input className="form-control" type="text" name="sample_desc"/>
                                              </div>

                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              
                                              <div className="col-md-3">  
                                                <label>Sample Qty</label>
                                                <input className="form-control" type="text" name="sample_qty"/>
                                              </div>

                                              <div className="col-md-3">  
                                                <label>Sample Location</label>
                                                <input className="form-control" type="text" name="sample_location"/>
                                              </div>

                                              <div className="col-md-3">  
                                                <label>Sample Packaging</label>
                                                <input className="form-control" type="text" name="sample_packaging"/>
                                              </div>

                                              <div className="col-md-3">  
                                                <label>Sample Type</label>
                                                <input className="form-control" type="text" name="sample_type"/>
                                              </div>

                                              
                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              
                                              <div className="col-md-2">  
                                                <label>Sampling Date From</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_from"/>
                                              </div>  

                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>SamplingFrom</label>
                                                <select name="sampling_date_from_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>  

                                              <div className="col-md-2">  
                                                <label>Sampling Date To</label>
                                                <input className="form-control" type="date" id="example-date-input" name="sampling_date_to"/>
                                              </div>  
                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>Sampling To</label>
                                                <select name="sampling_date_to_options" className="form-select">
                                                  <option value="N/S">N/S</option>
                                                  <option value="None">None</option>
                                                  <option value="N/A">N/A</option>
                                                </select>
                                              </div>    

                                              <div className="col-md-2">  
                                                <label>Sample Received Through</label>
                                                <select name="sample_received_through" className="form-select">
                                                  <option value="By Courier">By Courier</option>
                                                  <option value="By Hand">By Hand</option>
                                                  <option value="By Collection">By Collection</option>
                                                </select>
                                              </div>  

                                              <div className="col-md-1">  
                                                <label>Chemist</label>
                                                <select name="chemist" className="form-select">
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>  

                                              <div className="col-md-2">  
                                                <label>Sample Condition</label>
                                                <input className="form-control" type="text" name="sample_condition" value="Secured seal with label"/>
                                              </div>  

                                              <div className="col-md-1">  
                                                <label style={{visibility: 'hidden'}}>sampleconoption</label>
                                                <select name="sample_condition_options" className="form-select">
                                                  <option value="No">No</option>
                                                  <option value="Yes">Yes</option>
                                                </select>
                                              </div>  

                                            </div>  
                                          </div>
                                      </div>

                                      <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              
                                              <div className="col-md-2">  
                                                <label>Batch Size/ Qty Received</label>
                                                <input className="form-control" type="text" name="batch_size"/>
                                              </div>

                                              <div className="col-md-7">  
                                                <label>Notes</label>
                                                <input className="form-control" type="text" name="notes" value="* Marking test analysis are  not under  NABL scope"/>
                                              </div>

                                              <div className="col-md-3">  
                                                <label>Sample Drawn By</label>
                                                <input className="form-control" type="text" name="sample_drawn_by"/>
                                              </div>
                                              
                                            </div>  
                                          </div>
                                      </div> 

{/*Test Section Start*/}
                                      <h5> <Alert color="success" role="alert">
                                        <i className="fa fa-comment">&nbsp;Tests</i>
                                      </Alert></h5>
                                      <div data-repeater-list="group-a" id="form-first-repeater">
                                        <div data-repeater-item className="mb-3 row">
                                                <div className="form-group">
                                                    <div className="row">
                                                         <div className="table-responsive">
                                                            <Table className="table mb-0 border">
                                                              <thead className="table-light">
                                                                <tr>
                                                                    {/*<th></th>
                                                                    <th><input type="checkbox"/></th>*/}
                                                                    <th>Parent Child</th>
                                                                    <th>P Sr No</th>
                                                                    <th>By Pass</th>
                                                                    <th>Parent</th>
                                                                    <th>Product Details</th>
                                                                    <th>Test Name</th>
                                                                    <th>Label Claim</th>
                                                                    <th>Min.Limit</th>
                                                                    <th>Max.Limit</th>
                                                                    <th>Amount</th>
                                                                    <th style={{textAlign:'center'}}><i className="fa fa-trash"></i></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    {/*<td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                                    <td><input type="checkbox"/></td>*/}
                                                                    <td><select style={my_style}  name="parent_child" className="form-select">
                                                                      <option value="Parent">Parent</option>
                                                                      <option value="Child">Child</option>
                                                                    </select></td>
                                                                    <td><input type="text" name="p_sr_no" className="form-control"/></td>
                                                                    <td><select style={my_style} className="form-select" name="by_pass"><option value="No">No</option><option value="Yes">Yes</option></select></td>
                                                                    <td><select style={my_style} name="parent" className="form-select">
                                                                    <option value="None" selected="selected">None</option>
                                                                <option value="Related">Related</option>
                                                                <option value="Assay">Assay</option>
                                                                <option value="*" style={{fontSize : "20px !important"}}>*</option>
                                                                
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

                                                                  <td><textarea name="product_detail" className="form-control" style={{width:'120px !important'}}></textarea></td>

                                                                    <td><input className="form-control" name="test_name" style={{width:'150px !important'}}/>
                                                                    </td>
                                                                    <td><input type="text" name="label_claim" className="form-control"/></td>
                                                                     <td><input type="text" name="min_limit"  className="form-control"/></td>
                                                                    <td><input type="text" name="max_limit" className="form-control"/></td>
                                                                     <td><input type="text" name="amount"  className="form-control"/></td>
                                                                   
                                                                    <td>
                                                                      <input data-repeater-delete type="button" className="btn btn-primary" onClick={e => {
                                                                      handleRemoveRow2(e, id)
                                                                      }} value="Delete" />
                                                                    </td>
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
                                                <div className="form-group">
                                                    <div className="row">
                                                         <div className="table-responsive">
                                                            <Table className="table mb-0 border">
                                                             
                                                                <tbody>
                                                                <tr>
                                                                    {/*<td><i className="fa fa-arrow-down" aria-hidden="true"></i><i className="fa fa-arrow-up" aria-hidden="true"></i></td>
                                                                    <td><input type="checkbox"/></td>*/}
                                                                    <td><select name="parent_child" style={my_style} className="form-select">
                                                                      <option value="Parent">Parent</option>
                                                                      <option value="Child">Child</option>
                                                                    </select></td>
                                                                    <td><input type="text" name="p_sr_no" className="form-control"/></td>
                                                                    <td><select style={my_style} className="form-select" name="by_pass"><option value="No">No</option><option value="Yes">Yes</option></select></td>
                                                                    <td><select name="parent"  style={my_style} className="form-select">
                                                                    <option value="None" selected="selected">None</option>
                                                                <option value="Related">Related</option>
                                                                <option value="Assay">Assay</option>
                                                                <option value="*" style={{fontSize : "20px !important"}}>*</option>
                                                                
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

                                                                  <td><textarea name="product_detail" className="form-control" style={{width:'120px !important'}}></textarea></td>

                                                                    <td><input className="form-control" name="test_name" style={{width:'150px !important'}}/>
                                                                    </td>
                                                                    <td><input type="text" name="label_claim" className="form-control"/></td>
                                                                     <td><input type="text" name="min_limit"  className="form-control"/></td>
                                                                    <td><input type="text" name="max_limit" className="form-control"/></td>
                                                                     <td><input type="text" name="amount"  className="form-control"/></td>
                                                                   
                                                                    <td>
                                                                      <input data-repeater-delete type="button" className="btn btn-primary" onClick={e => {
                                                                        handleRemoveRow1(e, idx)
                                                                      }} value="Delete" />
                                                                    </td>
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

{/*Test Section End*/}

                   
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddBooking
