import mongoose from "mongoose";

const offersSchema = new mongoose.Schema(
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

const Offers = mongoose.model("Offer", offersSchema);
export default Offers;