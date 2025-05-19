"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriber = void 0;
const di_1 = require("@n8n/di");
const typeorm_1 = require("@n8n/typeorm");
const n8n_core_1 = require("n8n-core");
const n8n_workflow_1 = require("n8n-workflow");
const entities_1 = require("../entities");
const user_repository_1 = require("../repositories/user.repository");
let UserSubscriber = class UserSubscriber {
    constructor() {
        this.eventReporter = di_1.Container.get(n8n_core_1.ErrorReporter);
    }
    listenTo() {
        return entities_1.User;
    }
    async afterUpdate(event) {
        if (event.entity) {
            const newUserData = event.entity;
            if (event.databaseEntity) {
                const fields = event.updatedColumns.map((c) => c.propertyName);
                if (fields.includes('firstName') ||
                    fields.includes('lastName') ||
                    fields.includes('email')) {
                    const oldUser = event.databaseEntity;
                    const userEntity = newUserData instanceof entities_1.User
                        ? newUserData
                        : di_1.Container.get(user_repository_1.UserRepository).create(newUserData);
                    const projectName = userEntity.createPersonalProjectName();
                    const project = await event.manager.findOneBy(entities_1.Project, {
                        type: 'personal',
                        projectRelations: { userId: oldUser.id },
                    });
                    if (!project) {
                        const message = "Could not update the personal project's name";
                        di_1.Container.get(n8n_core_1.Logger).warn(message, event.entity);
                        const exception = new n8n_workflow_1.UnexpectedError(message);
                        this.eventReporter.warn(exception, event.entity);
                        return;
                    }
                    project.name = projectName;
                    await event.manager.save(entities_1.Project, project);
                }
            }
            else {
                if (event.entity.firstName || event.entity.lastName || event.entity.email) {
                    const message = "Could not update the personal project's name";
                    di_1.Container.get(n8n_core_1.Logger).warn(message, event.entity);
                    const exception = new n8n_workflow_1.UnexpectedError(message);
                    this.eventReporter.warn(exception, event.entity);
                }
            }
        }
    }
};
exports.UserSubscriber = UserSubscriber;
exports.UserSubscriber = UserSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], UserSubscriber);
//# sourceMappingURL=user-subscriber.js.map