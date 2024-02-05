const parseExpression = expression => {
    const [left, operator, right] = expression.split('');
    return { left: parseInt(left), operator, right: parseInt(right) };
};

const getOperation = operator => {
    switch (operator) {
        case '+':
            return (left, right) => left + right;
        case '-':
            return (left, right) => left - right;
        case '*':
            return (left, right) => left * right;
        case '/':
            return (left, right) => left / right;
        case '%':
            return (left, right) => left % right;
        case '^':
            return (left, right) => Math.pow(left, right);
        default:
            return () => 'Unsupported operation';
    }
};

const evaluateAndExecute = expression => {
    const { left, operator, right } = parseExpression(expression);
    let operationFunction = getOperation(operator);
    return operationFunction(left, right);
};

// Test cases
const expressions = ['4+2', '5*7', '6-1', '9/2', '8%3', '2^8'];
expressions.forEach(expression => {
    console.log(`${expression} = ${evaluateAndExecute(expression)}`);
});

