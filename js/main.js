class TypingTest {
    constructor() {
        this.textGenerator = new TextGenerator();
        this.results = new Results();
        
        // Get DOM elements
        this.textDisplay = document.getElementById('textDisplay');
        this.textInput = document.getElementById('textInput');
        this.startBtn = document.getElementById('startBtn');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.timerSelect = document.getElementById('timerSelect');
        this.textLengthSelect = document.getElementById('textLengthSelect');
        
        // Initialize timer with default value
        this.timer = new Timer(
            parseInt(this.timerSelect.value),
            document.getElementById('timer')
        );
        
        this.currentText = '';
        this.startTime = 0;
        this.bindEvents();
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTest());
        this.textInput.addEventListener('input', () => this.updateTest());
        
        // Add event listeners for settings changes
        this.timerSelect.addEventListener('change', () => {
            this.timer = new Timer(
                parseInt(this.timerSelect.value),
                document.getElementById('timer')
            );
            this.timer.reset();
        });
    }

    startTest() {
        this.results.hide();
        this.currentText = this.textGenerator.getRandomText(this.textLengthSelect.value);
        this.textDisplay.textContent = this.currentText;
        this.textInput.value = '';
        this.textInput.disabled = false;
        this.textInput.focus();
        this.startTime = Date.now();
        
        // Disable settings during test
        this.timerSelect.disabled = true;
        this.textLengthSelect.disabled = true;
        
        this.timer.reset();
        this.timer.start(() => this.endTest());
        
        this.startBtn.disabled = true;
    }

    updateTest() {
        const timePassed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        const wordsTyped = this.textInput.value.trim().split(' ').length;
        const wpm = Math.round(wordsTyped / timePassed);
        const accuracy = this.textGenerator.calculateAccuracy(
            this.currentText,
            this.textInput.value
        );

        this.wpmDisplay.textContent = wpm;
        this.accuracyDisplay.textContent = accuracy;
    }

    endTest() {
        this.textInput.disabled = true;
        this.startBtn.disabled = false;
        
        // Re-enable settings after test
        this.timerSelect.disabled = false;
        this.textLengthSelect.disabled = false;
        
        const finalWpm = parseInt(this.wpmDisplay.textContent);
        const finalAccuracy = parseInt(this.accuracyDisplay.textContent);
        const typedWords = this.textInput.value.trim().split(' ');
        const originalWords = this.currentText.trim().split(' ');
        
        let correct = 0;
        typedWords.forEach((word, i) => {
            if (word === originalWords[i]) correct++;
        });
        
        const wrong = typedWords.length - correct;
        
        this.results.show(finalWpm, finalAccuracy, correct, wrong);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TypingTest();
});

// Dark mode toggle functionality
const themeButton = document.getElementById('themeButton');
const themeIcon = themeButton.querySelector('.theme-icon');
const themeText = themeButton.querySelector('.theme-text');
const currentTheme = localStorage.getItem('theme');

// Set initial theme
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme === 'dark');
}

themeButton.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    updateThemeButton(!isDark);
});

function updateThemeButton(isDark) {
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}
