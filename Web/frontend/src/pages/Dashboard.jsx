import { useState } from "react";
import { motion } from "framer-motion";
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, 
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  FiUser, FiDollarSign, FiClock, FiShield, FiWifi,
  FiActivity, FiCalendar, FiCreditCard, FiTrendingDown
} from "react-icons/fi";

const data = [
  // Sample data - replace with actual dataset
  { gender: "Male", SeniorCitizen: 0, tenure: 26, Contract: "One year", MonthlyCharges: 19.8, Churn: "No" },
  { gender: "Male", SeniorCitizen: 1, tenure: 12, Contract: "Month-to-month", MonthlyCharges: 99.45, Churn: "Yes" },
  { gender: "Female", SeniorCitizen: 0, tenure: 23, Contract: "Two year", MonthlyCharges: 91.1, Churn: "No" },
  // Add more data points...
];

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("all");

  // Helper functions
  const churnRate = (data.filter(d => d.Churn === "Yes").length / data.length) * 100;
  const avgTenure = data.reduce((sum, d) => sum + d.tenure, 0) / data.length;

  // Gender distribution
  const genderData = [
    { name: "Male", value: data.filter(d => d.gender === "Male").length },
    { name: "Female", value: data.filter(d => d.gender === "Female").length }
  ];

  // Contract type distribution
  const contractData = [
    { name: "Month-to-month", value: data.filter(d => d.Contract === "Month-to-month").length },
    { name: "One year", value: data.filter(d => d.Contract === "One year").length },
    { name: "Two year", value: data.filter(d => d.Contract === "Two year").length }
  ];

  // Service correlation data
  const serviceCorrelation = [
    { service: "Online Security", churnRate: 25 },
    { service: "Tech Support", churnRate: 32 },
    { service: "Streaming TV", churnRate: 28 },
    { service: "Device Protection", churnRate: 30 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800"
          >
            Customer Churn Analysis
          </motion.h1>
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-white px-4 py-2 rounded-lg border border-gray-200"
          >
            <option value="all">All Time</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            icon={FiTrendingDown}
            title="Churn Rate"
            value={`${churnRate.toFixed(1)}%`}
            trend={churnRate > 30 ? "High" : "Normal"}
            color="bg-red-100 text-red-600"
          />
          <MetricCard
            icon={FiUser}
            title="Total Customers"
            value={data.length}
            trend="Active"
            color="bg-blue-100 text-blue-600"
          />
          <MetricCard
            icon={FiClock}
            title="Avg Tenure"
            value={`${avgTenure.toFixed(1)} mos`}
            trend="Retention"
            color="bg-green-100 text-green-600"
          />
        </div>

        {/* Main Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demographic Breakdown */}
          <ChartCard title="Customer Demographics">
            <div className="grid grid-cols-2 gap-4 h-64">
              <PieChart width={300} height={250}>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={index} fill={["#3B82F6", "#EC4899"][index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FiUser className="text-blue-500" />
                  <span>Senior Citizens: {data.filter(d => d.SeniorCitizen === 1).length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiCreditCard className="text-purple-500" />
                  <span>Paperless Billing: {data.filter(d => d.PaperlessBilling === "Yes").length}</span>
                </div>
              </div>
            </div>
          </ChartCard>

          {/* Tenure vs Churn */}
          <ChartCard title="Tenure Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tenure" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Churn" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Service Correlation */}
          <ChartCard title="Service Impact on Churn">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceCorrelation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="churnRate" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Contract Type Impact */}
          <ChartCard title="Contract Type Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contractData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {contractData.map((entry, index) => (
                    <Cell key={index} fill={["#10B981", "#3B82F6", "#F59E0B"][index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Monthly Charges Trend */}
        <ChartCard title="Monthly Charges vs Churn">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="MonthlyCharges" type="number" domain={[0, 120]} />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="Churn" 
                stroke="#EF4444" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

// Reusable components
const MetricCard = ({ icon: Icon, title, value, trend, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-xl shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <span className={`text-sm px-2 py-1 rounded-full ${color}`}>{trend}</span>
      </div>
      <Icon className="w-12 h-12 text-gray-400" />
    </div>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-sm"
  >
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default Dashboard;