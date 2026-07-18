import mongoose from "mongoose";

const Counter = mongoose.connection.useDb("Counter").model(
  "Counter",
  new mongoose.Schema({
    _id: String,
    sequence_value: Number,
  }),
);

export async function getNextSequence(name: "RoomId" | "UserId") {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { sequence_value: 1 } },
    {
      new: true,
      upsert: true,
    },
  );

  return counter.sequence_value;
}
