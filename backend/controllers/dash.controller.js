import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const TestingData = mongoose.connection.collection("Testing_Data");

// 1. Get Summary (total customers, churn rate, average tenure, average monthly charges)
export const getSummary = async (req, res) => {
  try {
    // Get total customers and churned customers count
    const [totalCustomers, churnedCustomers] = await Promise.all([
      TestingData.countDocuments(),
      TestingData.countDocuments({ Churn: 1 }), // Assuming 1 means churned
    ]);
    // console.log(totalCustomers, churnedCustomers);
    
    const churnRate = Number(((churnedCustomers / totalCustomers) * 100).toFixed(2));
    // Get average tenure and average monthly charges
    const [avgTenure, avgMonthlyCharges] = await Promise.all([
      TestingData.aggregate([{ $group: { _id: null, avg: { $avg: "$tenure" } } }]).toArray(),
      TestingData.aggregate([{ $group: { _id: null, avg: { $avg: "$MonthlyCharges" } } }]).toArray(),
    ]);
    res.json({
      totalCustomers,
      churnRate,
      avgTenure: avgTenure[0]?.avg,
      avgMonthlyCharges: avgMonthlyCharges[0]?.avg,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get Gender Distribution (How many customers per gender)
export const getGenderDistribution = async (req, res) => {
  try {
    const genderData = await TestingData.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } }, // Group by gender and count occurrences
    ]).toArray();
    res.json(genderData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Senior Citizen Distribution (How many senior citizens vs non-senior citizens)
export const getSeniorCitizenDistribution = async (req, res) => {
  try {
    const seniorCitizenData = await TestingData.aggregate([
      { $group: { _id: "$SeniorCitizen", count: { $sum: 1 } } }, // Group by SeniorCitizen status (0 or 1)
    ]).toArray();
    res.json(seniorCitizenData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Get Tenure Distribution (Group customers by tenure)
export const getTenureDistribution = async (req, res) => {
  try {
    const tenureData = await TestingData.aggregate([
      {
        $bucket: { // Bucket customers into tenure ranges
          groupBy: "$tenure",
          boundaries: [0, 12, 24, 36, 48, 60, 72], // Group into 12-month ranges
          default: "Other", // For tenure values outside the ranges
          output: { count: { $sum: 1 } }, // Count customers in each bucket
        },
      },
    ]).toArray();
    res.json(tenureData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Get Churn Distribution (How many customers churned vs not churned)
export const getChurnDistribution = async (req, res) => {
  try {
    const churnData = await TestingData.aggregate([
      { $group: { _id: "$Churn", count: { $sum: 1 } } }, // Group by Churn (1 or 0)
    ]).toArray();
    res.json(churnData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Get Contract Type Distribution (Count customers by contract type)
export const getContractDistribution = async (req, res) => {
  try {
    const contractData = await TestingData.aggregate([
      { $group: { _id: "$Contract", count: { $sum: 1 } } }, // Group by Contract type
    ]).toArray();
    res.json(contractData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Get Internet Service Distribution (Count customers by internet service type)
export const getInternetServiceDistribution = async (req, res) => {
  try {
    const internetServiceData = await TestingData.aggregate([
      { $group: { _id: "$InternetService", count: { $sum: 1 } } }, // Group by InternetService type
    ]).toArray();
    res.json(internetServiceData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// routes/customers.j

// Get customers from MongoDB
export const getCustomers = async (req, res) => {
  try {
    const customers = await TestingData.find({}).limit(50).toArray(); // Fetch all customers
    res.json(customers); // Send the customers data as response
  } catch (error) {
    console.error("Error fetching customer data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getCustomerById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const userObjectId = new ObjectId(userId);

    // Fetch user from the database using findOne
    const user = await TestingData.findOne({ _id: userObjectId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

