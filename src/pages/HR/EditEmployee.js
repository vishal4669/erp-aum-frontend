import React, { useState, useEffect } from 'react';

import {
  Card,
  CardBody,
  Col,
  Row,
  Form,
  Container,
  Alert,Table
} from 'reactstrap';

//Import Breadcrumb
import HorizontalLayout from '../../components/HorizontalLayout';
import { Link } from "react-router-dom"
import axios from 'axios';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../components/LoadingSpinner';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import {commonpath} from '../../commonPath'
import moment from 'moment'

function EditEmployee (props) {
    var employee_document_path = commonpath.employee_document_path;
    var employee_photo_sign = commonpath.employee_photo_sign;
       const headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

        const url = window.location.href
        const employee_id = base64_decode(url.substring(url.lastIndexOf('/') + 1))
        const edit_employee_id =url.substring(url.lastIndexOf('/') + 1)

        const [loading, setLoading] = useState(false);
        const [loading1, setLoading1] = useState(false);
        const [loading2, setLoading2] = useState(false);
        const [data, setData] = useState([]);
        const [data1, setData1] = useState([]);
        const [data2, setData2] = useState([]);
        const [data3, setData3] = useState([]);
        const [data4, setData4] = useState([]);
        const [data5, setData5] = useState([]);
        const [data6, setData6] = useState([]);

        const delete_btn_style = {
          height:'31px'
        }

        const attachment_style = {
          fontSize:'14px',
          width:'100%'
        }

        const [employee, setemployee] = useState({ title: 'Mr.',first_name: '',middle_name: '',last_name: '',
        blood_group: 'None',gender: 'M',birth_date: '',marital_status:'Single',photo: '',machine_code: '',phone: '',mobile: '',
        notes: '',attendance:'1',signature:'',booking_action:'0',booking_sms:'0',booking_email:'0',booking_copy: '0',nationality:'',
        religion: '',caste: '',is_reporting_authority:'0', deposit: '0',booking_rate: '0',homestreet: '', area: '',
        pincode:'',country_id:'',emergency_contact_name:'',homestreet2: '',city: '',state_id:'',email: '',street:'',
        area1:'',pincode1:'',corr_country_id:'',emergency_contact_number:'',street2:'',city1:'',corr_state_id:'',website:'',
        mst_companies_id:'',reporting_authority_id: '',mst_departments_id:'',mst_positions_id:'',join_date:'',resign_date:'',
        bank_name:'',bank_branch_name:'',salary_per_month:'',bank_acc_number:'',username:'',password:'',in_time:'',
        out_time:'',email_username:'',email_password:'',incoming_mail_type:'IMAP',incoming_mail_server:'',
        incoming_mail_server_port:'',outgoing_mail_server:'',outgoing_mail_server_port:'',aadhar_card_photo:'',aadhar_number:'',
        election_card_photo:'',election_card_number:'',pan_card_photo:'',pan_card_number:'',passport_photo:'',passport_number:'',
        driving_license_photo:'',driving_license_number:'',is_approved:''
        });

        const [attachments,setAttachments] = useState({attach_photo : '',attach_signature : '',attach_aadhar_card_photo : '',
        attach_election_card_photo : '',attach_pan_card_photo : '',attach_passport_photo : '',attach_driving_license_photo : '',approve_status:'Pending'});

        const [inputList, setInputList]  = useState([{ degree: "", university: "", from_year: "", to_year:"",
          percentage_grade: "",specialization:"" }]);
        const [employmentList, setEmploymentList]  = useState([{ organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
          annual_ctc: ""}]);

          const [pass, setPassword] = useState();

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
         EmployeeData();
         fetchCountry();
         //fetchStates();
         //fetchCorStates();
         fetchCompany();
         fetchPosition();
         fetchDepartment();
         fetchReportingAuthority();
        }, []);

        const EmployeeData=()=>{
        {setLoading1(true)}
          axios.get(`${process.env.REACT_APP_BASE_APIURL}getEmployee/`+employee_id,{headers})
              .then(response => {
                setAttachments({
                 attach_photo:response.data.data.photo !== null ? response.data.data.photo : '',
                 attach_signature : response.data.data.signature !== null ? response.data.data.signature : '',
                 attach_aadhar_card_photo : response.data.data.document[0].aadhar_card_photo !== null ?
                 response.data.data.document[0].aadhar_card_photo : '',
                 attach_election_card_photo : response.data.data.document[0].election_card_photo !== null ?
                 response.data.data.document[0].election_card_photo : '',
                 attach_pan_card_photo : response.data.data.document[0].pan_card_photo !== null ?
                 response.data.data.document[0].pan_card_photo : '',
                 attach_passport_photo : response.data.data.document[0].passport_photo !== null ?
                 response.data.data.document[0].passport_photo : '',
                 attach_driving_license_photo : response.data.data.document[0].driving_license_photo !== null ?
                 response.data.data.document[0].driving_license_photo : '',
                 approve_status : response.data.data.is_approved
               })
                  setemployee(response.data.data);
                  if(Array.isArray(response.data.data.employment) && response.data.data.employment.length){
                    setEmploymentList(response.data.data.employment);
                  } else {
                    setEmploymentList([{ organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
                      annual_ctc: ""}]);
                  }

                  if(Array.isArray(response.data.data.education) && response.data.data.education.length){
                    setInputList(response.data.data.education);
                  } else {
                    setInputList([{ degree: "", university: "", from_year: "", to_year:"",
                      percentage_grade: "",specialization:"" }])
                  }

                  setemployee(prevState => ({ ...prevState,
                    //attachments
                    photo:'',
                    signature :'',
                   //Company Details
                   mst_companies_id:response.data.data.company.mst_companies_id,
                   reporting_authority_id: response.data.data.company.reporting_authority_id,
                   mst_departments_id:response.data.data.company.mst_departments_id,
                   mst_positions_id:response.data.data.company.mst_positions_id,
                   join_date:response.data.data.company.join_date,
                   resign_date:response.data.data.company.resign_date,
                   bank_name:response.data.data.company.bank_name,
                   bank_branch_name:response.data.data.company.bank_branch_name,
                   salary_per_month:response.data.data.company.salary_per_month,
                   bank_acc_number : response.data.data.company.bank_acc_number,
                   username:response.data.data.company.username,
                   password:base64_decode(response.data.data.company.password),
                   in_time:response.data.data.company.in_time,
                   out_time:response.data.data.company.out_time,
                   email_username:response.data.data.company.email_username,
                   email_password:response.data.data.company.email_password,
                   incoming_mail_type:response.data.data.company.incoming_mail_type,
                   incoming_mail_server:response.data.data.company.incoming_mail_server,
                   incoming_mail_server_port:response.data.data.company.incoming_mail_server_port,
                   outgoing_mail_server:response.data.data.company.outgoing_mail_server,
                   outgoing_mail_server_port:response.data.data.company.outgoing_mail_server_port,
                   //Documents Details
                   aadhar_card_photo: '',
                   aadhar_number: response.data.data.document[0].aadhar_number,
                   election_card_photo: '',
                   election_card_number: response.data.data.document[0].election_card_number,
                   pan_card_photo: '',
                   pan_card_number:response.data.data.document[0].pan_card_number,
                   passport_photo:'',
                   passport_number:response.data.data.document[0].passport_number,
                   driving_license_photo: '',
                   driving_license_number:response.data.data.document[0].driving_license_number,
                   //address details Permanent Address
                   homestreet: response.data.data.address[0].street1,
                   homestreet2: response.data.data.address[0].street2,
                   area: response.data.data.address[0].area,
                   city: response.data.data.address[0].city,
                   pincode: response.data.data.address[0].pincode,
                   state_id: response.data.data.address[0].mst_states_id,
                   country_id: response.data.data.address[0].mst_countries_id,
                   email: response.data.data.address[0].email,
                   emergency_contact_name: response.data.data.address[0].emergency_contact_name,
                   //address details Correspondence Address
                   street: response.data.data.address[1].street1,
                   street2: response.data.data.address[1].street2,
                   area1: response.data.data.address[1].area,
                   city1: response.data.data.address[1].city,
                   pincode1: response.data.data.address[1].pincode,
                   corr_state_id: response.data.data.address[1].mst_states_id,
                   corr_country_id: response.data.data.address[1].mst_countries_id,
                   website: response.data.data.address[1].website,
                   emergency_contact_number: response.data.data.address[1].emergency_contact_number,
                 }))
                 setPassword(response.data.data.company.password);
                 var fetch_country_id = response.data.data.address[0].mst_countries_id ? 
                 response.data.data.address[0].mst_countries_id : '';
                 var fetch_country_id2 = response.data.data.address[1].mst_countries_id ? 
                 response.data.data.address[1].mst_countries_id : '';

                 axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+fetch_country_id,{headers})
                 .then(response => {
                  const state_data = response.data.data[0].country_wise_states.map(d => ({
                      "state_id" : d.id,
                      "state_name" : d.state_name,
                    }))
                    setData1(state_data);
                  })

                  axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+fetch_country_id2,{headers})
                  .then(response => {
                  const state_data1 = response.data.data[0].country_wise_states.map(d => ({
                      "state_id" : d.id,
                      "state_name" : d.state_name,
                    }))
                  setData6(state_data1);      
               })

                  {setLoading1(false)}

              })
              .catch((error) => {
                console.log(error)
                  {setLoading1(false)}
                  toastr.error(error.response.data.message);
                  this.setState({loading: false});
              })
        }

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

        /*const fetchStates = () => {
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
        }*/

        const fetchStates = () => {
          var country_id_fetch = document.getElementById('country_id').value;
          setemployee(prevState => ({ ...prevState, country_id: country_id_fetch}))
           {setLoading1(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch,{headers})
          .then(response => {
              const state_data = response.data.data[0].country_wise_states.map(d => ({
                  "state_id" : d.id,
                  "state_name" : d.state_name,
                }))
                setData1(state_data);       
                {setLoading1(false)}
             })
            .catch((error) => {
                console.log(error)
                toastr.error(error.response.data.message);

                 {setLoading1(false)}
            })
      }

      const fetchCorStates = () => {
          var country_id_fetch2 = document.getElementById('corr_country_id').value;
          setemployee(prevState => ({ ...prevState, corr_country_id: country_id_fetch2}))
           {setLoading2(true)};
          axios.get(`${process.env.REACT_APP_BASE_APIURL}countriesWiseStates/`+country_id_fetch2,{headers})
          .then(response => {
              const state_data = response.data.data[0].country_wise_states.map(d => ({
                  "state_id" : d.id,
                  "state_name" : d.state_name,
                }))
                setData6(state_data);       
                {setLoading2(false)}
             })
            .catch((error) => {
                toastr.error(error.response.data.message);
                 {setLoading2(false)}
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

        const DeletePhoto = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, photo: ''}))
           setAttachments(prevState => ({ ...prevState, attach_photo: ''}))
         }

         const DeleteSignature = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, signature: ''}))
           setAttachments(prevState => ({ ...prevState, attach_signature: ''}))
         }

         const DeleteAadhar = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, aadhar_card_photo: ''}))
           setAttachments(prevState => ({ ...prevState, attach_aadhar_card_photo: ''}))
         }

         const DeleteEelection = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, election_card_photo: ''}))
           setAttachments(prevState => ({ ...prevState, attach_election_card_photo: ''}))
         }

         const DeletePan = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, pan_card_photo: ''}))
           setAttachments(prevState => ({ ...prevState, attach_pan_card_photo: ''}))
         }

         const DeletePassport = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, passport_photo: ''}))
           setAttachments(prevState => ({ ...prevState, attach_passport_photo: ''}))
         }
         const DeleteDrivingLicence = (e) => {
          e.preventDefault();
           setemployee(prevState => ({ ...prevState, driving_license_photo: ''}))
           setAttachments(prevState => ({ ...prevState, attach_driving_license_photo: ''}))
         }

const editEmployee = (e)=>{
         e.preventDefault();

         const final_edu_detail = inputList;
         const final_emp_detail = employmentList;

         console.log(final_edu_detail)

             /*final_edu_detail.forEach(function(edu,index){

                 var edu_degree = final_edu_detail[index].degree;
                 var edu_university = final_edu_detail[index].universityname;
                 var edu_from_year = final_edu_detail[index].fromyear;
                 var edu_to_year = final_edu_detail[index].toyear;
                 var edu_percentage = final_edu_detail[index].percentagegrade;
                 var edu_specialization = final_edu_detail[index].degreespecialization;

             })*/
             console.log(employee.photo);
             console.log(attachments.attach_photo);
        {setLoading(true)};
        const data = new FormData();
        var emp_username_auto = ''
        var emp_password_auto = ''

        if(employee.username == null || employee.username == ''){
          var last_date_year = moment(employee.birth_date).format('MM-DD-YYYY').toString().substr(-2)
          emp_username_auto = employee.first_name.toLowerCase()+last_date_year
        } else {
          emp_username_auto = employee.username
        }

        if(employee.password == null){
          emp_password_auto = Math.random().toString(36).slice(2)
        } else {
          emp_password_auto = employee.password
        }

        //console.log(emp_username_auto);
        //return;
        // Personal Info

        data.append('title', employee.title);
        data.append('first_name', employee.first_name);
        data.append('middle_name', employee.middle_name);
        data.append('last_name', employee.last_name);
        data.append('blood_group', employee.blood_group);
        data.append('gender', employee.gender);
        data.append('birth_date', employee.birth_date);
        data.append('marital_status', employee.marital_status);
        if(employee.photo != false)
        {
          data.append('photo', employee.photo);
        } else {
          if(employee.photo == null){
            data.append('photo', employee.photo);
          } else {
            data.append('photo', attachments.attach_photo);
          }
        }
        data.append('machine_code', employee.machine_code !== null ?  employee.machine_code : '');
        data.append('phone', employee.phone !== null ? employee.phone : '');
        data.append('mobile', employee.mobile);
        data.append('notes', employee.notes !== null ? employee.notes : '');
        data.append('attendance', employee.attendance);
        if(employee.signature != false)
        {
          data.append('signature', employee.signature);
        } else {
          data.append('signature', attachments.attach_signature);
        }
        data.append('booking_action', employee.booking_action);
        data.append('booking_sms', employee.booking_sms);
        data.append('booking_email', employee.booking_email);
        if(typeof employee.resign_date == object){
          data.append('is_resigned', "0");
        } else {
          if(employee.resign_date == null || employee.resign_date == ''){
             data.append('is_resigned', "0");
          } else {
            data.append('is_resigned', "1");
          }
        }
        data.append('booking_copy', employee.booking_copy);
        data.append('nationality',employee.nationality !== null ?  employee.nationality : '');
        data.append('religion', employee.religion !== null ? employee.religion : '');
        data.append('caste', employee.caste !== null ? employee.caste : '');
        data.append('is_reporting_authority', employee.is_reporting_authority !== null ? employee.is_reporting_authority : '');
        data.append('deposit', employee.deposit);
        data.append('booking_rate', employee.booking_rate);
        data.append('is_approved', employee.is_approved);

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

        data.append('address[1][street1]', employee.street);
        data.append('address[1][street2]', employee.street2);
        data.append('address[1][area]', employee.area1);
        data.append('address[1][city]', employee.city1);
        data.append('address[1][pincode]', employee.pincode1);
        data.append('address[1][mst_states_id]', employee.corr_state_id);
        data.append('address[1][mst_countries_id]', employee.corr_country_id);
        data.append('address[1][website]', employee.website);
        data.append('address[1][emergency_contact_number]', employee.emergency_contact_number);
        data.append('address[1][address_type]', 2);

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
        data.append('company[reporting_authority_id]', employee.reporting_authority_id !== null ? employee.reporting_authority_id : '');
        if(employee.join_date !== null){
           data.append('company[join_date]', employee.join_date);
        } else {
          data.append('company[join_date]', '');
        }
        if(typeof employee.resign_date == object){
           data.append('company[resign_date]', '');
        } else {
          if(employee.resign_date == null){
             data.append('company[resign_date]', '');
          } else {
            data.append('company[resign_date]', employee.resign_date);
          }
        }
        data.append('company[bank_name]', employee.bank_name);
        data.append('company[bank_branch_name]', employee.bank_branch_name);
        data.append('company[salary_per_month]', employee.salary_per_month);
        data.append('company[bank_acc_number]', employee.bank_acc_number);
        data.append('company[mst_departments_id]', employee.mst_departments_id !== null ? employee.mst_departments_id :  '');
        data.append('company[mst_positions_id]', employee.mst_positions_id);
        data.append('company[username]', emp_username_auto);
        if(emp_password_auto !== pass){
            data.append('password', emp_password_auto);
            data.append('company[password]', emp_password_auto);
        } else {
            data.append('password', pass);
            data.append('company[password]', pass);
        }       
        data.append('company[in_time]', employee.in_time);
        data.append('company[out_time]', employee.out_time);
        data.append('company[email_username]', employee.email_username);
        data.append('company[email_password]', employee.email_password);
        data.append('company[incoming_mail_type]', employee.incoming_mail_type);
        data.append('company[incoming_mail_server]', employee.incoming_mail_server);
        data.append('company[incoming_mail_server_port]', employee.incoming_mail_server_port);
        data.append('company[outgoing_mail_server]', employee.outgoing_mail_server);
        data.append('company[outgoing_mail_server_port]', employee.outgoing_mail_server_port);

        // Document Data

        if(employee.aadhar_card_photo != false)
        {
          data.append('document[aadhar_card_photo]', employee.aadhar_card_photo);
        } else {
          if(employee.aadhar_card_photo == null){
            data.append('document[aadhar_card_photo]', employee.aadhar_card_photo);
          } else {
            data.append('document[aadhar_card_photo]', attachments.attach_aadhar_card_photo);
          }
        }
        data.append('document[aadhar_number]', employee.aadhar_number);
        if(employee.election_card_photo != false)
        {
          data.append('document[election_card_photo]', employee.election_card_photo);
        } else {
          if(employee.election_card_photo == null){
            data.append('document[election_card_photo]', employee.election_card_photo);
          } else {
            data.append('document[election_card_photo]', attachments.attach_election_card_photo);
          }
        }
        data.append('document[election_card_number]', employee.election_card_number);
        if(employee.pan_card_photo != false)
        {
          data.append('document[pan_card_photo]', employee.pan_card_photo);
        }else{
          if(employee.pan_card_photo == null){
            data.append('document[pan_card_photo]', employee.pan_card_photo);
          } else {
            data.append('document[pan_card_photo]', attachments.attach_pan_card_photo);
          }
        }
        data.append('document[pan_card_number]', employee.pan_card_number);
        if(employee.passport_photo != false)
        {
          data.append('document[passport_photo]', employee.passport_photo);
        } else {
          if(employee.passport_photo == null){
            data.append('document[passport_photo]', employee.passport_photo);
          } else {
            data.append('document[passport_photo]', attachments.attach_passport_photo);
          }
        }
        data.append('document[passport_number]', employee.passport_number);
        if(employee.driving_license_photo != false)
        {
          data.append('document[driving_license_photo]', employee.driving_license_photo);
        } else {
          if(employee.driving_license_number == null){
            data.append('document[driving_license_photo]', employee.driving_license_photo);
          } else {
            data.append('document[driving_license_photo]', attachments.attach_driving_license_photo);
          }
        }
        data.append('document[driving_license_number]', employee.driving_license_number);

        for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
      //  return

        axios.post( `${process.env.REACT_APP_BASE_APIURL}editEmployee/`+employee_id, data, {headers} )

                .then(response => {
                    if(response.data && response.data.success == true){
                        props.history.push('/employee');
                        toastr.success(response.data.message);
                        {setLoading(false)};
                    }else{
                        props.history.push('/edit-employee/'+edit_employee_id);
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
const handleRemoveClick = (e,index) => {
  e.preventDefault()
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};

// handle click event of the Add button
const handleAddClick = (e) => {
  e.preventDefault()
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
const handleRemoveClick1 = (e,index) => {
  e.preventDefault()
  const list = [...employmentList];
  list.splice(index, 1);
  setEmploymentList(list);
};

// handle click event of the Add button
const handleAddClick1 = (e) => {
  e.preventDefault()
  setEmploymentList([...employmentList, { organisation: "", designation: "", emp_from_year: "", emp_to_year:"",
          annual_ctc: "" }]);
};
  return (
    <React.Fragment>
      <HorizontalLayout/>
      <div className="page-content">
        <Container fluid={true}>
        <Form onSubmit={editEmployee} method="POST" id="editEmployee">
        <div className="page-title-box d-flex align-items-center justify-content-between">

            <div className="page-title">
                <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                    <li className="breadcrumb-item">HR</li>
                    <li className="breadcrumb-item"><a href="/employee">Employee</a></li>
                    <li className="breadcrumb-item active">Edit Employee</li>
                </ol>
            </div>

            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li><a href="/employee" className="btn btn-primary btn-sm"><i className="fa fa-chevron-right">&nbsp;Back</i></a></li>&nbsp;&nbsp;

                    { loading ? <center><LoadingSpinner /></center> :<li>
                       <button type="submit" className="btn btn-primary btn-sm"><i className="fa fa-check">&nbsp;Update</i></button>
                    </li>}
                    &nbsp;&nbsp;{attachments.approve_status == "Pending" ? <li>
                      <select name="is_approved" className="form-select btn-sm" onChange={ onChange } style={{width:'180px',background: '#5b73e8', color: 'azure',borderRadius:'3px'}}>
                        <option value="Pending" className="btn btn-warning">Pending</option>
                        <option value="Approved" className="btn btn-success">Approve</option>
                        <option value="Rejected" className="btn btn-danger">Reject</option>
                      </select>
                    </li> : ''}
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
                                                       {loading1 ? <LoadingSpinner /> :   <select className="form-select" name="title" value={employee.title} onChange={ onChange }>
                                                            <option value="Mr." >Mr.</option>
                                                            <option value="Mrs.">Mrs.</option>
                                                            <option value="Miss">Miss</option>
                                                            <option value="Er.">Er.</option>
                                                            <option value="Dr.">Dr.</option>
                                                            <option value="Prof.">Prof.</option>
                                                        </select>}
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">First Name</label>
                                                        <input className="form-control" type="text" value={employee.first_name} placeholder="Enter First Name" id="example-text-input" name="first_name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Middle Name</label>
                                                        <input className="form-control" type="text" value={employee.middle_name} placeholder="Enter Middle Name" id="example-text-input" name="middle_name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Last Name</label>
                                                        <input className="form-control" type="text" value={employee.last_name} name="last_name" placeholder="Enter Last Name" onChange={ onChange }/>
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
                                                        <select className="form-select" value={employee.gender} name="gender" onChange={ onChange }>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>

                                                        </select>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="required-field">Birth Date</label>
                                                        <input className="form-control" type="date"  value={employee.birth_date} id="example-date-input" name="birth_date" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Marital Status</label>
                                                        <select className="form-select" value={employee.marital_status} name="marital_status" onChange={ onChange }>
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
                                                        <input className="form-control" type="hidden" value={attachments.attach_photo}/>                                                        
                                                        {attachments.attach_photo !== '' ?
                                                                <div className="mb-3 row">
                                                                  <div className="form-group">
                                                                    <div className="row">
                                                                      <div className="col-md-10">
                                                                      <a href={employee_photo_sign+attachments.attach_photo} style={attachment_style} className="btn btn-primary form-control btn-sm" target="_blank">Click To Open Photo</a>
                                                                      </div>
                                                                      <div className="col-md-2">
                                                                      <button className="form-control btn btn-danger btn-sm" onClick={e => DeletePhoto(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                      </div>
                                                                     </div>
                                                                  </div>
                                                                </div> 
                                                        : ''}
                                                    </div>

                                                   <div className="col-md-2">
                                                        <label>Machine Code</label>
                                                        <input className="form-control" type="text" value={employee.machine_code} name="machine_code" placeholder="Enter Machine Code" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Phone</label>
                                                        <input className="form-control" type="text" value={employee.phone} name="phone" placeholder="Enter Phone" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label className="required-field">Mobile</label>
                                                        <input className="form-control" type="text" value={employee.mobile} name="mobile" placeholder="Enter Mobile" onChange={ onChange }/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <label>Notes</label>
                                                        <textarea name="notes" className="form-control" value={employee.notes} placeholder="Enter Notes" onChange={ onChange }></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-3">
                                                        <label>Attendance</label>
                                                        <select className="form-select" value={employee.attendance} name="attendance" onChange={ onChange }>
                                                            <option value="1">Yes</option>
                                                            <option value="0">No</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Signature</label>
                                                        <input className="form-control" type="file"  name="signature" onChange={ changeSignatureHandler }/>
                                                        <input className="form-control" type="hidden" value={attachments.attach_signature}/>
                                                        {attachments.attach_signature !== '' ?
                                                            <div className="mb-3 row">
                                                              <div className="form-group">
                                                                <div className="row">
                                                                  <div className="col-md-10">
                                                                  <a href={employee_photo_sign+attachments.attach_signature} style={attachment_style} className="btn btn-dark form-control btn-sm" target="_blank">Click To Open Signature</a>
                                                                  </div>
                                                                  <div className="col-md-2">
                                                                  <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteSignature(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                  </div> 
                                                                </div> 
                                                              </div>
                                                            </div>   
                                                        : ''}

                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Action</label>
                                                        <select className="form-select" value={employee.booking_action} name="booking_action" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking SMS</label>
                                                        <select className="form-select" value={employee.booking_sms} name="booking_sms" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Email</label>
                                                        <select className="form-select" value={employee.booking_email} name="booking_email" onChange={ onChange }>
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
                                                        <select className="form-select" value={employee.booking_copy} name="booking_copy" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Nationality</label>
                                                        <input className="form-control" value={employee.nationality} type="text" name="nationality" placeholder="Nationality" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Religion</label>
                                                        <input className="form-control" value={employee.religion} type="text" name="religion" placeholder="Religion" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-1">
                                                        <label>Caste</label>
                                                        <input className="form-control" value={employee.caste} type="text" name="caste" placeholder="Caste" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        <select className="form-select" value={employee.is_reporting_authority} name="is_reporting_authority" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Deposit</label>
                                                        <select className="form-select" value={employee.deposit} name="deposit" onChange={ onChange }>
                                                            <option value="0">No</option>
                                                            <option value="1">Yes</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Booking Rate</label>
                                                        <select className="form-select" value={employee.booking_rate} name="booking_rate" onChange={ onChange }>
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
                                                                    <label className="required-field">Home Street</label>
                                                                    <input className="form-control" type="text" value={employee.homestreet} name="homestreet" placeholder="Enter Homestreet" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" value={employee.area} name="area" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" value={employee.pincode} name="pincode" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label className="required-field">State</label>
                                                                    <select className="form-select" value={employee.state_id} id="state_id" name="state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data1.map((option, key) => <option value={option.state_id} key={key} >{option.state_name}</option>) }</select><br/>
                                                                    <label className="required-field">Emergency Contact Name</label>
                                                                    <input className="form-control" type="text" value={employee.emergency_contact_name} name="emergency_contact_name" placeholder="Enter Emergency Contact Name" onChange={ onChange }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="required-field">Home Street2</label>
                                                                    <input className="form-control" type="text" value={employee.homestreet2} name="homestreet2" placeholder="Enter Home Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" value={employee.city} name="city" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label className="required-field">Country</label>
                                                                    <select className="form-select" value={employee.country_id} id="country_id" name="country_id" onChange={ onChange } onChange={fetchStates}>
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select><br/>
                                                                    <label>Email</label>
                                                                    <input className="form-control" type="email" value={employee.email} name="email" placeholder="Enter Email" onChange={ onChange }/>
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
                                                                    <input className="form-control" type="text" value={employee.street} name="street" placeholder="Enter Street" onChange={ onChange }/><br/>
                                                                    <label>Area</label>
                                                                    <input className="form-control" type="text" value={employee.area1} name="area1" placeholder="Enter Area" onChange={ onChange }/><br/>
                                                                    <label>Pincode</label>
                                                                    <input className="form-control" type="text" value={employee.pincode1} name="pincode1" placeholder="Enter Pincode" onChange={ onChange }/><br/>
                                                                    <label>State</label>
                                                                    <select className="form-select" value={employee.corr_state_id} id="corr_state_id" name="corr_state_id" onChange={ onChange } >
                                                                    <option value="">Select State</option>
                                                                    { data6.map((option, key) => <option value={option.state_id} key={key} >{option.state_name}</option>) }</select><br/>
                                                                    <label className="required-field">Emergency Contact Number</label>
                                                                    <input className="form-control" type="text" value={employee.emergency_contact_number} name="emergency_contact_number" placeholder="Enter Emergency Contact Number" onChange={ onChange }/>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label>Street2</label>
                                                                    <input className="form-control" type="text" value={employee.street2} name="street2" placeholder="Enter Street2" onChange={ onChange }/><br/>
                                                                    <label>City</label>
                                                                    <input className="form-control" type="text" value={employee.city1} name="city1" placeholder="Enter City" onChange={ onChange }/><br/>
                                                                    <label>Country</label>
                                                                    <select className="form-select" value={employee.corr_country_id} id="corr_country_id" name="corr_country_id" onChange={ onChange } onChange={fetchCorStates}>
                                                                    <option value="">Select Country</option>
                                                                    { data.map((option, key) => <option value={option.id} key={key} >{option.country_name}</option>) }</select><br/>
                                                                    <label>Website</label>
                                                                    <input className="form-control" type="text" value={employee.website} name="website" placeholder="Enter Website" onChange={ onChange }/>
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
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="table-responsive">
                            <Table className="table mb-0 border">
                                <thead className="table-light">
                                    <tr>
                                        <th>Degree</th>
                                        <th>University/ Institute</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Percentage/Grade</th>
                                        <th>Specialization</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {inputList.map((x, i) => (
                                  <React.Fragment key={x}>
                                  <tr>
                                    <td><input className="form-control" placeholder="Enter The Degree" type="text" name="degree" value={x.degree} onChange={e => handleInputChange(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter University Name" type="text" name="university" value={x.university} onChange={e => handleInputChange(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Education From Year" type="text" name="from_year" value={x.from_year} onChange={e => handleInputChange(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Education To Year" type="text"  name="to_year" value={x.to_year} onChange={e => handleInputChange(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Percentage Grade" type="text"  name="percentage_grade" value={x.percentage_grade} onChange={e => handleInputChange(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Specialization" type="text"  name="specialization" value={x.specialization} onChange={e => handleInputChange(e, i)}/></td>
                                    <td>{inputList.length > 1 ? <button
                                                      className="mr10"
                                                      onClick={(e) => handleRemoveClick(e,i)} className="btn btn-danger"><i class="fa fa-trash"></i></button> : ''}</td>
                                  </tr>
                                  </React.Fragment>
                                                  ))}
                                </tbody>
                              </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                          <div className="row">
                              <center>
                                <div className="col-md-2">
                                  <button className="btn btn-success mt-3 mt-lg-0" onClick={(e) => handleAddClick(e)}>Add More</button>
                                </div>
                              </center>
                            </div>
                      </div>
                  </div>


                     <h5> <Alert color="success" role="alert">
                     <i className="fa fa-comment">&nbsp;Employment Details</i>
                    </Alert></h5>
                    <div className="mb-3 row">
                      <div className="form-group">
                        <div className="row">
                          <div className="table-responsive">
                            <Table className="table mb-0 border text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th>Organisation</th>
                                        <th>Designation</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Annual CTC</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {employmentList.map((x, i) => (
                                  <React.Fragment key={x}>
                                  <tr>
                                    <td><input className="form-control" placeholder= "Enter Name of Organisation" type="text" name="organisation" value={x.organisation} onChange={e => handleInputChange1(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Designation" type="text" name="designation" value={x.designation} onChange={e => handleInputChange1(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Employment From Year" type="text" name="emp_from_year" value={x.emp_from_year} onChange={e => handleInputChange1(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Employment To Year" type="text"  name="emp_to_year" value={x.emp_to_year} onChange={e => handleInputChange1(e, i)}/></td>
                                    <td><input className="form-control" placeholder="Enter Annual CTC" type="text"  name="annual_ctc" value={x.annual_ctc} onChange={e => handleInputChange1(e, i)}/></td>
                                    <td>{employmentList.length > 1 ? <button
                                                      className="mr10"
                                                      onClick={(e) => handleRemoveClick1(e,i)} className="btn btn-danger"><i class="fa fa-trash"></i></button> : ''}</td>
                                  </tr>
                                  </React.Fragment>
                                                  ))}
                                </tbody>
                              </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="form-group">
                          <div className="row">
                              <center>
                                  <div className="col-md-2">
                                    <button className="btn btn-success mt-3 mt-lg-0" onClick={(e) => handleAddClick1(e)}>Add More</button>
                                  </div>
                              </center>
                            </div>
                      </div>
                  </div>


                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Comapny Info</i>
                                        </Alert></h5>
                                          <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label className="required-field">Comapny</label>
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={employee.mst_companies_id} id="mst_companies_id" name="mst_companies_id" onChange={ onChange } >
                                                             <option value="">Select Company</option>
                                                            { data2.map((option, key) => <option value={option.id} key={key} >{option.company_name}</option>) }
                                                        </select> }

                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Reporting Authority</label>
                                                        {loading1 ? <LoadingSpinner /> :  <select className="form-select" value={employee.reporting_authority_id} id="reporting_authority_id" name="reporting_authority_id" onChange={ onChange } >
                                                                    <option value="">Reporting Auhtority</option>
                                                                    { data5.map((option, key) => <option value={option.id} key={key} >{option.first_name}</option>) }</select> }
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Join Date</label>
                                                        <input className="form-control" value={employee.join_date} type="date"  id="example-date-input" name="join_date" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Resign Date</label>
                                                        <input className="form-control" value={employee.resign_date} type="date"  id="example-date-input" name="resign_date" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank Name</label>
                                                        <input className="form-control" type="text" value={employee.bank_name} name="bank_name" placeholder="Enter Bank Name" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank Branch Name</label>
                                                        <input className="form-control" value={employee.bank_branch_name} type="text" name="bank_branch_name" placeholder="Enter Bank Branch" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>Salary Per Month</label>
                                                        <input className="form-control" value={employee.salary_per_month} type="text" name="salary_per_month" placeholder="Salary Per Month" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Bank A/C No</label>
                                                        <input className="form-control" value={employee.bank_acc_number} type="text" name="bank_acc_number" placeholder="Bank Account No" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Department Name</label>
                                                        {loading1 ? <LoadingSpinner /> :
                                                          <select className="form-select" value={employee.mst_departments_id} id="mst_departments_id" name="mst_departments_id" onChange={ onChange }>
                                                             <option value="">Select Department</option>
                                                            { data4.map((option, key) => <option value={option.id} key={key} >{option.department_name}</option>) }
                                                        </select> }
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Position</label>
                                                       {loading1 ? <LoadingSpinner /> :
                                                        <select className="form-select" value={employee.mst_positions_id} id="mst_positions_id" name="mst_positions_id" onChange={ onChange }>
                                                             <option value="">Select Position</option>
                                                            { data3.map((option, key) => <option value={option.id} key={key} >{option.position_title}</option>) }
                                                         </select> }
                                                    </div>
                                                    <div className="col-md-2">
                                                        <label className="required-field">Username</label>
                                                        <input className="form-control" value={employee.username} placeholder="Enter Username" type="text" name="username" id="username" onChange={ onChange } autocomplete="off"/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className="required-field">Password</label>
                                                        <input className="form-control" value={employee.password} placeholder="Enter Password" type="text" name="password" id="password" onChange={ onChange }/>
                                                        <input className="form-control" value={pass} type="hidden"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">

                                                    <div className="col-md-2">
                                                        <label>In Time</label>
                                                        <input className="form-control" value={employee.in_time} type="time" name="in_time" id="example-time-input" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Out Time</label>
                                                        <input className="form-control" type="time" value={employee.out_time} name="out_time" id="example-time-input" onChange={ onChange }/>
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label>Email Username</label>
                                                        <input className="form-control" value={employee.email_username} placeholder="Enter Email Username" type="text" name="email_username" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label>Email Password</label>
                                                        <input className="form-control" value={employee.email_password} placeholder="Enter Email Password" type="password" name="email_password" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <label>Incoming Mail Type</label>
                                                        <select name="incoming_mail_type" className="form-select" onChange={ onChange } value={employee.incoming_mail_type}>
                                                            <option value="IMAP">IMAP</option>
                                                            <option value="POP">POP</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Incoming Mail Server</label>
                                                        <input className="form-control" placeholder="Enter Incoming Mail Server" type="text" value={employee.incoming_mail_server} name="incoming_mail_server" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Incoming Mail Server Port</label>
                                                        <input className="form-control" value={employee.incoming_mail_server_port} placeholder="Enter Incoming Mail Server Port" type="text" name="incoming_mail_server_port" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Outgoing Mail Server</label>
                                                        <input className="form-control" value={employee.outgoing_mail_server} placeholder="Enter Outgoing Mail Server" type="text" name="outgoing_mail_server" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label>Outgoing Mail Server Port</label>
                                                        <input className="form-control" value={employee.outgoing_mail_server_port} placeholder="Enter Outgoing Mail Server Port" type="text" name="outgoing_mail_server_port" onChange={ onChange }/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h5> <Alert color="danger" role="alert">
                                         <i className="fa fa-comment">&nbsp;Employee Document's No And Upload</i>
                                        </Alert></h5>

                                        <div className="mb-3 row">
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <label>Aadhar Card</label>

                                                        <input name="aadhar_card_photo" type="file" className="form-control" onChange={ changeAadharHandler }/>
                                                        <input className="form-control" type="hidden" value={attachments.attach_aadhar_card_photo}/>
                                                        {attachments.attach_aadhar_card_photo !== '' ?
                                                            <div className="mb-3 row">
                                                            <div className="form-group">
                                                              <div className="row">
                                                                <div className="col-md-10">
                                                                <a href={employee_document_path+attachments.attach_aadhar_card_photo} style={attachment_style} className="btn btn-info form-control btn-sm" target="_blank">Click To Open Aadhar Card Document</a>
                                                                </div>
                                                                <div className="col-md-2">
                                                                <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteAadhar(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                </div>
                                                               </div>
                                                            </div>
                                                            </div> 
                                                        : ''}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label>Aadhar Card No</label>
                                                        <input className="form-control" type="text"  value={employee.aadhar_number} name="aadhar_number" onChange={ onChange }/>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Election Card</label>

                                                        <input name="election_card_photo" type="file" className="form-control" onChange={ changeElectionCardHandler }/>
                                                        <input className="form-control" type="hidden" value={attachments.attach_election_card_photo}/>
                                                        {attachments.attach_election_card_photo !== '' ?
                                                          <div className="mb-3 row">
                                                            <div className="form-group">
                                                              <div className="row">
                                                                <div className="col-md-10">
                                                                <a href={employee_document_path+attachments.attach_election_card_photo} style={attachment_style} className="btn btn-dark form-control btn-sm" target="_blank">Click To Open Election Card Document</a>
                                                                </div>
                                                                <div className="col-md-2">
                                                                  <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteEelection(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                </div> 
                                                              </div> 
                                                            </div>
                                                          </div> 
                                                            
                                                        : ''}
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Election Card No</label>
                                                        <input className="form-control" type="text"  value={employee.election_card_number} name="election_card_number" onChange={ onChange }/>
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
                                                        <input className="form-control" type="hidden" value={attachments.attach_pan_card_photo}/>
                                                        {attachments.attach_pan_card_photo !== '' ?
                                                          <div className="mb-3 row">
                                                            <div className="form-group">
                                                              <div className="row">
                                                                <div className="col-md-10">
                                                                <a href={employee_document_path+attachments.attach_pan_card_photo} style={attachment_style} className="btn btn-primary form-control btn-sm" target="_blank">Click To Open PanCard Document</a>
                                                                </div>
                                                                <div className="col-md-2">
                                                                  <button className="form-control btn btn-danger btn-sm" onClick={e => DeletePan(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                </div> 
                                                              </div> 
                                                            </div>
                                                          </div>                                                        
                                                            
                                                        : ''}
                                                    </div>

                                                     <div className="col-md-3">
                                                        <label>Pan Card No</label>
                                                        <input className="form-control" type="text"  value={employee.pan_card_number} name="pan_card_number" onChange={ onChange }/>
                                                    </div>

                                                      <div className="col-md-3">
                                                        <label>Passport Scan Copy</label>

                                                        <input name="passport_photo" type="file" className="form-control" onChange={ changePassportHandler }/>
                                                        <input className="form-control" type="hidden" value={attachments.attach_passport_photo}/>
                                                        {attachments.attach_passport_photo !== '' ?
                                                          <div className="mb-3 row">
                                                            <div className="form-group">
                                                              <div className="row">
                                                                <div className="col-md-10">
                                                                  <a href={employee_document_path+attachments.attach_passport_photo} style={attachment_style} className="btn btn-success form-control btn-sm" target="_blank">Click To Open Passport Copy Document</a>
                                                                </div>
                                                                <div className="col-md-2">
                                                                  <button className="form-control btn btn-danger btn-sm" onClick={e => DeletePassport(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                </div> 
                                                              </div> 
                                                            </div>
                                                        </div>   
                                                        : ''}
                                                    </div>

                                                    <div className="col-md-3">
                                                        <label>Passport No</label>
                                                        <input className="form-control" type="text" value={employee.passport_number} name="passport_number" onChange={ onChange }/>
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
                                                        <input className="form-control" type="hidden" value={attachments.attach_driving_license_photo}/>
                                                        {attachments.attach_driving_license_photo !== '' ?
                                                          <div className="mb-3 row">
                                                            <div className="form-group">
                                                              <div className="row">
                                                                <div className="col-md-11">
                                                                  <a href={employee_document_path+attachments.attach_driving_license_photo} style={attachment_style} className="btn btn-warning form-control btn-sm" target="_blank">Click To Open Driving Licence Document</a>
                                                                </div>
                                                                <div className="col-md-1">
                                                                  <button className="form-control btn btn-danger btn-sm" onClick={e => DeleteDrivingLicence(e)} style={delete_btn_style}><i className='fa fa-trash'></i></button>
                                                                </div> 
                                                              </div> 
                                                            </div>
                                                          </div>   
                                                        : ''}
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label>Driving Licence No</label>
                                                        <input className="form-control" type="text"  value={employee.driving_license_number} name="driving_license_number" onChange={ onChange }/>
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

export default EditEmployee
