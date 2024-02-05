const processString = (inputStr, decoratorFunc) => decoratorFunc(inputStr);

const expression1 = processString('supercalifragilisticexpialidocious', str => {
    let segments = [];
    let currentSegment = '';

    for (let char of str) {
        if (char === 'c' && currentSegment !== '') {
            segments.push(currentSegment);
            currentSegment = 'c';
        } else {
            currentSegment += char;
        }
    }
    if (currentSegment !== '') {
        segments.push(currentSegment);
    }

    return segments;
});

const expression2 = processString('supercalifragilisticexpialidocious', str => {
    const modifiedString = str.replace(/a/g, 'A');
    const numberReplaced = (modifiedString.match(/A/g) || []).length;
    return {
        originalString: str,
        modifiedString,
        numberReplaced,
        length: modifiedString.length,
    };
});

console.log(`\n`);
console.log(`Expression 1 Result:`); 
console.log(expression1);

console.log(`\n`);
console.log(`Expression 2 Result:`);
console.table(expression2);

