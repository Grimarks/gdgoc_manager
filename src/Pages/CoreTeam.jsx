import { useState, useEffect } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { Card } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import { Avatar, AvatarFallback } from "../components/ui/avatar.jsx";

import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const getColorForRole = (role) => {
    const colors = {
        lead: "blue",
        co_lead: "red",
        executive: "yellow",
        core: "green",
    };
    return colors[role] || "blue";
};

const getRoleDisplay = (roles) => {
    if (!roles || roles.length === 0) return "Core Member";

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

export default function CoreTeam() {
    const [coreTeam, setCoreTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCoreTeam();
    }, []);

    const fetchCoreTeam = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));

            const mapped = snapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    roles: [{ role: doc.data().role }],
                }))
                .filter((user) =>
                    ["lead", "co_lead", "executive", "core"].includes(user.role)
                );

            const roleOrder = ["lead", "co_lead", "executive", "core"];

            const sorted = mapped.sort((a, b) => {
                const roleA = a.roles[0]?.role;
                const roleB = b.roles[0]?.role;

                return roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB);
            });

            setCoreTeam(sorted);
        } catch (error) {
            console.error("Error fetching core team:", error);
        }

        setLoading(false);
    };

    if (loading) return <div className="p-6">Loading core team...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-bold mb-2">Core Team</h2>
                <p className="text-muted-foreground">
                    Meet the leaders driving GDGoC UNSRI forward
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreTeam.map((member) => {
                    const displayName = member.full_name || member.email;

                    const initials = member.full_name
                        ? member.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : member.email.substring(0, 2).toUpperCase();

                    const roleDisplay = getRoleDisplay(member.roles);
                    const primaryRole = member.roles?.[0]?.role || "core";
                    const colorClass = getColorForRole(primaryRole);

                    return (
                        <Card
                            key={member.id}
                            className="p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex flex-col items-center text-center mb-4">
                                <Avatar className="h-20 w-20 mb-4">
                                    <AvatarFallback
                                        className={`bg-gdg${colorClass} text-white text-xl`}
                                    >
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>

                                <h3 className="text-xl font-semibold mb-1">
                                    {displayName}
                                </h3>

                                <Badge variant="secondary" className="mb-3">
                                    {roleDisplay}
                                </Badge>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{member.email}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Github className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Mail className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {coreTeam.length === 0 && (
                <Card className="p-12">
                    <div className="text-center">
                        <p className="text-muted-foreground">
                            No core team members found.
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}
