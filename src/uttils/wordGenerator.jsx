function generateWords() {
    const keys = ["a", "s", "d", "f", "j", "k", "l", ";"];
    const numWords = Math.floor(Math.random() * 2) + 2; // generate 2-3 words
    let words = "";
    for (let i = 0; i < numWords; i++) {
        const wordLength = Math.floor(Math.random() * 3) + 3; // generate 3-5 letters per word
        for (let j = 0; j < wordLength; j++) {
            const randomIndex = Math.floor(Math.random() * keys.length);
            words += keys[randomIndex];
        }
        words += " ";
    }
    return words.trim(); // Trim extra whitespace at the end
}

export default generateWords