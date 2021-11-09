import React, { useState, Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,Table,
    ButtonDropdown,Button } from "reactstrap"
import { withRouter, Link } from "react-router-dom"
import { DropdownButton } from 'react-bootstrap';
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import HorizontalLayout from "../../components/HorizontalLayout"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'; 
import $ from "jquery";

class ExportPdf extends Component {
    constructor(props) {

      super(props);
      this.state = {
          loading1: false,
          PharmacopieaData: [],
          count :0
        };
      const headers = {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        };

        this.exportPharmacopieaData = () => {
          this.setState({ loading1: true }, () => {
          axios.get(`${process.env.REACT_APP_BASE_APIURL}exportPharmacopieaData`, { headers: headers}).then(response => {   
          this.setState({  

            PharmacopieaData: response.data.data  
          });  
          this.setState({ loading1: false }); 
      const input = document.getElementById('pdfdiv');  
       //$("#pdfdiv").css("display", "block");
          html2canvas(input)  
            .then((canvas) => { 
                                  // $("#pdfdiv").css("display", "none");  
              var imgWidth = 200;  
              var pageHeight = 290;  
              var imgHeight = canvas.height * imgWidth / canvas.width;  
              var heightLeft = imgHeight;  
              const imgData = canvas.toDataURL('image/png');  
              const pdf = new jsPDF('p', 'mm', 'a4') 
              var position = 0;  
              var heightLeft = imgHeight;  
              pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
              pdf.save("PharmacopieaData.pdf");
              this.setState({ loading1: false }); 
              props.history.push('/pharmacopiea');
            }); 
        });  
        })
        }

        this.componentDidMount= () => {  

          this.exportPharmacopieaData();
          //this.exporttopdf();
    
        } 

}
render(){
  const { data2, loading1 } = this.state;
  return (
    <React.Fragment>
        <HorizontalLayout/>
        <ToastContainer autoClose={1500}/>
      <div className="page-content">
        <div className="container-fluid">
            <div class="page-title-box d-flex align-items-center justify-content-between">
            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item active">Pharmacopiea</li>
                </ol>
            </div>
              
        </div>

         {loading1 ?  <center><LoadingSpinner /></center> : <Row  id="pdfdiv">
             
            <Col className="col-12">
              <Card>
                <CardBody>
                <br/>
                  <h3><center>Pharmacopiea List</center></h3><br/>
                  
                  <div className="table-responsive"> 
          <Table stickyHeader aria-label="sticky table" bordered>  
            <thead>  
              <tr>  
                <th align="right">SR No</th>  
                <th align="right">Pharmacopiea Name</th>  
                <th align="right">Vol No</th>  
                <th align="right">Pharmacopiea Year</th>  
                <th align="right">Pharmacopiea Edition</th>  
                
              </tr>  
            </thead>  
            <tbody>  
              {  
                this.state.PharmacopieaData.map((p, index) => {  
                  return <tr key={index}>  
                    <td>{index+1}</td> 
                    <td>{p.pharmacopeia_name}</td>  
                    <td>{p.vol_no}</td>  
                    <td>{p.pharmacopeia_year}</td>  
                    <td>{p.pharmacopeia_edition}</td>  
                    
                  </tr>  
                index++})  
              }  
            </tbody>  
          </Table></div>
                </CardBody>
              </Card>
            </Col>
          </Row>
           }
        </div>
      </div>
    </React.Fragment>
  )
}
}
export default ExportPdf
