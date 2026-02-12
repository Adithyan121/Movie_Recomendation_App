import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const FAQPage = () => {
    return (
        <div className="faq-page">
            <SEO
                title="FAQ - Frequently Asked Questions"
                description="Find answers to common questions about Uncover Cinema, movie recommendations, and how to use our platform."
                url="https://recomendation-movie.netlify.app/faq"
            />
            <Navbar />
            <div style={{ paddingTop: '100px', minHeight: 'calc(100vh - 200px)', paddingBottom: '40px' }}>
                <FAQ />
            </div>
            <Footer />
        </div>
    );
};

export default FAQPage;
