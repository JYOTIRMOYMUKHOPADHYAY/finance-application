export class User {
  id: number;
  name: string;
  email: string;
  phone_no: string;
  userType_id: number;

  constructor(id: number, name: string, email: string, phone_no: string, userType_id: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone_no = phone_no;
    this.userType_id = userType_id;
  }
}
