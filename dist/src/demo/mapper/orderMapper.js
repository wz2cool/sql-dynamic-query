"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mapper_1 = require("../../mapper");
var order_1 = require("../entity/table/order");
var OrderMapper = /** @class */ (function (_super) {
    __extends(OrderMapper, _super);
    function OrderMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderMapper.prototype.getEntityClass = function () {
        return order_1.Order;
    };
    return OrderMapper;
}(mapper_1.BaseTableMapper));
exports.OrderMapper = OrderMapper;
//# sourceMappingURL=orderMapper.js.map