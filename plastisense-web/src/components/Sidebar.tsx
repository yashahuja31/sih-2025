import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Camera, 
  BarChart3, 
  Settings, 
  MessageCircle,
  Microscope 
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Detection', 
      path: '/detection', 
      icon: Camera 
    },
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: BarChart3 
    },
    { 
      name: 'Chat Room', 
      path: '/chatroom', 
      icon: MessageCircle 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: Settings 
    }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">MicroDetect</h1>
            <p className="text-blue-200 text-sm">Microplastics Sensor</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`
                  }
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700">
        <div className="text-center text-blue-200 text-sm">
          <p>SIH 2025 Project</p>
          <p className="text-xs mt-1">Low-cost Detection</p>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
export default Sidebar;