import React, { useState } from "react";
import { FaMagic, FaImage, FaEdit } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import MultiRangeSlider from "multi-range-slider-react";
import {Link} from "react-router-dom";
import { HfInference } from "@huggingface/inference";
import { toast } from "react-hot-toast";

const ImageGeneratorPage = () => {
  const [message, setMessage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const [offerName, setOfferName] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const handleGeneratePlan = async(e) => {
    e.preventDefault();
    try{
      console.log("hello")
    console.log("Plan Generated:", { offerName, minValue, maxValue, message, imageUrl });
    // //check
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/plan/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        minRange: minValue/100,
        maxRange: maxValue/100,
        message: message,
        imageUrl: imageUrl,
        offerName: offerName,
      }),
    });
    const data = await res.json();
    console.log("success",data);
    toast.success('Successfully created!');

    setGeneratedText("Plan generated successfully!");
    }
    catch(err){
      toast.error('This is an error!');
    }
  };

  const handleGenerateImage = async(e) => {
    e.preventDefault();
    console.log('Generate Image', generatedText);
    try{
      setIsGeneratingImage(true);
      console.log("Generating Image...");
      setGeneratedText("AI is generating your image...");

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/plan/generate-img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageGenerationPrompt: generatedText,
        }),
      })
      const data = await res.json();
      const imageBlob = data.imageUrl;
      setImageUrl(imageBlob);
      console.log("Image Generated");
      // setGeneratedText("AI-generated image created successfully!");
      setIsGeneratingImage(false);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003366] mb-8">Create New Plan</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Range Selector (Double Slider) */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-[#003366] font-semibold mb-4">Adjust Range</h2>
              <MultiRangeSlider
                min={0}
                max={100}
                step={5}
                minValue={minValue}
                maxValue={maxValue}
                onInput={handleInput}
              />
              <div className="flex justify-between mt-2 text-sm text-[#333333]">
                <span>Min: {minValue}</span>
                <span>Max: {maxValue}</span>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-[#003366] font-semibold mb-4">Offer Name</h2>
              <input
                type="text"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
                placeholder="Enter Offer Name..."
                className="w-full p-2 border border-[#008080] rounded-md focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            {/* Message Input */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-[#003366] font-semibold mb-4">Plan Details</h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your plan details here..."
                className="w-full p-2 min-h-[200px] border border-[#008080] rounded-md focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                rows={4}
              />
            </div>
            <button
                  onClick={handleGeneratePlan}
                  className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white py-2 rounded-md flex items-center justify-center space-x-2 transition duration-300"
                >
                  <FaMagic className="text-white" />
                  <span>Generate Plan</span>
                </button>
          </div>

          <div className="space-y-6">
            {/* Generated Image Display */}
            <div className="bg-white shadow-lg rounded-lg p-4 flex-col justify-center">
              <h2 className="text-[#003366] font-semibold mb-4">Generated Preview</h2>
              <div className="aspect-square h-[20rem] rounded-lg overflow-hidden bg-[#F5F5F5] place-items-center place-content-center">
                {isGeneratingImage ? (
                  <div className="text-center">
                    <CgSpinner className="animate-spin text-4xl text-[#008080] mx-auto mb-2" />
                    <p className="text-[#333333]">Generating image...</p>
                  </div>
                ) : imageUrl ? (
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Generated preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-[#333333]">No image generated yet</p>
                )}
              </div>
            </div>

            {/* Generation Text and Buttons */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-[#003366] font-semibold mb-4">Generation Details</h2>
              <textarea
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                placeholder="Generation details will appear here..."
                className="w-full p-2 mb-4 border border-[#008080] rounded-md focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                rows={4}
              />
              <div className="space-y-3">
                
                <button
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage}
                  className="w-full bg-[#4CAF50] hover:bg-[#45A049] text-white py-2 rounded-md flex items-center justify-center space-x-2 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingImage ? <CgSpinner className="animate-spin" /> : <FaImage />}
                  <span>{isGeneratingImage ? "Generating..." : "Generate Image"}</span>
                </button>
                <a href="http://localhost:5174/" target="_blank" className="block">
                  <button className="w-full bg-[#2196F3] hover:bg-[#1976D2] text-white py-2 rounded-md flex items-center justify-center space-x-2 transition duration-300">
                    <FaEdit className="text-white" />
                    <span>Create/Edit Poster</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneratorPage;
