import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from '@/components/ProtectedRoute'
import RoleBasedRedirect from '@/components/RoleBasedRedirect'
import Layout from '@/components/Layout'
import ClientLayout from '@/components/client/ClientLayout'
import ChatPage from '@/pages/ChatPage'

// Admin Pages
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Clients from '@/pages/Clients'
import ClientDetails from '@/pages/ClientDetails'
import Policies from '@/pages/Policies'
import PolicyDetails from '@/pages/PolicyDetails'
import Quotes from '@/pages/Quotes'
import QuoteDetails from '@/pages/QuoteDetails'
import Claims from '@/pages/Claims'
import ClaimDetails from '@/pages/ClaimDetails'
import Commission from '@/pages/Commission'
import Documents from '@/pages/Documents'
import Profile from '@/pages/Profile'
import Reports from '@/pages/Reports'
import Settings from '@/pages/Settings'

// Client Pages
import ClientDashboard from '@/pages/client/Dashboard'
import InsuranceCards from '@/pages/client/InsuranceCards'
import ProviderDirectory from '@/pages/client/ProviderDirectory'
import ClientClaims from '@/pages/client/Claims'
import ClientDocuments from '@/pages/client/Documents'
import ClientPayments from '@/pages/client/Payments'
import ClientProfile from '@/pages/client/Profile'
import ClientHelp from '@/pages/client/Help'
import ClientNotifications from '@/pages/client/Notifications'
import ClientFindDoctors from '@/pages/client/FindDoctors'

function App() {
  return (
    <div className="min-h-screen bg-vfb-bg-primary">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Admin */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/clients" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Clients />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/clients/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <ClientDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/policies" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Policies />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/policies/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <PolicyDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quotes" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Quotes />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quotes/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <QuoteDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/claims" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Claims />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/claims/:id" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <ClaimDetails />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/commission" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Commission />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/documents" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Documents />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Layout>
                <ChatPage />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Protected Routes - Client */}
        <Route 
          path="/client/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientDashboard />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/policies" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <InsuranceCards />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/claims" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientClaims />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/documents" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientDocuments />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/payments" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientPayments />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/provider-directory" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ProviderDirectory />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/find-doctors" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientFindDoctors />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/notifications" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientNotifications />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/profile" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientProfile />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/help" 
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <ClientLayout>
                <ClientHelp />
              </ClientLayout>
            </ProtectedRoute>
          } 
        />

        {/* Root redirect with role detection */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <RoleBasedRedirect />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 - redirect to appropriate dashboard */}
        <Route 
          path="*" 
          element={
            <ProtectedRoute>
              <RoleBasedRedirect />
            </ProtectedRoute>
          } 
        />
      </Routes>
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-vfb-bg-card text-vfb-text-primary border border-vfb-gray-200',
          duration: 4000,
        }}
      />
    </div>
  )
}

export default App 