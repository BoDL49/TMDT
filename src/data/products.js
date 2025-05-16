import { getStore } from './stores';

export const products = [
    {
        _id: "1",
        name: "iPhone 13 Pro Max",
        description: "Apple iPhone 13 Pro Max 256GB",
        price: 40001,
        promotionalPrice: 30000,
        category: "Electronics",
        stock: 50,
        rating: 4.5,
        numReviews: 120,
        images: [
            "/images/iphone13.png",
            "/images/iphone13.png"
        ],
        categoryImage: "/images/electronics.png",
        isActive: true,
        isSelling: true,
        storeId: "store1"
    },
    {
        _id: "2",
        name: "Samsung Galaxy S21",
        description: "Samsung Galaxy S21 Ultra 5G",
        price: 40001,
        promotionalPrice: 30000,
        category: "Electronics",
        categoryImage: "/images/electronics.png",
        stock: 30,
        rating: 4.3,
        numReviews: 85,
        images: [
            "/images/samsung.png",
            "/images/samsung.png"
        ],
        isActive: true,
        isSelling: true,
        storeId: "store1"
    },
    {
        _id: "3",
        name: "MacBook Pro M1",
        description: "Apple MacBook Pro with M1 chip",
        price: 40001,
        promotionalPrice: 30000,
        category: "Electronics",
        categoryImage: "/images/electronics.png",
        stock: 20,
        rating: 4.8,
        numReviews: 150,
        images: [
            "/images/macbook.png",
            "/images/macbook.png"
        ],
        isActive: true,
        isSelling: true,
        storeId: "store2"
    },
    {
        _id: "4",
        name: "MacBook Pro M4",
        description: "Apple MacBook Pro with M1 chip",
        price: 40001,
        promotionalPrice: 30000,
        category: "Electronics",
        categoryImage: "/images/electronics.png",
        stock: 20,
        rating: 4.8,
        numReviews: 150,
        images: [
            "/images/macbook.png",
            "/images/macbook.png"
        ],
        isActive: true,
        isSelling: true,
        storeId: "store2"
    },
    {
        _id: "5",
        name: "Samsung Galaxy S24",
        description: "Samsung Galaxy S21 Ultra 5G",
        price: 40001,
        promotionalPrice: 30000,
        category: "Electronics",
        categoryImage: "/images/electronics.png",
        stock: 30,
        rating: 4.3,
        numReviews: 85,
        images: [
            "/images/samsung.png",
            "/images/samsung.png"
        ],
        isActive: true,
        isSelling: true,
        storeId: "store1"
    },
];

export const getProduct = (productId) => {
    const product = products.find(product => product._id === productId);
    if (product) {
        const store = getStore(product.storeId);
        if (store) {
            product.storeId = store;
        }
    }
    return product;
};

export const listActiveProducts = (filter) => {
    let filteredProducts = [...products];
    
    if (filter.search) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            product.description.toLowerCase().includes(filter.search.toLowerCase())
        );
    }
    
    if (filter.categoryId) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === filter.categoryId
        );
    }
    
    if (filter.minPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= filter.minPrice
        );
    }
    
    if (filter.maxPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price <= filter.maxPrice
        );
    }
    
    if (filter.rating) {
        filteredProducts = filteredProducts.filter(product => 
            product.rating >= filter.rating
        );
    }
    
    // Sort
    if (filter.sortBy) {
        filteredProducts.sort((a, b) => {
            if (filter.order === 'desc') {
                return b[filter.sortBy] - a[filter.sortBy];
            }
            return a[filter.sortBy] - b[filter.sortBy];
        });
    }
    
    // Pagination
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
        products: filteredProducts.slice(startIndex, endIndex),
        total: filteredProducts.length
    };
};

export const listSellingProductsByStore = (filter, storeId) => {
    let filteredProducts = products.filter(product => 
        product.storeId === storeId && 
        product.isSelling && 
        product.isActive
    );
    
    if (filter.search) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            product.description.toLowerCase().includes(filter.search.toLowerCase())
        );
    }
    
    if (filter.categoryId) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === filter.categoryId
        );
    }
    
    if (filter.minPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= filter.minPrice
        );
    }
    
    if (filter.maxPrice) {
        filteredProducts = filteredProducts.filter(product => 
            product.price <= filter.maxPrice
        );
    }
    
    if (filter.rating) {
        filteredProducts = filteredProducts.filter(product => 
            product.rating >= filter.rating
        );
    }
    
    // Sort
    if (filter.sortBy) {
        filteredProducts.sort((a, b) => {
            if (filter.order === 'desc') {
                return b[filter.sortBy] - a[filter.sortBy];
            }
            return a[filter.sortBy] - b[filter.sortBy];
        });
    }
    
    // Pagination
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
        products: filteredProducts.slice(startIndex, endIndex),
        size: filteredProducts.length,
        filter: {
            pageCurrent: page,
            pageCount: Math.ceil(filteredProducts.length / limit)
        }
    };
}; 