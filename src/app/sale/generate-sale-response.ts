export interface GenerateSaleResponse {
  status_code:number;
  sale_url: string;
  payme_sale_id?: string | undefined | null;
  payme_sale_code?: number | undefined | null;
  price?: number | undefined | null;
  transaction_id?: string | undefined | null;
  currency?: string | undefined | null;
  sale_payment_method?: string | undefined | null;
}
