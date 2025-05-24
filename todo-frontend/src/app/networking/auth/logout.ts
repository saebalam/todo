const logout = async (): Promise<any> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    const data: any = await response.json();
    return data;
};

  export default logout;