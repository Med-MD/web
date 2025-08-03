// Global variables
let currentTheme = "default"
let stars = []
let currentQuiz = []
let currentQuestionIndex = 0
let selectedAnswer = null
let score = 0
let userAnswers = []
let answeredQuestions = []
let showQuizResults = false

// Hardcoded credentials
const validUsers = {
    "Akash": "GorillazIsAwesome",
    "Lynn": "TakeYourTime",
    "Kat": "IntelligenceChasesYou"
};

// Protect teacher page
document.addEventListener("DOMContentLoaded", () => {
    const isTeachPage = window.location.pathname.includes("teach.html");
    const loggedInUser = localStorage.getItem("medmdLoggedInUser");

    if (isTeachPage) {
        if (!loggedInUser || !["Akash", "Lynn", "Kat"].includes(loggedInUser)) {
            // Not logged in or not a teacher → redirect to sign in
            window.location.href = "signin.html";
        }
    }
});



// Quiz Questions Pool
const quizQuestions = [
  // Week 1 - Intro to Human Body (6 questions)
  {
    question: "How many bones are in the adult human body?",
    options: ["206", "208", "210", "204"],
    correct: 0,
    difficulty: "Easy",
    week: "Week 1",
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 1",
  },
  {
    question: "Which body system includes bones and muscles?",
    options: ["Circulatory", "Musculoskeletal", "Nervous", "Digestive"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 1",
  },
  {
    question: "What is the basic unit of life?",
    options: ["Tissue", "Organ", "Cell", "System"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 1",
  },
  {
    question: "Which term describes the study of body structure?",
    options: ["Physiology", "Anatomy", "Biology", "Pathology"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 1",
  },
  {
    question: "How many organ systems are in the human body?",
    options: ["9", "10", "11", "12"],
    correct: 2,
    difficulty: "Hard",
    week: "Week 1",
  },

  // Week 2 - Circulation and Respiration (7 questions)
  {
    question: "What is the main function of red blood cells?",
    options: ["Fight infection", "Carry oxygen", "Clot blood", "Digest food"],
    correct: 1,
    difficulty: "Easy",
    week: "Week 2",
  },
  {
    question: "How many chambers does the human heart have?",
    options: ["2", "3", "4", "5"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 2",
  },
  {
    question: "Which gas do we breathe out?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 2",
  },
  {
    question: "What is the normal resting heart rate for adults?",
    options: ["40-60 bpm", "60-100 bpm", "100-120 bpm", "120-140 bpm"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 2",
  },
  {
    question: "Which blood vessels carry blood away from the heart?",
    options: ["Veins", "Arteries", "Capillaries", "Venules"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 2",
  },
  {
    question: "What is the main muscle used for breathing?",
    options: ["Intercostals", "Diaphragm", "Pectorals", "Abdominals"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 2",
  },
  {
    question: "How many lobes does the right lung have?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    difficulty: "Hard",
    week: "Week 2",
  },

  // Week 3 - Nutrition and Digestion (6 questions)
  {
    question: "Where does digestion begin?",
    options: ["Stomach", "Small intestine", "Mouth", "Esophagus"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 3",
  },
  {
    question: "What is the longest part of the digestive system?",
    options: ["Large intestine", "Small intestine", "Esophagus", "Stomach"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 3",
  },
  {
    question: "Which nutrient is the body's main source of energy?",
    options: ["Proteins", "Fats", "Carbohydrates", "Vitamins"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 3",
  },
  {
    question: "What enzyme in saliva helps break down starch?",
    options: ["Pepsin", "Amylase", "Lipase", "Trypsin"],
    correct: 1,
    difficulty: "Hard",
    week: "Week 3",
  },
  {
    question: "Which organ produces bile?",
    options: ["Pancreas", "Liver", "Gallbladder", "Stomach"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 3",
  },
  {
    question: "How long is the small intestine approximately?",
    options: ["10 feet", "15 feet", "20 feet", "25 feet"],
    correct: 2,
    difficulty: "Hard",
    week: "Week 3",
  },

  // Week 4 - Movement and Support (6 questions)
  {
    question: "What connects muscles to bones?",
    options: ["Ligaments", "Tendons", "Cartilage", "Joints"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 4",
  },
  {
    question: "What is the strongest bone in the human body?",
    options: ["Skull", "Femur", "Tibia", "Humerus"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 4",
  },
  {
    question: "How many muscles are in the human body approximately?",
    options: ["400", "500", "600", "700"],
    correct: 2,
    difficulty: "Hard",
    week: "Week 4",
  },
  {
    question: "What connects bone to bone?",
    options: ["Tendons", "Ligaments", "Cartilage", "Muscles"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 4",
  },
  {
    question: "Which type of muscle is found in the heart?",
    options: ["Skeletal", "Smooth", "Cardiac", "Voluntary"],
    correct: 2,
    difficulty: "Medium",
    week: "Week 4",
  },
  {
    question: "What is the smallest bone in the human body?",
    options: ["Stapes", "Malleus", "Incus", "Hyoid"],
    correct: 0,
    difficulty: "Hard",
    week: "Week 4",
  },

  // Week 5 - Brain and Communication (7 questions)
  {
    question: "What is the control center of the nervous system?",
    options: ["Heart", "Brain", "Spinal cord", "Liver"],
    correct: 1,
    difficulty: "Easy",
    week: "Week 5",
  },
  {
    question: "How many main parts does the brain have?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 5",
  },
  {
    question: "What protects the brain?",
    options: ["Ribs", "Skull", "Spine", "Muscles"],
    correct: 1,
    difficulty: "Easy",
    week: "Week 5",
  },
  {
    question: "Which part of the brain controls balance?",
    options: ["Cerebrum", "Cerebellum", "Brain stem", "Frontal lobe"],
    correct: 1,
    difficulty: "Hard",
    week: "Week 5",
  },
  {
    question: "What are nerve cells called?",
    options: ["Neurons", "Dendrites", "Axons", "Synapses"],
    correct: 0,
    difficulty: "Medium",
    week: "Week 5",
  },
  {
    question: "Which part of the brain controls breathing?",
    options: ["Cerebrum", "Cerebellum", "Brain stem", "Temporal lobe"],
    correct: 2,
    difficulty: "Hard",
    week: "Week 5",
  },
  {
    question: "How fast do nerve impulses travel?",
    options: ["100 mph", "200 mph", "300 mph", "400 mph"],
    correct: 2,
    difficulty: "Hard",
    week: "Week 5",
  },

  // Week 6 - Growth and Development (6 questions)
  {
    question: "Which gland is known as the 'master gland'?",
    options: ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
    correct: 2,
    difficulty: "Medium",
    week: "Week 6",
  },
  {
    question: "What hormone helps regulate blood sugar?",
    options: ["Insulin", "Adrenaline", "Growth hormone", "Cortisol"],
    correct: 0,
    difficulty: "Medium",
    week: "Week 6",
  },
  {
    question: "During which stage do humans grow the fastest?",
    options: ["Childhood", "Adolescence", "Infancy", "Adulthood"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 6",
  },
  {
    question: "Which hormone is responsible for growth?",
    options: ["Insulin", "Growth hormone", "Thyroid hormone", "Cortisol"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 6",
  },
  {
    question: "What controls the release of hormones?",
    options: ["Nervous system", "Endocrine system", "Both A and B", "Circulatory system"],
    correct: 2,
    difficulty: "Hard",
    week: "Week 6",
  },
  {
    question: "Which gland produces adrenaline?",
    options: ["Pituitary", "Thyroid", "Adrenal", "Pancreas"],
    correct: 2,
    difficulty: "Medium",
    week: "Week 6",
  },

  // Week 7 - Immune Response (6 questions)
  {
    question: "What is the body's first line of defense against germs?",
    options: ["White blood cells", "Antibodies", "Skin", "Stomach acid"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 7",
  },
  {
    question: "Which cells fight infections in the body?",
    options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
    correct: 1,
    difficulty: "Easy",
    week: "Week 7",
  },
  {
    question: "What do vaccines help the body develop?",
    options: ["Immunity", "Strength", "Energy", "Growth"],
    correct: 0,
    difficulty: "Medium",
    week: "Week 7",
  },
  {
    question: "What are antibodies?",
    options: ["Proteins that fight germs", "Types of white blood cells", "Skin cells", "Blood vessels"],
    correct: 0,
    difficulty: "Medium",
    week: "Week 7",
  },
  {
    question: "Which organ filters toxins from blood?",
    options: ["Kidney", "Liver", "Spleen", "Lungs"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 7",
  },
  {
    question: "What is the largest lymphatic organ?",
    options: ["Thymus", "Spleen", "Tonsils", "Lymph nodes"],
    correct: 1,
    difficulty: "Hard",
    week: "Week 7",
  },

  // Week 8 - Health and Wellness (5 questions)
  {
    question: "What is homeostasis?",
    options: ["Body growth", "Body balance", "Body movement", "Body repair"],
    correct: 1,
    difficulty: "Medium",
    week: "Week 8",
  },
  {
    question: "How many hours of sleep do children need per night?",
    options: ["6-8 hours", "8-10 hours", "9-11 hours", "10-12 hours"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 8",
  },
  {
    question: "What is the normal body temperature?",
    options: ["96.8°F", "97.8°F", "98.6°F", "99.6°F"],
    correct: 2,
    difficulty: "Easy",
    week: "Week 8",
  },
  {
    question: "Which vitamin is produced by sunlight exposure?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correct: 2,
    difficulty: "Medium",
    week: "Week 8",
  },
  {
    question: "What does a stethoscope measure?",
    options: ["Blood pressure", "Heart sounds", "Temperature", "Pulse rate"],
    correct: 1,
    difficulty: "Easy",
    week: "Week 8",
  },
]

// Team member data
const teamMembers = {
  akash: {
    name: "Akash Saran",
    role: "Co-Founder/Teacher",
    email: "akashsaran.ssp@gmail.com",
    image: null,
    description:
      "Growing up in a medical family, I've been exposed to healthcare and medical instruments, sparking my passion for science. I aim to inspire young minds to explore medicine, nurture their curiosity in these fields, and foster a new generation of healthcare professionals. Through MedMD, I hope to bridge the gap between complex medical concepts and accessible education for young learners.",
  },
  cailyn: {
    name: "Cailyn Farrell",
    role: "Co-Founder/Teacher",
    email: "cailyn2787@gmail.com",
    image: "images/CailynFAbout.png",
    description:
      "As a passionate student with aspirations in medicine, I saw firsthand how limited medical and health-care related education is to our youth. Helping found MedMD, I hope to inspire the next generation to hold interest in medicine and STEM! My goal is to make complex medical concepts accessible and engaging for young minds, fostering curiosity and passion for healthcare careers.",
  },
  katherine: {
    name: "Katherine Xu",
    role: "Co-Founder/Teacher",
    email: "katherine.xu.922@gmail.com",
    image: "images/KatherineXuAbout.png",
    description:
      "When I was younger, I was fascinated by models of the brain. The operation of the human body was then something that continued to pique my interest, up until now. Exposure to the medical field, even for a brief moment, has set the direction that I want in life and has determined my goals. As a result, I want to assist passionate children just like me a few years ago to discover their interests and begin an investigation of a system that is well-researched, yet still not fully understood until this day.",
  },
  nicole: {
    name: "Nicole Sabova",
    role: "Teacher",
    email: null,
    image: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
}

// Organ data
const organData = {
  heart: {
    name: "Heart",
    system: "Circulatory System",
    icon: "fas fa-heart",
    description:
      "The heart is a muscular organ that pumps blood throughout your body. It has four chambers and beats about 100,000 times per day, delivering oxygen and nutrients to every cell in your body.",
  },
  lungs: {
    name: "Lungs",
    system: "Respiratory System",
    icon: "fas fa-wind",
    description:
      "The lungs are spongy organs that allow you to breathe. They take in oxygen from the air and remove carbon dioxide from your blood. You have two lungs, and they contain millions of tiny air sacs called alveoli.",
  },
  brain: {
    name: "Brain",
    system: "Nervous System",
    icon: "fas fa-brain",
    description:
      "The brain is the control center of your nervous system. It processes information, controls your thoughts and movements, and manages all your body's functions. It weighs about 3 pounds and contains billions of nerve cells called neurons.",
  },
  mouth: {
    name: "Mouth",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "The mouth is where digestion begins. Your teeth break down food mechanically, while saliva contains enzymes that start breaking down starches chemically. The tongue helps move food around and assists in swallowing.",
  },
  esophagus: {
    name: "Esophagus",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "The esophagus is a muscular tube that connects your mouth to your stomach. It uses wave-like contractions called peristalsis to push food down to the stomach, even when you're upside down!",
  },
  stomach: {
    name: "Stomach",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "The stomach is a stretchy bag that can hold up to 4 cups of food. It produces strong acid and enzymes to break down proteins and kill harmful bacteria. The stomach churns food into a liquid called chyme.",
  },
  liver: {
    name: "Liver",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "The liver is your body's chemical factory. It produces bile to help digest fats, filters toxins from your blood, stores vitamins and minerals, and performs over 500 different functions to keep you healthy.",
  },
  gallbladder: {
    name: "Gallbladder",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "The gallbladder is a small pouch that stores bile made by the liver. When you eat fatty foods, it squeezes bile into the small intestine to help break down and absorb fats.",
  },
  "small-intestine": {
    name: "Small Intestine",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "Despite its name, the small intestine is actually about 20 feet long! This is where most digestion and absorption happens. Its walls are covered with tiny finger-like projections called villi that absorb nutrients into your bloodstream.",
  },
  "large-intestine": {
    name: "Large Intestine",
    system: "Digestive System",
    icon: "fas fa-utensils",
    description:
      "The large intestine, or colon, is about 5 feet long and wider than the small intestine. It absorbs water from the remaining food matter and forms solid waste. Helpful bacteria living here also produce some vitamins.",
  },
  pancreas: {
    name: "Pancreas",
    system: "Endocrine System",
    icon: "fas fa-pills",
    description:
      "The pancreas has two important jobs: it makes digestive enzymes to help break down food, and it produces hormones like insulin to control blood sugar levels. It's both part of your digestive and endocrine systems.",
  },
  kidneys: {
    name: "Kidneys",
    system: "Urinary System",
    icon: "fas fa-kidneys",
    description:
      "You have two kidneys that work like filters for your blood. They remove waste products and extra water to make urine. Each kidney contains about a million tiny filters called nephrons that clean your blood 24/7.",
  },
  diaphragm: {
    name: "Diaphragm",
    system: "Respiratory System",
    icon: "fas fa-wind",
    description:
      "The diaphragm is a large, dome-shaped muscle that sits below your lungs. When it contracts and flattens, it creates space for your lungs to expand and fill with air. It's the main muscle responsible for breathing.",
  },
  spleen: {
    name: "Spleen",
    system: "Immune System",
    icon: "fas fa-user-shield",
    description:
      "The spleen is part of your immune system and acts like a blood filter. It removes old or damaged red blood cells, stores white blood cells and platelets, and helps fight infections by producing antibodies.",
  },
  thymus: {
    name: "Thymus",
    system: "Immune System",
    icon: "fas fa-user-shield",
    description:
      "The thymus is a small organ located behind your breastbone. It's most active during childhood and helps train T-cells (a type of white blood cell) to recognize and fight infections and diseases.",
  },
}

// Week data for modals
const weekData = {
  week1: {
    number: "Week 1",
    title: "Intro to the Human Body",
    icon: "fas fa-child",
    description:
      "This introductory week provides students with a comprehensive overview of the human body's organization. Students will learn about the hierarchy from cells to tissues to organs to organ systems. We'll introduce basic anatomical terminology, body planes, and directional terms. Students will explore how the body's 11 major organ systems work together to maintain life, setting the foundation for deeper learning in subsequent weeks.",
  },
  week2: {
    number: "Week 2",
    title: "Circulation and Respiration",
    icon: "fas fa-heartbeat",
    description:
      "Students dive deep into the circulatory and respiratory systems, learning how the heart pumps blood through a network of vessels to deliver oxygen and nutrients throughout the body. We'll explore the four-chambered heart, different types of blood vessels, and the composition of blood. The respiratory system section covers the lungs, breathing mechanics, and gas exchange. Students will understand how these two systems work together to keep every cell in the body alive and functioning.",
  },
  week3: {
    number: "Week 3",
    title: "Nutrition and Digestion",
    icon: "fas fa-utensils",
    description:
      "This week focuses on how the body breaks down and absorbs nutrients from food. Students will trace the journey of food through the digestive system, from the mouth to elimination. We'll explore the roles of different digestive organs, enzymes, and the importance of proper nutrition for growth and health. Students will learn about the different food groups and how the body uses carbohydrates, proteins, and fats.",
  },
  week4: {
    number: "Week 4",
    title: "Movement and Support",
    icon: "fas fa-dumbbell",
    description:
      "Students explore the musculoskeletal system and learn how bones, muscles, and joints work together to create movement and provide support. We'll examine different types of bones, how they grow and repair themselves, and the three types of muscle tissue. Students will understand how the skeletal system protects vital organs and how muscles contract to create movement.",
  },
  week5: {
    number: "Week 5",
    title: "The Brain and Communication",
    icon: "fas fa-brain",
    description:
      "This week delves into the nervous system, focusing on the brain as the body's control center. Students will learn about the different parts of the brain and their functions, how nerve cells communicate, and how the nervous system coordinates all body activities. We'll explore reflexes, the five senses, and how the brain processes information from the environment.",
  },
  week6: {
    number: "Week 6",
    title: "Growth, Development, and Emotions",
    icon: "fas fa-seedling",
    description:
      "Students learn about the endocrine system and how hormones control growth, development, and emotions. We'll explore major glands like the pituitary, thyroid, and adrenals, and understand how hormones act as chemical messengers. Students will learn about the stages of human development and how hormones influence physical and emotional changes during growth.",
  },
  week7: {
    number: "Week 7",
    title: "The Immune Response",
    icon: "fas fa-shield-alt",
    description:
      "This week focuses on how the body defends itself against disease and infection. Students will learn about the different components of the immune system, including white blood cells, antibodies, and lymphatic organs. We'll explore how vaccines work, the difference between innate and adaptive immunity, and the importance of hygiene and healthy habits in preventing illness.",
  },
  week8: {
    number: "Week 8",
    title: "Health and Wellness",
    icon: "fas fa-stethoscope",
    description:
      "The final week brings everything together as students learn about maintaining health and wellness. We'll explore the concept of homeostasis and how all body systems work together to maintain balance. Students will learn about healthy lifestyle choices, common medical tools and procedures, and various healthcare careers. This week emphasizes the importance of taking care of our bodies throughout life.",
  },
}

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
})

// Update the initializeWebsite function to handle smooth page transitions
function initializeWebsite() {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("medmd-theme") || "default"
  currentTheme = savedTheme
  document.body.setAttribute("data-theme", savedTheme)
  updateThemeIcon()

  // Check if this is the first visit to the website
  const isFirstVisit = !sessionStorage.getItem("medmd-visited")

  if (isFirstVisit) {
    // Show loading screen only on first visit
    sessionStorage.setItem("medmd-visited", "true")
    setTimeout(() => {
      hideLoadingScreen()
      createStars()
      initializeScrollAnimations()
      initializeEventListeners()
    }, 1500)
  } else {
    // Skip loading screen for subsequent page visits
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      loadingScreen.style.display = "none"
    }
    const mainContainer = document.getElementById("mainContainer")
    if (mainContainer) {
      mainContainer.classList.add("loaded")
    }
    createStars()
    initializeScrollAnimations()
    initializeEventListeners()
  }
}

// Check login status
const loggedInUser = localStorage.getItem("medmdLoggedInUser");
if (loggedInUser) {
    showLoggedInUI(loggedInUser);
}

function showLoggedInUI(username) {
    const signinNavItem = document.getElementById("signinNavItem");
    const userNavItem = document.getElementById("userNavItem");
    const teachNavItem = document.getElementById("teachNavItem");

    // Hide sign in
    if (signinNavItem) signinNavItem.style.display = "none";

    // If teacher, show Teach link
    if (["Akash", "Lynn", "Kat"].includes(username)) {
        if (teachNavItem) {
            teachNavItem.style.display = "inline-block";
            teachNavItem.querySelector("a").setAttribute("href", "teach.html");
        }
    }

    // Show username dropdown
    if (userNavItem) {
        userNavItem.style.display = "inline-block";
        userNavItem.innerHTML = `
            <li class="nav-item">
                <a href="#" class="nav-link">
                    ${username} <i class="fas fa-caret-down" style="margin-left: 6px;"></i>
                </a>
                <div class="dropdown">
                    <a href="#" id="logoutButton" class="dropdown-item logout-item">Sign Out</a>
                </div>
            </li>
        `;

        // Logout
        document.getElementById("logoutButton").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("medmdLoggedInUser");
            window.location.href = "index.html";
        });
    }
}




function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen")
  const mainContainer = document.getElementById("mainContainer")

  if (loadingScreen) {
    loadingScreen.classList.add("hidden")
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }

  if (mainContainer) {
    mainContainer.classList.add("loaded")
  }
}

function createStars() {
  const starsContainer = document.getElementById("starsContainer")
  if (!starsContainer) return

  const numberOfStars = window.innerWidth < 768 ? 30 : 50
  stars = []

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div")
    star.className = "star"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const size = Math.random() * 2 + 1
    const floatDelay = Math.random() * 20
    const twinkleDelay = Math.random() * 5

    star.style.left = `${x}%`
    star.style.top = `${y}%`
    star.style.width = `${size}px`
    star.style.height = `${size}px`
    star.style.boxShadow = `0 0 ${size * 2}px rgba(255, 255, 255, 0.8)`
    star.style.animationDelay = `${twinkleDelay}s, ${floatDelay}s`

    starsContainer.appendChild(star)
    stars.push({
      element: star,
      x: x,
      y: y,
      size: size,
      floatDelay: floatDelay,
      twinkleDelay: twinkleDelay,
    })
  }
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe all elements with scroll animations
  const elementsToObserve = document.querySelectorAll(
    "[data-scroll], .content-box, .section-header, .program-card, .program-details, .week-card, .organ-card, .team-card",
  )
  elementsToObserve.forEach((el) => observer.observe(el))
}

// Add smooth page transition function
function smoothPageTransition(url) {
  document.body.style.opacity = "0.8"
  setTimeout(() => {
    window.location.href = url
  }, 150)
}

// Update all navigation links to use smooth transitions
function initializeEventListeners() {
  // Theme switcher
  const themeSwitcher = document.getElementById("themeSwitcher")
  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", switchTheme)
  }

  // Toggle radio buttons for signup modal
  const toggleRadios = document.querySelectorAll('input[name="program-type"]')
  toggleRadios.forEach((radio) => {
    radio.addEventListener("change", handleToggleChange)
  })

  // Add scroll indicator functionality for signup modal
  const inPersonRadio = document.getElementById("inperson")
  if (inPersonRadio) {
    inPersonRadio.addEventListener("change", function () {
      if (this.checked) {
        setTimeout(showFloatingScrollIndicator, 500)
      }
    })
  }

  const onlineRadio = document.getElementById("online")
  if (onlineRadio) {
    onlineRadio.addEventListener("change", function () {
      if (this.checked) {
        hideFloatingScrollIndicator()
      }
    })
  }

  // Password toggle buttons
  const passwordToggles = document.querySelectorAll(".password-toggle")
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const input = this.previousElementSibling
      const icon = this.querySelector("i")

      if (input.type === "password") {
        input.type = "text"
        icon.className = "fas fa-eye-slash"
      } else {
        input.type = "password"
        icon.className = "fas fa-eye"
      }
    })
  })
}

// Floating scroll indicator functions
function showFloatingScrollIndicator() {
  const indicator = document.getElementById("floatingScrollIndicator")
  if (indicator) {
    indicator.style.display = "flex"
    indicator.style.opacity = "1"

    // Add click handler to scroll to schedule
    indicator.onclick = () => {
      const scheduleGrid = document.querySelector(".schedule-grid")
      if (scheduleGrid) {
        scheduleGrid.scrollIntoView({ behavior: "smooth" })
        setTimeout(() => {
          hideFloatingScrollIndicator()
        }, 1000)
      }
    }
  }
}

function hideFloatingScrollIndicator() {
  const indicator = document.getElementById("floatingScrollIndicator")
  if (indicator) {
    indicator.style.opacity = "0"
    setTimeout(() => {
      indicator.style.display = "none"
    }, 300)
  }
}

// Update the switchTheme function to remove dark mode
function switchTheme() {
  const themes = ["default", "valentine"]
  const currentIndex = themes.indexOf(currentTheme)
  const nextIndex = (currentIndex + 1) % themes.length
  currentTheme = themes[nextIndex]

  document.body.setAttribute("data-theme", currentTheme)
  localStorage.setItem("medmd-theme", currentTheme)
  updateThemeIcon()
}

function updateThemeIcon() {
  const themeIcon = document.getElementById("themeIcon")
  if (!themeIcon) return

  switch (currentTheme) {
    case "valentine":
      themeIcon.className = "theme-icon fas fa-heart"
      break
    default:
      themeIcon.className = "theme-icon fas fa-sun"
      break
  }
}

function scrollToContent() {
  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth" })
  }
}

function handleToggleChange(event) {
  const sections = document.querySelectorAll(".signup-section")
  sections.forEach((section) => section.classList.remove("active"))

  const targetSection = document.getElementById(event.target.value + "Section")
  if (targetSection) {
    targetSection.classList.add("active")
  }
}

// Construction popup functions
function showConstructionPopup(event) {
  if (event) event.preventDefault()
  const popup = document.getElementById("constructionPopup")
  if (popup) {
    popup.classList.add("active")
  }
}

function closeConstructionPopup() {
  const popup = document.getElementById("constructionPopup")
  if (popup) {
    popup.classList.remove("active")
  }
}

// Signup modal functions
function openSignupModal() {
  const modal = document.getElementById("signupModal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeSignupModal() {
  const modal = document.getElementById("signupModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Quiz modal functions
function openQuizModal() {
  const modal = document.getElementById("quizModal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
    startQuiz()
  }
}

function closeQuizModal() {
  const modal = document.getElementById("quizModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
    resetQuiz()
  }
}

function startQuiz() {
  // Ensure at least one question from each week
  const questionsByWeek = {}
  quizQuestions.forEach((q) => {
    if (!questionsByWeek[q.week]) {
      questionsByWeek[q.week] = []
    }
    questionsByWeek[q.week].push(q)
  })

  // Select one question from each week (8 questions)
  const newQuiz = []
  Object.keys(questionsByWeek).forEach((week) => {
    const weekQuestions = questionsByWeek[week]
    const randomQuestion = weekQuestions[Math.floor(Math.random() * weekQuestions.length)]
    newQuiz.push(randomQuestion)
  })

  // Add 2 more random questions to make 10 total
  const remainingQuestions = quizQuestions.filter((q) => !newQuiz.includes(q))
  for (let i = 0; i < 2; i++) {
    if (remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length)
      newQuiz.push(remainingQuestions.splice(randomIndex, 1)[0])
    }
  }

  // Shuffle the final quiz
  currentQuiz = newQuiz.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  selectedAnswer = null
  score = 0
  userAnswers = []
  answeredQuestions = new Array(10).fill(null)
  showQuizResults = false

  displayQuestion()
}

function resetQuiz() {
  currentQuiz = []
  currentQuestionIndex = 0
  selectedAnswer = null
  score = 0
  userAnswers = []
  answeredQuestions = []
  showQuizResults = false
}

function displayQuestion() {
  if (currentQuiz.length === 0) return

  const question = currentQuiz[currentQuestionIndex]

  // Update progress
  const counter = document.getElementById("quizCounter")
  const percentage = document.getElementById("quizPercentage")
  const progressFill = document.getElementById("quizProgressFill")

  if (counter) counter.textContent = `Question ${currentQuestionIndex + 1} of 10`
  if (percentage) percentage.textContent = `${Math.round((currentQuestionIndex / 10) * 100)}%`
  if (progressFill) progressFill.style.width = `${(currentQuestionIndex / 10) * 100}%`

  // Update question content
  const questionTitle = document.getElementById("quizQuestionTitle")
  const difficulty = document.getElementById("quizDifficulty")
  const week = document.getElementById("quizWeek")
  const optionsContainer = document.getElementById("quizOptions")

  if (questionTitle) questionTitle.textContent = question.question
  if (difficulty) difficulty.textContent = question.difficulty
  if (week) week.textContent = question.week

  // Create options
  if (optionsContainer) {
    optionsContainer.innerHTML = ""
    question.options.forEach((option, index) => {
      const optionDiv = document.createElement("div")
      optionDiv.className = "quiz-option"
      optionDiv.onclick = () => selectQuizAnswer(index)

      if (answeredQuestions[currentQuestionIndex] === index) {
        optionDiv.classList.add("selected")
        selectedAnswer = index
      }

      optionDiv.innerHTML = `
                <div class="quiz-option-letter">${String.fromCharCode(65 + index)}</div>
                <span>${option}</span>
            `

      optionsContainer.appendChild(optionDiv)
    })
  }

  // Update buttons
  const backButton = document.getElementById("quizBack")
  const submitButton = document.getElementById("quizSubmit")

  if (backButton) {
    backButton.disabled = currentQuestionIndex === 0
  }

  if (submitButton) {
    submitButton.disabled = selectedAnswer === null
    submitButton.textContent = currentQuestionIndex === 9 ? "Finish Quiz" : "Next Question"
  }
}

function selectQuizAnswer(answerIndex) {
  selectedAnswer = answerIndex

  // Update visual selection
  const options = document.querySelectorAll(".quiz-option")
  options.forEach((option, index) => {
    option.classList.toggle("selected", index === answerIndex)
  })

  // Enable submit button
  const submitButton = document.getElementById("quizSubmit")
  if (submitButton) {
    submitButton.disabled = false
  }
}

function submitQuizAnswer() {
  if (selectedAnswer === null) return

  answeredQuestions[currentQuestionIndex] = selectedAnswer

  if (currentQuestionIndex < 9) {
    currentQuestionIndex++
    selectedAnswer = answeredQuestions[currentQuestionIndex]
    displayQuestion()
  } else {
    calculateResults()
    showQuizResultsScreen()
  }
}

function goBackQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    selectedAnswer = answeredQuestions[currentQuestionIndex]
    displayQuestion()
  }
}

function calculateResults() {
  score = 0
  userAnswers = []

  for (let i = 0; i < currentQuiz.length; i++) {
    const question = currentQuiz[i]
    const userAnswer = answeredQuestions[i]
    const isCorrect = userAnswer === question.correct

    if (isCorrect) score++

    userAnswers.push({
      question: question.question,
      userAnswer: userAnswer !== null ? question.options[userAnswer] : "No answer",
      correctAnswer: question.options[question.correct],
      isCorrect: isCorrect,
      week: question.week,
      difficulty: question.difficulty,
    })
  }
}

function showQuizResultsScreen() {
  const questionContainer = document.getElementById("quizQuestionContainer")
  const resultsContainer = document.getElementById("quizResults")

  if (questionContainer) questionContainer.style.display = "none"
  if (resultsContainer) resultsContainer.style.display = "flex"

  // Update progress ring
  const progressCircle = document.getElementById("progressCircle")
  const progressText = document.getElementById("progressText")
  const percentage = Math.round((score / 10) * 100)

  if (progressText) progressText.textContent = `${percentage}%`

  if (progressCircle) {
    const circumference = 2 * Math.PI * 90
    const offset = circumference - (percentage / 100) * circumference
    progressCircle.style.strokeDasharray = circumference
    progressCircle.style.strokeDashoffset = offset
  }

  // Update message
  const message = document.getElementById("quizMessage")
  if (message) {
    if (score >= 7) {
      message.innerHTML = `Great job! You scored ${score}/10 (${percentage}%). Even though you already know a lot about the human body, our <a href="human-body-fundamentals.html">Human Body Fundamentals program</a> can help you learn the systems as a whole in more depth and discover how they all work together!`
    } else {
      message.innerHTML = `You scored ${score}/10 (${percentage}%). Don't worry - our Human Body Fundamentals program will be perfect for you to learn all these concepts so you can get them all right next time!`
    }
  }

  // Update review
  const review = document.getElementById("quizReview")
  if (review) {
    let reviewHTML = "<h4>Review Your Answers</h4>"
    userAnswers.forEach((answer, index) => {
      const correctClass = answer.isCorrect ? "correct" : ""
      reviewHTML += `
                <div class="review-item ${correctClass}">
                    <div class="review-question">Q${index + 1}: ${answer.question}</div>
                    <div class="review-answer ${answer.isCorrect ? "correct" : "incorrect"}">Your answer: ${answer.userAnswer}</div>
                    ${!answer.isCorrect ? `<div class="review-answer correct">Correct answer: ${answer.correctAnswer}</div>` : ""}
                </div>
            `
    })
    review.innerHTML = reviewHTML
  }

  // Show weak weeks if any
  const incorrectAnswers = userAnswers.filter((answer) => !answer.isCorrect)
  if (incorrectAnswers.length > 0) {
    const weakWeeks = document.getElementById("weakWeeks")
    if (weakWeeks) {
      const weeks = [...new Set(incorrectAnswers.map((answer) => answer.week))]
      let weakWeeksHTML = '<h4>Areas for Improvement</h4><div class="weak-weeks-list">'
      weeks.forEach((week) => {
        weakWeeksHTML += `<span class="weak-week-tag">${week}</span>`
      })
      weakWeeksHTML += "</div>"
      weakWeeks.innerHTML = weakWeeksHTML
      weakWeeks.style.display = "block"
    }
  }
}

function retakeQuiz() {
  const questionContainer = document.getElementById("quizQuestionContainer")
  const resultsContainer = document.getElementById("quizResults")

  if (questionContainer) questionContainer.style.display = "flex"
  if (resultsContainer) resultsContainer.style.display = "none"

  startQuiz()
}

// Team modal functions
function openTeamModal(memberKey) {
  const modal = document.getElementById("teamModal")
  const member = teamMembers[memberKey]

  if (!modal || !member) return

  // Update modal content
  const modalName = document.getElementById("modalName")
  const modalRole = document.getElementById("modalRole")
  const modalDescription = document.getElementById("modalDescription")
  const modalImage = document.getElementById("modalImage")
  const modalImageDefault = document.getElementById("modalImageDefault")

  if (modalName) modalName.textContent = member.name
  if (modalRole) modalRole.textContent = member.role
  if (modalDescription) modalDescription.textContent = member.description

  if (member.image) {
    if (modalImage) {
      modalImage.src = member.image
      modalImage.style.display = "block"
    }
    if (modalImageDefault) modalImageDefault.style.display = "none"
  } else {
    if (modalImage) modalImage.style.display = "none"
    if (modalImageDefault) modalImageDefault.style.display = "flex"
  }

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeTeamModal() {
  const modal = document.getElementById("teamModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Organ modal functions
function openOrganModal(organKey) {
  const modal = document.getElementById("organModal")
  const organ = organData[organKey]

  if (!modal || !organ) return

  // Update modal content
  const modalTitle = document.getElementById("organModalTitle")
  const modalSystem = document.getElementById("organModalSystem")
  const modalDescription = document.getElementById("organModalDescription")
  const modalIcon = document.getElementById("organModalIcon")

  if (modalTitle) modalTitle.textContent = organ.name
  if (modalSystem) modalSystem.textContent = organ.system
  if (modalDescription) modalDescription.textContent = organ.description
  if (modalIcon) modalIcon.innerHTML = `<i class="${organ.icon}"></i>`

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeOrganModal() {
  const modal = document.getElementById("organModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Week modal functions
function openWeekModal(weekKey) {
  const modal = document.getElementById("weekModal")
  const week = weekData[weekKey]

  if (!modal || !week) return

  // Update modal content
  const modalNumber = document.getElementById("weekModalNumber")
  const modalTitle = document.getElementById("weekModalTitle")
  const modalDescription = document.getElementById("weekModalDescription")
  const modalIcon = document.getElementById("weekModalIcon")

  if (modalNumber) modalNumber.textContent = week.number
  if (modalTitle) modalTitle.textContent = week.title
  if (modalDescription) modalDescription.textContent = week.description
  if (modalIcon) modalIcon.innerHTML = `<i class="${week.icon}"></i>`

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeWeekModal() {
  const modal = document.getElementById("weekModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

// Sign in form functions
function showSignUpForm() {
  const signinForm = document.getElementById("signinForm")
  const signupForm = document.getElementById("signupForm")

  if (signinForm) signinForm.style.display = "none"
  if (signupForm) signupForm.style.display = "block"
}

function showSignInForm() {
  const signinForm = document.getElementById("signinForm")
  const signupForm = document.getElementById("signupForm")

  if (signinForm) signinForm.style.display = "block"
  if (signupForm) signupForm.style.display = "none"
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId)
  const icon = document.getElementById(inputId + "ToggleIcon")

  if (input && icon) {
    if (input.type === "password") {
      input.type = "text"
      icon.className = "fas fa-eye-slash"
    } else {
      input.type = "password"
      icon.className = "fas fa-eye"
    }
  }
}

function validateInput(inputId, validationRules) {
  const input = document.getElementById(inputId)
  const errorElement = document.getElementById(inputId + "Error")

  if (!input || !errorElement) return false

  const value = input.value.trim()
  let isValid = true
  let errorMessage = ""

  // Check each validation rule
  for (const rule of validationRules) {
    if (!rule.test(value)) {
      isValid = false
      errorMessage = rule.message
      break
    }
  }

  // Update UI
  if (isValid) {
    input.classList.remove("error")
    errorElement.textContent = ""
  } else {
    input.classList.add("error")
    errorElement.textContent = errorMessage
  }

  return isValid
}

// Update handleSignIn function for better validation display
function handleSignIn(event) {
  event.preventDefault()

  const usernameRules = [
    { test: (value) => value.length > 0, message: "Username is required" },
    { test: (value) => value.length >= 3, message: "Username must be at least 3 characters" },
  ]

  const passwordRules = [
    { test: (value) => value.length > 0, message: "Password is required" },
    { test: (value) => value.length >= 6, message: "Password must be at least 6 characters" },
  ]

  const isUsernameValid = validateInput("username", usernameRules)
  const isPasswordValid = validateInput("password", passwordRules)

  // Show validation errors
  showValidationErrors([
    { field: "username", valid: isUsernameValid, rules: usernameRules },
    { field: "password", valid: isPasswordValid, rules: passwordRules },
  ])

  if (isUsernameValid && isPasswordValid) {
    event.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value;

    // Clear previous error messages
    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Check if username exists
    if (!validUsers[usernameInput]) {
        document.getElementById("usernameError").textContent = "Invalid username.";
        return;
    }

    // Check password
    if (validUsers[usernameInput] !== passwordInput) {
        document.getElementById("passwordError").textContent = "Incorrect password.";
        return;
    }

    // Save login to localStorage
    localStorage.setItem("medmdLoggedInUser", usernameInput);

    // Redirect to homepage after login
    window.location.href = "index.html";
  }
}

function showValidationErrors(validations) {
  const errorsContainer = document.getElementById("validationErrors")
  const errorsList = document.getElementById("errorsList")

  if (!errorsContainer || !errorsList) return

  // Clear previous errors
  errorsList.innerHTML = ""

  // Collect all errors
  const errors = []
  validations.forEach((validation) => {
    if (!validation.valid) {
      const input = document.getElementById(validation.field)
      const value = input ? input.value.trim() : ""

      // Find the first failing rule
      for (const rule of validation.rules) {
        if (!rule.test(value)) {
          errors.push(rule.message)
          break
        }
      }
    }
  })

  // Show or hide errors container
  if (errors.length > 0) {
    errors.forEach((error) => {
      const li = document.createElement("li")
      li.textContent = error
      errorsList.appendChild(li)
    })
    errorsContainer.style.display = "block"
  } else {
    errorsContainer.style.display = "none"
  }
}

function handleSignUp(event) {
  event.preventDefault()

  const usernameRules = [
    { test: (value) => value.length > 0, message: "Username is required" },
    { test: (value) => value.length >= 3, message: "Username must be at least 3 characters" },
    {
      test: (value) => /^[a-zA-Z0-9_]+$/.test(value),
      message: "Username can only contain letters, numbers, and underscores",
    },
  ]

  const emailRules = [
    { test: (value) => value.length > 0, message: "Email is required" },
    { test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: "Please enter a valid email address" },
  ]

  const passwordRules = [
    { test: (value) => value.length > 0, message: "Password is required" },
    { test: (value) => value.length >= 8, message: "Password must be at least 8 characters" },
    { test: (value) => /(?=.*[a-z])/.test(value), message: "Password must contain at least one lowercase letter" },
    { test: (value) => /(?=.*[A-Z])/.test(value), message: "Password must contain at least one uppercase letter" },
    { test: (value) => /(?=.*\d)/.test(value), message: "Password must contain at least one number" },
  ]

  const isUsernameValid = validateInput("newUsername", usernameRules)
  const isEmailValid = validateInput("email", emailRules)
  const isPasswordValid = validateInput("newPassword", passwordRules)

  // Check password confirmation
  const password = document.getElementById("newPassword").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const confirmPasswordRules = [{ test: (value) => value === password, message: "Passwords do not match" }]
  const isConfirmPasswordValid = validateInput("confirmPassword", confirmPasswordRules)

  // Check terms agreement
  const agreeTerms = document.getElementById("agreeTerms").checked
  if (!agreeTerms) {
    alert("You must agree to the Terms of Service and Privacy Policy")
    return
  }

  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
    // Simulate sign up process
    alert("Sign up functionality is not yet implemented. This is just a demo form.")
  }
}

// Close modals when clicking outside
document.addEventListener("click", (event) => {
  // Close construction popup
  const constructionPopup = document.getElementById("constructionPopup")
  if (constructionPopup && constructionPopup.classList.contains("active") && event.target === constructionPopup) {
    closeConstructionPopup()
  }

  // Close signup modal
  const signupModal = document.getElementById("signupModal")
  if (signupModal && signupModal.classList.contains("active") && event.target === signupModal) {
    closeSignupModal()
  }

  // Close quiz modal
  const quizModal = document.getElementById("quizModal")
  if (quizModal && quizModal.classList.contains("active") && event.target === quizModal) {
    closeQuizModal()
  }

  // Close team modal
  const teamModal = document.getElementById("teamModal")
  if (teamModal && teamModal.classList.contains("active") && event.target === teamModal) {
    closeTeamModal()
  }

  // Close organ modal
  const organModal = document.getElementById("organModal")
  if (organModal && organModal.classList.contains("active") && event.target === organModal) {
    closeOrganModal()
  }

  // Close week modal
  const weekModal = document.getElementById("weekModal")
  if (weekModal && weekModal.classList.contains("active") && event.target === weekModal) {
    closeWeekModal()
  }
})

// Handle window resize for stars
window.addEventListener("resize", () => {
  const starsContainer = document.getElementById("starsContainer")
  if (starsContainer) {
    starsContainer.innerHTML = ""
    createStars()
  }
})
