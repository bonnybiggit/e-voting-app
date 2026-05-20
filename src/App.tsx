import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import RootLayout from './app/layout'
import StudentLayout from './app/(student)/layout'
import AdminLayout from './app/admin/layout'

// Pages
import StudentPage from './app/(student)/page'
import BallotPage from './app/(student)/ballot/page'
import SuccessPage from './app/(student)/success/page'
import AdminPage from './app/admin/page'
import AdminDashboardPage from './app/admin/dashboard/page'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout><Outlet /></RootLayout>}>
          
          {/* Student routes */}
          <Route element={<StudentLayout><Outlet /></StudentLayout>}>
            <Route path="/" element={<StudentPage />} />
            <Route path="/ballot" element={<BallotPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminLayout><Outlet /></AdminLayout>}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
