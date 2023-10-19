const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "User email is required!"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please enter a valid email!'
        },
    },
    password: {
        type: String,
        require: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        default: "https://i.ibb.co/3Mrx6Fg/blank-profile.webp" || 'public/images/users/blank-profile.webp'
    },
    role: {
        type: String,
        default: "user",
    },
    projects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Project' // 'Project' should be the model name of the referenced projects
        }],
        default: []
    },
    tasks: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }],
        default: []
    },
}, { timestamps: true });

const User = mongoose.model("Users", userSchema);

module.exports = User;
