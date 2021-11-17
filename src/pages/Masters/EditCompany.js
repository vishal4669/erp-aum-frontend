import React, { Component, useState } from "react"
import { MDBDataTable } from "mdbreact"
import {
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown, Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Form,
  Container,
  Label,
  Input,
  FormGroup,
  Button,
  Alert, } from "reactstrap"

import axios from 'axios'
import "../Tables/datatables.scss"
import HorizontalLayout from "../../components/HorizontalLayout"
import { Link } from "react-router-dom"
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';
const url = 'http://jsonplaceholder.typicode.com/posts';

class EditCompany extends Component {

    constructor(props) {

        super(props);


        this.state= {

          loading : false,
          loading1 : false,
          Name : '',
          data1 : [],

        };
        const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

const url = window.location.href
const company_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
const edit_company_id = url.substring(url.lastIndexOf('/') + 1)

this.componentDidMount=()=>{
    this.setState({ loading: true }, () => {
      axios.get(`${process.env.REACT_APP_BASE_APIURL}getCompany/`+company_id,{headers})
          .then(response => {
              this.setState({
                Name: response.data.data.company_name,
                 });
                 this.setState({loading: false});

          })
          .catch((error) => {
              this.setState({loading: false});
              toastr.error(error.response.data.message);
          })
      })
    }

this.Updatecompany=(e)=> {
    this.setState({ loading1: true }, () => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_APIURL}editCompany/`+company_id,{company_name : this.state.Name},{headers})
        .then(response => {
          if(response.data.success == true){
            this.props.history.push('/company')
            toastr.success(response.data.message);
            this.setState({loading1: false});
          }
          else{
                props.history.push('/edit-company/'+edit_company_id);
                toastr.error(response.data.message);
                this.setState({loading1: false});
            }
        })
        .catch((error) => {
              this.setState({loading1: false});
              toastr.error(error.response.data.message);
          })
    })
  }

    this.onChangeName = (e) => {
    this.setState({
        Name: e.target.value
    });
  }
    //constructor end
  }


    render() {

const { data, loading } = this.state;
const { data1, loading1 } = this.state;

        return (
           <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
         <Form onSubmit={(e) => {
                        this.Updatecompany(e) }} method="POST" id="AddCompany">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="#!">Home</a></li>
                    <li className="breadcrumb-item">Masters</li>
                    <li className="breadcrumb-item"><a href="/company">Company</a></li>
                    <li className="breadcrumb-item active">Edit Company</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><Link to="/company" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;

                    { loading1 ? <center><LoadingSpinner /></center> :<li><button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button></li>}
                </ol>
            </div>

        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Basic Info</i>
                    </Alert></h5>

                    <div className="mb-3 row">
                        <div className="form-group">
                            <div className="row">

                                <div className="col-md-12">
                                    <label className="required-field">Company Name</label>
                                    { loading ? <center><LoadingSpinner /></center> :<input type="text" value={this.state.Name} onChange={this.onChangeName} name="company_name" className="form-control" placeholder="Enter Company Name" required/> }
                                 </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
        )
      }

}



export default EditCompany
