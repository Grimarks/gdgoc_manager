import { Calendar, Users, MapPin, Plus } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

const events = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    date: "Dec 15, 2024",
    time: "14:00 - 17:00",
    location: "Engineering Building, Room 301",
    attendees: 45,
    capacity: 60,
    status: "upcoming",
    description: "Learn the fundamentals of machine learning with hands-on examples.",
  },
  {
    id: 2,
    title: "Android Dev Workshop",
    date: "Dec 20, 2024",
    time: "09:00 - 16:00",
    location: "Computer Lab 2",
    attendees: 32,
    capacity: 40,
    status: "upcoming",
    description: "Build your first Android app using Kotlin and Android Studio.",
  },
  {
    id: 3,
    title: "Cloud Study Jam",
    date: "Jan 5, 2025",
    time: "10:00 - 15:00",
    location: "Online via Google Meet",
    attendees: 28,
    capacity: 50,
    status: "planning",
    description: "Explore Google Cloud Platform and earn badges.",
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    date: "Jan 12, 2025",
    time: "13:00 - 18:00",
    location: "Tech Hub",
    attendees: 0,
    capacity: 35,
    status: "planning",
    description: "Master modern web development with React and Tailwind CSS.",
  },
];

export default function Events() {
  return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Events</h2>
            <p className="text-muted-foreground">Plan and manage community events</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
              <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gdg-blue" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gdg-red" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gdg-green" />
                    <span>{event.attendees} / {event.capacity} attendees</span>
                  </div>
                </div>

                <div className="w-full bg-secondary rounded-full h-2 mb-4">
                  <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Manage
                  </Button>
                </div>
              </Card>
          ))}
        </div>
      </div>
  );
}
