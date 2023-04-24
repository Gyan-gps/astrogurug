const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://astrogurugb:astrogurugb@cluster0.3tpytgu.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connected to MongoDb successfully");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });
