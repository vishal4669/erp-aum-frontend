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
//import "jspdf-autotable";
import autoTable from 'jspdf-autotable'
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import $ from 'jquery'
import moment from 'moment'

class ExportQuotationData extends Component {
    constructor(props) {

      super(props);
      this.state = {
          loading1: false,
          QuotationData: [],
          count :0
        };
      const headers = {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        };
        const url = window.location.href
        const split_url = url.split( '/' )
        const type = split_url[4]
        this.componentDidMount= async() => {
          //Html File Genration for Customer
          this.setState({ loading1: true }, () => {
           axios.get(`${process.env.REACT_APP_BASE_APIURL}listQuotation?is_export=1`, { headers: headers}).then(response => {
              this.setState({

                QuotationData: response.data.data
              });
              if(type === "html"){
                this.setState({ loading1: false });
                var pageHTML = window.document.getElementById('pdfdiv').innerHTML
                let data = new Blob([pageHTML], {type: 'data:attachment/text,'});
                let csvURL = window.URL.createObjectURL(data);
                let tempLink = document.createElement('a');
                tempLink.href = csvURL;
                tempLink.setAttribute('download', 'QuotationData.html');
                tempLink.click();
                toastr.info("HTML for Quotation Data is Generated Successfully")
                props.history.push('/quotation');
              } else {
                this.setState({ loading1: false });
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
    columnWidth: 14,
  },
  1: {
    columnWidth: 30
  },
  2: {
    columnWidth: 26
  },
  3: {
    columnWidth: 30
  },
  4: {
    columnWidth: 35
  },
  5: {
    columnWidth: 30
  },
  6: {
    columnWidth: 30
  },
  7: {
    columnWidth: 30,
  },
  8: {
    columnWidth: 35
  },
  9: {
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
              doc.save(`QuotationData.pdf`);
                toastr.info("PDF for Quotation Data is Generated Successfully")
                props.history.push('/quotation');
              }
            });
          })

        }

}
render(){
  const { data2, loading1 } = this.state;
  const td_th_style = {
    paddingLeft: '4px',
    paddingRight: '4px'
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">

         {loading1 ?  <center><LoadingSpinner /></center> : <Row>

            <Col className="col-12" id="pdfdiv" class="pdfDiv">
                <br/>
                  <h3><center>Quotation List</center></h3><br/>

                  <div className="table-responsive">
        <Table border="1" stickyHeader aria-label="sticky table" style={{'border': '1px solid black',
  'borderCollapse': 'collapse',marginLeft:'auto',marginRight:'auto',fontSize:'16px',color:'#000000',textAlign:'center'}} id="my-table">
          <thead>
            <tr>
              <th style={td_th_style}>SR No</th>
              <th style={td_th_style}>Quotation No</th>
              <th style={td_th_style}>Type</th>
              <th style={td_th_style}>Customer</th>
              <th style={td_th_style}>Quotation Date</th>
              <th style={td_th_style}>Valid Until</th>
              <th style={td_th_style}>Subject</th>
              <th style={td_th_style}>Products</th>
              <th style={td_th_style}>Tests</th>
              <th style={td_th_style}>Total</th>
            </tr>
          </thead>
            <tbody>
              {
                this.state.QuotationData.map((post, index) => {
                  return <tr key={index}>
                    <td style={td_th_style}>{index+1}</td>
                    <td style={td_th_style}>{post.quotation_no}</td>
                    <td style={td_th_style}>{post.type}</td>
                    <td style={td_th_style}>{post.company_name}</td>
                    <td style={td_th_style}>{post.quotation_date ? moment(post.quotation_date).format("DD-MM-YYYY hh:mm:ss") : 'No Date'}</td>
                    <td style={td_th_style}>{post.valid_until ? moment(post.valid_until).format("DD-MM-YYYY hh:mm:ss") : 'No Date'}</td>
                    <td style={td_th_style}>{post.subject}</td>
                    <td style={td_th_style}>{post.products_and_tests.products}</td>
                    <td style={td_th_style}>{post.products_and_tests.tests}</td>
                    <td style={td_th_style}>{post.product_info_grand_total}</td>
                  </tr>
                })
              }
            </tbody>
          </Table>
          </div>
            </Col>
          </Row>
           }
        </div>
      </div>
    </React.Fragment>
  )
}
}
export default ExportQuotationData
