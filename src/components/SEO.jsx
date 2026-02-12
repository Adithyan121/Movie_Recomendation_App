import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, schema }) => {
    const siteTitle = "Uncover Cinema - Discover Your Next Watch";
    const defaultDescription = "Discover your next favorite movie on Uncover Cinema. Browse trending, upcoming, and top-rated films. Filter by mood, genre, and year to find exactly what to watch tonight.";
    const defaultKeywords = "movies, Uncover Cinema, movie recommendations, what to watch, best movies 2026, find movies, movie database, film reviews, trending movies";
    const siteUrl = "https://recomendation-movie.netlify.app/";
    const defaultImage = "https://recomendation-movie.netlify.app/og-image.jpg"; // Placeholder or actual OG image

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={url || siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || siteUrl} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url || siteUrl} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Structured Data (Schema.org) */}
            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
        </Helmet>
    );
};

export default SEO;
