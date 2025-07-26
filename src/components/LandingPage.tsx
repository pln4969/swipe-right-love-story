import { Button } from "@/components/ui/button";
import { Heart, Flame, MessageCircle, Star, Shield, Users } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const LandingPage = ({ onGetStarted, onSignIn }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-4 mx-auto shadow-2xl">
            <Flame className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TinderClone
          </h1>
        </div>

        {/* Hero Text */}
        <div className="max-w-md space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Start Something Epic
          </h2>
          <p className="text-lg text-muted-foreground">
            With millions of users and a proven track record, TinderClone is the fun way to meet new people.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Button 
            variant="gradient" 
            size="lg" 
            className="w-full text-lg py-6 rounded-2xl"
            onClick={onGetStarted}
          >
            Create Account
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full text-lg py-6 rounded-2xl"
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center space-x-6 text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Millions of Users</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Real Connections</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Why Choose TinderClone?
          </h3>
          <p className="text-muted-foreground">
            The best features to help you find meaningful connections
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-like/10 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-like" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Smart Matching</h4>
            <p className="text-muted-foreground">
              Our algorithm finds people who share your interests and values
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Safe Messaging</h4>
            <p className="text-muted-foreground">
              Connect with verified profiles in a secure environment
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold text-foreground">Premium Features</h4>
            <p className="text-muted-foreground">
              Get super likes, boosts, and see who likes you first
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-12 text-center bg-card/50 backdrop-blur-sm border-t border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Ready to Find Love?
        </h3>
        <Button 
          variant="gradient" 
          size="lg" 
          className="px-12 py-6 text-lg rounded-2xl"
          onClick={onGetStarted}
        >
          Get Started Now
        </Button>
      </div>
    </div>
  );
};