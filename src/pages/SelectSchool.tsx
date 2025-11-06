import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, School, MapPin } from "lucide-react";

const SelectSchool = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      const { data, error } = await supabase
        .from("schools")
        .select("name, slug, region, district, is_active")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setSchools(data || []);
    } catch (error) {
      console.error("Failed to load schools:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase()) ||
    school.region.toLowerCase().includes(search.toLowerCase()) ||
    school.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
      <div className="container max-w-4xl py-12 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 mb-4">
            <School className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Select Your School</h1>
          <p className="text-lg text-muted-foreground">
            Find your school to access the EduGhana OS portal
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for your school by name, region, or district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading schools...</p>
          </div>
        )}

        {/* Schools List */}
        {!loading && (
          <div className="space-y-3">
            {filteredSchools.length === 0 ? (
              <Card className="p-12 text-center">
                <School className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No schools found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms
                </p>
              </Card>
            ) : (
              filteredSchools.map((school) => (
                <Card
                  key={school.slug}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                  onClick={() => navigate(`/auth?school=${school.slug}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0">
                        <School className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{school.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {school.region} • {school.district}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* SuperAdmin Link */}
        <div className="mt-8 text-center">
          <Button
            variant="link"
            onClick={() => navigate("/auth?role=superadmin")}
            className="text-muted-foreground"
          >
            SuperAdmin Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectSchool;
