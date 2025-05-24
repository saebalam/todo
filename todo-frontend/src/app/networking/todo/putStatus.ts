const putStatus = async (id: string, newStatus:string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/todos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default putStatus;
