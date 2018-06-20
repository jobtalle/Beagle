import {Symbol} from "./system/symbol.js";

export function Inspector() {
    const ID_INSPECTOR = "inspector";
    const CLASS_RULE_TABLE = "inspector-rule-table";
    const TO_DEGREES = 180 / Math.PI;
    const TITLE_AXIOM = "Axiom:";
    const TITLE_CONSTANTS = "Constants:";
    const TITLE_ANGLE = "Angle:";
    const TITLE_RULES = "Rules:";
    const TITLE_DIMENSIONS = "Dimensions:";
    const TITLE_SCORE = "Score:";
    const TITLE_SYMBOLS = "Symbols:";
    const ARROW = String.fromCharCode(8594);

    const indexToText = index => {
        switch(index) {
            case Symbol.BRANCH_OPEN:
                return "[";
            case Symbol.BRANCH_CLOSE:
                return "]";
            case Symbol.TURN_RIGHT:
                return "+";
            case Symbol.TURN_LEFT:
                return "-";
            default:
                return String.fromCharCode('A'.charCodeAt(0) + (index - Symbol.VAR_FIRST));
        }
    };

    const indicesToText = indices => {
        let text = "";

        for (const index of indices)
            text += indexToText(index);

        return text;
    };

    const symbolsToText = symbols => {
        let text = "";

        for (const symbol of symbols)
            text += indexToText(symbol.getIndex());

        return text;
    };

    const formatAngle = angle => {
        return (angle * TO_DEGREES).toFixed(2).toString() + String.fromCharCode(176);
    };

    const formatDimensions = slot => {
        return slot.getInstance().getShape().getWidth().toFixed(2).toString() + "m x " +
            slot.getInstance().getShape().getHeight().toFixed(2).toString() + "m";
    };

    const formatScore = score => {
        return score.toFixed(4);
    };

    const createRuleTableAxiom = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const symbols = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_AXIOM));
        symbols.appendChild(document.createTextNode(symbolsToText(slot.getInstance().getSystem().getAxiom())));

        row.appendChild(title);
        row.appendChild(symbols);

        return row;
    };

    const createRuleTableConstants = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const symbols = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_CONSTANTS));
        symbols.appendChild(document.createTextNode(indicesToText(slot.getInstance().getSystem().getConstants())));

        row.appendChild(title);
        row.appendChild(symbols);

        return row;
    };

    const createRuleTableAngle = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const value = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_ANGLE));
        value.appendChild(document.createTextNode(formatAngle(slot.getInstance().getSystem().getAngle())));

        row.appendChild(title);
        row.appendChild(value);

        return row;
    };

    const createRuleTableRulesTable = slot => {
        const table = document.createElement("table");

        for (const rule of slot.getInstance().getSystem().getRules()) {
            const row = document.createElement("tr");
            const lhs = document.createElement("td");
            const rhs = document.createElement("td");

            lhs.appendChild(document.createTextNode(symbolsToText(rule.getCondition()) + " " + ARROW));
            rhs.appendChild(document.createTextNode(symbolsToText(rule.getResult())));

            row.appendChild(lhs);
            row.appendChild(rhs);

            table.appendChild(row);
        }

        return table;
    };

    const createRuleTableRules = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const rules = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_RULES));
        rules.appendChild(createRuleTableRulesTable(slot));

        row.appendChild(title);
        row.appendChild(rules);

        return row;
    };

    const createRuleTableDimensions = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const dimensions = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_DIMENSIONS));
        dimensions.appendChild(document.createTextNode(formatDimensions(slot)));

        row.appendChild(title);
        row.appendChild(dimensions);

        return row;
    };

    const createRuleTableScore = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const score = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_SCORE));
        score.appendChild(document.createTextNode(formatScore(slot.getScore())));

        row.appendChild(title);
        row.appendChild(score);

        return row;
    };

    const createRuleTableSymbols = slot => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const symbols = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_SYMBOLS));
        symbols.appendChild(document.createTextNode(symbolsToText(slot.getInstance().getSymbols())));

        row.appendChild(title);
        row.appendChild(symbols);

        return row;
    };

    const createRuleTable = slot => {
        const table = document.createElement("table");

        table.className = CLASS_RULE_TABLE;

        table.appendChild(createRuleTableAxiom(slot));
        table.appendChild(createRuleTableConstants(slot));
        table.appendChild(createRuleTableAngle(slot));
        table.appendChild(createRuleTableRules(slot));
        table.appendChild(createRuleTableDimensions(slot));
        table.appendChild(createRuleTableScore(slot));
        table.appendChild(createRuleTableSymbols(slot));

        return table;
    };

    const createReport = slot => {
        element.appendChild(createRuleTable(slot));
    };

    this.inspect = slot => {
        element.innerHTML = "";

        if (slot === null)
            return;

        createReport(slot);
    };

    const element = document.getElementById(ID_INSPECTOR);
}