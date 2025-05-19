"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoXss = NoXss;
const class_validator_1 = require("class-validator");
const xss_1 = __importDefault(require("xss"));
let NoXssConstraint = class NoXssConstraint {
    validate(value) {
        if (typeof value !== 'string')
            return false;
        return (value ===
            (0, xss_1.default)(value, {
                whiteList: {},
            }));
    }
    defaultMessage() {
        return 'Potentially malicious string';
    }
};
NoXssConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'NoXss', async: false })
], NoXssConstraint);
function NoXss(options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'NoXss',
            target: object.constructor,
            propertyName,
            options,
            validator: NoXssConstraint,
        });
    };
}
//# sourceMappingURL=no-xss.validator.js.map