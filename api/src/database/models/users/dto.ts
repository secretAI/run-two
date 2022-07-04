import { User } from "../../";

export class UserDto {
  public readonly id: User["id"];
  public readonly email: User["email"];
  public readonly activated: User["activated"];
  public readonly created_at: User["created_at"];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.activated = user.activated;
    this.created_at = user.created_at;
  }
}