// Categories for quiz templates
export const categories = [
  {
    id: "education",
    name: "Education",
    color: "#4f46e5", // indigo-600
  },
  {
    id: "business",
    name: "Business",
    color: "#0891b2", // cyan-600
  },
  {
    id: "entertainment",
    name: "Entertainment",
    color: "#db2777", // pink-600
  },
  {
    id: "health",
    name: "Health",
    color: "#16a34a", // green-600
  },
  {
    id: "science",
    name: "Science",
    color: "#9333ea", // purple-600
  },
  {
    id: "general",
    name: "General Knowledge",
    color: "#f59e0b", // amber-500
  },
]

// Quiz templates data
export const quizTemplates = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test knowledge of JavaScript basics including syntax, data types, and functions",
    fullDescription:
      "This comprehensive quiz covers the core concepts of JavaScript programming. It's designed to test understanding of fundamental JavaScript concepts including variables, data types, operators, control structures, functions, and basic DOM manipulation.",
    category: "education",
    tags: ["Programming", "Web Development", "JavaScript"],
    questionCount: 15,
    estimatedTime: 20,
    difficulty: "Intermediate",
    featured: true,
    suitableFor: [
      "Web development courses",
      "Coding bootcamps",
      "Self-assessment for developers",
      "Technical interviews preparation",
    ],
    questions: [
      {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correctAnswer: 2,
        explanation:
          "JavaScript has the following primitive data types: String, Number, Boolean, Undefined, Null, Symbol, and BigInt. There is no specific Float type in JavaScript; floating-point numbers are part of the Number type.",
      },
      {
        question: "What will be the output of: console.log(typeof [])?",
        options: ["array", "object", "undefined", "null"],
        correctAnswer: 1,
        explanation:
          "In JavaScript, arrays are actually objects, so typeof [] returns 'object'. To specifically check if something is an array, you would use Array.isArray([]).",
      },
      {
        question: "Which method is used to add elements to the end of an array?",
        options: ["push()", "append()", "addToEnd()", "concat()"],
        correctAnswer: 0,
        explanation:
          "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
      },
      {
        question: "What is the correct way to create a function in JavaScript?",
        options: [
          "function = myFunction() {}",
          "function myFunction() {}",
          "function:myFunction() {}",
          "create myFunction() {}",
        ],
        correctAnswer: 1,
        explanation:
          "The correct syntax for defining a function in JavaScript is using the 'function' keyword followed by the function name and parentheses: function myFunction() {}",
      },
      {
        question: "What does the '===' operator do?",
        options: [
          "Assigns a value",
          "Compares values, not types",
          "Compares both value and type",
          "Logical AND operation",
        ],
        correctAnswer: 2,
        explanation:
          "The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result. Unlike the equality operator (==), it doesn't perform type conversion, so it only returns true when both operands are of the same type and have the same value.",
      },
    ],
  },
  {
    id: 2,
    title: "Business Leadership Principles",
    description: "Assess understanding of key leadership concepts and management strategies",
    fullDescription:
      "This quiz evaluates knowledge of essential leadership principles, management techniques, and organizational behavior concepts. It covers topics such as team management, decision-making processes, conflict resolution, and effective communication strategies in a business environment.",
    category: "business",
    tags: ["Leadership", "Management", "Business Strategy"],
    questionCount: 12,
    estimatedTime: 15,
    difficulty: "Advanced",
    featured: false,
    suitableFor: [
      "Management training programs",
      "Leadership development courses",
      "MBA students",
      "Team leaders and managers",
    ],
    questions: [
      {
        question: "Which leadership style involves making decisions without consulting team members?",
        options: ["Democratic", "Laissez-faire", "Autocratic", "Transformational"],
        correctAnswer: 2,
        explanation:
          "Autocratic leadership involves making decisions without consulting team members. The leader maintains complete control and authority, with minimal input from group members.",
      },
      {
        question: "What is the primary focus of servant leadership?",
        options: [
          "Maximizing profits",
          "Meeting the needs of others",
          "Maintaining strict control",
          "Rapid decision making",
        ],
        correctAnswer: 1,
        explanation:
          "Servant leadership focuses on meeting the needs of team members. The leader prioritizes the growth and well-being of people and the communities to which they belong, sharing power and putting the needs of others first.",
      },
      {
        question: "Which of the following is NOT one of the five stages in Bruce Tuckman's team development model?",
        options: ["Forming", "Storming", "Excelling", "Performing"],
        correctAnswer: 2,
        explanation:
          "Tuckman's model includes five stages: Forming, Storming, Norming, Performing, and Adjourning. 'Excelling' is not part of this model.",
      },
      {
        question: "What does the term 'emotional intelligence' primarily refer to in leadership?",
        options: [
          "Technical knowledge",
          "Ability to manipulate others",
          "Understanding and managing emotions",
          "Intelligence quotient (IQ)",
        ],
        correctAnswer: 2,
        explanation:
          "Emotional intelligence refers to the ability to recognize, understand, and manage our own emotions and recognize, understand and influence the emotions of others. In leadership, it's crucial for building relationships and making effective decisions.",
      },
      {
        question:
          "Which conflict resolution strategy involves finding a middle ground where each party gives up something?",
        options: ["Competing", "Avoiding", "Compromising", "Accommodating"],
        correctAnswer: 2,
        explanation:
          "Compromising involves finding a mutually acceptable solution that partially satisfies both parties. Each side gives up something to reach an agreement that benefits the overall situation.",
      },
    ],
  },
  {
    id: 3,
    title: "World Geography Challenge",
    description: "Test knowledge of countries, capitals, landmarks, and geographical features",
    fullDescription:
      "This comprehensive geography quiz tests knowledge of world geography including countries and their capitals, major landmarks, geographical features, and cultural aspects of different regions. It covers all continents and includes questions about mountains, rivers, oceans, and political boundaries.",
    category: "education",
    tags: ["Geography", "Countries", "World Knowledge"],
    questionCount: 20,
    estimatedTime: 25,
    difficulty: "Intermediate",
    featured: true,
    suitableFor: ["Geography classes", "Travel enthusiasts", "General knowledge improvement", "Educational events"],
    questions: [
      {
        question: "Which country is both in Europe and Asia?",
        options: ["Egypt", "Russia", "Turkey", "Kazakhstan"],
        correctAnswer: 2,
        explanation:
          "Turkey is located in both southeastern Europe and southwestern Asia. The Bosphorus strait, which runs through Istanbul, forms the boundary between the two continents.",
      },
      {
        question: "What is the capital of New Zealand?",
        options: ["Auckland", "Wellington", "Christchurch", "Hamilton"],
        correctAnswer: 1,
        explanation:
          "Wellington is the capital city of New Zealand, located at the southwestern tip of the North Island. While Auckland is the largest city, Wellington has been the capital since 1865.",
      },
      {
        question: "Which desert is the largest in the world?",
        options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Antarctic Desert"],
        correctAnswer: 3,
        explanation:
          "The Antarctic Desert is the largest desert in the world, covering approximately 14 million square kilometers. Many people mistakenly think the Sahara is the largest, but it's actually the largest hot desert.",
      },
      {
        question: "Which mountain range stretches across seven countries in Europe?",
        options: ["Pyrenees", "Alps", "Carpathians", "Apennines"],
        correctAnswer: 1,
        explanation:
          "The Alps stretch across France, Switzerland, Monaco, Italy, Liechtenstein, Austria, Germany, and Slovenia, forming an arc through south-central Europe.",
      },
      {
        question: "Which of these countries does NOT border Brazil?",
        options: ["Peru", "Chile", "Colombia", "Uruguay"],
        correctAnswer: 1,
        explanation:
          "Brazil shares borders with all South American countries except Chile and Ecuador. Brazil's neighbors are Argentina, Bolivia, Colombia, French Guiana, Guyana, Paraguay, Peru, Suriname, Uruguay, and Venezuela.",
      },
    ],
  },
  {
    id: 4,
    title: "Pop Culture Trivia",
    description: "Fun quiz covering movies, music, celebrities, and entertainment trends",
    fullDescription:
      "This entertaining quiz covers a wide range of pop culture topics including blockbuster movies, chart-topping music, famous celebrities, TV shows, and current entertainment trends. Test your knowledge of both classic and contemporary pop culture across different decades.",
    category: "entertainment",
    tags: ["Movies", "Music", "Celebrities", "TV Shows"],
    questionCount: 15,
    estimatedTime: 15,
    difficulty: "Easy",
    featured: false,
    suitableFor: ["Social gatherings", "Party games", "Entertainment events", "Team building activities"],
    questions: [
      {
        question: "Which actor played Iron Man in the Marvel Cinematic Universe?",
        options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
        correctAnswer: 1,
        explanation:
          "Robert Downey Jr. portrayed Tony Stark/Iron Man in the Marvel Cinematic Universe, starting with the first Iron Man film in 2008 and appearing in multiple films through Avengers: Endgame (2019).",
      },
      {
        question: "Which band released the album 'Abbey Road'?",
        options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"],
        correctAnswer: 1,
        explanation:
          "Abbey Road was the eleventh studio album by the English rock band The Beatles, released in 1969. It features iconic songs like 'Come Together' and 'Here Comes the Sun'.",
      },
      {
        question: "Which TV series features dragons and is based on books by George R.R. Martin?",
        options: ["The Witcher", "Game of Thrones", "Lord of the Rings", "The Wheel of Time"],
        correctAnswer: 1,
        explanation:
          "Game of Thrones is based on George R.R. Martin's series of fantasy novels, 'A Song of Ice and Fire.' The show featured several dragons, most notably Daenerys Targaryen's three dragons: Drogon, Rhaegal, and Viserion.",
      },
      {
        question: "Who directed the movie 'Titanic'?",
        options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Martin Scorsese"],
        correctAnswer: 1,
        explanation:
          "James Cameron directed 'Titanic' (1997), which won 11 Academy Awards and was the highest-grossing film of all time until Cameron's own 'Avatar' surpassed it in 2010.",
      },
      {
        question: "Which singer is known as the 'Queen of Pop'?",
        options: ["Beyoncé", "Lady Gaga", "Madonna", "Taylor Swift"],
        correctAnswer: 2,
        explanation:
          "Madonna is widely referred to as the 'Queen of Pop' due to her influence on the music industry and pop culture since the 1980s. She's known for reinventing her image and pushing boundaries throughout her career.",
      },
    ],
  },
  {
    id: 5,
    title: "Human Anatomy Basics",
    description: "Test knowledge of the human body systems, organs, and functions",
    fullDescription:
      "This educational quiz covers the fundamentals of human anatomy including major body systems, organs and their functions, skeletal structure, and basic physiology. It's designed to test understanding of how the human body works and the relationships between different biological systems.",
    category: "health",
    tags: ["Anatomy", "Biology", "Medical", "Science"],
    questionCount: 15,
    estimatedTime: 20,
    difficulty: "Intermediate",
    featured: false,
    suitableFor: ["Biology students", "Healthcare professionals", "Medical students", "Health education"],
    questions: [
      {
        question: "Which organ is responsible for producing insulin?",
        options: ["Liver", "Pancreas", "Kidney", "Gallbladder"],
        correctAnswer: 1,
        explanation:
          "The pancreas produces insulin in its beta cells, located in the islets of Langerhans. Insulin is crucial for regulating blood glucose levels by allowing cells to take in glucose from the bloodstream.",
      },
      {
        question: "How many chambers does the human heart have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation:
          "The human heart has four chambers: two atria (upper chambers) and two ventricles (lower chambers). The right side pumps blood to the lungs, while the left side pumps blood to the rest of the body.",
      },
      {
        question: "Which of the following is NOT part of the central nervous system?",
        options: ["Brain", "Spinal cord", "Sciatic nerve", "Cerebellum"],
        correctAnswer: 2,
        explanation:
          "The central nervous system consists of the brain and spinal cord. The sciatic nerve is part of the peripheral nervous system, which connects the central nervous system to the rest of the body.",
      },
      {
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Brain", "Skin", "Lungs"],
        correctAnswer: 2,
        explanation:
          "The skin is the largest organ in the human body, with a surface area of about 2 square meters in adults. It serves as a protective barrier against pathogens, regulates body temperature, and provides sensation.",
      },
      {
        question: "Which bone is the longest in the human body?",
        options: ["Humerus", "Femur", "Tibia", "Radius"],
        correctAnswer: 1,
        explanation:
          "The femur (thigh bone) is the longest and strongest bone in the human body, extending from the hip to the knee. It can support up to 30 times the weight of an adult's body.",
      },
    ],
  },
  {
    id: 6,
    title: "Basic Physics Concepts",
    description: "Test understanding of fundamental physics principles and laws",
    fullDescription:
      "This quiz covers core physics concepts including Newton's laws of motion, energy, electricity, magnetism, and basic quantum physics. It tests understanding of the fundamental principles that govern the physical world and the mathematical relationships between different physical quantities.",
    category: "science",
    tags: ["Physics", "Science", "Education"],
    questionCount: 12,
    estimatedTime: 15,
    difficulty: "Intermediate",
    featured: true,
    suitableFor: ["Physics students", "Science enthusiasts", "STEM education", "Academic competitions"],
    questions: [
      {
        question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
        options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
        correctAnswer: 2,
        explanation:
          "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This means that when one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.",
      },
      {
        question: "What is the SI unit of electric current?",
        options: ["Volt", "Watt", "Ampere", "Ohm"],
        correctAnswer: 2,
        explanation:
          "The ampere (A) is the SI unit of electric current. It measures the rate of flow of electric charge past a point in an electric circuit, with one ampere representing one coulomb of charge per second.",
      },
      {
        question: "Which type of energy is associated with motion?",
        options: ["Potential energy", "Kinetic energy", "Thermal energy", "Nuclear energy"],
        correctAnswer: 1,
        explanation:
          "Kinetic energy is the energy possessed by an object due to its motion. The formula for kinetic energy is KE = (1/2)mv², where m is mass and v is velocity.",
      },
      {
        question: "What does E=mc² represent?",
        options: [
          "Conservation of momentum",
          "Mass-energy equivalence",
          "Gravitational potential",
          "Electromagnetic induction",
        ],
        correctAnswer: 1,
        explanation:
          "Einstein's equation E=mc² represents mass-energy equivalence, stating that energy (E) equals mass (m) multiplied by the speed of light (c) squared. This equation shows that mass and energy are interchangeable forms of the same thing.",
      },
      {
        question: "Which of these is NOT one of the fundamental forces in nature?",
        options: ["Gravitational force", "Electromagnetic force", "Hydraulic force", "Strong nuclear force"],
        correctAnswer: 2,
        explanation:
          "The four fundamental forces in nature are gravitational, electromagnetic, strong nuclear, and weak nuclear forces. Hydraulic force is not a fundamental force but rather a practical application of fluid mechanics principles.",
      },
    ],
  },
  {
    id: 7,
    title: "Digital Marketing Essentials",
    description: "Test knowledge of digital marketing strategies, tools, and metrics",
    fullDescription:
      "This comprehensive quiz covers key aspects of digital marketing including social media marketing, SEO, content marketing, email campaigns, analytics, and advertising platforms. It tests understanding of modern marketing strategies, tools, metrics, and best practices in the digital landscape.",
    category: "business",
    tags: ["Marketing", "Digital", "Business", "Social Media"],
    questionCount: 15,
    estimatedTime: 20,
    difficulty: "Intermediate",
    featured: false,
    suitableFor: ["Marketing professionals", "Business students", "Entrepreneurs", "Social media managers"],
    questions: [
      {
        question: "What does SEO stand for?",
        options: [
          "Search Engine Optimization",
          "Social Engagement Opportunities",
          "Search Engine Operations",
          "Secure Email Outreach",
        ],
        correctAnswer: 0,
        explanation:
          "SEO stands for Search Engine Optimization, which is the practice of increasing the quantity and quality of traffic to your website through organic search engine results.",
      },
      {
        question: "Which metric measures the percentage of visitors who leave a website after viewing only one page?",
        options: ["Click-through rate", "Conversion rate", "Bounce rate", "Impression share"],
        correctAnswer: 2,
        explanation:
          "Bounce rate measures the percentage of visitors who navigate away from the site after viewing only one page. A high bounce rate might indicate that site entrance pages aren't relevant to visitors or that the user experience is poor.",
      },
      {
        question: "What is a 'Call to Action' (CTA) in marketing?",
        options: [
          "A phone call to potential customers",
          "An instruction to the audience to take a specific action",
          "A marketing emergency procedure",
          "A type of customer service protocol",
        ],
        correctAnswer: 1,
        explanation:
          "A Call to Action (CTA) is an instruction to the audience designed to provoke an immediate response, such as 'Buy Now,' 'Sign Up,' or 'Learn More.' Effective CTAs direct users toward conversion goals.",
      },
      {
        question: "Which of these is NOT a common social media marketing objective?",
        options: ["Brand awareness", "Lead generation", "Employee monitoring", "Customer engagement"],
        correctAnswer: 2,
        explanation:
          "While brand awareness, lead generation, and customer engagement are common objectives in social media marketing, employee monitoring is not typically a marketing objective but rather an HR or management function.",
      },
      {
        question: "What does ROI stand for in marketing?",
        options: ["Range Of Influence", "Return On Investment", "Rate Of Interaction", "Reliability Of Information"],
        correctAnswer: 1,
        explanation:
          "ROI stands for Return On Investment, which measures the profitability of an investment relative to its cost. In marketing, it helps determine which strategies are most effective by comparing the revenue generated to the cost of the marketing activities.",
      },
    ],
  },
  {
    id: 8,
    title: "Environmental Science Basics",
    description: "Test knowledge of ecosystems, climate, conservation, and environmental issues",
    fullDescription:
      "This educational quiz covers fundamental concepts in environmental science including ecosystems, biodiversity, climate change, pollution, conservation efforts, and sustainable practices. It tests understanding of how natural systems work and the impact of human activities on the environment.",
    category: "science",
    tags: ["Environment", "Science", "Climate", "Conservation"],
    questionCount: 15,
    estimatedTime: 20,
    difficulty: "Intermediate",
    featured: false,
    suitableFor: ["Environmental studies students", "Science classes", "Conservation groups", "General education"],
    questions: [
      {
        question: "What is biodiversity?",
        options: [
          "A type of environmental policy",
          "The variety of life in a particular habitat or ecosystem",
          "A sustainable farming technique",
          "The study of human impact on nature",
        ],
        correctAnswer: 1,
        explanation:
          "Biodiversity refers to the variety and variability of life on Earth, including the diversity within species, between species, and of ecosystems. High biodiversity is typically considered important for ecosystem resilience and stability.",
      },
      {
        question: "Which of the following is a greenhouse gas?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correctAnswer: 2,
        explanation:
          "Carbon dioxide (CO₂) is a greenhouse gas that traps heat in the atmosphere. Other major greenhouse gases include methane (CH₄), nitrous oxide (N₂O), and fluorinated gases. Oxygen and nitrogen, which make up most of our atmosphere, are not greenhouse gases.",
      },
      {
        question: "What is the primary cause of ocean acidification?",
        options: [
          "Agricultural runoff",
          "Plastic pollution",
          "Absorption of carbon dioxide from the atmosphere",
          "Oil spills",
        ],
        correctAnswer: 2,
        explanation:
          "Ocean acidification is primarily caused by the ocean's absorption of carbon dioxide (CO₂) from the atmosphere. When CO₂ dissolves in seawater, it forms carbonic acid, which increases the acidity of the ocean, threatening marine life, especially organisms with calcium carbonate shells or skeletons.",
      },
      {
        question: "Which of the following is an example of a renewable resource?",
        options: ["Coal", "Natural gas", "Solar energy", "Petroleum"],
        correctAnswer: 2,
        explanation:
          "Solar energy is a renewable resource because it comes from the sun, which will continue to provide energy for billions of years. Coal, natural gas, and petroleum are fossil fuels, which are non-renewable resources formed over millions of years and cannot be replenished within a human timescale.",
      },
      {
        question: "What is an ecosystem?",
        options: [
          "A government environmental agency",
          "A community of living organisms and their physical environment",
          "A type of sustainable building",
          "A method of waste management",
        ],
        correctAnswer: 1,
        explanation:
          "An ecosystem is a community of living organisms (plants, animals, microbes) interacting with each other and their physical environment (air, water, soil). Ecosystems can be of various sizes and types, from a small pond to a large forest or ocean.",
      },
    ],
  },
  {
    id: 9,
    title: "World History Highlights",
    description: "Test knowledge of major historical events, figures, and periods",
    fullDescription:
      "This comprehensive history quiz covers significant events, influential figures, and important periods from ancient civilizations to modern times. It tests knowledge of world history across different regions and eras, including political developments, cultural movements, and technological advancements.",
    category: "education",
    tags: ["History", "World Events", "Education"],
    questionCount: 20,
    estimatedTime: 25,
    difficulty: "Intermediate",
    featured: false,
    suitableFor: ["History students", "History enthusiasts", "Educational settings", "General knowledge improvement"],
    questions: [
      {
        question: "Which ancient civilization built the Machu Picchu complex in Peru?",
        options: ["Maya", "Aztec", "Inca", "Olmec"],
        correctAnswer: 2,
        explanation:
          "Machu Picchu was built by the Inca Empire in the 15th century. This remarkable citadel sits on a mountain ridge 2,430 meters above sea level and was likely built as an estate for the Inca emperor Pachacuti.",
      },
      {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Dorothy Hodgkin", "Irène Joliot-Curie"],
        correctAnswer: 0,
        explanation:
          "Marie Curie was the first woman to win a Nobel Prize, receiving the Physics Prize in 1903 (shared with her husband Pierre Curie and Henri Becquerel) for their work on radiation. She later won a second Nobel Prize in Chemistry in 1911 for her discovery of radium and polonium.",
      },
      {
        question: "Which event marked the beginning of World War I?",
        options: [
          "The invasion of Poland",
          "The assassination of Archduke Franz Ferdinand",
          "The bombing of Pearl Harbor",
          "The signing of the Treaty of Versailles",
        ],
        correctAnswer: 1,
        explanation:
          "World War I began after the assassination of Archduke Franz Ferdinand of Austria-Hungary by Serbian nationalist Gavrilo Princip in Sarajevo on June 28, 1914. This event triggered a chain of diplomatic and military actions that led to the outbreak of the war.",
      },
      {
        question: "Which dynasty ruled China during the construction of the Great Wall?",
        options: ["Han Dynasty", "Tang Dynasty", "Ming Dynasty", "Song Dynasty"],
        correctAnswer: 2,
        explanation:
          "While earlier walls existed, the majority of the Great Wall of China as we know it today was built during the Ming Dynasty (1368-1644). The Ming rulers significantly expanded and reinforced the wall to protect against northern invasions.",
      },
      {
        question: "What was the Renaissance?",
        options: [
          "A religious movement",
          "A cultural movement emphasizing art and learning",
          "A political revolution in France",
          "An economic system",
        ],
        correctAnswer: 1,
        explanation:
          "The Renaissance was a cultural, artistic, political, and economic movement that began in Italy in the 14th century and spread throughout Europe. It marked the transition from the Middle Ages to modernity and was characterized by renewed interest in classical learning and values.",
      },
    ],
  },
  {
    id: 10,
    title: "Nutrition and Healthy Eating",
    description: "Test knowledge of nutrients, food groups, dietary guidelines, and healthy eating habits",
    fullDescription:
      "This health-focused quiz covers essential nutrition concepts including macronutrients, micronutrients, food groups, dietary guidelines, and healthy eating patterns. It tests understanding of how different foods affect the body and the principles of maintaining a balanced diet.",
    category: "health",
    tags: ["Nutrition", "Health", "Diet", "Wellness"],
    questionCount: 15,
    estimatedTime: 15,
    difficulty: "Easy",
    featured: false,
    suitableFor: ["Health classes", "Nutrition students", "Wellness programs", "Personal health education"],
    questions: [
      {
        question: "Which of these is NOT a macronutrient?",
        options: ["Protein", "Carbohydrates", "Vitamins", "Fat"],
        correctAnswer: 2,
        explanation:
          "Vitamins are micronutrients, not macronutrients. The three macronutrients are proteins, carbohydrates, and fats, which are needed in large amounts to provide energy and support bodily functions.",
      },
      {
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
        correctAnswer: 2,
        explanation:
          "Vitamin D is produced in the skin when it's exposed to ultraviolet B (UVB) rays from the sun. The body converts a chemical in the skin into vitamin D3, which is then processed by the liver and kidneys to create the active form of vitamin D.",
      },
      {
        question:
          "Which food group should make up the largest portion of a balanced meal according to the USDA MyPlate guidelines?",
        options: ["Proteins", "Grains", "Vegetables", "Fruits"],
        correctAnswer: 2,
        explanation:
          "According to the USDA MyPlate guidelines, vegetables should make up the largest portion of a balanced meal, followed by grains. The recommendation is to make half your plate fruits and vegetables, with vegetables taking up slightly more space than fruits.",
      },
      {
        question: "Which of these foods is the best source of omega-3 fatty acids?",
        options: ["Chicken", "Fatty fish (like salmon)", "Carrots", "White rice"],
        correctAnswer: 1,
        explanation:
          "Fatty fish like salmon, mackerel, sardines, and trout are excellent sources of omega-3 fatty acids, particularly EPA and DHA. These essential fatty acids are important for heart health, brain function, and reducing inflammation.",
      },
      {
        question: "What does the term 'calorie' measure?",
        options: ["Weight of food", "Energy content of food", "Volume of food", "Nutrient density"],
        correctAnswer: 1,
        explanation:
          "A calorie is a unit of measurement for energy. In nutrition, it specifically measures the amount of energy that food provides when consumed. The body uses this energy for physical activity, basic bodily functions, and maintaining body temperature.",
      },
    ],
  },
  {
    id: 11,
    title: "General Knowledge Quiz",
    description: "Test knowledge across a variety of topics including science, history, arts, and current events",
    fullDescription:
      "This wide-ranging quiz covers diverse topics including science, history, geography, arts, literature, sports, and current events. It's designed to test general knowledge across multiple domains and provide an engaging challenge for quiz enthusiasts of all backgrounds.",
    category: "general",
    tags: ["General Knowledge", "Trivia", "Mixed Topics"],
    questionCount: 20,
    estimatedTime: 20,
    difficulty: "Mixed",
    featured: false,
    suitableFor: ["Trivia nights", "General knowledge competitions", "Educational settings", "Social gatherings"],
    questions: [
      {
        question: "Which planet in our solar system has the most moons?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        correctAnswer: 1,
        explanation:
          "Saturn has the most confirmed moons with 83 (as of 2023), slightly more than Jupiter's 79. These numbers occasionally change as new moons are discovered or confirmed through ongoing astronomical research.",
      },
      {
        question: "Who wrote the novel '1984'?",
        options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"],
        correctAnswer: 1,
        explanation:
          "George Orwell (the pen name of Eric Arthur Blair) wrote '1984,' which was published in 1949. The dystopian novel introduces concepts like Big Brother, thoughtcrime, and Newspeak that have become part of our cultural vocabulary.",
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation:
          "The chemical symbol for gold is Au, which comes from the Latin word 'aurum,' meaning 'shining dawn' or 'glow of sunrise.' Gold is element 79 on the periodic table.",
      },
      {
        question: "Which country has won the most FIFA World Cup tournaments?",
        options: ["Germany", "Italy", "Argentina", "Brazil"],
        correctAnswer: 3,
        explanation:
          "Brazil has won the FIFA World Cup a record five times (1958, 1962, 1970, 1994, and 2002). Germany and Italy are tied for second place with four wins each.",
      },
      {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctAnswer: 2,
        explanation:
          "Canberra is the capital city of Australia. It was selected as the capital in 1908 as a compromise between rivals Sydney and Melbourne, and was specifically designed for the purpose of being the capital city.",
      },
    ],
  },
  {
    id: 12,
    title: "Financial Literacy Basics",
    description: "Test understanding of personal finance, investing, budgeting, and financial planning",
    fullDescription:
      "This practical quiz covers essential financial literacy concepts including budgeting, saving, investing, credit management, retirement planning, and tax basics. It tests understanding of personal finance principles that are important for making sound financial decisions.",
    category: "business",
    tags: ["Finance", "Money", "Investing", "Personal Finance"],
    questionCount: 15,
    estimatedTime: 15,
    difficulty: "Intermediate",
    featured: false,
    suitableFor: ["Financial education courses", "Young adults", "Personal finance workshops", "General education"],
    questions: [
      {
        question: "What is compound interest?",
        options: [
          "Interest calculated only on the initial principal",
          "Interest calculated on both the initial principal and accumulated interest",
          "A fixed interest rate that never changes",
          "Interest paid only at the end of a loan term",
        ],
        correctAnswer: 1,
        explanation:
          "Compound interest is calculated on both the initial principal and the accumulated interest from previous periods. This means your money grows at an accelerating rate over time, often described as 'interest on interest.'",
      },
      {
        question: "Which of these is typically considered the most tax-efficient retirement account?",
        options: ["Standard savings account", "Roth IRA", "Regular checking account", "Credit card rewards account"],
        correctAnswer: 1,
        explanation:
          "A Roth IRA is typically considered very tax-efficient because, while contributions are made with after-tax dollars, qualified withdrawals in retirement are completely tax-free, including all the investment growth.",
      },
      {
        question: "What does the term 'diversification' mean in investing?",
        options: [
          "Investing all your money in one promising stock",
          "Spreading investments across various assets to reduce risk",
          "Frequently trading stocks to maximize returns",
          "Investing only in foreign markets",
        ],
        correctAnswer: 1,
        explanation:
          "Diversification means spreading investments across different asset classes, industries, geographic regions, or financial instruments to reduce risk. The strategy aims to maximize returns by investing in different areas that would each react differently to the same event.",
      },
      {
        question: "What is a credit score primarily used for?",
        options: [
          "To determine your income level",
          "To evaluate your creditworthiness and risk as a borrower",
          "To calculate your net worth",
          "To determine your tax bracket",
        ],
        correctAnswer: 1,
        explanation:
          "A credit score is primarily used by lenders to evaluate your creditworthiness and determine the risk of lending you money. It affects whether you'll be approved for loans and credit cards, as well as the interest rates and terms you'll receive.",
      },
      {
        question: "Which of these is an example of a fixed expense in a budget?",
        options: ["Dining out", "Grocery shopping", "Monthly rent payment", "Entertainment"],
        correctAnswer: 2,
        explanation:
          "A fixed expense is a cost that remains constant each month, such as rent or mortgage payments, car payments, or insurance premiums. Variable expenses like dining out, groceries, and entertainment typically change from month to month.",
      },
    ],
  },
]
