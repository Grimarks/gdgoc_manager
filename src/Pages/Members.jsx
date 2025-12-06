import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../components/ui/input.jsx";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import { Avatar, AvatarFallback } from "../components/ui/avatar.jsx";

import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      const membersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        roles: [{ role: doc.data().role || "member" }],
        created_at: doc.data().created_at?.toDate?.() || new Date(),
      }));

      setMembers(membersData);
    } catch (error) {
      console.error("Error fetching members:", error);
    }

    setLoading(false);
  };

  const getRoleDisplay = (roles) => {
    if (!roles || roles.length === 0) return "Member";

    const highestRole = roles
        .map((r) => r.role)
        .sort((a, b) => {
          const order = ["member", "core", "executive", "co_lead", "lead"];
          return order.indexOf(b) - order.indexOf(a);
        })[0];

    return highestRole
        .replace("_", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
        (member.full_name || member.email)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const memberRole = getRoleDisplay(member.roles);
    const matchesRole =
        roleFilter === "all" ||
        memberRole.toLowerCase().includes(roleFilter.toLowerCase());

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div className="p-6">Loading members...</div>;
  }

  return (
      <div className="space-y-6 animate-in fade-in duration-500">

        <div>
          <h2 className="text-3xl font-bold mb-1">Members</h2>
          <p className="text-gray-500">Community members ({members.length})</p>
        </div>

        <Card className="p-6 bg-white border rounded-xl shadow-sm">

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40 border-gray-300">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="co_lead">Co-Lead</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Members */}
          <div className="space-y-3">
            {filteredMembers.map((member) => {
              const roleDisplay = getRoleDisplay(member.roles);

              return (
                  <div
                      key={member.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white border hover:shadow transition"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-[#4285F4] text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="font-medium">{displayName}</h4>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-400 hidden sm:block">
                        Joined {new Date(member.created_at).toLocaleDateString()}
                      </p>

                      <Badge
                          className={
                            roleDisplay === "Lead" || roleDisplay === "Co Lead"
                                ? "bg-[#4285F4] text-white"
                                : roleDisplay === "Executive"
                                    ? "bg-[#DB4437] text-white"
                                    : roleDisplay === "Core"
                                        ? "bg-[#0F9D58] text-white"
                                        : "bg-gray-200 text-gray-600"
                          }
                      >
                        {roleDisplay}
                      </Badge>
                    </div>
                  </div>
              );
            })}
          </div>

          {filteredMembers.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400">No members found.</p>
              </div>
          )}
        </Card>
      </div>
  );
}