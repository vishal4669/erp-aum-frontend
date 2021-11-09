import React, { Component, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Row, Col, Card, CardBody,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown,Button} from 'reactstrap';
import { DropdownButton } from 'react-bootstrap';
import axios from 'axios'
import '../Tables/datatables.scss';
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from 'react-router-dom';
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';

//const ListEmployee = () => {
  class ListEmployee extends Component {
  constructor(props) {

      super(props);
      this.state = {
          posts: [],
          tableRows: [],
          loading: false,
          count :0
        };

      const headers = {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer '+localStorage.getItem('token')
        };

        const del_headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')
        };

        {/*Delete Category data from list*/}
        this.deleteEmployee = async(employee_id) =>{
          this.setState({ loading: true }, () => {
             axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteEmployee/`+employee_id,null, { headers: del_headers})
            .then(response => {
                    if(response.data.success == true){
                      //need to refresh page after delete
                      props.history.push('/all-employee');
                       props.history.push('/employee');
                      toastr.success(response.data.message);
                      this.setState({loading: false});
                  }else{
                    props.history.push('/employee');
                    toastr.error(response.data.message);
                    this.setState({loading: false});
                  }
            })
        })
        }

    //Mount the department List records...
      this.componentWillMount = async() => {


      this.setState({ loading: true }, () => {
         axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee`, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                this.setState({ posts: response.data.data });
             }else{
               toastr.error(response.data.message);
             }
            this.setState({loading: false});

          })
          .then(async() => {
             this.setState({ tableRows:this.assemblePosts()});
             this.setState({ loading: false });
          }).catch(error => {
              toastr.error(error.response.data.message);
              this.setState({ loading: false });
            })
        })
    }

      this.assemblePosts= () => {

        let posts = this.state.posts.map((post) => {
          //var company_data =  post.company[0]

         /* if(post.company[0].position_title !== null || post.company[0].position_title !== ''){

              console.log(post.company[0].position_title)
          }
          else{

            console.log("No Position")
          }*/
          this.setState({
      count: this.state.count + 1
    });
          return (
            {

              srno: this.state.count,
              name: post.first_name+" "+post.middle_name+" "+post.last_name,
              username: post.username,
              position_title: post.position_title,
              mobile: post.mobile,
              email: post.email,
              action : <div className="btn-group">
                          <DropdownButton variant="dark" title="Actions" drop="left">
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print Offer Letter</DropdownItem>
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print Appointment Letter</DropdownItem>
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print Experience Letter</DropdownItem>
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;All Rights Print</DropdownItem>
                            <DropdownItem><i class="fa fa-edit"></i><Link to={"/edit-employee/"+base64_encode(post.id)}> &nbsp;Edit </Link></DropdownItem>
                            <DropdownItem><i class="fa fa-trash"></i> &nbsp;Delete </DropdownItem>
                            <DropdownItem><i class="fa fa-eye"></i> <Link to={"/view-employee/"+base64_encode(post.id)}>&nbsp;View </Link></DropdownItem>
                          </DropdownButton>
                        
                        </div>
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
              label:'Name',
              field:'name',
            },
            {
              label:'Username',
              field:'username',
            },
            {
              label:'Position',
              field:'position_title',
            },
            {
              label:'Mobile',
              field:'mobile',
            },
            {
              label:'email',
              field:'email',
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
                          <li className="breadcrumb-item">HR</li>
                          <li className="breadcrumb-item active">Employee</li>
                      </ol>
                  </div>
                  <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                          <li><a href="" className="btn btn-primary"><i className="fa fa-check">&nbsp;Assign Rights</i></a></li>&nbsp;
                          <li><a href="/add-employee" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>
                         &nbsp;New Employee</a></li>
                      </ol>
                  </div>
              </div>

                <Row>
                  <Col className="col-12">
                    <Card>
                      <CardBody>
                        {loading ?  <center><LoadingSpinner /></center> :  <MDBDataTable striped bordered data={data1} /> }
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

export default ListEmployee
