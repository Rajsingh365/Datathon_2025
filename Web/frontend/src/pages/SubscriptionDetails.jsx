import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FaUser, FaBox, FaDollarSign, FaCalendarAlt, FaShare, FaCheck, FaTimes } from "react-icons/fa";
import { GiTwoCoins, GiCancel, GiCheckMark } from "react-icons/gi"; // Additional icons for churn effect
import { IoIosShareAlt, IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io"; // Additional icons for offer details

const getSubscriptionData = (id) => ({
  id: 123,
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  plan: "Enterprise",
  startDate: "2022-03-15",
  renewalDate: "2024-03-15",
  monthlyCost: 500,
  paymentHistory: [
    { month: "Jan", amount: 500 },
    { month: "Feb", amount: 300 },
    { month: "Mar", amount: 200 },
    { month: "Apr", amount: 100 },
    { month: "May", amount: 50 },
    { month: "Jun", amount: 10 },
  ],
  offerDetails: {
    shared: 150,
    accepted: 120,
    notAccepted: 30,
  },
  churnEffect: {
    churnedUsers: 10,
    retainedUsers: 110,
  },
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center text-gray-500"
      >
        Loading subscription details...
      </motion.div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-8"
    >
      <h1 className="text-3xl font-bold mb-6">Subscription Details</h1>

      {/* Offer Details Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-4 bg-white shadow rounded-lg mt-6"
      >
        <h2 className="text-lg font-semibold mb-4">Offer Details</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Shared",
              icon: <IoIosShareAlt className="text-blue-500 text-2xl" />,
              content: (
                <>
                  <div className="text-lg font-bold">{subscriptionData.offerDetails.shared}</div>
                  <p className="text-xs text-gray-500">Users</p>
                </>
              ),
            },
            {
              title: "Accepted",
              icon: <IoIosCheckmarkCircle className="text-green-500 text-2xl" />,
              content: (
                <>
                  <div className="text-lg font-bold">{subscriptionData.offerDetails.accepted}</div>
                  <p className="text-xs text-gray-500">Users</p>
                </>
              ),
            },
            {
              title: "Not Accepted",
              icon: <IoIosCloseCircle className="text-red-500 text-2xl" />,
              content: (
                <>
                  <div className="text-lg font-bold">{subscriptionData.offerDetails.notAccepted}</div>
                  <p className="text-xs text-gray-500">Users</p>
                </>
              ),
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-4 bg-white shadow rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="text-sm font-semibold">{card.title}</h2>
                {card.content}
              </div>
              {card.icon}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Churn Effect Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-4 bg-white shadow rounded-lg mt-6"
      >
        <h2 className="text-lg font-semibold mb-4">Churn Effect</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Churned Users",
              icon: <GiCancel className="text-red-500 text-2xl" />,
              content: (
                <>
                  <div className="text-lg font-bold">{subscriptionData.churnEffect.churnedUsers}</div>
                  <p className="text-xs text-gray-500">Users</p>
                </>
              ),
            },
            {
              title: "Retained Users",
              icon: <GiCheckMark className="text-green-500 text-2xl" />,
              content: (
                <>
                  <div className="text-lg font-bold">{subscriptionData.churnEffect.retainedUsers}</div>
                  <p className="text-xs text-gray-500">Users</p>
                </>
              ),
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-4 bg-white shadow rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="text-sm font-semibold">{card.title}</h2>
                {card.content}
              </div>
              {card.icon}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Payment History Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="p-4 bg-white shadow rounded-lg mt-6"
      >
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
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionDetails;