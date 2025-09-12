import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Microscope, 
  Activity, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Droplets,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { SampleGallery } from "./SampleGallery";

// Mock data
const hazardData = [
  { category: "Low", count: 45, color: "#22c55e" },
  { category: "Medium", count: 32, color: "#f59e0b" },
  { category: "High", count: 18, color: "#ef4444" },
  { category: "Severe", count: 5, color: "#dc2626" },
];

const comparisonData = [
  {
    metric: "Particle Count",
    detected: 85,
    whoLimit: 10,
    unit: "/L",
  },
  {
    metric: "Average Size",
    detected: 150,
    whoLimit: 100,
    unit: "μm",
  },
  {
    metric: "Hazard Index",
    detected: 7.2,
    whoLimit: 2.0,
    unit: "/10",
  },
];

const severityData = [
  { level: 1, description: "Minimal Impact", count: 20 },
  { level: 2, description: "Low Risk", count: 35 },
  { level: 3, description: "Moderate Risk", count: 25 },
  { level: 4, description: "High Risk", count: 15 },
  { level: 5, description: "Critical", count: 5 },
];

const knowledgeCards = [
  {
    title: "Health Impact",
    description: "Microplastics can accumulate in organs and potentially cause inflammation",
    severity: "high",
  },
  {
    title: "Water Treatment",
    description: "Advanced filtration systems can reduce microplastic content by 90%",
    severity: "medium",
  },
  {
    title: "Prevention",
    description: "Reduce single-use plastics to minimize environmental contamination", 
    severity: "low",
  },
];

export function Dashboard() {
  const [expandedSeverity, setExpandedSeverity] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-dashboard-bg min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-primary text-white shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Size</CardTitle>
            <Microscope className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142.5 μm</div>
            <p className="text-xs text-white/80">
              +8.2% from last analysis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-white shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Largest Particle</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,840 μm</div>
            <p className="text-xs text-white/80">
              Polyethylene fragment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smallest Particle</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0.8 μm</div>
            <p className="text-xs text-muted-foreground">
              Nanoplastic detected
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Card 1: Hazard Level Visualization */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Hazard Level Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hazardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0891b2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Card 2: Sample Image Gallery */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Microscope className="w-5 h-5 text-primary" />
              <span>Sample Gallery</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SampleGallery />
          </CardContent>
        </Card>

        {/* Card 3: Safe Water Comparison */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-primary" />
              <span>WHO Standards Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comparisonData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.metric}</span>
                    <span className="text-muted-foreground">
                      {item.detected}{item.unit} / {item.whoLimit}{item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.detected > item.whoLimit ? "bg-destructive" : "bg-primary"
                      }`}
                      style={{
                        width: `${Math.min((item.detected / (item.whoLimit * 2)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Severity Scale */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <span>Risk Severity Scale</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSeverity(!expandedSeverity)}
              >
                {expandedSeverity ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="count"
                  label={({ level }) => `Level ${level}`}
                >
                  {severityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${Math.max(120 - (entry.level - 1) * 30, 0)} 70% 50%)`}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            {expandedSeverity && (
              <div className="mt-4 space-y-2">
                {severityData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-muted rounded-md"
                  >
                    <span className="text-sm font-medium">
                      Level {item.level}: {item.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.count} samples
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 5: Knowledge Cards */}
        <Card className="shadow-card hover:shadow-card-hover transition-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-primary" />
              <span>Knowledge & Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {knowledgeCards.map((card, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    card.severity === "high"
                      ? "border-destructive bg-destructive/5"
                      : card.severity === "medium"
                      ? "border-amber-500 bg-amber-50"
                      : "border-primary bg-primary/5"
                  }`}
                >
                  <h4 className="font-semibold text-sm mb-2">{card.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}