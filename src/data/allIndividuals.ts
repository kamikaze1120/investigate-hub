// Procedurally generated list of 21,847 individuals referenced across all documents

import { topPersons } from "./mockData";

export interface IndexedPerson {
  id: string;
  name: string;
  mention_count: number;
  photo_url?: string;
  category: string;
}

const firstNames = [
  "James", "John", "Robert", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles",
  "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua",
  "Kenneth", "Kevin", "Brian", "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan",
  "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon",
  "Benjamin", "Samuel", "Raymond", "Gregory", "Frank", "Alexander", "Patrick", "Jack", "Dennis", "Jerry",
  "Tyler", "Aaron", "Jose", "Nathan", "Henry", "Peter", "Douglas", "Adam", "Zachary", "Walter",
  "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen",
  "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Dorothy", "Kimberly", "Emily", "Donna",
  "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia",
  "Kathleen", "Amy", "Angela", "Shirley", "Anna", "Brenda", "Pamela", "Emma", "Nicole", "Helen",
  "Samantha", "Katherine", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather",
  "Diane", "Ruth", "Julie", "Olivia", "Joyce", "Virginia", "Victoria", "Kelly", "Lauren", "Christina",
  "Joan", "Evelyn", "Judith", "Megan", "Andrea", "Cheryl", "Hannah", "Jacqueline", "Martha", "Gloria",
  "Teresa", "Ann", "Sara", "Madison", "Frances", "Kathryn", "Janice", "Jean", "Abigail", "Alice",
  "Judy", "Sophia", "Grace", "Denise", "Amber", "Doris", "Marilyn", "Danielle", "Beverly", "Isabella",
  "Theresa", "Diana", "Natalie", "Brittany", "Charlotte", "Marie", "Kayla", "Alexis", "Lori", "Alexandra",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
  "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
  "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
  "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson",
  "Watson", "Brooks", "Chavez", "Wood", "James", "Bennett", "Gray", "Mendoza", "Ruiz", "Hughes",
  "Price", "Alvarez", "Castillo", "Sanders", "Patel", "Myers", "Long", "Ross", "Foster", "Jimenez",
  "Powell", "Jenkins", "Perry", "Russell", "Sullivan", "Bell", "Coleman", "Butler", "Henderson", "Barnes",
  "Gonzales", "Fisher", "Vasquez", "Simmons", "Graham", "Murray", "Ford", "Castro", "Stone", "Walsh",
  "Cole", "West", "Jordan", "Owens", "Reynolds", "Ellis", "Harrison", "Gibson", "McDonald", "Alexander",
  "Hamilton", "Crawford", "Simpson", "Burke", "Kelley", "Weaver", "Palmer", "Wagner", "Hunt", "Hicks",
  "Holmes", "Dunn", "Carroll", "Johnston", "Freeman", "Fox", "Spencer", "Gordon", "Hawkins", "Lawrence",
  "Perkins", "Franklin", "Washington", "Fields", "Soto", "Beck", "Webb", "Trump",
];

const categories = [
  "Court Filing", "Flight Log", "Deposition", "Police Report", "Financial Record",
  "Witness Statement", "Grand Jury", "FBI Memo", "Property Record", "Phone Record",
  "Email Record", "Surveillance Log", "Tax Filing", "Bank Record", "Travel Document",
];

const avatarStyles = [
  "personas",
  "notionists",
  "adventurer-neutral",
  "micah",
  "lorelei-neutral",
] as const;

const notableIndividuals: IndexedPerson[] = [
  { id: "notable-donald-trump", name: "Donald Trump", mention_count: 1826, category: "Flight Log" },
  { id: "notable-bill-clinton", name: "Bill Clinton", mention_count: 1497, category: "Flight Log" },
  { id: "notable-prince-andrew", name: "Prince Andrew", mention_count: 1712, category: "Court Filing" },
  { id: "notable-alan-dershowitz", name: "Alan Dershowitz", mention_count: 1244, category: "Legal Filing" },
  { id: "notable-les-wexner", name: "Les Wexner", mention_count: 987, category: "Financial Record" },
  { id: "notable-steve-bannon", name: "Steve Bannon", mention_count: 312, category: "Phone Record" },
  { id: "notable-kevin-spacey", name: "Kevin Spacey", mention_count: 445, category: "Flight Log" },
  { id: "notable-chris-tucker", name: "Chris Tucker", mention_count: 389, category: "Flight Log" },
  { id: "notable-naomi-campbell", name: "Naomi Campbell", mention_count: 267, category: "Flight Log" },
  { id: "notable-bill-richardson", name: "Bill Richardson", mention_count: 534, category: "Court Filing" },
  { id: "notable-george-mitchell", name: "George Mitchell", mention_count: 478, category: "Court Filing" },
  { id: "notable-glenn-dubin", name: "Glenn Dubin", mention_count: 612, category: "Financial Record" },
  { id: "notable-eva-dubin", name: "Eva Dubin", mention_count: 498, category: "Witness Statement" },
  { id: "notable-marvin-minsky", name: "Marvin Minsky", mention_count: 189, category: "Deposition" },
  { id: "notable-stephen-hawking", name: "Stephen Hawking", mention_count: 134, category: "Travel Document" },
  { id: "notable-ehud-barak", name: "Ehud Barak", mention_count: 723, category: "Property Record" },
  { id: "notable-john-mark", name: "John Mark", mention_count: 156, category: "FBI Memo" },
  { id: "notable-reid-weingarten", name: "Reid Weingarten", mention_count: 276, category: "Legal Filing" },
  { id: "notable-gerald-lefcourt", name: "Gerald Lefcourt", mention_count: 198, category: "Legal Filing" },
  { id: "notable-jay-lefkowitz", name: "Jay Lefkowitz", mention_count: 234, category: "Legal Filing" },
  { id: "notable-dershowitz-wife", name: "Carolyn Cohen", mention_count: 145, category: "Travel Document" },
  { id: "notable-tom-pritzker", name: "Tom Pritzker", mention_count: 167, category: "Financial Record" },
  { id: "notable-mort-zuckerman", name: "Mort Zuckerman", mention_count: 289, category: "Phone Record" },
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function hashKey(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildGeneratedPortrait(id: string, name: string) {
  const style = avatarStyles[hashKey(`${id}:${name}`) % avatarStyles.length];
  const seed = encodeURIComponent(`${id}-${name}`);
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}&backgroundType=gradientLinear`;
}

function generateAllIndividuals(): IndexedPerson[] {
  const rand = seededRandom(42);
  const individuals: IndexedPerson[] = [];

  for (const p of topPersons) {
    individuals.push({
      id: p.id,
      name: p.name,
      mention_count: p.mention_count,
      photo_url: p.photo_url || buildGeneratedPortrait(p.id, p.name),
      category: "Multiple Sources",
    });
  }

  const usedNames = new Set(topPersons.map((p) => p.name));

  for (const notable of notableIndividuals) {
    if (!usedNames.has(notable.name)) {
      usedNames.add(notable.name);
      individuals.push({
        ...notable,
        photo_url: notable.photo_url || buildGeneratedPortrait(notable.id, notable.name),
      });
    }
  }

  const targetTotal = 21847;

  while (individuals.length < targetTotal) {
    const first = firstNames[Math.floor(rand() * firstNames.length)];
    const last = lastNames[Math.floor(rand() * lastNames.length)];
    const name = `${first} ${last}`;

    if (usedNames.has(name)) continue;
    usedNames.add(name);

    const r = rand();
    const mentionCount = Math.max(1, Math.floor(Math.pow(r, 3) * 1500));
    const category = categories[Math.floor(rand() * categories.length)];
    const generatedId = `gen-${individuals.length}`;

    individuals.push({
      id: generatedId,
      name,
      mention_count: mentionCount,
      category,
      photo_url: buildGeneratedPortrait(generatedId, name),
    });
  }

  individuals.sort((a, b) => b.mention_count - a.mention_count);

  return individuals;
}

export const allIndividuals = generateAllIndividuals();
