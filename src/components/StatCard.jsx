import { Card } from "./ui/card.jsx";

export function StatCard({ title, value, icon: Icon, trend, color }) {
  const colorClasses = {
    blue: "bg-gdgblue",
    red: "bg-gdgred",
    yellow: "bg-gdgyello",
    green: "bg-gdggreen",
  };

  return (
      <Card className="p-6 hover:shadow-md border border-gray-200 bg-white rounded-xl transition-shadow">
        <div className="flex items-start justify-between">

          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>

            {trend && <p className="text-sm text-gdg-green font-medium">{trend}</p>}
          </div>

          <div className={`p-3 rounded-xl ${colorClasses[color] || colorClasses.blue}`}>
            <Icon className="h-6 w-6" />
          </div>

        </div>
      </Card>
  );
}
