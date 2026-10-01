// lib/exercises.ts

export interface Exercise {
  id: string;
  title: string;
  reps: string;
  gifUrl: string;
  category: "corde" | "ventre" | "bras" | "jambes" | "cardio";
}

export interface Session {
  id: string;
  day: string;
  title: string;
  exercises: Exercise[];
}

export interface Week {
  id: number;
  title: string;
  description: string;
  jumpGoal: number;
  badgeText: string;
  sessions: Session[];
}

export const PROGRAM_WEEKS: Week[] = [
  {
    id: 1,
    title: "Semaine 1 : Re-prise de contact",
    description: "Apprends le rythme de base et renforce ton endurance de départ.",
    jumpGoal: 1000,
    badgeText: "Débutant",
    sessions: [
      {
        id: "w1-s1",
        day: "Lundi",
        title: "Session 1 : Corde & Sangle abdominale",
        exercises: [
          {
            id: "w1-s1-e1",
            title: "Saut à pieds joints de base",
            reps: "3 x 1 min (pause 30s)",
            gifUrl: "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",
            category: "corde",
          },
          {
            id: "w1-s1-e2",
            title: "Planche faciale",
            reps: "3 x 45 sec",
            gifUrl: "https://media.giphy.com/media/xT1R3STOunvXS9p2o0/giphy.gif",
            category: "ventre",
          },
          {
            id: "w1-s1-e3",
            title: "Crunchs abdominaux",
            reps: "3 x 15 répétitions",
            gifUrl: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
            category: "ventre",
          },
        ],
      },
      {
        id: "w1-s2",
        day: "Mercredi",
        title: "Session 2 : Corde & Renforcement Bras",
        exercises: [
          {
            id: "w1-s2-e1",
            title: "Saut alternatif (Pas de course)",
            reps: "3 x 1 min 30 (pause 30s)",
            gifUrl: "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",
            category: "corde",
          },
          {
            id: "w1-s2-e2",
            title: "Pompes sur les genoux",
            reps: "3 x 10 répétitions",
            gifUrl: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
            category: "bras",
          },
          {
            id: "w1-s2-e3",
            title: "Dips sur chaise",
            reps: "3 x 12 répétitions",
            gifUrl: "https://media.giphy.com/media/xT1R3STOunvXS9p2o0/giphy.gif",
            category: "bras",
          },
        ],
      },
      {
        id: "w1-s3",
        day: "Vendredi",
        title: "Session 3 : Full Body Burn",
        exercises: [
          {
            id: "w1-s3-e1",
            title: "Saut de corde Intervalle (HIIT)",
            reps: "5 x 45s effort / 15s repos",
            gifUrl: "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",
            category: "cardio",
          },
          {
            id: "w1-s3-e2",
            title: "Mountain Climbers",
            reps: "3 x 30 sec",
            gifUrl: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
            category: "ventre",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Semaine 2 : Montée en puissance",
    description: "Augmentation des durées d'effort et travail de la coordination.",
    jumpGoal: 1500,
    badgeText: "Débutant +",
    sessions: [
      {
        id: "w2-s1",
        day: "Lundi",
        title: "Session 1 : Endurance & Core",
        exercises: [
          {
            id: "w2-s1-e1",
            title: "Saut de corde pieds joints",
            reps: "4 x 1 min 30",
            gifUrl: "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",
            category: "corde",
          },
          {
            id: "w2-s1-e2",
            title: "Russian Twists",
            reps: "3 x 20 répétitions",
            gifUrl: "https://media.giphy.com/media/xT1R3STOunvXS9p2o0/giphy.gif",
            category: "ventre",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Semaine 3 : Agilité & Brûle-Graisses",
    description: "Introduction du double-saut dynamique et exercices ciblés bras.",
    jumpGoal: 2000,
    badgeText: "Intermédiaire",
    sessions: [],
  },
  {
    id: 4,
    title: "Semaine 4 : Test de mi-parcours",
    description: "Évalue tes progrès et franchis le cap des 2500 sauts.",
    jumpGoal: 2500,
    badgeText: "Intermédiaire",
    sessions: [],
  },
  {
    id: 5,
    title: "Semaine 5 : Haute Intensité (HIIT)",
    description: "Accélération du rythme cardiaque et tonification musculaire profonde.",
    jumpGoal: 3000,
    badgeText: "Avancé",
    sessions: [],
  },
  {
    id: 6,
    title: "Semaine 6 : Endurance Extrême",
    description: "Maintien des efforts longs avec un minimum de récupération.",
    jumpGoal: 3500,
    badgeText: "Avancé",
    sessions: [],
  },
  {
    id: 7,
    title: "Semaine 7 : Sculpt & Speed",
    description: "Vitesse maximale sur corde combinée au renforcement musculaire ciblé.",
    jumpGoal: 4000,
    badgeText: "Expert",
    sessions: [],
  },
  {
    id: 8,
    title: "Semaine 8 : La Grande Finale",
    description: "Le sommet du programme ! Prouve ta transformation ultime.",
    jumpGoal: 5000,
    badgeText: "Championne 🏆",
    sessions: [],
  },
];