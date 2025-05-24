const logout = async (): Promise<any> => {
    const response = await fetch("http://localhost:5000/api/auth/logout", {
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