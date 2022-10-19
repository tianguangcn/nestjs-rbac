export interface IFilterPermission {
    can?(params?: any[]): boolean;
    canAsync?(params?: any[]): Promise<boolean>;
}
