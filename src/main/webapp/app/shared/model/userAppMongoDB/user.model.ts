import { Moment } from 'moment';

export interface IUser {
    id?: string;
    firstname?: string;
    name?: string;
    title?: string;
    birthdate?: Moment;
    cityName?: string;
    cityId?: string;
}

export class User implements IUser {
    constructor(
        public id?: string,
        public firstname?: string,
        public name?: string,
        public title?: string,
        public birthdate?: Moment,
        public cityName?: string,
        public cityId?: string
    ) {}
}
