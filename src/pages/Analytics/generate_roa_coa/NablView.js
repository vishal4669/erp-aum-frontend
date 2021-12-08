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
import { MDBTable, MDBTableBody } from 'mdbreact';
import viewOnly from "../../../assets/images/Viewonly.png"
import letterHeadImg from "../../../assets/images/letterhead.png"
import moment from 'moment'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import $ from 'jquery'
function NablView(props) {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
  const url = window.location.href
  const split_url = url.split('/')
  const booking_id = base64_decode(split_url[4])
  const edit_booking_id = split_url[4]
  const coa_action = split_url[5]
  const letterhead = split_url[6]
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [booking1, setBooking1] = useState({})
  const [testData, setTestData] = useState([{
    p_sr_no: '', test_parameter: '', result: '', product_details: '', max_limit: '',
    parent_name: '', parent_child: ''
  }])
  var pdf_style = {width: '60%'}
  /*if(coa_action == 'PDF'){
    pdf_style = {
      width: '80%'
  }
}*/
  useEffect(() => {
    let url = ''
    { setLoading1(true) }
    if (coa_action == "PDF" || coa_action == "VIEW") {
      url = `${process.env.REACT_APP_BASE_APIURL}RoaCoaShow/` + booking_id
    }
    else {
      url = `${process.env.REACT_APP_BASE_APIURL}RoaCoaPrint/` + booking_id + "/NABL_PRINT"
    }
    axios.get(url, { headers })
      .then(response => {
        if (response.data.success == true) {
          setBooking1({
            customer_name: response.data.data[0].customer_data.company_name,
            certificate_no: response.data.data[0].certificate_no,
            receipte_date: response.data.data[0].receipte_date,
            booking_group: response.data.data[0].booking_group,
            report_issue_date: response.data.data[0].report_issue_date,
            name_of_sample: response.data.data[0].sample_data[0].product_data.name_of_sample,
            generic_name: response.data.data[0].sample_data[0].product_data.generic_product_data.generic_name,
            product_generic: response.data.data[0].sample_data[0].product_data.product_generic,
            party_mfg_licence_no: response.data.data[0].party_mfg_licence_no,
            lot_batch_no: response.data.data[0].sample_data[0].lot_batch_no,
            client_ref_no: response.data.data[0].client_ref_no,
            batch_size_qty_rec: response.data.data[0].sample_data[0].batch_size_qty_rec,
            sample_qty_rec: response.data.data[0].sample_data[0].sample_qty_rec,
            original_manufacturer: response.data.data[0].original_manufacturer.company_name,
            date_of_manufacturing: response.data.data[0].date_of_manufacturing,
            supplier: response.data.data[0].supplier.company_name,
            date_of_expiry: response.data.data[0].date_of_expiry,
            condition_of_sample: response.data.data[0].sample_data[0].condition_of_sample,
            pharmacopeia_name: response.data.data[0].sample_data[0].product_data.pharmacopiea_data.pharmacopeia_name,
            street1: response.data.data[0].customer_data.customer_contact_data.street_1,
            street2: response.data.data[0].customer_data.customer_contact_data.street_2,
            area: response.data.data[0].customer_data.customer_contact_data.area,
            pin: response.data.data[0].customer_data.customer_contact_data.pin,
            city: response.data.data[0].customer_data.customer_contact_data.city,
            state: response.data.data[0].customer_data.customer_contact_data.state.state_name,
            country: response.data.data[0].customer_data.customer_contact_data.country.country_name,
            statement_ofconformity: response.data.data[0].statement_ofconformity,
            test_date_time: response.data.data[0].latest_test_date_time.test_date_time
          })
          setTestData(response.data.data[0].tests_data)
        } else {
          toastr.error(response.data.message)
          props.history.push('/generate-coa/' + edit_booking_id);
          return false
        }
        { setLoading1(false) }
        if (coa_action === "PDF") {
          var HTML_Width = $(".pdfDiv").width();
          var HTML_Height = $(".pdfDiv").height();
          var top_left_margin = 15;
          var PDF_Width = HTML_Width + (top_left_margin * 2);
          var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
          var canvas_image_width = HTML_Width;
          var canvas_image_height = HTML_Height;
          var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
          html2canvas($(".pdfDiv")[0],{allowTaint:true}).then(function(canvas) {
            canvas.getContext('2d');
            var imgData = canvas.toDataURL("image/jpeg", 8.0);
            var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
              pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
            for (var i = 1; i <= totalPDFPages; i++) {
              pdf.addPage(PDF_Width, PDF_Height);
              pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
            }
            pdf.save("nabl_print_" + response.data.data[0].certificate_no + ".pdf");
            toastr.info("Pdf is Generated Successfully For NABL Print")
            props.history.push('/generate-coa/' + edit_booking_id);
          });
        }
        if (coa_action === "PRINT") {
          var div = document.getElementById("pdfDiv").innerHTML;
          var restorepage = $('body').html();
          var printcontent = $(div).clone();
          $('body').empty().html(printcontent);
          window.print();
          window.close();
          alert("Print is Successfully Generated for NABL Print")
        }
      })
      .catch((error) => {
        if (error.response.data.message == "Token is Expired" || error.response.data.status == "401") {
          props.history.push('/');
        } else {
          toastr.error(error.response.data.message);
        }
        { setLoading1(false) }
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
            <Row style={ pdf_style }>
              <Col className="pdfDiv" id="pdfDiv" style={{ fontFamily: 'Times New Roman' }}>
                {/*if viewonly than need to show viewonly image*/}
                {coa_action == 'VIEW' ? <img src={viewOnly} id="watermark" style={{ width: '100%', opacity: '0.4' }} /> : ''}
                {letterhead == 'Yes' ? <img src={letterHeadImg} style={{ float: 'right', width: '20%', marginBottom: '20px' }} /> : ''}
                <table style={{ color: 'black', width: '100%' }}>
                  <tbody>
                    <tr>
                      <td><center><h1 style={{ color: 'black', fontSize: '28px', fontWeight: 'bolder' }}>TEST REPORT</h1></center><hr style={{ border: '1px solid #000000', opacity: 'unset' }} /></td>
                    </tr>
                  </tbody>
                </table>
                <MDBTable style={{ border: '1px solid grey', color: 'black' }} small>
                  <MDBTableBody>
                    <tr>
                      <td style={{ width: '400px' }}><b>Name and Contact Information of the Customer</b></td>
                      <td colspan="2" style={{ borderLeft: '1px solid grey' }}><b>Certificate No/Unique ID</b></td>
                      <td colspan="2" style={{ borderLeft: '1px solid grey' }}><b>{booking1.certificate_no}</b></td>
                    </tr>
                    <tr>
                      <td style={{ borderTopColor: '#f5f6f8' }}><b>{booking1.customer_name}</b></td>
                      <td colspan="2" style={{ borderLeft: '1px solid grey' }}><b>Date of the receipt of the test</b></td>
                      <td colspan="2" style={{ borderLeft: '1px solid grey' }}><b>{booking1.receipte_date ? moment(booking1.receipte_date).format('DD-MM-YYYY') : 'Not Specified'}</b></td>
                    </tr>
                    <tr>
                      <td style={{ borderTopColor: '#f5f6f8' }}><b>{booking1.street1},{booking1.street2}</b></td>
                      <th colspan="2" style={{ borderLeft: '1px solid grey' }}>Date of performance of the test</th>
                      <td colspan="2" style={{ borderLeft: '1px solid grey' }}><b>{booking1.test_date_time ? moment(booking1.test_date_time).format('DD-MM-YYYY hh:mm:ss a') : 'Not Specified'}</b></td>
                    </tr>
                    <tr>
                      <td style={{ borderTopColor: '#f5f6f8' }}><b>{booking1.area ? booking1.area : ''}{booking1.area && booking1.pin ? ',' : ''}{booking1.pin ? booking1.pin : ''}
                        {booking1.pin && booking1.city ? ',' : ''}{booking1.city}{booking1.city && booking1.state ? ',' : ''}
                        {booking1.state}{booking1.state && booking1.country ? ',' : ''}
                        {booking1.country ? ',' : ''}{booking1.country}</b></td>
                      <th colspan="2" style={{ borderLeft: '1px solid grey' }}>Report Issue Date</th>
                      <th colspan="2" style={{ borderLeft: '1px solid grey' }}>{booking1.report_issue_date ? moment(booking1.report_issue_date).format('DD-MM-YYYY') : 'Not Specified'}</th>
                    </tr>
                    <tr>
                      <td><b>Descipline Of Chemical</b></td>
                      <th colspan="2" style={{ borderLeft: '1px solid grey' }}>Group</th>
                      <th colspan="2" style={{ borderLeft: '1px solid grey' }}>{booking1.booking_group}</th>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <MDBTable bordered style={{ border: '1px solid grey', color: 'black' }} small>
                  <MDBTableBody>
                    <tr>
                      <th style={{ width: '145px' }}>Name of Sample</th>
                      <th colspan="2">{booking1.name_of_sample}</th>
                      <th style={{ width: '145px' }}>Generic Name</th>
                      <th colspan="2">{booking1.generic_name ? booking1.generic_name : 'Not Specified'}</th>
                    </tr>
                    <tr>
                      <td style={{ width: '145px' }}>Details Of Product</td>
                      <td colspan="2">{booking1.product_generic ? booking1.product_generic : 'Not Specified'}</td>
                      <td style={{ width: '145px' }}>Party Mfg. Licence No</td>
                      <td colspan="2">{booking1.party_mfg_licence_no ? booking1.party_mfg_licence_no : 'Not Specified'}</td>
                    </tr>
                    <tr>
                      <td style={{ width: '145px' }}>Lot/Batch No</td>
                      <td colspan="2">{booking1.lot_batch_no ? booking1.lot_batch_no : 'Not Specified'}</td>
                      <td style={{ width: '145px' }}>Client Ref No</td>
                      <td colspan="2">{booking1.client_ref_no ? booking1.client_ref_no : 'Not Specified'}</td>
                    </tr>
                    <tr>
                      <td style={{ width: '145px' }}>Batch Size/Qty Received</td>
                      <td colspan="2">{booking1.batch_size_qty_rec ? booking1.batch_size_qty_rec : 'Not Specified'}</td>
                      <td style={{ width: '145px' }}>Sample Qty Received</td>
                      <td colspan="2">{booking1.sample_qty_rec ? booking1.sample_qty_rec : 'Not Specified'}</td>
                    </tr>
                    <tr>
                      <td style={{ width: '145px' }}>Original Manufacturer</td>
                      <td colspan="2">{booking1.original_manufacturer ? booking1.original_manufacturer : 'Not Specified'}</td>
                      <td style={{ width: '145px' }}>Date of Manufacturing</td>
                      <td colspan="2">{booking1.date_of_manufacturing ? moment(booking1.date_of_manufacturing).format('DD-MM-YYYY') : 'Not Specified'}</td>
                    </tr>
                    <tr>
                      <td style={{ width: '145px' }}>Supplier</td>
                      <td colspan="2">{booking1.supplier ? booking1.supplier : 'Not Specified'}</td>
                      <td style={{ width: '145px' }}>Date of Expiry</td>
                      <td colspan="2">{booking1.date_of_expiry ? moment(booking1.date_of_expiry).format('DD-MM-YYYY') : 'Not Specified'}</td>
                    </tr>
                    <tr>
                      <td style={{ width: '145px' }}>Condition of Sample</td>
                      <td colspan="5">{booking1.condition_of_sample ? booking1.condition_of_sample : 'Not Specified'}</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'black' }}>Analysis Result</h3>
                <MDBTable bordered style={{ border: '1px solid grey', color: 'black' }} small>
                  <MDBTableBody>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Test Parameter</th>
                      <th>Label Claims</th>
                      <th style={{ width: '100px' }}>Result</th>
                      <th colspan="2">Specification {booking1.pharmacopeia_name}</th>
                      <th>Method Used</th>
                    </tr>
                    {testData.length ?
                      testData.map((x, i) => (
                        <tr className="text-center">
                          <td>{i + 1}</td>
                          <td>{x.test_parameter}</td>
                          <td>{x.label_claim}</td>
                          <td>{x.result}</td>
                          <td colspan="2">{x.product_details}{x.product_details && x.max_limit ? <br /> : ''}{x.max_limit}{x.parent_child == 'Parent' && x.parent_data.parent_name !== '' ? ' (' + x.parent_data.parent_name + ")" : ''}</td>
                          <td>{x.method_used}</td>
                        </tr>
                      )) : <tr class="text-center"><td colspan="6">No Data Available</td></tr>}
                  </MDBTableBody>
                </MDBTable>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'black' }}>Party Asked For Above Test Only</h3>
                <br /><h3 style={{ fontSize: '14px', fontWeight: '600', color: 'black' }}>Statment of Conformity : {booking1.statement_ofconformity}</h3>
                <hr style={{ border: '1px double black', opacity: 'unset' }} />
                <h6 style={{ color: 'black', fontWeight: 'bold' }}>In the Opinion of the undersigned the sample reffered to above is of standard Quality as definded in {booking1.pharmacopeia_name} & Act or the rules<br /> made there under.</h6>
                <br />
                <p style={{ height: '30px' }}></p>
                <h6 style={{ float: 'right', fontSize: '15px', color: 'black', fontWeight: 'bold' }}>Authorized Sign:</h6>
                <br /><h6 style={{ fontSize: '15px', color: 'black', fontWeight: 'bold' }}>Disclamer :</h6>
                <p style={{ fontSize: '13px', color: 'black' }}>
                  (a) Result related only to the received item only
                </p>
                <p style={{ fontSize: '13px', color: 'black' }}>
                  (b) The Sample(s) to which the findings recorded herein (the finding) relate to information and sample provided by the client or by a third party acting at the client's direction and that
                  time environment. The finding constitute no warranty of the sample's representativeness of any goods and strictly relate to the sample(s).
                  The company accepts no liability with regard the origin or source from which the sample(s) is are extracted.
                </p>
                <p style={{ fontSize: '13px', color: 'black' }}>
                  (c) Unless otherwise stated the result shown in this test report refer only to the sample(s) tested and such sample(s) are remained for 7 days in case of perishable
                  all other samples. The samples from regulatory bodies are to be retained as specified
                </p>
                <p style={{ fontSize: '13px', color: 'black' }}>
                  (d) The report shall not be reproduced except in full without approval of the laboratory can provide assurance that parts of a report are not taken out of context.
                </p>
                <p style={{ fontSize: '13px', color: 'black' }}>
                  (e) In case of any dispute judicially matter will be subject to kalol jurisdiction only.
                </p>
              </Col>
            </Row>
          }
        </Container>
      </div>
    </React.Fragment>
  )
}
export default NablView
