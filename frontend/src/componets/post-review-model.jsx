import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useGetReviewsByUserIdQuery,
  usePostReviewMutation,
} from "../redux/features/reviews-slice";
import toast from "react-hot-toast";

const StarRating = ({ rating, setRating }) => {
  return (
    <div style={{ margin: "4px" }} className="flex items-center gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          className="cursor-pointer text-yellow-500 text-xl"
          style={{ marginRight: "5px" }}
        >
          {rating >= star ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};

const PostReviewModel = ({ setShowModel, showModel }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useGetReviewsByUserIdQuery(id, { skip: !id });
  const [postReview, { isLoading }] = usePostReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      return toast.error("Please select a rating.");
    }
    if (!comment.trim()) {
      return toast.error("Please enter a review.");
    }

    const newComment = {
      comment,
      rating,
      userId: user?._id,
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      toast.success("Review Posted Successfully");
      s;
      setShowModel(false);
      setRating(0);
      setComment("");
      refetch();
    } catch (error) {
      toast.error("Error Posting Review");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-40 ${
        showModel ? "block" : "hidden"
      }`}
      style={{ padding: "20px" }}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-96 z-50"
        style={{
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ margin: "4px" }} className="text-xl font-semibold mb-4">
          Post A Review
        </h2>

        <StarRating rating={rating} setRating={setRating} />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md focus:outline-none"
          style={{ margin: "12px 0px", padding: "5px 10px" }}
          placeholder="Write your review..."
        ></textarea>

        <div className="flex justify-end gap-3" style={{ marginTop: "12px" }}>
          <button
            onClick={() => setShowModel(false)}
            className="border rounded-md bg-gray-200 hover:bg-gray-300"
            style={{ padding: "10px 16px", borderRadius: "8px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            style={{ padding: "10px 16px", borderRadius: "8px" }}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostReviewModel;
