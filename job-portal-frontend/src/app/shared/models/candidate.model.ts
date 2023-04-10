export class Candidate {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  account_status: number;
  resume_path: string;
  certificate_path: string;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    age: number,
    account_status: number,
    resume_path: string,
    certificate_path: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.name = `${this.first_name} ${this.last_name}`;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.age = age;
    this.account_status = account_status;
    this.resume_path = resume_path;
    this.certificate_path = certificate_path;
  }
}
