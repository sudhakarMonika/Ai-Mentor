import { useMemo, useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import AdminSidebar from "./components/layout/AdminSidebar";
import Toast from "./components/Toast";
import { PAGE_TITLES } from "./constants/adminNavigation";
import { ToastProvider } from "./context/ToastContext";
import CoursesPage from "./pages/CoursesPage";
import DashboardPage from "./pages/DashboardPage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import LoginPage from "./pages/LoginPage";
import PaymentsPage from "./pages/PaymentsPage";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";


const PAGE_COMPONENTS = {
  dashboard: DashboardPage,
  courses: CoursesPage,
  users: UsersPage,
  enrollments: EnrollmentsPage,
  payments: PaymentsPage,
  reports: ReportsPage,
  profile: ProfilePage,
  settings: SettingsPage,
};

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [page, setPage] = useState("courses");
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const pathName = location.pathname.replace("/", "");     
    if (PAGE_COMPONENTS[pathName]) {
      setPage(pathName);
    }
  }, [location.pathname]);

  const title = useMemo(() => PAGE_TITLES[page] ?? PAGE_TITLES.dashboard, [page]);
  const CurrentPage = PAGE_COMPONENTS[page] ?? DashboardPage;
  const isLoginRoute = location.pathname === "/login";

  if (isLoginRoute) {
    return <LoginPage />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-canvas-alt text-main">
        <AdminSidebar
          page={page}
          onPageChange={setPage}
          mobileOpen={mobileNav}
          onMobileClose={() => setMobileNav(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((prev) => !prev)}
        />

        <main className={`min-h-screen transition-all duration-300 ${sidebarCollapsed ? "lg:ml-24" : "lg:ml-80"}`}>
          <Header title={title} onMenuClick={() => setMobileNav(true)} />

          <section className="p-4 md:p-8">
            <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-[0_2px_8px_rgba(26,26,26,0.06)]">
              <CurrentPage />
            </div>
<<<<<<< HEAD
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(([id, label]) => {
            const active = page === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setPage(id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${active ? "text-white" : "hover:bg-white/10"}`}
                style={active ? { backgroundColor: "var(--admin-primary)" } : undefined}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 p-4 space-y-3">
          <button type="button" className="w-full text-left px-4 py-3 rounded-xl font-medium hover:bg-white/10 transition">Settings</button>
          <div className="px-4 py-3 rounded-xl bg-white/5 flex items-center justify-between">
            <div>
              <p className="font-semibold">Admin</p>
              <p className="text-xs text-white/70">Super Admin</p>
            </div>
            <span className="h-8 w-8 rounded-full text-slate-900 font-bold flex items-center justify-center" style={{ backgroundColor: "var(--brand-orange)" }}>A</span>
          </div>
        </div>
      </aside>

      <main className="flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b px-4 md:px-8 flex items-center justify-between gap-3" style={{ borderColor: "var(--neutral-100)" }}>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 min-w-64" style={{ backgroundColor: "var(--neutral-50)" }}>
              <span className="text-sm" style={{ color: "rgba(51,51,51,0.6)" }}>Search courses...</span>
            </div>
            <button type="button" className="relative h-10 w-10 rounded-xl" style={{ backgroundColor: "var(--neutral-50)", color: "var(--neutral-800)" }}>
              B
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <button type="button" className="h-11 px-4 md:px-6 rounded-xl text-white font-semibold" style={{ backgroundColor: "var(--admin-primary)" }}>
              + Add Course
            </button>
          </div>
        </header>

        <section className="p-4 md:p-8 overflow-auto">
          <div className="rounded-2xl bg-white border overflow-hidden" style={{ borderColor: "var(--neutral-100)", boxShadow: "0 2px 8px rgba(26,26,26,0.06)" }}>
            {page === "dashboard" && <DashboardPage />}
            {page === "courses" && <CoursesPage />}
            {page === "users" && <UsersPage />}
            {page === "enrollments" && <EnrollmentsPage />}
            {page === "payments" && <PaymentsPage />}
          </div>
        </section>
      </main>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="text-2xl font-semibold mb-3">Admin Dashboard</h2>
      <p style={{ color: "rgba(51,51,51,0.7)" }}>
        Use sidebar navigation to manage courses, users, enrollments, and payments.
      </p>
    </div>
  );
}

function CoursesPage() {
  return (
    <>
      <div className="border-b p-6 md:p-8 flex items-center justify-between" style={{ borderColor: "var(--neutral-100)" }}>
        <h2 className="text-3xl font-semibold">Active Courses</h2>
        <div className="flex gap-2">
          <button type="button" className="h-10 px-4 rounded-xl border" style={{ borderColor: "var(--neutral-100)" }}>Filter</button>
          <button type="button" className="h-10 px-4 rounded-xl border" style={{ borderColor: "var(--neutral-100)" }}>Export</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="text-left text-xs uppercase tracking-wider" style={{ color: "rgba(51,51,51,0.6)" }}>
            <tr className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
              <th className="p-5">Course Detail</th>
              <th>Category</th>
              <th>Pricing</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {courses.map(([name, category, price, enrolled, status]) => (
              <tr key={name} className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
                <td className="p-5">
                  <div className="font-semibold">{name}</div>
                  <div style={{ color: "rgba(51,51,51,0.6)" }}>Last updated recently</div>
                </td>
                <td><span className="px-3 py-1 rounded-full" style={{ backgroundColor: "var(--neutral-50)" }}>{category}</span></td>
                <td className="font-semibold">{price}</td>
                <td>{enrolled}</td>
                <td className={status === "Published" ? "text-green-600" : "text-orange-500"}>{status}</td>
                <td className="text-lg">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UsersPage() {
  return (
    <>
      <div className="border-b p-6 md:p-8 flex items-center justify-between" style={{ borderColor: "var(--neutral-100)" }}>
        <h2 className="text-3xl font-semibold">All Users</h2>
        <div className="flex gap-2">
          <button type="button" className="h-10 px-4 rounded-xl border" style={{ borderColor: "var(--neutral-100)" }}>Filter</button>
          <button type="button" className="h-10 px-4 rounded-xl text-white" style={{ backgroundColor: "var(--admin-primary)" }}>+ Add User</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="text-left text-xs uppercase tracking-wider" style={{ color: "rgba(51,51,51,0.6)" }}>
            <tr className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
              <th className="p-5">User</th>
              <th>Email</th>
              <th>Enrolled Courses</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map(([name, mail, enrolled, joinDate, status]) => (
              <tr key={mail} className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
                <td className="p-5 font-medium">{name}</td>
                <td>{mail}</td>
                <td>{enrolled}</td>
                <td>{joinDate}</td>
                <td className={status === "Active" ? "text-green-600" : "text-red-600"}>{status}</td>
                <td className="text-lg">...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EnrollmentsPage() {
  return (
    <>
      <div className="border-b p-6 md:p-8 flex items-center justify-between" style={{ borderColor: "var(--neutral-100)" }}>
        <h2 className="text-3xl font-semibold">All Enrollments</h2>
        <button type="button" className="h-10 px-4 rounded-xl border" style={{ borderColor: "var(--neutral-100)" }}>Export Report</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-215">
          <thead className="text-left text-xs uppercase tracking-wider" style={{ color: "rgba(51,51,51,0.6)" }}>
            <tr className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
              <th className="p-5">Student</th>
              <th>Course</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {enrollments.map(([name, course, date, amount, status]) => (
              <tr key={`${name}-${course}`} className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
                <td className="p-5 font-medium">{name}</td>
                <td>{course}</td>
                <td>{date}</td>
                <td className="font-semibold">{amount}</td>
                <td className={status === "Completed" ? "text-green-600" : status === "Pending" ? "text-amber-500" : "text-red-600"}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PaymentsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border p-5" style={{ borderColor: "var(--neutral-100)" }}><p style={{ color: "rgba(51,51,51,0.7)" }}>Total Revenue</p><p className="text-5xl font-bold">Rs 45,200</p></article>
        <article className="rounded-2xl border p-5" style={{ borderColor: "var(--neutral-100)" }}><p style={{ color: "rgba(51,51,51,0.7)" }}>This Month</p><p className="text-5xl font-bold text-green-600">Rs 8,450</p></article>
        <article className="rounded-2xl border p-5" style={{ borderColor: "var(--neutral-100)" }}><p style={{ color: "rgba(51,51,51,0.7)" }}>Pending</p><p className="text-5xl font-bold text-orange-500">Rs 1,230</p></article>
        <article className="rounded-2xl border p-5" style={{ borderColor: "var(--neutral-100)" }}><p style={{ color: "rgba(51,51,51,0.7)" }}>Refunded</p><p className="text-5xl font-bold text-red-600">Rs 450</p></article>
      </div>

      <div className="rounded-2xl bg-white border" style={{ borderColor: "var(--neutral-100)" }}>
        <div className="p-5 border-b" style={{ borderColor: "var(--neutral-100)" }}>
          <h3 className="text-2xl font-semibold">Recent Transactions</h3>
        </div>
        {transactions.map(([name, course, amount, date, amountColor]) => (
          <div key={`${name}-${date}-${amount}`} className="p-5 border-b flex items-center justify-between gap-4" style={{ borderColor: "var(--neutral-100)" }}>
            <div>
              <p className="font-medium">{name}</p>
              <p style={{ color: "rgba(51,51,51,0.6)" }}>{course}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${amountColor}`}>{amount}</p>
              <p className="text-sm" style={{ color: "rgba(51,51,51,0.6)" }}>{date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
=======
          </section>
        </main>
      </div>
      <Toast />
    </ToastProvider>
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
  );
}

export default App;
