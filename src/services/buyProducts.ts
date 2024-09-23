import { ShopStore } from "@/types/Types";

export default async function BuyProducts(data: ShopStore[]) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await res.json();
}