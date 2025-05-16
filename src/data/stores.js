export const stores = [
    {
        _id: "store1",
        name: "Apple Store",
        description: "Official Apple products store - Your one-stop shop for all Apple devices, accessories, and services",
        rating: 4.8,
        point: 1000,
        numReviews: 500,
        image: "/images/appleStore.png",
        isActive: true,
        address: "123 Apple Street, Cupertino, CA",
        phone: "+1 (800) MY-APPLE",
        email: "support@apple.com",
        website: "www.apple.com",
        openingHours: "9:00 AM - 9:00 PM",
        categories: ["Electronics", "Smartphones", "Laptops"],
        featured: true,
        followers: 1000000,
        joinedDate: "2020-01-01"
    },
    {
        _id: "store2",
        name: "Samsung Store",
        description: "Official Samsung products store - Discover the latest Samsung smartphones, tablets, and smart devices",
        rating: 4.6,
        point: 800,
        numReviews: 400,
        image: "/images/samsungStore.jpg",
        isActive: true,
        address: "456 Samsung Road, Seoul, Korea",
        phone: "+82 2-1234-5678",
        email: "support@samsung.com",
        website: "www.samsung.com",
        openingHours: "10:00 AM - 8:00 PM",
        categories: ["Electronics", "Smartphones", "TVs"],
        featured: true,
        followers: 800000,
        joinedDate: "2020-02-01"
    },
    {
        _id: "store3",
        name: "Microsoft Store",
        description: "Official Microsoft products store - Get Windows, Office, Surface, Xbox, and more",
        rating: 4.7,
        point: 900,
        numReviews: 450,
        image: "/images/microsoftStore.png",
        isActive: true,
        address: "789 Microsoft Way, Redmond, WA",
        phone: "+1 (800) MICROSOFT",
        email: "support@microsoft.com",
        website: "www.microsoft.com",
        openingHours: "9:00 AM - 8:00 PM",
        categories: ["Electronics", "Software", "Gaming"],
        featured: true,
        followers: 900000,
        joinedDate: "2020-03-01"
    },
    {
        _id: "store4",
        name: "Nike Store",
        description: "Official Nike store - Just Do It with the latest Nike shoes, clothing, and accessories",
        rating: 4.5,
        point: 750,
        numReviews: 350,
        image: "/images/samsungStore.jpg",
        isActive: true,
        address: "321 Nike Avenue, Beaverton, OR",
        phone: "+1 (800) NIKE-USA",
        email: "support@nike.com",
        website: "www.nike.com",
        openingHours: "10:00 AM - 9:00 PM",
        categories: ["Fashion", "Sports", "Shoes"],
        featured: false,
        followers: 700000,
        joinedDate: "2020-04-01"
    },
    {
        _id: "store5",
        name: "Adidas Store",
        description: "Official Adidas store - Impossible is Nothing with Adidas sports gear and lifestyle products",
        rating: 4.4,
        point: 700,
        numReviews: 300,
        image: "/images/samsungStore.jpg",
        isActive: true,
        address: "654 Adidas Street, Herzogenaurach, Germany",
        phone: "+49 9132 84-0",
        email: "support@adidas.com",
        website: "www.adidas.com",
        openingHours: "9:00 AM - 8:00 PM",
        categories: ["Fashion", "Sports", "Shoes"],
        featured: false,
        followers: 600000,
        joinedDate: "2020-05-01"
    }
];

export const getStore = (storeId) => {
    const store = stores.find(store => store._id === storeId);
    if (store) {
        return {
            success: true,
            store: store
        };
    }
    return {
        success: false,
        error: "Store not found"
    };
};

export const getlistStores = (filter) => {
    let filteredStores = [...stores];
    
    // Search filter
    if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        filteredStores = filteredStores.filter(store => 
            store.name.toLowerCase().includes(searchTerm) ||
            store.description.toLowerCase().includes(searchTerm) ||
            store.categories.some(cat => cat.toLowerCase().includes(searchTerm))
        );
    }
    
    // Active status filter
    if (filter.isActive) {
        filteredStores = filteredStores.filter(store => 
            store.isActive === (filter.isActive === 'true')
        );
    }

    // Category filter
    if (filter.category) {
        filteredStores = filteredStores.filter(store =>
            store.categories.includes(filter.category)
        );
    }

    // Featured filter
    if (filter.featured) {
        filteredStores = filteredStores.filter(store =>
            store.featured === (filter.featured === 'true')
        );
    }
    
    // Sort
    if (filter.sortBy) {
        filteredStores.sort((a, b) => {
            if (filter.order === 'desc') {
                return b[filter.sortBy] - a[filter.sortBy];
            }
            return a[filter.sortBy] - b[filter.sortBy];
        });
    }
    
    // Secondary sort
    if (filter.sortMoreBy) {
        filteredStores.sort((a, b) => {
            if (filter.order === 'desc') {
                return b[filter.sortMoreBy] - a[filter.sortMoreBy];
            }
            return a[filter.sortMoreBy] - b[filter.sortMoreBy];
        });
    }

    // Rating range filter
    if (filter.minRating) {
        filteredStores = filteredStores.filter(store =>
            store.rating >= Number(filter.minRating)
        );
    }
    if (filter.maxRating) {
        filteredStores = filteredStores.filter(store =>
            store.rating <= Number(filter.maxRating)
        );
    }
    
    // Pagination
    const page = filter.page || 1;
    const limit = filter.limit || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
        stores: filteredStores.slice(startIndex, endIndex),
        total: filteredStores.length,
        pageCurrent: page,
        pageCount: Math.ceil(filteredStores.length / limit)
    };
}; 