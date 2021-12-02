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

function NablView(props) {
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
  const [testData, setTestData] = useState([{test_parameter:'',result:'',product_details:'',max_limit:'',label_claim:'',method_used:''}])


  useEffect(() => {
    {setLoading1(true)}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}RoaCoaShow/`+ booking_id,{ headers })
    .then(response => {
      setBooking1({
        customer_name:response.data.data[0].customer_data.company_name,
        certificate_no:response.data.data[0].certificate_no,
        receipte_date:response.data.data[0].receipte_date,
        report_issue_date:response.data.data[0].report_issue_date,
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
        condition_of_sample:response.data.data[0].sample_data[0].condition_of_sample,
        pharmacopeia_name: response.data.data[0].sample_data[0].product_data.pharmacopiea_data.pharmacopeia_name,
        street1 : response.data.data[0].customer_data.customer_contact_data.street_1,
        street2:response.data.data[0].customer_data.customer_contact_data.street_2,
        area:response.data.data[0].customer_data.customer_contact_data.area,
        pin:response.data.data[0].customer_data.customer_contact_data.pin,
        city:response.data.data[0].customer_data.customer_contact_data.city,
        state:response.data.data[0].customer_data.customer_contact_data.state.state_name,
        country:response.data.data[0].customer_data.customer_contact_data.country.country_name,
        statement_ofconformity:response.data.data[0].statement_ofconformity
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

        		    pdf.save("nabl_print_"+response.data.data[0].certificate_no+".pdf");
                toastr.info("Pdf is Generated Successfully For NABL Print")
                props.history.push('/generate-coa/'+edit_booking_id);
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

                    <MDBTable bordered style={{border:'1px solid #000000',fontWeight:'500'}} small responsive>
                      <MDBTableBody>
                          <tr>
                            <th colspan="4" className="text-center" style={{fontSize:'18px'}}>TEST REPORT</th>
                          </tr>
                          <tr>
                            <th>
                              <u><h5>{booking1.customer_name}</h5></u>

                            </th>
                            <th colspan="1">Certificate No/Unique ID</th>
                            <td colspan="1">{booking1.certificate_no}</td>
                          </tr>
                          <tr>
                            <td>Street 1 : {booking1.street1}</td>
                            <th colspan="1">Date of the receipt of the test</th>
                            <td colspan="1">{booking1.receipte_date ? moment(booking1.receipte_date).format('DD-MM-YYYY'): 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <td>Street 2 : {booking1.street2}</td>
                            <th colspan="1">Date of performance of the test</th>
                            <td colspan="1">--</td>
                          </tr>
                          <tr>
                            <td>{booking1.area ? booking1.area : ''}{booking1.area && booking1.pin ? ',' : ''}{booking1.pin ? booking1.pin : ''}
                            {booking1.pin && booking1.city ? ',' : ''}{booking1.city}{booking1.city && booking1.state ? ',' : ''}
                            {booking1.state}{booking1.state && booking1.country ? ',' : ''}
                            {booking1.country ? ',' : ''}{booking1.country}</td>
                            <th colspan="1">Report Issue Date</th>
                            <td colspan="1">{booking1.report_issue_date ? moment(booking1.report_issue_date).format('DD-MM-YYYY'): 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <th colspan="1">Descipline Of Chemical</th>
                            <th colspan="3">Group</th>
                          </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <MDBTable bordered style={{border:'1px solid #000000'}} small responsive>
                      <MDBTableBody>
                        <tr>
                          <th colspan="2">Name of Sample</th>
                          <th colspan="2">{booking1.name_of_sample}</th>
                          <th colspan="1">Generic Name</th>
                          <th colspan="1">{booking1.generic_name ? booking1.generic_name : 'Not Specified'}</th>
                        </tr>
                        <tr>
                          <td colspan="2">Details Of Product</td>
                          <td colspan="2">{booking1.product_generic ? booking1.product_generic : 'Not Specified'}</td>
                          <td colspan="1">Party Mfg. Licence No</td>
                          <td colspan="1">{booking1.party_mfg_licence_no ? booking1.party_mfg_licence_no : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td colspan="2">Lot/Batch No</td>
                          <td colspan="2">{booking1.lot_batch_no ? booking1.lot_batch_no : 'Not Specified'}</td>
                          <td colspan="1">Client Ref No</td>
                          <td colspan="1">{booking1.client_ref_no ? booking1.client_ref_no : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td colspan="2">Batch Size/Qty Received</td>
                          <td colspan="2">{booking1.batch_size_qty_rec ? booking1.batch_size_qty_rec : 'Not Specified'}</td>
                          <td colspan="1">Sample Qty Received</td>
                          <td colspan="1">{booking1.sample_qty_rec ? booking1.sample_qty_rec : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td colspan="2">Original Manufacturer</td>
                          <td colspan="2">{booking1.original_manufacturer ? booking1.original_manufacturer : 'Not Specified'}</td>
                          <td colspan="1">Date of Manufacturing</td>
                          <td colspan="1">{booking1.date_of_manufacturing ? moment(booking1.date_of_manufacturing).format('DD-MM-YYYY') : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td colspan="2">Supplier</td>
                          <td colspan="2">{booking1.supplier ? booking1.supplier : 'Not Specified'}</td>
                          <td colspan="1">Date of Expiry</td>
                          <td colspan="1">{booking1.date_of_expiry ? moment(booking1.date_of_expiry).format('DD-MM-YYYY') : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td>Condition of Sample</td>
                          <td colspan="5">{booking1.condition_of_sample ? booking1.condition_of_sample : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <th colspan="6" className="text-center" style={{fontSize:'18px'}}>Analysis Result</th>
                        </tr>
                            <tr className="text-center">
                              <th>No</th>
                              <th>Test Parameter</th>
                              <th>Label Claims</th>
                              <th>Result</th>
                              <th>Specification {booking1.pharmacopeia_name}</th>
                              <th>Method Used</th>
                            </tr>

                          {testData.length ?
                            testData.map((x, i) => (
                              <tr className="text-center">
                                <td>{i+1}</td>
                                <td>{x.test_parameter}</td>
                                <td>{x.label_claim}</td>
                                <td>{x.result}</td>
                                <td style={{width:'350px'}}>{x.product_details}{x.product_details && x.max_limit ? <br/> : ''}{x.max_limit}</td>
                                <td>{x.method_used}</td>
                              </tr>
                           )) : <tr class="text-center"><td colspan="6">No Data Available</td></tr>}

                        <tr>
                          <th colspan="6">Party Asked For Above Test Only</th>
                        </tr>
                        <tr>
                          <th colspan="6">Statment of Conformity : {booking1.statement_ofconformity}</th>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <h6>In the Opinion of the undersigned the sample reffered to above is of standard Quality as definded in {booking1.pharmacopeia_name} & Act or the rules made there under.</h6>
                    <br/>
                    <h6 style={{float:'right',fontSize:'15px'}}>Authorized Sign</h6>
                    <br/><h6 style={{fontSize:'15px'}}>Disclamer :</h6>
                    <p style={{fontSize:'13px'}}>
                       (a) Result related only to the received item only
                    </p>
                    <p style={{fontSize:'13px'}}>
                      (b) The Sample(s) to which the findings recorded herein (the finding) relate to information and sample provided by the client or by a third party acting at the client's direction and that
                          time environment. The finding constitute no warranty of the sample's representativeness of any goods and strictly relate to the sample(s).
                          The company accepts no liability with regard the origin or source from which the sample(s) is are extracted.
                    </p>
                    <p style={{fontSize:'13px'}}>
                      (c) Unless otherwise stated the result shown in this test report refer only to the sample(s) tested and such sample(s) are remained for 7 days in case of perishable
                          all other samples. The samples from regulatory bodies are to be retained as specified
                    </p>
                    <p style={{fontSize:'13px'}}>
                      (d) The report shall not be reproduced except in full without approval of the laboratory can provide assurance that parts of a report are not taken out of context.
                    </p>

                    <p style={{fontSize:'13px'}}>
                      (e) In case of any dispute judicially matter will be subject to kalol jurisdiction only.
                    </p>
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

export default NablView
