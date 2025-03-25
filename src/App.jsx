import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import {ThemeProvider} from '@/contexts/theme-context';
import {lazy, Suspense} from 'react';
import Layout from '@/routes/layout';
import LoginPage from '@/routes/authentication/LoginPage';
import StaffManagement from './routes/dashboard/Admin Components/StaffManagement';
import StaffAttendancePage from './routes/dashboard/Admin Components/StaffAttendancePage';
import AssignTask from './routes/dashboard/Admin Components/AssignTask';
import MonthlyAttendancePage from './routes/dashboard/Admin Components/MonthlyAttendancepage';

// Lazy-loaded components
const AttendancePage = lazy(() => import("@/routes/dashboard/Staff Components'/AttendancePage"));
const PendingWorkPage = lazy(() => import("@/routes/dashboard/Staff Components'/PendingWorkPage"));
const RemindingCustomerPage = lazy(() => import('@/routes/dashboard/RemindingCustomerPage'));
const FlightsPage = lazy(() => import("@/routes/dashboard/Staff Components'/FlightsPage"));
const HotelsPage = lazy(() => import("@/routes/dashboard/Staff Components'/HotelsPage"));

// Protected Route Component
const ProtectedRoute = ({children, allowedRoles}) => {
  const userRole = localStorage.getItem('userRole');
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/staff',
      element: (
        <ProtectedRoute allowedRoles={['staff', 'admin']}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {index: true, element: <Navigate to="/staff/attendance" replace />},
        {path: '/staff/attendance', element: <AttendancePage />},
        {
          path: '/staff/dataentry',
          children: [
            {index: true, element: <FlightsPage />},
            {path: '/staff/dataentry/flights', element: <FlightsPage />},
            {path: '/staff/dataentry/hotels', element: <HotelsPage />},
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
        {index: true, element: <Navigate to="/admin/managestaff" replace />},
        {path: '/admin/managestaff', element: <StaffManagement />},
        {path: '/admin/staffattendence', element: <StaffAttendancePage />},
        {path: '/admin/assigntask', element: <AssignTask />},
        {path: '/admin/monthlyattendence', element: <MonthlyAttendancePage />},
      ],
    },
    {
      path: '/',
      element: <Navigate to="/staff/attendance" replace />,
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