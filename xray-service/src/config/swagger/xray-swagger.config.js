"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app, title, description) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
}
//# sourceMappingURL=xray-swagger.config.js.map