import { Users, Calendar, Award, TrendingUp } from "lucide-react";
import { StatCard } from "../components/StatCard.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";

const recentActivities = [
  { id: 1, user: "Sarah Johnson", action: "joined as a new member", time: "2 hours ago" },
  { id: 2, user: "Mike Chen", action: "registered for Workshop: React Basics", time: "5 hours ago" },
  { id: 3, user: "Emma Davis", action: "was promoted to Core Team", time: "1 day ago" },
  { id: 4, user: "Alex Kumar", action: "completed Cloud Study Jam", time: "2 days ago" },
];

const upcomingEvents = [
  { id: 1, title: "Introduction to Machine Learning", date: "Dec 15, 2024", attendees: 45, status: "upcoming" },
  { id: 2, title: "Android Dev Workshop", date: "Dec 20, 2024", attendees: 32, status: "upcoming" },
  { id: 3, title: "Cloud Study Jam", date: "Jan 5, 2025", attendees: 28, status: "planning" },
];

export default function Dashboard() {
  return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with GDGoC UNSRI.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          <StatCard
              title="Total Members"
              value="156"
              icon={Users}
              trend="+12 this month"
              color="blue"
          />
          <StatCard
              title="Active Events"
              value="8"
              icon={Calendar}
              trend="3 upcoming"
              color="red"
          />
          <StatCard
              title="Core Team"
              value="24"
              icon={Award}
              trend="Fully staffed"
              color="yellow"
          />
          <StatCard
              title="Attendance Rate"
              value="87%"
              icon={TrendingUp}
              trend="+5% from last month"
              color="green"
          />
        </div>

        {/* Activities & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                  <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                  <div
                      key={event.id}
                      className="p-4 bg-accent rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </span>
                      <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                        {event.attendees} registered
                  </span>
                    </div>
                  </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
  );
}
