import { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import { useToast } from "@/hooks/use-toast";

// Import profile images
import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";

interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
  bio: string;
  location: string;
  interests: string[];
}

const sampleProfiles: Profile[] = [
  {
    id: 1,
    name: "Emma",
    age: 25,
    image: profile1,
    bio: "Love hiking, coffee, and good conversations. Looking for someone who shares my passion for adventure!",
    location: "2 miles away",
    interests: ["Travel", "Photography", "Yoga", "Coffee"]
  },
  {
    id: 2,
    name: "Alex",
    age: 28,
    image: profile2,
    bio: "Software engineer by day, chef by night. Always up for trying new restaurants or cooking together.",
    location: "5 miles away",
    interests: ["Cooking", "Tech", "Music", "Running"]
  },
  {
    id: 3,
    name: "Sofia",
    age: 26,
    image: profile3,
    bio: "Artist and dreamer. I paint what I feel and feel what I paint. Let's create something beautiful together.",
    location: "3 miles away",
    interests: ["Art", "Museums", "Wine", "Dancing"]
  },
  {
    id: 4,
    name: "Marcus",
    age: 30,
    image: profile4,
    bio: "Fitness enthusiast and personal trainer. Believer in work-life balance and good vibes only.",
    location: "1 mile away",
    interests: ["Fitness", "Basketball", "Meditation", "Movies"]
  },
  {
    id: 5,
    name: "Luna",
    age: 24,
    image: profile5,
    bio: "Music lover and vinyl collector. If you can appreciate good music and late-night conversations, we'll get along.",
    location: "4 miles away",
    interests: ["Music", "Vinyl", "Books", "Night life"]
  }
];

interface SwipeStackProps {
  onMatch: (profile: Profile) => void;
}

export const SwipeStack = ({ onMatch }: SwipeStackProps) => {
  const [profiles, setProfiles] = useState(sampleProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('left');
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= profiles.length) return;

    setIsAnimating(true);
    setAnimationDirection(direction);

    const currentProfile = profiles[currentIndex];

    if (direction === 'right') {
      // It's a match!
      onMatch(currentProfile);
      toast({
        title: "It's a Match! 💕",
        description: `You and ${currentProfile.name} liked each other!`,
      });
    }

    // Move to next profile after animation
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          No more profiles! 🎉
        </h2>
        <p className="text-muted-foreground">
          Check back later for more people to discover.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Background card (next profile) */}
      {nextProfile && (
        <div className="absolute inset-0 scale-95 opacity-50 z-0">
          <ProfileCard
            profile={nextProfile}
            onSwipe={() => {}}
            isAnimating={false}
          />
        </div>
      )}

      {/* Current card */}
      <div className="relative z-10">
        <ProfileCard
          profile={currentProfile}
          onSwipe={handleSwipe}
          isAnimating={isAnimating}
          animationDirection={animationDirection}
        />
      </div>
    </div>
  );
};