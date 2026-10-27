export interface Item {
  name: string;
  price: number;
  quantity: number;
  taxRate: number;
}

export function total(items: Item[]): number {
    let sum = 0;
    for (const item of items) {
        if (item.price < 0) {
            throw new Error(`negative price for ${item.name}`);
        }
        sum += item.price * item.quantity * item.taxRate;
    }
    return sum;
}

export function average(items: Item[]): number {
    if (items.length === 0) {
        return 0;
    }
    return total(items) / items.length;
}

export function names(items: Item[]): string[] {
    return items.map((item) => item.name);
}
