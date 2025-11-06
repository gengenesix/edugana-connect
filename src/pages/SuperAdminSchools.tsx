import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Plus, Search, School } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SuperAdminSchools = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [schools, setSchools] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSchools(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.district?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/superadmin/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Schools</h1>
              <p className="text-muted-foreground">Manage all schools in the system</p>
            </div>
          </div>
          <Button onClick={() => navigate("/superadmin/schools/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add School
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search schools by name, region, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <Card className="p-12 text-center">
            <School className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No schools found</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {searchQuery ? "Try adjusting your search" : "Get started by adding your first school"}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate("/superadmin/schools/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Add First School
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSchools.map((school) => (
              <Card
                key={school.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/superadmin/schools/${school.slug}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                    <School className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={school.is_active ? "default" : "secondary"}>
                    {school.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold mb-2">{school.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {school.region} • {school.district}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold text-primary">{school.student_count}</p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{school.teacher_count}</p>
                    <p className="text-xs text-muted-foreground">Teachers</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminSchools;