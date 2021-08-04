import React from "react"
import { Container, Row, Col, CardBody, Card } from "reactstrap"
import { Link } from "react-router-dom"


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import MiniWidget from "./mini-widget"
import SalesAnalyticsChart from "./salesanalytics-chart"
import RecentActivity from "./recent-activity"


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
            <Col xl={8}>
              <SalesAnalyticsChart />
            </Col>
            <Col xl={4}>
              <RecentActivity />
            </Col>
            </Row>
          
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard