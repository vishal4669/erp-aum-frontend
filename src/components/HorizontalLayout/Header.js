import React, { Fragment, useState, useEffect } from "react"
import PropTypes from 'prop-types'

import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"
// reactstrap

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import logoLight from "../../assets/images/logo-light.png"

import { Redirect } from 'react-router';

//i18n
import { withTranslation } from "react-i18next"
import { extendWith } from "lodash"

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingSpinner from '../../components/LoadingSpinner'

const Header = props => {
  const [isSearch, setSearch] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem('email') === null && localStorage.getItem('token') === null) {
    window.location.href = "/";
    return
}

const del_headers = {
          'Authorization' : "Bearer "+localStorage.getItem('token')

}

    axios.get(`${process.env.REACT_APP_BASE_APIURL}user`,{ headers: del_headers})
     .then(response => {

      if(response.data.status === 401 && response.data.success === true) {
                  localStorage.clear();
                  localStorage.setItem('setLoggedOut', 'true');
                  window.location.href = '/login';
              }
    })


    .catch((error) => {
      if(error.response.data.status === 401 && error.response.data.success === true) {
                  localStorage.clear();
                  localStorage.setItem('setLoggedOut', 'true');
                  window.location.href = '/login';
              }
      toast.error(error.response.data.message);
    })


  const logout = () => {
    {setLoading(true)};
     axios.post(`${process.env.REACT_APP_BASE_APIURL}logout`,null, { headers: del_headers})
     .then(response => {
      // chnage success to true when it is done
      if(response.data.success == true && response.data.status == 200){
        localStorage.clear();
        window.location.href = '/';
        toast.success(response.data.message);
        localStorage.setItem('setLoggedOut', 'true');
        { setLoading(false) }
       //toast is not working
      }
    })
    .catch((error) => {
              { setLoading(false) }
              toast.error(error.response.data.message);
    })
  }

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }
  return (
    <React.Fragment>
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoLight} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="40" />
                </span>
              </Link>

              <Link to="/dashboard" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLight} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight} alt="" height="40" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu)
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars"/>
            </button>


          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                onClick={() => setSearch(!isSearch)}
              >
                <i className="uil-search"></i>
              </button>
              <div
                className={
                  isSearch
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={props.t("Search") + "..."}
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>


            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={() => {
                  toggleFullscreen()
                }}
                data-toggle="fullscreen"
              >
                <i className="fas fa-expand"></i>
              </button>
            </div>

            <ProfileMenu />

           {/* <div className="dropdown d-inline-block">
              <button
                onClick={() => {
                  props.showRightSidebarAction(!props.showRightSidebar)
                }}
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="uil-cog"></i>
              </button>
            </div>*/}

            <div className="dropdown d-none d-lg-inline-block ms-1">
              {loading ? <a className="btn btn-primary w-100 waves-effect waves-light" style={{marginTop : '16px'}}
                           > <LoadingSpinner /> </a>  :<button
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>}
            </div>

          </div>
        </div>
    </React.Fragment>
  )
}

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { layoutType, showRightSidebar, leftMenu }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header))
