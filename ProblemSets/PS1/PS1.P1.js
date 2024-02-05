const reverseAlphabeticalOrder = str => {
    return str.replace(/[^a-zA-Z]/g, '').split('').sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase())).join('');
}

// Test cases
console.log(reverseAlphabeticalOrder('exioi')); // Expected output: 'xoiie'
console.log(reverseAlphabeticalOrder('Full-Stack Development!123')); // Expected output: 'vuttSponmlllkFeeeDca'
console.log(reverseAlphabeticalOrder('Hello, World!')); // Expected output: 'WroolllHed'
console.log(reverseAlphabeticalOrder('123$%^')); // Expected output: ''