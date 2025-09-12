import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCompare } from "lucide-react";

const Comparisons = () => {
  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      <div className="flex items-center space-x-3">
        <GitCompare className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Sample Comparisons</h1>
      </div>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Comparative Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Side-by-side sample comparisons and statistical analysis will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comparisons;