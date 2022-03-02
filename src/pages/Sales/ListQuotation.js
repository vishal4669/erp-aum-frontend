import React, { useState, Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,Dropdown,
    DropdownMenu,
    Dropdownpost,
    DropdownToggle,Table,
    ButtonDropdown,Button,DropdownItem } from "reactstrap"
import { MDBDataTable } from "mdbreact"
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
import moment from 'moment';
import Pagination from "react-js-pagination";
import * as XLSX from 'xlsx';
class ListQuotation extends Component{

  constructor(props){
    super(props);
    this.state= {
    posts: [],
    tableRows: [],
    loading: false,
    loading1: false,
    count :0
    }
     const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
    };

    const del_headers = {
      'Authorization' : "Bearer "+localStorage.getItem('token')
    };


 this.componentWillMount=async() => {
    this.setState({ loading: true }, () => {
     axios.get(`${process.env.REACT_APP_BASE_APIURL}listQuotation`, { headers: headers})

       .then(response => response.data.data)
       .then(data => {

          // if (err) throw err;

          this.setState({ posts: data })
          this.setState({loading: false});

       })

       .then(async() => {

          this.setState({ tableRows:this.assemblePosts()})
          this.setState({loading: false});

       }).catch(error => {
         console.log(error)
           toastr.error(error.response.data.message);
           this.setState({ loading: false });
         })

     })
 }

this.deleteQuotation = async(quotation_id) =>{
            this.setState({ loading: true }, () => {
               axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteQuotation/`+quotation_id,null, { headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-quotation');
                        props.history.push('/quotation');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/quotation');
                      toastr.error(response.data.message);
                      this.setState({loading: false});
                    }
              })
            })
 }

this.print_quotation_list = () => {
   window.print()
 }
this.ExportToExcel = () => {
   // export to excel customer list
   this.setState({ loading1: true }, () => {
   axios.get(`${process.env.REACT_APP_BASE_APIURL}listQuotation?is_export=1`, { headers: headers})

   .then(response => {
       if(response.data.success == true){
          var quotation_data = response.data.data.map((post,index) =>{
            return ({
            "SR No" : index+1,
             "Quotation No" : post.quotation_no,
             "Type" : post.type,
             "Customer" : post.company_name,
             "Quotation Date" : post.quotation_date ? moment(post.quotation_date).format("DD-MM-YYYY hh:mm:ss") : 'No Date',
             "Valid Until" : post.valid_until ? moment(post.valid_until).format("DD-MM-YYYY hh:mm:ss") : 'No Date',
             "Subject" : post.subject,
             "Products" : post.products_and_tests.products,
             "Tests" : post.products_and_tests.tests,
             "Total" : post.product_info_grand_total,
          })
           })
         const sheet = XLSX.utils.json_to_sheet(quotation_data);
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
         XLSX.writeFile(workbook, `QuotationData.csv`);
         this.setState({loading1: false});
         toastr.success("Quotation List Export To Excel Done Successfully.")
      }else{
        toastr.error(response.data.message);
        this.setState({loading1: false});
      }

   })
   .catch(error => {
             console.log(error)
       toastr.error(error.response.data.message);
       this.setState({ loading1: false });
     })
 })
}


  this.assemblePosts= () => {
          let posts =this.state.posts.map((post) => {
              const { data1, loading } = this.state;
              this.setState({
        count: this.state.count + 1
      });

            return (

              {

                srno: this.state.count,
                action : <div style={{width:'80px'}}><Link className="btn btn-primary btn-sm" to={"/edit-quotation/"+base64_encode(post.id)}>
                  <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                  <Link className="btn btn-info btn-sm" to={"/view-quotation/"+base64_encode(post.id)}>
                  <i className="fa fa-eye"></i></Link>&nbsp;&nbsp;
                  <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Quotation Data?')){ this.deleteQuotation(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                  &nbsp;&nbsp;<button class=" btn btn-info btn-sm"><i class="fas fa-envelope"></i></button>
                  </div>
                ,
                quotation_no: post.quotation_no,
                customer: post.company_name,
                quotation_date: post.quotation_date ? moment(post.quotation_date).format("DD-MM-YYYY hh:mm:ss"): '',
                valid_until: post.valid_until ? moment(post.valid_until).format("DD-MM-YYYY hh:mm:ss"): '',
                subject:post.subject,
                total:post.product_info_grand_total,
              }

            )

          });

          return posts;

        }
      }
          render() {
              const { data, loading } = this.state;
              const { data2, loading1 } = this.state;

              const data1 = {

                columns: [

                  {
                    label:'SR No',
                    field:'srno',
                  },
                  {
                    label:'Action',
                    field: 'action',
                  },
                  {
                    label:'Quotation No',
                    field:'quotation_no',
                  },
                  {
                    label:'Customer',
                    field:'customer',
                  },
                  {
                    label:'Quotation Date',
                    field:'quotation_date',
                  },
                  {
                    label:'Valid Until',
                    field:'valid_until',
                  },
                  {
                    label:'Subject',
                    field:'subject',
                  },
                  {
                    label:'Total',
                    field:'total',
                  },

                ],
                rows:this.state.tableRows,
}
  //render(){
  //  const { data, loading } = this.state;
  return (
    <React.Fragment>
        <HorizontalLayout/>
      <div className="page-content">
        <div className="container-fluid">
            <div class="page-title-box d-flex align-items-center justify-content-between">
            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Sales</li>
                    <li className="breadcrumb-item active">Quotation</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-quotation" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>&nbsp;New Quotation</Link>
                    </li>&nbsp;
                    <li>

                      { loading1 ? <LoadingSpinner /> :<div className="btn-group">
                      <DropdownButton title="Actions" drop="left" variant="primary btn-sm">
                        <DropdownItem onClick={this.print_quotation_list}><i class="fa fa-print"></i> &nbsp;Print</DropdownItem>
                        <DropdownItem onClick={this.ExportToExcel}><i class="fas fa-file-export"></i> &nbsp;Export To Excel </DropdownItem>
                        <DropdownItem><Link to="export-quotation-data/pdf" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export To PDF</Link></DropdownItem>
                        <DropdownItem><Link to="export-quotation-data/html" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export As HTML </Link></DropdownItem>
                      </DropdownButton>
                    </div>}
                  </li>
                </ol>
            </div>
        </div>
          <Row id="pdfdiv">
            <Col className="col-12">
              <Card>
                <CardBody className="btn-sm">
                  <div>

                  {loading ?  <center><LoadingSpinner /></center> :

                      <MDBDataTable striped responsive bordered data={data1} style={{whiteSpace:'nowrap',border:'1px solid #e4e5e5'}}/>
                     }
                  </div>
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
export default ListQuotation
