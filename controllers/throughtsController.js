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
};
