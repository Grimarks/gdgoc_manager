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
  const { user, userData } = useAuth();

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
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);

      setProjects(
          querySnapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              title: data.title || "",
              description: data.description || "",
              status: data.status || "active",
              progress:
                  typeof data.progress === "number"
                      ? data.progress
                      : Number(data.progress) || 0,
              deadline: data.deadline?.toDate
                  ? data.deadline.toDate().toISOString()
                  : data.deadline || null,
              created_at: data.created_at?.toDate
                  ? data.created_at.toDate().toISOString()
                  : data.created_at || null,
              created_by: data.created_by || null,
            };
          })
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in");

    const projectData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      progress: Number(formData.progress) || 0,
      deadline: formData.deadline || null,
      created_by: user.uid,
    };

    try {
      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), {
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
      console.error(error);
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
      title: project.title,
      description: project.description,
      status: project.status,
      progress: project.progress,
      deadline: project.deadline ? project.deadline.split("T")[0] : "",
    });
    setDialogOpen(true);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-black">Projects</h2>
            <p className="text-gray-600">
              {isCoreTeamOrAbove
                  ? "Manage community projects"
                  : "View ongoing projects"}
            </p>
          </div>

          {isCoreTeamOrAbove && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                      className="bg-[#4285F4] hover:opacity-90 text-white px-4 py-2 rounded-lg shadow"
                      onClick={resetForm}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl bg-white rounded-xl p-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-black">
                      {editingProject ? "Edit Project" : "Create New Project"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill in the project details below
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                          id="title"
                          className="bg-white border border-gray-300"
                          value={formData.title}
                          onChange={(e) =>
                              setFormData({ ...formData, title: e.target.value })
                          }
                          required
                      />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea
                          className="bg-white border border-gray-300"
                          rows={4}
                          value={formData.description}
                          onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                          }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData({ ...formData, status: value })
                            }
                        >
                          <SelectTrigger className="bg-white border border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Deadline</Label>
                        <Input
                            type="date"
                            className="bg-white border border-gray-300"
                            value={formData.deadline}
                            onChange={(e) =>
                                setFormData({ ...formData, deadline: e.target.value })
                            }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Progress: {formData.progress}%</Label>
                      <Input
                          type="range"
                          min="0"
                          max="100"
                          value={formData.progress}
                          onChange={(e) =>
                              setFormData({
                                ...formData,
                                progress: parseInt(e.target.value, 10),
                              })
                          }
                      />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                          type="button"
                          className="border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-100"
                          onClick={resetForm}
                      >
                        Cancel
                      </Button>
                      <Button
                          type="submit"
                          className="bg-[#4285F4] hover:opacity-90 text-white px-4 py-2 rounded-lg"
                      >
                        {editingProject ? "Update" : "Create"} Project
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
          )}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
              <Card
                  key={project.id}
                  className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* Badge Status */}
                <div className="flex items-start justify-between mb-3">
                  <Badge
                      className="
                  px-3 py-1 text-white rounded
                  capitalize
                  cursor-default
                "
                      style={{
                        backgroundColor:
                            project.status === "active"
                                ? "#0F9D58"
                                : project.status === "completed"
                                    ? "#4285F4"
                                    : "#F4B400",
                      }}
                  >
                    {project.status}
                  </Badge>

                  {isCoreTeamOrAbove && (
                      <div className="flex gap-1">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => startEdit(project)}
                        >
                          <Edit className="h-4 w-4 text-gray-700" />
                        </button>

                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-black mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>

                  <Progress
                      value={project.progress}
                      className="h-2 rounded-full"
                      indicatorClassName="rounded-full"
                      style={{
                        "--tw-bg-opacity": 1,
                        backgroundColor: "#e5e7eb",
                      }}
                      indicatorStyle={{
                        backgroundColor:
                            project.progress < 50
                                ? "#DB4437"
                                : project.progress < 100
                                    ? "#F4B400"
                                    : "#0F9D58",
                      }}
                  />

                  {project.deadline && (
                      <p className="text-xs text-gray-500 mt-1">
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                      </p>
                  )}
                </div>
              </Card>
          ))}
        </div>

        {projects.length === 0 && (
            <Card className="p-12 bg-white border border-gray-200 rounded-xl">
              <div className="text-center">
                <p className="text-gray-600">No projects yet.</p>

                {isCoreTeamOrAbove && (
                    <button
                        className="mt-4 bg-[#4285F4] text-white px-4 py-2 rounded-lg hover:opacity-90"
                        onClick={() => setDialogOpen(true)}
                    >
                      Create your first project
                    </button>
                )}
              </div>
            </Card>
        )}
      </div>
  );
}
