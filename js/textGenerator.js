class TextGenerator {
    constructor() {
        this.shortTexts = [
            "The quick brown fox jumps over the lazy dog.",
            "To be or not to be, that is the question.",
            "All that glitters is not gold."
        ];

        this.mediumTexts = [
            "Success is not final, failure is not fatal: it is the courage to continue that counts. Winston Churchill's words remind us that perseverance is key to achievement.",
            "Life is like riding a bicycle. To keep your balance, you must keep moving forward. Einstein's simple yet profound observation about life's momentum.",
            "In three words I can sum up everything I've learned about life: it goes on. Robert Frost's philosophical take on life's continuous nature."
        ];

        this.longTexts = [
            "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it. And, like any great relationship, it just gets better and better as the years roll on.",
            "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
            "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. The future belongs to those who believe in the beauty of their dreams."
        ];

        this.paragraphs = [
            "The sun was setting behind the mountains, casting long shadows across the valley below. A gentle breeze rustled through the trees, carrying with it the sweet scent of wildflowers. In the distance, a lone wolf howled, its mournful cry echoing through the wilderness. The stars were beginning to appear in the darkening sky, twinkling like diamonds scattered across black velvet.",
            "Technology continues to reshape our world at an unprecedented pace. From artificial intelligence to renewable energy, innovations are transforming how we live, work, and interact. As we move forward, it becomes increasingly important to balance progress with sustainability, ensuring that our advancement doesn't come at the cost of our planet's future.",
            "The art of cooking is a journey of discovery, combining creativity with precision. Each ingredient tells its own story, and when brought together in harmony, they create something greater than the sum of their parts. The sizzle of a pan, the aroma of fresh herbs, and the visual appeal of a well-plated dish all contribute to the complete culinary experience."
        ];
    }

    getRandomText(length = 'medium') {
        let sourceArray;
        switch (length) {
            case 'short':
                sourceArray = this.shortTexts;
                break;
            case 'medium':
                sourceArray = this.mediumTexts;
                break;
            case 'long':
                sourceArray = this.longTexts;
                break;
            case 'paragraph':
                sourceArray = this.paragraphs;
                break;
            default:
                sourceArray = this.mediumTexts;
        }
        
        const randomIndex = Math.floor(Math.random() * sourceArray.length);
        return sourceArray[randomIndex];
    }

    calculateAccuracy(original, typed) {
        const originalWords = original.trim().split(' ');
        const typedWords = typed.trim().split(' ');
        let correct = 0;

        typedWords.forEach((word, i) => {
            if (word === originalWords[i]) {
                correct++;
            }
        });

        return Math.floor((correct / originalWords.length) * 100);
    }
}
