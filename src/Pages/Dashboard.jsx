import { useEffect, useState } from "react";
import { Users, Calendar, Award, TrendingUp } from "lucide-react";
import { StatCard } from "../components/StatCard.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase.js";

// Jika data gak bisa di fetch, ada back up bawah ini
const fallbackActivities = [
    { id: 1, user: "Marizka Riffiy", action: "joined Project Management division", time: "2 hours ago" },
    { id: 2, user: "Darrell Satriano", action: "updated Front-End Team repository", time: "5 hours ago" },
    { id: 3, user: "Nabil Pasha", action: "was promoted to Core Team", time: "1 day ago" },
    { id: 4, user: "Nabila Talita", action: "completed UI/UX Mentorship", time: "2 days ago" },
];

// Data dummy
const upcomingEvents = [
    { id: 1, title: "Introduction to Machine Learning", date: "Dec 15, 2024", attendees: 45, status: "upcoming" },
    { id: 2, title: "Android Dev Workshop", date: "Dec 20, 2024", attendees: 32, status: "upcoming" },
    { id: 3, title: "Cloud Study Jam", date: "Jan 5, 2025", attendees: 28, status: "planning" },
];

export default function Dashboard() {
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalCoreTeam, setTotalCoreTeam] = useState(0);
    const [recentActivities, setRecentActivities] = useState(fallbackActivities);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const usersRef = collection(db, "users");
                const membersQuery = query(usersRef, where("role", "==", "member"));
                const membersSnap = await getDocs(membersQuery);
                setTotalMembers(membersSnap.size);
                const coreRoles = ["lead", "co_lead", "executive", "core"];
                let coreCount = 0;

                for (const r of coreRoles) {
                    const qSnap = await getDocs(query(usersRef, where("role", "==", r)));
                    coreCount += qSnap.size;
                }
                setTotalCoreTeam(coreCount);

                if (!membersSnap.empty) {
                    const arr = membersSnap.docs.slice(0, 4).map((doc, index) => ({
                        id: index + 1,
                        user: doc.data().full_name,
                        action: "checked in to GDGoC dashboard",
                        time: `${index + 1} hours ago`,
                    }));
                    setRecentActivities(arr);
                }

            } catch (err) {
                console.error("Error fetching dashboard data", err);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
                <p className="text-gray-500">Welcome back! Here's what's happening with GDGoC UNSRI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Members"
                    value={totalMembers}
                    icon={Users}
                    trend="+12 this month"
                    color="#4285F4"
                />

                <StatCard
                    title="Active Events"
                    value="8"
                    icon={Calendar}
                    trend="3 upcoming"
                    color="#DB4437"
                />

                <StatCard
                    title="Core Team"
                    value={totalCoreTeam}
                    icon={Award}
                    trend="Fully staffed"
                    color="#F4B400"
                />

                <StatCard
                    title="Attendance Rate"
                    value="87%"
                    icon={TrendingUp}
                    trend="+5% from last month"
                    color="#0F9D58"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-white border rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Recent Activities</h3>

                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-3 pb-4 border-b last:border-none last:pb-0"
                            >
                                <div className="w-2 h-2 bg-[#4285F4] rounded-full mt-2" />
                                <div>
                                    <p className="text-sm">
                                        <span className="font-medium">{activity.user}</span>{" "}
                                        <span className="text-gray-500">{activity.action}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 bg-white border rounded-xl shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Upcoming Events</h3>

                    <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className="p-4 border rounded-lg bg-white hover:shadow transition"
                            >
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-medium">{event.title}</h4>

                                    <Badge
                                        className={
                                            event.status === "upcoming"
                                                ? "bg-[#4285F4] text-white"
                                                : "bg-gray-300 text-gray-800"
                                        }
                                    >
                                        {event.status}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
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
