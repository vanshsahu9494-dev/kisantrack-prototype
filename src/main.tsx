import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { VlyToolbar } from '../vly-toolbar-readonly.tsx';
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router";
import { DemoProvider, useDemo } from "@/lib/demo-store";
import "./index.css";

// Lazy load route components
const Landing = lazy(() => import("./pages/Landing.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const AuthRole = lazy(() => import("./pages/AuthRole.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Farmer pages
const FarmerDashboard = lazy(() => import("./pages/farmer/FarmerDashboard.tsx"));
const BookSlot = lazy(() => import("./pages/farmer/BookSlot.tsx"));
const MyToken = lazy(() => import("./pages/farmer/MyToken.tsx"));
const TrackProcurement = lazy(() => import("./pages/farmer/TrackProcurement.tsx"));
const FindCentre = lazy(() => import("./pages/farmer/FindCentre.tsx"));
const Notifications = lazy(() => import("./pages/farmer/Notifications.tsx"));

// Operator pages
const OperatorDashboard = lazy(() => import("./pages/operator/OperatorDashboard.tsx"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));

// Layouts
const FarmerLayout = lazy(() => import("./layouts/FarmerLayout.tsx"));
const OperatorLayout = lazy(() => import("./layouts/OperatorLayout.tsx"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f7f2]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
        <span className="text-sm text-emerald-700 font-medium">Loading...</span>
      </div>
    </div>
  );
}

class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode }, { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: Error) { console.warn("[VlyToolbar] Caught error:", err.message); }
  render() { return this.state.hasError ? null : this.props.children; }
}

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode }, { hasError: boolean; message: string }
> {
  state = { hasError: false, message: "" };
  static getDerivedStateFromError(error: Error) { return { hasError: true, message: error.message }; }
  componentDidCatch(err: Error) { console.error("[App] Root crash:", err); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f7f2] p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold text-emerald-800">Something went wrong</p>
            <p className="mt-2 text-xs text-emerald-600/70 break-words">{this.state.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage({ type: "iframe-route-change", path: location.pathname }, "*");
  }, [location.pathname]);
  return null;
}

// Wrapper to inject layout around farmer routes
function FarmerRoute({ children }: { children: React.ReactNode }) {
  return <FarmerLayout>{children}</FarmerLayout>;
}

function OperatorRoute({ children }: { children: React.ReactNode }) {
  return <OperatorLayout>{children}</OperatorLayout>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <ConvexAuthProvider client={convex}>
        <DemoProvider>
          <BrowserRouter>
            <RouteSyncer />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<AuthPage redirectAfterAuth="/auth-role" />} />

                {/* Role selection after auth */}
                <Route path="/auth-role" element={<AuthRole />} />

                {/* Farmer routes */}
                <Route path="/dashboard" element={<RequireAuth><FarmerRoute><FarmerDashboard /></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/book" element={<RequireAuth><FarmerRoute><BookSlot /></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/token" element={<RequireAuth><FarmerRoute><MyToken /></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/track" element={<RequireAuth><FarmerRoute><TrackProcurement /></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/centres" element={<RequireAuth><FarmerRoute><FindCentre /></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/notifications" element={<RequireAuth><FarmerRoute><Notifications /></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/support" element={<RequireAuth><FarmerRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Support</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></FarmerRoute></RequireAuth>} />
                <Route path="/dashboard/history" element={<RequireAuth><FarmerRoute><FarmerDashboard /></FarmerRoute></RequireAuth>} />

                {/* Operator routes */}
                <Route path="/operator" element={<RequireAuth><OperatorRoute><OperatorDashboard /></OperatorRoute></RequireAuth>} />
                <Route path="/operator/tokens" element={<RequireAuth><OperatorRoute><OperatorDashboard /></OperatorRoute></RequireAuth>} />
                <Route path="/operator/farmers" element={<RequireAuth><OperatorRoute><OperatorDashboard /></OperatorRoute></RequireAuth>} />
                <Route path="/operator/procurement" element={<RequireAuth><OperatorRoute><OperatorDashboard /></OperatorRoute></RequireAuth>} />
                <Route path="/operator/reports" element={<RequireAuth><OperatorRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Reports</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></OperatorRoute></RequireAuth>} />
                <Route path="/operator/notifications" element={<RequireAuth><OperatorRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Notifications</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></OperatorRoute></RequireAuth>} />
                <Route path="/operator/settings" element={<RequireAuth><OperatorRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Settings</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></OperatorRoute></RequireAuth>} />

                {/* Admin routes */}
                <Route path="/admin" element={<RequireAuth><AdminRoute><AdminDashboard /></AdminRoute></RequireAuth>} />
                <Route path="/admin/mandis" element={<RequireAuth><AdminRoute><AdminDashboard /></AdminRoute></RequireAuth>} />
                <Route path="/admin/analytics" element={<RequireAuth><AdminRoute><AdminDashboard /></AdminRoute></RequireAuth>} />
                <Route path="/admin/farmers" element={<RequireAuth><AdminRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Farmers Management</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></AdminRoute></RequireAuth>} />
                <Route path="/admin/reports" element={<RequireAuth><AdminRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Reports</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></AdminRoute></RequireAuth>} />
                <Route path="/admin/notifications" element={<RequireAuth><AdminRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Notifications</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></AdminRoute></RequireAuth>} />
                <Route path="/admin/settings" element={<RequireAuth><AdminRoute><div className="max-w-lg mx-auto text-center py-12"><h2 className="text-lg font-bold text-emerald-900 mb-2">Settings</h2><p className="text-sm text-emerald-600/70">Coming soon in v2</p></div></AdminRoute></RequireAuth>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </DemoProvider>
        <Toaster />
      </ConvexAuthProvider>
    </RootErrorBoundary>
  </StrictMode>,
);
