export const cartItems = [
    {
        _id: "1",
        product: {
            _id: "1",
            name: "iPhone 13 Pro Max",
            price: 999,
            image: "https://example.com/iphone1.jpg"
        },
        quantity: 1
    },
    {
        _id: "2",
        product: {
            _id: "2",
            name: "Samsung Galaxy S21",
            price: 899,
            image: "https://example.com/samsung1.jpg"
        },
        quantity: 2
    }
];

export const getCartItems = () => {
    return cartItems;
};

export const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.product._id === product._id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            _id: Date.now().toString(),
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0]
            },
            quantity: 1
        });
    }
    
    return cartItems;
};

export const removeFromCart = (productId) => {
    const index = cartItems.findIndex(item => item.product._id === productId);
    if (index > -1) {
        cartItems.splice(index, 1);
    }
    return cartItems;
};

export const updateCartItemQuantity = (productId, quantity) => {
    const item = cartItems.find(item => item.product._id === productId);
    if (item) {
        item.quantity = quantity;
    }
    return cartItems;
}; 