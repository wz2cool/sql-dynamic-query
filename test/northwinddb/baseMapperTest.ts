import { expect } from "chai";
import * as path from "path";
import * as sqlite3 from "sqlite3";
import {
    BaseMybatisMapper,
    CommonHelper,
    DynamicQuery,
    FilterDescriptor,
    FilterOperator,
    ISqlConnection,
    SortDescriptor,
    SqliteConnection,
} from "../../src";

import { Container } from "inversify";
import "reflect-metadata";
import { InjectableSqliteConnection } from "./connection/injectableSqliteConnection";
import { InjectableSqlitedb } from "./connection/injectableSqlitedb";
import { NorthwindProductView } from "./entity/view/NothwindProductView";
import { ProductViewMapper } from "./mapper/productViewMapper";
import { ProductViewTemplate } from "./template/productViewTemplate";

const myContainer = new Container();
myContainer.bind<InjectableSqliteConnection>(InjectableSqliteConnection).toSelf();
myContainer.bind<ProductViewMapper>(ProductViewMapper).toSelf();
myContainer.bind<InjectableSqlitedb>(InjectableSqlitedb).toSelf();

describe("baseMapper Test", () => {
    describe("inject Test", () => {
        it("should get inject value", () => {
            const productViewMapper = myContainer.get<ProductViewMapper>(ProductViewMapper);
            expect(false).to.be.eq(CommonHelper.isNullOrUndefined(productViewMapper));
        });
    });

    describe("base Mapper test", () => {
        it("mybatis style sql template", (done) => {
            const productViewMapper = myContainer.get<ProductViewMapper>(ProductViewMapper);
            const query = ProductViewTemplate.getSelectPriceGreaterThan20();
            const paramMap: { [key: string]: any } = {};
            paramMap.price = 20;
            productViewMapper.mybatisSelectEntities(query, paramMap)
                .then((priceViews) => {
                    if (priceViews.length > 0) {
                        console.log(priceViews);
                        done();
                    } else {
                        done("should have items");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
