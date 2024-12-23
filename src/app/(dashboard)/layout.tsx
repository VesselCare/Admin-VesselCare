// PROJECT IMPORTS
import GlobalLoader from "@/components/ui-components/GlobalLoader";
import DashboardLayout from "@/layout/MainLayout";
import AuthGuard from "@/utils/route-guard/AuthGuard";

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <>
        <GlobalLoader />
        <DashboardLayout>{children}</DashboardLayout>
      </>
    </AuthGuard>
  );
}
