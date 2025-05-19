"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.ExecutionEntity = exports.TestCaseExecution = exports.TestRun = exports.TestMetric = exports.TestDefinition = exports.AnnotationTagMapping = exports.ExecutionAnnotation = exports.AnnotationTagEntity = exports.ExecutionMetadata = exports.ExecutionData = exports.WorkflowHistory = exports.AuthUser = exports.AuthProviderSyncHistory = exports.FolderTagMapping = exports.WorkflowTagMapping = exports.WorkflowStatistics = exports.WorkflowEntity = exports.User = exports.TagEntity = exports.SharedWorkflow = exports.SharedCredentials = exports.ProjectRelation = exports.Project = exports.Folder = exports.CredentialsEntity = exports.AuthIdentity = exports.WebhookEntity = exports.ApiKey = exports.Variables = exports.Settings = exports.ProcessedData = exports.InvalidAuthToken = exports.InstalledPackages = exports.InstalledNodes = exports.EventDestinations = void 0;
const annotation_tag_entity_ee_1 = require("./annotation-tag-entity.ee");
Object.defineProperty(exports, "AnnotationTagEntity", { enumerable: true, get: function () { return annotation_tag_entity_ee_1.AnnotationTagEntity; } });
const annotation_tag_mapping_ee_1 = require("./annotation-tag-mapping.ee");
Object.defineProperty(exports, "AnnotationTagMapping", { enumerable: true, get: function () { return annotation_tag_mapping_ee_1.AnnotationTagMapping; } });
const api_key_1 = require("./api-key");
Object.defineProperty(exports, "ApiKey", { enumerable: true, get: function () { return api_key_1.ApiKey; } });
const auth_identity_1 = require("./auth-identity");
Object.defineProperty(exports, "AuthIdentity", { enumerable: true, get: function () { return auth_identity_1.AuthIdentity; } });
const auth_provider_sync_history_1 = require("./auth-provider-sync-history");
Object.defineProperty(exports, "AuthProviderSyncHistory", { enumerable: true, get: function () { return auth_provider_sync_history_1.AuthProviderSyncHistory; } });
const auth_user_1 = require("./auth-user");
Object.defineProperty(exports, "AuthUser", { enumerable: true, get: function () { return auth_user_1.AuthUser; } });
const credentials_entity_1 = require("./credentials-entity");
Object.defineProperty(exports, "CredentialsEntity", { enumerable: true, get: function () { return credentials_entity_1.CredentialsEntity; } });
const event_destinations_1 = require("./event-destinations");
Object.defineProperty(exports, "EventDestinations", { enumerable: true, get: function () { return event_destinations_1.EventDestinations; } });
const execution_annotation_ee_1 = require("./execution-annotation.ee");
Object.defineProperty(exports, "ExecutionAnnotation", { enumerable: true, get: function () { return execution_annotation_ee_1.ExecutionAnnotation; } });
const execution_data_1 = require("./execution-data");
Object.defineProperty(exports, "ExecutionData", { enumerable: true, get: function () { return execution_data_1.ExecutionData; } });
const execution_entity_1 = require("./execution-entity");
Object.defineProperty(exports, "ExecutionEntity", { enumerable: true, get: function () { return execution_entity_1.ExecutionEntity; } });
const execution_metadata_1 = require("./execution-metadata");
Object.defineProperty(exports, "ExecutionMetadata", { enumerable: true, get: function () { return execution_metadata_1.ExecutionMetadata; } });
const folder_1 = require("./folder");
Object.defineProperty(exports, "Folder", { enumerable: true, get: function () { return folder_1.Folder; } });
const folder_tag_mapping_1 = require("./folder-tag-mapping");
Object.defineProperty(exports, "FolderTagMapping", { enumerable: true, get: function () { return folder_tag_mapping_1.FolderTagMapping; } });
const installed_nodes_1 = require("./installed-nodes");
Object.defineProperty(exports, "InstalledNodes", { enumerable: true, get: function () { return installed_nodes_1.InstalledNodes; } });
const installed_packages_1 = require("./installed-packages");
Object.defineProperty(exports, "InstalledPackages", { enumerable: true, get: function () { return installed_packages_1.InstalledPackages; } });
const invalid_auth_token_1 = require("./invalid-auth-token");
Object.defineProperty(exports, "InvalidAuthToken", { enumerable: true, get: function () { return invalid_auth_token_1.InvalidAuthToken; } });
const processed_data_1 = require("./processed-data");
Object.defineProperty(exports, "ProcessedData", { enumerable: true, get: function () { return processed_data_1.ProcessedData; } });
const project_1 = require("./project");
Object.defineProperty(exports, "Project", { enumerable: true, get: function () { return project_1.Project; } });
const project_relation_1 = require("./project-relation");
Object.defineProperty(exports, "ProjectRelation", { enumerable: true, get: function () { return project_relation_1.ProjectRelation; } });
const settings_1 = require("./settings");
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return settings_1.Settings; } });
const shared_credentials_1 = require("./shared-credentials");
Object.defineProperty(exports, "SharedCredentials", { enumerable: true, get: function () { return shared_credentials_1.SharedCredentials; } });
const shared_workflow_1 = require("./shared-workflow");
Object.defineProperty(exports, "SharedWorkflow", { enumerable: true, get: function () { return shared_workflow_1.SharedWorkflow; } });
const tag_entity_1 = require("./tag-entity");
Object.defineProperty(exports, "TagEntity", { enumerable: true, get: function () { return tag_entity_1.TagEntity; } });
const test_case_execution_ee_1 = require("./test-case-execution.ee");
Object.defineProperty(exports, "TestCaseExecution", { enumerable: true, get: function () { return test_case_execution_ee_1.TestCaseExecution; } });
const test_definition_ee_1 = require("./test-definition.ee");
Object.defineProperty(exports, "TestDefinition", { enumerable: true, get: function () { return test_definition_ee_1.TestDefinition; } });
const test_metric_ee_1 = require("./test-metric.ee");
Object.defineProperty(exports, "TestMetric", { enumerable: true, get: function () { return test_metric_ee_1.TestMetric; } });
const test_run_ee_1 = require("./test-run.ee");
Object.defineProperty(exports, "TestRun", { enumerable: true, get: function () { return test_run_ee_1.TestRun; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const variables_1 = require("./variables");
Object.defineProperty(exports, "Variables", { enumerable: true, get: function () { return variables_1.Variables; } });
const webhook_entity_1 = require("./webhook-entity");
Object.defineProperty(exports, "WebhookEntity", { enumerable: true, get: function () { return webhook_entity_1.WebhookEntity; } });
const workflow_entity_1 = require("./workflow-entity");
Object.defineProperty(exports, "WorkflowEntity", { enumerable: true, get: function () { return workflow_entity_1.WorkflowEntity; } });
const workflow_history_1 = require("./workflow-history");
Object.defineProperty(exports, "WorkflowHistory", { enumerable: true, get: function () { return workflow_history_1.WorkflowHistory; } });
const workflow_statistics_1 = require("./workflow-statistics");
Object.defineProperty(exports, "WorkflowStatistics", { enumerable: true, get: function () { return workflow_statistics_1.WorkflowStatistics; } });
const workflow_tag_mapping_1 = require("./workflow-tag-mapping");
Object.defineProperty(exports, "WorkflowTagMapping", { enumerable: true, get: function () { return workflow_tag_mapping_1.WorkflowTagMapping; } });
exports.entities = {
    EventDestinations: event_destinations_1.EventDestinations,
    InstalledNodes: installed_nodes_1.InstalledNodes,
    InstalledPackages: installed_packages_1.InstalledPackages,
    InvalidAuthToken: invalid_auth_token_1.InvalidAuthToken,
    ProcessedData: processed_data_1.ProcessedData,
    Settings: settings_1.Settings,
    Variables: variables_1.Variables,
    ApiKey: api_key_1.ApiKey,
    WebhookEntity: webhook_entity_1.WebhookEntity,
    AuthIdentity: auth_identity_1.AuthIdentity,
    CredentialsEntity: credentials_entity_1.CredentialsEntity,
    Folder: folder_1.Folder,
    Project: project_1.Project,
    ProjectRelation: project_relation_1.ProjectRelation,
    SharedCredentials: shared_credentials_1.SharedCredentials,
    SharedWorkflow: shared_workflow_1.SharedWorkflow,
    TagEntity: tag_entity_1.TagEntity,
    User: user_1.User,
    WorkflowEntity: workflow_entity_1.WorkflowEntity,
    WorkflowStatistics: workflow_statistics_1.WorkflowStatistics,
    WorkflowTagMapping: workflow_tag_mapping_1.WorkflowTagMapping,
    FolderTagMapping: folder_tag_mapping_1.FolderTagMapping,
    AuthProviderSyncHistory: auth_provider_sync_history_1.AuthProviderSyncHistory,
    AuthUser: auth_user_1.AuthUser,
    WorkflowHistory: workflow_history_1.WorkflowHistory,
    ExecutionData: execution_data_1.ExecutionData,
    ExecutionMetadata: execution_metadata_1.ExecutionMetadata,
    AnnotationTagEntity: annotation_tag_entity_ee_1.AnnotationTagEntity,
    ExecutionAnnotation: execution_annotation_ee_1.ExecutionAnnotation,
    AnnotationTagMapping: annotation_tag_mapping_ee_1.AnnotationTagMapping,
    TestDefinition: test_definition_ee_1.TestDefinition,
    TestMetric: test_metric_ee_1.TestMetric,
    TestRun: test_run_ee_1.TestRun,
    TestCaseExecution: test_case_execution_ee_1.TestCaseExecution,
    ExecutionEntity: execution_entity_1.ExecutionEntity,
};
//# sourceMappingURL=index.js.map