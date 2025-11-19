import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import ProtectedRoute from './ProtectedRoute';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')))
const Error = Loadable(lazy(() => import('../pages/authentication/Error')));
//Auth
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
//Profile
const Profile = Loadable(lazy(() => import('../pages/profile/UserProfile')));
//Dining
const Dinings = Loadable(lazy(() => import('../pages/dining/dinings/Dinings')));
const DiningDetails = Loadable(lazy(() => import('../pages/dining/dining-details/DiningDetails')));
const RegisterDiningPayment = Loadable(lazy(() => import('../pages/dining/register-dining-payment/RegisterDiningPayment')));
const RegisterDiningAssistance = Loadable(lazy(() => import('../pages/dining/register-dining-assistance/RegisterDiningAssistance')));
//Scholarships
const Scholarships = Loadable(lazy(() => import('../pages/scholarship/Scholarships')))
//Scholarship requests
const ScholarshipRequests = Loadable(lazy(() => import('../pages/scholarship-requests/scholarship-requests/ScholarshipRequests')))
const ScholarshipRequestDetails = Loadable(lazy(() => import('@/pages/scholarship-requests/scholarship-request-details/ScholarshipRequestDetails')))
//Scholarship students
const ScholarshipStudents = Loadable(lazy(() => import('../pages/scholarship-students/ScholarshipStudents')))
//Reports
const Reports = Loadable(lazy(() => import('../pages/reports/Reports')))
//Assistances
const Assistances = Loadable(lazy(() => import('../pages/assistances/Assistances')))

const Router = [
  {
    path: '/',
    element:
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>, // Protects main layout 
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/profile', exact: true, element: <Profile /> },
      //Dining
      {
        path: '/dinings',
        exact: true,
        children: [
          { path: '', exact: true, element: <Dinings /> },
          { path: 'dining-details/:id', exact: true, element: <DiningDetails /> },
        ]
      },
      {
        path: '/register-dining-payment/diningId/:diningId',
        exact: true,
        element: <RegisterDiningPayment />,
      },
      { path: '/register-dining-assistance/diningId/:diningId', exact: true, element: <RegisterDiningAssistance /> },
      //Scholarship
      {
        path: '/scholarships',
        exact: true,
        children: [
          { path: '', exact: true, element: <Scholarships /> },
        ]
      },
      {
        path: '/scholarship-requests',
        exact: true,
        children: [
          { path: '', exact: true, element: <ScholarshipRequests /> },
          { path: 'details/:id', exact: true, element: <ScholarshipRequestDetails /> },
        ]
      },
      //Scholarship students
      { path: '/scholarship-students', element: <ScholarshipStudents /> },
      //Reports
      { path: '/reports', element: <Reports /> },
      //Assistances
      { path: '/assistances', element: <Assistances /> },
      //Not found
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />, // Las rutas de auth NO están protegidas
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;