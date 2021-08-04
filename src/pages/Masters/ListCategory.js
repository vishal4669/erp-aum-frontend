import React, { Component, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Row, Col, Card, CardBody,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown } from 'reactstrap';

import axios from 'axios'
import '../Tables/datatables.scss';
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from 'react-router-dom';
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';

class ListCategory extends Component {

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
        this.deleteCategory = async(category_id) =>{
          this.setState({ loading: true }, () => {
             axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteCategory/`+category_id,null, { headers: del_headers})
            .then(response => {
                    if(response.data.success == true){
                      //need to refresh page after delete
                      props.history.push('/all-category');
                       props.history.push('/category');
                      toastr.success(response.data.message);
                      this.setState({loading: false});
                  }else{
                    props.history.push('/category');
                    toastr.error(response.data.message);
                    this.setState({loading: false});
                  }
            })
        })
        }

    //Mount the department List records...
      this.componentWillMount = async() => {


      this.setState({ loading: true }, () => {
         axios.get(`${process.env.REACT_APP_BASE_APIURL}listCategory`, { headers: headers})

          .then(response => {
              if(response.data.success == true){
                this.setState({ posts: response.data.data });

             }else{
               toastr.error(response.data.message);
             }
            this.setState({loading: false});

          })
          .then(async() => {
             this.setState({ tableRows:this.assemblePosts(), isLoading:false });
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
          return (
            {

              srno: this.state.count,
              category_name: post.category_name,
              parent_name: post.parent_name,
              action : <div><Link className="btn btn-primary" to={"/edit-category/"+base64_encode(post.id)}>
              <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
              <button class=" btn btn-danger" onClick={() => {if(window.confirm('Are you sure to Delete this Category?')){ this.deleteCategory(post.id)}}}><i class="fas fa-trash-alt"></i></button></div>
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
              label:'Category Name',
              field:'category_name',
            },
            {
              label:'Parent Category',
              field:'parent_name',
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
                          <li className="breadcrumb-item active">Category</li>
                      </ol>
                  </div>
                  <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                          <li>
                            <Link to='/add-category' color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Category Master</Link>
                          </li>
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


export default ListCategory;
