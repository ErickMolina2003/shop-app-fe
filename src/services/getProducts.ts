export default async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}