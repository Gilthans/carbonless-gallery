export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  /** Missing for pickup-only customers. */
  address?: Address;
}

export function findCustomer(customers: Customer[], id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}
