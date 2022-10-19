import { IParamsFilter } from './interfaces/params.filter.interface';
export declare class ParamsFilter implements IParamsFilter {
    private storage;
    getParam(filter: string): any;
    setParam(filter: string, ...params: any[]): IParamsFilter;
}
