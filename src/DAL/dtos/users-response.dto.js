export default class UsersResponse {
  constructor(user) {
    this.first_name = user.first_name || "";
    this.last_name = user.last_name || "";
    this.email = user.email || "";
    this.orders = user.orders || [];
    this.cartId = user.cartId || "";
  }
}
