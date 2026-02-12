import React, { useState } from "react";
import "../css/faq.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
    {
        question: "What is Uncover Cinema?",
        answer: "Uncover Cinema is a movie recommendation app that helps you discover trending, upcoming, and top-rated movies. You can also filter movies based on your mood and genre preferences."
    },
    {
        question: "Is Uncover Cinema free to use?",
        answer: "Yes, Uncover Cinema is completely free to use. You can browse movie details, watch trailers, and check where to stream without any cost."
    },
    {
        question: "Can I watch movies directly on Uncover Cinema?",
        answer: "No, Uncover Cinema is a discovery platform. We provide information on where to watch movies (e.g., Netflix, Amazon Prime) but do not host the movies themselves."
    },
    {
        question: "How is the movie data sourced?",
        answer: "We use the TMDB (The Movie Database) API to fetch accurate and up-to-date information about movies, cast, and ratings."
    },
    {
        question: "Who built Uncover Cinema?",
        answer: (
            <span>
                Uncover Cinema was built by{" "}
                <a href="https://adithyan-phi.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary-color)", textDecoration: "underline" }}>
                    Adithyan G
                </a>. It's designed to showcase advanced React development and API integration skills.
            </span>
        )
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-container">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? "active" : ""}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <h3>{item.question}</h3>
                            <span className="faq-icon">
                                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </div>
                        <div className="faq-answer">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
