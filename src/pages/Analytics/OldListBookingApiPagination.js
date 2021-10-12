import React, { useState, Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,Dropdown,
    DropdownMenu,DropdownItem,
    Dropdownpost,
    DropdownToggle,
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
import Moment from 'moment';
import Pagination from "react-js-pagination";
import * as XLSX from 'xlsx';

class ListBooking extends Component{

  constructor(props){
    super(props);
    this.state= {
      booking: [],
      activePage: 1,
      itemsCountPerPage: 10,
      totalItemsCount: 1,
    }
    //this.handlePageChange = this.handlePageChange.bind(this);
     const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
    };

    const del_headers = {
      'Authorization' : "Bearer "+localStorage.getItem('token')
    };

 this.componentDidMount = () => {
  this.setState({ loading: true }, () => {

     axios.get(`${process.env.REACT_APP_BASE_APIURL}listBooking`, { headers: headers})

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
 this.handlePageChange = (pageNumber) =>{
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
  }
}
  render(){
    const { data, loading } = this.state;
    const { data1, loading1 } = this.state;
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
                    <li><Link to="#" className="btn btn-primary">Booking Rate</Link></li>&nbsp;
                    <li>
                      <Link to="/add-booking" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Booking</Link>
                    </li>&nbsp;
                   {loading1 ?  <center><LoadingSpinner /></center> :
                    <li>
                        <div className="btn-group">
                          <DropdownButton  title="Actions" drop="left">
                            <DropdownItem><i class="fa fa-barcode"></i> &nbsp;Generate Barcode</DropdownItem>
                            <DropdownItem><i class="fa fa-file"></i> &nbsp;Generate ROA</DropdownItem>
                            <DropdownItem><i class="fas fa-file"></i> &nbsp;Generate COA</DropdownItem>
                            <DropdownItem><i class="fas fa-file-export"></i> &nbsp;Export To Excel</DropdownItem>
                          </DropdownButton>

                        </div>
                    </li>}
                </ol>
            </div>
        </div>
          <Row id="pdfdiv">
            <Col className="col-12">
              <Card>
                <CardBody>
                  <div>
                  {loading ?  <center><LoadingSpinner /></center> :
                      <table className="table table-bordered table-striped dataTable">
                         <thead>
                           <tr>
                             <th scope="col">SR No</th>
                             <th scope="col">COA Print</th>
                             <th scope="col">Aum SR No</th>
                             <th scope="col">Booking No</th>
                             <th scope="col">Product Type</th>
                             <th scope="col">Receipt Date</th>
                             <th scope="col">Product Name</th>
                             <th scope="col">Actions</th>
                           </tr>
                         </thead>
                         {this.state.booking.length >=1 ?
                         <tbody>
                           {
                                this.state.booking.map((post,index)=>{
                                  return(
                                    <tr>
                                      <th scope="row">{index+1}</th>

                               <td>{post.coa_print}</td>
                                      <td>{post.aum_serial_no}</td>
                                      <td>{post.booking_no}</td>
                                      <td>{post.product_type}</td>
                                      <td>{post.receipte_date}</td>
                                      <td>{post.product_name ? (post.product_name) : ('')}</td>
                                      <td><div><Link className="btn btn-primary" to={"/edit-booking/"+base64_encode(post.id)}>
                                        <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                                        <button class=" btn btn-danger" onClick={() => {if(window.confirm('Are you sure to Delete this Booking Data?')){ this.deleteBooking(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                                        &nbsp;&nbsp;<Link className="btn btn-info" to={"/view-booking/"+base64_encode(post.id)}>
                                        <i className="fa fa-eye"></i></Link></div></td>
                                    </tr>
                                  )
                               })
                             }
                         </tbody>
                        : <tr><td colspan="8"><p>No matching records found</p></td></tr>}
                         <tfoot>
                           <tr>
                             <th scope="col">SR No</th>
                             <th scope="col">COA Print</th>
                             <th scope="col">Aum SR No</th>
                             <th scope="col">Booking No</th>
                             <th scope="col">Product Type</th>
                             <th scope="col">Receipt Date</th>
                             <th scope="col">Product Name</th>
                             <th scope="col">Actions</th>
                           </tr>
                         </tfoot>
                      </table>
                     }
                    <div>
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                      />
                    </div>
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
export default ListBooking
