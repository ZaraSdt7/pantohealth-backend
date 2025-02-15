"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XrayServiceModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rabbitmq_module_1 = require("./modules/rabbitmq/rabbitmq.module");
const rabbitmq_config_1 = require("./config/rabbitmq.config");
const database_config_1 = require("./config/database.config");
const xray_module_1 = require("./modules/xray/xray.module");
const signal_module_1 = require("./modules/signals/signal.module");
const mongoose_1 = require("@nestjs/mongoose");
let XrayServiceModule = class XrayServiceModule {
};
exports.XrayServiceModule = XrayServiceModule;
exports.XrayServiceModule = XrayServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [rabbitmq_config_1.default, database_config_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('database.uri'),
                }),
            }),
            rabbitmq_module_1.RabbitMQModule,
            xray_module_1.XrayModule,
            signal_module_1.SignalsModule,
        ],
    })
], XrayServiceModule);
//# sourceMappingURL=xray-service.module.js.map