import React from 'react';
import { 
  Microscope, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  DollarSign, 
  Clock,
  Smartphone,
  BarChart3,
  Target,
  Rocket
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 rounded-full">
                <Microscope className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Rhodamine B & UV Light Microplastics Detection Sensor
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Low-Cost, Portable, Field-Ready Solution for Real-Time Microplastics Detection 
              using Foldscope Technology
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-blue-600 px-6 py-2 rounded-full">
                <span className="text-sm font-semibold">₹12,000 - ₹18,000 Total Cost</span>
              </div>
              <div className="bg-green-600 px-6 py-2 rounded-full">
                <span className="text-sm font-semibold">85-90% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Problem Statement */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Problem Statement</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Microplastics</strong> (&lt;5 mm) are now found in oceans, rivers, and even drinking water. 
            They threaten ecosystems, aquatic life, and human health.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <DollarSign className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-semibold text-red-800 mb-2">Too Expensive</h3>
              <p className="text-red-600">₹10L+ setups for FTIR and Raman spectroscopy</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <Smartphone className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-semibold text-red-800 mb-2">Lab-Only</h3>
              <p className="text-red-600">Not portable for field testing</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <Clock className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="font-semibold text-red-800 mb-2">Time-Consuming</h3>
              <p className="text-red-600">Hours to days per test</p>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">Our Innovative Solution</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fluorescence Detection</h3>
              <p className="text-gray-600">Rhodamine B dye + UV light makes plastics glow</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Microscope className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optical Imaging</h3>
              <p className="text-gray-600">Foldscope + Camera + Raspberry Pi</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
              <p className="text-gray-600">Automatic classification of microplastics</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4 font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Sample Prep (~5 min)</h3>
              <p className="text-gray-600">Water Sample → Add Rhodamine B → Incubate → Filter onto slide</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4 font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Detection Process</h3>
              <p className="text-gray-600">UV LED Excitation → Plastics Glow Pink/Red → Foldscope + Camera → Image Captured</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mb-4 font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Processing</h3>
              <p className="text-gray-600">Raspberry Pi → Capture Image → ML Model → Result</p>
            </div>
          </div>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Performance Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left font-semibold">Parameter</th>
                  <th className="px-6 py-3 text-center font-semibold">Rhodamine B (Current)</th>
                  <th className="px-6 py-3 text-center font-semibold">Nile Red (Future Upgrade)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Detection Range</td>
                  <td className="px-6 py-4 text-center">20–500 µm</td>
                  <td className="px-6 py-4 text-center">10–500 µm</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Accuracy</td>
                  <td className="px-6 py-4 text-center">~85–90%</td>
                  <td className="px-6 py-4 text-center">~90–98%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Processing Time</td>
                  <td className="px-6 py-4 text-center">5–10 min/sample</td>
                  <td className="px-6 py-4 text-center">5–15 min/sample</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Portability</td>
                  <td className="px-6 py-4 text-center">✅ Yes</td>
                  <td className="px-6 py-4 text-center">✅ Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hardware Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Hardware Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Foldscope Kit</span>
                  <span className="font-semibold text-blue-600">₹500</span>
                </li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>UV LED (365 nm)</span>
                  <span className="font-semibold text-blue-600">₹400–600</span>
                </li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Optional Filters</span>
                  <span className="font-semibold text-blue-600">₹1,000–2,000</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Raspberry Pi 4/5 (with camera)</span>
                  <span className="font-semibold text-blue-600">₹8,000–10,000</span>
                </li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Peristaltic Pump</span>
                  <span className="font-semibold text-blue-600">₹1,000–2,000</span>
                </li>
                <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span>Misc Components</span>
                  <span className="font-semibold text-blue-600">₹2,000–3,000</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 p-6 bg-blue-100 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Total Cost (Prototype)</h3>
            <p className="text-3xl font-bold text-blue-900">₹12,000 – ₹18,000</p>
          </div>
        </div>

        {/* Impact */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Low Cost</h3>
              <p>Accessible in India & globally</p>
            </div>
            <div className="text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Portable</h3>
              <p>Works in field, not just lab</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast</h3>
              <p>10 minutes per test</p>
            </div>
            <div className="text-center">
              <Rocket className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scalable</h3>
              <p>Usable by NGOs, students, agencies</p>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Conclusion</h2>
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6 max-w-4xl mx-auto">
              This project proves that a true microplastic sensor can be built for under ₹20,000 
              using smart combinations of fluorescence chemistry, paper microscopy, and machine learning.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-blue-50 p-6 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Current Prototype</h3>
                <p className="text-blue-600">Rhodamine B + UV + ML (~85–90% accuracy)</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <Rocket className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Future Upgrade</h3>
                <p className="text-green-600">Nile Red + Blue LED + Filters (~90–98% accuracy)</p>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-800 mt-8">
              Our biodegradable sensor is not just affordable, but field-deployable and scalable — 
              a real step toward democratizing environmental monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;