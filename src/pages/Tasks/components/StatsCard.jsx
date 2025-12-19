import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ title, value }) => {
  return (
    <Card>
      <CardContent className="p-4 text-center space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
