const { Users, Thoughts } = require("../models");

module.exports = {
  //GET all users
  getAllUsers(req, res) {
    Users.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //GET single user
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .populate("friends")
      .populate("thoughts")
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //CREATE new user
  createUser(req, res) {
    Users.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //UPDATE an existing user
  updateUser(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //DELETE an existing user
  deleteUser(req, res) {
    Users.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and their posts deleted successfully." })
      )
      .catch((err) => res.status(500).json(err));
  },

  //ADD a friend
  addFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(["Friend added successfully", user])
      )
      .catch((err) => res.status(500).json(err));
  },

  //DELETE a friend
  deleteFriend(req, res) {
    Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(["Friend deleted successfully", user])
      )
      .catch((err) => res.status(500).json(err));
  },
};
