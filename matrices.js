// matrices.js - ሙሉ 600 የቢንጎ ማትሪክስ
const FIXED_BINGO_MATRICES = {};

// ለእያንዳንዱ ካርድ ልዩ ማትሪክስ የሚፈጥር ተግባር
function generateUniqueMatrix(seed) {
    // ለተለያዩ ካርዶች የተለያዩ ቁጥሮች ለማግኘት
    let rng = function(s) {
        return function() {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    };
    
    let rand = rng(seed * 9973 + 7919);
    let matrix = [];
    let usedNumbers = new Set();
    
    let ranges = [
        {min: 1, max: 15},   // B
        {min: 16, max: 30},  // I
        {min: 31, max: 45},  // N
        {min: 46, max: 60},  // G
        {min: 61, max: 75}   // O
    ];
    
    // በመጀመሪያ ለእያንዳንዱ አምድ ቁጥሮች ይሰብስቡ
    let columns = [];
    for (let col = 0; col < 5; col++) {
        let colNums = [];
        let range = ranges[col];
        let available = [];
        for (let n = range.min; n <= range.max; n++) {
            available.push(n);
        }
        // በዘፈቀደ ያደራጁ
        for (let i = available.length - 1; i > 0; i--) {
            let j = Math.floor(rand() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }
        // የመጀመሪያዎቹን 5 ይውሰዱ
        for (let i = 0; i < 5; i++) {
            colNums.push(available[i]);
        }
        columns.push(colNums);
    }
    
    // ማትሪክስ ይፍጠሩ (ረድፎችን በመጠቀም)
    for (let row = 0; row < 5; row++) {
        let rowData = [];
        for (let col = 0; col < 5; col++) {
            if (row === 2 && col === 2) {
                rowData.push("FREE");
            } else {
                rowData.push(columns[col][row]);
            }
        }
        matrix.push(rowData);
    }
    
    return matrix;
}

// 600 ማትሪክስ ይፍጠሩ
for (let i = 1; i <= 600; i++) {
    FIXED_BINGO_MATRICES[i] = generateUniqueMatrix(i);
}

// ✅ በ index.html ውስጥ ጥቅም ላይ የሚውለው ተግባር - ከ1-600 ካርዶችን ይደግፋል
function getMatrixForCard(cardNum) {
    if (cardNum < 1 || cardNum > 600) {
        throw new Error(`❌ Invalid card number: ${cardNum}. Must be between 1 and 600.`);
    }
    
    let matrix = FIXED_BINGO_MATRICES[cardNum];
    
    if (!matrix) {
        throw new Error(`❌ No fixed matrix found for card number: ${cardNum}. Please ensure all 600 matrices are defined.`);
    }
    
    return matrix;
}

// ለውጭ አገልግሎት ይጋለጡ
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FIXED_BINGO_MATRICES, getMatrixForCard };
}

// የማረጋገጫ መልዕክት
console.log('✅ 600 Bingo matrices loaded successfully!');
console.log('📊 Total matrices:', Object.keys(FIXED_BINGO_MATRICES).length);
