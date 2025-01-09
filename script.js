const paragraphs = [
    "The beauty of nature lies in its diversity. From the towering mountains to the serene oceans, every element contributes to the planet's magnificence. Protecting this natural heritage is a responsibility we all share. The forests provide us with oxygen, the rivers nourish our crops, and the wildlife ensures balance in the ecosystem. It is our duty to preserve this for future generations. Without proper care, these natural wonders could fade away, leaving the Earth barren and lifeless. Together, we must act and protect the environment before it's too late.",
    "Innovation is the cornerstone of progress. By embracing creativity and technology, we can solve global challenges and pave the way for a brighter future. The key lies in perseverance and collaboration. With the rise of artificial intelligence, renewable energy, and advanced medicine, we are shaping the future with groundbreaking solutions. Innovation fuels economic growth, enhances quality of life, and connects us to new possibilities. However, it requires dedication, an open mind, and the courage to take risks in order to unlock its full potential.",
    "Reading is a journey that allows us to explore different worlds. Each book opens a door to new perspectives and experiences, enriching our minds and broadening our horizons. Whether it’s a fictional novel or a non-fiction work, reading expands our vocabulary, improves focus, and stimulates our creativity. The more we read, the more we understand the complexities of life and the diversity of human experiences. It’s a simple yet powerful tool that can help us develop empathy, challenge our beliefs, and inspire us to grow into better individuals.",
    "The strength of a community lies in its unity. When people come together to support and uplift one another, they create an environment where everyone can thrive and succeed. A community that fosters compassion, teamwork, and mutual respect ensures that no one is left behind. By working together, we can address societal issues, build strong connections, and improve the quality of life for all members. It’s through collaboration that we can solve challenges and create a world that is inclusive and fair for all.",
    "Time is the most precious resource we have. Every moment is an opportunity to learn, grow, and create memories. Use it wisely and cherish the experiences it brings. Time waits for no one, and once it’s gone, it can never be reclaimed. By managing time effectively, we can accomplish more, reduce stress, and maintain a healthy work-life balance. It is important to prioritize tasks that align with our goals and values so that we make the most of every second. Life is short, so make sure to spend it in a way that brings fulfillment and purpose.",
    "The human mind is a powerful tool. With determination and focus, we can achieve extraordinary feats. The limits we face are often the ones we place upon ourselves. Through self-discipline, learning, and persistence, we can overcome obstacles and achieve success in any endeavor. The key to unlocking the full potential of our minds is believing in ourselves and taking action. Our thoughts shape our reality, and with the right mindset, we can transform challenges into opportunities for growth and personal development.",
    "Adversity is a teacher in disguise. The challenges we face build resilience and character, shaping us into stronger and more compassionate individuals. Life’s difficulties may seem overwhelming at first, but they often lead to personal growth and valuable lessons. By facing adversity head-on, we learn to appreciate the good times and develop a deeper understanding of ourselves and others. Every setback offers an opportunity to rise again, wiser and more determined. Embrace challenges as a chance to grow and become a better version of yourself.",
    "The joy of discovery is unparalleled. Whether it’s uncovering a hidden talent or exploring a new place, the thrill of learning and experiencing something new is a gift to be cherished. Discovery sparks curiosity, broadens our understanding of the world, and drives us to continuously seek knowledge. It inspires innovation and creativity, pushing us to think outside the box and explore new possibilities. Whether through travel, education, or personal experiences, discovery enriches our lives and helps us grow as individuals.",
    "Kindness is a universal language. A simple act of compassion can brighten someone's day and create ripples of positivity that extend far beyond the moment. Kindness brings people together, builds trust, and fosters goodwill. It has the power to heal wounds, ease pain, and inspire others to pay it forward. In a world that can sometimes feel divided, kindness serves as a reminder that we are all human, connected by the same basic needs and emotions. It is free to give and can make a lasting impact on both the giver and the receiver.",
    "Success is not defined by the destination but by the journey. The lessons learned and the experiences gained along the way are what truly matter in the end. Success is about perseverance, growth, and resilience in the face of obstacles. It is about pushing forward even when the road gets tough, and remaining true to your values. Along the journey, we develop the skills, relationships, and mindset necessary to thrive. True success comes when we can look back with pride at the effort we put in and the progress we’ve made, regardless of the final outcome."
];


const textSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

const generateText = () => {
    quote = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    const arr = quote.split("").map(value => `<span class='quote-chars'>${value}</span>`);
    textSection.innerHTML = arr.join("");
};

userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split("");

    quoteChars.forEach((char, index) => {
        if (char.innerText === userInputChars[index]) {
            char.classList.add("success");
            char.classList.remove("fail");
        } else if (userInputChars[index] == null) {
            char.classList.remove("success");
            char.classList.remove("fail");
        } else {
            if (!char.classList.contains("fail")) {
                mistakes += 1;
                char.classList.add("fail");
            }
        }
    });

    document.getElementById("mistakes").innerText = mistakes;

    if (quoteChars.every(element => element.classList.contains("success"))) {
        displayResult();
    }
});

const updateTimer = () => {
    if (time === 0) {
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
};

const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    clearInterval(timer);
    document.querySelector(".result").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = time !== 0 ? (60 - time) / 60 : 1;
    document.getElementById("wpm").innerText =
        ((userInput.value.length / 5) / timeTaken).toFixed(2) + " wpm";
    document.getElementById("accuracy").innerText =
        Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + " %";
};

const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    userInput.value = "";
    textSection.innerHTML = "";
    generateText();
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};
