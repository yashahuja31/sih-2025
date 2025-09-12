import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Reports = () => {
  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      <div className="flex items-center space-x-3">
        <FileText className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Analysis Reports</h1>
      </div>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Comprehensive analysis reports and documentation will be generated here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;