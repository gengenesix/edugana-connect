import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/welcome");
      return;
    }

    // Fetch user data and roles
    const [userResult, rolesResult] = await Promise.all([
      supabase
        .from("users")
        .select("school_id, schools(slug)")
        .eq("id", session.user.id)
        .maybeSingle(),
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
    ]);

    const userData = userResult.data;
    const userRole = rolesResult.data?.[0]?.role;

    if (userData && userRole) {
      if (userRole === "superadmin") {
        navigate("/superadmin/dashboard");
      } else {
        const schoolSlug = userData.schools?.slug || "";
        navigate(`/portal/${schoolSlug}/${userRole}/dashboard`);
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading EduGhana OS...</p>
      </div>
    </div>
  );
};

export default Index;
