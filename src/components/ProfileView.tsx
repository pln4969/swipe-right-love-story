import { Settings, Edit, Camera, MapPin, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import profile1 from "@/assets/garba-profile-1.jpg";

export const ProfileView = () => {
  const userProfile = {
    name: "You",
    age: 25,
    image: profile1,
    bio: "Passionate Garba dancer who loves celebrating our beautiful Gujarati culture! Always excited for Navratri season and meeting fellow dance enthusiasts. Let's create magical moments on the dance floor! 💃✨",
    location: "Ahmedabad",
    interests: ["Garba", "Dandiya", "Folk Music", "Traditional Attire", "Festival Celebrations", "Cultural Events"],
    photos: [profile1, profile1, profile1] // In a real app, these would be different photos
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Photos */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Photos</h2>
          <Button variant="outline" size="sm">
            <Camera className="w-4 h-4 mr-2" />
            Add Photo
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {userProfile.photos.map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
              <img 
                src={photo} 
                alt={`Profile ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Edit className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Basic Info */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">About Me</h2>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-card-foreground">
              {userProfile.name}, {userProfile.age}
            </h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{userProfile.location}</span>
            </div>
          </div>
          
          <p className="text-card-foreground leading-relaxed">
            {userProfile.bio}
          </p>
        </div>
      </Card>

      {/* Interests */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Interests</h2>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {userProfile.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-gradient-primary text-white text-sm rounded-full font-medium"
            >
              {interest}
            </span>
          ))}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-6 h-6 text-like" />
          </div>
          <div className="text-2xl font-bold text-card-foreground">24</div>
          <div className="text-sm text-muted-foreground">Dance Likes</div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-6 h-6 text-accent" />
          </div>
          <div className="text-2xl font-bold text-card-foreground">12</div>
          <div className="text-sm text-muted-foreground">Super Likes</div>
        </Card>
      </div>

      {/* Premium Upgrade */}
      <Card className="p-6 bg-gradient-primary text-white">
        <div className="text-center">
          <Star className="w-8 h-8 mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Upgrade to Premium</h3>
          <p className="text-sm opacity-90 mb-4">
            Get unlimited likes, see who wants to dance with you, and boost your profile!
          </p>
          <Button variant="secondary" className="w-full">
            Upgrade Now
          </Button>
        </div>
      </Card>
    </div>
  );
};