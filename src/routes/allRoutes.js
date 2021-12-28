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
//Group Master
import ListGroups from "../pages/Masters/ListGroups"
import AddGroup from "../pages/Masters/AddGroup"
import EditGroup from "../pages/Masters/EditGroup"
//Comapny Master
import ListCompany from "../pages/Masters/ListCompany"
import AddCompany from "../pages/Masters/AddCompany"
import EditCompany from "../pages/Masters/EditCompany"
//Branch Master
import ListBranch from "../pages/Masters/ListBranch"
import AddBranch from "../pages/Masters/AddBranch"
import ViewBranch from "../pages/Masters/ViewBranch"
import EditBranch from "../pages/Masters/EditBranch"
//Department Master
import ListDepartment from "../pages/Masters/ListDepartment"
import AddDepartment from "../pages/Masters/AddDepartment"
import EditDepartment from "../pages/Masters/EditDepartment"
//Position Master
import ListPosition from "../pages/Masters/ListPosition"
import AddPosition from "../pages/Masters/AddPosition"
import EditPosition from "../pages/Masters/EditPosition"
//Ledger Master
import ListLedger from "../pages/Masters/ListLedger"
import AddLedger from "../pages/Masters/AddLedger"
import EditLedger from "../pages/Masters/EditLedger"
//Category Master
import ListCategory from "../pages/Masters/ListCategory"
import AddCategory from "../pages/Masters/AddCategory"
import EditCategory from "../pages/Masters/EditCategory"
//Bank Account Master
import ListBankAccount from "../pages/Masters/ListBankAccount"
import AddBankAccount from "../pages/Masters/AddBankAccount"
import EditBankAccount from "../pages/Masters/EditBankAccount"
//Material Master
import ListMaterial from "../pages/Masters/ListMaterial"
import AddMaterial from "../pages/Masters/AddMaterial"
import EditMaterial from "../pages/Masters/EditMaterial"
import ViewMaterial from "../pages/Masters/ViewMaterial"
//Material Master
import ListLocation from "../pages/Masters/ListLocation"
import AddLocation from "../pages/Masters/AddLocation"
import EditLocation from "../pages/Masters/EditLocation"
//Machine Master
import ListMachine from "../pages/Masters/ListMachine"
import AddMachine from "../pages/Masters/AddMachine"
import EditMachine from "../pages/Masters/EditMachine"
//Unit Master
import ListUnit from "../pages/Masters/ListUnit"
import AddUnit from "../pages/Masters/AddUnit"
import EditUnit from "../pages/Masters/EditUnit"
//Masters End

//Sales Module
//Customer
import AddCustomer from "../pages/Sales/AddCustomer"
import ListCustomer from "../pages/Sales/ListCustomer"
import EditCustomer from "../pages/Sales/EditCustomer"
import ViewCustomer from "../pages/Sales/ViewCustomer"
import ExportCustomerData from "../pages/Sales/ExportCustomerData"
//HR
import ListEmployee from "../pages/HR/ListEmployee"
import AddEmployee from "../pages/HR/AddEmployee"
import EditEmployee from "../pages/HR/EditEmployee"
import ViewEmployee from "../pages/HR/ViewEmployee"
import AssignRights from "../pages/HR/AssignRights"
//Analytics
//Pharmacopiea
import ListPharmacopiea from "../pages/Analytics/ListPharmacopiea"
import AddPhramacopiea from "../pages/Analytics/AddPharmacopiea"
import EditPharmacopiea from "../pages/Analytics/EditPharmacopiea"
import ExportPdf from "../pages/Analytics/ExportPdf"
//Product
import ListProduct from "../pages/Analytics/ListProduct"
import AddProduct from "../pages/Analytics/AddProduct"
import EditProduct from "../pages/Analytics/EditProduct"
import ViewProduct from "../pages/Analytics/ViewProduct"
import ExportProductListPDF from "../pages/Analytics/ExportProductListPDF"
import ExportProductAsHTML from "../pages/Analytics/ExportProductAsHTML"
//Booking
import ListBooking from "../pages/Analytics/ListBooking"
import AddBooking from "../pages/Analytics/AddBooking"
import EditBooking from "../pages/Analytics/EditBooking"
import ViewBooking from "../pages/Analytics/ViewBooking"
import GenerateROA from "../pages/Analytics/generate_roa_coa/GenerateROA"
import GenerateCOA from "../pages/Analytics/generate_roa_coa/GenerateCOA"
import CoaView from "../pages/Analytics/generate_roa_coa/CoaView"
import AayushView from "../pages/Analytics/generate_roa_coa/AayushView"
import NablView from "../pages/Analytics/generate_roa_coa/NablView"
import RoaView from "../pages/Analytics/generate_roa_coa/RoaView"
import NablRoaView1 from "../pages/Analytics/generate_roa_coa/NablRoaView1"
import NablRoaView2 from "../pages/Analytics/generate_roa_coa/NablRoaView2"
//Booking Test flow
import AssignTest from "../pages/Analytics/AssignTest"
import TestResultAdd from "../pages/Analytics/TestResultAdd"
import ForApprovalTest from "../pages/Analytics/ForApprovalTest"
import ReassignTest from "../pages/Analytics/ReassignTest"
import ApprovedData from "../pages/Analytics/ApprovedData"
import RejectedData from "../pages/Analytics/RejectedData"
import AnalyticsData from "../pages/Analytics/AnalyticsData"
//Instrument
import ListInstruments from "../pages/Analytics/ListInstruments"
import AddInstrument from "../pages/Analytics/AddInstrument"
import EditInstrument from "../pages/Analytics/EditInstrument"
//Formula
import ListFormula from "../pages/Analytics/ListFormula"
import AddFormula from "../pages/Analytics/AddFormula"
import EditFormula from "../pages/Analytics/EditFormula"

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

    { path: "/dashboard", component: Dashboard },
    { path: "/group", component: ListGroups},
    { path: "/all-group", component: ListGroups},
    { path: "/add-group", component: AddGroup},
    { path: "/edit-group", component: EditGroup},
    //Employee Routes
    { path: "/employee" ,component: ListEmployee},
    { path: "/add-employee" ,component: AddEmployee},
    { path: "/edit-employee" ,component: EditEmployee},
    { path: "/view-employee" ,component: ViewEmployee},
    { path: "/assign-right" ,component: AssignRights},
    //Pharmacopeia Routes
    { path: "/pharmacopiea", component:ListPharmacopiea},
    { path: "/all-pharmacopiea", component:ListPharmacopiea},
    { path: "/add-pharmacopiea", component:AddPhramacopiea},
    { path: "/edit-pharmacopiea", component:EditPharmacopiea},
    { path: "/export-pdf-pharmacopiea", component:ExportPdf},
    //Product Routes
    { path: "/products", component:ListProduct},
    { path: "/add-product", component:AddProduct},
    { path: "/all-products", component: ListProduct},
    { path: "/view-product", component: ViewProduct},
    { path: "/edit-product", component: EditProduct},
    { path: "/export-product-data", component: ExportProductListPDF},
    { path: "/export-product-data-as-html", component: ExportProductAsHTML},

    { path: "/company", component: ListCompany},
    { path: "/add-company", component: AddCompany},
    { path: "/all-company", component: ListCompany},
    { path: "/edit-company", component: EditCompany},
    //Booking
    { path: "/booking", component: ListBooking},
    { path: "/all-booking", component: ListBooking},
    { path: "/add-booking", component: AddBooking},
    { path: "/edit-booking", component: EditBooking},
    { path: "/view-booking", component: ViewBooking},
    { path: "/generate-roa", component: GenerateROA},
    { path: "/generate-coa", component: GenerateCOA},
    { path: "/view-coa", component: CoaView},
    { path: "/view-aayush", component: AayushView},
    { path: "/view-nabl", component: NablView},
    { path: "/view-roa", component: RoaView},
    { path: "/view-nabl-roa1", component: NablRoaView1},
    { path: "/view-nabl-roa2", component: NablRoaView2},
    //Booking Test flow
    { path: "/assign-test", component: AssignTest},
    { path: "/add-test-result", component: TestResultAdd},
    { path: "/for-approval-test-result", component: ForApprovalTest},
    { path: "/reassign-test", component: ReassignTest},
    { path: "/view-approved-data-list", component: ApprovedData},
    { path: "/view-rejected-data-list", component: RejectedData},
    {path:"/analytics-test-data", component:AnalyticsData},

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

    //Ledger Master
    { path: "/ledger", component:ListLedger},
    { path: "/all-ledger", component:ListLedger},
    { path: "/add-ledger", component:AddLedger},
    { path: "/edit-ledger", component:EditLedger},
    //Category Master
    { path: "/category", component:ListCategory},
    { path: "/all-category", component:ListCategory},
    { path: "/add-category", component:AddCategory},
    { path: "/edit-category", component:EditCategory},
    //Bank Account Master
    { path: "/bankaccount" ,component: ListBankAccount},
    { path: "/all-bankaccount" ,component: ListBankAccount},
    { path: "/add-bank-account" ,component: AddBankAccount},
    { path: "/edit-bank-account" ,component: EditBankAccount},
    //Material Master
    { path: "/material" ,component: ListMaterial},
    { path: "/all-material" ,component: ListMaterial},
    { path: "/add-material" ,component: AddMaterial},
    { path: "/edit-material" ,component: EditMaterial},
    { path: "/view-material" ,component: ViewMaterial},
    //Location Master
    { path: "/location" ,component: ListLocation},
    { path: "/all-location" ,component: ListLocation},
    { path: "/add-location" ,component: AddLocation},
    { path: "/edit-location" ,component: EditLocation},
    //Machine Master
    { path: "/machine" ,component: ListMachine},
    { path: "/all-machine" ,component: ListMachine},
    { path: "/add-machine" ,component: AddMachine},
    { path: "/edit-machine" ,component: EditMachine},
    //Unit Master
    { path: "/unit" ,component: ListUnit},
    { path: "/all-unit" ,component: ListUnit},
    { path: "/add-unit" ,component: AddUnit},
    { path: "/edit-unit" ,component: EditUnit},
    //Customer
    { path: "/add-customer" ,component: AddCustomer},
    { path: "/customer" ,component: ListCustomer},
    { path: "/all-customer" ,component: ListCustomer},
    { path: "/edit-customer" ,component: EditCustomer},
    { path: "/view-customer" ,component: ViewCustomer},
    { path: "/export-customer-data" ,component: ExportCustomerData},
    //Instrument
    { path: "/instruments" ,component: ListInstruments},
    { path: "/add-instrument" ,component: AddInstrument},
    { path: "/edit-instrument" ,component: EditInstrument},
    //Formula
    { path: "/formula" ,component: ListFormula},
    { path: "/all-formula" ,component: ListFormula},
    { path: "/add-formula" ,component: AddFormula},
    { path: "/edit-formula" ,component: EditFormula},
]

export { userRoutes, authRoutes }
