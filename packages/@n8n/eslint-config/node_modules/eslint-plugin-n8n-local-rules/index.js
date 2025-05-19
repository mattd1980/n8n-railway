/* eslint-env node */
'use strict';

const path = require('path');
const { findUp } = require('./findUp');

const found = findUp('.npmrc', __dirname);
const rootDir = path.dirname(found);

const localRulesPath = path.resolve(rootDir, 'packages', '@n8n', 'eslint-config', 'local-rules.js')
const rules = require(localRulesPath);

if (!rules) {
	throw new Error(`Failed to find local rules file at: ${localRulesPath}`)
}

module.exports = {
  rules: rules,
};
