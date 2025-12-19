import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ icon, title, value, bg }) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
