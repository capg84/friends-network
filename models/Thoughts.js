const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

//reactions schema (SCHEMA ONLY)
const reactionsSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: [1, "Oops, that's a very tiny thought."],
      maxLength: [
        280,
        "You are thinking too much my friend, make this shorter.",
      ],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("At hh:mm:ss on DD MMM YYYY"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//THOUGHTS schema
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1, "Oops, that's a very tiny thought."],
      maxLength: [
        280,
        "You are thinking too much my friend, make this shorter.",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        dayjs(createdAtVal).format("At hh:mm:ss on DD MMM YYYY"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virutal("reactionsCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
