import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import sample1 from "@/assets/sample-1.jpg";
import sample2 from "@/assets/sample-2.jpg";
import sample3 from "@/assets/sample-3.jpg";

const sampleImages = [
  {
    id: 1,
    src: sample1,
    title: "Microplastic Sample #001",
    description: "Polyethylene fragments detected in tap water",
  },
  {
    id: 2,
    src: sample2,
    title: "Microplastic Sample #002", 
    description: "Mixed plastic particles in bottled water",
  },
  {
    id: 3,
    src: sample3,
    title: "Microplastic Sample #003",
    description: "Synthetic fibers in filtered water sample",
  },
];

export function SampleGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sampleImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? sampleImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleImages.length);
  };

  const currentSample = sampleImages[currentIndex];

  return (
    <div className="relative group">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-lg aspect-video bg-muted">
        <img
          src={currentSample.src}
          alt={currentSample.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        
        {/* Overlay with info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
          <h4 className="font-semibold text-sm">{currentSample.title}</h4>
          <p className="text-xs text-white/80">{currentSample.description}</p>
        </div>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center space-x-2 mt-3">
        {sampleImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}