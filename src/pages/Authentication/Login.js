import PropTypes from 'prop-types'
import React, { useEffect,useState, Component } from "react"
import { Row, Col, Alert, Container ,CardBody,Card} from "reactstrap"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
// actions
import { loginUser, apiError, socialLogin } from "../../store/actions"
// import images
import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import Select from "react-select";

import LoadingSpinner from '../../components/LoadingSpinner';

//Import axios
import axios from 'axios'
//const Login = (props) => {
class Login extends Component{
props = "";
  constructor() {
    super();
    this.state = {
      data: [],
      options: [],
      data1: [],
      options1: [],
      loading: false,
    };
  }
// set and send company and year in localstorage and send to server
 //super();
   // handleValidSubmit
   handleValidSubmit = (event, values) => {
    //PostData(values);
  //Need to call the Laravel Login API here using axios
    this.setState({ loading: true }, () => {
      axios.post(`${process.env.REACT_APP_BASE_APIURL}login`, { username: values.username, password: values.password,selected_year: values.selected_year, company_id: values.company_id })
        .then(
        (response) => {
          if(response.data.success == true){
            //success login and save in session and redirect to url
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('username', response.data.data.user.email);
            localStorage.setItem('first_name', response.data.data.user.first_name);
            localStorage.setItem('last_name', response.data.data.user.last_name);
            localStorage.setItem('loggedin', 'true');
            localStorage.setItem('selected_year',values.selected_year);
            localStorage.setItem('company_id',values.company_id);
            this.props.history.push('/dashboard');
            toastr.success(response.data.message);
            this.setState({loading: false});
          }
          else {
            // success data is false need to set to true
            toastr.error(response.data.message);
            this.setState({loading: false});
          }
        })
        .catch( (error) => {
              toastr.error(error.response.data.message);
              this.setState({loading: false});

          })
    })

}

 componentDidMount(){
      this.fetchyear();
      this.fetchcompany();
      this.checklogin();
  }

 checklogin = () => {
const del_headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

}
    axios.get(`${process.env.REACT_APP_BASE_APIURL}user`,{headers: del_headers})
     .then(response => {

      if(response.data.status === 200 && response.data.success === true) {

                  window.location.href = '/dashboard';
                  document.getElementById('home_contianer').style.display = 'none';
              }
     if(response.data.status == 401 && response.data.success == true) {
        document.getElementById('home_contianer').style.display = 'block';
      }
    })


    .catch((error) => {
      //toastr.error(error.response.data.message);
      document.getElementById('home_contianer').style.display = 'block';
      this.setState({loading: false});
    })
  }

  fetchyear = () => {

   this.setState({ loading: true }, () => {
         axios.get(`${process.env.REACT_APP_BASE_APIURL}listYears`)
        .then(response => {return response.data.data})
          .then(data => {
                this.setState({options: data})
                this.setState({loading: false})
           })
          .catch((error) => {
              toastr.error(error.response.data.message);
              this.setState({loading: false})
          })
        })
  }

  fetchcompany = () => {
      this.setState({ loading: true }, () => {
           axios.get(`${process.env.REACT_APP_BASE_APIURL}listCompanies`)
          .then(response => {return response.data.data})
            .then(data1 => {
                  this.setState({options1: data1})
                  this.setState({loading: false})
             })
              .catch((error) => {
                  toastr.error(error.response.data.message);
                  this.setState({loading: false})
            })
      })
  }
render() {

  const { data, loading } = this.state;

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
        <h2><i className="fas fa-home"></i></h2>
        </Link>
      </div>
      {loading ? <center style={{marginTop:'300px'}}><h5><LoadingSpinner/></h5></center> :
      <div className="account-pages my-3 pt-sm-5" id="home_contianer">
                        <ToastContainer autoClose={1500}/>
        <Container>
          <Row>
            <Col lg={6}>
              <div className="text-center">
                <Link to="/" className="mb-5 d-block auth-logo" style={{marginLeft : '395px'}}>
                  <img src={logo} alt="" height="50" className="logo logo-dark" />
                  <img src={logolight} alt="" height="50" className="logo logo-light" />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">Sign in to continue to Aum Research Laboratories.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        this.handleValidSubmit(e, v)
                      }}
                    >
                      {this.props.error && typeof this.props.error === "string" ? (
                        <Alert color="danger">{this.props.error}</Alert>
                      ) : null}
                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          className="form-control"
                          placeholder="Enter Username"
                          type="text"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                       </div>

                      <div className="mb-3">
                        {loading ? <LoadingSpinner /> :
                          <AvField type="select" name="selected_year" label="Select Years" className="form-select" required>
                                <option value="">Select Year</option>
                                { this.state.options.map((option, key) => <option value={option} key={key} >{option}</option>) }
                            </AvField>
                          }
                       </div>

                      <div className="mb-3">
                           {loading ? <LoadingSpinner /> :
                              <AvField type="select" name="company_id" label="Select Company" className="form-select" required>
                                    <option value="">Select Company</option>
                                    { this.state.options1.map((option1, key) => <option value={option1.id} key={key} >{option1.company_name}</option>) }
                                </AvField>
                            }
                       </div>
                      <div className="mt-3">
                        {loading ? <a className="btn btn-primary w-100 waves-effect waves-light"
                           > <LoadingSpinner /> </a>  : <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit" > Log In </button> }
                      </div>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-3 text-center">
                <p>© {new Date().getFullYear()} Aum Research Laboratories. Crafted with <i
                  className="mdi mdi-heart text-danger"></i> by Divine Infosys
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    }
    </React.Fragment>
  )
}
}
const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}
export default withRouter(
  connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)
Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}
