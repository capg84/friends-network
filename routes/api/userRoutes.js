// api/users

const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/usersController");

//GET all users
router.route("/").get(getAllUsers);

//GET single user
router.route("/:userId").get(getSingleUser);

//CREATE a new user
router.route("/").post(createUser);

//UPDATE an existing user
router.route("/:userId").put(updateUser);

//DELETE an existing user
router.route("/:userId").delete(deleteUser);

//ADD a new friend
router.route("/userId/friends/:friendId").post(addFriend);

//DELETE an existing friend
router.route("/userId/friends/:friendId").delete(deleteFriend);
