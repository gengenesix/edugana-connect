import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, School, Users, GraduationCap, Mail, Phone, MapPin } from "lucide-react";

const SuperAdminSchoolDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [school, setSchool] = useState<any>(null);

  useEffect(() => {
    fetchSchool();
  }, [slug]);

  const fetchSchool = async () => {
    try {
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        toast.error("School not found");
        navigate("/superadmin/schools");
        return;
      }

      setSchool(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load school");
      navigate("/superadmin/schools");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!school) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container max-w-5xl py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/superadmin/schools")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{school.name}</h1>
                <Badge variant={school.is_active ? "default" : "secondary"}>
                  {school.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-muted-foreground">{school.motto || "School details and management"}</p>
            </div>
          </div>
        </div>

        {/* School Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Region</p>
                <p className="font-medium">{school.region}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">District</p>
                <p className="font-medium">{school.district}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender Type</p>
                <p className="font-medium capitalize">{school.gender_type || "Mixed"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Residency Type</p>
                <p className="font-medium capitalize">{school.residency_type || "Day/Boarding"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </p>
                <p className="font-medium">{school.contact_email}</p>
              </div>
              {school.contact_phone && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </p>
                  <p className="font-medium">{school.contact_phone}</p>
                </div>
              )}
              {school.address && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </p>
                  <p className="font-medium">{school.address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-primary/10 mb-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary">{school.student_count}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-secondary/10 mb-2">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-3xl font-bold text-secondary">{school.teacher_count}</p>
                <p className="text-sm text-muted-foreground">Teachers</p>
              </div>
              <div className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-muted mb-2">
                  <School className="h-6 w-6" />
                </div>
                <p className="text-3xl font-bold">{school.established_year || "N/A"}</p>
                <p className="text-sm text-muted-foreground">Established</p>
              </div>
              <div className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-muted mb-2">
                  <MapPin className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold">{school.region}</p>
                <p className="text-sm text-muted-foreground">Region</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Portal URL</p>
              <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                /portal/{school.slug}
              </code>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-sm">{new Date(school.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminSchoolDetail;
