import { Heart, User, MessageCircle, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: 'discover' | 'matches' | 'profile';
  onTabChange: (tab: 'discover' | 'matches' | 'profile') => void;
  matchCount: number;
}

export const Navigation = ({ activeTab, onTabChange, matchCount }: NavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        <Button
          variant={activeTab === 'discover' ? 'gradient' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('discover')}
          className="flex flex-col items-center space-y-1 py-3 px-4 rounded-xl"
        >
          <Flame className={`w-5 h-5 ${activeTab === 'discover' ? 'text-white' : 'text-muted-foreground'}`} />
          <span className={`text-xs ${activeTab === 'discover' ? 'text-white' : 'text-muted-foreground'}`}>
            Discover
          </span>
        </Button>

        <Button
          variant={activeTab === 'matches' ? 'gradient' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('matches')}
          className="flex flex-col items-center space-y-1 py-3 px-4 rounded-xl relative"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${activeTab === 'matches' ? 'text-white' : 'text-muted-foreground'}`} />
            {matchCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-like text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {matchCount > 9 ? '9+' : matchCount}
              </div>
            )}
          </div>
          <span className={`text-xs ${activeTab === 'matches' ? 'text-white' : 'text-muted-foreground'}`}>
            Partners
          </span>
        </Button>

        <Button
          variant={activeTab === 'profile' ? 'gradient' : 'ghost'}
          size="sm"
          onClick={() => onTabChange('profile')}
          className="flex flex-col items-center space-y-1 py-3 px-4 rounded-xl"
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-white' : 'text-muted-foreground'}`} />
          <span className={`text-xs ${activeTab === 'profile' ? 'text-white' : 'text-muted-foreground'}`}>
            Profile
          </span>
        </Button>
      </div>
    </nav>
  );
};