export const users = [
    {
        _id: "user1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "/images/avt.png",
        point: 1000,
        role: "customer",
        isActive: true,
        numFollowers: 150,
        numFollowing: 100,
        joinedDate: "2022-01-01"
    },
    {
        _id: "user2",
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/images/avt.png",
        point: 800,
        role: "customer",
        isActive: true,
        numFollowers: 120,
        numFollowing: 80,
        joinedDate: "2022-02-01"
    },
    {
        _id: "user3",
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "/images/avt.png",
        point: 600,
        role: "customer",
        isActive: true,
        numFollowers: 90,
        numFollowing: 60,
        joinedDate: "2022-03-01"
    },
    {
        _id: "user4",
        name: "Mike Johnson 1",
        email: "mike@example.com",
        avatar: "/images/avt.png",
        point: 600,
        role: "customer",
        isActive: true,
        numFollowers: 90,
        numFollowing: 60,
        joinedDate: "2022-03-01"
    },
    {
        _id: "user3",
        name: "Mike Johnson 4",
        email: "mike@example.com",
        avatar: "/images/avt.png",
        point: 600,
        role: "customer",
        isActive: true,
        numFollowers: 90,
        numFollowing: 60,
        joinedDate: "2022-03-01"
    },
    {
        _id: "user3",
        name: "Mike Johnson 5",
        email: "mike@example.com",
        avatar: "/images/avt.png",
        point: 600,
        role: "customer",
        isActive: true,
        numFollowers: 90,
        numFollowing: 60,
        joinedDate: "2022-03-01"
    }
];

export const getlistUsers = (filter) => {
    let filteredUsers = [...users];
    
    if (filter.search) {
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
            user.email.toLowerCase().includes(filter.search.toLowerCase())
        );
    }
    
    if (filter.role) {
        filteredUsers = filteredUsers.filter(user => 
            user.role === filter.role
        );
    }
    
    // Sort
    if (filter.sortBy) {
        filteredUsers.sort((a, b) => {
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
        users: filteredUsers.slice(startIndex, endIndex),
        total: filteredUsers.length
    };
};

export const mockSignin = ({ email, phone, password }) => {
    const user = users.find(
        u =>
            (email && u.email === email) ||
            (phone && u.phone === phone)
    );
    if (!user) {
        return { error: 'User not found' };
    }
    if (password !== '123456') {
        return { error: 'Wrong password' };
    }
    return {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
        _id: user._id,
        role: user.role,
    };
}; 