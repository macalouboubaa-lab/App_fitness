// lib/exercises.ts

export interface Exercise {
  id: string;
  title: string;
  reps: string;
  gifUrl: string;
  imageUrl?: string;
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

const EXERCISE_IMAGE_URLS: Record<string, string> = {
  "/gifs/cercles-bras.gif": "/images/cercles-bras.svg",
  "/gifs/montees-genoux.gif": "/images/montees-genoux.svg",
  "/gifs/squat-lent.gif": "/images/squat-lent.svg",
  "/gifs/corde-saut.gif": "/images/corde-saut.svg",
  "/gifs/crunch.gif": "/images/crunch.svg",
  "/gifs/gainage.gif": "/images/gainage.svg",
  "/gifs/planche-laterale.gif": "/images/planche-laterale.svg",
  "/gifs/releves-jambes.gif": "/images/releves-jambes.svg",
  "/gifs/russian-twists.gif": "/images/russian-twists.svg",
  "/gifs/bicyclette.gif": "/images/bicyclette.svg",
  "/gifs/pompes-genoux.gif": "/images/pompes-genoux.svg",
  "/gifs/dips-chaise.gif": "/images/dips-chaise.svg",
  "/gifs/superman.gif": "/images/superman.svg",
  "/gifs/squat.gif": "/images/squat.svg",
  "/gifs/squat-bulgare.gif": "/images/squat-bulgare.svg",
  "/gifs/fentes-avant.gif": "/images/fentes-avant.svg",
  "/gifs/fentes-arriere.gif": "/images/fentes-arriere.svg",
  "/gifs/fentes-marchees.gif": "/images/fentes-marchees.svg",
  "/gifs/glute-bridge.gif": "/images/glute-bridge.svg",
  "/gifs/glute-bridge-1jambe.gif": "/images/glute-bridge-1jambe.svg",
  "/gifs/hip-thrust.gif": "/images/hip-thrust.svg",
  "/gifs/donkey-kicks.gif": "/images/donkey-kicks.svg",
  "/gifs/fire-hydrant.gif": "/images/fire-hydrant.svg",
  "/gifs/wall-sit.gif": "/images/wall-sit.svg",
  "/gifs/step-up.gif": "/images/step-up.svg",
  "/gifs/mollets.gif": "/images/mollets.svg",
};

function addExerciseImages(exercises: Exercise[]): Exercise[] {
  return exercises.map((exercise) => {
    const imageUrl = EXERCISE_IMAGE_URLS[exercise.gifUrl];
    return imageUrl ? { ...exercise, imageUrl } : exercise;
  });
}

// ═══════════════════════════════════════════════
// HELPER : Génère les 4 séances d'une semaine
// ═══════════════════════════════════════════════
function createWeekSessions(
  weekNum: number,
  sessionA: { corde: string; renforcement: Exercise[] },
  sessionB: { corde: string; circuit: Exercise[] }
): Session[] {
  const prefix = `w${weekNum}`;

  return [
    {
      id: `${prefix}-lundi`,
      day: "Lundi",
      title: "Séance A : Corde + Ventre + Bras",
      exercises: addExerciseImages(sessionA.renforcement),
    },
    {
      id: `${prefix}-mercredi`,
      day: "Mercredi",
      title: "Séance B : Corde + Cuisses + Fessiers",
      exercises: addExerciseImages(sessionB.circuit),
    },
    {
      id: `${prefix}-vendredi`,
      day: "Vendredi",
      title: "Séance A : Corde + Ventre + Bras",
      exercises: addExerciseImages(
        sessionA.renforcement.map((e) => ({
          ...e,
          id: e.id.replace(`${prefix}-a`, `${prefix}-v`),
        }))
      ),
    },
    {
      id: `${prefix}-dimanche`,
      day: "Dimanche",
      title: "Séance B : Corde + Cuisses + Fessiers",
      exercises: addExerciseImages(
        sessionB.circuit.map((e) => ({
          ...e,
          id: e.id.replace(`${prefix}-b`, `${prefix}-d`),
        }))
      ),
    },
  ];
}

// ═══════════════════════════════════════════════
// PROGRAMME COMPLET 8 SEMAINES
// ═══════════════════════════════════════════════

export const PROGRAM_WEEKS: Week[] = [
  // ══════════════ SEMAINE 1 ══════════════
  {
    id: 1,
    title: "Semaine 1 : Re-prise de contact",
    description: "Apprends le rythme de base et renforce ton endurance de départ.",
    jumpGoal: 300,
    badgeText: "Débutant",
    sessions: createWeekSessions(
      1,
      {
        corde: "10 × 30 sauts",
        renforcement: [
          { id: "w1-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w1-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w1-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w1-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w1-a-e5", title: "Saut à la corde (10 × 30 sauts)", reps: "10 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w1-a-e6", title: "Crunchs", reps: "15 répétitions × 2 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w1-a-e7", title: "Gainage ventral", reps: "20 sec × 2 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w1-a-e8", title: "Pompes sur genoux", reps: "10 × 2 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w1-a-e9", title: "Dips sur chaise", reps: "10 × 2 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w1-a-e10", title: "Relevés de jambes", reps: "10 × 2 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
        ],
      },
      {
        corde: "10 × 30 sauts",
        circuit: [
          { id: "w1-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w1-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w1-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w1-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w1-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w1-b-e6", title: "Saut à la corde (10 × 30 sauts)", reps: "10 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w1-b-e7", title: "Squat", reps: "12 × 2 tours", gifUrl: "/gifs/squat.gif", category: "jambes" },
          { id: "w1-b-e8", title: "Fentes avant alternées", reps: "10/jambe × 2 tours", gifUrl: "/gifs/fentes-avant.gif", category: "jambes" },
          { id: "w1-b-e9", title: "Glute bridge", reps: "15 × 2 tours", gifUrl: "/gifs/glute-bridge.gif", category: "jambes" },
          { id: "w1-b-e10", title: "Donkey kicks", reps: "12/jambe × 2 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w1-b-e11", title: "Wall sit", reps: "20 sec × 2 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
          { id: "w1-b-e12", title: "Mollets debout", reps: "20 × 2 tours", gifUrl: "/gifs/mollets.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 2 ══════════════
  {
    id: 2,
    title: "Semaine 2 : Montée en puissance",
    description: "Augmentation des durées d'effort et travail de la coordination.",
    jumpGoal: 400,
    badgeText: "Débutant +",
    sessions: createWeekSessions(
      2,
      {
        corde: "10 × 40 sauts",
        renforcement: [
          { id: "w2-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w2-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w2-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w2-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w2-a-e5", title: "Saut à la corde (10 × 40 sauts)", reps: "10 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w2-a-e6", title: "Crunchs", reps: "20 × 3 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w2-a-e7", title: "Gainage ventral", reps: "30 sec × 3 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w2-a-e8", title: "Pompes sur genoux", reps: "12 × 3 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w2-a-e9", title: "Dips sur chaise", reps: "12 × 3 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w2-a-e10", title: "Relevés de jambes", reps: "12 × 3 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w2-a-e11", title: "Planche latérale", reps: "20 sec/côté × 3 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
        ],
      },
      {
        corde: "10 × 40 sauts",
        circuit: [
          { id: "w2-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w2-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w2-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w2-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w2-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w2-b-e6", title: "Saut à la corde (10 × 40 sauts)", reps: "10 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w2-b-e7", title: "Squat", reps: "15 × 3 tours", gifUrl: "/gifs/squat.gif", category: "jambes" },
          { id: "w2-b-e8", title: "Fentes avant alternées", reps: "12/jambe × 3 tours", gifUrl: "/gifs/fentes-avant.gif", category: "jambes" },
          { id: "w2-b-e9", title: "Glute bridge", reps: "18 × 3 tours", gifUrl: "/gifs/glute-bridge.gif", category: "jambes" },
          { id: "w2-b-e10", title: "Donkey kicks", reps: "15/jambe × 3 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w2-b-e11", title: "Fire hydrant", reps: "12/jambe × 3 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w2-b-e12", title: "Wall sit", reps: "30 sec × 3 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
          { id: "w2-b-e13", title: "Mollets debout", reps: "25 × 3 tours", gifUrl: "/gifs/mollets.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 3 ══════════════
  {
    id: 3,
    title: "Semaine 3 : Agilité & Brûle-Graisses",
    description: "Introduction du travail d'agilité et exercices ciblés bras.",
    jumpGoal: 500,
    badgeText: "Intermédiaire",
    sessions: createWeekSessions(
      3,
      {
        corde: "10 × 50 sauts",
        renforcement: [
          { id: "w3-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w3-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w3-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w3-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w3-a-e5", title: "Saut à la corde (10 × 50 sauts)", reps: "10 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w3-a-e6", title: "Crunchs", reps: "25 × 3 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w3-a-e7", title: "Gainage ventral", reps: "40 sec × 3 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w3-a-e8", title: "Pompes sur genoux", reps: "15 × 3 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w3-a-e9", title: "Dips sur chaise", reps: "15 × 3 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w3-a-e10", title: "Relevés de jambes", reps: "15 × 3 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w3-a-e11", title: "Planche latérale", reps: "30 sec/côté × 3 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
          { id: "w3-a-e12", title: "Superman", reps: "15 × 3 tours", gifUrl: "/gifs/superman.gif", category: "bras" },
        ],
      },
      {
        corde: "10 × 50 sauts",
        circuit: [
          { id: "w3-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w3-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w3-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w3-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w3-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w3-b-e6", title: "Saut à la corde (10 × 50 sauts)", reps: "10 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w3-b-e7", title: "Squat", reps: "18 × 3 tours", gifUrl: "/gifs/squat.gif", category: "jambes" },
          { id: "w3-b-e8", title: "Fentes avant alternées", reps: "14/jambe × 3 tours", gifUrl: "/gifs/fentes-avant.gif", category: "jambes" },
          { id: "w3-b-e9", title: "Glute bridge", reps: "20 × 3 tours", gifUrl: "/gifs/glute-bridge.gif", category: "jambes" },
          { id: "w3-b-e10", title: "Donkey kicks", reps: "15/jambe × 3 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w3-b-e11", title: "Fire hydrant", reps: "15/jambe × 3 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w3-b-e12", title: "Hip thrust au sol", reps: "15 × 3 tours", gifUrl: "/gifs/hip-thrust.gif", category: "jambes" },
          { id: "w3-b-e13", title: "Wall sit", reps: "35 sec × 3 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
          { id: "w3-b-e14", title: "Mollets debout", reps: "25 × 3 tours", gifUrl: "/gifs/mollets.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 4 ══════════════
  {
    id: 4,
    title: "Semaine 4 : Test de mi-parcours",
    description: "Évalue tes progrès et franchis le cap des 600 sauts.",
    jumpGoal: 600,
    badgeText: "Intermédiaire",
    sessions: createWeekSessions(
      4,
      {
        corde: "12 × 50 sauts",
        renforcement: [
          { id: "w4-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w4-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w4-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w4-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w4-a-e5", title: "Saut à la corde (12 × 50 sauts)", reps: "12 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w4-a-e6", title: "Crunchs", reps: "25 × 4 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w4-a-e7", title: "Gainage ventral", reps: "45 sec × 4 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w4-a-e8", title: "Pompes sur genoux", reps: "15 × 4 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w4-a-e9", title: "Dips sur chaise", reps: "15 × 4 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w4-a-e10", title: "Relevés de jambes", reps: "15 × 4 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w4-a-e11", title: "Planche latérale", reps: "30 sec/côté × 4 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
          { id: "w4-a-e12", title: "Superman", reps: "15 × 4 tours", gifUrl: "/gifs/superman.gif", category: "bras" },
          { id: "w4-a-e13", title: "Russian twists", reps: "20 × 4 tours", gifUrl: "/gifs/russian-twists.gif", category: "ventre" },
        ],
      },
      {
        corde: "12 × 50 sauts",
        circuit: [
          { id: "w4-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w4-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w4-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w4-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w4-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w4-b-e6", title: "Saut à la corde (12 × 50 sauts)", reps: "12 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w4-b-e7", title: "Squat sumo", reps: "15 × 3 tours", gifUrl: "/gifs/squat-sumo.gif", category: "jambes" },
          { id: "w4-b-e8", title: "Fentes avant alternées", reps: "15/jambe × 3 tours", gifUrl: "/gifs/fentes-avant.gif", category: "jambes" },
          { id: "w4-b-e9", title: "Fentes arrière alternées", reps: "12/jambe × 3 tours", gifUrl: "/gifs/fentes-arriere.gif", category: "jambes" },
          { id: "w4-b-e10", title: "Glute bridge", reps: "20 × 3 tours", gifUrl: "/gifs/glute-bridge.gif", category: "jambes" },
          { id: "w4-b-e11", title: "Hip thrust au sol", reps: "18 × 3 tours", gifUrl: "/gifs/hip-thrust.gif", category: "jambes" },
          { id: "w4-b-e12", title: "Donkey kicks", reps: "15/jambe × 3 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w4-b-e13", title: "Fire hydrant", reps: "15/jambe × 3 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w4-b-e14", title: "Wall sit", reps: "40 sec × 3 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
          { id: "w4-b-e15", title: "Mollets debout", reps: "30 × 3 tours", gifUrl: "/gifs/mollets.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 5 ══════════════
  {
    id: 5,
    title: "Semaine 5 : Haute Intensité (HIIT)",
    description: "Accélération du rythme cardiaque et tonification musculaire profonde.",
    jumpGoal: 700,
    badgeText: "Avancé",
    sessions: createWeekSessions(
      5,
      {
        corde: "14 × 50 sauts",
        renforcement: [
          { id: "w5-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w5-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w5-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w5-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w5-a-e5", title: "Saut à la corde (14 × 50 sauts)", reps: "14 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w5-a-e6", title: "Crunchs", reps: "30 × 4 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w5-a-e7", title: "Gainage ventral", reps: "50 sec × 4 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w5-a-e8", title: "Pompes sur genoux", reps: "18 × 4 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w5-a-e9", title: "Dips sur chaise", reps: "18 × 4 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w5-a-e10", title: "Relevés de jambes", reps: "18 × 4 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w5-a-e11", title: "Planche latérale", reps: "40 sec/côté × 4 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
          { id: "w5-a-e12", title: "Superman", reps: "18 × 4 tours", gifUrl: "/gifs/superman.gif", category: "bras" },
          { id: "w5-a-e13", title: "Russian twists", reps: "25 × 4 tours", gifUrl: "/gifs/russian-twists.gif", category: "ventre" },
        ],
      },
      {
        corde: "14 × 50 sauts",
        circuit: [
          { id: "w5-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w5-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w5-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w5-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w5-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w5-b-e6", title: "Saut à la corde (14 × 50 sauts)", reps: "14 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w5-b-e7", title: "Squat sumo", reps: "18 × 4 tours", gifUrl: "/gifs/squat-sumo.gif", category: "jambes" },
          { id: "w5-b-e8", title: "Fentes avant", reps: "15/jambe × 4 tours", gifUrl: "/gifs/fentes-avant.gif", category: "jambes" },
          { id: "w5-b-e9", title: "Fentes arrière", reps: "15/jambe × 4 tours", gifUrl: "/gifs/fentes-arriere.gif", category: "jambes" },
          { id: "w5-b-e10", title: "Glute bridge une jambe", reps: "10/jambe × 4 tours", gifUrl: "/gifs/glute-bridge-1jambe.gif", category: "jambes" },
          { id: "w5-b-e11", title: "Hip thrust au sol", reps: "20 × 4 tours", gifUrl: "/gifs/hip-thrust.gif", category: "jambes" },
          { id: "w5-b-e12", title: "Donkey kicks", reps: "18/jambe × 4 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w5-b-e13", title: "Fire hydrant", reps: "15/jambe × 4 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w5-b-e14", title: "Step-up sur chaise", reps: "12/jambe × 4 tours", gifUrl: "/gifs/step-up.gif", category: "jambes" },
          { id: "w5-b-e15", title: "Wall sit", reps: "45 sec × 4 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
          { id: "w5-b-e16", title: "Mollets debout", reps: "30 × 4 tours", gifUrl: "/gifs/mollets.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 6 ══════════════
  {
    id: 6,
    title: "Semaine 6 : Endurance Extrême",
    description: "Maintien des efforts longs avec un minimum de récupération.",
    jumpGoal: 800,
    badgeText: "Avancé",
    sessions: createWeekSessions(
      6,
      {
        corde: "16 × 50 sauts",
        renforcement: [
          { id: "w6-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w6-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w6-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w6-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w6-a-e5", title: "Saut à la corde (16 × 50 sauts)", reps: "16 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w6-a-e6", title: "Crunchs", reps: "30 × 4 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w6-a-e7", title: "Gainage ventral", reps: "60 sec × 4 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w6-a-e8", title: "Pompes sur genoux", reps: "20 × 4 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w6-a-e9", title: "Dips sur chaise", reps: "20 × 4 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w6-a-e10", title: "Relevés de jambes", reps: "20 × 4 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w6-a-e11", title: "Planche latérale", reps: "45 sec/côté × 4 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
          { id: "w6-a-e12", title: "Superman", reps: "20 × 4 tours", gifUrl: "/gifs/superman.gif", category: "bras" },
          { id: "w6-a-e13", title: "Russian twists", reps: "30 × 4 tours", gifUrl: "/gifs/russian-twists.gif", category: "ventre" },
          { id: "w6-a-e14", title: "Bicyclette", reps: "20 × 4 tours", gifUrl: "/gifs/bicyclette.gif", category: "ventre" },
        ],
      },
      {
        corde: "16 × 50 sauts",
        circuit: [
          { id: "w6-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w6-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w6-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w6-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w6-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w6-b-e6", title: "Saut à la corde (16 × 50 sauts)", reps: "16 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w6-b-e7", title: "Squat sumo", reps: "20 × 4 tours", gifUrl: "/gifs/squat-sumo.gif", category: "jambes" },
          { id: "w6-b-e8", title: "Fentes marchées", reps: "15/jambe × 4 tours", gifUrl: "/gifs/fentes-marchees.gif", category: "jambes" },
          { id: "w6-b-e9", title: "Fentes arrière", reps: "15/jambe × 4 tours", gifUrl: "/gifs/fentes-arriere.gif", category: "jambes" },
          { id: "w6-b-e10", title: "Squat bulgare (chaise)", reps: "10/jambe × 4 tours", gifUrl: "/gifs/squat-bulgare.gif", category: "jambes" },
          { id: "w6-b-e11", title: "Glute bridge une jambe", reps: "12/jambe × 4 tours", gifUrl: "/gifs/glute-bridge-1jambe.gif", category: "jambes" },
          { id: "w6-b-e12", title: "Hip thrust au sol", reps: "22 × 4 tours", gifUrl: "/gifs/hip-thrust.gif", category: "jambes" },
          { id: "w6-b-e13", title: "Donkey kicks", reps: "18/jambe × 4 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w6-b-e14", title: "Fire hydrant", reps: "18/jambe × 4 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w6-b-e15", title: "Step-up sur chaise", reps: "15/jambe × 4 tours", gifUrl: "/gifs/step-up.gif", category: "jambes" },
          { id: "w6-b-e16", title: "Wall sit", reps: "50 sec × 4 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 7 ══════════════
  {
    id: 7,
    title: "Semaine 7 : Sculpt & Speed",
    description: "Vitesse maximale sur corde combinée au renforcement musculaire ciblé.",
    jumpGoal: 900,
    badgeText: "Expert",
    sessions: createWeekSessions(
      7,
      {
        corde: "18 × 50 sauts",
        renforcement: [
          { id: "w7-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w7-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w7-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w7-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w7-a-e5", title: "Saut à la corde (18 × 50 sauts)", reps: "18 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w7-a-e6", title: "Crunchs", reps: "30 × 5 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w7-a-e7", title: "Gainage ventral", reps: "60 sec × 5 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w7-a-e8", title: "Pompes sur genoux", reps: "20 × 5 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w7-a-e9", title: "Dips sur chaise", reps: "20 × 5 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w7-a-e10", title: "Relevés de jambes", reps: "20 × 5 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w7-a-e11", title: "Planche latérale", reps: "45 sec/côté × 5 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
          { id: "w7-a-e12", title: "Superman", reps: "20 × 5 tours", gifUrl: "/gifs/superman.gif", category: "bras" },
          { id: "w7-a-e13", title: "Russian twists", reps: "30 × 5 tours", gifUrl: "/gifs/russian-twists.gif", category: "ventre" },
          { id: "w7-a-e14", title: "Bicyclette", reps: "30 × 5 tours", gifUrl: "/gifs/bicyclette.gif", category: "ventre" },
        ],
      },
      {
        corde: "18 × 50 sauts",
        circuit: [
          { id: "w7-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w7-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w7-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w7-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w7-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w7-b-e6", title: "Saut à la corde (18 × 50 sauts)", reps: "18 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w7-b-e7", title: "Squat sumo", reps: "22 × 5 tours", gifUrl: "/gifs/squat-sumo.gif", category: "jambes" },
          { id: "w7-b-e8", title: "Fentes marchées", reps: "18/jambe × 5 tours", gifUrl: "/gifs/fentes-marchees.gif", category: "jambes" },
          { id: "w7-b-e9", title: "Fentes arrière", reps: "15/jambe × 5 tours", gifUrl: "/gifs/fentes-arriere.gif", category: "jambes" },
          { id: "w7-b-e10", title: "Squat bulgare", reps: "12/jambe × 5 tours", gifUrl: "/gifs/squat-bulgare.gif", category: "jambes" },
          { id: "w7-b-e11", title: "Glute bridge une jambe", reps: "15/jambe × 5 tours", gifUrl: "/gifs/glute-bridge-1jambe.gif", category: "jambes" },
          { id: "w7-b-e12", title: "Hip thrust au sol", reps: "25 × 5 tours", gifUrl: "/gifs/hip-thrust.gif", category: "jambes" },
          { id: "w7-b-e13", title: "Donkey kicks", reps: "20/jambe × 5 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w7-b-e14", title: "Fire hydrant", reps: "20/jambe × 5 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w7-b-e15", title: "Step-up sur chaise", reps: "15/jambe × 5 tours", gifUrl: "/gifs/step-up.gif", category: "jambes" },
          { id: "w7-b-e16", title: "Wall sit", reps: "60 sec × 5 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
        ],
      }
    ),
  },

  // ══════════════ SEMAINE 8 ══════════════
  {
    id: 8,
    title: "Semaine 8 : La Grande Finale",
    description: "Le sommet du programme ! Prouve ta transformation ultime.",
    jumpGoal: 1000,
    badgeText: "Championne 🏆",
    sessions: createWeekSessions(
      8,
      {
        corde: "20 × 50 sauts",
        renforcement: [
          { id: "w8-a-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w8-a-e2", title: "Cercles de bras", reps: "30 sec", gifUrl: "/gifs/cercles-bras.gif", category: "cardio" },
          { id: "w8-a-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w8-a-e4", title: "Rotations chevilles + poignets", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w8-a-e5", title: "Saut à la corde (20 × 50 sauts)", reps: "20 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w8-a-e6", title: "Crunchs", reps: "35 × 5 tours", gifUrl: "/gifs/crunch.gif", category: "ventre" },
          { id: "w8-a-e7", title: "Gainage ventral", reps: "75 sec × 5 tours", gifUrl: "/gifs/gainage.gif", category: "ventre" },
          { id: "w8-a-e8", title: "Pompes sur genoux", reps: "22 × 5 tours", gifUrl: "/gifs/pompes-genoux.gif", category: "bras" },
          { id: "w8-a-e9", title: "Dips sur chaise", reps: "22 × 5 tours", gifUrl: "/gifs/dips-chaise.gif", category: "bras" },
          { id: "w8-a-e10", title: "Relevés de jambes", reps: "22 × 5 tours", gifUrl: "/gifs/releves-jambes.gif", category: "ventre" },
          { id: "w8-a-e11", title: "Planche latérale", reps: "60 sec/côté × 5 tours", gifUrl: "/gifs/planche-laterale.gif", category: "ventre" },
          { id: "w8-a-e12", title: "Superman", reps: "22 × 5 tours", gifUrl: "/gifs/superman.gif", category: "bras" },
          { id: "w8-a-e13", title: "Russian twists", reps: "35 × 5 tours", gifUrl: "/gifs/russian-twists.gif", category: "ventre" },
          { id: "w8-a-e14", title: "Bicyclette", reps: "35 × 5 tours", gifUrl: "/gifs/bicyclette.gif", category: "ventre" },
        ],
      },
      {
        corde: "20 × 50 sauts",
        circuit: [
          { id: "w8-b-e1", title: "Marche sur place", reps: "1 min", gifUrl: "/gifs/marche-place.gif", category: "cardio" },
          { id: "w8-b-e2", title: "Rotations hanches", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w8-b-e3", title: "Montées de genoux", reps: "1 min", gifUrl: "/gifs/montees-genoux.gif", category: "cardio" },
          { id: "w8-b-e4", title: "Squats sans charge lents", reps: "1 min", gifUrl: "/gifs/squat-lent.gif", category: "jambes" },
          { id: "w8-b-e5", title: "Rotations chevilles", reps: "1 min", gifUrl: "/gifs/rotations.gif", category: "cardio" },
          { id: "w8-b-e6", title: "Saut à la corde (20 × 50 sauts)", reps: "20 séries", gifUrl: "/gifs/corde-saut.gif", category: "corde" },
          { id: "w8-b-e7", title: "Squat sumo", reps: "25 × 5 tours", gifUrl: "/gifs/squat-sumo.gif", category: "jambes" },
          { id: "w8-b-e8", title: "Fentes marchées", reps: "20/jambe × 5 tours", gifUrl: "/gifs/fentes-marchees.gif", category: "jambes" },
          { id: "w8-b-e9", title: "Fentes arrière", reps: "18/jambe × 5 tours", gifUrl: "/gifs/fentes-arriere.gif", category: "jambes" },
          { id: "w8-b-e10", title: "Squat bulgare", reps: "15/jambe × 5 tours", gifUrl: "/gifs/squat-bulgare.gif", category: "jambes" },
          { id: "w8-b-e11", title: "Glute bridge une jambe", reps: "15/jambe × 5 tours", gifUrl: "/gifs/glute-bridge-1jambe.gif", category: "jambes" },
          { id: "w8-b-e12", title: "Hip thrust au sol", reps: "25 × 5 tours", gifUrl: "/gifs/hip-thrust.gif", category: "jambes" },
          { id: "w8-b-e13", title: "Donkey kicks", reps: "20/jambe × 5 tours", gifUrl: "/gifs/donkey-kicks.gif", category: "jambes" },
          { id: "w8-b-e14", title: "Fire hydrant", reps: "20/jambe × 5 tours", gifUrl: "/gifs/fire-hydrant.gif", category: "jambes" },
          { id: "w8-b-e15", title: "Step-up sur chaise", reps: "18/jambe × 5 tours", gifUrl: "/gifs/step-up.gif", category: "jambes" },
          { id: "w8-b-e16", title: "Wall sit", reps: "75 sec × 5 tours", gifUrl: "/gifs/wall-sit.gif", category: "jambes" },
        ],
      }
    ),
  },
];