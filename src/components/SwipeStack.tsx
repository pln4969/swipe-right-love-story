import { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import { useToast } from "@/hooks/use-toast";

// Import garba profile images
import profile1 from "@/assets/garba-profile-1.jpg";
import profile2 from "@/assets/garba-profile-2.jpg";
import profile3 from "@/assets/garba-profile-3.jpg";
import profile4 from "@/assets/garba-profile-4.jpg";
import profile5 from "@/assets/garba-profile-5.jpg";

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
    name: "Priya",
    age: 25,
    image: profile1,
    bio: "Passionate Garba dancer who lives for Navratri nights! Love traditional music, dandiya, and meeting new people who share the same energy. Let's dance under the stars! 💃",
    location: "2 km away",
    interests: ["Garba", "Dandiya", "Folk Music", "Festival Celebrations", "Traditional Dance"]
  },
  {
    id: 2,
    name: "Arjun",
    age: 28,
    image: profile2,
    bio: "Software engineer by day, Garba enthusiast by night! Been dancing since childhood and love the cultural richness of Gujarat. Looking for my dance partner for life! 🕺",
    location: "5 km away",
    interests: ["Garba", "Gujarati Culture", "Music", "Travel", "Food"]
  },
  {
    id: 3,
    name: "Kavya",
    age: 26,
    image: profile3,
    bio: "Classical dancer exploring the beautiful world of folk dance. Garba has my heart! Love dressing up in traditional attire and celebrating our rich heritage. ✨",
    location: "3 km away",
    interests: ["Classical Dance", "Garba", "Fashion", "Art", "Cultural Events"]
  },
  {
    id: 4,
    name: "Rohan",
    age: 30,
    image: profile4,
    bio: "Fitness trainer who stays in shape for all those energetic Garba nights! Love the community spirit and joy that comes with dancing. Let's create beautiful memories! 💪",
    location: "1 km away",
    interests: ["Fitness", "Garba", "Community Events", "Health", "Dance"]
  },
  {
    id: 5,
    name: "Ananya",
    age: 24,
    image: profile5,
    bio: "Modern girl with traditional values. Garba brings out my authentic self! Love experimenting with fusion styles while keeping the essence alive. Dance is life! 🌟",
    location: "4 km away",
    interests: ["Fusion Dance", "Fashion Design", "Garba", "Music", "Creativity"]
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
        title: "It's a Match! 💃🕺",
        description: `You and ${currentProfile.name} both love Garba! Time to plan your dance together!`,
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
          No more dancers! 🪩
        </h2>
        <p className="text-muted-foreground">
          Check back later for more Garba enthusiasts to discover.
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