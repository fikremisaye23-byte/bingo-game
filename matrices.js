function updateSelectedCardsPreview() {
    let container = document.getElementById('selectedCardsPreviewContainer');
    if (!container) return;
    
    if (selectedCards.length === 0) {
        container.innerHTML = `<div style="grid-column: 1 / -1; font-size: 13px; color: #64748b; text-align: center; width: 100%; padding: 4px;">ካርቴላ ለመምረጥ ከላይ ያሉትን ቁጥሮች ይጫኑ (ከፍተኛ 2)</div>`;
        return;
    }

    let html = '';
    selectedCards.forEach(cardNum => {
        // ✅ ከቋሚ dataset ወይም ከተያዙ ካርዶች ውስጥ matrix አምጣ
        let matrix = null;
        if (takenCardsData[cardNum] && takenCardsData[cardNum].matrix) {
            matrix = takenCardsData[cardNum].matrix;
        } else {
            // ✅ ካልተያዘ ከቋሚ dataset አምጣ
            matrix = getMatrixForCard(cardNum);
        }
        
        // ❌ ካልተገኘ አዲስ አትፍጠር
        if (!matrix) {
            html += `
            <div class="bingo-card-container">
                <div style="font-size:10px; margin-bottom:2px; color:var(--orange-color); font-weight: bold; text-align: center;">Cartela No : ${cardNum}</div>
                <div style="text-align:center; color:#64748b; padding:10px;">⏳ በመጠበቅ ላይ...</div>
            </div>`;
            return;
        }

        // ✅ ትክክለኛውን matrix አሳይ
        html += `
        <div class="bingo-card-container">
            <div style="font-size:10px; margin-bottom:2px; color:var(--orange-color); font-weight: bold; text-align: center;">Cartela No : ${cardNum}</div>
            <div class="bingo-grid">
                <div class="bingo-header-cell">B</div>
                <div class="bingo-header-cell">I</div>
                <div class="bingo-header-cell">N</div>
                <div class="bingo-header-cell">G</div>
                <div class="bingo-header-cell">O</div>`;

        for(let r = 0; r < 5; r++) {
            for(let c = 0; c < 5; c++) {
                let val = matrix[r][c];
                let isFree = (val === 'FREE');
                let cellClass = isFree ? 'bingo-cell free' : 'bingo-cell';
                if(isFree) val = '✨';
                html += `<div class="${cellClass}">${val}</div>`;
            }
        }
        html += `</div></div>`;
    });
    container.innerHTML = html;
}
