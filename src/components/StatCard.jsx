import { Card } from "./ui/card.jsx";

export function StatCard({ title, value, icon: Icon, trend, color }) {
  const colorClasses = {
    blue: "bg-gdg-blue/10 text-gdg-blue",
    red: "bg-gdg-red/10 text-gdg-red",
    yellow: "bg-gdg-yellow/10 text-gdg-yellow",
    green: "bg-gdg-green/10 text-gdg-green",
  };

  return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold mb-2">{value}</h3>
            {trend && (
                <p className="text-sm text-success">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${colorClasses[color] || colorClasses.blue}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </Card>
  );
}