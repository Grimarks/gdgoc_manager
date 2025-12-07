import { useEffect, useState } from "react";
import { Calendar, Users, MapPin, Plus } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import { toast } from "sonner";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
        collection(db, "Events"),
        (snapshot) => {
          const list = snapshot.docs.map((doc) => {
            const data = doc.data();
            const title = data.title || data.tittle || "Untitled Event";
            const date = data.date && data.date.toDate ? data.date.toDate() : new Date();
            return { id: doc.id, ...data, title, date };
          });
          setEvents(list);
        },
        (error) => {
          console.error("Error fetching events:", error);
        }
    );

    return () => unsub();
  }, []);

  const handleClick = () => {
    toast("Web masih on progress");
  };

  return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">Events</h2>
            <p className="text-gray-500">Plan and manage community events</p>
          </div>
          <Button
              onClick={handleClick}
              className="gap-2 bg-[#4285F4] hover:bg-[#3267c7] text-white"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.length === 0 && (
              <p className="text-gray-500 col-span-full">No events found.</p>
          )}

          {events.map((event) => {
            const formattedDate = event.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            const progress =
                event.capacity > 0 ? (event.attendees / event.capacity) * 100 : 0;

            return (
                <Card
                    key={event.id}
                    className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <Badge
                        className={
                          event.status === "planning"
                              ? "bg-yellow-500 text-white"
                              : event.status === "upcoming"
                                  ? "bg-[#0F9D58] text-white"
                                  : "bg-gray-300 text-gray-800"
                        }
                    >
                      {event.status || "unknown"}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    {event.description || "No description provided."}
                  </p>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#4285F4]" />
                      <span>{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#DB4437]" />
                      <span>{event.location || "No location"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#0F9D58]" />
                      <span>
                    {event.attendees || 0} / {event.capacity || 0} attendees
                  </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: "#4285F4",
                        }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                        onClick={handleClick}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-300"
                    >
                      View Details
                    </Button>
                    <Button
                        onClick={handleClick}
                        size="sm"
                        className="flex-1 bg-[#4285F4] hover:bg-[#3267c7] text-white"
                    >
                      Manage
                    </Button>
                  </div>
                </Card>
            );
          })}
        </div>
      </div>
  );
}
