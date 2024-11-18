class Results {
    constructor() {
        this.resultsDiv = document.getElementById('results');
        this.finalWpm = document.getElementById('finalWpm');
        this.finalAccuracy = document.getElementById('finalAccuracy');
        this.correctWords = document.getElementById('correctWords');
        this.wrongWords = document.getElementById('wrongWords');
    }

    show(wpm, accuracy, correct, wrong) {
        this.finalWpm.textContent = wpm;
        this.finalAccuracy.textContent = accuracy;
        this.correctWords.textContent = correct;
        this.wrongWords.textContent = wrong;
        this.resultsDiv.style.display = 'block';
    }

    hide() {
        this.resultsDiv.style.display = 'none';
    }
}
