const getTodos = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/todos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        });
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error:", error);
    }
    }

    export default getTodos;