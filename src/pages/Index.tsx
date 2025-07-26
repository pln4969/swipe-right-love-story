import { useState } from "react";
import { SwipeStack } from "@/components/SwipeStack";
import { MatchesView } from "@/components/MatchesView";
import { ProfileView } from "@/components/ProfileView";
import { Navigation } from "@/components/Navigation";
import { Flame, Heart } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'profile'>('discover');
  const [matches, setMatches] = useState<Profile[]>([]);

  const handleMatch = (profile: Profile) => {
    setMatches(prev => [...prev, profile]);
  };

  const handleStartChat = (profile: Profile) => {
    // In a real app, this would navigate to a chat screen
    console.log('Starting chat with:', profile.name);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-center py-4 px-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TinderClone
            </span>
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
