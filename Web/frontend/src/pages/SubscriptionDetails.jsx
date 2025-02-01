import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FaUser, FaBox, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const getSubscriptionData = () => ({
  id:123,
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  plan: "Enterprise",
  startDate: "2022-03-15",
  renewalDate: "2024-03-15",
  monthlyCost: 500,
  paymentHistory: [
    { month: "Jan", amount: 500 },
    { month: "Feb", amount: 500 },
    { month: "Mar", amount: 500 },
    { month: "Apr", amount: 500 },
    { month: "May", amount: 500 },
    { month: "Jun", amount: 500 },
  ],
});

const SubscriptionDetails = () => {
  const { id } = useParams();
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSubscriptionData(getSubscriptionData(id));
    }, 500);
  }, [id]);

  if (!subscriptionData)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading subscription details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Subscription Details</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[{
          title: "Customer",
          icon: <FaUser className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">{subscriptionData.name}</div>
              <p className="text-xs text-gray-500">{subscriptionData.email}</p>
            </>
          )
        },
        {
          title: "Plan Type",
          icon: <FaBox className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">{subscriptionData.plan}</div>
            </>
          )
        },
        {
          title: "Monthly Cost",
          icon: <FaDollarSign className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">${subscriptionData.monthlyCost}</div>
              <p className="text-xs text-gray-500">Per month</p>
            </>
          )
        },
        {
          title: "Renewal Date",
          icon: <FaCalendarAlt className="text-gray-500" />,
          content: (
            <>
              <div className="text-lg font-bold">{subscriptionData.renewalDate}</div>
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
      
      <div className="p-4 bg-white shadow rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-4">Payment History</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subscriptionData.paymentHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
