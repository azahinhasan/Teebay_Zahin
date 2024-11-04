
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
  message: string;
  success: boolean;
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


export interface RentDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (startDate: Date | null, endDate: Date | null) => void;
}