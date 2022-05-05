const mongoose = require("mongoose");

// construct schema
const memberSchema = mongoose.Schema({
  username: { type: String, required: true },
  studentID: { type: String, required: true },
  password: { type: String, required: true },
});

// create model
const Member = mongoose.model("Member", memberSchema); // collection name : members

// export module.exports object
module.exports = Member;
