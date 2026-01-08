import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  GraduationCap, Award, Medal, FileCheck, 
  School, Building2, Calendar, MapPin, ExternalLink 
} from "lucide-react";

interface AccountTabProps {
  onLogout?: () => void;
}

const previousEducation = [
  {
    id: "ug",
    level: "Undergraduate",
    degree: "B.Sc. Computer Science",
    institution: "State University",
    location: "Chennai, Tamil Nadu",
    year: "2020 - 2023",
    percentage: "85.4%",
    grade: "First Class with Distinction",
  },
  {
    id: "hsc",
    level: "Higher Secondary (12th)",
    degree: "Science Stream",
    institution: "St. Xavier's Higher Secondary School",
    location: "Bangalore, Karnataka",
    year: "2018 - 2020",
    percentage: "92.6%",
    grade: "State Rank: 156",
  },
  {
    id: "ssc",
    level: "Secondary (10th)",
    degree: "CBSE Board",
    institution: "DAV Public School",
    location: "Hyderabad, Telangana",
    year: "2018",
    percentage: "95.2%",
    grade: "School Topper",
  },
];

const educationCertifications = [
  { id: 1, name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Dec 2024", verified: true },
  { id: 2, name: "Google Data Analytics", issuer: "Google / Coursera", date: "Aug 2024", verified: true },
  { id: 3, name: "Meta Front-End Developer", issuer: "Meta / Coursera", date: "Jun 2024", verified: true },
  { id: 4, name: "Python for Data Science", issuer: "IBM", date: "Mar 2024", verified: true },
];

const skillCertifications = [
  { id: 1, name: "React - The Complete Guide", issuer: "Udemy", date: "Nov 2024", verified: false },
  { id: 2, name: "Machine Learning A-Z", issuer: "Udemy", date: "Sep 2024", verified: false },
  { id: 3, name: "Full Stack Web Development", issuer: "freeCodeCamp", date: "Jul 2024", verified: true },
  { id: 4, name: "Advanced JavaScript Concepts", issuer: "Zero To Mastery", date: "May 2024", verified: false },
];

const achievements = [
  { id: 1, title: "1st Place - National Hackathon 2024", type: "Competition", badge: "🥇", date: "Oct 2024" },
  { id: 2, title: "Best Project Award - TechFest", type: "Competition", badge: "🏆", date: "Sep 2024" },
  { id: 3, title: "Runner Up - Code Sprint Championship", type: "Competition", badge: "🥈", date: "Aug 2024" },
  { id: 4, title: "Top 10 - Google Solution Challenge", type: "Competition", badge: "🌟", date: "Jun 2024" },
  { id: 5, title: "Published Paper - IEEE Conference", type: "Academic", badge: "📄", date: "May 2024" },
  { id: 6, title: "Open Source Contributor - React", type: "Contribution", badge: "💻", date: "Mar 2024" },
];

export function AccountTab({ onLogout }: AccountTabProps) {
  const [expanded, setExpanded] = useState<string>("");

  return (
    <div className="space-y-6">
      {/* Previous Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <School className="w-4 h-4" /> Previous Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {previousEducation.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="secondary" className="text-[10px] mb-2">{edu.level}</Badge>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {edu.institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">{edu.percentage}</p>
                    <p className="text-xs text-muted-foreground">{edu.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {edu.year}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {edu.location}</span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Certifications Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <Award className="w-4 h-4" /> Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible value={expanded} onValueChange={setExpanded}>
              <AccordionItem value="education-certs" className="border-0">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Education Certifications</span>
                    <Badge variant="secondary" className="ml-2">{educationCertifications.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {educationCertifications.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileCheck className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cert.verified && (
                            <Badge className="bg-success/10 text-success border-0 text-[10px]">Verified</Badge>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skill-certs" className="border-0">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-warning" />
                    <span className="font-semibold">Skill Certifications</span>
                    <Badge variant="secondary" className="ml-2">{skillCertifications.length}</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    {skillCertifications.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                            <Award className="w-5 h-5 text-warning" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cert.verified && (
                            <Badge className="bg-success/10 text-success border-0 text-[10px]">Verified</Badge>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <Medal className="w-4 h-4" /> Achievements & Competitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-3xl">{achievement.badge}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{achievement.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px]">{achievement.type}</Badge>
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
