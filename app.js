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
document.getElementById('capture-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = form.querySelector('button');
    const emailInput = form.querySelector('input');
    const formData = new FormData(form);

    // 1. Loading state
    btn.textContent = "CLEARING...";
    btn.style.backgroundColor = "var(--soft-yellow)";
    btn.disabled = true; // Prevents spam clicking while submitting

    // 2. Send the data to Netlify
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        // 3. Success state
        btn.textContent = "YOU'RE IN ✓";
        btn.style.backgroundColor = "var(--electric-lime)"; // or "#111111" if you prefer dark mode
        btn.style.color = "#111111"; // text color
        emailInput.value = ''; // clear the input

        // 4. The Reset Timer (Wait 3 seconds, then revert)
        setTimeout(() => {
            btn.textContent = "Start Clearing →";
            // Make sure these match your button's original default colors
            btn.style.backgroundColor = "var(--electric-lime)"; 
            btn.style.color = "#111111";
            btn.disabled = false;
        }, 3000);
    })
    .catch((error) => {
        // Error state
        btn.textContent = "ERROR. TRY AGAIN.";
        btn.disabled = false;
        console.error("Form submission error:", error);
    });
});