"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XrayModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const xray_schema_1 = require("./xray.schema");
const xray_controller_1 = require("./xray.controller");
const xray_processor_1 = require("./xray.processor");
const xray_service_1 = require("./xray.service");
let XrayModule = class XrayModule {
};
exports.XrayModule = XrayModule;
exports.XrayModule = XrayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: xray_schema_1.Xray.name, schema: xray_schema_1.XraySchema }]),
        ],
        controllers: [xray_controller_1.XrayController],
        providers: [xray_service_1.XrayService, xray_processor_1.XrayProccessor],
        exports: [xray_service_1.XrayService],
    })
], XrayModule);
//# sourceMappingURL=xray.module.js.map