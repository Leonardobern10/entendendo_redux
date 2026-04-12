export default class RegisterClientDTO {
  public readonly name: string;
  public readonly email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
