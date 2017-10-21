import { DatabaseType, Entity } from "../model";

export interface ISqlConnection {
    getDataBaseType(): DatabaseType;

    run(sql: string, params: any[], callback: (err: any, result?: any) => void);
    select(sql: string, params: any[], callback: (err: any, result: any[]) => void);
    selectCount(sql: string, params: any[], callback: (err: any, result: number) => void);
    selectEntities<T extends Entity>(
        entityClass: { new(): T },
        sql: string,
        params: any[],
        callback: (err: any, result: T[]) => void);
}