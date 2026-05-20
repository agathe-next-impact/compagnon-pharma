// Static catalogue + content data for the prototype
const PRODUCTS = [
  { id: "p1", brand: "La Roche-Posay", name: "Toleriane Sensitive Crème Hydratante", category: "Visage", price: "16,90", size: "40ml", stock: true,
    tags: ["peau sensible", "hydratant", "sans parfum"],
    desc: "Crème hydratante apaisante pour peaux sensibles. Restaure la barrière cutanée et calme les rougeurs.",
    inci: [
      { name: "Aqua", fn: "Solvant", flag: "" },
      { name: "Glycerin", fn: "Hydratant", flag: "good" },
      { name: "Niacinamide", fn: "Apaisant, anti-rougeurs", flag: "good" },
      { name: "Squalane", fn: "Émollient végétal", flag: "good" },
      { name: "Ceramide NP", fn: "Réparation barrière", flag: "good" },
      { name: "Tocopherol", fn: "Antioxydant", flag: "" },
      { name: "Carbomer", fn: "Texturant", flag: "" }
    ]},
  { id: "p2", brand: "Avène", name: "Hydrance Riche Crème Hydratante", category: "Visage", price: "19,50", size: "40ml", stock: true,
    tags: ["peau sèche", "hydratant"], desc: "Hydratation longue durée pour peaux déshydratées et sèches.",
    inci: [{name:"Aqua",fn:"Solvant",flag:""},{name:"Glycerin",fn:"Hydratant",flag:"good"},{name:"Shea Butter",fn:"Nourrissant",flag:"good"}] },
  { id: "p3", brand: "Bioderma", name: "Sensibio H2O Eau Micellaire", category: "Visage", price: "14,40", size: "500ml", stock: true,
    tags: ["démaquillant", "peau sensible"], desc: "Eau micellaire démaquillante pour peaux sensibles.",
    inci: [{name:"Aqua",fn:"Solvant",flag:""},{name:"PEG-6 Caprylic",fn:"Tensioactif doux",flag:""}] },
  { id: "p4", brand: "Caudalie", name: "Vinopure Sérum Anti-imperfections", category: "Visage", price: "29,50", size: "30ml", stock: true,
    tags: ["acné", "imperfections"], desc: "Sérum anti-imperfections aux acides naturels.",
    inci: [{name:"Aqua",fn:"Solvant",flag:""},{name:"Salicylic Acid",fn:"Exfoliant",flag:"warn"}] },
  { id: "p5", brand: "Nuxe", name: "Huile Prodigieuse Florale", category: "Corps", price: "24,90", size: "100ml", stock: true,
    tags: ["multi-usage", "fleuri"], desc: "Huile sèche multi-fonctions visage, corps, cheveux." },
  { id: "p6", brand: "Vichy", name: "Mineral 89 Booster Quotidien", category: "Visage", price: "27,90", size: "50ml", stock: true,
    tags: ["hydratant", "fortifiant"], desc: "Booster d'hydratation à l'acide hyaluronique." },
  { id: "p7", brand: "Klorane", name: "Shampooing Doux Avoine", category: "Cheveux", price: "9,90", size: "400ml", stock: false,
    tags: ["cuir chevelu sensible"], desc: "Shampooing doux pour usage fréquent." },
  { id: "p8", brand: "Mustela", name: "Liniment Oléo-Calcaire", category: "Bébé", price: "8,50", size: "500ml", stock: true,
    tags: ["bébé", "change"], desc: "Soin du change pour la peau délicate de bébé." },
  { id: "p9", brand: "Nutergia", name: "Ergymag Magnésium", category: "Compléments", price: "21,80", size: "60 gél.", stock: true,
    tags: ["fatigue", "stress"], desc: "Complément alimentaire magnésium pour les périodes de fatigue." },
  { id: "p10", brand: "Aderma", name: "Exomega Crème Émolliente", category: "Corps", price: "18,90", size: "200ml", stock: true,
    tags: ["peau atopique", "très sèche"], desc: "Crème émolliente pour peaux atopiques." },
];

const CATEGORIES = ["Tous", "Visage", "Cheveux", "Corps", "Bébé", "Compléments", "Soins ciblés"];

const ROUTINE_STEPS = [
  { phase: "Matin", num: 1, title: "Nettoyage doux", desc: "Eau micellaire sur coton, sans rinçage. Hydrate sans agresser la barrière.", productId: "p3" },
  { phase: "Matin", num: 2, title: "Hydratation booster", desc: "Sérum à l'acide hyaluronique sur peau légèrement humide.", productId: "p6" },
  { phase: "Matin", num: 3, title: "Soin barrière", desc: "Crème apaisante céramides + niacinamide. Massage 30 secondes.", productId: "p1" },
  { phase: "Soir", num: 4, title: "Démaquillage", desc: "Eau micellaire pour ôter pollution et soin de jour.", productId: "p3" },
  { phase: "Soir", num: 5, title: "Soin réparateur nuit", desc: "Crème riche, application généreuse en couche fine.", productId: "p2" },
];

const EVENTS = [
  { d: "12", m: "Mai", title: "Atelier décodage INCI", meta: "18h30 · 1h · 8 places · Karinthi" },
  { d: "23", m: "Mai", title: "Journée découverte Caudalie", meta: "10h–18h · Animation laboratoire" },
  { d: "04", m: "Juin", title: "Conseil grossesse & post-partum", meta: "14h · Sage-femme invitée · 6 places" },
  { d: "18", m: "Juin", title: "Routine peau sensible été", meta: "19h · Pharmacien titulaire" },
];

const SKIN_TYPES = [
  { id: "seche", name: "Sèche", desc: "Tiraillements, manque de confort", swatch: "#E8DEC5" },
  { id: "mixte", name: "Mixte", desc: "Zone T plus brillante", swatch: "#DDD0B6" },
  { id: "grasse", name: "Grasse", desc: "Brillances, pores marqués", swatch: "#CFC5A8" },
  { id: "normale", name: "Normale", desc: "Confortable, équilibrée", swatch: "#EFE8D7" },
  { id: "sensible", name: "Sensible", desc: "Réagit, rougit facilement", swatch: "#E5C9B9" },
];

const CONCERNS = ["Imperfections", "Rides & ridules", "Taches", "Rougeurs", "Déshydratation", "Manque d'éclat", "Pores", "Sensibilité"];

const SUN_OPTS = [
  { id: "low", name: "Faible", desc: "Peu d'exposition quotidienne" },
  { id: "med", name: "Modérée", desc: "Trajets, terrasses" },
  { id: "high", name: "Forte", desc: "Plein air régulier" },
];

const ROUTINE_HABIT = [
  { id: "yes", name: "Oui, régulière", desc: "Matin et soir" },
  { id: "occ", name: "Occasionnelle", desc: "Quelques jours par semaine" },
  { id: "no", name: "Non", desc: "Je commence" },
];

window.PHARMA_DATA = {
  PRODUCTS, CATEGORIES, ROUTINE_STEPS, EVENTS, SKIN_TYPES, CONCERNS, SUN_OPTS, ROUTINE_HABIT
};
