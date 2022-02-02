import React, { useState, Component } from "react"
import { MDBDataTable } from "mdbreact"
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
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios'
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import $ from "jquery";

class ListPharmacopiea extends Component {
    constructor(props) {

      super(props);
      this.state = {
          posts: [],
          tableRows: [],
          loading: false,
          loading1: false,
          PharmacopieaData: [],
          count :0
        };
      const headers = {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        };

        const del_headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        };

      {/*Delete Pharmocopiea data from list*/}
        this.deletePharmacopiea = async(pharmacopiea_id) =>{
          this.setState({ loading: true }, () => {
             axios.post(`${process.env.REACT_APP_BASE_APIURL}deletePharmacopeia/`+pharmacopiea_id,null, { headers: del_headers})
            .then(response => {
                    if(response.data.success == true){
                      //need to refresh page after delete
                      props.history.push('/all-pharmacopiea');
                       props.history.push('/pharmacopiea');
                      toastr.success(response.data.message);;
                      this.setState({loading: false});
                  }else{
                    props.history.push('/pharmacopiea');
                   toastr.error(response.data.message);
                    this.setState({loading: false});
                  }
            })
        })
        }


         this.printPharmacopiea = () =>{
           window.print();
        }

        this.ExportToExcel = () => {
          this.setState({ loading1: true }, () => {
          axios.get(`${process.env.REACT_APP_BASE_APIURL}exportPharmacopieaData`, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                const sheet = XLSX.utils.json_to_sheet(response.data.data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
                XLSX.writeFile(workbook, `PharmacopieaData.csv`);
                this.setState({loading1: false});
             }else{
               toastr.error(response.data.message);
               this.setState({loading1: false});
             }

          })
          .catch(error => {
              toastr.error(error.response.data.message);
              this.setState({ loading1: false });
            })
        })
        }


        //Mount the Pharmocopiea List records...
      this.componentWillMount = async() => {


      this.setState({ loading: true }, () => {
         axios.get(`${process.env.REACT_APP_BASE_APIURL}listPharmacopeia`, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                this.setState({ posts: response.data.data });
             }else{
               toastr.error(response.data.message);
             }
            this.setState({loading: false});

          })
          .then(async() => {
             this.setState({ tableRows:this.assemblePosts()});
             this.setState({ loading: false });
          }).catch(error => {
              toastr.error(error.response.data.message);
              this.setState({ loading: false });
            })
        })
    }

      this.assemblePosts= () => {

        let posts = this.state.posts.map((post) => {
         this.setState({
      count: this.state.count + 1
    });
          return (
            {
              srno: this.state.count,
              pharmacopieaname: post.pharmacopeia_name,
              volno: post.vol_no,
              year : post.pharmacopeia_year,
              edition : post.pharmacopeia_edition,
              action : <div><Link className="btn btn-primary btn-sm" to={"/edit-pharmacopiea/"+base64_encode(post.id)}>
              <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
              <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Pharmacopiea?')){ this.deletePharmacopiea(post.id)}}}><i class="fas fa-trash-alt"></i></button>
              </div>
              ,

            }


          )

        });

        return posts;

      }

}
render(){

const { data, loading } = this.state;
const { data2, loading1 } = this.state;
  const data1 = {
    columns: [
      {
        label: "SR No",
        field: "srno",

      },
      {
        label: "Pharmacopiea Name",
        field: "pharmacopieaname",
      },
      {
        label: "Vol No",
        field: "volno",
      },
      {
        label: "Year",
        field: "year",
      },
      {
        label: "Edition",
        field: "edition",
      },
      {
        label: "Action",
        field: "action",
      },
    ],
    rows:this.state.tableRows,
  }
  return (
    <React.Fragment>
        <HorizontalLayout/>
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
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-pharmacopiea" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>&nbsp;Add Pharmacopiea</Link>
                    </li>&nbsp;
                   {loading1 ?  <center><LoadingSpinner /></center> :   <li>
                        <div className="btn-group">
                          <DropdownButton  title="Actions" drop="left" variant="primary btn-sm">
                            <DropdownItem onClick={this.printPharmacopiea}><i class="fa fa-print"></i> &nbsp;Print</DropdownItem>
                            <DropdownItem onClick={this.ExportToExcel}><i class="fas fa-file-export"></i> &nbsp;Export To Excel </DropdownItem>
                            <DropdownItem><Link to="/export-pdf-pharmacopiea" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export To PDF</Link></DropdownItem>
                          </DropdownButton>

                        </div>
                    </li>}
                </ol>
            </div>
        </div>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>

                  {loading ?  <center><LoadingSpinner /></center> :  <MDBDataTable striped bordered data={data1} id="pharmacopiea"/>}

                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
      </div>
    </React.Fragment>
  )
}
}
export default ListPharmacopiea
