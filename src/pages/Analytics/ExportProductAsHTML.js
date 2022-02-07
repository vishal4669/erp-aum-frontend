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
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct`, { headers: headers}).then(response => {
              this.setState({

                ProductData: response.data.data
              });
              this.setState({ loading1: false });
              var pageHTML = window.document.getElementById('pdfdiv').innerHTML
              let data = new Blob([pageHTML], {type: 'data:attachment/text,'});
              let csvURL = window.URL.createObjectURL(data);
              let tempLink = document.createElement('a');
              tempLink.href = csvURL;
              tempLink.setAttribute('download', 'ProductsData.html');
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
  const td_th_style = {
    paddingLeft: '4px',
    paddingRight: '4px'
  }
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
                    <li className="breadcrumb-item active">Product</li>
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
          <Table border="1" stickyHeader aria-label="sticky table" style={{'border': '1px solid black',
    'borderCollapse': 'collapse'}}>
            <thead>
              <tr>
                <th style={td_th_style}>SR No</th>
                <th style={td_th_style}>Pharmacopiea</th>
                <th style={td_th_style}>Product Name</th>
                <th style={td_th_style}>FP/RM/G</th>
                <th style={td_th_style}>Generic Name</th>
                <th style={td_th_style}>Sample Description</th>
                <th style={td_th_style}>Packing Detail</th>
                <th style={td_th_style}>Marker/Specification</th>
                <th style={td_th_style}>Enter By</th>
                <th style={td_th_style}>Enter Datetime</th>
                <th style={td_th_style}>Modified By</th>
                <th style={td_th_style}>Modified Datetime</th>

              </tr>
            </thead>
            <tbody>
              {
                this.state.ProductData.map((post, index) => {
                  return <tr key={index}>
                    <td style={td_th_style}>{index+1}</td>
                    <td style={td_th_style}>{post.pharmacopeia_name}</td>
                    <td style={td_th_style}>{post.product_name}</td>
                    <td style={td_th_style}>{post.product_generic}</td>
                    <td style={td_th_style}>{post.generic_product_name}</td>
                    <td style={td_th_style}>{post.sample_description}</td>
                    <td style={td_th_style}>{post.packing_detail}</td>
                    <td style={td_th_style}>{post.marker_specification}</td>
                    <td style={td_th_style}>{post.entered_by}</td>
                    <td style={td_th_style}>{post.created_at}</td>
                    <td style={td_th_style}>{post.modified_by}</td>
                    <td style={td_th_style}>{post.updated_at}</td>
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
