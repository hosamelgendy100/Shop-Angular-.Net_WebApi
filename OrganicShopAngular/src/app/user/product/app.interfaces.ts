export type TShirtSize = "S" | "M" | "L" | "XL" | "XXL";

export interface IPaginableProduct {
  product:IProduct[];
  pagination: IPagination;
}

export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
}

export interface IProduct
{
  ProductId,
  ProductName,
  Price,
  Category,
  ImageURL
}
