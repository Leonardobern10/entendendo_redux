export class RegisterProductDTO {
  public readonly name: string;
  public readonly quantity: number;
  public readonly price: number;

  constructor(name: string, quantity: number, price: number) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}
