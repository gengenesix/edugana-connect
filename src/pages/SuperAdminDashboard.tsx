import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { School, Users, GraduationCap, LogOut, Plus, Building2 } from "lucide-react";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalUsers: 0,
    totalStudents: 0,
    activeSchools: 0,
  });
  const [schools, setSchools] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (userData?.role !== "superadmin") {
      toast.error("Unauthorized access");
      navigate("/auth");
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch schools
      const { data: schoolsData, error: schoolsError } = await supabase
        .from("schools")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (schoolsError) throw schoolsError;

      setSchools(schoolsData || []);

      // Fetch stats
      const { count: schoolCount } = await supabase
        .from("schools")
        .select("*", { count: "exact", head: true });

      const { count: userCount } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      const { count: activeSchoolCount } = await supabase
        .from("schools")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      setStats({
        totalSchools: schoolCount || 0,
        totalUsers: userCount || 0,
        totalStudents: 0,
        activeSchools: activeSchoolCount || 0,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">EduGhana OS</h1>
              <p className="text-xs text-muted-foreground">SuperAdmin Portal</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSchools}</div>
              <p className="text-xs text-success">
                {stats.activeSchools} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Across all schools
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Enrolled students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Schools</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSchools}</div>
              <p className="text-xs text-success">
                Currently operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Schools List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Schools</CardTitle>
                <CardDescription>
                  Latest schools added to the platform
                </CardDescription>
              </div>
              <Button onClick={() => navigate("/superadmin/schools/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Add School
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schools.length === 0 ? (
                <div className="text-center py-12">
                  <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No schools yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get started by adding your first school to the platform
                  </p>
                  <Button onClick={() => navigate("/superadmin/schools/new")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First School
                  </Button>
                </div>
              ) : (
                schools.map((school) => (
                  <div
                    key={school.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/superadmin/schools/${school.id}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                        <School className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{school.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {school.region} • {school.district}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{school.student_count} students</p>
                      <p className="text-xs text-muted-foreground">{school.teacher_count} teachers</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {schools.length > 0 && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => navigate("/superadmin/schools")}>
                  View All Schools
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;