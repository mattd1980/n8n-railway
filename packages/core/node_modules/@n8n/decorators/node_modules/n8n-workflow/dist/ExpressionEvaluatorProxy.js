"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateExpression = exports.setErrorHandler = void 0;
const tournament_1 = require("@n8n/tournament");
const ExpressionSandboxing_1 = require("./ExpressionSandboxing");
const errorHandler = () => { };
const tournamentEvaluator = new tournament_1.Tournament(errorHandler, undefined, undefined, {
    before: [],
    after: [ExpressionSandboxing_1.PrototypeSanitizer],
});
const evaluator = tournamentEvaluator.execute.bind(tournamentEvaluator);
const setErrorHandler = (handler) => {
    tournamentEvaluator.errorHandler = handler;
};
exports.setErrorHandler = setErrorHandler;
const evaluateExpression = (expr, data) => {
    return evaluator(expr, data);
};
exports.evaluateExpression = evaluateExpression;
//# sourceMappingURL=ExpressionEvaluatorProxy.js.map