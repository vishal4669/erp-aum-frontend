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
import $ from 'jquery';

//const ListEmployee = () => {
  class ListEmployee extends Component {
  constructor(props) {

      super(props);
      this.state = {
          posts: [],
          resignedUser: [],
          tableRows: [],
          tableRows1: [],
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

        this.showGrid = (e) => {
          if(e.target.value == 'resigned_employee_grid'){
            this.resigned_employee_list();
            $("#bydefault_employee_list").css("display","none");
            $("#resigned_employee_list").css("display","block");
          } else {
            this.employeeList();
            $("#bydefault_employee_list").css("display","block");
            $("#resigned_employee_list").css("display","none");
          }
        }

    //Mount the department List records...
      this.componentWillMount = async() => {
        this.employeeList();
        //this.resigned_employee_list();
      }

    this.employeeList = () => {


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

    this.resigned_employee_list = () => {
      this.setState({ loading: true }, () => {
      axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee?is_resigned=1`, { headers: headers})

       .then(response => {
           if(response.data.success == true){
             this.setState({ resignedUser: response.data.data });
          }else{
            toastr.error(response.data.message);
          }
         this.setState({loading: false});

       })
       .then(async() => {
          this.setState({ tableRows1:this.assemblePosts1()});
          this.setState({ loading: false });
       }).catch(error => {
           toastr.error(error.response.data.message);
           this.setState({ loading: false });
         })
     })
    }

      this.assemblePosts= () => {

        let posts = this.state.posts.map((post) => {
          this.setState({
            count: this.state.count + 1
          });
    const { data, loading } = this.state;
          return (
            {

              srno: this.state.count,
              approved: post.is_approved == "Pending" || post.is_approved == "Rejected" ?
              <span className={post.is_approved == "Pending" ? "btn btn-warning btn-sm" : "btn btn-danger btn-sm"} style={{width:'100%'}}>
              {post.is_approved}</span> : <span className="btn btn-success btn-sm" style={{width:'100%'}}>{post.is_approved}</span>,
              print_action : <div>
                          <DropdownButton variant="success btn-sm" title="Print Actions">
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print Offer Letter</DropdownItem><br/>
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print Appointment Letter</DropdownItem><br/>
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print Experience Letter</DropdownItem><br/>
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;All Rights Print</DropdownItem>
                          </DropdownButton>

                        </div>,
              action : <div>
              <Link className="btn btn-primary btn-sm" to={"/edit-employee/"+base64_encode(post.id)}>
              <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<Link className="btn btn-info btn-sm" to={"/view-employee/"+base64_encode(post.id)}>
              <i className="fa fa-eye"></i></Link>&nbsp;&nbsp;{loading ? <a className="btn btn-primary w-100 waves-effect waves-light"
                           > <LoadingSpinner /> </a>  :
              <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Employee Data?')){ this.deleteEmployee(post.id)}}}><i class="fas fa-trash-alt"></i></button>}
                        </div>,
              company: post.company.company_name ? post.company.company_name : '',
              name: post.first_name+" "+post.middle_name+" "+post.last_name,
              username: post.company.username ? post.company.username : '',
              machine_code: post.machine_code,
              position_title: post.company.position_title ? post.company.position_title : '',
              department_name: post.company.department_name ? post.company.department_name : '',
              mobile: post.mobile,
              phone: post.phone,
              email: Array.isArray(post.address) && post.address.length ? post.address[0].email ? post.address[0].email : '' : '',
              address: Array.isArray(post.address) && post.address.length ? post.address[0].street1+","+post.address[0].street2+","+post.address[0].area+","+post.address[0].city : '',
              attendence: post.attendance == "1" ? 'Yes' : 'No',
              parent: post.company.first_name ? post.company.first_name+" "+post.company.last_name: '',

           }
          )
        });

        return posts;
      }

    this.assemblePosts1= () => {

      let posts = this.state.resignedUser.map((post) => {

        this.setState({
    count: this.state.count + 1
  });
  const { data, loading } = this.state;
        return (
          {

            srno: this.state.count,
            action : <div>
            <Link className="btn btn-primary btn-sm" to={"/edit-employee/"+base64_encode(post.id)}>
            <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;<Link className="btn btn-info btn-sm" to={"/view-employee/"+base64_encode(post.id)}>
            <i className="fa fa-eye"></i></Link>&nbsp;&nbsp;{loading ? <a className="btn btn-primary w-100 waves-effect waves-light"
                         > <LoadingSpinner /> </a>  :
            <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Employee Data?')){ this.deleteEmployee(post.id)}}}><i class="fas fa-trash-alt"></i></button>}
                      </div>,
            name: post.first_name+" "+post.middle_name+" "+post.last_name,
            username: post.company.username ? post.company.username : '',
            machine_code: post.machine_code,
            position_title: post.company.position_title ? post.company.position_title : '',
            department_name: post.company.department_name ? post.company.department_name : '',
            mobile: post.mobile,
            phone: post.phone,
            email: Array.isArray(post.address) && post.address.length ? post.address[0].email ? post.address[0].email : '' : '',
            address: Array.isArray(post.address) && post.address.length ? post.address[0].street1+","+post.address[0].street2+","+post.address[0].area+","+post.address[0].city : '',
            attendence: post.attendance == "1" ? 'Yes' : 'No',
            parent: post.company.first_name ? post.company.first_name+" "+post.company.last_name: '',

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
              label:'Action',
              field: 'action',
            },
            {
              label:'Print',
              field: 'print_action',
            },
            {
              label:'Approved',
              field:'approved',
            },
            {
              label:'Company',
              field:'company',
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
              label:'Machine Code',
              field:'machine_code',
            },
            {
              label:'Position',
              field:'position_title',
            },
            {
              label:'Department',
              field:'department_name',
            },
            {
              label:'Mobile',
              field:'mobile',
            },
            {
              label:'Phone',
              field:'phone',
            },
            {
              label:'Email',
              field:'email',
            },
            {
              label:'Address',
              field:'address',
            },
            {
              label:'Attendence',
              field:'attendence',
            },
            {
              label:'Parent',
              field:'parent',
            },
          ],

          rows:this.state.tableRows,
        }

        const data2 = {
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
              label:'Name',
              field:'name',
            },
            {
              label:'Username',
              field:'username',
            },
            {
              label:'Machine Code',
              field:'machine_code',
            },
            {
              label:'Position',
              field:'position_title',
            },
            {
              label:'Department',
              field:'department_name',
            },
            {
              label:'Mobile',
              field:'mobile',
            },
            {
              label:'Phone',
              field:'phone',
            },
            {
              label:'Email',
              field:'email',
            },
            {
              label:'Address',
              field:'address',
            },
            {
              label:'Attendence',
              field:'attendence',
            },
            {
              label:'Parent',
              field:'parent',
            },
          ],

          rows:this.state.tableRows1,
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
                          <li><label style={{verticalAlign:'sub'}}>Please Select List</label></li> &nbsp;&nbsp;
                          <li>
                            <select className='form-control btn-sm' onChange={e => this.showGrid(e)}>
                              <option value="employee_grid">Employee List Table</option>
                              <option value="resigned_employee_grid">Resigned Employee List Table</option>
                            </select>
                          </li> &nbsp;&nbsp;
                          <li><a href="/assign-right" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Assign Rights</i></a></li>&nbsp;
                          <li><a href="/add-employee" color="primary" className="btn btn-primary btn-sm"><i className="fa fa-plus"></i>
                         &nbsp;New Employee</a></li>
                      </ol>
                  </div>
              </div>

                <Row id="bydefault_employee_list">
                  <Col className="col-12">
                    <Card>
                      <CardBody className="btn-sm">
                        {loading ?  <center><LoadingSpinner /></center> :
                          <div><h4 style={{textAlign:'center'}}>Employee List</h4>
                          <MDBDataTable striped responsive bordered data={data1}
                          style={{whiteSpace:'nowrap',border:'1px solid #e4e5e5'}}/></div>
                      }
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row id="resigned_employee_list" style={{display:'none'}}>
                  <Col className="col-12">
                    <Card>
                      <CardBody className="btn-sm">
                        {loading ?  <center><LoadingSpinner /></center> :
                          <div><h4 style={{textAlign:'center'}}>Resigned Users List</h4>
                          <MDBDataTable striped responsive bordered data={data2}
                          style={{whiteSpace:'nowrap',border:'1px solid #e4e5e5'}}/></div>
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

export default ListEmployee
