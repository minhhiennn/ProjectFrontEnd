import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Voucher } from '../models/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  url = 'https://first-fucking-app-angular.herokuapp.com/voucher/';

  constructor(private http: HttpClient) { }

  getByCode(code: string): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.url}?code=${code}`);
  }
  checkCanUser(voucher: Voucher): boolean {
    let now = new Date();
    if (voucher.dateBegin.getTime() < now.getTime() && voucher.dateEnd.getTime() > now.getTime()) {
      if (voucher.quantity == -1) {
        return true;
      } else if (voucher.quantity > 0) return true;
    }
   
    return false;
  }
  checkCondition(voucher: Voucher, cartItems: CartItem[]): CartItem[] | null | number  {
    
    let cartItemsN: CartItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
      
      cartItemsN.push(cartItems[i]);
    }
    if (this.checkCanUser(voucher)) {
      //Condition
      let conditionArr: string[] = voucher.condition.split("-");
      //Content
      let contentArr: string[] = voucher.content.split("-");
      //contentPrice và contentPriceMax chỉ có khi giảm giá theo giỏ hàng
      let contentPrice: number = parseInt(contentArr[0]); //lượng tiền 
      let contentPriceMax: number = parseInt(contentArr[1]); //(Số tiền tối đa được giảm giá) 
      // ba thằng ở dưới chỉ có khi giảm giá theo tên mặt hàng
      let contentAmount: number = parseInt(contentArr[2]); //số lượng 
      let contentType: number = parseInt(contentArr[3]);//loại giảm theo số lượng
      let contentAmountMax: number = parseInt(contentArr[4]);//Số lượng tối đa được giảm giá
      // 2 thằng đầu null khi giảm giá theo tên mặt hàng và ngược lại
      let total: number = 0;
      for (let index = 0; index < cartItemsN.length; index++) {
        console.log(conditionArr + " " + contentAmount);
        if (conditionArr.includes(cartItemsN[index].product.name) && cartItemsN[index].quantity >= contentAmount) {
          cartItemsN[index].price_total = this.discountWithType(cartItemsN[index].product.price, contentAmountMax, contentType, voucher.type, voucher.discount, cartItemsN[index].quantity, contentAmount);
        }
        total += cartItemsN[index].price_total;
      }
      console.log(total);
      // giảm giá theo giỏ hàng
      if (conditionArr.includes("null") && total >= contentPrice) {
        return this.discountWithType(total, contentPriceMax, 1, voucher.type, voucher.discount, 0, 0);
      }
      return cartItemsN 
    }
    return null;
  }

  discountWithType(total: number, contentPriceMaxOrAmountMax: number, contentType: number, type: string, discount: number, quantity: number, contentAmount: number): number {
    if (type == "%") {
      discount = (total * discount) / 100;
    }
    let result = 0;
    switch (contentType) {
      case 1:
        //quantity > 0 la tk giảm giá theo mặt hàng còn = 0 là giảm giá theo giỏ hàng và giảm giá theo giỏ hàng thì contentType luôn là 1
        if (quantity > 0) {
          if (quantity >= contentPriceMaxOrAmountMax && contentPriceMaxOrAmountMax != 0) result = (total * quantity) - ((discount) * contentPriceMaxOrAmountMax);
          else result = (total - discount) * quantity;
        } else {
          result = total - discount;
          if (result >= contentPriceMaxOrAmountMax && contentPriceMaxOrAmountMax != 0) result = contentPriceMaxOrAmountMax;
        }
        break;
      case 2:
        if (quantity >= contentPriceMaxOrAmountMax && contentPriceMaxOrAmountMax != 0) result = (total * quantity) - ((discount) * (contentPriceMaxOrAmountMax - contentAmount));
        else result = (total - discount) * (quantity - contentAmount);
        break;
      default:
        break;
    }
    return result;
  }
}
