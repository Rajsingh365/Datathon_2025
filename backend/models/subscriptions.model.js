import mongoose from "mongoose";

const subscriptionsSchema = new mongoose.Schema(
  {
    // Other fields for the subscription (e.g., name, plan, etc.)
    offers: [
      {
        offerName: {
          type: String,
          required: true,
        },
        userIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        ],
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Subscriptions = mongoose.model("Subscription", subscriptionsSchema);
export default Subscriptions;