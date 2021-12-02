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

function CoaView(props) {
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
        street1 : response.data.data[0].customer_data.customer_contact_data.street_1,
        street2:response.data.data[0].customer_data.customer_contact_data.street_2,
        area:response.data.data[0].customer_data.customer_contact_data.area,
        pin:response.data.data[0].customer_data.customer_contact_data.pin,
        city:response.data.data[0].customer_data.customer_contact_data.city,
        state:response.data.data[0].customer_data.customer_contact_data.state.state_name,
        country:response.data.data[0].customer_data.customer_contact_data.country.country_name,
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

        		    pdf.save("coa_print_"+response.data.data[0].certificate_no+".pdf");
                toastr.info("Pdf is Generated Successfully For COA Print")
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
                          <tr><th colspan="4"><h6 style={{float:'right',fontSize:'15px'}}>FDCA Licence No : GTL/37/57</h6></th></tr>
                          <tr>
                            <th colspan="4" className="text-center" style={{fontSize:'18px'}}>Certificate of Analysis</th>
                          </tr>
                          <tr>
                            <th colspan="4" className="text-center" style={{fontSize:'13px'}}>Form-39<br/>(150 - E(f) Report of test or Analysis by Approved Institution)</th>
                          </tr>
                          <tr>
                            <th>
                              <u><h5>{booking1.customer_name}</h5></u>
                            </th>
                            <th colspan="2">Certificate No</th>
                            <td colspan="2">{booking1.certificate_no}</td>
                          </tr>
                          <tr>
                            <td>Street 1 : {booking1.street1}</td>
                            <th colspan="2">COA Release Date</th>
                            <td colspan="2">{booking1.coa_release_date ? moment(booking1.coa_release_date).format('DD-MM-YYYY'): 'Not Specified'}</td>
                          </tr>
                          <tr>
                            <td>Street 2 : {booking1.street2}<br/>{booking1.area ? booking1.area : ''}{booking1.area && booking1.pin ? ',' : ''}{booking1.pin ? booking1.pin : ''}
                            {booking1.pin && booking1.city ? ',' : ''}{booking1.city}{booking1.city && booking1.state ? ',' : ''}
                            {booking1.state}{booking1.state && booking1.country ? ',' : ''}
                            {booking1.country ? ',' : ''}{booking1.country}</td>
                            <th colspan="2">Sample Received Date</th>
                            <td colspan="2">{booking1.sample_received_date ? moment(booking1.sample_received_date).format('DD-MM-YYYY hh:mm:ss a'): 'Not Specified'}</td>
                          </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <MDBTable bordered style={{border:'1px solid #000000'}} small responsive>
                      <MDBTableBody>
                        <tr>
                          <th>Name of Sample</th>
                          <th>{booking1.name_of_sample}</th>
                          <th>Generic Name</th>
                          <th>{booking1.generic_name ? booking1.generic_name : 'Not Specified'}</th>
                        </tr>
                        <tr>
                          <td>Details Of Product</td>
                          <td>{booking1.product_generic ? booking1.product_generic : 'Not Specified'}</td>
                          <td>Party Mfg. Licence No</td>
                          <td>{booking1.party_mfg_licence_no ? booking1.party_mfg_licence_no : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td>Lot/Batch No</td>
                          <td>{booking1.lot_batch_no ? booking1.lot_batch_no : 'Not Specified'}</td>
                          <td>Client Ref No</td>
                          <td>{booking1.client_ref_no ? booking1.client_ref_no : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td>Batch Size/Qty Received</td>
                          <td>{booking1.batch_size_qty_rec ? booking1.batch_size_qty_rec : 'Not Specified'}</td>
                          <td>Sample Qty Received</td>
                          <td>{booking1.sample_qty_rec ? booking1.sample_qty_rec : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td>Original Manufacturer</td>
                          <td>{booking1.original_manufacturer ? booking1.original_manufacturer : 'Not Specified'}</td>
                          <td>Date of Manufacturing</td>
                          <td>{booking1.date_of_manufacturing ? moment(booking1.date_of_manufacturing).format('DD-MM-YYYY') : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <td>Supplier</td>
                          <td>{booking1.supplier ? booking1.supplier : 'Not Specified'}</td>
                          <td>Date of Expiry</td>
                          <td>{booking1.date_of_expiry ? moment(booking1.date_of_expiry).format('DD-MM-YYYY') : 'Not Specified'}</td>
                        </tr>
                        <tr>
                          <th colspan="4" className="text-center" style={{fontSize:'18px'}}>Analysis Result</th>
                        </tr>
                            <tr className="text-center">
                              <th>No</th>
                              <th>Test Parameter</th>
                              <th>Result</th>
                              <th>Specification {booking1.pharmacopeia_name}</th>
                            </tr>

                          {testData.length ?
                            testData.map((x, i) => (
                              <tr className="text-center">
                                <td>{i+1}</td>
                                <td>{x.test_parameter}</td>
                                <td>{x.result}</td>
                                <td style={{width:'350px'}}>{x.product_details}{x.product_details && x.max_limit ? <br/> : ''}{x.max_limit}</td>
                              </tr>
                           )) : <tr class="text-center"><td colspan="4">No Data Available</td></tr>}

                        <tr>
                          <th colspan="4">Party Asked For Above Test Only</th>
                        </tr>
                      </MDBTableBody>
                    </MDBTable>
                    <h6>In the Opinion of the undersigned the sample reffered to above is of standard Quality as definded in {booking1.pharmacopeia_name} & Act or the rules made there under.</h6>
                    <br/>
                    <h6 style={{float:'right',fontSize:'15px'}}>Authorized Sign</h6>
                    <br/><h6 style={{fontSize:'15px'}}>Disclamer :</h6>
                    <p style={{fontSize:'13px'}}>
                       (a) The Sample(s) to which the findings recorded herein (the finding) relate to information and sample provided by the client or by a third party acting at the client's direction and that
                       time environment. The finding constitute no warranty of the sample's representativeness of any goods and strictly relate to the sample(). The company accepts no liability with regard to
                       the origin or source from which the sample() is are extracted.
                    </p>
                    <p style={{fontSize:'13px'}}>
                      (b) Unless otherwise stated the result shown in this test report refer only to the sample) tested and such sample(s) are remained for 7 days in case of perishable and 15 days for all other
                      samples. The samples from regulatory bodies are to be retained as specified.
                    </p>
                    <p style={{fontSize:'13px'}}>
                      (c) This document can't be reproduced except in full, without prior written approval of company. Information contained here on reflects the company's finding at the time of its
                      intervention only and within the limit of client's instruction if any.
                    </p>
                    <p style={{fontSize:'13px'}}>
                      (d) In case of any dispute judicially matter will be subject to kalol jurisdiction only.
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

export default CoaView
