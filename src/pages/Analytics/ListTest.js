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
import parse from "html-react-parser";

class ListTest extends Component {
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

      {/*Delete Branch data from list*/}
        this.deleteTest = async(test_id) =>{
          this.setState({ loading: true }, () => {
             axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteTest/`+test_id,null, { headers: del_headers})
            .then(response => {
                    if(response.data.success == true){
                      //need to refresh page after delete
                      props.history.push('/all-test');
                       props.history.push('/test');
                      toastr.success(response.data.message);
                      this.setState({loading: false});
                  }else{
                    props.history.push('/test');
                    toastr.error(response.data.message);
                    this.setState({loading: false});
                  }
            })
        })
        }

        this.ExportToExcel = async() => {
          this.setState({ loading1: true }, () => {
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest`, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                 var test_data = response.data.data.map((post,index)=>({
                    "SR No" : index+1,
                    "Procedure Name" : post.procedure_name,
                    "Price" :post.price,
                    "procedure" : post.test_procedure ?  parse(post.test_procedure) : '',
                    "Test Code" : post.test_code,
                    "Parent" : post.parent_name[0] ? post.parent_name[0].procedure_name: '',
                   }))
                const sheet = XLSX.utils.json_to_sheet(test_data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
                XLSX.writeFile(workbook, `TestData.csv`);
                this.setState({loading1: false});
                toastr.success("Tests List Export To Excel Done Successfully.")
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
         axios.get(`${process.env.REACT_APP_BASE_APIURL}listTest`, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                this.setState({ posts: response.data.data });
             }else{
               toastr.error(response.data.message);
             }
            this.setState({loading: false});

          })
          .then(async() => {
             this.setState({ tableRows:this.assemblePosts(), isLoading:false });
             this.setState({ loading: false });
          }).catch(error => {
            console.log(error)
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
              procedure_name: post.procedure_name,
              parent: post.parent_name[0] ? post.parent_name[0].procedure_name: '',
              rate : post.price,
              action : <div><Link className="btn btn-primary btn-sm" to={"/edit-test/"+base64_encode(post.id)}>
              <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
              <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Test?')){ this.deleteTest(post.id)}}}><i class="fas fa-trash-alt"></i></button>
              &nbsp;&nbsp;
              <Link className="btn btn-info btn-sm" to={"/view-test/"+base64_encode(post.id)}> <i className="fa fa-eye"></i></Link>
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
        label: "Procedure Name",
        field: "procedure_name",
      },
      {
        label: "Parent",
        field: "parent",
      },
      {
        label: "Rate",
        field: "rate",
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
                    <li className="breadcrumb-item active">Test</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-test" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>&nbsp;New Test</Link>
                    </li>&nbsp;
                    {loading1 ?  <center><LoadingSpinner /></center> : <li><Button onClick={this.ExportToExcel} color="primary" className="btn btn-primary btn-sm"><i class="fas fa-file-export"></i> &nbsp;Export To Excel</Button></li>}
                </ol>
            </div>
        </div>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody className="btn-sm">

                  {loading ?  <center><LoadingSpinner /></center> :  <MDBDataTable striped bordered data={data1}/>}

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
export default ListTest
