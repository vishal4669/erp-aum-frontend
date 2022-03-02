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
import $ from 'jquery'
import Select from 'react-select'

//import dropdown constant file

import {quotation_dropdown} from '../constant'

function AddQuotation(props) {

  const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        }

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // Set Customer Dropdown data
  const [data,setData] = useState([]);

  // set Currency Dropdown Data

  const [data1, setData1] = useState([]);

  // set Sample Name Dropdown Data

  const [data2, setData2] = useState([]);

  // set test data dropdown
  const [data3, setData3] = useState([]);

  // set method data dropdown
  const [data4, setData4] = useState([]);

  // setting quotation fields array
  const [quotation, setQuotation] = useState({ quotation_no: '', type: 'Sample',customer_id:'',subject:'',
  quotation_date:'',valid_until:'',status:'Open',kind_attention:'',turn_around_time:'',quotation_remarks:'',currency_type:'1',grand_total:'1',
  payment_terms:'',product_info_grand_total:'0.00'});

  // setting product info fields array

  const [inputList, setInputList]  = useState([{ sample_name: "", test_required: "",
    method_technique: "", sample_qty:"0.00", first_sample: "0.00",sample_in_row: "0.00", sample_preperation: "0.00",
      total: "0.00", remark:""}]);

useEffect(() => {
{ setLoading1(true) };

const axiosrequest1 = axios.get(`${process.env.REACT_APP_BASE_APIURL}generateQuotationNo`,{headers});
const axiosrequest2 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer?is_dropdown=1`,{headers});
const axiosrequest3 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listCurrency`,{headers});
const axiosrequest4 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?is_sample_info=1`,{headers});
const axiosrequest5 = axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest?is_dropdown=1`,{headers});

axios.all([axiosrequest1, axiosrequest2,axiosrequest3,axiosrequest4,axiosrequest5]).then(axios.spread(function(res1, res2, res3,res4,res5) {

/*if(res1.status == 401 || res2.status == 401){
  { setLoading1(false) };
  return
}*/
  setQuotation(prevState => ({ ...prevState, quotation_no: res1.data.data}));
  if(res2){
    const options = res2.data.data.map(d => ({
      "value": d.id,
      "label": d.company_name
    }))
      setData(options)
  }
  setData1(res3.data.data)
  if(res4){
  /*  const options1 = res4.data.data.map((d,i) =>
      {
        /*return ({
          "value": d.id,
          "text": d.id+" - "+d.product_name,
        })*/
        /*return ({
          "label": d.product_name,
          "id": d.id,
        })
      })*/
      setData2(res4.data.data)
  }
  if(res5){
    /*const options2 = res5.data.data.map((d,i) =>
      {
        return ({
          "value": d.id,
          "text": d.id+" - "+d.procedure_name,
        })
      })*/
      setData3(res5.data.data)
  }
  //setData2(res4.data.data)
  { setLoading1(false) };
}));
    }, []);

const InsertQuotation = (e)=>{
         e.preventDefault();
         {setLoading(true)};
        const data =
        {
          quotation_no:quotation.quotation_no,
          type:quotation.type,
          customer_id:quotation.customer_id,
          subject:quotation.subject,
          quotation_date:quotation.quotation_date,
          valid_until:quotation.valid_until,
          status:quotation.status,
          kind_attention:quotation.kind_attention,
          turn_around_time:quotation.turn_around_time,
          remarks:quotation.quotation_remarks,
          currency_type:quotation.currency_type,
          grand_total:quotation.grand_total,
          payment_terms:quotation.payment_terms,
          product_info_grand_total: quotation.product_info_grand_total,
          //grand_total_value
          "quotation_product_info": inputList,
        };

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addQuotation`, data, {headers} )
                .then(response => {
                    if(response.data.success == true){

                       props.history.push('/quotation');
                      toastr.success(response.data.message);
                      {setLoading(false)};
                    }
                    else{
                        props.history.push('/add-quotation');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }


const ResetQuotation = () => {
  document.getElementById("AddQuotation").reset();
}

  const onChange = (e) => {
    e.persist();
    setQuotation({...quotation, [e.target.name]: e.target.value});
  }

  const onChangeCustomer = (e) => {
    if(e !== null){
      if (e.value) {
        setQuotation(prevState => ({ ...prevState, customer_id: e.value}));
      } else {
        setQuotation(prevState => ({ ...prevState, customer_id: e}));
      }
    } else {
      setQuotation(prevState => ({ ...prevState, customer_id: e}));
    }
  }

  // handle click event of the Add button
const handleAddClick = (e) => {
  e.preventDefault();
  var get_last_data = inputList[inputList.length - 1]
  var gtotal = parseFloat(quotation.product_info_grand_total) + parseFloat(get_last_data.total);
  setQuotation(prevState => ({...prevState,product_info_grand_total: gtotal.toFixed(2)}))
  setInputList([...inputList,{sample_name: get_last_data.product_name ? get_last_data.product_name.split(/[ -]+/)[0] : '',
  product_name:get_last_data.product_name ? get_last_data.product_name : '',
    test_required: get_last_data.test_required,test_name: get_last_data.test_name,
    method_technique: get_last_data.method_technique, sample_qty:get_last_data.sample_qty,
    first_sample: get_last_data.first_sample,sample_in_row: get_last_data.sample_in_row, sample_preperation: get_last_data.sample_preperation,
      total: get_last_data.total, remark:get_last_data.remark}]);
      var array_len = inputList.length+1;

};

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
  if(e.target.name == "product_name"){
    const list = [...inputList];
    list[index]["product_name"] = e.target.value;
    list[index]["sample_name"] = e.target.value.split(/[ -]+/)[0];
    setInputList(list);
  } else if(e.target.name == "test_name") {
    const list = [...inputList];
    list[index]["test_name"] = e.target.value;
    list[index]["test_required"] = e.target.value.split(/[ -]+/)[0];
    setInputList(list);
  } else {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  }
};

const calAmount = (e,index) => {
var sample_in_raw = inputList[index].sample_in_row !== null ? parseFloat(inputList[index].sample_in_row) : 0.00
var sample_prep = inputList[index].sample_preperation !== null ? parseFloat(inputList[index].sample_preperation) : 0.00
var sample_qty = inputList[index].sample_qty !== null ? parseFloat(inputList[index].sample_qty) : 0.00
var first_sample = inputList[index].first_sample !== null ? parseFloat(inputList[index].first_sample) : 0.00
var amount = sample_in_raw + sample_prep
var gross = amount * sample_qty
var total = gross + first_sample
const list = [...inputList];
list[index]["total"] = total.toFixed(2);
setInputList(list);
var gtotal = 0.00;
inputList.forEach((item, i) => {
  gtotal = parseFloat(gtotal) + parseFloat(item.total);
});
setQuotation(prevState => ({...prevState,product_info_grand_total: gtotal.toFixed(2)}))
}


// handle click event of the Remove button
const handleRemoveClick = (e,index) => {
  e.preventDefault();
  const list = [...inputList];
  const total = list[index].total ? parseFloat(list[index].total) : 0.00
  const grand_total = quotation.product_info_grand_total ? parseFloat(quotation.product_info_grand_total) : ''
  const final_grand_total = grand_total - total
  setQuotation(prevState => ({...prevState,product_info_grand_total: final_grand_total.toFixed(2)}))
  list.splice(index, 1);
  setInputList(list);
};


return(
 <React.Fragment>
      <HorizontalLayout/>

                <div className="page-content">
                    <div className="container-fluid">
                     <Form onSubmit={InsertQuotation} method="POST" id="AddQuotation" name="QuotationData">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">

                                    <div className="page-title">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li className="breadcrumb-item">Sales</li>
                                            <li className="breadcrumb-item"><a href="/quotation">Quotation</a></li>
                                            <li className="breadcrumb-item active">Add Quotation</li>
                                        </ol>
                                    </div>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li><a href="/quotation" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                                            <li><button type="reset" onClick = {ResetQuotation} className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
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
                                                <div className="col-md-3">
                                                    <label className="required-field">Quotation No</label>
                                                    { loading1 ? <LoadingSpinner /> : <input onChange={ onChange } className="form-control" type="text" placeholder="Enter Quotation No" name="quotation_no" value={quotation.quotation_no} readOnly /> }
                                                </div>

                                                <div className="col-md-3">
                                                    <label>Type</label>
                                                    { loading1 ? <LoadingSpinner /> :
                                                       <select className="form-select" onChange={ onChange } name="type">
                                                        {quotation_dropdown.quotation_type.map((option, key) => <option value={option} key={key} >
                                                          {option}</option>)}
                                                        </select>
                                                     }
                                                </div>

                                                <div className="col-md-3">
                                                    <label className="required-field">Customer</label>
                                                     {loading1 ? <center><LoadingSpinner /></center> : <Select onChange={e => onChangeCustomer(e) } options={data} name="customer_id"
                                                       placeholder="Select Customer" isClearable />}
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="required-field">Subject</label>
                                                    <input onChange={ onChange } className="form-control" type="text"  name="subject" placeholder="Enter Subject" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-3 row">
                                        <div className="form-group">
                                            <div className="row">

                                                <div className="col-md-3">
                                                    <label className="required-field">Quotation Date</label>
                                                    <input onChange={ onChange } className="form-control" type="datetime-local" name="quotation_date" />
                                                </div>

                                                 <div className="col-md-3">
                                                    <label className="required-field">Valid Until</label>
                                                    <input onChange={ onChange } className="form-control" type="datetime-local"  name="valid_until" />
                                                </div>

                                                 <div className="col-md-2">
                                                    <label>Status</label>
                                                    { loading1 ? <LoadingSpinner /> :
                                                       <select onChange={ onChange } className="form-select" name="status">
                                                        {quotation_dropdown.quotation_status.map((option, key) => <option value={option} key={key} >
                                                          {option}</option>)}
                                                        </select>
                                                     }
                                                </div>


                                                <div className="col-md-2">
                                                    <label>Kind Attention to</label>
                                                    <input onChange={ onChange } className="form-control" type="text"  name="kind_attention" placeholder="Kind Attention Detail" />
                                                </div>

                                                 <div className="col-md-2">
                                                    <label className="required-field">Turn Around Time</label>
                                                    <input onChange={ onChange } className="form-control" type="text"  name="turn_around_time" placeholder="Enter Turn Around Time" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="mb-3 row">
                                        <div className="form-group">
                                            <div className="row">

                                                <div className="col-md-6">
                                                    <label>Remarks</label>
                                                    <textarea onChange={ onChange } name="quotation_remarks" className="form-control" placeholder="Enter Remarks"></textarea>
                                                </div>



                                                <div className="col-md-2">
                                                    <label className="required-field">Currency Type</label>
                                                    {loading1 ? <LoadingSpinner /> :  <select onChange={ onChange } value={quotation.currency_type} name="currency_type" className="form-select">
                                                      {data1.map((option, key) => <option value={option.id} key={key} >
                                                        {option.symbol+" ("+option.country+")"}</option>)}
                                                    </select> }

                                                </div>


                                                 <div className="col-md-2">
                                                    <label>Grand Total</label>
                                                    { loading1 ? <LoadingSpinner /> :
                                                       <select onChange={ onChange } className="form-select" name="grand_total">
                                                        {quotation_dropdown.quotation_grand_total.map((option, key) => <option value={option.id} key={key} >
                                                          {option.label}</option>)}
                                                        </select>
                                                     }
                                                </div>

                                                <div className="col-md-2">
                                                    <label>Payment Terms</label>
                                                    <input onChange={ onChange } className="form-control" type="text"  name="payment_terms" placeholder="Enter Payment Terms" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                        <h5 className="alert alert-danger"><i className="fa fa-comment">&nbsp;Product Info</i></h5>
                                        {inputList.map((x, i) => (
                                         <React.Fragment key={x}>
                                            <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                <div className="table-responsive">
                                                  <Table className="table mb-0 border text-center" id="quotation_data">
                                                      <thead className="table-light">
                                                            <tr>
                                                                <th rowspan="2">Sample Name</th>
                                                                <th rowspan="2">Test Required</th>
                                                                <th rowspan="2">Method Technique</th>
                                                                <th colspan="4" style={{textAlign: "center"}}>Charges</th>
                                                                <th rowspan="2">Total</th>
                                                                <th rowspan="2">Remarks</th>
                                                                <th rowspan="2"></th>
                                                            </tr>

                                                            <tr>
                                                                <th>Sample Qty</th>
                                                                <th>First Sample</th>
                                                                <th>Sample in Raw</th>
                                                                <th>Sample Preperation</th>
                                                            </tr>

                                                          </thead>
                                                          <tbody>
                                                            <tr>
                                                                <td>
                                                                 <input class="form-control" value={x.product_name} name="product_name" list="sample_name" id="product_list"  placeholder="Type to search..." onChange={e => handleInputChange(e, i)}/>
                                                                    <datalist id="sample_name">
                                                                    {data2.map((option, key) => <option value={option.id+" - "+option.product_name}>
                                                                      </option>)}
                                                                    </datalist>
                                                                </td>
                                                                <td>
                                                                <input class="form-control" value={x.test_name} name="test_name" list="test_required" id="test_list"  placeholder="Type to search..." onChange={e => handleInputChange(e, i)}/>
                                                                   <datalist id="test_required">
                                                                   {data3.map((option, key) => <option value={option.id+" - "+option.procedure_name}>
                                                                     </option>)}
                                                                   </datalist>
                                                                {/*<input className="form-control" type="text" id="test_required" name="test_required" value={x.test_required} onChange={e => handleInputChange(e, i)}/>*/}
                                                                {/*<ReactHTMLDatalist
                                                                   name="test_required"
                                                                   onChange={e => handleInputChange(e, i)}
                                                                   classNames={"classone classtwo form-control"}
                                                                   options={data3}
                                                                   placeholder="Type to search..."
                                                                 />*/}
                                                                {/*<select value={x.test_required} onChange={e => handleInputChange(e, i)} name="test_required" className="form-select">
                                                                  <option value="">None</option>
                                                                  {data3.map((option, key) => <option value={option.id} key={key}>
                                                                    {option.procedure_name}</option>)}
                                                                </select>*/}
                                                                </td>
                                                                <td>
                                                                <input className="form-control" type="text" id="method_technique" name="method_technique" value={x.method_technique} onChange={e => handleInputChange(e, i)}/>
                                                                {/*<select value={x.method_technique} onChange={e => handleInputChange(e, i)} name="method_technique" className="form-select">
                                                                  <option value="">None</option>
                                                                  {data4.map((option, key) => <option value={option.id} key={key}>
                                                                    {option.method_name}</option>)}
                                                                </select>*/}
                                                                </td>
                                                                <td><input className="form-control" type="text" id="sample_qty" name="sample_qty" value={x.sample_qty} onKeyUp={e => calAmount(e,i)} onChange={e => handleInputChange(e, i)}/></td>
                                                                <td><input className="form-control" type="text" id="first_sample" name="first_sample" value={x.first_sample} onKeyUp={e => calAmount(e,i)} onChange={e => handleInputChange(e, i)}/></td>
                                                                <td><input className="form-control" type="text" id="sample_raw" name="sample_in_row" value={x.sample_in_row}  onKeyUp={e => calAmount(e,i)} onChange={e => handleInputChange(e, i)}/></td>
                                                                <td><input className="form-control" type="text" id="sample_prepration" name="sample_preperation" value={x.sample_preperation} onKeyUp={e => calAmount(e,i)} onChange={e => handleInputChange(e, i)}/></td>
                                                                <td><input className="form-control" type="text" name="total" value={x.total} onChange={e => handleInputChange(e, i)} readOnly/></td>
                                                                <td><input className="form-control" type="text" name="remark" value={x.remark} onChange={e => handleInputChange(e, i)}/></td>
                                                                <td>{inputList.length > 1 ? <button
                                                                                  className="mr10"
                                                                                  onClick={e => handleRemoveClick(e,i)} className="btn btn-danger"><i class="fa fa-trash"></i></button> : ''}</td>
                                                            </tr>
                                                          </tbody>
                                                        </Table>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        </React.Fragment>
                                        ))}
                                        <div className="mb-3 row">
                                          <div className="form-group">
                                            <div className="row">
                                              <div className="table-responsive">
                                                <Table className="table mb-0 border text-center">
                                                  <tbody>
                                                    <tr>
                                                       <td style={{width:'1260px'}}></td>
                                                       <th>Total</th>
                                                       <td><input className="form-control" type="text" name="product_info_grand_total" value={quotation.product_info_grand_total} onChange={onChange} onKeyUp={e => calAmount(e,'')} readOnly/></td>
                                                       <td></td>
                                                    </tr>
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
                     </Form>
                    </div>
                </div>
    </React.Fragment>
  )
}

export default AddQuotation
