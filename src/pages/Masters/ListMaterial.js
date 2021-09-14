import React, { useState, Component } from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,Dropdown,
    DropdownMenu,
    Dropdownpost,
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
import Moment from 'moment';
import Pagination from "react-js-pagination";
class ListMaterial extends Component{

  constructor(props){
    super(props);
    this.state= {
      material: [],
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

     axios.get(`${process.env.REACT_APP_BASE_APIURL}listMaterial`, { headers: headers})

              .then(response => {
                  if(response.data.success == true){
                    this.setState({material:response.data.data.data,
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

this.deleteMaterial = (material_id) =>{
            this.setState({ loading: true }, () => {
               axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteMaterial/`+material_id,null, { headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-material');
                        props.history.push('/material');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/material');
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
    axios.get(`${process.env.REACT_APP_BASE_APIURL}listMaterial?page=`+pageNumber, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                this.setState({material:response.data.data.data,
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
  return (
    <React.Fragment>
        <HorizontalLayout/>
      <div className="page-content">
        <div className="container-fluid">
            <div class="page-title-box d-flex align-items-center justify-content-between">
            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item active">Materials</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li> 
                      <Link to="/add-material" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Material</Link>
                    </li>&nbsp;
                </ol>
            </div>        
        </div>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <div>
                  {loading ?  <center><LoadingSpinner /></center> :
                    <table className="table table-striped">
                       <thead>
                         <tr>
                           <th scope="col">SR No</th>
                           <th scope="col">Material Type</th>
                           <th scope="col">Material Name</th>
                           <th scope="col">Parent Category Name</th>
                           <th scope="col">Sub Category Name</th>
                           <th scope="col">Sub Sub Category Name</th>
                           <th scope="col">Material Amount</th>
                           <th scope="col">Actions</th>
                         </tr>
                       </thead>
                      {this.state.material.length >=1 ?
                       <tbody>
                       {
                         this.state.material.map((post,index)=>{ 

                            return(
                              <tr>
                                <th scope="row">{index+1}</th>
                                <td>{post.material_type}</td>
                                <td>{post.material_name}</td>
                                <td>{post.parent_category_name}</td>
                                <td>{post.sub_category_name}</td>
                                <td>{post.sub_sub_category_name}</td>
                                <td>{post.material_amount}</td>
                                <td><div><Link className="btn btn-primary" to={"/edit-material/"+base64_encode(post.id+"/"+post.category_id+"/"+post.sub_category_id)}>
                                  <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                                  <button class=" btn btn-danger" onClick={() => {if(window.confirm('Are you sure to Delete this Material Data?')){ this.deleteMaterial(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                                  &nbsp;&nbsp;<Link className="btn btn-info" to={"/view-material/"+base64_encode(post.id)}>
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
                           <th scope="col">Material Type</th>
                           <th scope="col">Material Name</th>
                           <th scope="col">Parent Category Name</th>
                           <th scope="col">Sub Category Name</th>
                           <th scope="col">Sub Sub Category Name</th>
                           <th scope="col">Material Amount</th>
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
export default ListMaterial
