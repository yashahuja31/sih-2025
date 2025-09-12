export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Environmental Research Ministry. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Contact: research@microplastic.gov</span>
            <span>Version 1.2.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}