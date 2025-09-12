import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube } from "lucide-react";

const Samples = () => {
  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      <div className="flex items-center space-x-3">
        <TestTube className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Sample Analysis</h1>
      </div>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Sample Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sample analysis tools and detailed microplastic detection results will be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Samples;