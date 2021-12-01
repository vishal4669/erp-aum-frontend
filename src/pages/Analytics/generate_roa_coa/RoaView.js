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
    {setLoading1(true)}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}RoaCoaShow/`+ booking_id,{ headers })
    .then(response => {
      setBooking1({
        customer_name:response.data.data[0].customer_data.company_name,
        certificate_no:response.data.data[0].certificate_no,
        aum_serial_no:response.data.data[0].aum_serial_no,
        report_type:response.data.data[0].report_type,
        coa_release_date:response.data.data[0].coa_release_date,
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
      {setLoading1(false)}
      if(coa_action === "PDF"){
        var HTML_Width = $(".pdfDiv").width();
            var HTML_Height = $(".pdfDiv").height();
            var top_left_margin = 15;
            var PDF_Width = HTML_Width+(top_left_margin*2);
            var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
            var canvas_image_width = HTML_Width;
            var canvas_image_height = HTML_Height;

            var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


            html2canvas($(".pdfDiv")[0],{allowTaint:true}).then(function(canvas) {
              canvas.getContext('2d');
              var imgData = canvas.toDataURL("image/jpeg", 1.0);
              var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
                pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


              for (var i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
              }

                pdf.save("roa_print_"+response.data.data[0].certificate_no+".pdf");
                toastr.info("Pdf is Generated Successfully For ROA Print")
                props.history.push('/generate-roa/'+edit_booking_id);
            });
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
            <Row>
              <Col>
                <Card>
                  <CardBody className="pdfDiv">
                  {/*if viewonly than need to show viewonly image*/}
                    {coa_action == 'VIEW' ? <img src={viewOnly} id="watermark" style={{width:'100%',opacity:'0.4'}}/> : ''}

                    <MDBTable bordered style={{border:'2px solid #000000',fontSize:'20px'}} small responsive>
                      <MDBTableBody>
                          <tr>
                            <th colspan="4" className="text-center" style={{fontSize:'18px',textTransform:'uppercase'}}>Aum Research Labs Private Limited</th>
                          </tr>
                          <tr>
                            <th colspan="1">COA Number</th>
                            <td colspan="1">{booking1.certificate_no}</td>
                            <th colspan="1">Date of Receive</th>
                            <td colspan="1">{booking1.sample_received_date ? moment(booking1.sample_received_date).format('DD-MM-YYYY hh:mm:ss a'): 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Name of Party</th>
                            <td colspan="1">{booking1.customer_name}</td>
                            <th colspan="1">Generic Name</th>
                            <td colspan="1">{booking1.generic_name ? booking1.generic_name : 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Name of Sample</th>
                            <td colspan="1">{booking1.name_of_sample}</td>
                            <th colspan="1">Sample Qty</th>
                            <td colspan="1">{booking1.sample_qty_rec ? booking1.sample_qty_rec : 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Lot/Batch No</th>
                            <td colspan="1">{booking1.lot_batch_no ? booking1.lot_batch_no : 'Not Specified'}</td>
                            <th colspan="1">Batch Size/Required Qty</th>
                            <td colspan="1">{booking1.batch_size_qty_rec ? booking1.batch_size_qty_rec : 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Party Ref No</th>
                            <td colspan="1">{booking1.client_ref_no ? booking1.client_ref_no : 'Not Specified'}</td>
                            <th colspan="1">Mfg Date</th>
                            <td colspan="1">{booking1.date_of_manufacturing ? moment(booking1.date_of_manufacturing).format('DD-MM-YYYY') : 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Mfg. Lic. No</th>
                            <td colspan="1">{booking1.party_mfg_licence_no ? booking1.party_mfg_licence_no : 'Not Specified'}</td>
                            <th colspan="1">Exp Date</th>
                            <td colspan="1">{booking1.date_of_expiry ? moment(booking1.date_of_expiry).format('DD-MM-YYYY') : 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Original Manufacturer</th>
                            <td colspan="1">{booking1.original_manufacturer ? booking1.original_manufacturer : 'Not Specified'}</td>
                            <th colspan="1">Supplier Name</th>
                            <td colspan="1">{booking1.supplier ? booking1.supplier : 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Sample Formation</th>
                            <td colspan="1">{booking1.report_type}</td>
                            <th colspan="1">Aum Sr. No.</th>
                            <td colspan="1">{booking1.aum_serial_no}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Method</th>
                            <td colspan="1">{booking1.pharmacopeia_name}</td>
                            <th colspan="1">(Allocated Section)</th>
                            <td colspan="1">CHEM INST MIC</td>
                          </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <MDBTable small responsive>
                      <MDBTableBody>
                        <tr>
                        <th colspan="3" style={{fontSize:'18px'}}><u>TEST PARAMETERS</u></th>
                        </tr>
                          {testData.length ?
                            testData.map((x, i) => (
                              <tr>
                                <td><b>{i+1}.&nbsp;{x.test_parameter}</b> : {x.product_details}{x.product_details && x.max_limit ? "," : ''}{x.max_limit}</td>
                              </tr>
                           )) : <tr class="text-center"><td colspan="4">No Data Available</td></tr>}
                      </MDBTableBody>
                    </MDBTable>
                    <br/><br/><br/>
                    <h6 style={{fontSize:'15px'}}><span>Analysis By</span><span style={{float:'right'}}>Checked By</span></h6>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          }
        </Container>
      </div>
    </React.Fragment>

  )
}

export default RoaView
