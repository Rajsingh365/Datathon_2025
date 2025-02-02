import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPackage } from "react-icons/fi";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/customers`);
        const data = await response.json();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow-md p-4"
      >
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>

      {loading ? (
        <div className="text-center text-gray-600 py-8">Loading customers...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredCustomers.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-8">
                <p className="text-gray-500">No customers found matching your search</p>
              </motion.div>
            ) : (
              filteredCustomers.map((customer) => (
                <motion.div
                  key={customer._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-md p-6 cursor-pointer"
                >
                  <Link to={`/users/${customer._id}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900">User ID: {customer._id.slice(-6)}</h3>
                      <div className="flex items-center space-x-2">
                        <FiPackage className="w-5 h-5 text-teal-600" />
                        <span className="text-xs text-gray-500">Tenure: {customer.tenure} months</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contract:</span>
                        <span className="font-medium">{["Month-to-Month", "One Year", "Two Years"][customer.Contract]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${customer.Churn ? "text-red-600" : "text-green-600"}`}>
                          {customer.Churn ? "Churned" : "Active"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Charges:</span>
                        <span className="font-medium">${customer.MonthlyCharges.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Customer;
