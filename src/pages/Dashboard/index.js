import React, { useState } from "react"
import {   TabContent,
  TabPane,
  Collapse,
  NavLink,
  NavItem,
  Nav,Container, Row, Col, CardBody, Card,CardTitle,Badge} from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import MiniWidget from "./mini-widget"
import SalesAnalyticsChart from "./salesanalytics-chart"
import RecentActivity from "./recent-activity"

import classnames from "classnames"

import HorizontalLayout from "../../components/HorizontalLayout/index"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

const Dashboard = () => {
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
      <ToastContainer autoClose={1500}/>
        <Container fluid>
                  <Breadcrumbs title="Home" breadcrumbItem="Dashboard" />
          <Row>
            <MiniWidget reports={reports} />
          </Row>


            <Row>
              <Col xl={12}>
              <Card>
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
                        <i className="fas fa-chart-line"></i>
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
                        <i className="fa fa-thumbs-up"></i>&nbsp;<span className="badge bg-soft-dark">1</span>
                        <span className="d-none d-sm-block">Assign</span>
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
                        <i className="fa fa-file"></i>
                        <span className="d-none d-sm-block">Approve</span>
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
                        <i className="fa fa-check"></i>
                        <span className="d-none d-sm-block">Approved</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "6",
                        })}
                        onClick={() => {
                          toggleCustomJustified("6")
                        }}
                      >
                        <i className="fa fa-times"></i>
                        <span className="d-none d-sm-block">Reject</span>
                      </NavLink>
                    </NavItem>
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
                      <p className="mb-0">
                        Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                        single-origin coffee squid. Exercitation +1 labore velit, blog
                        sartorial PBR leggings next level wes anderson artisan four loko
                        farm-to-table craft beer twee. Qui photo booth letterpress,
                        commodo enim craft beer mlkshk aliquip jean shorts ullamco ad
                        vinyl cillum PBR. Homo nostrud organic, assumenda labore
                        aesthetic magna delectus.
                                            </p>
                    </TabPane>
                    <TabPane tabId="3" className="p-3">
                       <p className="mb-0">
                           <i className="fas fa-chart-bar"></i>&nbsp;&nbsp;Total Pending Assign :28 to chemist.
                           &nbsp;&nbsp;<Link type="button" to="/assign-test" class="btn btn-primary waves-effect waves-light btn-sm">
                           Assign <i class="fa fa-share"></i></Link>
                       </p>
                    </TabPane>

                    <TabPane tabId="4" className="p-3">
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
                    <TabPane tabId="5" className="p-3">
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
                    <TabPane tabId="6" className="p-3">
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
              </Card>
              </Col>
            </Row>

          <Row>
            <Col xl={12}>
              <SalesAnalyticsChart />
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
