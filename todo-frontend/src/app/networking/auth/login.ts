interface LoginRequestBody {
    email: string;
    password: string;
}

interface LoginResponse {
    token?: string;
    [key: string]: any; // To handle any additional properties in the response
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password,
        } as LoginRequestBody),
    });
    const data: LoginResponse = await response.json();
    return data;
};

  export default login;