import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiUser,
  FiUsers,
  FiWifi,
  FiFileText,
  FiDollarSign,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const UserPage = () => {
  const { userId } = useParams() || null;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("userid",userId)
    const fetchUser = async () => {
      try {
        if(!userId) return;
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/customers/${userId}`);
        const data = await response.json();
        console.log(data)
        setUser(data);
      
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading user details...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-red-600">User not found</div>
      </div>
    );
  }

  const statsData = [
    {
      name: "Tenure",
      value: user.tenure,
      color: "#4CAF50"
    },
    {
      name: "Monthly Charges",
      value: user.MonthlyCharges,
      color: "#2196F3"
    },
    {
      name: "Total Charges",
      value: user.TotalCharges,
      color: "#FFC107"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiUser className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customer Profile</h1>
              <p className="text-gray-500">ID: {userId}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            icon={FiClock}
            label="Tenure"
            value={`${user?.tenure} months`}
            color="bg-green-100"
            textColor="text-green-600"
          />
          <MetricCard
            icon={FiDollarSign}
            label="Monthly Charges"
            value={`$${user.MonthlyCharges?.toFixed(2)}`}
            color="bg-blue-100"
            textColor="text-blue-600"
          />
          <MetricCard
            icon={FiDollarSign}
            label="Total Charges"
            value={`$${user.TotalCharges?.toFixed(2)}`}
            color="bg-amber-100"
            textColor="text-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FiUsers className="mr-2" />
              Personal Information
            </h2>
            <div className="space-y-4">
              <InfoItem label="Gender" value={user.gender === 1 ? "Male" : "Female"} />
              <InfoItem label="Senior Citizen" value={user.SeniorCitizen ? "Yes" : "No"} />
              <InfoItem label="Partner" value={user.Partner ? "Yes" : "No"} />
              <InfoItem label="Dependents" value={user.Dependents ? "Yes" : "No"} />
            </div>
          </div>

          {/* Service Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FiWifi className="mr-2" />
              Service Information
            </h2>
            <div className="space-y-4">
              <InfoItem label="Internet Service" value={user.InternetService ? "Yes" : "No"} />
              <InfoItem label="Paperless Billing" value={user.PaperlessBilling ? "Yes" : "No"} />
              <InfoItem 
                label="Churn Probability" 
                value={user.Churn ? "High Risk" : "Low Risk"}
                valueColor={user.Churn ? "text-red-600" : "text-green-600"}
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Financial Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, color, textColor }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className={`w-6 h-6 ${textColor}`} />
      </div>
    </div>
  </div>
);

const InfoItem = ({ label, value, valueColor = "text-gray-900" }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-600">{label}</span>
    <span className={`font-medium ${valueColor}`}>{value}</span>
  </div>
);

export default UserPage;