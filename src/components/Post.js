import mongoose from "mongoose";
import { post } from "../services/service";

likes: [
  {
    type: mongoose.Types.objectId,
    ref: "User",
    unique: true,
  },
];

//Pieces we need:
//

// make a route called like post

router.post("/likes/:postId", isAuthenticated, async (req, res) => {
  try {
    post.findByIdAndUpdate(
      req.params.postId,
      { $push: { likes: req.user.id } },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json(err.message);
  }
});
