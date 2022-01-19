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
import Moment from 'moment';
import Pagination from "react-js-pagination";
import * as XLSX from 'xlsx';
class ListCustomer extends Component{

  constructor(props){
    super(props);
    this.state= {
    //  customer: [],
    //  activePage: 1,
    //  itemsCountPerPage: 10,
    //  totalItemsCount: 1,
    posts: [],
    tableRows: [],
    loading: false,
    loading1: false,
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

     axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer`, { headers: headers})

              .then(response => {
                  if(response.data.success == true){
                    this.setState({customer:response.data.data.data,
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

 this.componentWillMount=async() => {
    this.setState({ loading: true }, () => {
     axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer`, { headers: headers})

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

this.deleteCustomer = async(customer_id) =>{
            this.setState({ loading: true }, () => {
               axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteCustomer/`+customer_id,null, { headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-customer');
                        props.history.push('/customer');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/customer');
                      toastr.error(response.data.message);
                      this.setState({loading: false});
                    }
              })
            })
 }

 this.print_customer_list = () => {
   window.print()
 }
 this.ExportToExcel = () => {
   this.setState({ loading1: true }, () => {
   axios.get(`${process.env.REACT_APP_BASE_APIURL}exportCustomerData`, { headers: headers})

   .then(response => {
       if(response.data.success == true){
          var customer_data = response.data.data.map((post,index)=>({
             "SR No" : index+1,
             "Name" : post.Company_name,
             "Contact Person" : post.contact_person_name,
             "Tally Alias Name" : post.tally_alias_name,
             "Account/Admin Contact No." : post.home_contact_no.account_admin_contact_no,
             "QA Contact No." : post.other_contact_no.qa_contact_no,
             "QC Contact No." : post.home_contact_no.home_qc_contact_no,
            }))
         const sheet = XLSX.utils.json_to_sheet(customer_data);
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
         XLSX.writeFile(workbook, `CustomerData.csv`);
         this.setState({loading1: false});
         toastr.success("Customer List Export To Excel Done Successfully.")
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

 /*this.handlePageChange = (pageNumber) =>{
   this.setState({ loading: true }, () => {
    this.handlePageChange.bind(this)
    //this.setState({activePage: pageNumber});
    axios.get(`${process.env.REACT_APP_BASE_APIURL}listCustomer?page=`+pageNumber, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                this.setState({customer:response.data.data.data,
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

      let is_active = post.is_active ? ("Active") : ("Inactive");
            return (

              {

                srno: this.state.count,
                action : <div><Link className="btn btn-primary btn-sm" to={"/edit-customer/"+base64_encode(post.id)}>
                  <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                  <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Customer Data?')){ this.deleteCustomer(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                  &nbsp;&nbsp;<Link className="btn btn-info btn-sm" to={"/view-customer/"+base64_encode(post.id)}>
                  <i className="fa fa-eye"></i></Link></div>

                ,
                company_name: post.company_name,
                contact_person_name: post.contact_person_name,
                contact_type: post.contact_type,
                tally_alias_name: post.tally_alias_name,
                home_contact_no:post.home_contact_no,
                other_contact_no:post.other_contact_no,
                home_qc_contact_no:post.home_qc_contact_no,
                home_landline:post.home_landline,
                home_email:post.home_email,
                other_qc_email:post.other_qc_email,
                other_email:post.other_email,
                corporate_address:
                      post.home_street_1 +","+
                      post.home_street_2 +","+
                      post.home_city+","+
                      post.home_state +","+
                      post.home_country,
                correspondence_address:
                      post.other_street_1+","+
                      post.other_street_2+","+
                      post.other_city+","+
                      post.other_state+","+
                      post.other_country,
                gst_number:post.gst_number,
                is_active: is_active,
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
                    label:'Comapny Name',
                    field:'company_name',
                  },
                  {
                    label:'Contact Person Name',
                    field:'contact_person_name',
                  },
                  {
                    label:'Contact Type',
                    field:'contact_type',
                  },
                  {
                    label:'Tally Alias Name',
                    field:'tally_alias_name',
                  },
                  {
                    label:'Account/Admin Contact No',
                    field:'home_contact_no',
                  },
                  {
                    label:'QA Contact No.',
                    field:'other_contact_no',
                  },
                  {
                    label:'QC Contact No.',
                    field:'home_qc_contact_no',
                  },
                  {
                    label:'Landline',
                    field:'home_landline',
                  },
                  {
                    label:'Account/Admin Email',
                    field:'home_email',
                  },
                  {
                    label:'QC Email',
                    field:'other_qc_email',
                  },
                  {
                    label:'QA Email',
                    field:'other_email',
                  },
                  {
                    label:'Corporate Address',
                    field:'corporate_address',
                  },
                  {
                    label:'Correspondence Address',
                    field:'correspondence_address',
                  },
                  {
                    label:'GST No',
                    field:'gst_number',
                  },
                  {
                    label:'Status',
                    field:'is_active',
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
                    <li className="breadcrumb-item active">Customer</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-customer" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>&nbsp;New Customer</Link>
                    </li>&nbsp;
                    <li>

                      { loading1 ? <LoadingSpinner /> :<div className="btn-group">
                      <DropdownButton title="Actions" drop="left" variant="primary btn-sm">
                        <DropdownItem onClick={this.print_customer_list}><i class="fa fa-print"></i> &nbsp;Print</DropdownItem>
                        <DropdownItem  onClick={this.ExportToExcel}><i class="fas fa-file-export"></i> &nbsp;Export To Excel </DropdownItem>
                        <DropdownItem><Link to="/export-customer-data/pdf" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export To PDF</Link></DropdownItem>
                        <DropdownItem><Link to="/export-customer-data/html" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export As HTML </Link></DropdownItem>
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
                  {/*<table className="table table-bordered table-striped dataTable">
                     <thead>
                       <tr>
                         <th scope="col">SR No</th>
                         <th scope="col">Comapny Name</th>
                         <th scope="col">Contact Person Name</th>
                         <th scope="col">Contact Type</th>
                         <th scope="col">Tally Alias Name</th>
                         <th scope="col">Contact No</th>
                         <th scope="col">Status</th>
                         <th scope="col">Actions</th>
                       </tr>
                     </thead>
                     {this.state.customer.length >=1 ?
                     <tbody>
                       {
                            this.state.customer.map((post,index)=>{

                              return(
                                <tr>
                                  <th scope="row">{index+1}</th>
                                  <td>{post.company_name}</td>
                                  <td>{post.contact_person_name}</td>
                                  <td>{post.contact_type}</td>
                                  <td>{post.tally_alias_name}</td>
                                  <td>{post.contact_no}</td>
                                  <td>{post.is_active ? ("Active") : ("Inactive")}</td>
                                  <td><div><Link className="btn btn-primary" to={"/edit-customer/"+base64_encode(post.id)}>
                                    <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                                    <button class=" btn btn-danger" onClick={() => {if(window.confirm('Are you sure to Delete this Customer Data?')){ this.deleteCustomer(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                                    &nbsp;&nbsp;<Link className="btn btn-info" to={"/view-customer/"+base64_encode(post.id)}>
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
                  </table>*/}
                  {loading ?  <center><LoadingSpinner /></center> :

                      <MDBDataTable striped responsive bordered data={data1} style={{whiteSpace:'nowrap',border:'1px solid #e4e5e5'}}/>
                     }
                    {/*<div>
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                      />
                    </div>*/}
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
export default ListCustomer
