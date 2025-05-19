"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkflowCredentials1630330987096 = void 0;
class UpdateWorkflowCredentials1630330987096 {
    async up({ dbType, escape, parseJson, runQuery, runInBatches }) {
        const credentialsTable = escape.tableName('credentials_entity');
        const workflowsTable = escape.tableName('workflow_entity');
        const executionsTable = escape.tableName('execution_entity');
        const dataColumn = escape.columnName('workflowData');
        const waitTillColumn = escape.columnName('waitTill');
        const credentialsEntities = await runQuery(`SELECT id, name, type FROM ${credentialsTable}`);
        const workflowsQuery = `SELECT id, nodes FROM ${workflowsTable}`;
        await runInBatches(workflowsQuery, async (workflows) => {
            workflows.forEach(async (workflow) => {
                let credentialsUpdated = false;
                const nodes = parseJson(workflow.nodes);
                nodes.forEach((node) => {
                    if (node.credentials) {
                        const allNodeCredentials = Object.entries(node.credentials);
                        for (const [type, name] of allNodeCredentials) {
                            if (typeof name === 'string') {
                                const matchingCredentials = credentialsEntities.find((credentials) => credentials.name === name && credentials.type === type);
                                node.credentials[type] = { id: matchingCredentials?.id ?? null, name };
                                credentialsUpdated = true;
                            }
                        }
                    }
                });
                if (credentialsUpdated) {
                    await runQuery(`UPDATE ${workflowsTable} SET nodes = :nodes WHERE id = :id`, {
                        nodes: JSON.stringify(nodes),
                        id: workflow.id,
                    });
                }
            });
        });
        const finishedValue = dbType === 'postgresdb' ? 'FALSE' : '0';
        const waitingExecutionsQuery = `
			SELECT id, ${dataColumn}
			FROM ${executionsTable}
			WHERE ${waitTillColumn} IS NOT NULL AND finished = ${finishedValue}
		`;
        await runInBatches(waitingExecutionsQuery, async (waitingExecutions) => {
            waitingExecutions.forEach(async (execution) => {
                let credentialsUpdated = false;
                const workflowData = parseJson(execution.workflowData);
                workflowData.nodes.forEach((node) => {
                    if (node.credentials) {
                        const allNodeCredentials = Object.entries(node.credentials);
                        for (const [type, name] of allNodeCredentials) {
                            if (typeof name === 'string') {
                                const matchingCredentials = credentialsEntities.find((credentials) => credentials.name === name && credentials.type === type);
                                node.credentials[type] = { id: matchingCredentials?.id ?? null, name };
                                credentialsUpdated = true;
                            }
                        }
                    }
                });
                if (credentialsUpdated) {
                    await runQuery(`UPDATE ${executionsTable}
						 SET ${escape.columnName('workflowData')} = :data WHERE id = :id`, { data: JSON.stringify(workflowData), id: execution.id });
                }
            });
        });
        const retryableExecutions = await runQuery(`
			SELECT id, ${dataColumn}
			FROM ${executionsTable}
			WHERE ${waitTillColumn} IS NULL AND finished = ${finishedValue} AND mode != 'retry'
			ORDER BY ${escape.columnName('startedAt')} DESC
			LIMIT 200
		`);
        retryableExecutions.forEach(async (execution) => {
            let credentialsUpdated = false;
            const workflowData = parseJson(execution.workflowData);
            workflowData.nodes.forEach((node) => {
                if (node.credentials) {
                    const allNodeCredentials = Object.entries(node.credentials);
                    for (const [type, name] of allNodeCredentials) {
                        if (typeof name === 'string') {
                            const matchingCredentials = credentialsEntities.find((credentials) => credentials.name === name && credentials.type === type);
                            node.credentials[type] = { id: matchingCredentials?.id ?? null, name };
                            credentialsUpdated = true;
                        }
                    }
                }
            });
            if (credentialsUpdated) {
                await runQuery(`UPDATE ${executionsTable}
					 SET ${escape.columnName('workflowData')} = :data WHERE id = :id`, { data: JSON.stringify(workflowData), id: execution.id });
            }
        });
    }
    async down({ dbType, escape, parseJson, runQuery, runInBatches }) {
        const credentialsTable = escape.tableName('credentials_entity');
        const workflowsTable = escape.tableName('workflow_entity');
        const executionsTable = escape.tableName('execution_entity');
        const dataColumn = escape.columnName('workflowData');
        const waitTillColumn = escape.columnName('waitTill');
        const credentialsEntities = await runQuery(`SELECT id, name, type FROM ${credentialsTable}`);
        const workflowsQuery = `SELECT id, nodes FROM ${workflowsTable}`;
        await runInBatches(workflowsQuery, async (workflows) => {
            workflows.forEach(async (workflow) => {
                let credentialsUpdated = false;
                const nodes = parseJson(workflow.nodes);
                nodes.forEach((node) => {
                    if (node.credentials) {
                        const allNodeCredentials = Object.entries(node.credentials);
                        for (const [type, creds] of allNodeCredentials) {
                            if (typeof creds === 'object') {
                                const matchingCredentials = credentialsEntities.find((credentials) => credentials.id == creds.id && credentials.type === type);
                                if (matchingCredentials) {
                                    node.credentials[type] = matchingCredentials.name;
                                }
                                else {
                                    node.credentials[type] = creds.name;
                                }
                                credentialsUpdated = true;
                            }
                        }
                    }
                });
                if (credentialsUpdated) {
                    await runQuery(`UPDATE ${workflowsTable} SET nodes = :nodes WHERE id = :id`, {
                        nodes: JSON.stringify(nodes),
                        id: workflow.id,
                    });
                }
            });
        });
        const finishedValue = dbType === 'postgresdb' ? 'FALSE' : '0';
        const waitingExecutionsQuery = `
			SELECT id, ${dataColumn}
			FROM ${executionsTable}
			WHERE ${waitTillColumn} IS NOT NULL AND finished = ${finishedValue}
		`;
        await runInBatches(waitingExecutionsQuery, async (waitingExecutions) => {
            waitingExecutions.forEach(async (execution) => {
                let credentialsUpdated = false;
                const workflowData = parseJson(execution.workflowData);
                workflowData.nodes.forEach((node) => {
                    if (node.credentials) {
                        const allNodeCredentials = Object.entries(node.credentials);
                        for (const [type, creds] of allNodeCredentials) {
                            if (typeof creds === 'object') {
                                const matchingCredentials = credentialsEntities.find((credentials) => credentials.id == creds.id && credentials.type === type);
                                if (matchingCredentials) {
                                    node.credentials[type] = matchingCredentials.name;
                                }
                                else {
                                    node.credentials[type] = creds.name;
                                }
                                credentialsUpdated = true;
                            }
                        }
                    }
                });
                if (credentialsUpdated) {
                    await runQuery(`UPDATE ${executionsTable}
						 SET ${escape.columnName('workflowData')} = :data WHERE id = :id`, { data: JSON.stringify(workflowData), id: execution.id });
                }
            });
        });
        const retryableExecutions = await runQuery(`
			SELECT id, ${dataColumn}
			FROM ${executionsTable}
			WHERE ${waitTillColumn} IS NULL AND finished = ${finishedValue} AND mode != 'retry'
			ORDER BY ${escape.columnName('startedAt')} DESC
			LIMIT 200
		`);
        retryableExecutions.forEach(async (execution) => {
            let credentialsUpdated = false;
            const workflowData = parseJson(execution.workflowData);
            workflowData.nodes.forEach((node) => {
                if (node.credentials) {
                    const allNodeCredentials = Object.entries(node.credentials);
                    for (const [type, creds] of allNodeCredentials) {
                        if (typeof creds === 'object') {
                            const matchingCredentials = credentialsEntities.find((credentials) => credentials.id == creds.id && credentials.type === type);
                            if (matchingCredentials) {
                                node.credentials[type] = matchingCredentials.name;
                            }
                            else {
                                node.credentials[type] = creds.name;
                            }
                            credentialsUpdated = true;
                        }
                    }
                }
            });
            if (credentialsUpdated) {
                await runQuery(`UPDATE ${executionsTable}
					 SET ${escape.columnName('workflowData')} = :data WHERE id = :id`, { data: JSON.stringify(workflowData), id: execution.id });
            }
        });
    }
}
exports.UpdateWorkflowCredentials1630330987096 = UpdateWorkflowCredentials1630330987096;
//# sourceMappingURL=1630330987096-UpdateWorkflowCredentials.js.map