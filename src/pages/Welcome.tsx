import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, School, Users, BookOpen } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
      <div className="container max-w-6xl py-12 px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-green-600 mb-6">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Welcome to EduGhana OS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A comprehensive school management system for Ghana's Free SHS program
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/select-school")}
            className="text-lg px-8 py-6"
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          <div className="text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/10 mb-4">
              <School className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">School Management</h3>
            <p className="text-muted-foreground">
              Manage students, teachers, and school operations in one place
            </p>
          </div>

          <div className="text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-secondary/10 mb-4">
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
            <p className="text-muted-foreground">
              Share materials, assignments, and educational content
            </p>
          </div>

          <div className="text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-accent/10 mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p className="text-muted-foreground">
              Connect teachers, students, and parents for better education
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/select-school")}
          >
            Login to Your School
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
