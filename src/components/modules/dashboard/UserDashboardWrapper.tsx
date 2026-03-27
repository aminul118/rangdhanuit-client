'use client';

const UserDashboardWrapper = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="bg-card p-12 rounded-3xl border-2 border-dashed shadow-sm max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-foreground">User Dashboard</h1>
        <p className="text-xl text-muted-foreground">Coming Soon</p>
        <div className="mt-8 h-2 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-primary to-violet-600 w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardWrapper;
