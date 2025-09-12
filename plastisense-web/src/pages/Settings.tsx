import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
      </div>
      
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            System configuration and user preferences will be managed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;