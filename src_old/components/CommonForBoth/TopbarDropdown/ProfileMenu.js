import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user4 from "../../../assets/images/users/avatar-4.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.displayName)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setusername(obj.username)
      }
    }
  }, [props.success])

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user4}
            alt="Header Avatar"
          /> &nbsp;
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{localStorage.getItem('first_name')}  {localStorage.getItem('last_name')}</span>{" "}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/">
            {" "}
            <i className="fa fa-cog font-size-18 align-middle text-muted me-1"></i>
            {props.t("Issue Log")}{" "}
          </DropdownItem><br/>
          <DropdownItem tag="a" href="/">
            <i className="fas fa-calendar font-size-18 align-middle me-1 text-muted"></i>
            {props.t("Settings")}
          </DropdownItem><br/>
          <DropdownItem tag="a" href="#" >
            <i className="fa fa-cog font-size-18 align-middle me-1 text-muted"></i>
            {props.t("Approvals")}
          </DropdownItem><br/>
          <DropdownItem tag="a" href="/">
            <i className="fa fa-hdd font-size-18 align-middle me-1 text-muted"></i>
            {props.t("Backup")}
          </DropdownItem>
         
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
