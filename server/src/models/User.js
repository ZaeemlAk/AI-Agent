import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const ROLES = Object.freeze({ USER: "USER", SUPPORT_AGENT: "SUPPORT_AGENT", ADMIN: "ADMIN" });
const BCRYPT_ROUNDS = 12;

const userSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true, maxlength: 60 },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
password: { type: String, required: true, select: false }, // hidden from queries by default
role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
isActive: { type: Boolean, default: true },
},
{ timestamps: true }
);

userSchema.pre("save", async function () {
if (!this.isModified("password")) return;
this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
});

userSchema.methods.comparePassword = function (candidate) {
return bcrypt.compare(candidate, this.password);
};

userSchema.set("toJSON", {
transform: (doc, ret) => { delete ret.password; delete ret.__v; return ret; },
});

export default mongoose.model("User", userSchema);