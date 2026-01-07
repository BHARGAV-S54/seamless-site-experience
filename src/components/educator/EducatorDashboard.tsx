import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  CalendarCheck,
  Award,
  Trophy,
  Plus,
  Search,
  BookOpen,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

interface EducatorDashboardProps {
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
}

// Mock student data
const mockStudents = [
  { id: "1", name: "Rahul Kumar", rollNo: "21CS101", department: "CSE", attendance: 85, cgpa: 8.5 },
  { id: "2", name: "Priya Sharma", rollNo: "21CS102", department: "CSE", attendance: 92, cgpa: 9.1 },
  { id: "3", name: "Amit Singh", rollNo: "21CS103", department: "CSE", attendance: 78, cgpa: 7.8 },
  { id: "4", name: "Sneha Patel", rollNo: "21CS104", department: "CSE", attendance: 88, cgpa: 8.9 },
  { id: "5", name: "Vikram Reddy", rollNo: "21CS105", department: "CSE", attendance: 95, cgpa: 9.4 },
];

export function EducatorDashboard({ user, onLogout }: EducatorDashboardProps) {
  const [students] = useState(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [marksDialogOpen, setMarksDialogOpen] = useState(false);
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Attendance updated successfully!");
    setAttendanceDialogOpen(false);
  };

  const handleAddMarks = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mid marks added successfully!");
    setMarksDialogOpen(false);
  };

  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Certification added successfully!");
    setCertDialogOpen(false);
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Achievement added successfully!");
    setAchievementDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 pt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Educator Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {user?.name} • Manage your students
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1">
              <BookOpen className="w-3 h-3" />
              Educator
            </Badge>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CalendarCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-muted-foreground">Avg Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Award className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Certifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="marks">Mid Marks</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between gap-3">
                  <CardTitle>Student List</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-9 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>CGPA</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-primary/10">
                                {student.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>{student.rollNo}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="w-16 h-2" />
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.cgpa}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudent(student.id)}
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Attendance</CardTitle>
                  <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Attendance
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Attendance</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddAttendance} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Student</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose student" />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.name} ({s.rollNo})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="present">Present</SelectItem>
                              <SelectItem value="absent">Absent</SelectItem>
                              <SelectItem value="late">Late</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">Save Attendance</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Select "Add Attendance" to mark student attendance for today.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Mid Semester Marks</CardTitle>
                  <Dialog open={marksDialogOpen} onOpenChange={setMarksDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Marks
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Mid Marks</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddMarks} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Student</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose student" />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.name} ({s.rollNo})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Subject</Label>
                          <Input placeholder="e.g., Data Structures" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Mid 1 Marks</Label>
                            <Input type="number" placeholder="0-30" max={30} />
                          </div>
                          <div className="space-y-2">
                            <Label>Mid 2 Marks</Label>
                            <Input type="number" placeholder="0-30" max={30} />
                          </div>
                        </div>
                        <Button type="submit" className="w-full">Save Marks</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Add mid semester marks for students in your subjects.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Certifications</CardTitle>
                    <Dialog open={certDialogOpen} onOpenChange={setCertDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Certification</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddCertification} className="space-y-4">
                          <div className="space-y-2">
                            <Label>Select Student</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose student" />
                              </SelectTrigger>
                              <SelectContent>
                                {students.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>
                                    {s.name} ({s.rollNo})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Certification Name</Label>
                            <Input placeholder="e.g., AWS Cloud Practitioner" />
                          </div>
                          <div className="space-y-2">
                            <Label>Issuing Organization</Label>
                            <Input placeholder="e.g., Amazon Web Services" />
                          </div>
                          <div className="space-y-2">
                            <Label>Date Issued</Label>
                            <Input type="date" />
                          </div>
                          <Button type="submit" className="w-full">Add Certification</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-center py-4">
                    Add student certifications here.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Achievements</CardTitle>
                    <Dialog open={achievementDialogOpen} onOpenChange={setAchievementDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Achievement</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddAchievement} className="space-y-4">
                          <div className="space-y-2">
                            <Label>Select Student</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose student" />
                              </SelectTrigger>
                              <SelectContent>
                                {students.map((s) => (
                                  <SelectItem key={s.id} value={s.id}>
                                    {s.name} ({s.rollNo})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Achievement Title</Label>
                            <Input placeholder="e.g., Hackathon Winner" />
                          </div>
                          <div className="space-y-2">
                            <Label>Competition/Event</Label>
                            <Input placeholder="e.g., Smart India Hackathon" />
                          </div>
                          <div className="space-y-2">
                            <Label>Position</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1st">1st Place</SelectItem>
                                <SelectItem value="2nd">2nd Place</SelectItem>
                                <SelectItem value="3rd">3rd Place</SelectItem>
                                <SelectItem value="participant">Participant</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit" className="w-full">Add Achievement</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm text-center py-4">
                    Add competition achievements here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}