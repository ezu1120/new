import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    //   Default: {} → If not provided, it defaults to an empty object (no items in the cart initially).
    cartItems: { type: Object, default: {} },
    //   minimize: false → Ensures that empty objects ({}) are not automatically removed from the database.
  },
  { minimize: false }
);
// If "User" does not already exist in mongoose.models, this part creates a new model
const User = mongoose.models.user || mongoose.model('user', userSchema);
export default User;
