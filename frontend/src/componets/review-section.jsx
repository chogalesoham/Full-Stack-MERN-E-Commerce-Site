import React, { useState } from "react";
import commentIcon from "../assets/avatar.png";
import { formatDate } from "../utils/formate-date";
import RatingStar from "./rating-star";
import PostReviewModel from "./post-review-model";

const ReviewSection = ({ productReview, refetchProduct }) => {
  // Accept the refetchProduct prop
  const [showModel, setShowModel] = useState(false);
  console.log(productReview);

  return (
    <div style={{ margin: "30px 60px" }} className=" bg-white">
      <div>
        {productReview.length > 0 ? (
          <div>
            <h3 className=" text-lg font-medium">
              All Review For this Product
            </h3>
            <div style={{ marginTop: "10px" }}>
              {productReview.map((review, index) => (
                <div key={index}>
                  <div className=" flex gap-4 items-center">
                    <img src={commentIcon} alt="" className=" size-14" />
                    <div className=" space-y-1">
                      <p className=" text-lg font-medium underline-offset-4 text-blue-400">
                        {review?.userId?.username}
                      </p>
                      <p className=" text-[12px] italic">
                        {formatDate(review?.updatedAt)}
                      </p>
                      <div>
                        <RatingStar ratings={review?.rating} />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ marginTop: "20px", padding: "20px" }}
                    className=" text-gray-600 border border-gray-400 rounded-lg"
                  >
                    <p className=" md:w-4/5">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p> No Reviews Yet </p>
        )}
      </div>

      {/* Add Review Button */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={() => setShowModel(!showModel)}
          style={{ padding: "10px 15px" }}
          className=" bg-red-600 text-white rounded-md"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      {showModel && (
        <PostReviewModel
          showModel={showModel}
          setShowModel={setShowModel}
          refetchProduct={refetchProduct} // Pass refetchProduct to the modal
        />
      )}
    </div>
  );
};

export default ReviewSection;
