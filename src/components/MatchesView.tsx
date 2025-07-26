import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
  bio: string;
  location: string;
  interests: string[];
}

interface MatchesViewProps {
  matches: Profile[];
  onStartChat: (profile: Profile) => void;
}

export const MatchesView = ({ matches, onStartChat }: MatchesViewProps) => {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-8">
        <Heart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          No dance partners yet
        </h2>
        <p className="text-muted-foreground">
          Start swiping to find your perfect Garba partner!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Dance Partners 💃🕺
        </h2>
        <p className="text-muted-foreground">
          {matches.length} {matches.length === 1 ? 'dancer wants' : 'dancers want'} to join you at Garba!
        </p>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={match.image}
                  alt={match.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-like rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">
                  {match.name}, {match.age}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {match.bio}
                </p>
              </div>

              <Button
                variant="gradient"
                size="sm"
                onClick={() => onStartChat(match)}
                className="rounded-full"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};