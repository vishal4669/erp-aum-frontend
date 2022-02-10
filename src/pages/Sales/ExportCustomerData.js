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

class ExportCustomerData extends Component {
    constructor(props) {

      super(props);
      this.state = {
          loading1: false,
          CustomerData: [],
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
           axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer`, { headers: headers}).then(response => {
              this.setState({

                CustomerData: response.data.data
              });
              if(type === "html"){
                this.setState({ loading1: false });
                var pageHTML = window.document.getElementById('pdfdiv').innerHTML
                let data = new Blob([pageHTML], {type: 'data:attachment/text,'});
                let csvURL = window.URL.createObjectURL(data);
                let tempLink = document.createElement('a');
                tempLink.href = csvURL;
                tempLink.setAttribute('download', 'CustomerData.html');
                tempLink.click();
                toastr.info("HTML for Customer Data is Generated Successfully")
                props.history.push('/customer');
              } else {
                this.setState({ loading1: false });
                // initialize jsPDF
                const doc = new jsPDF('l', '', '','');
                // define the columns we want and their titles
                /*const tableColumn = ["SR No", "Name", "Contact Person", "Tally Alias Name", "Account/Admin Contact No.",
                "QA Contact No.", "QC Contact No.", "Landline", "Account/Admin E-mail", "QC Email","QA E-mail",
                "Corporate Address","Correspondence Address","GST No"];
                const tableRows = [];
                response.data.data.forEach((customer,index) => {
                const dataCustomer = [
                   index+1,
                   customer.Company_name,
                   customer.contact_person_name,
                   customer.tally_alias_name,
                   customer.home_contact_no.account_admin_contact_no,
                   customer.other_contact_no.qa_contact_no,
                   customer.home_contact_no.home_qc_contact_no,
                   "Data Need To Show",
                   "Data Need To Show",
                   "Data Need To Show",
                   "Data Need To Show",
                   "Data Need To Show",
                   "Data Need To Show",
                   "Data Need To Show"
                ];
                // push each customer's info into a row
                tableRows.push(dataCustomer);
              })
              // startY is basically margin-top
              doc.autoTable(tableColumn, tableRows, {
                 startY: 20
              });*/
              doc.autoTable({
   html: '#my-table1',
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
    columnWidth: 40
  },
  2: {
    columnWidth: 26
  },
  3: {
    columnWidth: 24
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
    columnWidth: 40,
  },
  8: {
    columnWidth: 45
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
              /*doc.autoTable({ html: '#my-table',tableWidth: 'wrap' },columnStyles: {
      1: {columnWidth: 'auto'}
    })*/
            //  autoTable(doc, { html: '#my-table',tableWidth:'auto',cellWidth:'auto' })
              doc.save(`CustomerData.pdf`);
                // define an empty array of rows
                toastr.info("PDF for Customer Data is Generated Successfully")
                props.history.push('/customer');
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
                  <h3><center>Customer List</center></h3><br/>

                  <div className="table-responsive">
        <Table border="1" stickyHeader aria-label="sticky table" style={{'border': '1px solid black',
  'borderCollapse': 'collapse',marginLeft:'auto',marginRight:'auto',fontSize:'16px',color:'#000000',textAlign:'center'}} id="my-table">
          <thead>
            <tr>
              <th style={td_th_style}>SR No</th>
              <th style={td_th_style}>Name</th>
              <th style={td_th_style}>Contact Person</th>
              <th style={td_th_style}>Tally Alias Name</th>
              <th style={td_th_style}>Account/Admin Contact No.</th>
              <th style={td_th_style}>QA Contact No.</th>
              <th style={td_th_style}>QC Contact No.</th>
              <th style={td_th_style}>Landline</th>
              <th style={td_th_style}>Account/Admin E-mail</th>
              <th style={td_th_style}>QC Email</th>
              <th style={td_th_style}>QA E-mail</th>
              <th style={td_th_style}>Corporate Address</th>
              <th style={td_th_style}>Correspondence Address</th>
              <th style={td_th_style}>GST No</th>
            </tr>
          </thead>
            <tbody>
              {
                this.state.CustomerData.map((post, index) => {
                  return <tr key={index}>
                    <td style={td_th_style}>{index+1}</td>
                    <td style={td_th_style}>{post.company_name}</td>
                    <td style={td_th_style}>{post.contact_person_name}</td>
                    <td style={td_th_style}>{post.tally_alias_name}</td>
                    <td style={td_th_style}>{post.home_contact_no}</td>
                    <td style={td_th_style}>{post.other_contact_no}</td>
                    <td style={td_th_style}>{post.home_qc_contact_no}</td>
                    <td style={td_th_style}>{post.home_landline}</td>
                    <td style={td_th_style}>{post.home_email}</td>
                    <td style={td_th_style}>{post.other_qc_email}</td>
                    <td style={td_th_style}>{post.other_email}</td>
                    <td style={td_th_style}>{post.home_street_1+","+post.home_street_2+","+post.home_city+","+post.home_state+","+post.home_country}</td>
                    <td style={td_th_style}>{post.other_street_1+","+post.other_street_2+","+post.other_city+","+post.other_state+","+post.other_country}</td>
                    <td style={td_th_style}>{post.gst_number}</td>
                  </tr>
                })
              }
            </tbody>
          </Table>

          <Table border="1" stickyHeader aria-label="sticky table" style={{'border': '1px solid black',
    'borderCollapse': 'collapse',marginLeft:'auto',marginRight:'auto',fontSize:'16px',color:'#000000',textAlign:'center'}} id="my-table1">
            <thead>
              <tr>
                <th style={td_th_style}>SR No</th>
                <th style={td_th_style}>Name</th>
                <th style={td_th_style}>Contact Person</th>
                <th style={td_th_style}>Tally Alias Name</th>
                <th style={td_th_style}>Account/Admin Contact No.</th>
                <th style={td_th_style}>QA Contact No.</th>
                <th style={td_th_style}>QC Contact No.</th>
                <th style={td_th_style}>Account/Admin E-mail</th>
                <th style={td_th_style}>GST No</th>
              </tr>
            </thead>
              <tbody>
                {
                  this.state.CustomerData.map((post, index) => {
                    return <tr key={index}>
                      <td style={td_th_style}>{index+1}</td>
                      <td style={td_th_style}>{post.company_name}</td>
                      <td style={td_th_style}>{post.contact_person_name}</td>
                      <td style={td_th_style}>{post.tally_alias_name}</td>
                      <td style={td_th_style}>{post.home_contact_no}</td>
                      <td style={td_th_style}>{post.other_contact_no}</td>
                      <td style={td_th_style}>{post.home_qc_contact_no}</td>
                      <td style={td_th_style}>{post.home_email}</td>
                      <td style={td_th_style}>{post.gst_number}</td>
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
export default ExportCustomerData
