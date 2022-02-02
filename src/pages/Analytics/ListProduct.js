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
import moment from 'moment';
import Pagination from "react-js-pagination";
import * as XLSX from 'xlsx';

class ListProduct extends Component{

  constructor(props){
    super(props);
    this.state= {
      //product: [],
    //  activePage: 1,
      //itemsCountPerPage: 10,
      //totalItemsCount: 1,
      ExportPDFData:[],
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

 /*this.componentDidMount = () => {
  this.setState({ loading: true }, () => {

     axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct`, { headers: headers})

              .then(response => {
                  if(response.data.success == true){
                    this.setState({product:response.data.data.data,
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
     axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct`, { headers: headers})

       .then(response => response.data.data)
       .then(data => {

          // if (err) throw err;
          this.setState({ posts: data })
          this.setState({loading: false});

       })

       .then(async() => {

          this.setState({ tableRows:this.assemblePosts()})
        /*  const tableCard = document.getElementById('productData');
         const rows = tableCard.querySelectorAll('tr');

         rows.forEach((row) => {
           const val = parseInt(row.children[6].textContent);
             row.children[6].style.autoWidth = 'false';
             row.children[6].style.width = '600px';
             row.children[6].style.whiteSpace = 'wrap';
           })*/
          this.setState({loading: false});

       }).catch(error => {
         console.log(error)
           toastr.error(error.response.data.message);
           this.setState({ loading: false });
         })

     })
 }

this.deleteProduct = async(product_id) =>{
            this.setState({ loading: true }, () => {
               axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteProduct/`+product_id,null, { headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-products');
                        props.history.push('/products');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/products');
                      toastr.error(response.data.message);
                      this.setState({loading: false});
                    }
              })
            })
 }
 this.printProduct = () =>{
   window.print();
}
this.ExportToExcel = () => {
  this.setState({ loading1: true }, () => {
  axios.get(`${process.env.REACT_APP_BASE_APIURL}exportproductlist`, { headers: headers})

  .then(response => {
      if(response.data.success == true){
         var product_data = response.data.data.map((post,index)=>({
            "SR No" : index+1,
            "Pharmacopiea" : post.pharmacopeia.pharmacopeia_name || [],
            "Product Name" : post.product_name || '',
            "FP/RM/G" : post.product_generic || '',
            "Generic Name" : post.generic.generic_product_name || '',
            "Sample Description" : post.sample_description || '',
            "Packing Detail" : post.packing_detail || '',
            "Marker/Specification" : post.marker_specification || '',
            "Enter By" : post.created_by.first_name+" "+ post.created_by.middle_name + " " + post.created_by.last_name || [],
            "Enter Datetime" : post.created_at || '',
            "Modified By" : post.updated_by.first_name+" "+ post.updated_by.middle_name + " " + post.updated_by.last_name || [],
            "Modified Datetime" : post.updated_at || ''
           }))
        const sheet = XLSX.utils.json_to_sheet(product_data);
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

 /*this.handlePageChange = (pageNumber) =>{
   this.setState({ loading: true }, () => {
    this.handlePageChange.bind(this)
    //this.setState({activePage: pageNumber});
    axios.get(`${process.env.REACT_APP_BASE_APIURL}listproduct?page=`+pageNumber, { headers: headers})

          .then(response => {
              if(response.data.success == true){

                this.setState({product:response.data.data.data,
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
                action : <div><Link className="btn btn-primary btn-sm" to={"/edit-product/"+base64_encode(post.id)}>
                  <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<Link className="btn btn-info btn-sm" to={"/view-product/"+base64_encode(post.id)}>
                  <i className="fa fa-eye"></i></Link>&nbsp;&nbsp;
                  <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Product Data?')){ this.deleteProduct(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                  </div>

                ,
                pharmacopeia_name: post.pharmacopeia_name,
                product_name: post.product_name,
                product_generic: post.product_generic,
                generic_product_name: post.generic_product_name,
                packing_detail : post.packing_detail ? post.packing_detail.length >50 ? (post.packing_detail.substring(0,50)+'...') :post.packing_detail : '',
                sample_description : post.sample_description ? post.sample_description.length >50 ? (post.sample_description.substring(0,50)+'...') :post.sample_description : '',
                marker_specification: post.marker_specification,
                entered_by: post.entered_by,
                created_at: post.created_at ? moment(post.created_at).format('DD-MM-YYYY hh:mm:ss') : '',
                modified_by: post.modified_by,
                updated_at: post.updated_at ? moment(post.updated_at).format('DD-MM-YYYY hh:mm:ss') : '',
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
                    label:'Pharmacopiea',
                    field:'pharmacopeia_name',
                  },
                  {
                    label:'Product Name',
                    field:'product_name',
                  },
                  {
                    label:'FP/RM/G',
                    field:'product_generic',
                  },
                  {
                    label:'Generic Name',
                    field:'generic_product_name',
                  },
                  {
                    label:'Sample Description',
                    field:'sample_description',
                  },
                  {
                    label:'Packaging Detail',
                    field:'packing_detail',
                  },
                  {
                    label:'Marker Specifiction',
                    field:'marker_specification',
                  },
                  {
                    label:'Enter By',
                    field:'entered_by',
                  },

                  {
                    label:'Enter Datetime',
                    field:'created_at',
                  },

                  {
                    label:'Modified By',
                    field:'modified_by',
                  },

                  {
                    label:'Modified Datetime',
                    field:'updated_at',
                  },
                ],
                rows:this.state.tableRows,

}
  //render(){
  //  const { data, loading } = this.state;
  //  const { data1, loading1 } = this.state;
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
                    <li className="breadcrumb-item active">Products</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-product" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>&nbsp;New Product</Link>
                    </li>&nbsp;
                   {loading1 ?  <center><LoadingSpinner /></center> :
                    <li>
                        <div className="btn-group">
                          <DropdownButton  title="Actions" drop="left" variant="primary btn-sm">
                            <DropdownItem onClick={this.printProduct}><i class="fa fa-print"></i> &nbsp;Print</DropdownItem>
                            <DropdownItem onClick={this.ExportToExcel}><i class="fas fa-file-export"></i> &nbsp;Export to Excel</DropdownItem>
                            <DropdownItem><Link to="/export-product-data" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export To PDF</Link></DropdownItem>
                            <DropdownItem><Link to="/export-product-data-as-html" style={{color:"black"}}><i class="fas fa-file-export"></i> &nbsp;Export As HTML</Link></DropdownItem>
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
                  {/*<table className="table table-bordered table-striped dataTable">
                     <thead>
                       <tr>
                         <th scope="col">SR No</th>
                         <th scope="col">Pharmacopeia</th>
                         <th scope="col">Product Name</th>
                         <th scope="col">FP/RM/G</th>
                         <th scope="col">Marker Specifiction</th>
                         <th scope="col">Generic Name</th>
                         <th scope="col">Is Generic</th>
                         <th scope="col">Actions</th>
                       </tr>
                     </thead>
                     {this.state.product.length >=1 ?
                     <tbody>
                       {
                            this.state.product.map((post,index)=>{
                                  const pharma = post.pharmacopeia || []
                                  const generic = post.generic || []
                              return(
                                <tr>
                                  <th scope="row">{index+1}</th>

                           <td>{pharma.pharmacopeia_name}</td>
                                  <td>{post.product_name}</td>
                                  <td>{post.product_generic}</td>
                                  <td>{post.marker_specification}</td>
                                  <td>{generic.product_name}</td>
                                  <td>{post.is_generic ? ("Generic") : ("Non Generic")}</td>
                                  <td><div><Link className="btn btn-primary" to={"/edit-product/"+base64_encode(post.id)}>
                                    <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                                    <button class=" btn btn-danger" onClick={() => {if(window.confirm('Are you sure to Delete this Product Data?')){ this.deleteProduct(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                                    &nbsp;&nbsp;<Link className="btn btn-info" to={"/view-product/"+base64_encode(post.id)}>
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
                         <th scope="col">Pharmacopiea</th>
                         <th scope="col">Product Name</th>
                         <th scope="col">FP/RM/G</th>
                         <th scope="col">Marker Specifiction</th>
                         <th scope="col">Generic Name</th>
                         <th scope="col">Is Generic</th>
                         <th scope="col">Actions</th>
                       </tr>
                     </tfoot>
                  </table>*/}
                  {loading ?  <center><LoadingSpinner /></center> :
                    <MDBDataTable striped responsive bordered data={data1}
                    style={{whiteSpace:'nowrap',border:'1px solid #e4e5e5'}} id="productData"/>
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
export default ListProduct
