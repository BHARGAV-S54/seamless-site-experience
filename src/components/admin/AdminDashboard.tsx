import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Users,
  GraduationCap,
  BookOpen,
  Building2,
  Plus,
  Search,
  Trash2,
  Shield,
  LogOut,
  FileSpreadsheet,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
  user: { name: string; email: string; role: string } | null;
  onLogout: () => void;
}

// Mock data
const mockStudents = [
  { id: "1", name: "Rahul Kumar", rollNo: "21CS101", department: "CSE", email: "rahul@college.edu", status: "active" },
  { id: "2", name: "Priya Sharma", rollNo: "21CS102", department: "CSE", email: "priya@college.edu", status: "active" },
  { id: "3", name: "Amit Singh", rollNo: "21ECE101", department: "ECE", email: "amit@college.edu", status: "active" },
  { id: "4", name: "Sneha Patel", rollNo: "21ME101", department: "ME", email: "sneha@college.edu", status: "inactive" },
];

const mockTeachers = [
  { id: "1", name: "Dr. Ramesh Kumar", empId: "FAC001", department: "CSE", email: "ramesh@college.edu", canAddMarks: true, canAddAttendance: true },
  { id: "2", name: "Prof. Lakshmi Devi", empId: "FAC002", department: "ECE", email: "lakshmi@college.edu", canAddMarks: true, canAddAttendance: false },
  { id: "3", name: "Dr. Suresh Reddy", empId: "FAC003", department: "ME", email: "suresh@college.edu", canAddMarks: false, canAddAttendance: true },
];

const departments = ["CSE", "ECE", "EEE", "ME", "CE", "IT"];

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [students, setStudents] = useState(mockStudents);
  const [teachers, setTeachers] = useState(mockTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [releaseMarksOpen, setReleaseMarksOpen] = useState(false);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "all" || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.empId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "all" || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Student added successfully!");
    setAddStudentOpen(false);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Teacher added successfully!");
    setAddTeacherOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    toast.success("Student removed successfully!");
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
    toast.success("Teacher removed successfully!");
  };

  const handleTogglePermission = (teacherId: string, permission: "canAddMarks" | "canAddAttendance") => {
    setTeachers(
      teachers.map((t) =>
        t.id === teacherId ? { ...t, [permission]: !t[permission] } : t
      )
    );
    toast.success("Permission updated!");
  };

  const handleReleaseMarks = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Semester marks released successfully!");
    setReleaseMarksOpen(false);
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
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {user?.name} • College Administration
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="gap-1 bg-destructive/10 text-destructive border-destructive/20">
              <Shield className="w-3 h-3" />
              Administrator
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
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{teachers.length}</p>
                  <p className="text-xs text-muted-foreground">Teachers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Building2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{departments.length}</p>
                  <p className="text-xs text-muted-foreground">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Users className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length + teachers.length}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Students</CardTitle>
                  <Dialog open={addStudentOpen} onOpenChange={setAddStudentOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Student
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddStudent} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input placeholder="Enter student name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Roll Number</Label>
                          <Input placeholder="e.g., 21CS101" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="student@college.edu" />
                        </div>
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">Add Student</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
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
                        <TableCell>
                          <Badge variant="outline">{student.department}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {student.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.status === "active" ? "default" : "secondary"}
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Student?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove {student.name} from the system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteStudent(student.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manage Teachers</CardTitle>
                  <Dialog open={addTeacherOpen} onOpenChange={setAddTeacherOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Teacher
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Teacher</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddTeacher} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input placeholder="Enter teacher name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Employee ID</Label>
                          <Input placeholder="e.g., FAC001" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" placeholder="teacher@college.edu" />
                        </div>
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit" className="w-full">Add Teacher</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-blue-500/10 text-blue-600">
                                {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            {teacher.name}
                          </div>
                        </TableCell>
                        <TableCell>{teacher.empId}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{teacher.department}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {teacher.email}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Teacher?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove {teacher.name} from the system.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTeacher(teacher.id)}
                                  className="bg-destructive text-destructive-foreground"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Teacher Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Can Add Marks</TableHead>
                      <TableHead>Can Add Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-blue-500/10 text-blue-600">
                                {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            {teacher.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{teacher.department}</Badge>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={teacher.canAddMarks}
                            onCheckedChange={() =>
                              handleTogglePermission(teacher.id, "canAddMarks")
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={teacher.canAddAttendance}
                            onCheckedChange={() =>
                              handleTogglePermission(teacher.id, "canAddAttendance")
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academics Tab */}
          <TabsContent value="academics" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5" />
                    Release Semester Marks
                  </CardTitle>
                  <Dialog open={releaseMarksOpen} onOpenChange={setReleaseMarksOpen}>
                    <DialogTrigger asChild>
                      <Button>Release Marks</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Release Semester Marks</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleReleaseMarks} className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Departments</SelectItem>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Semester</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <SelectItem key={sem} value={String(sem)}>
                                  Semester {sem}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Academic Year</Label>
                          <Input placeholder="e.g., 2024-25" />
                        </div>
                        <Button type="submit" className="w-full">
                          Release Marks
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    Release semester marks for students across departments.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    SGPA and CGPA will be calculated automatically.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}