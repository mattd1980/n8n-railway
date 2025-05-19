import type { CredentialsEntity, User, WorkflowEntity, TagEntity, AnnotationTagEntity, TestDefinition } from '@n8n/db';
import type { PersonalizationSurveyAnswersV4 } from './controllers/survey-answers.dto';
export declare function validateEntity(entity: WorkflowEntity | TestDefinition | CredentialsEntity | TagEntity | AnnotationTagEntity | User | PersonalizationSurveyAnswersV4): Promise<void>;
export declare const DEFAULT_EXECUTIONS_GET_ALL_LIMIT = 20;
