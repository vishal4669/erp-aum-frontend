import React, { useState,useEffect } from "react"
import {   TabContent,
  TabPane,
  Collapse,
  NavLink,
  NavItem,
  Nav,Container, Row, Col, CardBody, Card,CardTitle,Badge,Table,Form} from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import MiniWidget from "./mini-widget"
import SalesAnalyticsChart from "./salesanalytics-chart"
import RecentActivity from "./recent-activity"

import classnames from "classnames"

import HorizontalLayout from "../../components/HorizontalLayout/index"
import { ToastContainer } from "react-toastr";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios';
import moment from 'moment'
import LoadingSpinner from '../../components/LoadingSpinner';
import PropTypes from 'prop-types';

const series1 = [{
  data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
}]

const options1 = {
  fill: {
    colors: ['#5b73e8']
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  tooltip: {
    fixed: {
      enabled: !1
    },
    x: {
      show: !1
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return ''
        }
      }
    },
    marker: {
      show: !1
    }
  }
};

const series2 = [70]

const options2 = {
  fill: {
    colors: ['#34c38f']
  },
  chart: {
    sparkline: {
      enabled: !0
    }
  },
  dataLabels: {
    enabled: !1
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '60%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        show: !1
      }
    }
  }
};

const series3 = [55]

const options3 = {
  fill: {
    colors: ['#5b73e8']
  },
  chart: {
    sparkline: {
      enabled: !0
    }
  },
  dataLabels: {
    enabled: !1
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '60%'
      },
      track: {
        margin: 0
      },
      dataLabels: {
        show: !1
      }
    }
  }
};

const series4 = [{
  data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
}]

const options4 = {

  fill: {
    colors: ['#f1b44c']
  },
  chart: {
    width: 70,
    sparkline: {
      enabled: !0
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  xaxis: {
    crosshairs: {
      width: 1
    },
  },
  tooltip: {
    fixed: {
      enabled: !1
    },
    x: {
      show: !1
    },
    y: {
      title: {
        formatter: function (seriesName) {
          return ''
        }
      }
    },
    marker: {
      show: !1
    }
  }
};

const Dashboard = (props) => {
const headers = {
    'Authorization': "Bearer " + localStorage.getItem('token')
}

const analytics_style = {
  	display: 'table',
  	width: '100%',
  	tableLayout: 'fixed'
}
/*const analytics_header_style = {
  background: '#c7c3c3'
}*/

const [dashboardCount,setdashboardCount] = useState([{PendingTests_Count:'',Analitics_count:'',ForApproval_count:'',
Approved_count:'',Rejected_count:''}])
const [loading, setLoading] = useState(false);
const [loading1, setLoading1] = useState(false);

useEffect(() => {
    counter_data();
        }, []);

const counter_data = () => {
 {setLoading1(true)};
  axios.get(`${process.env.REACT_APP_BASE_APIURL}listCounts`, { headers })
    .then(response => {
        setdashboardCount(response.data.data)
      {setLoading1(false)}
      })
      .catch((error) => {
        toastr.error(error.response.data.message);
        {setLoading1(false)}
      })
}


const [activeTabJustify, setactiveTabJustify] = useState("1")
function toggleCustomJustified(tab) {
  if (activeTabJustify !== tab) {
    setactiveTabJustify(tab)
  }

}

  const reports = [

    {
      id: 1,
      icon: "fas fa-book btn-lg",
      title: "Today's New Booking",
      value: 15,
      decimal: '',
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      series: series4,
      options: options4,
    },

    {
      id: 2,
      title: "Total Pending Reports",
      value: 334,
      icon:"fa fa-file btn-lg",
      prefix: "",
      suffix: "",
      badgeValue: "",
      charttype: "radialBar",
      decimal: 0,
      chartheight: 40,
      chartwidth: 70,
      series: series3,
      options: options3,

    },
    {
      id: 3,
      title: "Total Pending Report to Invoice",
      value: 166,
      icon:"fas fa-file-invoice btn-lg",
      prefix: "",
      suffix: "",
      badgeValue: "",
      charttype: "radialBar",
      decimal: 0,
      chartheight: 40,
      chartwidth: 70,
      series: series3,
      options: options3,

    },
    {
      id: 4,
      title: "Upcoming Events",
      value: 0,
      icon:"fa fa-calendar btn-lg",
      prefix: "",
      suffix: "",
      badgeValue: "",
      decimal: 0,
      charttype: "radialBar",
      chartheight: 40,
      chartwidth: 70,
      series: series3,
      options: options3,

    },
    {
      id: 5,
      title: "Today's Release COA",
      value: 5,
      icon:"fa fa-list btn-lg",
      prefix: "",
      suffix: "",
      badgeValue: "",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      series: series1,
      options: options1,

    },
    {
      id: 6,
      title: "Today's Prepared Invoice",
      value: 10,
      icon:"fas fa-file-invoice btn-lg",
      prefix: "",
      suffix: "",
      badgeValue: "",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      series: series4,
      options: options4,

    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
      <HorizontalLayout/>
        <Container fluid>
                  <Breadcrumbs title="Home" breadcrumbItem="Dashboard" />
          <Row>
            <MiniWidget reports={reports} />
          </Row>
            <Row>
              <Col xl={12}>
              <Card>
              { loading1 ? <center><LoadingSpinner /><br/></center> :
                <CardBody>
                  <CardTitle className="h4">Quick Access Tabs</CardTitle>

                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "1",
                        })}
                        onClick={() => {
                          toggleCustomJustified("1")
                        }}
                      >
                        <i className="fa fa-tasks"></i>
                        <span className="d-none d-sm-block">Task</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "2",
                        })}
                        onClick={() => {
                          toggleCustomJustified("2")
                        }}
                      >
                        <i className="fas fa-chart-line"></i>&nbsp;<span className="badge bg-soft-dark">{dashboardCount.Analitics_count}</span>
                        <span className="d-none d-sm-block">Analytics</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "3",
                        })}
                        onClick={() => {
                          toggleCustomJustified("3")
                        }}
                      >
                        <i className="fa fa-thumbs-up"></i>&nbsp;<span className="badge bg-soft-dark">{dashboardCount.PendingTests_Count}</span>
                        <span className="d-none d-sm-block">Need to Assign</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "4",
                        })}
                        onClick={() => {
                          toggleCustomJustified("4")
                        }}
                      >
                        <i className="fa fa-file"></i>&nbsp;<span className="badge bg-soft-dark">{dashboardCount.ForApproval_count}</span>
                        <span className="d-none d-sm-block">For Approval</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "5",
                        })}
                        onClick={() => {
                          toggleCustomJustified("5")
                        }}
                      >
                        <i className="fa fa-check"></i>&nbsp;<span className="badge bg-soft-dark">{dashboardCount.Approved_count}</span>
                        <span className="d-none d-sm-block">Approved</span>
                      </NavLink>
                    </NavItem>

                    {/*<NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "6",
                        })}
                        onClick={() => {
                          toggleCustomJustified("6")
                        }}
                      >
                        <i className="fa fa-times"></i>&nbsp;<span className="badge bg-soft-dark">{dashboardCount.Rejected_count}</span>
                        <span className="d-none d-sm-block">Reject</span>
                      </NavLink>
                    </NavItem>*/}
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "7",
                        })}
                        onClick={() => {
                          toggleCustomJustified("7")
                        }}
                      >
                        <i className="fa fa-print"></i>
                        <span className="d-none d-sm-block">Print</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "8",
                        })}
                        onClick={() => {
                          toggleCustomJustified("8")
                        }}
                      >
                        <i className="fa fa-users"></i>
                        <span className="d-none d-sm-block">HR</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "9",
                        })}
                        onClick={() => {
                          toggleCustomJustified("9")
                        }}
                      >
                        <i className="fab fa-houzz"></i>
                        <span className="d-none d-sm-block">Stock</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTabJustify}>
                    <TabPane tabId="1" className="p-3">
                      <p className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts Austin.
                        Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                        cliche tempor, williamsburg carles vegan helvetica. Reprehenderit
                        butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi,
                        qui irure terry richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel, butcher
                        voluptate nisi qui.
                                            </p>
                    </TabPane>
                    <TabPane tabId="2" className="p-3">
                    <i className="fas fa-chart-bar"></i>&nbsp;&nbsp;Total Assinged Test For Analytics To Chemist Count is <span className="badge bg-soft-primary" style={{fontSize:"100%"}}>{dashboardCount.Analitics_count}</span> . Click on Add Result Button to Add the result for the test.
                    &nbsp;&nbsp;<Link type="button" to="/analytics-test-data" class="btn btn-warning waves-effect waves-light btn-sm">
                    Add Result <i class="fa fa-share"></i></Link>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                      <i className="fas fa-chart-bar"></i>&nbsp;&nbsp;Total Pending Assign : <span className="badge bg-soft-primary" style={{fontSize:"100%"}}>{dashboardCount.PendingTests_Count}</span> to chemist.
                      &nbsp;&nbsp;<Link type="button" to="/assign-test" class="btn btn-primary waves-effect waves-light btn-sm">
                      Assign <i class="fa fa-share"></i></Link>
                    </TabPane>

                    <TabPane tabId="4" className="p-3">
                    <i className="fas fa-chart-bar"></i>&nbsp;&nbsp;Total Pending For Approval Test is <span className="badge bg-soft-info" style={{fontSize:"100%"}}>{dashboardCount.ForApproval_count}</span> .
                    To Approve OR Reject Test Result Click on For Approval Button to Approve/Reject Data. &nbsp;&nbsp; <Link type="button" to="/for-approval-test-result" class="btn btn-info waves-effect waves-light btn-sm">
                    For Approval <i class="fa fa-share"></i></Link>

                    </TabPane>
                    <TabPane tabId="5" className="p-3">
                    <i className="fas fa-chart-bar"></i>&nbsp;&nbsp;Total Approved Test Count is <span className="badge bg-soft-success" style={{fontSize:"100%"}}>{dashboardCount.Approved_count}</span> . For More Details to See Approved Data Click on View Button to View Data.
                    &nbsp;&nbsp;<Link type="button" to="/view-approved-data-list" class="btn btn-success waves-effect waves-light btn-sm">
                    View Approved Data List <i class="fa fa-share"></i></Link>
                    </TabPane>
                    {/*<TabPane tabId="6" className="p-3">
                    <i className="fas fa-chart-bar"></i>&nbsp;&nbsp;Total Rejected Test Count is <span className="badge bg-soft-danger" style={{fontSize:"100%"}}>{dashboardCount.Rejected_count}</span> . For More Details to See Rejected Data Click on View Button to View Data.
                    &nbsp;&nbsp;<Link type="button" to="/view-rejected-data-list" class="btn btn-danger waves-effect waves-light btn-sm">
                    View Rejected Data List <i class="fa fa-share"></i></Link>
                    </TabPane>*/}
                    <TabPane tabId="7" className="p-3">
                      <p className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                        art party before they sold out master cleanse gluten-free squid
                        scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                        art party locavore wolf cliche high life echo park Austin. Cred
                        vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                        farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral,
                        mustache readymade keffiyeh craft.
                                            </p>
                    </TabPane>
                    <TabPane tabId="8" className="p-3">
                      <p className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                        art party before they sold out master cleanse gluten-free squid
                        scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                        art party locavore wolf cliche high life echo park Austin. Cred
                        vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                        farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral,
                        mustache readymade keffiyeh craft.
                                            </p>
                    </TabPane>
                    <TabPane tabId="9" className="p-3">
                      <p className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                        art party before they sold out master cleanse gluten-free squid
                        scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                        art party locavore wolf cliche high life echo park Austin. Cred
                        vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                        farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral,
                        mustache readymade keffiyeh craft.
                                            </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              }
              </Card>
              </Col>
            </Row>

          {/*<Row>
            <Col xl={12}>
              <SalesAnalyticsChart />
            </Col>
          </Row>*/}

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
