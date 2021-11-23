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
import {decode as base64_decode, encode as base64_encode} from 'base-64';

class AnalyticsData extends Component {
  constructor(props){
    super(props);
    this.state= {
      posts: [],
      tableRows: [],
      loading: false,
      loading1: false,
      count :0,
      options : [],
      test_id: [],
      chemist_id : '',
    }
    //this.handlePageChange = this.handlePageChange.bind(this);
     const headers = {
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer '+localStorage.getItem('token')
    };

this.componentDidMount = () => {
  this.setState({ loading1: true }, () => {
    axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee?is_chemist=1`, { headers })
      .then(response => {
        this.setState({options: response.data.data})
        this.setState({loading1: false});
        //  { setLoading1(false) }
        })
        .catch((error) => {
          toastr.error(error.response.data.message);
          this.setState({loading1: false});
        })
  })
}

this.onAddingItem = (e) => {
  const test_id = this.state.test_id
    let index
    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      test_id.push(+e.target.value)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = test_id.indexOf(+e.target.value)
      test_id.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ test_id: test_id })
}
this.onChangeChemistId = (e) => {
  this.setState({
      chemist_id: e.target.value
  });
}

this.ReAssignTest = (e) => {
    e.preventDefault();
  this.setState({ loading: true }, () => {
    const data = {
      chemist_name : this.state.chemist_id,
      test_id :  this.state.test_id
    }
    console.log(data)

  if(this.state.test_id.length >= 1){
     axios.post(`${process.env.REACT_APP_BASE_APIURL}assignTests`, data, { headers })

       .then(response => {
         if (response.data && response.data.success == true) {
           props.history.push('dashboard');
           toastr.success(response.data.message);
           this.setState({loading: false});
         } else {
           props.history.push('/assign-test');
           toastr.error(response.data.message);
           this.setState({loading: false});
         }
       })
       .catch((error) => {
         toastr.error(error.response.data.message);
         this.setState({loading: false});
       })
   } else {
     toastr.error("Please Select Any One Test To Assign the Test");
     this.setState({loading: false});
   }

 })
}

this.componentWillMount=async() => {
this.setState({ loading1: true }, () => {
  axios.get(`${process.env.REACT_APP_BASE_APIURL}statusWiseTests?approved_status=Assigned`, { headers: headers})

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
              receipt_date: moment(post.booking_detail.receipte_date).format('MM-DD-YYYY'),
              report_type: post.booking_detail.report_type,
              booking_no: post.booking_detail.booking_no,
              customer_name: post.booking_detail.customer_id.company_name,
              sample_name: post.booking_samples_detail.product_detail.product_name,
              pharmacopeia_name : post.booking_samples_detail.product_detail.pharmacopiea_detail.pharmacopeia_name,
              test_name : post.test_name,
              chemist_name : post.chemist_detail.first_name+" "+post.chemist_detail.middle_name+" "+post.chemist_detail.last_name,
              assigned_date: post.assigned_date,
              add_result:<div><Link className="btn btn-warning btn-sm" to={"/add-test-result/"+base64_encode(post.id)} style={{width:"100px"}}>
                Add Result <i className="fa fa-share"></i></Link></div>
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
        field:'receipt_date',
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
        label:'Chemist Name',
        field: 'chemist_name',
      },
      {
        label:'Assigned Date',
        field: 'assigned_date',
      },
      {
        label:'Add Result',
        field: 'add_result',
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
             this.ReAssignTest(e) }} method="POST">
            <div className="page-title-box d-flex align-items-center justify-content-between">

              <div className="page-title">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                  <li className="breadcrumb-item">Analytics</li>
                  <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                  <li className="breadcrumb-item active">Analytics Data</li>
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

export default AnalyticsData
