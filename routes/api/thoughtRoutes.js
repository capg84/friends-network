// api/thoughts

const router = require("express").Router();

const {
  getAllThoughts,
  getSingleThought,
  creatThought,
  updateOneThought,
  deleteUserThought,
  reactionCreate,
  reactionDelete,
} = require("../../controllers/throughtsController");

//GET all thoughts
router.route("/").get(getAllThoughts);

//GET single thought
router.route("/:thoughtId").get(getSingleThought);

//POST a new thought
router.route("/").post(creatThought);

//UPDATE one thought
router.route("/:thoughtId").put(updateOneThought);

//DELETE one thought
router.route("/:thoughtId").delete(deleteUserThought);

//POST reaction to thoughts
router.route("/:thoughtId/reactions").post(reactionCreate);

//DELETE reaction
router.route("/:thoughtsId/reactions/:reactionId").delete(reactionDelete);

module.exports = router;
