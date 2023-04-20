export class Application {
  application_id: number;
  user_id: number;
  job_id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  certificate_path: string;
  resume_path: string;
  title: string;
  company: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  date_published: string;
  application_date: string;
  experience: string;

  constructor(
    application_id: number,
    user_id: number,
    job_id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string,
    age: number,
    certificate_path: string,
    resume_path: string,
    title: string,
    company: string,
    description: string,
    location: string,
    type: string,
    salary: string,
    contactName: string,
    contactEmail: string,
    contactPhone: string,
    date_published: string,
    application_date: string,
    experience: string
  ) {
    this.application_id = application_id;
    this.user_id = user_id;
    this.job_id = job_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.name = `${this.first_name} ${this.last_name}`;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.age = age;
    this.certificate_path = certificate_path;
    this.resume_path = resume_path;
    this.title = title;
    this.company = company;
    this.description = description;
    this.location = location;
    this.type = type;
    this.salary = salary;
    this.contactName = contactName;
    this.contactEmail = contactEmail;
    this.contactPhone = contactPhone;
    this.date_published = date_published;
    this.application_date = application_date;
    this.experience = experience;
  }
}
