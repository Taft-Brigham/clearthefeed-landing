const words = [
    { bad: "DRAMA", good: "FOCUS" },
    { bad: "DOOMSCROLLING", good: "GROWTH" },
    { bad: "NEGATIVITY", good: "CREATIVITY" },
    { bad: "COMPARISON", good: "REAL CONNECTION" }
];

const textElement = document.getElementById('dynamic-text');
let currentIndex = 0;

function animateFeed() {
    // Step 1: Show the bad word
    textElement.textContent = words[currentIndex].bad;
    textElement.className = "noise-word";
    
    // Step 2: Strike it out after 1.5 seconds
    setTimeout(() => {
        textElement.classList.add("strike");
    }, 1500);

    // Step 3: Replace it with the good word after 2.5 seconds
    setTimeout(() => {
        textElement.textContent = words[currentIndex].good;
        textElement.className = "noise-word cleared";
    }, 2500);

    // Step 4: Move to the next pair after 4.5 seconds
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        animateFeed();
    }, 4500);
}

// Start the loop
animateFeed();

// Basic form handling
document.getElementById('capture-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = "YOU'RE IN ✓";
    btn.style.backgroundColor = "var(--soft-yellow)";
});