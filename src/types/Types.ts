export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    amount: number;
};

export type ShopStore = {
    product: Product;
    amountToBuy: number;
}

