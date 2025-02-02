import { HfInference } from "@huggingface/inference";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import nodemailer from 'nodemailer';
import User from './../models/user.model.js';
import Offers from './../models/offers.model.js';
import mongoose from "mongoose";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const generateImage = async (req, res) => {
  try {
    const { imageGenerationPrompt } = req.body;

    // Initialize Hugging Face client
    const imgClient = new HfInference(process.env.HUGGING_FACE_API_KEY);

    // Generate image
    const imageBlob = await imgClient.textToImage({
      model: "ZB-Tech/Text-to-Image",
      inputs: imageGenerationPrompt,
      parameters: {
        num_inference_steps: 50,
        guidance_scale: 5,
        seed: 42,
        negative_prompt: "blurry, low quality, distorted, unrealistic, text, watermark",
        scheduler: "DPMSolverMultistep",
      },
      provider: "hf-inference",
    });

    // Convert blob to buffer
    const buffer = await imageBlob.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ai-generated',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Create readable stream from buffer
      const readableStream = new Readable({
        read() {
          this.push(imageBuffer);
          this.push(null);
        }
      });

      readableStream.pipe(uploadStream);
    });

    // Return success response with image URL
    res.json({
      message: "Image generated and uploaded successfully",
      imageUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    });

  } catch (error) {
    console.error('Error generating or uploading image:', error);
    res.status(500).json({
      message: "Error generating or uploading image",
      error: error.message
    });
  }
};

// Optional: Function to delete image from Cloudinary if needed
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};


export const sendEmail = async (req, res) => {
  const {offerName, minRange, maxRange, message, imageUrl} = req.body;
  console.log('OfferName', offerName);

  const googleFormLink = "https://shorturl.at/fQpqy"; // Update with your Google Form link


  const prompt = `You are a customer retention specialist. Generate a JSON response for the following email offer (You should only return the actual email subject and body and nothing else not even the acknowledgment):  

  ${message}  
  This is the Offer Name: ${offerName}
  Also, Embed this link in the email for customer feedback: ${googleFormLink}

  ### **Instructions:**  
  - **DO NOT** repeat this message or details in your response.  
  - **ONLY** return a valid JSON response in the exact format below.  
  - The email **must be in HTML format**.  
  - Escape special characters properly.  

  ### **Expected JSON Response Format:**  
  \`\`\`json
  {
    "subject": "Generated subject line",
    "body": "Generated HTML email body"
  }
  \`\`\`

  **DO NOT** include explanations, headers, or extra text. Return **only** the JSON response.
  `;


  let jsonString = await GeminiResponse(prompt);
  jsonString = jsonString.trim();
  jsonString = jsonString.replace(/^```json/, "").replace(/```$/, "");

  console.log("jsonString:", jsonString);
  const emailData = JSON.parse(jsonString);

  const {subject, body} = emailData;
  console.log('Email Data:', emailData);

  //Find all users
  const Final_Data_with_prob= mongoose.connection.collection("Final_Data_with_prob");
  const eligibleUsers = await Final_Data_with_prob.find({
    probability_churn: {
      $gte: minRange,
      $lte: maxRange
    }
  }).toArray();

  const newOffer = new Offers({  
    offerName: offerName,
    userIds: [],
  });

  for (let user of eligibleUsers) { 
    if (user.probability_churn >= minRange && user.probability_churn <= maxRange) {
        newOffer.userIds.push(user._id);

        const updateResult = await Final_Data_with_prob.updateOne(
          { _id: user._id }, // Ensure _id is properly formatted
          {
            $push: {
              subscription: {
                sub_name: offerName,
                is_activated: Math.random() < 0.5
              }
            }
          }
        );
        

        
        // ✅ Send the email
        forwardEmail(subject, body, imageUrl);
        console.log('Forwarding Email');
    }
}

  
  await newOffer.save();

  console.log('Offer created successfully', newOffer);


  res.json({message: "Email sent to all users successfully"});
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "raj365.tsec@gmail.com",
    pass: "wwxqelujdtjxrcpy",
  },
});




const forwardEmail = async (subject, body, imageUrl) => {
  const mailOptions = {
    from: "raj365.tsec@gmail.com",
    to: "sraj08188@gmail.com",
    subject: subject,
    html: `<p>${body}</p><img src="${imageUrl}" alt="Generated Image" />`,
    // text: "This is a test email sent using Nodemailer.",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}

const GeminiResponse = async (prompt) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBck8IubK8_gylIL5w5GvRjhd0m6uGu4s0`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  let geminiText = data.candidates[0].content.parts[0].text;
  return geminiText;
}
