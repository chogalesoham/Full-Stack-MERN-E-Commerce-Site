import React, { useState } from "react";

import commentIcon from "../assets/avatar.png";
import { formatDate } from "../utils/formate-date";
import RatingStar from "./rating-star";
import PostReviewModel from "./post-review-model";

const ReviewSection = ({ productReview }) => {
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
                <div>
                  <div className=" flex gap-4 items-center">
                    <img src={commentIcon} alt="" className=" size-14" />
                    <div className=" space-y-1">
                      <p className=" text-lg font-medium underline-offset-4 text-blue-400">
                        {review?.userId?.username}
                      </p>
                      <p className=" text-[12px] italic">
                        {formatDate(review?.updatedAt)}
                      </p>
                      <p>
                        <RatingStar ratings={review?.rating} />
                      </p>
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
          <p> Not Review Yet </p>
        )}
      </div>

      {/* add review button */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={() => setShowModel(!showModel)}
          style={{ padding: "10px 15px" }}
          className=" bg-red-600 text-white rounded-md"
        >
          Add a Review
        </button>
      </div>

      {/* review model */}
      {showModel && (
        <PostReviewModel showModel={showModel} setShowModel={setShowModel} />
      )}
    </div>
  );
};

export default ReviewSection;
