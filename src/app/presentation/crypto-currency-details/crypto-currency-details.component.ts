import {Component, OnInit} from '@angular/core';
import {CryptoCurrencyService} from '../../api/crypto-currency.service';
import {ICryptoCurrency} from '../../modules/crypto-currency';
import {ActivatedRoute, Params} from '@angular/router';

import {CurrencyActions} from '../../actions/currency.action';

@Component({
  selector: 'app-crypto-currency-details',
  templateUrl: './crypto-currency-details.component.html',
  styleUrls: ['./crypto-currency-details.component.css']
})
export class CryptoCurrencyDetailsComponent implements OnInit {
  cryptoCurrency ?: ICryptoCurrency;
  private id: string;

  constructor(private route: ActivatedRoute, private _cryptoCurrencyService: CryptoCurrencyService,
              private currencyActions: CurrencyActions) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.getCryptoCurrency();
  }

  getCryptoCurrency() {
    this._cryptoCurrencyService.getCryptoCurrency(this.id, this.currencyActions.getCurrency())
      .subscribe(
        data => {
          this.cryptoCurrency = data;
        },
        error => console.log('Error ' + error),
      );
  }
}
