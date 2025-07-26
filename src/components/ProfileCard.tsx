import { useState } from "react";
import { Heart, X, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Profile {
  id: number;
  name: string;
  age: number;
  image: string;
  bio: string;
  location: string;
  interests: string[];
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
  isAnimating?: boolean;
  animationDirection?: 'left' | 'right';
}

export const ProfileCard = ({ profile, onSwipe, isAnimating, animationDirection }: ProfileCardProps) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    setDragPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (Math.abs(dragPosition.x) > 50) {
      onSwipe(dragPosition.x > 0 ? 'right' : 'left');
    }
    
    setDragPosition({ x: 0, y: 0 });
  };

  const handleLike = () => onSwipe('right');
  const handlePass = () => onSwipe('left');

  return (
    <div 
      className={`
        relative w-full max-w-sm mx-auto bg-card rounded-3xl shadow-2xl overflow-hidden
        cursor-grab active:cursor-grabbing select-none
        ${isAnimating && animationDirection === 'left' ? 'animate-swipe-left' : ''}
        ${isAnimating && animationDirection === 'right' ? 'animate-swipe-right' : ''}
        ${!isAnimating ? 'animate-card-enter' : ''}
      `}
      style={{
        transform: `translate(${dragPosition.x}px, ${dragPosition.y}px) rotate(${dragPosition.x * 0.1}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Profile Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Swipe Indicators */}
        {dragPosition.x > 20 && (
          <div className="absolute top-8 right-8 bg-like text-white px-4 py-2 rounded-full font-bold text-lg animate-bounce-in">
            LIKE
          </div>
        )}
        {dragPosition.x < -20 && (
          <div className="absolute top-8 left-8 bg-pass text-white px-4 py-2 rounded-full font-bold text-lg animate-bounce-in">
            PASS
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">
              {profile.name}, {profile.age}
            </h2>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        <p className="text-card-foreground text-sm leading-relaxed">
          {profile.bio}
        </p>

        {/* Interests */}
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 pt-4">
          <Button
            variant="pass"
            size="icon"
            className="w-16 h-16 rounded-full"
            onClick={handlePass}
          >
            <X className="w-8 h-8" />
          </Button>
          
          <Button
            variant="like"
            size="icon"
            className="w-16 h-16 rounded-full"
            onClick={handleLike}
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};