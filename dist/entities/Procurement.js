"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Procurement = exports.ProcurementStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var ProcurementStatus;
(function (ProcurementStatus) {
    ProcurementStatus["DRAFT"] = "draft";
    ProcurementStatus["PUBLISHED"] = "published";
    ProcurementStatus["EVALUATION"] = "evaluation";
    ProcurementStatus["COMPLETED"] = "completed";
    ProcurementStatus["CANCELLED"] = "cancelled";
})(ProcurementStatus || (exports.ProcurementStatus = ProcurementStatus = {}));
let Procurement = class Procurement {
};
exports.Procurement = Procurement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Procurement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Procurement.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Procurement.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Procurement.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProcurementStatus,
        default: ProcurementStatus.DRAFT
    }),
    __metadata("design:type", String)
], Procurement.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Procurement.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.procurement),
    __metadata("design:type", User_1.User)
], Procurement.prototype, "ppk", void 0);
exports.Procurement = Procurement = __decorate([
    (0, typeorm_1.Entity)()
], Procurement);
