

export interface IItem {
    id: string;
    name: string;
    username: string;
    email: string;
    address?: IAddress;
    phone: any;
    website: string;
    company?: ICompany;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: any;
    geo: IGeo;
}

export interface IGeo {
    lat: number;
    lng: number;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}


