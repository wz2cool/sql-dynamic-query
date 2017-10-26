import { EntityHelper } from "../helper";
import { DynamicQuery } from "./dynamicQuery";
import { Entity } from "./entity";
import { RelationBase } from "./relationBase";

// one to many
export class CollectionRelation<TSource extends Entity, TRef extends Entity> extends RelationBase<TSource> {
    private readonly mappingPropFn: (t: TSource) => TRef[];
    private readonly sourcePropFn: (t: TSource) => any;
    private readonly refPropFun: (t: TRef) => any;
    private readonly refEntityClass: { new(): TRef };
    private readonly selectSql: string;
    private readonly dynamicQuery: DynamicQuery<TRef>;

    constructor(
        // one to many.
        mappingPropFn: (source: TSource) => TRef[],
        sourcePropFn: (source: TSource) => any,
        refPropFn: (ref: TRef) => any,
        refEntityClass: { new(): TRef },
        selectSql: string,
        dynamicQuery: DynamicQuery<TRef> = null) {
        super();

        this.mappingPropFn = mappingPropFn;
        this.sourcePropFn = sourcePropFn;
        this.refPropFun = refPropFn;
        this.refEntityClass = refEntityClass;
        this.dynamicQuery = dynamicQuery;
        this.selectSql = selectSql;
    }

    public getMappingProp(): string {
        return EntityHelper.getPropertyName<TSource>(this.mappingPropFn);
    }

    public getSourceProp(): string {
        return EntityHelper.getPropertyName<TSource>(this.sourcePropFn);
    }

    public getRefSourceProp(): string {
        return EntityHelper.getPropertyName<TRef>(this.refPropFun);
    }

    public getRefEntityClass(): new () => TRef {
        return this.refEntityClass;
    }

    public getSelectSql(): string {
        return this.selectSql;
    }

    public getDynamicQuery(): DynamicQuery<TRef> {
        return this.dynamicQuery;
    }
}
