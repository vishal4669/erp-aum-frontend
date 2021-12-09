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
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { MDBTable, MDBTableBody} from 'mdbreact';
import viewOnly from "../../../assets/images/Viewonly.png"
import moment from 'moment'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import $ from 'jquery'
import letterHeadImg from "../../../assets/images/letterhead.png"

function RoaView(props) {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
  const url = window.location.href
  const split_url = url.split( '/' )
  const booking_id = base64_decode(split_url[4])
  const edit_booking_id = split_url[4]
  const coa_action = split_url[5]
  const letterhead = split_url[6]

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [booking1, setBooking1] = useState({})
  const [testData, setTestData] = useState([{test_parameter:'',result:'',product_details:'',max_limit:''}])


  useEffect(() => {
    let url = ''
    {setLoading1(true)}
    if(coa_action == "PDF" || coa_action == "VIEW"){
      url = `${process.env.REACT_APP_BASE_APIURL}RoaCoaShow/`+ booking_id
    }
    else {
      url = `${process.env.REACT_APP_BASE_APIURL}RoaCoaPrint/`+ booking_id + "/ROA_PRINT_1"
    }
    axios.get(url,{ headers })
    .then(response => {
     if(response.data.success == true) {
      setBooking1({
        customer_name:response.data.data[0].customer_data.company_name,
        certificate_no:response.data.data[0].certificate_no,
        aum_serial_no:response.data.data[0].aum_serial_no,
        report_type:response.data.data[0].report_type,
        sample_received_date:response.data.data[0].sample_received_date,
        name_of_sample:response.data.data[0].sample_data[0].product_data.name_of_sample,
        generic_name:response.data.data[0].sample_data[0].product_data.generic_product_data.generic_name,
        product_generic:response.data.data[0].sample_data[0].product_data.product_generic,
        party_mfg_licence_no:response.data.data[0].party_mfg_licence_no,
        lot_batch_no:response.data.data[0].sample_data[0].lot_batch_no,
        client_ref_no:response.data.data[0].client_ref_no,
        batch_size_qty_rec:response.data.data[0].sample_data[0].batch_size_qty_rec,
        sample_qty_rec:response.data.data[0].sample_data[0].sample_qty_rec,
        original_manufacturer:response.data.data[0].original_manufacturer.company_name,
        date_of_manufacturing:response.data.data[0].date_of_manufacturing,
        supplier:response.data.data[0].supplier.company_name,
        date_of_expiry:response.data.data[0].date_of_expiry,
        pharmacopeia_name: response.data.data[0].sample_data[0].product_data.pharmacopiea_data.pharmacopeia_name,
      })
      setTestData(response.data.data[0].tests_data)
      } else {
        toastr.error(response.data.message)
        props.history.push('/generate-roa/' + edit_booking_id);
        return false
      }
     {setLoading1(false)}
      if(coa_action === "PRINT"){
            var div = document.getElementById("pdfDiv").innerHTML;
            var restorepage = $('body').html();
            var printcontent = $(div).clone();
            $('body').empty().html(printcontent);
            window.print();
            window.close();
            alert("Print is Successfully Generated for ROA Print 1")
      }
    })
    .catch((error) => {
      if(error.response.data.message == "Token is Expired" || error.response.data.status == "401"){
        props.history.push('/');
      } else {
        toastr.error(error.response.data.message);
      }
      {setLoading1(false)}
    })
    document.addEventListener('contextmenu', (e) => {
     e.preventDefault();
   });
  }, []);

  return (

    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>

          {loading1 ? <center><LoadingSpinner /></center> :
            <Row style={{width:'60%'}}>
              <Col className="pdfDiv" id="pdfDiv" style={{fontFamily:'Times New Roman'}}>
                  {/*if viewonly than need to show viewonly image*/}
                    {coa_action == 'VIEW' ? <img src={viewOnly} id="watermark" style={{width:'100%',opacity:'0.4'}}/> : ''}

                    <MDBTable style={{color:'black',fontSize:'16px'}} small responsive>
                      <MDBTableBody>
                          {letterhead == 'Yes' ?<tr>
                            <th colspan="4">
                              <img src={letterHeadImg} style={{float:'right',width:'20%',marginBottom:'20px'}}/>
                            </th>
                          </tr> : ''}
                          <tr>
                            <th colspan="4" className="text-center"><h1 style={{fontSize:'20px',textTransform:'uppercase',color:'black',fontWeight:'bolder'}}>Aum Research Labs Private Limited</h1><hr style={{border: '1px solid #000000',opacity:'unset'}}/></th>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">COA Number</td>
                            <td colspan="1">{booking1.certificate_no}</td>
                            <td colspan="1">Date of Receive</td>
                            <td colspan="1">{booking1.sample_received_date ? moment(booking1.sample_received_date).format('DD-MM-YYYY hh:mm:ss a'): 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Name of Party</td>
                            <td colspan="1">{booking1.customer_name}</td>
                            <td colspan="1">Generic Name</td>
                            <td colspan="1">{booking1.generic_name ? booking1.generic_name : 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Name of Sample</td>
                            <td colspan="1">{booking1.name_of_sample}</td>
                            <td colspan="1">Sample Qty</td>
                            <td colspan="1">{booking1.sample_qty_rec ? booking1.sample_qty_rec : 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Lot/Batch No</td>
                            <td colspan="1">{booking1.lot_batch_no ? booking1.lot_batch_no : 'Not Specified'}</td>
                            <td colspan="1">Batch Size/Required Qty</td>
                            <td colspan="1">{booking1.batch_size_qty_rec ? booking1.batch_size_qty_rec : 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Party Ref No</td>
                            <td colspan="1">{booking1.client_ref_no ? booking1.client_ref_no : 'Not Specified'}</td>
                            <td colspan="1">Mfg Date</td>
                            <td colspan="1">{booking1.date_of_manufacturing ? moment(booking1.date_of_manufacturing).format('DD-MM-YYYY') : 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Mfg. Lic. No</td>
                            <td colspan="1">{booking1.party_mfg_licence_no ? booking1.party_mfg_licence_no : 'Not Specified'}</td>
                            <td colspan="1">Exp Date</td>
                            <td colspan="1">{booking1.date_of_expiry ? moment(booking1.date_of_expiry).format('DD-MM-YYYY') : 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Original Mfg</td>
                            <td colspan="1">{booking1.original_manufacturer ? booking1.original_manufacturer : 'Not Specified'}</td>

                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Supplier Name</td>
                            <td colspan="1">{booking1.supplier ? booking1.supplier : 'Not Specified'}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Sample Formation</td>
                            <td colspan="1">{booking1.report_type}</td>
                            <td colspan="1">Method</td>
                            <td colspan="1">{booking1.pharmacopeia_name}</td>
                          </tr>
                          <tr style={{lineHeight:'12px'}}>
                            <td colspan="1">Aum Sr. No.</td>
                            <td colspan="1">{booking1.aum_serial_no}</td>
                            <td colspan="1">(Allocated Section)</td>
                            <td colspan="1">CHEM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INST MIC</td>
                          </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <MDBTable small responsive style={{color:'black',fontSize:'16px'}}>
                      <MDBTableBody>
                        <tr>
                        <th colspan="3"><h1 style={{fontSize:'20px',color:'black',fontWeight:'bolder'}}>TEST PARAMETERS</h1><hr style={{border: '1px solid #000000',opacity:'unset'}}/></th>
                        </tr>
                          {testData.length ?
                            testData.map((x, i) => (
                              <tr>
                                {x.test_parameter !== '' ? <td><b>{x.test_parameter}</b> : {x.product_details}{x.product_details && x.max_limit ? "," : ''}{x.max_limit}<br/><br/><br/><br/><br/></td> : ''}
                              </tr>
                           )) : <tr class="text-center"><td colspan="4">No Data Available</td></tr>}
                      </MDBTableBody>
                    </MDBTable>
                    <br/><br/><br/>
                    <h6 style={{fontSize:'16px',color:'black'}}><span>Analysis By:</span><span style={{float:'right'}}>Checked By:</span></h6>
              </Col>
            </Row>
          }
        </Container>
      </div>
    </React.Fragment>

  )
}

export default RoaView
