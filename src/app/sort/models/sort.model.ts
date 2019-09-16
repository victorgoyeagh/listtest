export enum ISortParams {
    NAME = <any>'name',
    ID = <any>'id',
    USERNAME = <any>'username'
}

export enum Direction {
    ACSCENDING = <any>true,
    DESCENDING = <any>false
}

export interface ISortData {
    sortParam: string;
    direction: Direction;
}
