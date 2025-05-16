export const categories = [
    {
        _id: "cat1",
        name: "Electronics",
        description: "Electronic devices and accessories",
        image: "/images/electronics.png",
        isActive: true,
        categoryId: null // Parent category
    },
    {
        _id: "cat2",
        name: "Smartphones",
        description: "Mobile phones and accessories",
        image: "/images/iPhone13.png",
        isActive: true,
        categoryId: {
            _id: "cat1",
            name: "Electronics",
            description: "Electronic devices and accessories",
            image: "/images/macbook.png",
            isActive: true,
            categoryId: null
        }
    },
    {
        _id: "cat3",
        name: "Laptops",
        description: "Laptops and accessories",
        image: "/images/electronics.png",
        isActive: true,
        categoryId: {
            _id: "cat1",
            name: "Electronics",
            description: "Electronic devices and accessories",
            image: "/images/macbook.png",
            isActive: true,
            categoryId: null
        }
    },
    {
        _id: "cat4",
        name: "Fashion",
        description: "Clothing and accessories",
        image: "/images/clothing.png",
        isActive: true,
        categoryId: null
    },
    {
        _id: "cat5",
        name: "Men's Clothing",
        description: "Men's fashion and accessories",
        image: "/images/clothing.png",
        isActive: true,
        categoryId: {
            _id: "cat4",
            name: "Fashion",
            description: "Clothing and accessories",
            image: "/images/clothing.png",
            isActive: true,
            categoryId: null
        }
    },
    {
        _id: "cat6",
        name: "Women's Clothing",
        description: "Women's fashion and accessories",
        image: "/images/clothing.png",
        isActive: true,
        categoryId: {
            _id: "cat4",
            name: "Fashion",
            description: "Clothing and accessories",
            image: "/images/clothing.png",
            isActive: true,
            categoryId: null
        }
    }
];

export const getCategoryById = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    if (category) {
        return {
            success: true,
            category: category
        };
    }
    return {
        success: false,
        error: "Category not found"
    };
};

export const getCategoriesByParent = (parentId) => {
    if (!parentId) {
        // Get root categories
        return categories.filter(cat => !cat.categoryId);
    }
    // Get child categories
    return categories.filter(cat => cat.categoryId && cat.categoryId._id === parentId);
};

export const listCategories = () => {
    return {
        success: true,
        categories: categories
    };
}; 