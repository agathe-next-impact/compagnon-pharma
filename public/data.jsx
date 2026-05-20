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

// Conseils beauté détaillés par type de peau. Chaque entrée alimente la page
// d'advice dédiée à ce profil : indicateurs, rituels matin/soir, ingrédients
// à privilégier / à éviter, message du pharmacien, produits clés.
const SKIN_ADVICE = {
  seche: {
    title: "Peau sèche",
    tagline: "Restaurer la barrière, nourrir en profondeur.",
    summary: "Votre peau manque à la fois d'eau (déshydratation) et de lipides (peau alipidique). Tiraillements après la douche, sensation d'inconfort par temps froid, fines ridules de déshydratation sur le contour de l'œil.",
    bars: { Hydratation: 0.32, Sébum: 0.22, Sensibilité: 0.50, Éclat: 0.40 },
    rituals: [
      { phase: "Matin", title: "Nettoyage sans détergent", body: "Eau micellaire ou lait nettoyant sur coton — pas de gel moussant sulfaté qui décape les lipides." },
      { phase: "Matin", title: "Sérum hydratant", body: "Acide hyaluronique sur peau légèrement humide pour fixer l'eau, puis on laisse pénétrer 30 secondes." },
      { phase: "Matin", title: "Crème riche + SPF", body: "Crème nourrissante (céramides, squalane), puis écran teinté ou SPF 30 minimum, même en hiver." },
      { phase: "Soir", title: "Démaquillage huileux", body: "Huile démaquillante puis rinçage à l'eau tiède. Pas d'eau chaude, qui assèche." },
      { phase: "Soir", title: "Soin nuit cocon", body: "Crème onctueuse en couche généreuse — massez 30 secondes pour réactiver la microcirculation." },
      { phase: "Hebdo", title: "Masque nourrissant", body: "Une fois par semaine, masque cold-cream ou en surcouche d'un soin de nuit." }
    ],
    seek: ["Acide hyaluronique", "Glycérine", "Céramides", "Squalane", "Beurre de karité", "Niacinamide", "Oméga-3 / 6"],
    avoid: ["SLS / SLES (tensioactifs agressifs)", "Alcool dénaturé en tête de liste INCI", "AHA / BHA quotidiens", "Parfums et huiles essentielles", "Gommages mécaniques abrasifs"],
    pharmacist: "« Une peau sèche n'aime pas changer de routine tous les 15 jours. Trouvez 3 produits clés, tenez-les 6 semaines, puis ajustez avec moi. »",
    productIds: ["p2", "p10", "p6", "p3"]
  },

  mixte: {
    title: "Peau mixte",
    tagline: "Réguler la zone T, nourrir les joues.",
    summary: "Votre zone T (front, nez, menton) brille en milieu de journée tandis que les joues restent normales à sèches. Le réflexe est souvent de tout matifier — c'est l'erreur classique qui rebondit en sécheresse + sébum réactionnel.",
    bars: { Hydratation: 0.55, Sébum: 0.62, Sensibilité: 0.40, Éclat: 0.55 },
    rituals: [
      { phase: "Matin", title: "Nettoyage doux PH-équilibré", body: "Gel ou mousse syndet — surtout pas de savon décapant qui rebondit en hyperséborrhée." },
      { phase: "Matin", title: "Hydratation légère uniforme", body: "Gel-crème oil-free sur l'ensemble du visage. Inutile de moduler la quantité par zone." },
      { phase: "Matin", title: "SPF non comédogène", body: "Fluide solaire teinté, mat sur la zone T sans dessécher les joues." },
      { phase: "Soir", title: "Double nettoyage", body: "Huile démaquillante puis nettoyant moussant doux. On retire pollution et SPF sans abîmer la barrière." },
      { phase: "Soir", title: "Soin ciblé zone T", body: "Sérum à la niacinamide ou au zinc PCA uniquement sur le front/nez/menton, 4 à 5 soirs par semaine." },
      { phase: "Hebdo", title: "Exfoliation BHA", body: "1 à 2 fois par semaine, acide salicylique sur la zone T pour désincruster les pores." }
    ],
    seek: ["Niacinamide", "Acide hyaluronique", "Zinc PCA", "Argile blanche (zone T)", "BHA (1-2× / sem.)", "Acide azélaïque"],
    avoid: ["Crèmes trop riches en occlusifs sur la zone T", "Gels décapants sur les joues", "Alcool dénaturé", "Surenchère d'actifs simultanés"],
    pharmacist: "« La peau mixte n'est pas une peau grasse. Hydratez TOUT le visage, et ciblez seulement la zone T avec des actifs régulateurs. »",
    productIds: ["p6", "p1", "p3", "p4"]
  },

  grasse: {
    title: "Peau grasse",
    tagline: "Réguler le sébum sans agresser.",
    summary: "Brillances persistantes toute la journée, pores marqués sur le visage entier, imperfections récurrentes au menton ou au front. La peau grasse est souvent déshydratée — c'est l'erreur qu'on fait en la décapant à l'alcool.",
    bars: { Hydratation: 0.45, Sébum: 0.82, Sensibilité: 0.45, Éclat: 0.50 },
    rituals: [
      { phase: "Matin", title: "Nettoyage gel matifiant doux", body: "Gel syndet avec zinc ou acide salicylique léger, jamais de savon de Marseille pur." },
      { phase: "Matin", title: "Sérum régulateur", body: "Niacinamide 5-10 % matin sur peau propre — réduit les pores et le sébum en quelques semaines." },
      { phase: "Matin", title: "Hydratation oil-free", body: "Gel-crème non comédogène. Sauter cette étape déclenche un rebond séborrhéique." },
      { phase: "Matin", title: "SPF fluide mat", body: "Fluide minéral ou chimique léger, teinté si vous voulez gommer les rougeurs." },
      { phase: "Soir", title: "Double nettoyage", body: "Huile démaquillante (oui, sur peau grasse — elle solubilise le sébum) puis gel doux." },
      { phase: "Soir", title: "Actif ciblé en alternance", body: "BHA 2 soirs / sem., acide azélaïque 2 autres soirs, sinon hydratation simple. Ne pas tout cumuler le même soir." }
    ],
    seek: ["Acide salicylique (BHA)", "Niacinamide", "Acide azélaïque", "Zinc", "Argile verte", "Rétinol (hors grossesse)"],
    avoid: ["Huiles comédogènes (coco, cacao)", "Occlusifs lourds (paraffine, vaseline en couche épaisse)", "Gommages mécaniques agressifs", "Décapage à l'alcool", "Sauter l'hydratation"],
    pharmacist: "« La peau grasse a soif. La sécher, c'est garantir une surproduction de sébum dans les heures qui suivent. Hydratez sans occlure. »",
    productIds: ["p4", "p6", "p3", "p1"]
  },

  normale: {
    title: "Peau normale",
    tagline: "Maintenir l'équilibre, prévenir les déséquilibres.",
    summary: "Votre peau est confortable, ni grasse ni sèche, peu réactive. L'objectif n'est pas la correction mais la prévention : protection solaire, antioxydants, hydratation suffisante pour préserver cet équilibre durablement.",
    bars: { Hydratation: 0.65, Sébum: 0.50, Sensibilité: 0.30, Éclat: 0.70 },
    rituals: [
      { phase: "Matin", title: "Nettoyage doux", body: "Eau micellaire ou nettoyant syndet selon la saison — pas besoin de complexifier." },
      { phase: "Matin", title: "Antioxydant", body: "Sérum vitamine C 10-15 % le matin sur peau propre. C'est le réflexe anti-âge le plus rentable." },
      { phase: "Matin", title: "Hydratation + SPF", body: "Crème légère, écran teinté ou SPF 30 systématique — la photoprotection est le meilleur préventif." },
      { phase: "Soir", title: "Démaquillage", body: "Eau micellaire ou lait, selon le confort. On retire pollution et SPF." },
      { phase: "Soir", title: "Soin du soir saisonnier", body: "Crème nutritive plus riche en hiver, gel-crème en été. Rétinol low-dose 2-3 soirs / semaine après 30 ans." },
      { phase: "Hebdo", title: "Exfoliation douce", body: "1 fois / sem., un PHA ou un AHA léger pour soutenir le renouvellement cellulaire." }
    ],
    seek: ["Vitamine C (antioxydant)", "Peptides", "Acide hyaluronique", "Niacinamide", "Rétinol soft (préventif)", "Antioxydants (vit. E, ferulic)"],
    avoid: ["Surcharge d'actifs simultanés", "Négliger le SPF", "Suivre des tendances sans cohérence"],
    pharmacist: "« Vous avez la chance de partir d'un bon équilibre. Misez sur la photoprotection et un antioxydant quotidien — c'est ce qui paye dans 10 ans. »",
    productIds: ["p6", "p1", "p3", "p5"]
  },

  sensible: {
    title: "Peau sensible",
    tagline: "Minimaliste, apaisant, sans parfum.",
    summary: "Rougeurs faciles, picotements à l'application de nombreux produits, intolérances rapides aux nouveautés. Vous êtes peut-être réactive (déclencheurs identifiables) ou intolérante (barrière abîmée). Dans les deux cas : routine courte et neutre.",
    bars: { Hydratation: 0.45, Sébum: 0.42, Sensibilité: 0.85, Éclat: 0.40 },
    rituals: [
      { phase: "Matin", title: "Nettoyage à l'eau thermale", body: "Eau micellaire sensible OU rinçage à l'eau thermale + tamponner. Pas de friction." },
      { phase: "Matin", title: "Sérum apaisant", body: "Centella asiatica, allantoïne ou panthénol — actifs réparateurs qui calment la rougeur." },
      { phase: "Matin", title: "Crème barrière + SPF minéral", body: "Crème céramides + niacinamide, puis écran solaire à filtres minéraux (oxyde de zinc, dioxyde de titane)." },
      { phase: "Soir", title: "Démaquillage doux", body: "Eau micellaire sans parfum, jamais de gel moussant agressif." },
      { phase: "Soir", title: "Soin réparateur", body: "Crème apaisante riche en céramides en couche généreuse. Pas de nouveauté tant que la peau n'est pas calme." },
      { phase: "Règle d'or", title: "Une seule nouveauté à la fois", body: "Test sur 1 cm² au pli du coude pendant 48 h avant toute introduction sur le visage." }
    ],
    seek: ["Centella asiatica (Cica)", "Allantoïne", "Panthénol (B5)", "Niacinamide", "Eau thermale", "Céramides", "Filtres minéraux"],
    avoid: ["Alcool dénaturé", "Parfums et huiles essentielles", "AHA / BHA agressifs", "Rétinol non encapsulé", "Gommages mécaniques", "Filtres chimiques irritants (oxybenzone, octocrylène)"],
    pharmacist: "« Quand la peau s'enflamme, on enlève. On n'ajoute pas un nouveau produit pour 'calmer' — on retire tout sauf l'eau thermale et une crème barrière. »",
    productIds: ["p1", "p3", "p10", "p6"]
  }
};

// Modifieurs liés au moment de vie. Surimpression sur les conseils de peau.
const LIFE_ADVICE = {
  none: null,

  grossesse: {
    title: "Grossesse",
    tagline: "Prudence sur les actifs, photoprotection renforcée.",
    summary: "Les variations hormonales modifient la peau : déshydratation, sensibilité accrue, masque de grossesse (mélasma) si exposition solaire. Plusieurs actifs cosmétiques sont contre-indiqués par précaution.",
    avoid: [
      "Rétinol et tous dérivés (rétinaldéhyde, rétinyl palmitate, trétinoïne)",
      "Salicylates > 2 % (sauf accord du pharmacien)",
      "Hydroquinone",
      "Huiles essentielles, sauf rose de Damas, lavande vraie, néroli — et toujours diluées",
      "Phénoxyéthanol > 1 %",
      "Aluminium dans les déodorants (principe de précaution)"
    ],
    seek: [
      "Vitamine C (anti-pigmentation douce, alternative au rétinol)",
      "Acide hyaluronique, glycérine (hydratation)",
      "Beurre de karité, huile d'amande douce (vergetures)",
      "Niacinamide (apaisant)",
      "SPF 50 systématique — anti-masque de grossesse"
    ],
    note: "Pour tout nouveau produit, scannez l'INCI ou demandez-moi en officine. Le doute profite toujours à l'embryon."
  },

  postpartum: {
    title: "Post-partum",
    tagline: "Réparer, hydrater, soutenir la chute de cheveux.",
    summary: "La peau se réajuste après la chute hormonale : sensibilité variable, parfois sécheresse intense, parfois acné de retour. La chute de cheveux entre M3 et M6 est physiologique. L'allaitement impose les mêmes prudences que la grossesse pour ce qui pénètre.",
    avoid: [
      "Rétinol et huiles essentielles si allaitement",
      "Routines complexes — la fatigue ne pardonne pas",
      "Salicylates > 2 % si allaitement"
    ],
    seek: [
      "Céramides, niacinamide (réparation barrière)",
      "Peptides, vitamine C (récupération éclat)",
      "Compléments fer / zinc / biotine pour les cheveux (sous contrôle médical)",
      "Huiles végétales sur les vergetures (rose musquée, amande douce)"
    ],
    note: "Priorisez 3 gestes : nettoyer, hydrater, protéger. Le reste attendra que vous ayez dormi."
  },

  menopause: {
    title: "Ménopause",
    tagline: "Compenser la chute œstrogénique : nutrition, fermeté, éclat.",
    summary: "La baisse œstrogénique amincit l'épiderme, réduit la production de collagène et accentue la sécheresse. Risque accru de taches pigmentaires, perte de fermeté, parfois acné hormonale tardive.",
    avoid: [
      "Tensioactifs décapants (sulfates en tête de liste)",
      "Eau chaude prolongée (douches, démaquillage)",
      "Négliger le SPF (les taches s'installent vite)"
    ],
    seek: [
      "Rétinol (sauf contre-indication) — l'actif n°1 anti-âge",
      "Vitamine C (éclat, anti-taches)",
      "Peptides de collagène (fermeté)",
      "Niacinamide, acide hyaluronique haute densité",
      "Oméga-3 / 6 (par voie orale et topique)",
      "SPF 50 quotidien, anti-UVA / lumière visible"
    ],
    note: "On parle de soin, pas de cosmétique. Une routine ménopause sérieuse, c'est 6 mois pour voir les effets — soyez régulière."
  }
};

window.PHARMA_DATA = {
  PRODUCTS, CATEGORIES, ROUTINE_STEPS, EVENTS, SKIN_TYPES, CONCERNS, SUN_OPTS, ROUTINE_HABIT,
  SKIN_ADVICE, LIFE_ADVICE
};
