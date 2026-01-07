import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck, GraduationCap, TrendingUp, BookOpen } from "lucide-react";

interface SubjectData {
  name: string;
  mid1: number;
  mid2: number;
  attendance: number;
}

const subjects: SubjectData[] = [
  { name: "Data Structures", mid1: 28, mid2: 26, attendance: 92 },
  { name: "Computer Networks", mid1: 24, mid2: 27, attendance: 88 },
  { name: "Database Management", mid1: 30, mid2: 29, attendance: 95 },
  { name: "Operating Systems", mid1: 22, mid2: 25, attendance: 78 },
  { name: "Software Engineering", mid1: 26, mid2: 28, attendance: 85 },
];

const semesterData = {
  currentSem: "IV",
  sgpa: 8.7,
  cgpa: 8.5,
  totalCredits: 120,
  earnedCredits: 98,
  overallAttendance: 87.6,
};

export function DashboardTab() {
  const getAttendanceColor = (value: number) => {
    if (value >= 90) return "bg-success";
    if (value >= 75) return "bg-warning";
    return "bg-destructive";
  };

  const getGradeColor = (marks: number) => {
    if (marks >= 27) return "text-success";
    if (marks >= 20) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current Sem", value: semesterData.currentSem, icon: BookOpen, color: "from-primary to-primary-glow" },
          { label: "SGPA", value: semesterData.sgpa.toFixed(2), icon: TrendingUp, color: "from-success to-emerald-400" },
          { label: "CGPA", value: semesterData.cgpa.toFixed(2), icon: GraduationCap, color: "from-blue-500 to-cyan-400" },
          { label: "Attendance", value: `${semesterData.overallAttendance}%`, icon: CalendarCheck, color: "from-warning to-amber-400" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-card overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
              <CardContent className="p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl md:text-3xl font-black">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Credits Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Credit Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Earned Credits</span>
              <span className="font-bold text-primary">{semesterData.earnedCredits} / {semesterData.totalCredits}</span>
            </div>
            <Progress 
              value={(semesterData.earnedCredits / semesterData.totalCredits) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-wise Mid Marks & Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Subject-wise Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{subject.name}</h4>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getAttendanceColor(subject.attendance)}`} />
                    <span className="text-xs font-medium">{subject.attendance}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-background/50 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Mid 1</p>
                    <p className={`text-lg font-black ${getGradeColor(subject.mid1)}`}>{subject.mid1}/30</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Mid 2</p>
                    <p className={`text-lg font-black ${getGradeColor(subject.mid2)}`}>{subject.mid2}/30</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Avg</p>
                    <p className="text-lg font-black text-primary">
                      {((subject.mid1 + subject.mid2) / 2).toFixed(1)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
