import React, { useState, Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,Dropdown,
    DropdownMenu,DropdownItem,
    Dropdownpost,
    DropdownToggle,
    ButtonDropdown,Button } from "reactstrap"
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
import Moment from 'moment';
import Pagination from "react-js-pagination";
import * as XLSX from 'xlsx';

class ListBooking extends Component{

  constructor(props){
    super(props);
    this.state= {
      posts: [],
      tableRows: [],
      loading: false,
      loading1: false,
      ExportPDFData:[],
      count :0
    }
    //this.handlePageChange = this.handlePageChange.bind(this);
     const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
    };

    const del_headers = {
      'Authorization' : "Bearer "+localStorage.getItem('token')
    };

/* this.componentDidMount = () => {
  this.setState({ loading: true }, () => {

     axios.get(`${process.env.REACT_APP_BASE_APIURL}listBooking`, { headers: headers})

              .then(response => {
                  if(response.data.success == true){
                    this.setState({posts:response.data.data});
                      //itemsCountPerPage : response.data.data.per_page,
                    //  totalItemsCount: response.data.data.total,
                      //activePage:response.data.data.current_page});
                     this.setState({loading: false});
                 }else{
                   toastr.error(response.data.message);
                   this.setState({loading: false});

                 }
             })
   })
 }*/

 this.componentWillMount=async() => {
               this.setState({ loading: true }, () => {
   axios.get(`${process.env.REACT_APP_BASE_APIURL}listBooking`, { headers: headers})

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
         toastr.error(error.response.data.message);
         this.setState({ loading: false });
       })

   })
 }

 this.ExportToExcel = () => {
   this.setState({ loading1: true }, () => {
   axios.get(`${process.env.REACT_APP_BASE_APIURL}exportlist`, { headers: headers})

   .then(response => {
       if(response.data.success == true){
          var booking_data = response.data.data.map((post,index)=>({
            /* "SR No" : index+1,
             "COA Print" : post.pharmacopeia.pharmacopeia_name || [],
             "Aum Sr. No." : post.product_name || '',
             "Booking No" : post.product_generic || '',
             "Type" : post.generic.generic_product_name || '',
             "Receipt Date" : post.sample_description || '',
             "Product Name" : post.packing_detail || '',
             "Company" : post.marker_specification || '',
             "Generic Name" :,
             "Batch No" :,
             "Report No.":,
             "Status":,
             "Release Date" :,
             "Billing Date" :,
             "Bill No":,
             "Amount":,
             "NABL Scope":,
             "Enter By" : post.created_by.first_name+" "+ post.created_by.middle_name + " " + post.created_by.last_name || [],
             "Enter Datetime" : post.created_at || '',
             "Modified By" : post.updated_by.first_name+" "+ post.updated_by.middle_name + " " + post.updated_by.last_name || [],
             "Modified Datetime" : post.updated_at || '',
             "List of Test":,
             "List Of Chemist":,
             "Block":,*/
            }))
         const sheet = XLSX.utils.json_to_sheet(booking_data);
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
         XLSX.writeFile(workbook, `ProductData.csv`);
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


this.deleteBooking = async(booking_id) =>{
            this.setState({ loading: true }, () => {
               axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteBooking/`+booking_id,null, { headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-booking');
                        props.history.push('/booking');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/booking');
                      toastr.error(response.data.message);
                      this.setState({loading: false});
                    }
              })
            })
 }
 /*this.handlePageChange = (pageNumber) =>{
   this.setState({ loading: true }, () => {
    this.handlePageChange.bind(this)
    //this.setState({activePage: pageNumber});
    axios.get(`${process.env.REACT_APP_BASE_APIURL}listBooking?page=`+pageNumber, { headers: headers})

          .then(response => {
              if(response.data.success == true){

                this.setState({booking:response.data.data.data,
                      itemsCountPerPage : response.data.data.per_page,
                      totalItemsCount: response.data.data.total,
                      activePage:response.data.data.current_page});
                     this.setState({loading: false});
             }else{
               toastr.error(response.data.message);
               this.setState({loading: false});
             }
         })
      })
  }*/

  this.assemblePosts= () => {
          let posts =this.state.posts.map((post) => {
              const { data1, loading } = this.state;
              this.setState({
        count: this.state.count + 1
      });
            return (

              {

                srno: this.state.count,
                generate_data: <div><Link className="btn btn-secondary btn-sm">
                ROA</Link>&nbsp;&nbsp;<Link className="btn btn-warning btn-sm">
                COA</Link>&nbsp;&nbsp;<Link className="btn btn-success btn-sm">
                <i className="fa fa-barcode"></i></Link></div>,
                coa_print: post.coa_print,
                aum_serial_no: post.aum_serial_no,
                booking_type: post.booking_type,
                booking_no: post.booking_no,
                product_type: post.product_generic,
                receipte_date: post.receipte_date,
                product_name : post.product_name,
                action : <div><Link className="btn btn-primary btn-sm" to={"/edit-booking/"+base64_encode(post.id)}>
                <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<Link className="btn btn-info btn-sm" to={"/view-booking/"+base64_encode(post.id)}>
                <i className="fa fa-eye"></i></Link>&nbsp;&nbsp;{loading ? <a className="btn btn-primary w-100 waves-effect waves-light"
                             > <LoadingSpinner /> </a>  :
                <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Booking Data?')){ this.deleteBooking(post.id)}}}><i class="fas fa-trash-alt"></i></button>}</div>

                ,

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
                    label:'Generate',
                    field:'generate_data',
                  },
                  {
                    label:'COA Print',
                    field:'coa_print',
                  },
                  {
                    label:'Aum SR No',
                    field:'aum_serial_no',
                  },
                  {
                    label:'Booking Type',
                    field:'booking_type',
                  },
                  {
                    label:'Booking No',
                    field:'booking_no',
                  },
                  {
                    label:'Product Type',
                    field:'product_type',
                  },
                  {
                    label:'Receipt Date',
                    field:'receipte_date',
                  },
                  {
                    label:'Product Name',
                    field:'product_name',
                  },
                  {
                    label:'Action',
                    field: 'action',
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
                    <li className="breadcrumb-item active">Booking</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="#" className="btn btn-primary"><i className="fa fa-envelope">&nbsp;SMS</i></Link></li>&nbsp;
                    <li><Link to="#" className="btn btn-primary"><i className="fa fa-envelope">&nbsp;Email</i></Link></li> &nbsp;
                    {/*<li><Link to="#" className="btn btn-primary">Booking Rate</Link></li>&nbsp;*/}
                    <li>
                      <Link to="/add-booking" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Booking</Link>
                    </li>&nbsp;
                    {/*<li>
                        <div className="btn-group">
                          <DropdownButton  title="Actions" drop="left">
                            <DropdownItem><i class="fa fa-barcode"></i> &nbsp;Generate Barcode</DropdownItem>
                            <DropdownItem><i class="fa fa-file"></i> &nbsp;Generate ROA</DropdownItem>
                            <DropdownItem><i class="fas fa-file"></i> &nbsp;Generate COA</DropdownItem>
                            <DropdownItem onClick={this.ExportToExcel}><i class="fas fa-file-export"></i> &nbsp;Export To Excel</DropdownItem>
                          </DropdownButton>

                        </div>
                    </li>*/}
                   {loading1 ?  <center><LoadingSpinner /></center> :
                     <li><Link to="#" className="btn btn-primary"><i class="fas fa-file-export"></i> &nbsp;Export To Excel</Link></li>
                    }
                </ol>
            </div>
        </div>
          <Row id="pdfdiv">
            <Col className="col-12">
              <Card>
                <CardBody>
                  { loading ? <center><LoadingSpinner /></center> :
                    <MDBDataTable striped bordered data={data1} />
                  }
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
export default ListBooking
