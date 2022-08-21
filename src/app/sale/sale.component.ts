import { Component, OnInit } from '@angular/core';
import { SaleCurrency } from "./sale.currency";
import { SaleService } from "../sale.service";
import { FormBuilder, FormControl } from "@angular/forms";
import {GenerateSaleResponse} from "./generate-sale-response";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.sass']
})
export class SaleComponent implements OnInit {

  saleCurrencies: SaleCurrency[] = [];

  selectedSaleCurrency? : SaleCurrency;

  saleResponse: GenerateSaleResponse | null | undefined;

  salesList: any;

  saleForm = this.formBuilder.group({
    product: '',
    cost: 0,
    currency: ''
  });

  product = new FormControl('');
  cost = new FormControl(0);
  currency = new FormControl('');
  error: any;
  paymentUrl: any;

  constructor(
    private saleService: SaleService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.getSales();
  }

  getCurrencies(): void {
    this.saleService.getCurrencies()
      .subscribe(currencies => this.saleCurrencies = currencies);
  }

  onSubmit(): void {
    this.error = '';
    this.paymentUrl = null;
    this.saleService.submitForm(this.product.value, this.cost.value, this.currency.value)
      .subscribe(
        (data:GenerateSaleResponse) => {
          this.saleResponse = {...data}
          this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.sale_url);
        },
        (error) => {
          this.error = 'It is not You, it is us. Please try again later.';
      });
  }

  getSales()
  {
    this.saleService.getAllRecords().subscribe(
      sales => this.salesList = sales
    ,
    (error) => {
      this.error = 'It is not You, it is us. Please try again later.';
    })
  }
}
