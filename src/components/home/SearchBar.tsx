import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Hash, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SearchResult {
  type: "user" | "topic";
  name: string;
  subtitle: string;
  color?: string;
}

const mockUsers: SearchResult[] = [
  { type: "user", name: "Uni_News_Official", subtitle: "12.5K followers", color: "bg-blue-500" },
  { type: "user", name: "CS_Memes_Daily", subtitle: "8.2K followers", color: "bg-green-500" },
  { type: "user", name: "Fest_Committee", subtitle: "5.1K followers", color: "bg-purple-500" },
  { type: "user", name: "TechClub_Official", subtitle: "3.4K followers", color: "bg-orange-500" },
  { type: "user", name: "StudentCouncil", subtitle: "6.8K followers", color: "bg-pink-500" },
];

const mockTopics: SearchResult[] = [
  { type: "topic", name: "#UniversityNews", subtitle: "2.3K posts" },
  { type: "topic", name: "#StudentLife", subtitle: "5.6K posts" },
  { type: "topic", name: "#CodingLife", subtitle: "1.8K posts" },
  { type: "topic", name: "#CampusFest", subtitle: "890 posts" },
  { type: "topic", name: "#ProgrammerHumor", subtitle: "3.2K posts" },
  { type: "topic", name: "#Internships", subtitle: "1.2K posts" },
  { type: "topic", name: "#Placements", subtitle: "980 posts" },
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredUsers = mockUsers.filter(u => 
      u.name.toLowerCase().includes(lowerQuery)
    );
    const filteredTopics = mockTopics.filter(t => 
      t.name.toLowerCase().includes(lowerQuery)
    );

    setResults([...filteredUsers, ...filteredTopics]);
  }, [query]);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log("Selected:", result);
    setQuery(result.name);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search users, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          className="pl-10 pr-10 bg-card border-border"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (query.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {results.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No results found for "{query}"
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {results.filter(r => r.type === "user").length > 0 && (
                  <div className="p-2">
                    <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">USERS</p>
                    {results.filter(r => r.type === "user").map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors text-left"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={result.color}>
                            {result.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{result.name}</p>
                          <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {results.filter(r => r.type === "topic").length > 0 && (
                  <div className="p-2 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">TOPICS</p>
                    {results.filter(r => r.type === "topic").map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-md transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Hash className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{result.name}</p>
                          <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
