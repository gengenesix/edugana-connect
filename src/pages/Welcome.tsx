import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, School, Users, BookOpen, Award, TrendingUp, Globe } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-green-600">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">EduGhana OS</span>
          </div>
          <Button onClick={() => navigate("/select-school")}>
            Access Portal
          </Button>
        </div>
      </header>

      <div className="container max-w-6xl py-16 px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-800 mb-6">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">Ghana's Free SHS Digital Platform</span>
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-red-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
            Transforming Education<br />Across Ghana
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            EduGhana OS is a comprehensive digital platform designed to revolutionize the management 
            of Ghana's Free Senior High School (SHS) program. Connecting <strong>721 schools</strong> across 
            all 16 regions, we're building the future of education in Ghana.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/select-school")}
              className="text-lg px-8 py-6"
            >
              Find Your School
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/auth?role=superadmin")}
              className="text-lg px-8 py-6"
            >
              Admin Login
            </Button>
          </div>
        </div>

        {/* About Ghana's Free SHS */}
        <Card className="p-8 mb-12 bg-white/80 backdrop-blur">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Globe className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">About Ghana's Free SHS Program</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Free Senior High School policy, introduced by the Government of Ghana, provides 
                free quality education to all Ghanaian children at the secondary level. This transformative 
                initiative has increased enrollment rates, reduced financial barriers, and opened doors of 
                opportunity for thousands of young Ghanaians across the nation.
              </p>
            </div>
          </div>
        </Card>

        {/* How EduGhana OS Helps */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How EduGhana OS Transforms Education</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A unified digital ecosystem for schools, administrators, teachers, students, and parents
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 mb-4">
                <School className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Centralized Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                SuperAdmins oversee all 721 schools nationwide. School admins manage their institutions 
                with complete control over student and teacher profiles, attendance, and academic records.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 mb-4">
                <BookOpen className="h-7 w-7 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Learning Hub</h3>
              <p className="text-muted-foreground leading-relaxed">
                Teachers upload study materials, assignments, and resources. Students access learning 
                content anytime, anywhere. Parents monitor their children's academic progress in real-time.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 mb-4">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive grade management, attendance tracking, and analytics. Generate reports, 
                identify trends, and make data-driven decisions to improve educational outcomes.
              </p>
            </Card>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Platform Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                Secure, hierarchical access control. SuperAdmins manage schools, School Admins manage 
                users, Teachers manage classes, Students access learning materials.
              </p>
            </Card>

            <Card className="p-6">
              <Award className="h-8 w-8 text-secondary mb-3" />
              <h3 className="text-lg font-semibold mb-2">Grades & Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Teachers enter grades digitally. Students view their performance. Parents receive updates. 
                Generate term reports and academic transcripts instantly.
              </p>
            </Card>

            <Card className="p-6">
              <BookOpen className="h-8 w-8 text-accent mb-3" />
              <h3 className="text-lg font-semibold mb-2">Learning Materials</h3>
              <p className="text-sm text-muted-foreground">
                Digital library of textbooks, notes, past questions, and multimedia content. Organized by 
                subject, class, and term for easy access.
              </p>
            </Card>

            <Card className="p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Real-time insights into school performance, student progress, attendance rates, and more. 
                Make informed decisions with comprehensive data visualization.
              </p>
            </Card>
          </div>
        </div>

        {/* Coverage Stats */}
        <Card className="p-8 bg-gradient-to-br from-red-600 to-green-600 text-white mb-16">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Nationwide Coverage</h2>
            <p className="text-white/90">EduGhana OS serves schools across all regions of Ghana</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">721</div>
              <div className="text-sm text-white/80">Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">16</div>
              <div className="text-sm text-white/80">Regions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-sm text-white/80">Free Access</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/80">Availability</div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the digital revolution in Ghana's education system. Access your school portal today.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/select-school")}
            className="text-lg px-12 py-6"
          >
            Access EduGhana OS Portal
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="mb-2">
            © 2025 EduGhana OS - Empowering Ghana's Free SHS Program
          </p>
          <p>
            Supporting quality education for all Ghanaian children
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
