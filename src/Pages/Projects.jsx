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
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    progress: 0,
    deadline: "",
    created_by: "",
  });

  const isCoreTeamOrAbove = true;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("created_at", "desc"));
      const snap = await getDocs(q);
      setProjects(
          snap.docs.map((docItem) => {
            const data = docItem.data();
            return {
              id: docItem.id,
              title: data.title || "",
              description: data.description || "",
              status: data.status || "active",
              progress: Number(data.progress) || 0,
              deadline: data.deadline || "",
              created_by: data.created_by || "Unknown",
              created_at: data.created_at?.toDate
                  ? data.created_at.toDate().toISOString()
                  : null,
            };
          })
      );
    } catch (err) {
      console.error("ERROR:", err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.created_by) return toast.error("Please enter creator name");

    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      progress: Number(formData.progress),
      deadline: formData.deadline,
      created_by: formData.created_by,
    };

    try {
      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), {
          ...payload,
          updated_at: serverTimestamp(),
        });
        toast.success("Project updated");
      } else {
        await addDoc(collection(db, "projects"), {
          ...payload,
          created_at: serverTimestamp(),
        });
        toast.success("Project created");
      }

      fetchProjects();
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted");
      fetchProjects();
    } catch {
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
      created_by: "",
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
      deadline: project.deadline || "",
      created_by: project.created_by || "",
    });
    setDialogOpen(true);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-black">Projects</h2>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                  onClick={resetForm}
                  className="bg-[#4285F4] text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl bg-white rounded-xl p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Fill in the project details below.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label>Project Title</Label>
                  <Input
                      value={formData.title}
                      onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="bg-white border-gray-300"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                      }
                      className="bg-white border-gray-300"
                  />
                </div>

                <div>
                  <Label>Created By</Label>
                  <Input
                      value={formData.created_by}
                      onChange={(e) =>
                          setFormData({ ...formData, created_by: e.target.value })
                      }
                      required
                      className="bg-white border-gray-300"
                      placeholder="Enter creator name"
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
                      <SelectTrigger className="bg-white border-gray-300">
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
                        value={formData.deadline}
                        onChange={(e) =>
                            setFormData({ ...formData, deadline: e.target.value })
                        }
                        className="bg-white border-gray-300"
                        placeholder="e.g. Januari 2026"
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
                            progress: parseInt(e.target.value),
                          })
                      }
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                      type="button"
                      onClick={resetForm}
                      className="border border-gray-300 text-black"
                  >
                    Cancel
                  </Button>
                  <Button
                      type="submit"
                      className="bg-[#4285F4] text-white hover:opacity-90"
                  >
                    {editingProject ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
              <Card
                  key={p.id}
                  className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition"
              >
                <div className="flex justify-between mb-3">
                  <Badge
                      className="capitalize text-white px-3 py-1"
                      style={{
                        backgroundColor:
                            p.status === "active"
                                ? "#0F9D58"
                                : p.status === "completed"
                                    ? "#4285F4"
                                    : "#F4B400",
                      }}
                  >
                    {p.status}
                  </Badge>

                  <div className="flex gap-1">
                    <button
                        onClick={() => startEdit(p)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {p.description}
                </p>

                <p className="text-xs text-gray-500 mb-2">
                  Created by: <span className="font-medium">{p.created_by}</span>
                </p>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">{p.progress}%</span>
                  </div>

                  <Progress
                      value={p.progress}
                      className="h-2 rounded-full bg-gray-200"
                      indicatorClassName="rounded-full"
                      indicatorStyle={{
                        backgroundColor:
                            p.progress < 50
                                ? "#DB4437"
                                : p.progress < 100
                                    ? "#F4B400"
                                    : "#0F9D58",
                      }}
                  />
                </div>

                {p.deadline && (
                    <p className="text-xs text-gray-500 mt-2">Deadline: {p.deadline}</p>
                )}
              </Card>
          ))}
        </div>
      </div>
  );
}
