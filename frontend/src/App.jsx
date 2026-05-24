import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import LoadingSpinner from "./components/common/LoadingSpinner";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import "./App.css";

// Lazy Loading
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const DiscussionsPage = lazy(() => import("./pages/DiscussionsPage"));
const Settings = lazy(() => import("./pages/Settings"));
const WatchedVideos = lazy(() => import("./pages/WatchedVideos"));
const CoursePreview = lazy(() => import("./pages/CoursePreview"));
const LearningPage = lazy(() => import("./pages/LearningPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const Success = lazy(() => import("./pages/Success"));
<<<<<<< HEAD

/* =========================
   REDIRECT LOGIC
========================= */

=======
const NotFound = lazy(() => import("./pages/NotFound"));
import CompleteProfilePage from "./pages/CompleteProfilePage";
import "./App.css";

// Redirect from root
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
const RootRedirect = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
<<<<<<< HEAD

  return (
    <Navigate
      to={user?.isProfileComplete ? "/dashboard" : "/complete-profile"}
      replace
    />
  );
};

=======
  return <Navigate to={user?.isProfileComplete ? "/dashboard" : "/complete-profile"} replace />;
};

// Public routes (block logged-in users)
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
const PublicRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Outlet />;
<<<<<<< HEAD

  return (
    <Navigate
      to={user?.isProfileComplete ? "/dashboard" : "/complete-profile"}
      replace
    />
  );
=======
  return <Navigate to={user?.isProfileComplete ? "/dashboard" : "/complete-profile"} replace />;
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
};

/* =========================
   MAIN APP
========================= */

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>

<<<<<<< HEAD
        {/* Root Redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public Routes */}
=======
        {/* Root redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public routes */}
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

<<<<<<< HEAD
        {/* Protected Routes */}
=======
        {/* Protected routes */}
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
        <Route element={<ProtectedRoute />}>

          {/* Profile Completion */}
          <Route path="/complete-profile" element={<CompleteProfilePage />} />

          {/* Dashboard Layout */}
          <Route element={<DashboardLayout />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/discussions" element={<DiscussionsPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/certificates" element={<CertificatesPage />} />
<<<<<<< HEAD

            {/* ✅ FIXED ROUTE (IMPORTANT) */}
            <Route path="/watched" element={<WatchedVideos />} />

=======
            <Route path="/report" element={<ReportPage />} />
            <Route path="/watchedvideos" element={<WatchedVideos />} />
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
            <Route path="/learning/:id" element={<LearningPage />} />
            <Route path="/success" element={<Success />} />

          </Route>
          <Route path="/course-preview/:courseId" element={<CoursePreview />} />
        </Route>
        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />



<<<<<<< HEAD
        {/* Public Course Preview */}
        <Route path="/course-preview/:courseId" element={<CoursePreview />} />

        {/* ✅ FALLBACK ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />

=======
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
      </Routes>
    </Suspense>
  );
};

export default App;