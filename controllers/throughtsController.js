const { Users, Thoughts } = require("../models");

module.exports = {
  //GET all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //GET single thought
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-_v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //POST a new thought
  creatThought(req, res) {
    Thoughts.create(req.body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user found." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //PUT to update a thought
  updateOneThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //DELETE a thought
  deleteUserThought(req, res) {
    Thoughts.findByIdAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found" })
          : Users.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user found for the thought deleted" })
          : res.json({ message: "Thought deleted and user updated" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //REACTION related controllers
  //POST a reaction to a single thought
  reactionCreate(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.json(500).json(err));
  },

  //DELETE a reaction
  reactionDelete(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
