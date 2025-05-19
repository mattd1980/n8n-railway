"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlMigrations = void 0;
const _1690000000040_AddMfaColumns_1 = require("./../common/1690000000040-AddMfaColumns");
const _1588157391238_InitialMigration_1 = require("./1588157391238-InitialMigration");
const _1592447867632_WebhookModel_1 = require("./1592447867632-WebhookModel");
const _1594902918301_CreateIndexStoppedAt_1 = require("./1594902918301-CreateIndexStoppedAt");
const _1607431743767_MakeStoppedAtNullable_1 = require("./1607431743767-MakeStoppedAtNullable");
const _1611149998770_AddWebhookId_1 = require("./1611149998770-AddWebhookId");
const _1615306975123_ChangeDataSize_1 = require("./1615306975123-ChangeDataSize");
const _1617268711084_CreateTagEntity_1 = require("./1617268711084-CreateTagEntity");
const _1620729500000_ChangeCredentialDataSize_1 = require("./1620729500000-ChangeCredentialDataSize");
const _1620826335440_UniqueWorkflowNames_1 = require("./1620826335440-UniqueWorkflowNames");
const _1623936588000_CertifyCorrectCollation_1 = require("./1623936588000-CertifyCorrectCollation");
const _1626183952959_AddWaitColumn_1 = require("./1626183952959-AddWaitColumn");
const _1630451444017_UpdateWorkflowCredentials_1 = require("./1630451444017-UpdateWorkflowCredentials");
const _1644424784709_AddExecutionEntityIndexes_1 = require("./1644424784709-AddExecutionEntityIndexes");
const _1646992772331_CreateUserManagement_1 = require("./1646992772331-CreateUserManagement");
const _1648740597343_LowerCaseUserEmail_1 = require("./1648740597343-LowerCaseUserEmail");
const _1652254514003_CommunityNodes_1 = require("./1652254514003-CommunityNodes");
const _1652367743993_AddUserSettings_1 = require("./1652367743993-AddUserSettings");
const _1652905585850_AddAPIKeyColumn_1 = require("./1652905585850-AddAPIKeyColumn");
const _1654090101303_IntroducePinData_1 = require("./1654090101303-IntroducePinData");
const _1658932910559_AddNodeIds_1 = require("./1658932910559-AddNodeIds");
const _1659895550980_AddJsonKeyPinData_1 = require("./1659895550980-AddJsonKeyPinData");
const _1660062385367_CreateCredentialsUserRole_1 = require("./1660062385367-CreateCredentialsUserRole");
const _1663755770894_CreateWorkflowsEditorRole_1 = require("./1663755770894-CreateWorkflowsEditorRole");
const _1664196174002_WorkflowStatistics_1 = require("./1664196174002-WorkflowStatistics");
const _1665484192213_CreateCredentialUsageTable_1 = require("./1665484192213-CreateCredentialUsageTable");
const _1665754637026_RemoveCredentialUsageTable_1 = require("./1665754637026-RemoveCredentialUsageTable");
const _1669739707125_AddWorkflowVersionIdColumn_1 = require("./1669739707125-AddWorkflowVersionIdColumn");
const _1669823906994_AddTriggerCountColumn_1 = require("./1669823906994-AddTriggerCountColumn");
const _1671535397530_MessageEventBusDestinations_1 = require("./1671535397530-MessageEventBusDestinations");
const _1671726148420_RemoveWorkflowDataLoadedFlag_1 = require("./1671726148420-RemoveWorkflowDataLoadedFlag");
const _1673268682475_DeleteExecutionsWithWorkflows_1 = require("./1673268682475-DeleteExecutionsWithWorkflows");
const _1674138566000_AddStatusToExecutions_1 = require("./1674138566000-AddStatusToExecutions");
const _1676996103000_MigrateExecutionStatus_1 = require("./1676996103000-MigrateExecutionStatus");
const _1677236788851_UpdateRunningExecutionStatus_1 = require("./1677236788851-UpdateRunningExecutionStatus");
const _1677501636753_CreateVariables_1 = require("./1677501636753-CreateVariables");
const _1679416281779_CreateExecutionMetadataTable_1 = require("./1679416281779-CreateExecutionMetadataTable");
const _1681134145996_AddUserActivatedProperty_1 = require("./1681134145996-AddUserActivatedProperty");
const _1681134145997_RemoveSkipOwnerSetup_1 = require("./1681134145997-RemoveSkipOwnerSetup");
const _1690000000001_MigrateIntegerKeysToString_1 = require("./1690000000001-MigrateIntegerKeysToString");
const _1690000000030_SeparateExecutionData_1 = require("./1690000000030-SeparateExecutionData");
const _1690000000031_FixExecutionDataType_1 = require("./1690000000031-FixExecutionDataType");
const _1717498465931_AddActivatedAtUserSetting_1 = require("./1717498465931-AddActivatedAtUserSetting");
const _1731582748663_MigrateTestDefinitionKeyToString_1 = require("./1731582748663-MigrateTestDefinitionKeyToString");
const _1732271325258_CreateTestMetricTable_1 = require("./1732271325258-CreateTestMetricTable");
const _1736172058779_AddStatsColumnsToTestRun_1 = require("./1736172058779-AddStatsColumnsToTestRun");
const _1739873751194_FixTestDefinitionPrimaryKey_1 = require("./1739873751194-FixTestDefinitionPrimaryKey");
const _1674509946020_CreateLdapEntities_1 = require("../common/1674509946020-CreateLdapEntities");
const _1675940580449_PurgeInvalidWorkflowConnections_1 = require("../common/1675940580449-PurgeInvalidWorkflowConnections");
const _1690000000030_RemoveResetPasswordColumns_1 = require("../common/1690000000030-RemoveResetPasswordColumns");
const _1691088862123_CreateWorkflowNameIndex_1 = require("../common/1691088862123-CreateWorkflowNameIndex");
const _1692967111175_CreateWorkflowHistoryTable_1 = require("../common/1692967111175-CreateWorkflowHistoryTable");
const _1693491613982_ExecutionSoftDelete_1 = require("../common/1693491613982-ExecutionSoftDelete");
const _1693554410387_DisallowOrphanExecutions_1 = require("../common/1693554410387-DisallowOrphanExecutions");
const _1695128658538_AddWorkflowMetadata_1 = require("../common/1695128658538-AddWorkflowMetadata");
const _1695829275184_ModifyWorkflowHistoryNodesAndConnections_1 = require("../common/1695829275184-ModifyWorkflowHistoryNodesAndConnections");
const _1700571993961_AddGlobalAdminRole_1 = require("../common/1700571993961-AddGlobalAdminRole");
const _1705429061930_DropRoleMapping_1 = require("../common/1705429061930-DropRoleMapping");
const _1711018413374_RemoveFailedExecutionStatus_1 = require("../common/1711018413374-RemoveFailedExecutionStatus");
const _1711390882123_MoveSshKeysToDatabase_1 = require("../common/1711390882123-MoveSshKeysToDatabase");
const _1712044305787_RemoveNodesAccess_1 = require("../common/1712044305787-RemoveNodesAccess");
const _1714133768519_CreateProject_1 = require("../common/1714133768519-CreateProject");
const _1714133768521_MakeExecutionStatusNonNullable_1 = require("../common/1714133768521-MakeExecutionStatusNonNullable");
const _1720101653148_AddConstraintToExecutionMetadata_1 = require("../common/1720101653148-AddConstraintToExecutionMetadata");
const _1723627610222_CreateInvalidAuthTokenTable_1 = require("../common/1723627610222-CreateInvalidAuthTokenTable");
const _1723796243146_RefactorExecutionIndices_1 = require("../common/1723796243146-RefactorExecutionIndices");
const _1724753530828_CreateExecutionAnnotationTables_1 = require("../common/1724753530828-CreateExecutionAnnotationTables");
const _1724951148974_AddApiKeysTable_1 = require("../common/1724951148974-AddApiKeysTable");
const _1726606152711_CreateProcessedDataTable_1 = require("../common/1726606152711-CreateProcessedDataTable");
const _1727427440136_SeparateExecutionCreationFromStart_1 = require("../common/1727427440136-SeparateExecutionCreationFromStart");
const _1728659839644_AddMissingPrimaryKeyOnAnnotationTagMapping_1 = require("../common/1728659839644-AddMissingPrimaryKeyOnAnnotationTagMapping");
const _1729607673464_UpdateProcessedDataValueColumnToText_1 = require("../common/1729607673464-UpdateProcessedDataValueColumnToText");
const _1729607673469_AddProjectIcons_1 = require("../common/1729607673469-AddProjectIcons");
const _1730386903556_CreateTestDefinitionTable_1 = require("../common/1730386903556-CreateTestDefinitionTable");
const _1731404028106_AddDescriptionToTestDefinition_1 = require("../common/1731404028106-AddDescriptionToTestDefinition");
const _1732549866705_CreateTestRunTable_1 = require("../common/1732549866705-CreateTestRunTable");
const _1733133775640_AddMockedNodesColumnToTestDefinition_1 = require("../common/1733133775640-AddMockedNodesColumnToTestDefinition");
const _1734479635324_AddManagedColumnToCredentialsTable_1 = require("../common/1734479635324-AddManagedColumnToCredentialsTable");
const _1736947513045_CreateTestCaseExecutionTable_1 = require("../common/1736947513045-CreateTestCaseExecutionTable");
const _1737715421462_AddErrorColumnsToTestRuns_1 = require("../common/1737715421462-AddErrorColumnsToTestRuns");
const _1738709609940_CreateFolderTable_1 = require("../common/1738709609940-CreateFolderTable");
const _1739549398681_CreateAnalyticsTables_1 = require("../common/1739549398681-CreateAnalyticsTables");
const _1741167584277_RenameAnalyticsToInsights_1 = require("../common/1741167584277-RenameAnalyticsToInsights");
const _1742918400000_AddScopesColumnToApiKeys_1 = require("../common/1742918400000-AddScopesColumnToApiKeys");
const _1745587087521_AddWorkflowStatisticsRootCount_1 = require("../common/1745587087521-AddWorkflowStatisticsRootCount");
const _1745934666076_AddWorkflowArchivedColumn_1 = require("../common/1745934666076-AddWorkflowArchivedColumn");
const _1745934666077_DropRoleTable_1 = require("../common/1745934666077-DropRoleTable");
const _1740445074052_UpdateParentFolderIdColumn_1 = require("../mysqldb/1740445074052-UpdateParentFolderIdColumn");
exports.mysqlMigrations = [
    _1588157391238_InitialMigration_1.InitialMigration1588157391238,
    _1592447867632_WebhookModel_1.WebhookModel1592447867632,
    _1594902918301_CreateIndexStoppedAt_1.CreateIndexStoppedAt1594902918301,
    _1611149998770_AddWebhookId_1.AddWebhookId1611149998770,
    _1607431743767_MakeStoppedAtNullable_1.MakeStoppedAtNullable1607431743767,
    _1615306975123_ChangeDataSize_1.ChangeDataSize1615306975123,
    _1620729500000_ChangeCredentialDataSize_1.ChangeCredentialDataSize1620729500000,
    _1617268711084_CreateTagEntity_1.CreateTagEntity1617268711084,
    _1620826335440_UniqueWorkflowNames_1.UniqueWorkflowNames1620826335440,
    _1623936588000_CertifyCorrectCollation_1.CertifyCorrectCollation1623936588000,
    _1626183952959_AddWaitColumn_1.AddWaitColumnId1626183952959,
    _1630451444017_UpdateWorkflowCredentials_1.UpdateWorkflowCredentials1630451444017,
    _1644424784709_AddExecutionEntityIndexes_1.AddExecutionEntityIndexes1644424784709,
    _1646992772331_CreateUserManagement_1.CreateUserManagement1646992772331,
    _1648740597343_LowerCaseUserEmail_1.LowerCaseUserEmail1648740597343,
    _1652367743993_AddUserSettings_1.AddUserSettings1652367743993,
    _1652254514003_CommunityNodes_1.CommunityNodes1652254514003,
    _1652905585850_AddAPIKeyColumn_1.AddAPIKeyColumn1652905585850,
    _1654090101303_IntroducePinData_1.IntroducePinData1654090101303,
    _1658932910559_AddNodeIds_1.AddNodeIds1658932910559,
    _1659895550980_AddJsonKeyPinData_1.AddJsonKeyPinData1659895550980,
    _1660062385367_CreateCredentialsUserRole_1.CreateCredentialsUserRole1660062385367,
    _1663755770894_CreateWorkflowsEditorRole_1.CreateWorkflowsEditorRole1663755770894,
    _1665484192213_CreateCredentialUsageTable_1.CreateCredentialUsageTable1665484192213,
    _1665754637026_RemoveCredentialUsageTable_1.RemoveCredentialUsageTable1665754637026,
    _1669739707125_AddWorkflowVersionIdColumn_1.AddWorkflowVersionIdColumn1669739707125,
    _1664196174002_WorkflowStatistics_1.WorkflowStatistics1664196174002,
    _1669823906994_AddTriggerCountColumn_1.AddTriggerCountColumn1669823906994,
    _1671726148420_RemoveWorkflowDataLoadedFlag_1.RemoveWorkflowDataLoadedFlag1671726148420,
    _1671535397530_MessageEventBusDestinations_1.MessageEventBusDestinations1671535397530,
    _1673268682475_DeleteExecutionsWithWorkflows_1.DeleteExecutionsWithWorkflows1673268682475,
    _1674509946020_CreateLdapEntities_1.CreateLdapEntities1674509946020,
    _1675940580449_PurgeInvalidWorkflowConnections_1.PurgeInvalidWorkflowConnections1675940580449,
    _1674138566000_AddStatusToExecutions_1.AddStatusToExecutions1674138566000,
    _1676996103000_MigrateExecutionStatus_1.MigrateExecutionStatus1676996103000,
    _1677236788851_UpdateRunningExecutionStatus_1.UpdateRunningExecutionStatus1677236788851,
    _1679416281779_CreateExecutionMetadataTable_1.CreateExecutionMetadataTable1679416281779,
    _1677501636753_CreateVariables_1.CreateVariables1677501636753,
    _1681134145996_AddUserActivatedProperty_1.AddUserActivatedProperty1681134145996,
    _1690000000001_MigrateIntegerKeysToString_1.MigrateIntegerKeysToString1690000000001,
    _1690000000030_SeparateExecutionData_1.SeparateExecutionData1690000000030,
    _1690000000031_FixExecutionDataType_1.FixExecutionDataType1690000000031,
    _1681134145997_RemoveSkipOwnerSetup_1.RemoveSkipOwnerSetup1681134145997,
    _1690000000030_RemoveResetPasswordColumns_1.RemoveResetPasswordColumns1690000000030,
    _1691088862123_CreateWorkflowNameIndex_1.CreateWorkflowNameIndex1691088862123,
    _1690000000040_AddMfaColumns_1.AddMfaColumns1690000000030,
    _1692967111175_CreateWorkflowHistoryTable_1.CreateWorkflowHistoryTable1692967111175,
    _1693554410387_DisallowOrphanExecutions_1.DisallowOrphanExecutions1693554410387,
    _1693491613982_ExecutionSoftDelete_1.ExecutionSoftDelete1693491613982,
    _1695128658538_AddWorkflowMetadata_1.AddWorkflowMetadata1695128658538,
    _1695829275184_ModifyWorkflowHistoryNodesAndConnections_1.ModifyWorkflowHistoryNodesAndConnections1695829275184,
    _1700571993961_AddGlobalAdminRole_1.AddGlobalAdminRole1700571993961,
    _1705429061930_DropRoleMapping_1.DropRoleMapping1705429061930,
    _1711018413374_RemoveFailedExecutionStatus_1.RemoveFailedExecutionStatus1711018413374,
    _1711390882123_MoveSshKeysToDatabase_1.MoveSshKeysToDatabase1711390882123,
    _1712044305787_RemoveNodesAccess_1.RemoveNodesAccess1712044305787,
    _1714133768519_CreateProject_1.CreateProject1714133768519,
    _1714133768521_MakeExecutionStatusNonNullable_1.MakeExecutionStatusNonNullable1714133768521,
    _1717498465931_AddActivatedAtUserSetting_1.AddActivatedAtUserSetting1717498465931,
    _1720101653148_AddConstraintToExecutionMetadata_1.AddConstraintToExecutionMetadata1720101653148,
    _1723627610222_CreateInvalidAuthTokenTable_1.CreateInvalidAuthTokenTable1723627610222,
    _1723796243146_RefactorExecutionIndices_1.RefactorExecutionIndices1723796243146,
    _1724753530828_CreateExecutionAnnotationTables_1.CreateAnnotationTables1724753530828,
    _1724951148974_AddApiKeysTable_1.AddApiKeysTable1724951148974,
    _1727427440136_SeparateExecutionCreationFromStart_1.SeparateExecutionCreationFromStart1727427440136,
    _1726606152711_CreateProcessedDataTable_1.CreateProcessedDataTable1726606152711,
    _1728659839644_AddMissingPrimaryKeyOnAnnotationTagMapping_1.AddMissingPrimaryKeyOnAnnotationTagMapping1728659839644,
    _1729607673464_UpdateProcessedDataValueColumnToText_1.UpdateProcessedDataValueColumnToText1729607673464,
    _1730386903556_CreateTestDefinitionTable_1.CreateTestDefinitionTable1730386903556,
    _1731404028106_AddDescriptionToTestDefinition_1.AddDescriptionToTestDefinition1731404028106,
    _1731582748663_MigrateTestDefinitionKeyToString_1.MigrateTestDefinitionKeyToString1731582748663,
    _1732271325258_CreateTestMetricTable_1.CreateTestMetricTable1732271325258,
    _1732549866705_CreateTestRunTable_1.CreateTestRun1732549866705,
    _1733133775640_AddMockedNodesColumnToTestDefinition_1.AddMockedNodesColumnToTestDefinition1733133775640,
    _1734479635324_AddManagedColumnToCredentialsTable_1.AddManagedColumnToCredentialsTable1734479635324,
    _1729607673469_AddProjectIcons_1.AddProjectIcons1729607673469,
    _1736172058779_AddStatsColumnsToTestRun_1.AddStatsColumnsToTestRun1736172058779,
    _1736947513045_CreateTestCaseExecutionTable_1.CreateTestCaseExecutionTable1736947513045,
    _1737715421462_AddErrorColumnsToTestRuns_1.AddErrorColumnsToTestRuns1737715421462,
    _1738709609940_CreateFolderTable_1.CreateFolderTable1738709609940,
    _1739873751194_FixTestDefinitionPrimaryKey_1.FixTestDefinitionPrimaryKey1739873751194,
    _1739549398681_CreateAnalyticsTables_1.CreateAnalyticsTables1739549398681,
    _1740445074052_UpdateParentFolderIdColumn_1.UpdateParentFolderIdColumn1740445074052,
    _1741167584277_RenameAnalyticsToInsights_1.RenameAnalyticsToInsights1741167584277,
    _1742918400000_AddScopesColumnToApiKeys_1.AddScopesColumnToApiKeys1742918400000,
    _1745587087521_AddWorkflowStatisticsRootCount_1.AddWorkflowStatisticsRootCount1745587087521,
    _1745934666076_AddWorkflowArchivedColumn_1.AddWorkflowArchivedColumn1745934666076,
    _1745934666077_DropRoleTable_1.DropRoleTable1745934666077,
];
//# sourceMappingURL=index.js.map