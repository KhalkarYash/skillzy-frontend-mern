import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AddCourse = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageLink: "",
    price: "",
    author: ""
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageLink: "",
    price: "",
    author: "",
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("This page is only accessible to administrators");
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      imageLink: "",
      price: "",
      author: ""
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters long";
      isValid = false;
    }

    if (!formData.imageLink.trim()) {
      newErrors.imageLink = "Image URL is required";
      isValid = false;
    } else if (!formData.imageLink.match(/^https?:\/\/.+\/.+$/)) {
      newErrors.imageLink = "Please enter a valid image URL";
      isValid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
      isValid = false;
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
      isValid = false;
    } else if (formData.author.length < 3) {
      newErrors.author = "Author name must be at least 3 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/admin/add-course`, formData, {
        withCredentials: true,
      });
      toast.success("Course created successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Course creation failed:", error);
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[var(--primary-blue)] mb-8">
            Add New Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Course Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter course title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-gray-700 font-medium mb-2"
              >
                Tutor Name
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter author name"
              />
              {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[100px] overflow-y-auto ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter course description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label
                htmlFor="imageLink"
                className="block text-gray-700 font-medium mb-2"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageLink"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.imageLink ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter image URL"
              />
              {errors.imageLink && <p className="text-red-500 text-sm mt-1">{errors.imageLink}</p>}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Price (₹)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter course price"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--primary-blue)] text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
            >
              {isLoading ? "Creating Course..." : "Create Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
