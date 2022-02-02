import React from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody,DropdownItem } from "reactstrap"
import { DropdownButton } from 'react-bootstrap';
import axios from 'axios'
import "../Tables/datatables.scss"
import HorizontalLayout from "../../components/HorizontalLayout"
import { Link } from "react-router-dom"
import { ToastContainer} from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";

class ListFormula extends React.Component {

    constructor(props) {

        super(props);

        this.state= {

          posts: [],

          loading : false,
          loading1 : false,

          data1 : [],

          tableRows: [],
          count :0

        };
        const headers = {
          'Content-Type': "application/json",
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

        const del_headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

        }

    this.deleteFormula= (formula_id) =>{
      this.setState({ loading: true }, () => {
     axios.post(`${process.env.REACT_APP_BASE_APIURL}deleteFormula/`+formula_id,null, { headers: del_headers})
    .then(response => {
      if(response.data.success == true){
        props.history.push('/all-formula');
        props.history.push('/formula');
        toastr.success(response.data.message);
        this.setState({loading: false});
    }
    else{
        props.history.push('/formula');
        toastr.error(response.data.message);
        this.setState({loading: false});
      }
    })
      .catch((error) => {
        this.setState({loading: false});
        toastr.error(error.response.data.message);
      })
    })
    }

    this.printFormula =  () => {
      window.print()
    }
    this.ExportToExcel = () => {
      this.setState({loading1: true}, () => {
        axios.get(`${process.env.REACT_APP_BASE_APIURL}exportFormula`,{headers:headers})
        .then(response => {
          if(response.data.success == true){
            var formula_data = response.data.data.map((post,index)=>({
              "SR No" : index+1,
              "Formula Name" : post.formula_name,
              "Formula Type" : post.formula_type,
            }))
            const sheet = XLSX.utils.json_to_sheet(formula_data)
            const workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workbook,sheet,'Formula Data')
            XLSX.writeFile(workbook,'FormulaData.csv')
            this.setState({loading1:false})
            toastr.success("Formula Data is Exported successfully in CSV Format")
          } else {
            toastr.error(response.data.message);
            this.setState({loading1 : false});
          }
        })
        .catch(error => {
          toastr.error(error.response.data.message);
          this.setState({loading1 : false});
        })
      })
    }

    this.ExportToPDF = () => {
      this.setState({loading1: true}, () => {
      var doc = new jsPDF();
        const tableColumn = ["SR NO", "Formula Name", "Formula Type"];
        const tableRows = [];
      var blob = doc.output('blob');
        axios.get(`${process.env.REACT_APP_BASE_APIURL}exportFormula`,{headers:headers})
          .then(response => {
            if(response.data.success == true){
              var formula_data = response.data.data.map((post,index)=>({
                "SR No" : index+1,
                "Formula_Name" : post.formula_name,
                "Formula_Type" : post.formula_type,
              }))
              formula_data.forEach((formula,index) => {
                const formulaData = [
                  index+1,
                  formula.Formula_Name,
                  formula.Formula_Type,
                ];
                tableRows.push(formulaData);
              });
                doc.autoTable(tableColumn, tableRows, { startY: 20 });
                doc.save(`FormulaData.pdf`);
                this.setState({loading1 : false});
                toastr.success("Formula Data is Exported successfully in PDF Format")
            } else {
              toastr.error(response.data.message);
              this.setState({loading1 : false});
            }
          })
        })
    }

      this.componentWillMount=async() => {
                    this.setState({ loading: true }, () => {
        axios.get(`${process.env.REACT_APP_BASE_APIURL}listFormula`, { headers: headers})

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
              toastr.error(error.response.data.message);
              this.setState({ loading: false });
            })

        })
      }

      this.assemblePosts= () => {
        let posts =this.state.posts.map((post) => {
            const { data, loading } = this.state;
            const { data2, loading1 } = this.state;
            this.setState({
      count: this.state.count + 1
    });
          return (

            {

              srno: this.state.count,

              name: post.formula_name,
              type: post.formula_type,

              action : <div><Link className="btn btn-primary btn-sm" to={"/edit-formula/"+base64_encode(post.id)}>
              <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;{loading ? <a className="btn btn-primary w-100 waves-effect waves-light"
                           > <LoadingSpinner /> </a>  :
              <button class=" btn btn-danger btn-sm" onClick={() => {if(window.confirm('Are you sure to Delete this Formula?')){ this.deleteFormula(post.id)}}}><i class="fas fa-trash-alt"></i></button>}
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

              label:'Name',

              field:'name',

            },
            {

                label:'Type',

                field:'type',

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
                          <li className="breadcrumb-item active">Formula</li>
                      </ol>
                  </div>
                  <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                          <li>
                            <Link to="/add-formula" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Formula</Link>
                          </li>&nbsp;
                          <li><Link to="" className="btn btn-primary"><i className="fa fa-check">&nbsp;Testing</i></Link></li>
                          &nbsp;
                         {loading1 ?  <center><LoadingSpinner /></center> :
                            <li>
                              <div className="btn-group">
                                <DropdownButton  title="Actions" drop="left">
                                    <DropdownItem onClick={this.printFormula}><i class="fa fa-print"></i> &nbsp;Print</DropdownItem>
                                    <DropdownItem onClick={this.ExportToExcel}><i class="fas fa-file-export"></i> &nbsp;Export to Excel</DropdownItem>
                                    <DropdownItem onClick={this.ExportToPDF}><i class="fas fa-file-export"></i> &nbsp;Export To PDF</DropdownItem>
                                </DropdownButton>
                              </div>
                            </li>}
                      </ol>
                  </div>
              </div>

                <Row>
                  <Col className="col-12">
                    <Card>
                      <CardBody>
                        { loading ? <center><LoadingSpinner /></center> :
                          <MDBDataTable striped bordered data={data1} />
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



export default ListFormula
