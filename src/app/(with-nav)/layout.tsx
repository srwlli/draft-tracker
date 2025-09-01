import { DashboardTabBar } from '@/components/dashboard-tab-bar';

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
      <DashboardTabBar />
    </div>
  );
}