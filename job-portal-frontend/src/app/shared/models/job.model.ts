export class Job {
  id: number;
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
  org_id: number;
  company_logo: string;

  constructor(
    id: number,
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
    org_id: number,
    company_logo: string
  ) {
    this.id = id;
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
    this.org_id = org_id;
    this.company_logo = company_logo;
  }
}
