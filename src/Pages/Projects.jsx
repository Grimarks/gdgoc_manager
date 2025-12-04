// src/Pages/Projects.jsx
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Progress } from "../components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";

import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth.jsx";
import { toast } from "sonner";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { user, userData } = useAuth(); // user = firebase auth user, userData = profile from Firestore

  // Role check based on userData.role
  const isCoreTeamOrAbove =
      userData?.role && ["lead", "co_lead", "executive", "core"].includes(userData.role);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    progress: 0,
    deadline: "",
  });

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);

      const projectsData = querySnapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title || "",
          description: data.description || "",
          status: data.status || "active",
          progress: typeof data.progress === "number" ? data.progress : Number(data.progress) || 0,
          // keep deadline as string if stored, or convert timestamp
          deadline: data.deadline?.toDate ? data.deadline.toDate().toISOString() : data.deadline || null,
          created_at: data.created_at?.toDate ? data.created_at.toDate().toISOString() : data.created_at || null,
          created_by: data.created_by || null,
        };
      });

      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to perform this action");
      return;
    }

    const projectData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      progress: Number(formData.progress) || 0,
      // store deadline as ISO string or null
      deadline: formData.deadline ? formData.deadline : null,
      created_by: user.uid,
    };

    try {
      if (editingProject) {
        const projectRef = doc(db, "projects", editingProject.id);
        await updateDoc(projectRef, {
          ...projectData,
          updated_at: serverTimestamp(),
        });
        toast.success("Project updated");
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          created_at: serverTimestamp(),
        });
        toast.success("Project created");
      }

      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Project save error:", error);
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "active",
      progress: 0,
      deadline: "",
    });
    setEditingProject(null);
    setDialogOpen(false);
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      status: project.status || "active",
      progress: project.progress || 0,
      // If project.deadline is ISO string, set to YYYY-MM-DD for date input
      deadline: project.deadline ? project.deadline.split("T")[0] : "",
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Projects</h2>
            <p className="text-muted-foreground">
              {isCoreTeamOrAbove ? "Manage community projects" : "View ongoing projects"}
            </p>
          </div>

          {isCoreTeamOrAbove && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2" onClick={resetForm}>
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Create New Project"}
                    </DialogTitle>
                    <DialogDescription>Fill in the project details below</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Deadline</Label>
                        <Input
                            type="date"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Progress: {formData.progress}%</Label>
                      <Input
                          type="range"
                          min="0"
                          max="100"
                          value={formData.progress}
                          onChange={(e) =>
                              setFormData({ ...formData, progress: parseInt(e.target.value, 10) })
                          }
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit">{editingProject ? "Update" : "Create"} Project</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
          )}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                      variant={
                        project.status === "active"
                            ? "default"
                            : project.status === "completed"
                                ? "secondary"
                                : "outline"
                      }
                  >
                    {project.status}
                  </Badge>

                  {isCoreTeamOrAbove && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>

                  <Progress value={project.progress} />

                  {project.deadline && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                      </p>
                  )}
                </div>
              </Card>
          ))}
        </div>

        {projects.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-muted-foreground">No projects yet.</p>
                {isCoreTeamOrAbove && (
                    <Button className="mt-4" onClick={() => setDialogOpen(true)}>
                      Create your first project
                    </Button>
                )}
              </div>
            </Card>
        )}
      </div>
  );
}
