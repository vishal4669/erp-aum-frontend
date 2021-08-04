import React, { useState } from "react"
import { MDBDataTable } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle,Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    ButtonDropdown,Button } from "reactstrap"
import { withRouter, Link } from "react-router-dom"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../Tables/datatables.scss"
import HorizontalLayout from "../../components/HorizontalLayout"
const ListProduct = () => {
    const [drop_align, setDrop_align] = useState(false)
    const [drop_align1, setDrop_align1] = useState(false)
  const data = {
    columns: [
      {
        label: "SR No",
        field: "srno",
        sort: "asc",
        width: 150,
      },
      {
        label: "Pharmacopiea",
        field: "pharmacopiea",
        sort: "asc",
        width: 270,
      },
      {
        label: "Product Name",
        field: "productname",
        sort: "asc",
        width: 200,
      },
      {
        label: "FP/RM/G",
        field: "fprmg",
        sort: "asc",
        width: 100,
      },
      {
        label: "Generic Name",
        field: "genericname",
        sort: "asc",
        width: 100,
      },
      {
        label: "Sample Description",
        field: "sampledescription",
        sort: "asc",
        width: 100,
      },
      {
        label: "Unit",
        field: "unit",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [
      {
        srno: "1",
        pharmacopiea: "IHS",
        productname: "Curie Hand & Body Lotion",
        fprmg: "Finsihed Product",
        genericname: "Curie Hand & Body Lotion",
        sampledescription: "Clear colourless lotion.",
        unit: "Kg",
        action: <div><Link className="btn btn-primary" to="">
              <i className="fa fa-edit"></i></Link>&nbsp;&nbsp;
              <button class=" btn btn-danger"><i class="fas fa-trash-alt"></i></button>&nbsp;&nbsp;
              <Link className="btn btn-info" to="">
              <i className="fa fa-eye"></i></Link></div>,
      },
      
    ],
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
                    <li className="breadcrumb-item active">Products</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                    <li> 
                      <Link to="/add-product" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Product</Link>
                    </li>&nbsp;
                    <li>
                        <div className="btn-group">
                        <ButtonDropdown
                        isOpen={drop_align1}
                        direction="right"
                        toggle={() => setDrop_align1(!drop_align1)}
                        >
                        <DropdownToggle
                            caret
                            color="primary"
                            className="dropdown-toggle"
                            aria-expanded="false"
                        >
                            Action
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu dropdown-menu-right">
                            <DropdownItem><i class="fa fa-print"></i> &nbsp;Print</DropdownItem>
                            <DropdownItem><i class="fas fa-file-export"></i> &nbsp;Export to Excel</DropdownItem>
                            <DropdownItem><i class="fas fa-file-export"></i> &nbsp;Export To PDF</DropdownItem>
                            <DropdownItem><i class="fas fa-file-export"></i> &nbsp;Export As HTML</DropdownItem>
                        </DropdownMenu>
                        </ButtonDropdown>
                        
                        </div>
                    </li>
                </ol>
            </div>        
        </div>

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable striped bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ListProduct
