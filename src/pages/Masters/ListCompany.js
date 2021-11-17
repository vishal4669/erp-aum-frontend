import React, { useEffect, Component, useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown } from "reactstrap"

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

class ListCompany extends React.Component {

    constructor(props) {

        super(props);

        this.state= {

          posts: [],

          //isLoading:false,

          loading : false,

          data1 : [],

          tableRows: [],
          count :0

        };
        const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

        const del_headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

    this.deleteCompany= (company_id) =>{
      this.setState({ loading: true }, () => {
     axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteCompany/`+company_id,null, { headers: del_headers})
    .then(response => {
      if(response.data.success == true){
        props.history.push('/all-company');
        props.history.push('/company');
        toastr.success(response.data.message);
        this.setState({loading: false});
    }
    else{
                props.history.push('/company');
                toastr.error(response.data.message);
                this.setState({loading: false});
            }
    })
      .catch((error) => {
                this.setState({loading: false});
                toastr.error(error.response.data.message);
      })
    })
    }

      this.componentWillMount=async() => {
                    this.setState({ loading: true }, () => {
        axios.get(`${process.env.REACT_APP_BASE_APIURL}listCompany`, { headers: headers})

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

      this.assemblePosts= () => {
        let posts =this.state.posts.map((post) => {
            const { data1, loading } = this.state;
            this.setState({
      count: this.state.count + 1
    });
          return (

            {

              srno: this.state.count,

              name: post.company_name,

              action : <div><Link className="btn btn-primary btn-sm" to={"/edit-company/"+base64_encode(post.id)}>
              <i className="fa fa-edit"></i></Link>{/*nbsp;&nbsp;{loading ? <a className="btn btn-primary w-100 waves-effect waves-light"
                           > <LoadingSpinner /> </a>  :
              <button class=" btn btn-danger" onClick={() => {if(window.confirm('Are you sure to Delete this Company?')){ this.deleteCompany(post.id)}}}><i class="fas fa-trash-alt"></i></button>}*/}
              </div>
              ,

            }

          )

        });

        return posts;

      }
    }


    render() {
        const { data, loading } = this.state;

        const data1 = {

          columns: [

            {

              label:'SR No',

              field:'srno',

            },

            {

              label:'Company Name',

              field:'name',

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
                          <li className="breadcrumb-item">Masters</li>
                          <li className="breadcrumb-item active">Company</li>
                      </ol>
                  </div>
                  <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                          <li>
                            <Link to="/add-company" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Company</Link>
                          </li>
                      </ol>
                  </div>
              </div>

                <Row>
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



export default ListCompany
