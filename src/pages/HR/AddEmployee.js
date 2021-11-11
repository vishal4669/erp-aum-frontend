import React, { useState, useEffect } from 'react';

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
} from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import $ from 'jquery';

function AddEmployee (props) {
  const [customchk, setcustomchk] = useState(true)
  const [toggleSwitch, settoggleSwitch] = useState(true)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)

       const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

        const [loading, setLoading] = useState(false);
        const [loading1, setLoading1] = useState(false);
        const [data, setData] = useState([]);
        const [data1, setData1] = useState([]);
        const [data2, setData2] = useState([]);
        const [data3, setData3] = useState([]);
        const [data4, setData4] = useState([]);
        const [data5, setData5] = useState([]);

        const [employee, setemployee] = useState({ title: 'Mr.',first_name: '',middle_name: '',last_name: '',username_email: '',password: '',
        blood_group: 'None',gender: 'M',birth_date: '',marital_status:'Single',photo: '',machine_code: '',phone: '',mobile: '',
        notes: '',attendance:'1',signature:'',booking_action:'0',booking_sms:'0',booking_email:'0',is_resigned:'0',booking_copy: '0',nationality:'',
        religion: '',caste: '',is_reporting_authority:'0', deposit: '0',booking_rate: '0',homestreet: '', area: '',
        pincode:'',country_id:'',emergency_contact_name:'',homestreet2: '',city: '',state_id:'',email: '',street:'',
        area1:'',pincode1:'',corr_country_id:'',emergency_contact_number:'',street2:'',city1:'',corr_state_id:'',website:'',
        mst_companies_id:'',reporting_authority_id: '',mst_departments_id:'',mst_positions_id:'',join_date:'',resign_date:'',
        bank_name:'',bank_branch_name:'',salary_per_month:'',bank_acc_number:'',aadhar_card_photo:'',aadhar_number:'',
        election_card_photo:'',election_card_number:'',pan_card_photo:'',pan_card_number:'',passport_photo:'',passport_number:'',
        driving_license_photo:'',driving_license_number:''
        });

        const [inputList, setInputList]  = useState([{ degree: "", university: "", from_year: "", to_year:"",
          percentage_grade: "",specialization:"" }]);
        const [employmentList, setEmploymentList]  = useState([{ organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
          annual_ctc: ""}]);

          // Photo Change Event
          const changePhotoHandler = event => {
            setemployee(prevState => ({ ...prevState, photo: event.target.files[0]}))
          };

          //Signature Change Event
          const changeSignatureHandler = event => {
            setemployee(prevState => ({ ...prevState, signature: event.target.files[0]}))
          };

          // Aadhar Card Change Event
          const changeAadharHandler = event => {
            setemployee(prevState => ({ ...prevState, aadhar_card_photo: event.target.files[0]}))
          };

          // Election Card Change Event
          const changeElectionCardHandler = event => {
            setemployee(prevState => ({ ...prevState, election_card_photo: event.target.files[0]}))
          };

          // Pan Card Change Event
          const changePanCardHandler = event => {
            setemployee(prevState => ({ ...prevState, pan_card_photo: event.target.files[0]}))
          };

          // Passport Change Event
          const changePassportHandler = event => {
            setemployee(prevState => ({ ...prevState, passport_photo: event.target.files[0]}))
          };

          // Driving Licence Change Event
          const changeDrivingLicHandler = event => {
            setemployee(prevState => ({ ...prevState, driving_license_photo: event.target.files[0]}))
          };

        useEffect(() => {
         fetchCountry();
         fetchStates();
         fetchCompany();
         fetchPosition();
         fetchDepartment();
         fetchReportingAuthority();
        }, []);

        const fetchCountry = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listCountries`,{headers})
            .then(response => {
                     setData(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchStates = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listStates`,{headers})
            .then(response => {
                     setData1(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchCompany = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listCompany?is_dropdown=1`,{headers})
            .then(response => {
                     setData2(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchPosition = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listPosition?is_dropdown=1`,{headers})
            .then(response => {
                     setData3(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchDepartment = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listDepartment?is_dropdown=1`,{headers})
            .then(response => {
                     setData4(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

        const fetchReportingAuthority = () => {
             {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}listEmployee?is_reporting_authority=1`,{headers})
            .then(response => {
                     setData5(response.data.data);
                     {setLoading1(false)}
               })
              .catch((error) => {
                  toastr.error(error.response.data.message);

                   {setLoading1(false)}
              })
        }

const InsertEmployee = (e)=>{
         e.preventDefault();

              const final_edu_detail = inputList;
              const final_emp_detail = employmentList;

             /*final_edu_detail.forEach(function(edu,index){

                 var edu_degree = final_edu_detail[index].degree;
                 var edu_university = final_edu_detail[index].universityname;
                 var edu_from_year = final_edu_detail[index].fromyear;
                 var edu_to_year = final_edu_detail[index].toyear;
                 var edu_percentage = final_edu_detail[index].percentagegrade;
                 var edu_specialization = final_edu_detail[index].degreespecialization;

             })*/
        {setLoading(true)};
        /*const data = {
            title:employee.title,
            first_name:employee.first_name,
            middle_name:employee.middle_name,
            last_name:employee.last_name,
            email:employee.username_email,
            password:employee.password,
            blood_group:employee.blood_group,
            gender:employee.gender,
            birth_date:employee.birth_date,
            marital_status:employee.marital_status,
            photo:employee.photo,
            machine_code:employee.machine_code,
            phone:employee.phone,
            mobile:employee.mobile,
            notes:employee.notes,
            attendance:employee.attendance,
            signature:employee.signature,
            booking_action:employee.booking_action,
            booking_sms:employee.booking_sms,
            booking_email:employee.booking_email,
            is_resigned:employee.is_resigned,
            booking_copy:employee.booking_copy,
            nationality:employee.nationality,
            religion:employee.religion,
            caste:employee.caste,
            is_reporting_authority:employee.is_reporting_authority,
            deposit:employee.deposit,
            booking_rate:employee.booking_rate,
            "address" : [
                      Permenant Address - Address Type 1
                       {
                        street1:employee.homestreet,
                        street2:employee.homestreet2,
                        area:employee.area,
                        city:employee.city,
                        pincode:employee.pincode,
                        mst_states_id:employee.state_id,
                        mst_countries_id:employee.country_id,
                        email:employee.email,
                        emergency_contact_name:employee.emergency_contact_name,
                        "address_type" : 1,
                       },
                       Correspondence Address - Address Type 2
                       {
                        street1:employee.street,
                        street2:employee.street2,
                        area:employee.area1,
                        city:employee.city1,
                        pincode:employee.pincode1,
                        mst_states_id:employee.corr_state_id,
                        mst_countries_id:employee.corr_country_id,
                        website:employee.website,
                        emergency_contact_number:employee.emergency_contact_number,
                        "address_type" : 2,
                       }
             ],
             "education": final_edu_detail,
             "employment": final_emp_detail,
             "company":{

                mst_companies_id:employee.mst_companies_id,
                reporting_authority_id: employee.reporting_authority_id,
                mst_departments_id:employee.mst_departments_id,
                mst_positions_id:employee.mst_positions_id,
                join_date:employee.join_date,
                resign_date:employee.resign_date,
                bank_name:employee.bank_name,
                bank_branch_name:employee.bank_branch_name,
                salary_per_month:employee.salary_per_month,
                bank_acc_number:employee.bank_acc_number,
             },
             "document":{
                aadhar_card_photo:employee.aadhar_card_photo,
                aadhar_number:employee.aadhar_number,
                election_card_photo:employee.election_card_photo,
                election_card_number:employee.election_card_number,
                pan_card_photo:employee.pan_card_photo,
                pan_card_number:employee.pan_card_number,
                passport_photo:employee.passport_photo,
                passport_number:employee.passport_number,
                driving_license_photo:employee.driving_license_photo,
                driving_license_number:employee.driving_license_number,
             },
        };*/

        const data = new FormData();

        // Personal Info

        data.append('title', employee.title);
        data.append('first_name', employee.first_name);
        data.append('middle_name', employee.middle_name);
        data.append('last_name', employee.last_name);
        data.append('email', employee.username_email);
        data.append('password', employee.password);
        data.append('blood_group', employee.blood_group);
        data.append('birth_date', employee.birth_date);
        data.append('marital_status', employee.marital_status);
        if(employee.photo != false)
        {
          data.append('photo', employee.photo);
        } else {
          data.append('photo', '');
        }
        data.append('machine_code', employee.machine_code);
        data.append('phone', employee.phone);
        data.append('mobile', employee.mobile);
        data.append('notes', employee.notes);
        data.append('attendance', employee.attendance);
        if(employee.signature != false)
        {
          data.append('signature', employee.signature);
        } else {
          data.append('signature', '');
        }
        data.append('booking_action', employee.booking_action);
        data.append('booking_sms', employee.booking_sms);
        data.append('booking_email', employee.booking_email);
        data.append('is_resigned', employee.is_resigned);
        data.append('booking_copy', employee.booking_copy);
        data.append('nationality', employee.nationality);
        data.append('religion', employee.religion);
        data.append('caste', employee.caste);
        data.append('is_reporting_authority', employee.is_reporting_authority);
        data.append('deposit', employee.deposit);
        data.append('booking_rate', employee.booking_rate);

        // Address Info - Permenant Address

        data.append('address[0][street1]', employee.homestreet);
        data.append('address[0][street2]', employee.homestreet2);
        data.append('address[0][area]', employee.area);
        data.append('address[0][city]', employee.city);
        data.append('address[0][pincode]', employee.pincode);
        data.append('address[0][mst_states_id]', employee.state_id);
        data.append('address[0][mst_countries_id]', employee.country_id);
        data.append('address[0][email]', employee.email);
        data.append('address[0][emergency_contact_name]', employee.emergency_contact_name);
        data.append('address[0][address_type]', 1);

        // Address Info - Correspondence Address

        data.append('address[0][street1]', employee.street);
        data.append('address[0][street2]', employee.street2);
        data.append('address[0][area]', employee.area1);
        data.append('address[0][city]', employee.city1);
        data.append('address[0][pincode]', employee.pincode1);
        data.append('address[0][mst_states_id]', employee.corr_state_id);
        data.append('address[0][mst_countries_id]', employee.corr_country_id);
        data.append('address[0][website]', employee.website);
        data.append('address[0][emergency_contact_number]', employee.emergency_contact_number);
        data.append('address[0][address_type]', 2);

        // Educational Details

        var object = {};
        inputList.forEach(function(value, key){
            object[key] = value;
        });
        var educational_data = JSON.stringify(object);

        data.append('education', educational_data);

        // Employement Details

        var object1 = {};
        employmentList.forEach(function(value, key){
            object1[key] = value;
        });
        var employment_data = JSON.stringify(object1);

        data.append('employment', employment_data);

        // Company Data

        data.append('company[mst_companies_id]', employee.mst_companies_id);
        data.append('company[reporting_authority_id]', employee.reporting_authority_id);
        data.append('company[mst_departments_id]', employee.mst_departments_id);
        data.append('company[mst_positions_id]', employee.mst_positions_id);
        data.append('company[join_date]', employee.join_date);
        data.append('company[resign_date]', employee.resign_date);
        data.append('company[bank_name]', employee.bank_name);
        data.append('company[bank_branch_name]', employee.bank_branch_name);
        data.append('company[salary_per_month]', employee.salary_per_month);
        data.append('company[bank_acc_number]', employee.bank_acc_number);

        // Document Data

        data.append('document[aadhar_card_photo]', employee.aadhar_card_photo);
        data.append('document[aadhar_number]', employee.aadhar_number);
        data.append('document[election_card_photo]', employee.election_card_photo);
        data.append('document[election_card_number]', employee.election_card_number);
        data.append('document[pan_card_photo]', employee.pan_card_photo);
        data.append('document[pan_card_number]', employee.pan_card_number);
        data.append('document[passport_photo]', employee.passport_photo);
        data.append('document[passport_number]', employee.passport_number);
        data.append('document[driving_license_photo]', employee.driving_license_photo);
        data.append('document[driving_license_number]', employee.driving_license_number);

         axios.post( `${process.env.REACT_APP_BASE_APIURL}addEmployee`, data, {headers} )

                .then(response => {
                    if(response.data && response.data.success == true){
                        props.history.push('/employee');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/add-employee');
                        toastr.error(response.data.message);
                        {setLoading(false)};
                    }
                })
                .catch((error) => {
                 {setLoading(false)};
                 toastr.error(error.response.data.message);
                })

      }

const onChange = (e) => {
    e.persist();
    setemployee({...employee, [e.target.name]: e.target.value});
  }

  // handle input change for Degree Details
const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};

// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

// handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { degree: "", university: "", from_year: "", to_year:"",
          percentage_grade: "",specialization:"" }]);
};

  // handle input change for Employment Details
const handleInputChange1 = (e, index) => {
  const { name, value } = e.target;
  const list = [...employmentList];
  list[index][name] = value;
  setEmploymentList(list);
};

// handle click event of the Remove button
const handleRemoveClick1 = index => {
  const list = [...employmentList];
  list.splice(index, 1);
  setEmploymentList(list);
};

// handle click event of the Add button
const handleAddClick1 = () => {
  setEmploymentList([...employmentList, { organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
          annual_ctc: "" }]);
};



  const ResetEmployee = () => {
  document.getElementById("AddEmployee").reset();
}

  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={InsertEmployee} method="POST" id="AddEmployee">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">HR</li>
                    <li className="breadcrumb-item"><a href="/employee">Employee</a></li>
                    <li className="breadcrumb-item active">Add Employee</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><a href="/employee" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;
                    <li><button onClick = {ResetEmployee} type="reset" className="btn btn-primary btn-sm"><i className="fa fa-reply">&nbsp;Reset</i></button></li>
                     &nbsp;
                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Submit</i></button>
                    </li>}

                </ol>
            </div>

        </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Personal Info</i>
                    </Alert></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-1">
                                                        <label>Title</label>
                                                        <select className="form-select" name="title" onChange={ onChange }>
                                                            <option value="Mr." selected>Mr.</option>
                                                            <option value="Mrs.">Mrs.</option>
                                                            <option value="Miss">Miss</option>
                                                            <option value="Er.">Er.</option>
                                                            <option value="Dr.">Dr.</option>
                                                            <option value="Prof.">Prof.</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>First Name</label>
                                                        <input className="form-control" type="text" placeholder="Enter First Name" id="example-text-input" name="first_name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Middle Name</label>
                                                        <input className="form-control" type="text" placeholder="Enter Middle Name" id="example-text-input" name="middle_name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Last Name</label>
                                                        <input className="form-control" type="text" name="last_name" placeholder="Enter Last Name" onChange={ onChange }/>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <label>Blood Group</label>
                                                        <select className="form-select" name="blood_group" value={employee.blood_group} onChange={ onChange }>
                                                            <option value="None">None</option>
                                                            <option value="A+">A+</option>
                                                            <option value="A-">A-</option>
                                                            <option value="B+">B+</option>
                                                            <option value="B-">B-</option>
                                                            <option value="O+">O+</option>
                                                            <option value="O-">O-</option>
                                                            <option value="AB+">AB+</option>
                                                            <option value="AB-">AB-</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <label>Gender</label>
                                                        <select className="form-select" name="gender" onChange={ onChange }>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>

                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Birth Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" name="birth_date" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Marital Status</label>
                                                        <select className="form-select" name="marital_status" onChange={ onChange }>
                                                            <option value="Single">Single</option>
                                                            <option value="Married">Married</option>
                                                            <option value="Seperated">Seperated</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Widowed">Widowed</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Photo</label>
                                                        <input className="form-control" type="file"  name="photo" onChange={ changePhotoHandler }/>
                                                    </div>

                                                   <div className="col-md-2">
                                                        <label>Machine Code</label>
                                                        <input className="form-control" type="text" name="machine_code" placeholder="Enter Machine Code" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Phone</label>
                                                        <input className="form-control" type="text" name="phone" placeholder="Enter Phone" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Mobile</label>
                                                        <input className="form-control" type="text" name="mobile" placeholder="Enter Mobile" onChange={ onChange }/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Email(Username)</label>
                                                        <input className="form-control" type="email" name="username_email" placeholder="example@gmail.com" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Password</label>
                                                        <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" placeholder="Enter Notes" onChange={ onChange }></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Attendance</label>
                                                        <select className="form-select" name="attendance" onChange={ onChange }>
                                                            <option value="1">Yes</option>
                                                            <option value="0">No</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Signature</label>
                                                        <input className="form-control" type="file"  name="signature" onChange={ changeSignatureHandler }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Action</label>
                                                        <select className="form-select" name="booking_action" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking SMS</label>
                                                        <select className="form-select" name="booking_sms" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Email</label>
                                                        <select className="form-select" name="booking_email" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Resigned</label>
                                                        <select className="form-select" name="is_resigned" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Booking Copy</label>
                                                        <select className="form-select" name="booking_copy" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Nationality</label>
                                                        <input className="form-control" type="text" name="nationality" placeholder="Nationality" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Religion</label>
                                                        <input className="form-control" type="text" name="religion" placeholder="Religion" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Caste</label>
                                                        <input className="form-control" type="text" name="caste" placeholder="Caste" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        <select className="form-select" name="is_reporting_authority" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Deposit</label>
                                                        <select className="form-select" name="deposit" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Rate</label>
                                                        <select className="form-select" name="booking_rate" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                    <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Contact Info</i>
                    </Alert></h5>

                    <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                     <div className="col-md-6">
                                                        <h5 className="alert alert-info"><i className="fa fa-home">&nbsp;Permanent Address</i></h5>
                                                         <div className="form-group">
                                                             <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Home Street</label>
                                                                    <input className="form-control" type="text" name="homestreet" placeholder="Enter Homestreet" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="country_id" name="country_id" onChange={ onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Emergency Contact Name</label>
                                                                    <input className="form-control" type="text" name="emergency_contact_name" placeholder="Enter Emergency Contact Name" onChange={ onChange }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Home Street2</label>
                                                                    <input className="form-control" type="text" name="homestreet2" placeholder="Enter Home Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="state_id" name="state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Email</label>
                                                                    <input className="form-control" type="email" name="email" placeholder="Enter Email" onChange={ onChange }/>
                                                                </div>
                                                              </div>
                                                         </div>

                                                     </div>
                                                     <div className="col-md-6">
                                                        <h5 className="alert alert-info"><i className="fa fa-address-book">&nbsp;Correspondence Address</i></h5>
                                                        <div className="form-group">
                                                             <div className="row">
                                                                <div className="col-md-6">
                                                                    <label>Street</label>
                                                                    <input className="form-control" type="text" name="street" placeholder="Enter Street" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" name="area1" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" name="pincode1" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>Country</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_country_id" name="corr_country_id" onChange={ onChange } >
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select> } <br/>
                                                                    <label>Emergency Contact Number</label>
                                                                    <input className="form-control" type="text" name="emergency_contact_number" placeholder="Enter Emergency Contact Number" onChange={ onChange }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" name="street2" placeholder="Enter Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" name="city1" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="corr_state_id" name="corr_state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.id} key={key} >{option.state_name}</option>) }</select> } <br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" name="website" placeholder="Enter Website" onChange={ onChange }/>
                                                                </div>
                                                              </div>
                                                         </div>
                                                     </div>
                                                </div>
                                            </div>
                                        </div>

                    <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Educational Details</i>
                    </Alert></h5>
            {inputList.map((x, i) => (
                <React.Fragment key={x}>
                            <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Degree</label>
                                                        <input className="form-control" type="text" name="degree" value={x.degree} onChange={e => handleInputChange(e, i)}/>

                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>University/ Institute</label>
                                                        <input className="form-control" type="text" name="university" value={x.university} onChange={e => handleInputChange(e, i)}/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>From</label>
                                                        <input className="form-control" type="text" name="from_year" value={x.from_year} onChange={e => handleInputChange(e, i)}/>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <label>To</label>
                                                        <input className="form-control" type="text"  name="to_year" value={x.to_year} onChange={e => handleInputChange(e, i)}/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Percentage/Grade</label>
                                                        <input className="form-control" type="text"  name="percentage_grade" value={x.percentage_grader} onChange={e => handleInputChange(e, i)}/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Specialization</label>
                                                        <input className="form-control" type="text"  name="specialization" value={x.specialization} onChange={e => handleInputChange(e, i)}/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label style={{ visibility:'hidden' }} >Delete</label>
                                                         {/*<p><i className="fa fa-trash"></i></p>*/}
                                                         {inputList.length !== 1 && <button
                                                          className="mr10"
                                                          onClick={() => handleRemoveClick(i)} className="btn btn-primary">Delete</button>}


                            </div>
                        </div>
                    </div>

                </div>

                <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center>
                                                        <div className="col-md-2">

                                                        {inputList.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick}>Add More</button>}

                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>


    </React.Fragment>
                    ))}



                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Employment Details</i>
                    </Alert></h5>
              {employmentList.map((x, i) => (
                <React.Fragment key={x}>
                            <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                <div className="col-md-3">
                                                        <label>Organisation</label>
                                                        <input className="form-control" type="text" name="organisation" value={x.organisation} onChange={e => handleInputChange1(e, i)}/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Designation</label>
                                                        <input className="form-control" type="text" name="designation" value={x.designation} onChange={e => handleInputChange1(e, i)}/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>From</label>
                                                        <input className="form-control" type="text" name="emp_from_year" value={x.emp_from_year} onChange={e => handleInputChange1(e, i)}/>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label>To</label>
                                                        <input className="form-control" type="text"  name="emp_to_year" value={x.emp_to_year} onChange={e => handleInputChange1(e, i)}/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Annual CTC</label>
                                                        <input className="form-control" type="text"  name="annual_ctc" value={x.annual_ctc} onChange={e => handleInputChange1(e, i)}/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label style={{ visibility:'hidden' }} >Delete</label>
                                                       {employmentList.length !== 1 && <button
                                                          className="mr10"
                                                          onClick={() => handleRemoveClick1(i)} className="btn btn-primary">Delete</button>}

                                                    </div>

                        </div>
                    </div>
        </div>
                                          <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                   <center>
                                                        <div className="col-md-2">
                                                        {employmentList.length - 1 === i && <button className="btn btn-success mt-3 mt-lg-0" onClick={handleAddClick1}>Add More</button>}
                                                        </div>
                                                    </center>
                                                 </div>
                                            </div>
                                        </div>
    </React.Fragment>
                    ))}


                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Comapny Info</i>
                                        </Alert></h5>
                                          <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Comapny</label>
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="mst_companies_id" name="mst_companies_id" onChange={ onChange } >
                                                             <option value="">Select Company</option>
                                                            { data2.map((option, key) => <option value={option.id} key={key} >{option.company_name}</option>) }
                                                        </select> }

                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" id="reporting_authority_id" name="reporting_authority_id" onChange={ onChange } >
                                                                    <option value="">Reporting Auhtority</option>
                                                                    { data5.map((option, key) => <option value={option.id} key={key} >{option.first_name}</option>) }</select> }
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Join Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" name="join_date" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Resign Date</label>
                                                        <input className="form-control" type="date"  id="example-date-input" name="resign_date" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank Name</label>
                                                        <input className="form-control" type="text" name="bank_name" placeholder="Enter Bank Name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank Branch Name</label>
                                                        <input className="form-control" type="text" name="bank_branch_name" placeholder="Enter Bank Branch" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Salary Per Month</label>
                                                        <input className="form-control" type="text" name="salary_per_month" placeholder="Salary Per Month" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Bank A/C No</label>
                                                        <input className="form-control" type="text" name="bank_acc_number" placeholder="Bank Account No" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Department Name</label>
                                                        {loading1 ? <LoadingSpinner /> :
                                                          <select className="form-select" id="mst_departments_id" name="mst_departments_id" onChange={ onChange }>
                                                             <option value="">Select Department</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select> }
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Position</label>
                                                       {loading1 ? <LoadingSpinner /> :
                                                        <select className="form-select" id="mst_positions_id" name="mst_positions_id" onChange={ onChange }>
                                                             <option value="">Select Position</option>
                                                            { data3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>) }
                                                         </select> }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*<div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>In Time</label>
                                                        <input className="form-control" type="time" name="in_time" id="example-time-input"/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Out Time</label>
                                                        <input className="form-control" type="time" name="out_time" id="example-time-input"/>
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label>Email Username</label>
                                                        <input className="form-control" type="text" name="email_username"/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Email Password</label>
                                                        <input className="form-control" type="password" name="email_password"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>*/}

                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Employee Document's No And Upload</i>
                                        </Alert></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Aadhar Card</label>

                                                        <input name="aadhar_card_photo" type="file" className="form-control" onChange={ changeAadharHandler }/>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Aadhar Card No</label>
                                                        <input className="form-control" type="text"  name="aadhar_number" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Election Card</label>

                                                        <input name="election_card_photo" type="file" className="form-control" onChange={ changeElectionCardHandler }/>

                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Election Card No</label>
                                                        <input className="form-control" type="text"  name="election_card_number" onChange={ onChange }/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Pan Card Scan Copy</label>

                                                        <input name="pan_card_photo" type="file" className="form-control" onChange={ changePanCardHandler }/>

                                                    </div>

                                                     <div className="col-md-3">
                                                        <label>Pan Card No</label>
                                                        <input className="form-control" type="text"  name="pan_card_number" onChange={ onChange }/>
                                                    </div>

                                                      <div className="col-md-3">
                                                        <label>Passport Scan Copy</label>

                                                        <input name="passport_photo" type="file" className="form-control" onChange={ changePassportHandler }/>

                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Passport No</label>
                                                        <input className="form-control" type="text"  name="passport_number" onChange={ onChange }/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <label>Driving Liecense Copy</label>

                                                        <input name="driving_license_photo" type="file" className="form-control" onChange={ changeDrivingLicHandler }/>

                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Driving Licence No</label>
                                                        <input className="form-control" type="text"  name="driving_license_number" onChange={ onChange }/>
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

export default AddEmployee
