const express = require("express");
require("./Connection");
const User = require("./Model");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("home page");
});
app.get("/users", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.get("/users/:key", async (req, res) => {
  try {
    const data = await User.find({
      $or: [
        { name: { $regex: req.params.key } },
        { address: { $regex: req.params.key } },
        { phone: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
      ],
    });
    if (!data) {
      res.status(404).send({ error: "Result not found" });
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal server error" });
  }
});
app.get("/users/id/:id",async(req,res)=>{
  try {
      const id=req.params.id;
     const data =await User.findOne({id:id});
     if (!data) {
      res.status(404).send({ error: "Result not found" });
    } else {
      res.status(200).send(data);
    } 
  } catch (error) {
      console.log(error);
     res.status(500).send({error:"internal server error"}) 
  }
})
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
    const Student = new User(req.body);
    const newUser = await Student.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    const data = await User.deleteOne({id:id})
    if (!data) {
      res.status(404).send({error:"user not found"});
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.updateOne({id:id},{$set:req.body});
    if (!data) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`listening at the port ${port}`);
});
