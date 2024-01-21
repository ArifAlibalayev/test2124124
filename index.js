import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { Schema } from "mongoose";
const app = express();
app.use(express.json());
app.use(cors());

const imageSchema = new Schema({
  name: String,
  image: String,
  category: String,
  price: Number,
});
const ImageModel = mongoose.model("ImageModel", imageSchema);

app.get("/", async (req, res) => {
  try {
    const product = await ImageModel.find({});
    res.json(product);
  } catch (error) {
    res.send(error.message);
  }
});
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ImageModel.findById(id);
    res.json(product);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const { name, image, category, price } = req.body;
    const newProduct = new ImageModel({ name, image, category, price });
    await newProduct.save()
    res.json(newProduct);
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, category, price } = req.body;
        const product = await ImageModel.findByIdAndUpdate(id, { name, image, category, price });
        res.json(product);
      } catch (error) {
        res.send(error.message);
      }
});

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ImageModel.findByIdAndDelete(id);
        res.json(product);
      } catch (error) {
        res.send(error.message);
      }
});

mongoose
  .connect(process.env.DB_SECRET_KEY)
  .then(() => console.log("Connected!"))
  .catch(() => console.log("not Connected!"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
