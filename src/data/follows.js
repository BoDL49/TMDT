export const follows = [
    {
        _id: "1",
        user: "user1",
        product: "1" // iPhone 13 Pro Max
    },
    {
        _id: "2",
        user: "user2",
        product: "2" // Samsung Galaxy S21
    }
];

export const getNumberOfFollowersForProduct = (productId) => {
    return {
        count: follows.filter(follow => follow.product === productId).length
    };
};

export const checkFollowingProduct = (userId, token, productId) => {
    return {
        success: follows.some(follow => 
            follow.user === userId && follow.product === productId
        )
    };
}; 