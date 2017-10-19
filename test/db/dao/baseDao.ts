import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../../../src/helper";
import { DynamicQuery, SqlTemplate, TableEntity } from "../../../src/model";
import { MappingProvider, SqlTemplateProvider } from "../../../src/provider";

export abstract class BaseDao<T> {
    protected readonly db: sqlite3.Database;
    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    protected dbRun(sqlTemplate: SqlTemplate): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sqlTemplate.sqlExpression, sqlTemplate.params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    protected dbAll(entity: T | { new(): T }, sqlTemplate: SqlTemplate): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this.db.all(sqlTemplate.sqlExpression, sqlTemplate.params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (CommonHelper.isArray(result)) {
                        resolve(MappingProvider.toEntities<T>(entity, result));
                    } else {
                        reject(new Error(`cannot resolve result: ${result}`));
                    }
                }
            });
        });
    }
}