import React from "react"
import { Redirect } from "react-router-dom"
// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Masters
import ListGroups from "../pages/Masters/ListGroups"
import AddGroup from "../pages/Masters/AddGroup"
import EditGroup from "../pages/Masters/EditGroup"
import ListCompany from "../pages/Masters/ListCompany"
import AddCompany from "../pages/Masters/AddCompany"
import EditCompany from "../pages/Masters/EditCompany"
import ListBranch from "../pages/Masters/ListBranch"
import AddBranch from "../pages/Masters/AddBranch"
import ViewBranch from "../pages/Masters/ViewBranch"
import EditBranch from "../pages/Masters/EditBranch"
import ListDepartment from "../pages/Masters/ListDepartment"
import AddDepartment from "../pages/Masters/AddDepartment"
import EditDepartment from "../pages/Masters/EditDepartment"
import ListPosition from "../pages/Masters/ListPosition"
import AddPosition from "../pages/Masters/AddPosition"
import EditPosition from "../pages/Masters/EditPosition"
import ListLedger from "../pages/Masters/ListLedger"
import AddLedger from "../pages/Masters/AddLedger"
import EditLedger from "../pages/Masters/EditLedger"
import ListCategory from "../pages/Masters/ListCategory"
import AddCategory from "../pages/Masters/AddCategory"
import EditCategory from "../pages/Masters/EditCategory"
//HR
import ListEmployee from "../pages/HR/ListEmployee"
import AddEmployee from "../pages/HR/AddEmployee"
import EditEmployee from "../pages/HR/EditEmployee"
import ViewEmployee from "../pages/HR/ViewEmployee"
//Analytics
import ListPharmacopiea from "../pages/Analytics/ListPharmacopiea"
import AddPhramacopiea from "../pages/Analytics/AddPharmacopiea"
import EditPharmacopiea from "../pages/Analytics/EditPharmacopiea"
import ExportPdf from "../pages/Analytics/ExportPdf"
import ListProduct from "../pages/Analytics/ListProduct"
import AddProduct from "../pages/Analytics/AddProduct"
import ListBooking from "../pages/Analytics/ListBooking"
import AddBooking from "../pages/Analytics/AddBooking"


const userRoutes = [


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

    // Authentication Inner
    { path: "/pages-login", component: Login1 },
    { path: "/pages-register", component: Register1 },
    { path: "/page-recoverpw", component: Recoverpw },
    { path: "/auth-lock-screen", component: LockScreen },

    { path: "/dashboard", component: Dashboard },
    { path: "/group", component: ListGroups},
    { path: "/all-group", component: ListGroups},
    { path: "/add-group", component: AddGroup},
    { path: "/edit-group", component: EditGroup},
    { path: "/employee" ,component: ListEmployee},
    { path: "/add-employee" ,component: AddEmployee},
    { path: "/edit-employee" ,component: EditEmployee},
    { path: "/view-employee" ,component: ViewEmployee},
    { path: "/pharmacopiea", component:ListPharmacopiea},
    { path: "/all-pharmacopiea", component:ListPharmacopiea},
    { path: "/add-pharmacopiea", component:AddPhramacopiea},
    { path: "/edit-pharmacopiea", component:EditPharmacopiea},
    { path: "/export-pdf-pharmacopiea", component:ExportPdf},
    { path: "/products", component:ListProduct},
    { path: "/add-product", component:AddProduct},
    { path: "/company", component: ListCompany},
    { path: "/add-company", component: AddCompany},
    { path: "/all-company", component: ListCompany},
    { path: "/edit-company", component: EditCompany},
    { path: "/booking", component: ListBooking},
    { path: "/add-booking", component: AddBooking},
    { path: "/branch", component:ListBranch},
    { path: "/all-branch", component:ListBranch},
    { path: "/add-branch", component:AddBranch},
    { path: "/view-branch", component:ViewBranch},
    { path: "/edit-branch", component:EditBranch},
    { path: "/department", component:ListDepartment},
    { path: "/all-department", component:ListDepartment},
    { path: "/add-department", component:AddDepartment},
    { path: "/edit-department", component:EditDepartment},
    { path: "/position", component:ListPosition},
    { path: "/all-position", component:ListPosition},
    { path: "/add-position", component:AddPosition},
    { path: "/edit-position", component:EditPosition},

    { path: "/ledger", component:ListLedger},
    { path: "/all-ledger", component:ListLedger},
    { path: "/add-ledger", component:AddLedger},
    { path: "/edit-ledger", component:EditLedger},

    { path: "/category", component:ListCategory},
    { path: "/all-category", component:ListCategory},
    { path: "/add-category", component:AddCategory},
    { path: "/edit-category", component:EditCategory},

]

export { userRoutes, authRoutes }