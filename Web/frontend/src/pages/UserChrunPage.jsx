import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { FaUser, FaBox, FaDollarSign, FaExclamationCircle, FaClock } from "react-icons/fa";

const getUserData = (id) => ({
  id,
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  plan: "Enterprise",
  monthlyRevenue: 500,
  joinDate: "2022-03-15",
  churnProbabilities: [
    { month: "Jan", probability: 0.2 },
    { month: "Feb", probability: 0.15 },
    { month: "Mar", probability: 0.25 },
    { month: "Apr", probability: 0.3 },
    { month: "May", probability: 0.22 },
    { month: "Jun", probability: 0.35 },
  ],
  currentChurnRisk: 0.35,
  usageStats: {
    logins: 42,
    featuresUsed: 8,
    lastActive: "2 days ago"
  }
});

const COLORS = ["#4CAF50", "#EF4444"];

const UserChurnPage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUserData(getUserData(id));
    }, 500);
  }, [id]);

  if (!userData) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading user data...</div>;

  const pieChartData = [
    { name: "Retention", value: 1 - userData.currentChurnRisk },
    { name: "Churn Risk", value: userData.currentChurnRisk },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">User Churn Analysis</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[{
          title: "Customer",
          icon: <FaUser className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">{userData.name}</div>
              <p className="text-xs text-gray-500">{userData.email}</p>
            </>
          )
        },
        {
          title: "Current Plan",
          icon: <FaBox className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">{userData.plan}</div>
              <p className="text-xs text-gray-500">Since {userData.joinDate}</p>
            </>
          )
        },
        {
          title: "Monthly Revenue",
          icon: <FaDollarSign className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">${userData.monthlyRevenue}</div>
              <p className="text-xs text-gray-500">Per month</p>
            </>
          )
        },
        {
          title: "Churn Risk",
          icon: <FaExclamationCircle className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold flex items-center gap-2">
                {(userData.currentChurnRisk * 100).toFixed(1)}%
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: userData.currentChurnRisk > 0.3 ? "#EF4444" : "#4CAF50" }}></div>
              </div>
            </>
          )
        }].map((card, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">{card.title}</h2>
              {card.content}
            </div>
            {card.icon}
          </div>
        ))}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Churn Probability Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userData.churnProbabilities}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <Tooltip />
              <Line type="monotone" dataKey="probability" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Current Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Legend formatter={(value) => <span className="text-gray-500">{value}</span>} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="p-4 bg-white shadow rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="flex justify-between text-gray-500">
          <span>Last Active:</span>
          <span className="font-medium">{userData.usageStats.lastActive}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Monthly Logins:</span>
          <span className="font-medium">{userData.usageStats.logins}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Features Used:</span>
          <span className="font-medium">{userData.usageStats.featuresUsed}</span>
        </div>
      </div>
    </div>
  );
};

export default UserChurnPage;
