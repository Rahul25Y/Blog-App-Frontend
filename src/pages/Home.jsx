import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import BlogCard from "../components/common/BlogCard";
import EmptyState from "../components/common/EmptyState";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector(state => state.blog);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      title: "Share Your Ideas With The World",
      subtitle: "Create, manage and explore amazing technology blogs.",
    },
    {
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      title: "Explore the Frontiers of Tech",
      subtitle: "Read articles about Cloud Computing, AI, Web Development and more.",
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      title: "Join the Developer Community",
      subtitle: "Write technical articles, read guides and interact with creators globally.",
    },
  ];

  // Carousel Auto Play Timer
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex === carouselSlides.length - 1 ? 0 : prevIndex + 1));
    }, 4000);
    return () => clearInterval(slideTimer);
  }, [carouselSlides.length]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const publishedBlogs = blogs.filter((blog) => !blog.draft);

  return (
    <div className="fade-in-el">
      {/* Hero Section Carousel */}
      <section className="mb-5">
        <div className="hero-carousel position-relative" style={{ height: "420px" }}>
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className="position-absolute w-100 h-100 transition-all"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: index === carouselIndex ? 1 : 0,
                visibility: index === carouselIndex ? "visible" : "hidden",
                transition: "opacity 0.8s ease-in-out, visibility 0.8s ease-in-out",
                zIndex: index === carouselIndex ? 1 : 0,
              }}
            >
              <div className="carousel-img-overlay w-100 h-100">
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="d-flex gap-3">
                  <Link
                    to="/create-blog"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   toast("Blog Creation will be implemented in the next task!", { icon: "📝" });
                    // }}
                    className="btn btn-primary-custom d-flex align-items-center gap-2 px-4 py-2"
                  >
                    <FiPlus /> Create Blog
                  </Link>
                  <a
                    href="#latest-blogs"
                    className="btn btn-outline-custom border-white text-white d-flex align-items-center gap-2 px-4 py-2"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Explore Blogs <FiArrowRight />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Dots Indicator */}
          <div
            className="position-absolute start-50 translate-middle-x d-flex gap-2"
            style={{ bottom: "20px", zIndex: 10 }}
          >
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className="btn p-0 rounded-circle"
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: index === carouselIndex ? "var(--primary-blue)" : "rgba(255,255,255,0.4)",
                  border: "none",
                  transition: "background-color 0.2s ease",
                }}
                onClick={() => setCarouselIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section id="latest-blogs" className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: "1.75rem" }}>
              Latest Publications
            </h2>
            <p className="text-muted-custom mb-0" style={{ fontSize: "0.95rem" }}>
              Stay updated with fresh technology ideas.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : publishedBlogs.length === 0 ? (
          <EmptyState 
            title="No Blogs Available Yet" 
            subtitle="It seems there are no blogs in the database right now. Be the first to start sharing your technical knowledge!" 
          />
        ) : (
          <div className="row g-4">
            {publishedBlogs.map((blog) => (
              <div key={blog._id} className="col-12 col-md-6 col-xl-4">
                <BlogCard blog={blog} isOwner={false} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
