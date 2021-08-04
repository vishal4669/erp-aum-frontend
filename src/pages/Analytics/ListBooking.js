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
const ListBooking = () => {
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
        label: "COA Print",
        field: "coaprint",
        sort: "asc",
        width: 270,
      },
      {
        label: "Aum Sr No",
        field: "aumsrno",
        sort: "asc",
        width: 100,
      },
      {
        label: "Booking No",
        field: "bookingno",
        sort: "asc",
        width: 100,
      },
      {
        label: "Type",
        field: "type",
        sort: "asc",
        width: 100,
      },
      {
        label: "Receipt Date",
        field: "receiptdate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Product Name",
        field: "productname",
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
        coaprint: "0",
        aumsrno: "31411",
        bookingno: "ARL/COA/FP/210412/024",
        type: "Finished Product",
        receiptdate : "12/04/2021",
        productname: "Laxicool Tablets",
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
                    <li className="breadcrumb-item active">Bookings</li>
                </ol>
            </div>
            <div className="page-title-right">
                <ol className="breadcrumb m-0">
                   
                    <li><Link to="#" className="btn btn-primary"><i className="fa fa-envelope">&nbsp;SMS</i></Link></li>&nbsp;
                    <li><Link to="#" className="btn btn-primary"><i className="fa fa-envelope">&nbsp;Email</i></Link></li> &nbsp;
                    <li><Link to="#" className="btn btn-primary">Booking Rate</Link></li>&nbsp;
                    <li><Link to="/add-booking" color="primary" className="btn btn-primary"><i className="fa fa-plus"></i>&nbsp;New Booking</Link>
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
                            <DropdownItem><i class="fa fa-barcode"></i> &nbsp;Generate Barcode</DropdownItem>
                            <DropdownItem><i class="fa fa-file"></i> &nbsp;Generate ROA</DropdownItem>
                            <DropdownItem><i class="fas fa-file"></i> &nbsp;Generate COA</DropdownItem>
                            <DropdownItem><i class="fas fa-file-export"></i> &nbsp;Export To Excel</DropdownItem>
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

export default ListBooking
