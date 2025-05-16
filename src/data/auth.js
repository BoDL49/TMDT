export const getToken = () => {
    // Giả lập một user đã đăng nhập
    return {
        _id: "user1",
        accessToken: "sample_token",
        role: "user"
    };
};

export const login = (email, password) => {
    // Giả lập đăng nhập thành công
    return {
        success: true,
        user: {
            _id: "user1",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            accessToken: "sample_token"
        }
    };
};

export const register = (name, email, password) => {
    // Giả lập đăng ký thành công
    return {
        success: true,
        user: {
            _id: "user1",
            name: name,
            email: email,
            role: "user",
            accessToken: "sample_token"
        }
    };
};

export const logout = () => {
    // Giả lập đăng xuất thành công
    return {
        success: true
    };
}; 