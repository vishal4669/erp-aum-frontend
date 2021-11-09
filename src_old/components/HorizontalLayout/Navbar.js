import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const [ui, setui] = useState(false)
  const [app, setapp] = useState(false)
  const [email, setemail] = useState(false)
  const [ecommerce, setecommerce] = useState(false)
  const [contact, setcontact] = useState(false)
  const [component, setcomponent] = useState(false)
  const [form, setform] = useState(false)
  const [table, settable] = useState(false)
  const [chart, setchart] = useState(false)
  const [icon, seticon] = useState(false)
  const [map, setmap] = useState(false)
  const [extra, setextra] = useState(false)
  const [invoice, setinvoice] = useState(false)
  const [auth, setauth] = useState(false)
  const [utility, setutility] = useState(false)

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  })
  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="topnav">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                  >
                    <i className="fa fa-home me-2"></i>
                    {" "}{props.t("Dashboard")}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-users me-2"></i>
                    {props.t("HR")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="/employee" className="dropdown-item">
                      {props.t("Employee")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Holiday")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Leaves")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Task")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("HR Documents")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Attendence")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Opening Leave Balance")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Salary")}
                    </Link>
                  </div>
                </li>

                 <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-th me-2"></i>
                    {props.t("Accounts")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="" className="dropdown-item">
                      {props.t("Sales GST")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Other Sales GST")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Purchase Bill")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Bank & Cash")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Voucher")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Credit Note")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Debit Note")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Other Purchase")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-th-large me-2"></i>
                    {props.t("Sales")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="/customer" className="dropdown-item">
                      {props.t("Customers")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Quotation")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Customer Price List")}
                    </Link>
                  </div>
                </li>

                 <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-database me-2"></i>
                    {props.t("Masters")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="/group" className="dropdown-item">
                      {props.t("Groups")}
                    </Link><br/>
                    <Link to="/ledger" className="dropdown-item">
                      {props.t("Ledger")}
                    </Link><br/>
                    <Link to="/company" className="dropdown-item">
                      {props.t("Company")}
                    </Link><br/>

                    <Link to="/branch" className="dropdown-item">
                      {props.t("Branch")}
                    </Link><br/>

                    <Link to="/department" className="dropdown-item">
                      {props.t("Department")}
                    </Link><br/>

                   {/*<Link to="" className="dropdown-item">
                      {props.t("Financial Year")}
                    </Link><br/>*/}

                    <Link to="/position" className="dropdown-item">
                      {props.t("Position Master")}
                    </Link><br/>

                    <Link to="/bankaccount" className="dropdown-item">
                      {props.t("Bank Account Master")}
                    </Link><br/>

                    <Link to="/material" className="dropdown-item">
                      {props.t("Material")}
                    </Link><br/>

                    <Link to="/location" className="dropdown-item">
                      {props.t("Location")}
                    </Link><br/>

                    <Link to="/machine" className="dropdown-item">
                      {props.t("Machine")}
                    </Link><br/>

                    <Link to="/unit" className="dropdown-item">
                      {props.t("Unit Master")}
                    </Link><br/>

                    <Link to="/category" className="dropdown-item">
                      {props.t("Category Master")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fas fa-warehouse me-2"></i>
                    {props.t("Stock")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="" className="dropdown-item">
                      {props.t("Manage Indent")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Purchase Order")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Material Issue")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("GRN")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Stock")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Material Use")}
                    </Link>
                  </div>
                </li>

                 <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-industry me-2"></i>
                    {props.t("Manufacturing")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="" className="dropdown-item">
                      {props.t("Stock Transfer")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("BOM")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Work Orders")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Material Wastage")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Daily Production")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Stock Audit")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Part Concession Note")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("SOP")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-chart-line me-2"></i>
                    {props.t("Analytics")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="/pharmacopiea" className="dropdown-item">
                      {props.t("Pharmacopiea")}
                    </Link><br/>
                    <Link to="/products" className="dropdown-item">
                      {props.t("Products")}
                    </Link><br/>
                    <Link to="/booking" className="dropdown-item">
                      {props.t("Bookings")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Test")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Instruments")}
                    </Link>
                  </div>
                </li>


                <li className="nav-item dropdown">
                  <Link
                    className="nav-link  arrow-none"
                    to=""
                    onClick={e => {
                      e.preventDefault()
                      setextra(!extra)
                    }}
                  >
                    <i className="fas fa-file me-2"></i>
                    {props.t("Reports")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: extra })}>

                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setauth(!auth)
                        }}
                      >
                        {props.t("Analytics")}{" "}
                        <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="" className="dropdown-item">
                          {props.t("Pending Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Summary Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Test Summary")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Chemist Test")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("User Activity")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("COA Release Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Block Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Analysis Report")}
                        </Link>
                        
                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setauth(!auth)
                        }}
                      >
                        {props.t("Accounts")}{" "}
                        <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="" className="dropdown-item">
                          {props.t("Balance Sheet")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Profit & Loss Statement")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Outstanding Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Trial Balance")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Ledger Statement")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Service Tax Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Bank Book")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Cash Book")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Bank Reconsilation")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("P and I")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Day Book")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Sales Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Purchase Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("GST Report")}
                        </Link><br/>                       
                        
                        <Link to="" className="dropdown-item">
                          {props.t("Without GST Report")}
                        </Link>

                      </div>
                    </div>
                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setauth(!auth)
                        }}
                      >
                        {props.t("Stock")}{" "}
                        <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="" className="dropdown-item">
                          {props.t("Stock Register")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Old Stock")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Purchase Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Material Issue Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Pending Indent Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Pending PO Report")}
                        </Link><br/>

                        <Link to="" className="dropdown-item">
                          {props.t("Pending GRN Report")}
                        </Link>
                      </div>
                    </div>

                    <div className="dropdown">
                      <Link
                        to="/#"
                        className="dropdown-item arrow-none"
                        onClick={e => {
                          e.preventDefault()
                          setauth(!auth)
                        }}
                      >
                        {props.t("Sale")}{" "}
                        <div className="arrow-down"></div>
                      </Link>
                      <div
                        className={classname("dropdown-menu", { show: auth })}
                      >
                        <Link to="" className="dropdown-item">
                          {props.t("Sales Report")}
                        </Link>
                      </div>
                    </div>

                  </div>
                    
                </li>

                <li className="nav-item dropdown">
                  <Link
                    to="/#"
                    onClick={e => {
                      e.preventDefault()
                      setapp(!app)
                    }}
                    className="nav-link dropdown-togglez arrow-none"
                  >
                    <i className="fa fa-check me-2"></i>
                    {props.t("QA")} <div className="arrow-down"></div>
                  </Link>
                  <div className={classname("dropdown-menu", { show: app })}>
                    <Link to="" className="dropdown-item">
                      {props.t("Document")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Notification")}
                    </Link><br/>
                    <Link to="" className="dropdown-item">
                      {props.t("Method")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Audit Trial")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Working of Standard")}
                    </Link><br/>

                    <Link to="" className="dropdown-item">
                      {props.t("Expiry Date Working Standard")}
                    </Link>
                  </div>
                </li>

              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(Navbar))
)