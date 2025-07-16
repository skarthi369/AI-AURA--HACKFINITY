
const express = require("express");
const app = express();
app.use(express.json());

const { getCropsForSoil } = require("./agri_utils");

app.post("/webhook", (req, res) => {
  const intent = req.body.intent;
  const params = req.body.parameters;

  if (intent === "GetCropSuggestion") {
    const soilType = params.soil_type;
    const crops = getCropsForSoil(soilType);
    return res.json({ fulfillmentText: `For ${soilType}, you can grow: ${crops.join(", ")}` });
  }

  return res.json({ fulfillmentText: "Sorry, I didn't get that." });
});

app.listen(3000, () => console.log("Agent running on port 3000"));
