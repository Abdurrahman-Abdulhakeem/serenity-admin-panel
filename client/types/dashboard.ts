export interface DashboardStats {
  appointments: {
    total: number;
    breakdown: Record<string, number>;
  };
  patients: {
    total: number;
    breakdown: Record<string, number>;
  };
  doctors: {
    total: number;
  };
  ageAnalytics: Record<string, number>;
}
