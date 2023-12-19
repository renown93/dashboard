export interface TableData<T> {
  title: string;
  items: T[];
  limit: number;
  currentPage: number;
  total: number;
  skip: number;
  totalPage: number;
  orderDirection: 'asc' | 'desc';
  orderId: string | null;
  error: string | null;
  isLoading?: boolean;
}
