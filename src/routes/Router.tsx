import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import ProtectedRoute from "./ProtectedRoute";
import ListStudents from "@/pages/users/students/list-students/ListStudents";
import CreateStudent from "@/pages/users/students/CreateStudent";
import UpdateStudent from "@/pages/users/students/UpdateStudent";
import ImportStudents from "@/pages/users/students/import-students/ImportStudents";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout")),
);

/* ****Pages***** */
//Generic
const Error = Loadable(lazy(() => import("../pages/authentication/Error")));
const Forbidden = Loadable(lazy(() => import("../pages/authentication/Forbidden")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard/Dashboard")));
//Auth
const Login = Loadable(
  lazy(() => import("../pages/authentication/Login/Login")),
);
//Profile
const Profile = Loadable(lazy(() => import("../pages/profile/UserProfile")));
const News = Loadable(lazy(() => import("../pages/news/News")));

//Dining
const Dinings = Loadable(lazy(() => import("../pages/dining/dinings/Dinings")));
const DiningDetails = Loadable(
  lazy(() => import("../pages/dining/dining-details/DiningDetails")),
);
const RegisterDiningPayment = Loadable(
  lazy(
    () =>
      import("../pages/dining/register-dining-payment/RegisterDiningPayment"),
  ),
);
const RegisterDiningAssistance = Loadable(
  lazy(
    () =>
      import("../pages/dining/register-dining-assistance/RegisterDiningAssistance"),
  ),
);
//Scholarships
const Scholarships = Loadable(
  lazy(() => import("../pages/scholarship/Scholarships")),
);
//Scholarship requests
const ScholarshipRequests = Loadable(
  lazy(
    () =>
      import("../pages/scholarship-requests/scholarship-requests/ScholarshipRequests"),
  ),
);
const ScholarshipRequestDetails = Loadable(
  lazy(
    () =>
      import("@/pages/scholarship-requests/scholarship-request-details/ScholarshipRequestDetails"),
  ),
);
//Scholarship students
const ScholarshipStudents = Loadable(
  lazy(() => import("../pages/scholarship-students/ScholarshipStudents")),
);
const ScholarshipStudentDetails = Loadable(
  lazy(() => import("../pages/scholarship-students/ScholarshipStudentDetails")),
);
//Reports
const Reports = Loadable(
  lazy(() => import("../pages/reports/dining-report/Reports")),
);
//Assistances
const Attendances = Loadable(
  lazy(() => import("../pages/attendances/Attendances")),
);

//AdminUsers
const AdminUsers = Loadable(
  lazy(() => import("../pages/users/admins/AdminUsers")),
);

const Router = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ), // Protects main layout
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      {
        path: "/news",
        exact: true,
        children: [
          {
            path: "",
            element: <News />,
          },
        ],
      },
      { path: "/profile", exact: true, element: <Profile /> },
      //Dining
      {
        path: "/dinings",
        exact: true,
        children: [
          { path: "", exact: true, element: <Dinings /> },
          {
            path: "dining-details/:id",
            exact: true,
            element: <DiningDetails />,
          },
        ],
      },
      {
        path: "/register-dining-payment/diningId/:diningId",
        exact: true,
        element: <RegisterDiningPayment />,
      },
      {
        path: "/register-dining-assistance/diningId/:diningId",
        exact: true,
        element: <RegisterDiningAssistance />,
      },
      //Scholarship
      {
        path: "/scholarships",
        exact: true,
        children: [{ path: "", exact: true, element: <Scholarships /> }],
      },
      {
        path: "/scholarship-requests",
        exact: true,
        children: [
          {
            path: "",
            exact: true,
            element: <ScholarshipRequests />,
          },
          {
            path: "details/:id",
            exact: true,
            element: <ScholarshipRequestDetails />,
          },
        ],
      },
      //Scholarship students
      {
        path: "/scholarship-students",
        children: [
          {
            path: "",
            exact: true,
            element: <ScholarshipStudents />,
          },
          {
            path: "details/:id",
            exact: true,
            element: <ScholarshipStudentDetails />,
          },
        ],
      },
      //Reports
      { path: "/reports", element: <Reports /> },
      { path: "/admins", element: <AdminUsers /> },
      //Assistances
      { path: "/assistances", element: <Attendances /> },
      { path: "/forbidden", element: <Forbidden /> },
      { 
        path: "/students", 
        exact: true, 
        children: [
          {
            path:'',
            element: <ListStudents /> 
          },
          {
            path:'create',
            element: <CreateStudent /> 
          },
          {
            path:'update/:id',
            element: <UpdateStudent /> 
          },
          {
            path:'import',
            element: <ImportStudents /> 
          }
        ] 
      },
      //Not found
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />, // Las rutas de auth NO están protegidas
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
