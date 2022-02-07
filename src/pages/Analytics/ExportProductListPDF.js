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
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios'
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable'
import $ from "jquery";
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import moment from 'moment';

class ExportProductListPDF extends Component {
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
    /*  const input = document.getElementById('pdfdiv');
          html2canvas(input)
            .then((canvas) => {
              var imgWidth = 200;
              var pageHeight = 290;
              var imgHeight = canvas.height * imgWidth / canvas.width;
              var heightLeft = imgHeight;
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF('p', 'mm', 'a4')
              var position = 0;
              var heightLeft = imgHeight;
              pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);*/
              // initialize jsPDF
              const doc = new jsPDF('l', '', '','');
              doc.autoTable({
             html: '#my-table',
             startY: 15,
             styles: {
          fontSize: 16,
          overflow: 'linebreak',
          },
          margin: {left: 5, right: 5},
          showHead: 'everyPage',
          columnWidth: 'wrap',
          columnStyles:{
            0: {
              columnWidth: 12,
            },
            1: {
              columnWidth: 15
            },
            2: {
              columnWidth: 24
            },
            3: {
              columnWidth: 23
            },
            4: {
              columnWidth: 27
            },
            5: {
              columnWidth: 35
            },
            6: {
              columnWidth: 30
            },
            7: {
              columnWidth: 30,
            },
            8: {
              columnWidth: 20
            },
            9: {
              columnWidth: 25
            },
            10: {
              columnWidth: 20
            },
            11: {
              columnWidth: 25
            },
          },
          theme: 'grid',
didParseCell: function (table) {

          if (table.section === 'head') {
            table.cell.styles.fillColor = '#5b73e8';
            table.cell.styles.textColor = '#ffffff';
            table.cell.styles.fontSize = '12';
          }
          if (table.section === 'body') {
            table.cell.styles.textColor = '#000000';
            table.cell.styles.fontSize = '12';
          }
       }
 });
              doc.save("ProductsData.pdf");
              props.history.push('/products');
              toastr.info("PDF for Product Data is Generated Successfully")
              this.setState({ loading1: false });
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
          <Table border="1" stickyHeader aria-label="sticky table" style={{textAlign:'center',color:'black',width:'100%'}} id="my-table">
            <thead>
              <tr>
                <th align="right">SR No</th>
                <th align="right">Pharmacopiea</th>
                <th align="right">Product Name</th>
                <th align="right">FP/RM/G</th>
                <th align="right">Generic Name</th>
                <th align="right">Sample Description</th>
                <th align="right">Packing Detail</th>
                <th align="right">Marker/Specification</th>
                <th align="right">Enter By</th>
                <th align="right">Enter Datetime</th>
                <th align="right">Modified By</th>
                <th align="right">Modified Datetime</th>

              </tr>
            </thead>
            <tbody>
              {
                this.state.ProductData.map((post, index) => {
                  return <tr key={index}>
                    <td>{index+1}</td>
                    <td>{post.pharmacopeia_name}</td>
                    <td>{post.product_name}</td>
                    <td>{post.product_generic}</td>
                    <td>{post.generic_product_name}</td>
                    <td>{post.sample_description}</td>
                    <td>{post.packing_detail}</td>
                    <td>{post.marker_specification}</td>
                    <td>{post.entered_by}</td>
                    <td>{post.created_at ? moment(post.created_at).format('DD-MM-YYYY hh:mm:ss') : ''}</td>
                    <td>{post.modified_by}</td>
                    <td>{post.updated_at ? moment(post.updated_at).format('DD-MM-YYYY hh:mm:ss') : ''}</td>

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
export default ExportProductListPDF
