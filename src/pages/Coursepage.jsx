import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isBought, setIsBought] = useState(false);
  const myCourses = useSelector((store) => store.myCourses);

  useEffect(() => {
    const found = myCourses.filter((c) => c._id === courseId);
    if (found) {
      setIsBought(true);
    }
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/courses/${courseId}`, {
          withCredentials: true,
        });
        console.log(response.data);
        setCourse(response.data.course);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnrollment = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      setEnrolling(true);
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { courseId, price: course.price },
        { withCredentials: true }
      );
      if (order.data.success) {
        navigate("/my-courses");
      }
      const {
        userId,
        courseId,
        orderId,
        amount,
        currency,
        receipt,
        status,
        notes,
      } = order.data;

      const options = {
        userId,
        courseId,
        order_id: orderId,
        amount,
        currency,
        receipt,
        status,
        notes,
        prefill: {
          name: user.name,
          contact: user.mobile,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyCoursePurchase,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll in the course. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const verifyCoursePurchase = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.success) {
      const res = await axios.get(BASE_URL + "/user/my-courses", {
        withCredentials: true,
      });
      dispatch(res.data.courses);
      navigate("/my-courses");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-[40vh] bg-gradient-to-r from-[var(--primary-blue)] to-blue-600">
            <img
              src={course.imageLink}
              alt={course.title}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl mb-2">by {course.author}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-[var(--primary-blue)] mb-4">
                  Course Description
                </h2>
                <p className="text-gray-700 mb-6">{course.description}</p>
                <span className="font-medium">Duration:</span>{" "}
                {course.duration || "Self-paced"}
              </div>
              {user.role === "user" && !isBought && (
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-[var(--primary-blue)] mb-4">
                      ₹{course.price}
                    </div>
                    <button
                      className="w-full bg-[var(--primary-blue)] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
                      onClick={() => handleEnrollment()}
                      disabled={enrolling}
                    >
                      {enrolling ? "Processing..." : "Buy Now"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
