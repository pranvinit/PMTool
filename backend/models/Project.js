const { Schema, model, Types } = require("mongoose");

const ProjectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: Types.ObjectId,
    ref: "Client",
  },
});

module.exports = model("Project", ProjectSchema);
