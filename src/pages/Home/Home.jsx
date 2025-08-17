import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const features = [
        {
            icon: '🛒',
            title: 'Easy Shopping',
            description: 'Browse through our wide selection of quality products with ease.'
        },
        {
            icon: '⚡',
            title: 'Fast Delivery',
            description: 'Get your orders delivered quickly and safely to your doorstep.'
        },
        {
            icon: '🔒',
            title: 'Secure Payment',
            description: 'Shop with confidence using our secure payment system.'
        }
    ];

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Shop RENNAH</h1>
                    <p className="hero-subtitle">
                        Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
                    </p>
                    <Link to="/shop" className="hero-cta">
                        Start Shopping
                    </Link>
                </div>
                <div className="hero-image">
                    <div className="hero-placeholder">
                        🛍️
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2 className="section-title">Why Choose Shop RENNAH?</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">1000+</div>
                        <div className="stat-label">Products</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">50k+</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">99.9%</div>
                        <div className="stat-label">Uptime</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Support</div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Start Shopping?</h2>
                <p>Join thousands of satisfied customers and discover your new favorite products today.</p>
                <Link to="/shop" className="cta-button">
                    Browse Products
                </Link>
            </section>
        </div>
    );
};

export default Home;