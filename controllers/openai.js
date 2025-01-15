const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI('AIzaSyD-O_0TUKd1DTVWh7zc0rSHSC_jFyDTKmI'); // Replace with your Google API key
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Use the Gemini Pro model

const router = express.Router();

router.post("/", async (req, res) => {
    console.log('Inside the controller');

    const { weight, height, activity } = req.body;

    // Create the prompt
    const prompt = `Suggest a daily calorie intake and workout plan for a person with - Weight: ${weight} kg - Height: ${height} cm - Activity level: ${activity}`;

    try {
        // Send the prompt to Google Gemini
        const result = await model.generateContent(prompt);
        const aiResponse = await result.response.text();

        console.log("Google Gemini Response:", aiResponse);

        // Send the response back to the client
        res.json({
            message: aiResponse
        });
    } catch (err) {
        console.error("Google Gemini API Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;