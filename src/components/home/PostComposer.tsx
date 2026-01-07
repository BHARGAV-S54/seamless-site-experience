import { Image, Video, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface PostComposerProps {
  userName?: string;
}

export function PostComposer({ userName = "User" }: PostComposerProps) {
  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Card className="border-0 shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Input
            placeholder="What's on your mind? Share your thoughts..."
            className="rounded-full bg-muted border-0 focus-visible:ring-primary"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Image className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Photo</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Video className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Video</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Poll</span>
            </Button>
          </div>
          <Button size="sm" className="gradient-primary text-primary-foreground rounded-full px-6">
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
