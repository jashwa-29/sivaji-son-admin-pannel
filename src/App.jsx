import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import {ThemeProvider} from '@/contexts/theme-context';
import {lazy, Suspense} from 'react';
import Layout from '@/routes/layout';
import LoginPage from '@/routes/authentication/LoginPage'; // Import the LoginPage
import StaffManagement
  from './routes/dashboard/Admin Components/StaffManagement';
import StaffAttendancePage
  from './routes/dashboard/Admin Components/StaffAttendancePage';
import AssignTask from './routes/dashboard/Admin Components/AssignTask';
import MonthlyAttendancePage from './routes/dashboard/Admin Components/MonthlyAttendancepage';


// import ErrorPage from "@/routes/error-page"; // Uncomment if you have an ErrorPage

// Lazy-loaded components

const AttendancePage = lazy (() =>
  import ("@/routes/dashboard/Staff Components'/AttendancePage")
);
const PendingWorkPage = lazy (() =>
  import ("@/routes/dashboard/Staff Components'/PendingWorkPage")
);
const RemindingCustomerPage = lazy (() =>
  import ('@/routes/dashboard/RemindingCustomerPage')
);
const FlightsPage = lazy (() =>
  import ("@/routes/dashboard/Staff Components'/FlightsPage")
);
const HotelsPage = lazy (() =>
  import ("@/routes/dashboard/Staff Components'/HotelsPage")
);
// const AdminDashboardPage = lazy(() => import("@/routes/admin/DashboardPage"));
// const AdminUsersPage = lazy(() => import("@/routes/admin/UsersPage"));
// const AdminSettingsPage = lazy(() => import("@/routes/admin/SettingsPage"));

// Protected Route Component
const ProtectedRoute = ({children, allowedRoles}) => {
  const userRole = localStorage.getItem ('userRole');
  if (!userRole) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }
  if (allowedRoles && !allowedRoles.includes (userRole)) {
    return <Navigate to="/" replace />; // Redirect to home if role is not allowed
  }
  return children;
};

function App () {
  const router = createBrowserRouter ([
    {
      path: '/login',
      element: <LoginPage />, // Login page
    },
    {
      path: '/',
      element: (
        <ProtectedRoute allowedRoles={['staff', 'admin']}>
          <Layout />
        </ProtectedRoute>
      ),
      // errorElement: <ErrorPage />, // Uncomment if you have an ErrorPage
      children: [
        {index: true, path: '/staff/attendance', element: <AttendancePage />}, // Default route for staff
        {
          children: [
            {index: true, element: <FlightsPage />}, // Default route for /dataentry
            {path: '/staff/dataentry/flights', element: <FlightsPage />}, // Corrected path
            {path: '/staff/dataentry/hotels', element: <HotelsPage />}, // Corrected path
          ],
        },
        {path: '/staff/pendingwork', element: <PendingWorkPage />},
        {path: '/staff/remindercustomer', element: <RemindingCustomerPage />},
      ],
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {index: true, path: '/admin/managestaff', element: <StaffManagement />}, // Default route for admin
        {path: '/admin/staffattendence', element: <StaffAttendancePage />},
        {path: '/admin/assigntask', element: <AssignTask />},
        {path: '/admin/monthlyattendence', element: <MonthlyAttendancePage />},
      ],
    },
  ]);

  return (
    <ThemeProvider storageKey="theme">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent dark:border-green-400" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
