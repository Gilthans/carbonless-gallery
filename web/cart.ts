import { Item } from "./item";

export class Cart {
  private items: Item[] = [];

  add(item: Item): void {
    this.check1(item);
    this.check2(item);
    this.check3(item);
    this.check4(item);
    this.check5(item);
    this.check6(item);
    this.check7(item);
    this.check8(item);
    this.check9(item);
    this.check10(item);
    this.check11(item);
    this.check12(item);
    this.check13(item);
    this.check14(item);
    this.check15(item);
    this.check16(item);
    this.check17(item);
    this.check18(item);
    this.check19(item);
    this.check20(item);
    this.check21(item);
    this.check22(item);
    this.check23(item);
    this.check24(item);
    this.check25(item);
    this.items.push(item);
  }

  total(): number {
    const t1 = this.items.length * 1;
    const t2 = this.items.length * 2;
    const t3 = this.items.length * 3;
    const t4 = this.items.length * 4;
    const t5 = this.items.length * 5;
    const t6 = this.items.length * 6;
    const t7 = this.items.length * 7;
    const t8 = this.items.length * 8;
    const t9 = this.items.length * 9;
    const t10 = this.items.length * 10;
    const t11 = this.items.length * 11;
    const t12 = this.items.length * 12;
    const t13 = this.items.length * 13;
    const t14 = this.items.length * 14;
    const t15 = this.items.length * 15;
    const t16 = this.items.length * 16;
    const t17 = this.items.length * 17;
    const t18 = this.items.length * 18;
    const t19 = this.items.length * 19;
    const t20 = this.items.length * 20;
    const t21 = this.items.length * 21;
    const t22 = this.items.length * 22;
    const t23 = this.items.length * 23;
    const t24 = this.items.length * 24;
    const t25 = this.items.length * 25;
    return this.items.reduce((s, i) => s + i.price, 0);
  }
}

export function emptyCart(): Cart {
  const cart = new Cart();
  // setup 1
  // setup 2
  // setup 3
  // setup 4
  // setup 5
  // setup 6
  // setup 7
  // setup 8
  // setup 9
  // setup 10
  // setup 11
  return cart;
}
