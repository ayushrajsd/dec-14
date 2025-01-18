const {
  addShow,
  deleteShow,
  updateShow,
  getAllShowsByTheatre,
  getAllTheatersByMovie,
  getShowById,
} = require("../controllers/showController");

const router = require("express").Router();

router.post("/addShow", addShow);
router.delete("/deleteShow/:showId", deleteShow);
router.patch("/updateShow", updateShow);
router.post("/getAllShowsByTheatre", getAllShowsByTheatre);
router.post("/getAllTheatersByMovie", getAllTheatersByMovie);
router.post("/getShowById", getShowById);

module.exports = router;
