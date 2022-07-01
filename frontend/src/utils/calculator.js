export function getExpressionResult() {
    return window.contract.get_expression_result();
}

export function getExpressionPostfix() {
    return window.contract.get_expression_postfix();
}

export function infixToPostfix(expression) {
    return window.contract.infix_to_postfix({expression});
}

export function solveExpression(n1) {
    return window.contract.solve_expression({n1});
}