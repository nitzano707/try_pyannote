const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const token = "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"; // החלף בטוקן Hugging Face שלך
  const apiUrl = "https://api-inference.huggingface.co/models/pyannote/speaker-diarization";

  try {
    const audioBuffer = Buffer.from(event.body, "base64");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
      },
      body: audioBuffer,
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      return {
        statusCode: response.status,
        body: errorDetails,
      };
    }

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};