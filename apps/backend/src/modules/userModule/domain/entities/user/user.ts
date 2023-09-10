export interface UserInput {
  readonly id: string;
  readonly email: string;
  readonly password: string;
}

export class User {
  public readonly id: string;
  public readonly email: string;
  public readonly password: string;

  public constructor(input: UserInput) {
    const { id, email, password } = input;

    this.id = id;
    this.password = password;
    this.email = email;
  }
}
