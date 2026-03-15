// Procedurally generated list of 21,847 individuals referenced across all documents
// Top 10 are real data from mockData, the rest are generated from known name pools

import { topPersons } from "./mockData";

export interface IndexedPerson {
  id: string;
  name: string;
  mention_count: number;
  photo_url?: string;
  category: string;
}

const firstNames = [
  "James","John","Robert","Michael","David","William","Richard","Joseph","Thomas","Charles",
  "Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua",
  "Kenneth","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan",
  "Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon",
  "Benjamin","Samuel","Raymond","Gregory","Frank","Alexander","Patrick","Jack","Dennis","Jerry",
  "Tyler","Aaron","Jose","Nathan","Henry","Peter","Douglas","Adam","Zachary","Walter",
  "Mary","Patricia","Jennifer","Linda","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen",
  "Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Dorothy","Kimberly","Emily","Donna",
  "Michelle","Carol","Amanda","Melissa","Deborah","Stephanie","Rebecca","Sharon","Laura","Cynthia",
  "Kathleen","Amy","Angela","Shirley","Anna","Brenda","Pamela","Emma","Nicole","Helen",
  "Samantha","Katherine","Christine","Debra","Rachel","Carolyn","Janet","Catherine","Maria","Heather",
  "Diane","Ruth","Julie","Olivia","Joyce","Virginia","Victoria","Kelly","Lauren","Christina",
  "Joan","Evelyn","Judith","Megan","Andrea","Cheryl","Hannah","Jacqueline","Martha","Gloria",
  "Teresa","Ann","Sara","Madison","Frances","Kathryn","Janice","Jean","Abigail","Alice",
  "Judy","Sophia","Grace","Denise","Amber","Doris","Marilyn","Danielle","Beverly","Isabella",
  "Theresa","Diana","Natalie","Brittany","Charlotte","Marie","Kayla","Alexis","Lori","Alexandra",
];

const lastNames = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  "Gomez","Phillips","Evans","Turner","Diaz","Parker","Cruz","Edwards","Collins","Reyes",
  "Stewart","Morris","Morales","Murphy","Cook","Rogers","Gutierrez","Ortiz","Morgan","Cooper",
  "Peterson","Bailey","Reed","Kelly","Howard","Ramos","Kim","Cox","Ward","Richardson",
  "Watson","Brooks","Chavez","Wood","James","Bennett","Gray","Mendoza","Ruiz","Hughes",
  "Price","Alvarez","Castillo","Sanders","Patel","Myers","Long","Ross","Foster","Jimenez",
  "Powell","Jenkins","Perry","Russell","Sullivan","Bell","Coleman","Butler","Henderson","Barnes",
  "Gonzales","Fisher","Vasquez","Simmons","Graham","Murray","Ford","Castro","Stone","Walsh",
  "Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald",
  "Alexander","Hamilton","Crawford","Simpson","Mcdonald","Burke","Kelley","Weaver","Palmer","Wagner",
  "Hunt","Hicks","Holmes","Dunn","Carroll","Johnston","Freeman","Fox","Spencer","Gordon",
  "Hawkins","Lawrence","Gregory","Perkins","Franklin","Washington","Fields","Soto","Beck","Webb",
];

const categories = [
  "Court Filing", "Flight Log", "Deposition", "Police Report", "Financial Record",
  "Witness Statement", "Grand Jury", "FBI Memo", "Property Record", "Phone Record",
  "Email Record", "Surveillance Log", "Tax Filing", "Bank Record", "Travel Document",
];

// Seeded random for consistency
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateAllIndividuals(): IndexedPerson[] {
  const rand = seededRandom(42);
  const individuals: IndexedPerson[] = [];

  // Add the top 10 first
  for (const p of topPersons) {
    individuals.push({
      id: p.id,
      name: p.name,
      mention_count: p.mention_count,
      photo_url: p.photo_url,
      category: "Multiple Sources",
    });
  }

  // Generate remaining 21,837 individuals
  const usedNames = new Set(topPersons.map((p) => p.name));
  const targetTotal = 21847;

  while (individuals.length < targetTotal) {
    const first = firstNames[Math.floor(rand() * firstNames.length)];
    const last = lastNames[Math.floor(rand() * lastNames.length)];
    const name = `${first} ${last}`;

    if (usedNames.has(name)) continue;
    usedNames.add(name);

    // Mention counts follow power law distribution
    const r = rand();
    const mentionCount = Math.max(1, Math.floor(Math.pow(r, 3) * 1500));
    const cat = categories[Math.floor(rand() * categories.length)];

    individuals.push({
      id: `gen-${individuals.length}`,
      name,
      mention_count: mentionCount,
      category: cat,
    });
  }

  // Sort by mention count descending
  individuals.sort((a, b) => b.mention_count - a.mention_count);

  return individuals;
}

export const allIndividuals = generateAllIndividuals();
