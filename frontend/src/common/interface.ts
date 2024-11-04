
export interface ProductInfoInterface{
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rentPrice?: number;
  rentDuration?: number;
  totalViews?: number;
  status?: string;
  categories: CategoryInterface[]
}

export interface CategoryInterface{
  id: number;
  name: string;
}


export interface TransactionInterface{
  id: number;
  transactionDate: Date;
  rentalDateStart: Date;
  rentalDateEnd: Date;
  transactionType: string;
  product: ProductInfoInterface;
}
