'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  ShoppingCart,
  Search,
  Filter,
  Heart,
  Truck,
  Star,
  Check,
  X,
  CreditCard,
  Package
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  fastShipping: boolean;
  description: string;
  features: string[];
  discount?: number;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export default function CommerceShop() {
  const [currentView, setCurrentView] = useState<'browse' | 'product' | 'cart' | 'checkout'>('browse');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [showWishlist, setShowWishlist] = useState(false);

  // Sample product catalog - real shopping items
  const products: Product[] = [
    {
      id: '1',
      name: 'AirPods Pro (2nd Generation)',
      brand: 'Apple',
      price: 249.00,
      originalPrice: 279.00,
      rating: 4.8,
      reviews: 12847,
      image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop',
      category: 'Electronics',
      colors: ['White'],
      sizes: ['One Size'],
      inStock: true,
      fastShipping: true,
      description: 'The new AirPods Pro feature up to 2x more Active Noise Cancellation, Transparency mode, and now Adaptive Audio.',
      features: ['Active Noise Cancellation', 'Transparency Mode', 'Spatial Audio', '6 Hours Listening Time', 'MagSafe Charging'],
      discount: 11
    },
    {
      id: '2',
      name: 'Nike Air Force 1 \'07',
      brand: 'Nike',
      price: 110.00,
      rating: 4.7,
      reviews: 8234,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      category: 'Footwear',
      colors: ['White', 'Black', 'Navy', 'Red'],
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
      inStock: true,
      fastShipping: true,
      description: 'The radiance lives on in the Nike Air Force 1 \'07, the b-ball OG that puts a fresh spin on what you know best.',
      features: ['Real Leather Upper', 'Nike Air Cushioning', 'Rubber Outsole', 'Classic Design', 'Durable Construction']
    },
    {
      id: '3',
      name: 'MacBook Air 13" M2',
      brand: 'Apple',
      price: 1099.00,
      originalPrice: 1199.00,
      rating: 4.9,
      reviews: 5621,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      category: 'Electronics',
      colors: ['Space Gray', 'Silver', 'Gold', 'Midnight'],
      sizes: ['256GB', '512GB', '1TB'],
      inStock: true,
      fastShipping: false,
      description: 'Supercharged by M2 chip. The redesigned MacBook Air is more portable than ever and weighs just 2.7 pounds.',
      features: ['M2 Chip', '13.6" Liquid Retina Display', '18-Hour Battery', '1080p FaceTime Camera', 'MagSafe Charging'],
      discount: 8
    },
    {
      id: '4',
      name: 'Levi\'s 501 Original Jeans',
      brand: 'Levi\'s',
      price: 89.50,
      rating: 4.5,
      reviews: 3456,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      category: 'Clothing',
      colors: ['Dark Blue', 'Light Blue', 'Black', 'Gray'],
      sizes: ['28', '30', '32', '34', '36', '38', '40'],
      inStock: true,
      fastShipping: true,
      description: 'The original. The template. The 501 Original jeans have been the standard for over 140 years.',
      features: ['100% Cotton Denim', 'Straight Fit', 'Button Fly', 'Classic 5-Pocket', 'Iconic Styling']
    },
    {
      id: '5',
      name: 'Samsung 55" QLED 4K TV',
      brand: 'Samsung',
      price: 697.99,
      originalPrice: 899.99,
      rating: 4.6,
      reviews: 2134,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
      category: 'Electronics',
      colors: ['Black'],
      sizes: ['55"', '65"', '75"'],
      inStock: true,
      fastShipping: false,
      description: 'Quantum Dot technology delivers vibrant colors and stunning picture quality with 4K upscaling.',
      features: ['QLED Technology', '4K UHD Resolution', 'HDR10+', 'Smart TV', 'Voice Control'],
      discount: 22
    },
    {
      id: '6',
      name: 'Adidas Ultraboost 23',
      brand: 'Adidas',
      price: 190.00,
      rating: 4.7,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
      category: 'Footwear',
      colors: ['Core Black', 'Cloud White', 'Grey', 'Navy'],
      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
      inStock: true,
      fastShipping: true,
      description: 'Feel the energy return with every step. These running shoes feature responsive BOOST midsole.',
      features: ['BOOST Midsole', 'Primeknit Upper', 'Continental Rubber', 'Energy Return', 'Adaptive Fit']
    }
  ];

  const categories = ['All', 'Electronics', 'Footwear', 'Clothing'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = () => {
    if (!selectedProduct) return;
    
    const cartItem: CartItem = {
      product: selectedProduct,
      quantity,
      selectedColor: selectedColor || selectedProduct.colors[0],
      selectedSize: selectedSize || selectedProduct.sizes[0]
    };
    
    setCart(prev => [...prev, cartItem]);
    setCurrentView('cart');
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map((item, i) => 
      i === index ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setQuantity(1);
    setCurrentView('product');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/commerce" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Commerce
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ShopSmart Live</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>LIVE SHOPPING DEMO</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          {currentView === 'browse' && (
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowWishlist(!showWishlist)}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setCurrentView('cart')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <AnimatePresence mode="wait">
          {/* Browse Products */}
          {currentView === 'browse' && (
            <motion.div
              key="browse"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Shop the Latest Tech & Fashion</h2>
                    <p className="text-blue-100 text-lg">Discover amazing products with unbeatable prices and fast shipping</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">Free Shipping</div>
                    <div className="text-blue-100">on orders over $75</div>
                  </div>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="font-semibold text-gray-900">Categories:</h3>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => openProduct(product)}
                  >
                    <div className="relative">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      {product.discount && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                          -{product.discount}%
                        </div>
                      )}
                      {product.fastShipping && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center">
                          <Truck className="w-3 h-3 mr-1" />
                          Fast
                        </div>
                      )}
                      <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews.toLocaleString()})</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openProduct(product);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Product Detail */}
          {currentView === 'product' && selectedProduct && (
            <motion.div
              key="product"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button 
                onClick={() => setCurrentView('browse')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Shopping
              </button>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="relative">
                    <Image 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      width={600}
                      height={600}
                      className="w-full rounded-xl"
                    />
                    {selectedProduct.discount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                        -{selectedProduct.discount}% OFF
                      </div>
                    )}
                  </div>
                  
                  {/* Thumbnail gallery would go here */}
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer">
                        <Image 
                          src={selectedProduct.image} 
                          alt=""
                          width={150}
                          height={150}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="text-blue-600 font-medium text-sm mb-2">{selectedProduct.brand}</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">({selectedProduct.reviews.toLocaleString()} reviews)</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-4xl font-bold text-gray-900">{formatPrice(selectedProduct.price)}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-2xl text-gray-500 line-through">{formatPrice(selectedProduct.originalPrice)}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 leading-relaxed mb-6">{selectedProduct.description}</p>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Color Selection */}
                  {selectedProduct.colors.length > 1 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                      <div className="flex space-x-3">
                        {selectedProduct.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 border rounded-lg transition-colors ${
                              selectedColor === color 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  {selectedProduct.sizes.length > 1 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedProduct.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-3 border rounded-lg transition-colors ${
                              selectedSize === size 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="space-y-4">
                    <button 
                      onClick={addToCart}
                      className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart - {formatPrice(selectedProduct.price * quantity)}
                    </button>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <Truck className="w-4 h-4 mr-2 text-green-600" />
                        <span>Free Shipping</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <Check className="w-4 h-4 mr-2 text-blue-600" />
                        <span>Easy Returns</span>
                      </div>
                      <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                        <Package className="w-4 h-4 mr-2 text-purple-600" />
                        <span>2 Year Warranty</span>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span className="font-medium text-green-800">
                        {selectedProduct.fastShipping ? 'Free 2-day shipping' : 'Free shipping in 5-7 days'}
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-green-700 text-sm">Deliver to Melbourne, VIC • Change location</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Shopping Cart */}
          {currentView === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
                <button 
                  onClick={() => setCurrentView('browse')}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some amazing products to get started!</p>
                  <button 
                    onClick={() => setCurrentView('browse')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2 space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start space-x-4">
                          <Image 
                            src={item.product.image} 
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.product.brand}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Color: {item.selectedColor}</span>
                              <span>Size: {item.selectedSize}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                className="p-1 hover:bg-gray-50"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-1 font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="p-1 hover:bg-gray-50"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{formatPrice(item.product.price * item.quantity)}</div>
                              <div className="text-sm text-gray-600">{formatPrice(item.product.price)} each</div>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(index)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                          <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-green-600 font-medium">FREE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="font-medium">{formatPrice(getTotalPrice() * 0.08)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-bold text-blue-600">{formatPrice(getTotalPrice() * 1.08)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setCurrentView('checkout')}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Checkout
                      </button>
                      
                      <div className="mt-4 text-center">
                        <div className="flex items-center justify-center text-sm text-gray-600">
                          <Check className="w-4 h-4 mr-1" />
                          Secure checkout with 256-bit SSL encryption
                        </div>
                      </div>
                    </div>

                    {/* Promo Section */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                      <div className="flex items-center mb-3">
                        <Check className="w-6 h-6 mr-2" />
                        <span className="font-semibold">Special Offer!</span>
                      </div>
                      <p className="text-sm mb-4">Add $25 more to get free expedited shipping</p>
                      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                        Shop More
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Checkout */}
          {currentView === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center py-16">
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Complete!</h2>
                <p className="text-gray-600 mb-6">Thank you for shopping with ShopSmart Live</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto mb-8">
                  <div className="text-sm text-green-800">
                    <div className="font-semibold mb-2">Order #SS-12345678</div>
                    <div>Total: {formatPrice(getTotalPrice() * 1.08)}</div>
                    <div>Estimated delivery: 2-3 business days</div>
                  </div>
                </div>
                <div className="space-x-4">
                  <button 
                    onClick={() => {
                      setCart([]);
                      setCurrentView('browse');
                    }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                    Track Order
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 