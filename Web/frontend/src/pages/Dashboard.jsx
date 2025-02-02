import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FiTrendingDown, FiUser, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [genderData, setGenderData] = useState([]);
  const [seniorityData, setSeniorityData] = useState([]);
  const [tenureData, setTenureData] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [internetServiceData, setInternetServiceData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [churnData, setChurnData] = useState([]);

  useEffect(() => {
    fetchGenderData();
    fetchSeniorityData();
    fetchTenureData();
    fetchMetrics();
    fetchInternetServiceData();
    fetchContractData();
    fetchChurnData();
  }, []);
  const fetchInternetServiceData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/internetservice`
      );
      const data = await response.json();

      console.log("Fetched Internet Service Data:", data);

      const formattedData = [
        {
          name: "No Service",
          value: data.find((item) => item._id === 0)?.count || 0,
        },
        {
          name: "Fibre",
          value: data.find((item) => item._id === 1)?.count || 0,
        },
        { name: "DSL", value: data.find((item) => item._id === 2)?.count || 0 },
      ];

      setInternetServiceData(formattedData);
    } catch (error) {
      console.error("Error fetching internet service data:", error);
    }
  };

  const fetchContractData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/contract`
      );
      const data = await response.json();

      console.log("Fetched Contract Data:", data);

      const formattedData = [
        {
          name: "Month-to-Month",
          value: data.find((item) => item._id === 0)?.count || 0,
        },
        {
          name: "Quarterly",
          value: data.find((item) => item._id === 1)?.count || 0,
        },
        {
          name: "Yearly",
          value: data.find((item) => item._id === 2)?.count || 0,
        },
      ];

      setContractData(formattedData);
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  };

  const fetchChurnData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/churn`
      );
      const data = await response.json();

      console.log("Fetched Churn Data:", data);

      const formattedData = [
        {
          name: "Not Churned",
          value: data.find((item) => item._id === 0)?.count || 0,
        },
        {
          name: "Churned",
          value: data.find((item) => item._id === 1)?.count || 0,
        },
      ];

      setChurnData(formattedData);
    } catch (error) {
      console.error("Error fetching churn data:", error);
    }
  };

  // Fetch Metrics
  const fetchMetrics = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/summary`
      );
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  // Fetch Gender Data
  const fetchGenderData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/gender`
      );
      const data = await response.json();

      // Transform API response to chart format
      const formattedData = data.map((item) => ({
        name: item._id === 1 ? "Male" : "Female",
        value: item.count,
      }));

      setGenderData(formattedData);
    } catch (error) {
      console.error("Error fetching gender data:", error);
    }
  };

  // Fetch Seniority Data
  const fetchSeniorityData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/seniorcitizen`
      );
      const data = await response.json();

      // Check if data is being received
      console.log("Fetched Seniority Data:", data);

      const formattedData = [
        {
          name: "Senior Citizen",
          value: data.find((item) => item._id === 1)?.count || 0,
        },
        {
          name: "Non-Senior",
          value: data.find((item) => item._id === 0)?.count || 0,
        },
      ];
      console.log("Formatted Seniority Data:", formattedData);

      setSeniorityData(formattedData);
    } catch (error) {
      console.error("Error fetching seniority data:", error);
    }
  };

  // Fetch Tenure Data
  const fetchTenureData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/dashboard/tenure`
      );
      const data = await response.json();

      const formattedData = data.map((item) => ({
        name: item._id === "Other" ? "Other" : `${item._id} Months`,
        value: item.count,
      }));

      setTenureData(formattedData);
    } catch (error) {
      console.error("Error fetching tenure data:", error);
    }
  };

  if (!metrics) {
    return <p>Loading metrics...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={FiTrendingDown}
          title="Churn Rate"
          value={`${metrics.churnRate?.toFixed(1) || 0}%`}
          trend={metrics.churnRate > 30 ? "High" : "Normal"}
          color="bg-red-100 text-red-600"
        />
        <MetricCard
          icon={FiUser}
          title="Total Customers"
          value={metrics.totalCustomers || 0}
          trend="Active"
          color="bg-blue-100 text-blue-600"
        />
        <MetricCard
          icon={FiClock}
          title="Avg Tenure"
          value={`${metrics.avgTenure?.toFixed(1) || 0} mos`}
          trend="Retention"
          color="bg-green-100 text-green-600"
        />
        <MetricCard
          icon={FiClock}
          title="Avg Monthly Charges"
          value={`$${metrics.avgMonthlyCharges?.toFixed(2) || 0}`}
          trend="Revenue"
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Gender Distribution */}
        <ChartContainer title="Gender Distribution">
          <PieChartComponent
            data={genderData}
            colors={["#3B82F6", "#EC4899"]}
          />
        </ChartContainer>

        {/* Seniority Distribution */}
        <ChartContainer title="Seniority Distribution">
          <PieChartComponent
            data={seniorityData}
            colors={["#34D399", "#FBBF24"]}
          />
        </ChartContainer>
        <ChartContainer title="Churn Rate">
          {churnData.length > 0 ? (
            <PieChartComponent
              data={churnData}
              colors={["#10B981", "#EF4444"]}
            />
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </ChartContainer>

        <ChartContainer title="Contract Type">
          {contractData.length > 0 ? (
            <PieChartComponent
              data={contractData}
              colors={["#6366F1", "#F59E0B", "#22C55E"]}
            />
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </ChartContainer>
        <ChartContainer title="Internet Service">
          {internetServiceData.length > 0 ? (
            <PieChartComponent
              data={internetServiceData}
              colors={["#9CA3AF", "#3B82F6", "#FBBF24"]}
            />
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </ChartContainer>
      </div>

      {/* Tenure Distribution */}
      <ChartContainer title="Tenure Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tenureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ icon: Icon, title, value, trend, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-xl shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
        <span className={`text-sm px-2 py-1 rounded-full ${color}`}>
          {trend}
        </span>
      </div>
      <Icon className="w-12 h-12 text-gray-400" />
    </div>
  </motion.div>
);

// Chart Container
const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Pie Chart Component
const PieChartComponent = ({ data, colors }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart width={600} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
        label={({ name, value }) => 
          `${name}: ${value} (${((value / total) * 100).toFixed(1)}%)`
        }
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={colors[index]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, "Count"]} />
      <Legend />
    </PieChart>
  );
};


export default Dashboard;
