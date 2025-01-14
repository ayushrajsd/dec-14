const router = require("express").Router();
const Theatre = require("../models/theatreModel");

router.post("/add-theatre", async (req, res, next) => {
  try {
    console.log("adding theatre", req.body);
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    // if(process.env.NODE_ENV === "production"){
    //     console.log("Theatre added successfully
    // }else{
    //     console.log("Theatre added successfully", newTheatre);
    // }
    res.send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
    // next(err)
  }
});
// update theatre

router.put("/update-theatre/", async (req, res) => {
  try {
    const theatre = await Theatre.findById(req.body.theatreId);
    if (!theatre) {
      return res.status(404).json({ success: false, msg: "Theatre not found" });
    }
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    // const theatre = await Theatre.findByIdAndUpdate(req.body.theatreId, req.body,{new:true})
    // if(!theatre){
    //     return res.status(404).json({success:false,msg: "Theatre not found"})
    // }
    res.send({
      success: true,
      message: "Theatre updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// delete a theatre

router.delete("/delete-theatre/:theatreId", async (req, res) => {
  try {
    console.log("deleting theatre", req.params.theatreId);
    await Theatre.findByIdAndDelete(req.params.theatreId);
    res.send({ success: true, message: "Theatre deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// get all theatres for Admin
router.get("/get-all-theatres", async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");
    res.send({ success: true, theatres: allTheatres, data: allTheatres });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// get all theatres for a specific owner
router.get("/get-all-theatres-by-owner/:ownerId", async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({ success: true, theatres: allTheatres, data: allTheatres });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
