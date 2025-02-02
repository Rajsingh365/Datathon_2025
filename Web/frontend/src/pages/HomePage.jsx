import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUsers, FiUserCheck, FiUserMinus, FiAlertTriangle, FiPackage, FiClock, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Dashboard from "./Dashboard";
import Customer from "./Customer";

const chartData = [
  { month: "Jan", churn: 5.2, active: 94.8, revenue: 234500 },
  { month: "Feb", churn: 4.8, active: 95.2, revenue: 241200 },
  { month: "Mar", churn: 5.5, active: 94.5, revenue: 228750 },
  { month: "Apr", churn: 4.9, active: 95.1, revenue: 238900 },
  { month: "May", churn: 5.1, active: 94.9, revenue: 232100 },
  { month: "Jun", churn: 4.7, active: 95.3, revenue: 244300 },
];

const customerData = [
  {
    id: 1,
    name: "Alex Thompson",
    plan: "Enterprise",
    status: "At Risk",
    churnProbability: 75,
    lastActive: "3 days ago",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    plan: "Professional",
    status: "Stable",
    churnProbability: 15,
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Michael Chen",
    plan: "Basic",
    status: "At Risk",
    churnProbability: 82,
    lastActive: "7 days ago",
  },
];

const retentionStrategies = [
  { strategy: "Offer contract upgrade", impact: "+15% retention", duration: "2 weeks" },
  { strategy: "Bundle security services", impact: "+10% retention", duration: "1 week" },
  { strategy: "Personalized tech support", impact: "+8% retention", duration: "3 days" },
  { strategy: "Loyalty rewards program", impact: "+12% retention", duration: "1 month" },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const filteredCustomers = customerData.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <span>{`${entry.name}: ${entry.value}%`}</span>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-1 shadow-sm"
        >
          <div className="flex space-x-2">
            {["overview", "customers", "retention"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tabs Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {activeTab === "overview" && (
              <Dashboard/>
            )}

            {activeTab === "customers" && (
             <Customer/>
            )}

            {activeTab === "retention" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Recommended Retention Actions</h2>
                <div className="space-y-4">
                  {retentionStrategies.map((strategy, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FiClock className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="font-medium text-gray-900">{strategy.strategy}</span>
                          <span className="block text-xs text-gray-500">Duration: {strategy.duration}</span>
                        </div>
                      </div>
                      <span className="text-green-600 font-semibold">{strategy.impact}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomePage;
