import React, { useState, useEffect } from 'react';

const NewsDashboard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${api}`
        );
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <section className="container mx-auto p-4 mt-[8vh]">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Latest News</h1>
        <p className="text-center text-gray-500 mt-2">
          Stay updated with the latest {category} news.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Skeleton loaders with shimmer effect
          Array.from({ length: 8 }).map((_, index) => (
            <article
              key={index}
              className="border p-4 rounded-lg shadow-md bg-white animate-pulse"
            >
              <div className="skeleton w-full h-48 bg-gray-300 rounded-md mb-4"></div>
              <div className="skeleton w-3/4 h-6 bg-gray-300 mb-2"></div>
              <div className="skeleton w-full h-4 bg-gray-300 mb-2"></div>
              <div className="skeleton w-1/2 h-4 bg-gray-300"></div>
            </article>
          ))
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <article
              key={index}
              className="border rounded-lg shadow-lg bg-white overflow-hidden transform hover:-translate-y-2 transition-transform duration-200"
            >
              <div className="relative">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/300')}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300"></div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-4">
                  <h2 className="text-lg font-bold">
                    {truncateText(article.title, 50)}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  {truncateText(article.description, 100)}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read more
                </a>
              </div>
            </article>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No articles available.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsDashboard;
