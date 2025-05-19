import type { Result } from 'n8n-workflow';
import { BuiltInsParserState } from './built-ins-parser-state';
export declare class BuiltInsParser {
    parseUsedBuiltIns(code: string): Result<BuiltInsParserState, Error>;
    private identifyBuiltInsByWalkingAst;
    private visitCallExpression;
    private visitDollarCallExpression;
    private visitDollarItemsCallExpression;
    private handlePrevNodeCall;
    private visitIdentifier;
    private isPairedItemProperty;
}
