export const reviews = [
    {
        _id: "1",
        product: "1", // iPhone 13 Pro Max
        user: {
            _id: "user1",
            name: "John Doe",
            avatar: "/images/user1.png"
        },
        rating: 5,
        comment: "Great product! The camera quality is amazing.",
        createdAt: "2024-03-15T10:00:00.000Z"
    },
    {
        _id: "2",
        product: "1", // iPhone 13 Pro Max
        user: {
            _id: "user2",
            name: "Jane Smith",
            avatar: "/images/user2.png"
        },
        rating: 4,
        comment: "Good phone but a bit expensive.",
        createdAt: "2024-03-14T15:30:00.000Z"
    },
    {
        _id: "3",
        product: "2", // Samsung Galaxy S21
        user: {
            _id: "user3",
            name: "Mike Johnson",
            avatar: "/images/user3.png"
        },
        rating: 5,
        comment: "Best Android phone I've ever used!",
        createdAt: "2024-03-13T09:15:00.000Z"
    }
];

export const getReviewsByProduct = (productId) => {
    return reviews.filter(review => review.product === productId);
}; 