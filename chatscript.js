// Toggle chat visibility
function toggleChat() {
    const chatContainer = document.getElementById("chatContainer");
    const chatButton = document.getElementById("chatButton");

    if (chatContainer.style.display === "none" || !chatContainer.style.display) {
        // Show the chat container and hide the chat button
        chatContainer.style.display = "flex";
        chatButton.style.display = "none";
    } else {
        // Hide the chat container and show the chat button
        chatContainer.style.display = "none";
        chatButton.style.display = "flex";
    }
}

// Ensure chat container is hidden on page load
document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chatContainer");
    const chatButton = document.getElementById("chatButton");

    // Set initial visibility states
    chatContainer.style.display = "none"; // Hide chat container
    chatButton.style.display = "flex";    // Show chat button

    // Add a welcome message when the chat is opened for the first time
    chatButton.addEventListener("click", () => {
        const chatbox = document.getElementById("chatbox");
        if (chatbox.childElementCount === 0) {
            addMessage("Nomio", chatScripts.greeting);
        }
    });
});

// Chatbot conversational scripts
const chatScripts = {
    morningGreeting: "Good morning! ☀️ Ready to start planning an unforgettable day with Starkville Adventures?",
    afternoonGreeting: "Good afternoon! 🌞 It’s a great time to plan your next adventure. How can I help?",
    eveningGreeting: "Good evening! 🌆 Dreaming of your next adventure? Let’s start planning!",
    greeting: "Hey there, Thrill seeker! 👋 Welcome to Starkville Adventures! We're thrilled to help you create unforgettable memories. Ready to dive in?",
    fallback: "did you know Nomio came from the word nomad which means, an explorer of nature? I am still a work under progress. Could you try the whatsapp button?"
};
function playTone() {
    const responseTone = document.getElementById("responseTone");
    
    // Play the tone
    responseTone.play().catch(function(error) {
        console.log("Error playing audio: ", error);
    });
}
// Process input
function processInput() {
    const GlobetrotterInput = document.getElementById("GlobetrotterInput").value.trim();
    if (GlobetrotterInput === "") return;
    document.getElementById("GlobetrotterInput").value = "";
    addMessage("Globetrotter", GlobetrotterInput);

    showTypingIndicator();
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = generateResponse(GlobetrotterInput);
        addMessage("Nomio", botResponse);
        playResponseTone(); // Play tone when bot responds
    }, 1000);
}

function handleEnter(event) {
    if (event.key === "Enter") processInput();
}

// Generate bot response based on input
function generateResponse(input) {
    const lowerInput = input.toLowerCase();
    const currentHour = new Date().getHours();

    if (lowerInput.includes("hey") || lowerInput.includes("hello") || lowerInput.includes("hi")) {
        if (currentHour < 12) {
            return chatScripts.morningGreeting;
        } else if (currentHour < 18) {
            return chatScripts.afternoonGreeting;
        } else {
            return chatScripts.eveningGreeting;
        }
    }

    return chatScripts.fallback;
}

// Add message to chatbox with timestamp
function addMessage(sender, message) {
    const chatbox = document.getElementById("chatbox");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");
    if (sender === "Globetrotter") messageContainer.classList.add("Globetrotter-message-container");

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender === "Globetrotter" ? "Globetrotter-message" : "bot-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;

    const timestamp = document.createElement("div");
    timestamp.classList.add("timestamp");
    timestamp.innerText = getTime();

    messageElement.appendChild(timestamp);
    messageContainer.appendChild(messageElement);
    chatbox.appendChild(messageContainer);

    chatbox.scrollTop = chatbox.scrollHeight;
}

function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.id = "typingIndicator";
    typingIndicator.className = "typing-indicator";
    typingIndicator.innerText = "Nomio is typing...";
    document.getElementById("chatbox").appendChild(typingIndicator);
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) typingIndicator.remove();
}

function playResponseTone() {
    const responseTone = document.getElementById("responseTone");
    responseTone.play(); // Play the audio tone
}