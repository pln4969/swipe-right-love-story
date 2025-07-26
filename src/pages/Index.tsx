import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LandingPage } from "@/components/LandingPage";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { SwipeStack } from "@/components/SwipeStack";
import { MatchesView } from "@/components/MatchesView";
import { ProfileView } from "@/components/ProfileView";
import { Navigation } from "@/components/Navigation";
import { Flame, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
  bio: string;
  location: string;
  interests: string[];
}

const Index = () => {
  const { isAuthenticated, signIn, signUp, signOut, user } = useAuth();
  const [authView, setAuthView] = useState<'landing' | 'signin' | 'signup'>('landing');
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'profile'>('discover');
  const [matches, setMatches] = useState<Profile[]>([]);
  const { toast } = useToast();

  const handleMatch = (profile: Profile) => {
    setMatches(prev => [...prev, profile]);
  };

  const handleStartChat = (profile: Profile) => {
    // In a real app, this would navigate to a chat screen
    toast({
      title: "Chat Started! 💬",
      description: `You can now chat with ${profile.name}`,
    });
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      toast({
        title: "Welcome back! 🎉",
        description: "You're successfully signed in",
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (data: any) => {
    try {
      await signUp(data);
      toast({
        title: "Account created! 🎉",
        description: "Welcome to TinderClone",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Show authentication flow if not authenticated
  if (!isAuthenticated) {
    switch (authView) {
      case 'signin':
        return (
          <SignInForm
            onBack={() => setAuthView('landing')}
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAuthView('signup')}
          />
        );
      case 'signup':
        return (
          <SignUpForm
            onBack={() => setAuthView('landing')}
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAuthView('signin')}
          />
        );
      default:
        return (
          <LandingPage
            onGetStarted={() => setAuthView('signup')}
            onSignIn={() => setAuthView('signin')}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TinderClone
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Hi, {user?.firstName}!
            </span>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          {activeTab === 'discover' && (
            <div className="space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Discover People
                </h1>
                <p className="text-muted-foreground">
                  Swipe right to like, left to pass
                </p>
              </div>
              <SwipeStack onMatch={handleMatch} />
            </div>
          )}

          {activeTab === 'matches' && (
            <MatchesView matches={matches} onStartChat={handleStartChat} />
          )}

          {activeTab === 'profile' && (
            <ProfileView />
          )}
        </div>
      </main>

      {/* Navigation */}
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        matchCount={matches.length}
      />
    </div>
  );
};

export default Index;
