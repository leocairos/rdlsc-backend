interface IDependent {
  id: string;
  name: string;
  birthDate: Date;
  leader: boolean;
  canSell: boolean;
}

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  dependents?: IDependent[];
  document?: string;
  birthDate?: Date;
  phone1?: string;
  phone2?: string;
  phone3?: string;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  sponsor?: string;
  holder?: string;
  leader?: string;
  role?: string;
}
