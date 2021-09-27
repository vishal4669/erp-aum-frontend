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

class ExportProductAsHTML extends Component {
    constructor(props) {

      super(props);
      this.state = {
          loading1: false,
          ProductData: [],
          count :0
        };
      const headers = {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        };

        this.exportProductData = () => {
          this.setState({ loading1: true }, () => {
          axios.get(`${process.env.REACT_APP_BASE_APIURL}exportproductlist`, { headers: headers}).then(response => {   
              this.setState({  

                ProductData: response.data.data 
              });  
              this.setState({ loading1: false }); 
              var pageHTML = window.document.getElementById('pdfdiv').innerHTML
              let data = new Blob([pageHTML], {type: 'data:attachment/text,'});
              let csvURL = window.URL.createObjectURL(data);
              let tempLink = document.createElement('a');
              tempLink.href = csvURL;
              tempLink.setAttribute('download', 'ProductData.html');
              tempLink.click();
              this.setState({ loading1: false }); 
              props.history.push('/products');
            });  
          })
        }

        this.componentDidMount= () => {  

          this.exportProductData();
    
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
                  <h3><center>Product List</center></h3><br/>
                  
                  <div className="table-responsive"> 
          <Table border="1" stickyHeader aria-label="sticky table">  
            <thead>  
              <tr>
                <th>SR No</th>     
                <th>Pharmacopiea</th>  
                <th>Product Name</th>  
                <th>FP/RM/G</th>  
                <th>Generic Name</th>  
                <th>Sample Description</th>  
                <th>Packing Detail</th>  
                <th>Marker/Specification</th>  
                <th>Enter By</th>  
                <th>Enter Datetime</th>  
                <th>Modified By</th>  
                <th>Modified Datetime</th>  
                
              </tr>  
            </thead>  
            <tbody>  
              {  
                this.state.ProductData.map((post, index) => { 
                const pharma = post.pharmacopeia || []
                const generic = post.generic || []
                const created_by = post.created_by || [] 
                const updated_by = post.updated_by || [] 
                  return <tr key={index}>  
                    <td>{index+1}</td>  
                    <td>{pharma.pharmacopeia_name}</td>  
                    <td>{post.product_name}</td>  
                    <td>{post.product_generic}</td>  
                    <td>{generic.generic_product_name}</td>  
                    <td>{post.sample_description}</td>  
                    <td>{post.packing_detail}</td>  
                    <td>{post.marker_specification}</td>  
                    <td>{created_by.first_name+" "+ created_by.middle_name + " " + created_by.last_name}</td>
                    <td>{post.created_at}</td>  
                    <td>{updated_by.first_name+" "+ updated_by.middle_name + " " + updated_by.last_name}</td>  
                    <td>{post.updated_at}</td>  
                    
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
export default ExportProductAsHTML
