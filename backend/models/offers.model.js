import mongoose from "mongoose";

const offersSchema = new mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
    },
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Offers = mongoose.model("Offer", offersSchema);
export default Offers;
