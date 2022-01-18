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
import moment from 'moment'
import * as XLSX from 'xlsx';
//import parse from "html-react-parser";
import ReactTooltip from "react-tooltip";
class ListMethod extends Component{

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
    //const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML} });

 this.componentWillMount=async() => {
    this.setState({ loading: true }, () => {
     axios.get(`${process.env.REACT_APP_BASE_APIURL}listMethod`, { headers: headers})

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

this.deleteMethod = async(method_id) =>{
            this.setState({ loading: true }, () => {
               axios.get(`${process.env.REACT_APP_BASE_APIURL}deleteMethod/`+method_id,{ headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-method');
                        props.history.push('/method');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/method');
                      toastr.error(response.data.message);
                      this.setState({loading: false});
                    }
              })
            })
 }

 this.ExportToExcel = () => {
   this.setState({ loading1: true }, () => {
   axios.get(`${process.env.REACT_APP_BASE_APIURL}listMethod`, { headers: headers})

   .then(response => {
       if(response.data.success == true){
          var method_data = response.data.data.map((post,index)=>({
             "SR No" : index+1,
             "Name" : post.name,
             "Type" :post.pharmacopeia.pharmacopeia_name ? post.pharmacopeia.pharmacopeia_name : '',
             "Description" : post.description,
            }))
         const sheet = XLSX.utils.json_to_sheet(method_data);
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
         XLSX.writeFile(workbook, `MethodData.csv`);
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

  this.assemblePosts= () => {
          let posts =this.state.posts.map((post) => {
              const { data1, loading } = this.state;
              this.setState({
        count: this.state.count + 1
      });

            return (

              {

                srno: this.state.count,
                name: post.name,
                type: post.pharmacopeia.pharmacopeia_name ? post.pharmacopeia.pharmacopeia_name : '' ,
                //description: renderHTML(post.description), 1st html parse
                //description : parse(post.description), 2nd html parse
                description : <div><button className="form-control btn btn-info btn-sm" data-tip={post.description} data-for={`registerTip${this.state.count}`}>
                              View Description</button><ReactTooltip id={`registerTip${this.state.count}`} className={"tooltip"} place="bottom" effect="float" type="dark" html={true}>
                              </ReactTooltip></div>,
                date: post.date ? moment(post.date).format('DD-MM-YYYY') : '',
                action : <div><Link className="btn btn-primary btn-sm" to={"/edit-method/"+base64_encode(post.id)}>
                  <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                  <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Method Data?')){ this.deleteMethod(post.id)}}}><i class="fas fa-trash-alt"></i></button>
                  &nbsp;&nbsp;<Link className="btn btn-info btn-sm" to={"/view-method/"+base64_encode(post.id)}>
                  <i className="fa fa-eye"></i></Link></div>
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
                    label:'Name',
                    field:'name',
                  },
                  {
                    label:'Type',
                    field:'type',
                  },
                  {
                    label:'Description',
                    field:'description',
                  },
                  {
                    label:'date',
                    field:'date',
                  },
                  {
                    label:'Action',
                    field: 'action',
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
                    <li className="breadcrumb-item">QA</li>
                    <li className="breadcrumb-item active">Method</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-method" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>&nbsp;New Method</Link>
                    </li>&nbsp;
                     {loading1 ?  <center><LoadingSpinner /></center> : <li><Button onClick={this.ExportToExcel} color="primary" className="btn btn-primary btn-sm"><i class="fas fa-file-export"></i> &nbsp;Export To Excel</Button></li>}
                </ol>
            </div>
        </div>
          <Row id="pdfdiv">
            <Col className="col-12">
              <Card>
                <CardBody className="btn-sm">
                  <div>
                  {loading ?  <center><LoadingSpinner /></center> :

                      <MDBDataTable striped bordered data={data1} />
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
export default ListMethod
