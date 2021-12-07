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
import letterHeadImg from "../../../assets/images/letterhead.png"
import moment from 'moment'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import $ from 'jquery'

function AayushView(props) {
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
  const [testData, setTestData] = useState([{p_sr_no:'',test_parameter:'',result:'',product_details:'',max_limit:'',
  parent_name:'',parent_child:''}])


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
      console.log(HTML_Width)
        		var HTML_Height = $(".pdfDiv").height();
        		var top_left_margin = 15;
        		var PDF_Width = HTML_Width+(top_left_margin*2);
        		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
        		var canvas_image_width = HTML_Width;
        		var canvas_image_height = HTML_Height;

        		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;


        		html2canvas($(".pdfDiv")[0],{allowTaint:true}).then(function(canvas) {
        			canvas.getContext('2d');
        			var imgData = canvas.toDataURL("image/png", 8.0);
        			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
        		    pdf.addImage(imgData, 'JPG',top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);


        			for (var i = 1; i <= totalPDFPages; i++) {
        				pdf.addPage(PDF_Width, PDF_Height);
        				pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
        			}

        		    pdf.save("coa_aayush_"+response.data.data[0].certificate_no+".pdf");
                toastr.info("Pdf is Generated Successfully For COA Aayush")
                props.history.push('/generate-coa/'+edit_booking_id);
            });
      }
    })
    .catch((error) => {
      console.log(error)
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
                          <Col className="pdfDiv" style={{fontFamily:'Times New Roman'}}>
                              {/*if viewonly than need to show viewonly image*/}
                                {coa_action == 'VIEW' ? <img src={viewOnly} id="watermark" style={{width:'100%',opacity:'0.4'}}/> : ''}
                                {letterhead == 'Yes' ? <img src={letterHeadImg} style={{float:'right',width:'20%',marginBottom:'20px'}}/> : ''}
                                <table style={{color:'black',width:'100%'}}>
                                  <tbody>
                                      <tr>
                                        <th>
                                          <h6 style={{fontSize:'15px',fontWeight:'bold',color:'black',float:'right'}}>Aayush Approval No : GATL/05
                                          </h6>
                                        </th>
                                      </tr>
                                      <tr>
                                        <td><center><h1 style={{color:'black',fontSize:'28px',fontWeight:'bolder'}}>Certificate of Analysis</h1></center><hr style={{border: '1px solid #000000',opacity:'unset'}}/></td>
                                      </tr>
                                      <tr>
                                        <td className="text-center" style={{fontSize:'16px'}}><b>Form-50</b></td>
                                      </tr>
                                      <tr>
                                        <td className="text-center" style={{fontSize:'16px'}}><b>(160 - D(f) Report of test or Analysis by Approved Laboratory)</b></td>
                                      </tr>
                                  </tbody>
                                </table>
                                <MDBTable style={{border:'1px solid grey',color:'black'}} small>
                                  <MDBTableBody>
                                    <tr>
                                      <td style={{width:'400px'}}><b>{booking1.customer_name}</b></td>
                                      <td colspan="2" style={{borderLeft:'1px solid grey'}}><b>Certificate No</b></td>
                                      <td colspan="2" style={{borderLeft:'1px solid grey'}}><b>{booking1.certificate_no}</b></td>
                                    </tr>
                                    <tr>
                                      <td style={{borderTopColor:'#f5f6f8'}}><b>{booking1.street1},{booking1.street2}</b></td>
                                      <td colspan="2" style={{borderLeft:'1px solid grey'}}><b>COA Release Date</b></td>
                                      <td colspan="2" style={{borderLeft:'1px solid grey'}}><b>{booking1.coa_release_date ? moment(booking1.coa_release_date).format('DD-MM-YYYY'): 'Not Specified'}</b></td>
                                    </tr>
                                    <tr>
                                      <td style={{borderTopColor:'#f5f6f8'}}><b>{booking1.area ? booking1.area : ''}{booking1.area && booking1.pin ? ',' : ''}{booking1.pin ? booking1.pin : ''}
                                        {booking1.pin && booking1.city ? ',' : ''}{booking1.city}{booking1.city && booking1.state ? ',' : ''}
                                        {booking1.state}{booking1.state && booking1.country ? ',' : ''}
                                        {booking1.country ? ',' : ''}{booking1.country}</b></td>
                                      <td colspan="2" style={{borderLeft:'1px solid grey'}}>Sample Received Date</td>
                                      <td colspan="2" style={{borderLeft:'1px solid grey'}}>{booking1.sample_received_date ? moment(booking1.sample_received_date).format('DD-MM-YYYY hh:mm:ss a'): 'Not Specified'}</td>
                                    </tr>
                                  </MDBTableBody>
                                </MDBTable>
                                <MDBTable bordered style={{border:'1px solid grey',color:'black'}} small>
                                  <MDBTableBody>
                                    <tr>
                                      <th style={{width:'145px'}}>Name of Sample</th>
                                      <th colspan="2">{booking1.name_of_sample}</th>
                                      <th style={{width:'145px'}}>Generic Name</th>
                                      <th colspan="2">{booking1.generic_name ? booking1.generic_name : 'Not Specified'}</th>
                                    </tr>
                                    <tr>
                                      <td style={{width:'145px'}}>Details Of Product</td>
                                      <td colspan="2">{booking1.product_generic ? booking1.product_generic : 'Not Specified'}</td>
                                      <td style={{width:'145px'}}>Party Mfg. Licence No</td>
                                      <td colspan="2">{booking1.party_mfg_licence_no ? booking1.party_mfg_licence_no : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{width:'145px'}}>Lot/Batch No</td>
                                      <td colspan="2">{booking1.lot_batch_no ? booking1.lot_batch_no : 'Not Specified'}</td>
                                      <td style={{width:'145px'}}>Client Ref No</td>
                                      <td colspan="2">{booking1.client_ref_no ? booking1.client_ref_no : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{width:'145px'}}>Batch Size/Qty Received</td>
                                      <td colspan="2">{booking1.batch_size_qty_rec ? booking1.batch_size_qty_rec : 'Not Specified'}</td>
                                      <td style={{width:'145px'}}>Sample Qty Received</td>
                                      <td colspan="2">{booking1.sample_qty_rec ? booking1.sample_qty_rec : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{width:'145px'}}>Original Manufacturer</td>
                                      <td colspan="2">{booking1.original_manufacturer ? booking1.original_manufacturer : 'Not Specified'}</td>
                                      <td style={{width:'145px'}}>Date of Manufacturing</td>
                                      <td colspan="2">{booking1.date_of_manufacturing ? moment(booking1.date_of_manufacturing).format('DD-MM-YYYY') : 'Not Specified'}</td>
                                    </tr>
                                    <tr>
                                      <td style={{width:'145px'}}>Supplier</td>
                                      <td colspan="2">{booking1.supplier ? booking1.supplier : 'Not Specified'}</td>
                                      <td style={{width:'145px'}}>Date of Expiry</td>
                                      <td colspan="2">{booking1.date_of_expiry ? moment(booking1.date_of_expiry).format('DD-MM-YYYY') : 'Not Specified'}</td>
                                    </tr>
                                  </MDBTableBody>
                                </MDBTable>
                                  <h3 style={{fontSize:'14px',fontWeight:'600',color:'black'}}>Analysis Result</h3>
                                <MDBTable bordered style={{border:'1px solid grey',color:'black'}} small>
                                  <MDBTableBody>
                                        <tr className="text-center">
                                          <th>No</th>
                                          <th>Test Parameter</th>
            															<th>Label Claims</th>
                                          <th style={{width:'100px'}}>Result</th>
                                          <th colspan="2">Specification {booking1.pharmacopeia_name}</th>
            															<th>Method Used</th>
                                        </tr>

                                      {testData.length ?
                                        testData.map((x, i) => (
                                          <tr className="text-center">
                                            <td>{i+1}</td>
                                            <td>{x.test_parameter}</td>
            																<td>{x.label_claim}</td>
                                            <td>{x.result}</td>
                                            <td colspan="2">{x.product_details}{x.product_details && x.max_limit ? <br/> : ''}{x.max_limit}{x.parent_child == 'Parent' && x.parent_data.parent_name !== '' ? '('+x.parent_data.parent_name+")" : ''}</td>
            																<td>{x.method_used}</td>
            															</tr>
                                       )) : <tr class="text-center"><td colspan="6">No Data Available</td></tr>}
                                  </MDBTableBody>
                                </MDBTable>
                                <h3 style={{fontSize:'14px',fontWeight:'600',color:'black'}}>Party Asked For Above Test Only</h3>
                                <hr style={{border: '1px double black',opacity:'unset'}}/>
                                <h6 style={{color:'black',fontWeight:'bold'}}>In the Opinion of the undersigned the sample reffered to above is of standard Quality as definded in {booking1.pharmacopeia_name} & Act or the rules<br/> made there under.</h6>
                                <br/>
                                <p style={{height:'30px'}}></p>
                                <h6 style={{float:'right',fontSize:'15px',fontWeight:'bold',color:'black'}}><center>Signature</center>Technical Incharge of Testing</h6><br/><br/>
                                <h6 style={{fontSize:'15px',color:'black',fontWeight:'bold'}}>Disclamer :</h6>
                                <p style={{fontSize:'13px',color:'black'}}>
                                   (a) The Sample(s) to which the findings recorded herein (the finding) relate to information and sample provided by the client or by a third party acting at the client's direction and that
                                   time environment. The finding constitute no warranty of the sample's representativeness of any goods and strictly relate to the sample(s). The company accepts no liability with regard to
                                   the origin or source from which the sample(s) is are extracted.
                                </p>
                                <p style={{fontSize:'13px',color:'black'}}>
                                  (b) Unless otherwise stated the result shown in this test report refer only to the sample) tested and such sample(s) are remained for 7 days in case of perishable and 15 days for all other
                                  samples. The samples from regulatory bodies are to be retained as specified.
                                </p>
                                <p style={{fontSize:'13px',color:'black'}}>
                                  (c) This document can't be reproduced except in full, without prior written approval of company. Information contained here on reflects the company's finding at the time of its
                                  intervention only and within the limit of client's instruction if any.
                                </p>
                                <p style={{fontSize:'13px',color:'black'}}>
                                  (d) In case of any dispute judicially matter will be subject to kalol jurisdiction only.
                                </p>

                          </Col>
                        </Row>
          }
        </Container>
      </div>
    </React.Fragment>

  )
}

export default AayushView
