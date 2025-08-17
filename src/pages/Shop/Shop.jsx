import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                // Keep original order
                break;
        }

        setFilteredProducts(filtered);
    }, [products, selectedCategory, sortBy]);

    const categories = ['all', ...new Set(products.map(product => product.category))];

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="error">
                {error}
                <button
                    className="btn"
                    onClick={() => window.location.reload()}
                    style={{ marginTop: '1rem' }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="shop-page">
            <div className="shop-header">
                <h1>Our Products</h1>
                <p>Discover amazing products from our collection</p>
            </div>

            <div className="shop-filters">
                <div className="filter-group">
                    <label htmlFor="category-filter">Category:</label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' :
                                    category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sort-filter">Sort by:</label>
                    <select
                        id="sort-filter"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="default">Default</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                        <option value="rating">Rating (Highest First)</option>
                    </select>
                </div>
            </div>

            <div className="products-info">
                <span className="products-count">
                    Showing {filteredProducts.length} of {products.length} products
                </span>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-products">
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to see more products.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;