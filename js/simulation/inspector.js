import {Symbol} from "./system/symbol.js";

export function Inspector() {
    const ID_INSPECTOR = "inspector";
    const CLASS_RULE_TABLE = "inspector-rule-table";
    const TO_DEGREES = 180 / Math.PI;
    const TITLE_AXIOM = "Axiom:";
    const TITLE_CONSTANTS = "Constants:";
    const TITLE_ANGLE = "Angle:";
    const TITLE_RULES = "Rules:";
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

    const createRuleTableAxiom = instance => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const symbols = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_AXIOM));
        symbols.appendChild(document.createTextNode(symbolsToText(instance.getSystem().getAxiom())));

        row.appendChild(title);
        row.appendChild(symbols);

        return row;
    };

    const createRuleTableConstants = instance => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const symbols = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_CONSTANTS));
        symbols.appendChild(document.createTextNode(indicesToText(instance.getSystem().getConstants())));

        row.appendChild(title);
        row.appendChild(symbols);

        return row;
    };

    const createRuleTableAngle = instance => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const value = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_ANGLE));
        value.appendChild(document.createTextNode(formatAngle(instance.getSystem().getAngle())));

        row.appendChild(title);
        row.appendChild(value);

        return row;
    };

    const createRuleTableRulesTable = instance => {
        const table = document.createElement("table");

        for (const rule of instance.getSystem().getRules()) {
            const row = document.createElement("tr");
            const lhs = document.createElement("td");
            const rhs = document.createElement("td");

            lhs.appendChild(document.createTextNode(symbolsToText(rule.getSymbols()) + " " + ARROW));
            rhs.appendChild(document.createTextNode(symbolsToText(rule.getResult())));

            row.appendChild(lhs);
            row.appendChild(rhs);

            table.appendChild(row);
        }

        return table;
    };

    const createRuleTableRules = instance => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const rules = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_RULES));
        rules.appendChild(createRuleTableRulesTable(instance));

        row.appendChild(title);
        row.appendChild(rules);

        return row;
    };

    const createRuleTableSymbols = instance => {
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const symbols = document.createElement("td");

        title.appendChild(document.createTextNode(TITLE_SYMBOLS));
        symbols.appendChild(document.createTextNode(symbolsToText(instance.getSymbols())));

        row.appendChild(title);
        row.appendChild(symbols);

        return row;
    };

    const createRuleTable = instance => {
        const table = document.createElement("table");

        table.className = CLASS_RULE_TABLE;

        table.appendChild(createRuleTableAxiom(instance));
        table.appendChild(createRuleTableConstants(instance));
        table.appendChild(createRuleTableAngle(instance));
        table.appendChild(createRuleTableRules(instance));
        table.appendChild(createRuleTableSymbols(instance));

        return table;
    };

    const createReport = instance => {
        element.appendChild(createRuleTable(instance));
    };

    this.inspect = instance => {
        element.innerHTML = "";

        if (instance === null)
            return;

        createReport(instance);
    };

    const element = document.getElementById(ID_INSPECTOR);
}