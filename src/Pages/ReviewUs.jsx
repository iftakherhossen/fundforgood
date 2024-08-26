import React, { useState } from 'react';
import { useData } from '../hooks';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Notification } from '../components';

const ReviewUs = () => {
    const { loggedInUser } = useData();
    const fullName = loggedInUser?.user ? `${loggedInUser.user.first_name} ${loggedInUser.user.last_name}` : '';
    const [isLoading, setIsLoading] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    const [reviewData, setReviewData] = useState({
        name: fullName,
        review: "",
        ratings: ""
    });

    const handleOnChange = (e) => {
        const { id, value } = e.target;

        setReviewData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleReviewUs = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(`http://127.0.0.1:8000/api/reviews/list/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData),
        })
            .then((res) => res.json())
            .then(() => {
                setReviewSuccess(true);
                Swal.fire({
                    title: "Thank You!",
                    text: "We appreciate your support and look forward to providing excellent service. Stay tuned for more!",
                    icon: "success",
                    confirmButtonColor: "#425F57",
                });
                setReviewData({
                    name: fullName,
                    review: "",
                    ratings: ""
                });
                setIsLoading(false);
            })
            .catch(() => {
                toast.error("Failed to submit review");
                setIsLoading(false);
            });
            setTimeout(() => setReviewSuccess(false), 15000);
    };

    return (
        <section className="max-w-6xl mx-auto py-5 flex flex-col gap-5">
            <div className="py-14 flex flex-col gap-5">
                <div className="flex justify-center items-center px-5 mb-5">
                    <h3 className="w-[90%] mx-auto text-3xl sm:text-4xl font-bold text-[#425F57] tracking-wide text-center">Review FundForGood</h3>
                </div>
                <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 sm:rounded-lg sm:border sm:border-gray-200 shadow-sm-light">
                    <form id="review-form" className="flex flex-col gap-6" onSubmit={handleReviewUs}>
                        <div>
                            <label htmlFor="name" className="block mb-2.5 text-lg font-medium text-gray-900">Name</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-100 text-gray-900 text-lg font-medium rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5" value={reviewData.name} readOnly required />
                        </div>
                        <div>
                            <label htmlFor="review" className="block mb-2.5 text-lg font-medium text-gray-900">Review</label>
                            <textarea id="review" className="bg-gray-50 border border-gray-100 text-gray-900 text-lg font-medium rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5 h-36 resize-none" placeholder="Write your review here..." value={reviewData.review} onChange={handleOnChange} required />
                        </div>
                        <div>
                            <label htmlFor="ratings" className="block mb-2.5 text-lg font-medium text-gray-900">Ratings</label>
                            <select id="ratings" className="bg-gray-50 border border-gray-100 text-gray-900 text-lg font-medium rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5 cursor-pointer" value={reviewData.ratings} onChange={handleOnChange} required>
                                <option value="" disabled>Choose a star</option>
                                <option value="⭐">⭐</option>
                                <option value="⭐⭐">⭐⭐</option>
                                <option value="⭐⭐⭐">⭐⭐⭐</option>
                                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="bg-[#425F57] disabled:hover:bg-gray-50 text-white disabled:hover:text-gray-600 border border-gray-200 text-xl font-semibold rounded-lg focus:ring-0 focus:border-gray-300 block w-full px-5 py-2.5 disabled:cursor-not-allowed disabled:animate-pulse" disabled={isLoading === true ? true : false}>{isLoading ? "Loading..." : "Submit"}</button>
                        </div>
                    </form>                
                </div>   
                {reviewSuccess && <div className="w-full max-w-2xl mx-auto px-6 sm:px-0 flex flex-col">
                    <Notification success={true} context="review" />
                </div>}
            </div>
        </section>
    );
};

export default ReviewUs;