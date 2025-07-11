interface SignupRequestBody {
    email: string;
    password: string;
}

interface SignupResponse {
    token?: string;
    [key: string]: any; // To handle any additional properties in the response
}

const signup = async (username:string,email: string, password: string): Promise<SignupResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            username,
            email,
            password,
        } as SignupRequestBody),
    });
    const data: SignupResponse = await response.json();
    return data;
};

  export default signup;