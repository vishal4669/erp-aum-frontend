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

class AssignTest extends Component {
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

this.AssignTest = (e) => {
    e.preventDefault();
  this.setState({ loading1: true }, () => {
    const data = {
      chemist_name : this.state.chemist_id,
      test_id :  this.state.test_id
    }

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
           this.setState({loading1: false});
         }
       })
       .catch((error) => {
         toastr.error(error.response.data.message);
         this.setState({loading1: false});
       })
   } else {
     toastr.error("Please Select Any One Test To Assign the Test");
   }

 })
}

this.componentWillMount=async() => {
this.setState({ loading1: true }, () => {
  axios.get(`${process.env.REACT_APP_BASE_APIURL}listAssignTests`, { headers: headers})

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
              test_id: <div><input type="checkbox" name="test_id" value={post.test_id} onChange={this.onAddingItem.bind(this)}/></div>,
              aum_serial_no : post.aum_serial_no,
              p_sr_no: post.p_sr_no,
              receipt_date: moment(post.receipte_date).format('MM-DD-YYYY'),
              report_type: post.report_type,
              booking_no: post.booking_no,
              customer_name: post.customer_name,
              sample_name: post.sample_name,
              pharmacopeia_name : post.pharmacopeia,
              test_name : post.test_name,

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
        label:'',
        field:'test_id',
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

    ],
    rows:this.state.tableRows,
  }
  return (
    <React.Fragment>
      <HorizontalLayout />
      <div className="page-content">
        <Container fluid={true}>
          <Form onSubmit={ (e) => {
             this.AssignTest(e) }} method="POST">
            <div className="page-title-box d-flex align-items-center justify-content-between">

              <div className="page-title">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                  <li className="breadcrumb-item">Analytics</li>
                  <li className="breadcrumb-item"><a href="/booking">Booking</a></li>
                  <li className="breadcrumb-item active">Assign Tests</li>
                </ol>
              </div>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li><Link to="/booking" className="btn btn-dark btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></Link></li>&nbsp;
                  <li><Link to="" className="btn btn-primary btn-sm"><i className="fa fa-chevron-left">&nbsp;Reassign</i></Link></li>&nbsp;
                  {loading ? <center><LoadingSpinner /></center> :
                    <li>
                      <button type="submit" className="btn btn-success btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>
                  }
                </ol>
              </div>

            </div>
            { loading1 ? <center><LoadingSpinner /></center> :
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <h5> <Alert color="success" role="alert">
                      <i className="fa fa-comment">&nbsp;Basic Info</i>
                      </Alert>
                    </h5>
                    <div className="mb-3 row">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-md-12">
                            <select value={this.state.chemist_id} onChange={this.onChangeChemistId} className="form-select" name="chemist_id" required>
                             <option value="">Select Chemist</option>
                             { this.state.options.map((option, key) => <option value={option.id} key={key} >{option.first_name}</option>) }
                             </select>
                            </div>
                          </div>
                        </div>
                    </div>
                    {/*<table className="table table-bordered table-striped dataTable text-center">
                       <thead>
                         <tr>
                           <th scope="col">SR No</th>
                           <th scope="col"></th>
                           <th scope="col">Aum Sr. No.</th>
                           <th scope="col">P Sr. No.</th>
                           <th scope="col">Receipt Date</th>
                           <th scope="col">Report Type</th>
                           <th scope="col">Booking No</th>
                           <th scope="col">Customer Name</th>
                           <th scope="col">Sample Name</th>
                           <th scope="col">Pharmacopeia</th>
                           <th scope="col">Test Name</th>
                         </tr>
                       </thead>
                       <tbody>
                        <tr>
                          <td>1</td>
                          <td><input type="checkbox" name="test_id"/></td>
                          <td>48433</td>
                          <td>2.1</td>
                          <td>11/11/2021</td>
                          <td>FP</td>
                          <td>ARL/COA/FP/211111/046</td>
                          <td>Alicon Pharmaceutical Pvt Ltd</td>
                          <td>Acistat Liquid</td>
                          <td>IHS</td>
                          <td>Deglycyrrhizinated Liquorice (Eq to liquorice IP)</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td><input type="checkbox" name="test_id"/></td>
                          <td>48433</td>
                          <td>3</td>
                          <td>11/11/2021</td>
                          <td>FP</td>
                          <td>ARL/COA/FP/211111/046</td>
                          <td>Alicon Pharmaceutical Pvt Ltd</td>
                          <td>Acistat Liquid</td>
                          <td>IHS</td>
                          <td>Deglycyrrhizinated Liquorice (Eq to liquorice IP)</td>
                        </tr>
                       </tbody>
                    </table>*/}
                    <MDBDataTable striped bordered data={data1} style={{textAlign:'center'}} paging={false}  small/>

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

export default AssignTest
