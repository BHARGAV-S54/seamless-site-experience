import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const trending = [
  { hashtag: "#CampusFest2025", count: "12.5k posts" },
  { hashtag: "#ExamTips", count: "8.9k posts" },
  { hashtag: "#CodingChallenge", count: "6.2k posts" },
  { hashtag: "#StudentLife", count: "15.1k posts" },
];

const suggestions = [
  { name: "Dr. Sarah Chen", followers: "5.2k followers", color: "bg-blue-100 text-blue-600" },
  { name: "Code Academy", followers: "12.8k followers", color: "bg-green-100 text-green-600" },
  { name: "Math Wizards", followers: "3.4k followers", color: "bg-purple-100 text-purple-600" },
];

export function TrendingSidebar() {
  return (
    <div className="hidden lg:flex flex-col gap-5 w-[300px] flex-shrink-0">
      {/* Trending */}
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🔥 Trending Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trending.map((item) => (
            <div key={item.hashtag} className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">{item.hashtag}</span>
              <span className="text-xs text-muted-foreground">{item.count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">👥 Suggested for you</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestions.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarFallback className={item.color}>
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.followers}</p>
              </div>
              <Button size="sm" className="gradient-primary text-primary-foreground text-xs px-3 h-7 rounded-full">
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
