const addTodo = async (user_id:string,text:string,status:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/addTodo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            user_id,
            text,
            status
        }),
        });
        
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error:", error);
    }
    }

    export default addTodo