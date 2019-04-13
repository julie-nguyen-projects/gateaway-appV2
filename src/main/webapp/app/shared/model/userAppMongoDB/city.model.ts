export interface ICity {
    id?: string;
    name?: string;
    countryName?: string;
    countryId?: string;
}

export class City implements ICity {
    constructor(public id?: string, public name?: string, public countryName?: string, public countryId?: string) {}
}
