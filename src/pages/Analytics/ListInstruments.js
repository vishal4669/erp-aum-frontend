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
import moment from 'moment'

class ListInstruments extends Component{

  constructor(props){
    super(props);
    this.state= {
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

 this.componentWillMount=async() => {
    this.setState({ loading: true }, () => {
     axios.get(`${process.env.REACT_APP_BASE_APIURL}listInstrument`, { headers: headers})

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
          /* if(error.data.status == 401 && error.data.success == true) {
              window.location.href = '/';
             toastr.error("Token is Expired");
           } else {*/
              toastr.error(error.response.data.message);
          //  }
           this.setState({ loading: false });
         })

     })
 }

this.deleteInstrument = async(instrument_id) =>{
            this.setState({ loading: true }, () => {
               axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteInstrument/`+instrument_id,null, { headers: del_headers})
              .then(response => {
                      if(response.data.success == true){
                        //need to refresh page after delete
                        props.history.push('/all-instruments');
                        props.history.push('/instruments');
                        toastr.success(response.data.message);
                        this.setState({loading: false});
                    }else{
                      props.history.push('/instruments');
                      toastr.error(response.data.message);
                      this.setState({loading: false});
                    }
              })
            })
 }

  this.assemblePosts= () => {
          let posts =this.state.posts.map((post) => {
              const { data1, loading } = this.state;
              this.setState({
        count: this.state.count + 1
      });
      let last_calibration_date = post.last_calibration_date ? moment(post.last_calibration_date).format("DD-MM-YYYY") : '';
      let calibration_due_date = post.calibration_due_date ? moment(post.calibration_due_date).format("DD-MM-YYYY") : '';
      let service_due_date = post.service_due_date ? moment(post.service_due_date).format("DD-MM-YYYY") : '';
      let last_service_date = post.last_service_date ? moment(post.last_service_date).format("DD-MM-YYYY") : '';
            return (

              {

                srno: this.state.count,
                instrument_name: post.instrument_name,
                code: post.instrument_code,
                make: post.make,
                model: post.model,
                last_service_date: last_service_date,
                service_due_date: service_due_date,
                last_calibration_date: last_calibration_date,
                calibration_due_date: calibration_due_date,
                action : <div><Link className="btn btn-primary btn-sm" to={"/edit-instrument/"+base64_encode(post.id)}>
                  <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
                  <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Instrument Data?')){ this.deleteInstrument(post.id)}}}><i class="fas fa-trash-alt"></i></button>
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
              const { data2, loading1 } = this.state;

              const data1 = {

                columns: [

                  {
                    label:'SR No',
                    field:'srno',
                  },
                  {
                    label:'Instrument Name',
                    field:'instrument_name',
                  },
                  {
                    label:'Code',
                    field:'code',
                  },
                  {
                    label:'Make',
                    field:'make',
                  },
                  {
                    label:'Model',
                    field:'model',
                  },
                  {
                    label:'Last Service Date',
                    field:'last_service_date',
                  },
                  {
                    label:'Service Due Date',
                    field:'service_due_date',
                  },
                  {
                    label:'Last Calibration Date',
                    field:'last_calibration_date',
                  },
                  {
                    label:'Calibration Due Date',
                    field:'calibration_due_date',
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
                    <li className="breadcrumb-item">Analytics</li>
                    <li className="breadcrumb-item active">Instruments</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li>
                      <Link to="/add-instrument" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Instrument</Link>
                    </li>
                </ol>
            </div>
        </div>
          <Row id="pdfdiv">
            <Col className="col-12">
              <Card>
                <CardBody>
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
export default ListInstruments
