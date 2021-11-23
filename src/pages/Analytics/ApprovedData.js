import React, { Component } from 'react';
import HorizontalLayout from "../../components/HorizontalLayout"
import {
  Card,
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
  Alert,
  Table,
} from 'reactstrap';
import { Link } from "react-router-dom"
import axios from 'axios';
import { MDBDataTable } from "mdbreact"
import LoadingSpinner from '../../components/LoadingSpinner';
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import moment from 'moment'

class ApprovedData extends Component {
  constructor(props){
    super(props);
    this.state= {
      posts: [],
      tableRows: [],
      loading1: false,
      count :0,
    }
    //this.handlePageChange = this.handlePageChange.bind(this);
     const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
    };

this.componentWillMount=async() => {
this.setState({ loading1: true }, () => {
  axios.get(`${process.env.REACT_APP_BASE_APIURL}statusWiseTests?approved_status=Approved`, { headers: headers})

    .then(response => response.data.data)
    .then(data => {

       // if (err) throw err;

       this.setState({ posts: data })
       this.setState({loading1: false});

    })

    .then(async() => {

       this.setState({ tableRows:this.assemblePosts()})
       this.setState({loading1: false});

    }).catch(error => {
      console.log(error)
        toastr.error(error.response.data.message);
        this.setState({ loading1: false });
      })

  })
}
this.assemblePosts= () => {
      let posts =this.state.posts.map((post,i) => {
            const { data1, loading } = this.state;
            this.setState({
      count: this.state.count + 1
    });
          return (

            {
              srno: this.state.count,
              aum_serial_no : post.booking_detail.aum_serial_no,
              p_sr_no: post.p_sr_no,
              receipte_date: moment(post.booking_detail.receipte_date).format('MM-DD-YYYY'),
              report_type: post.booking_detail.report_type,
              booking_no: post.booking_detail.booking_no,
              customer_name: post.booking_detail.customer_id.company_name,
              sample_name: post.booking_samples_detail.product_detail.product_name,
              pharmacopeia_name : post.booking_samples_detail.product_detail.pharmacopiea_detail.pharmacopeia_name,
              test_name : post.test_name,
              batch_no : post.booking_samples_detail.batch_no,
              chemist_name : post.chemist_detail.first_name+" "+post.chemist_detail.middle_name+" "+post.chemist_detail.last_name,
              label_claim : post.label_claim,
              result : post.result,
              approve_data_time:post.approval_date_time ? moment(post.approval_date_time).format('DD-MM-YYYY hh:mm:ss') : '',
              unit : post.unit_detail.unit_name,
              method:post.method,
              min_limit : post.min_limit,
              max_limit: post.max_limit
            }

          )

        });

        return posts;
      }
    }
render() {
  const { data, loading } = this.state;
  const { data2, loading1 } = this.state;
  let {posts} =  this.state;
  const data1 = {

    columns: [

      {
        label:'SR No',
        field:'srno',
      },
      {
        label:'Aum Sr. No.',
        field:'aum_serial_no',
      },
      {
        label:'P Sr. No.',
        field:'p_sr_no',
      },
      {
        label:'Receipt Date',
        field:'receipte_date',
      },
      {
        label:'Report Type',
        field:'report_type',
      },
      {
        label:'Booking No',
        field:'booking_no',
      },
      {
        label:'Customer Name',
        field:'customer_name',
      },
      {
        label:'Sample Name',
        field:'sample_name',
      },
      {
        label:'Pharmacopeia',
        field:'pharmacopeia_name',
      },
      {
        label:'Test Name',
        field: 'test_name',
      },
      {
        label:'Batch No',
        field: 'batch_no',
      },

      {
        label:'Chemist Name',
        field: 'chemist_name',
      },

      {
        label:'Label Claim',
        field: 'label_claim',
      },

      {
        label:'Result',
        field: 'result',
      },
      {
        label:'Approved Date Time',
        field: 'approve_data_time',
      },

      {
        label:'Unit',
        field: 'unit',
      },

      {
        label:'Method',
        field: 'method',
      },

      {
        label:'Min Limit',
        field: 'min_limit',
      },
      {
        label:'Max Limit',
        field: 'max_limit',
      },

    ],
    rows:this.state.tableRows,
  }
  return (
    <React.Fragment>
      <HorizontalLayout />
      <div className="page-content">
        <Container fluid={true}>
          <Form onSubmit={ (e) => {
             this.ApproveTest(e) }} method="POST">
            <div className="page-title-box d-flex align-items-center justify-content-between">

              <div className="page-title">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                  <li className="breadcrumb-item">Analytics</li>
                  <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                  <li className="breadcrumb-item active">Approved Test Data</li>
                </ol>
              </div>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li><Link to="/dashboard" className="btn btn-dark btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                </ol>
              </div>

            </div>
            { loading1 ? <center><LoadingSpinner /></center> :
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <MDBDataTable striped responsive bordered data={data1} style={{textAlign:'center'}} small/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          }
            </Form>
            </Container>
            </div>
    </React.Fragment>
  )
}

}

export default ApprovedData
