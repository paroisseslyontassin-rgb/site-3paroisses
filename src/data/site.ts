import { img } from '../lib/media'

/* ------------------------------------------------------------------ */
/* Coordonnées générales                                               */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Ensemble paroissial Lyon 5 – Tassin',
  shortName: '3 Paroisses',
  tagline: 'La joie de célébrer Dieu à chaque étape de la Vie',
  email: 'paroissendpj69@lyon.catholique.fr',
  phone: '04 78 25 27 03',
  secretary: 'Alexandra Albert',
  address: '20 rue des Aqueducs – 69005 Lyon',
  logo: img('2023/11/cropped-tassin_logo_ensemble.png'),
}

export const tel = (phone: string) => `tel:+33${phone.replace(/\s/g, '').slice(1)}`

/* ------------------------------------------------------------------ */
/* Les trois paroisses et leurs horaires (édition du 28 août 2026)     */
/* ------------------------------------------------------------------ */

export type Slot = { day: string; time: string; note?: string; label?: string }

export type Parish = {
  id: 'anne' | 'ndpj' | 'joseph'
  name: string
  short: string
  color: string
  /** Classe Tailwind de couleur de fond / texte / bordure */
  bg: string
  text: string
  border: string
  address: string
  city: string
  phone: string
  photo: string
  maps: string
  lat: number
  lng: number
  masses: Slot[]
  prayer: Slot[]
  reception?: string[]
}

export const parishes: Parish[] = [
  {
    id: 'anne',
    name: 'Sainte-Anne de Ménival',
    short: 'Ste Anne',
    color: '#c8402f',
    bg: 'bg-anne',
    text: 'text-anne',
    border: 'border-anne',
    address: '43 avenue de Ménival',
    city: '69005 Lyon',
    phone: '04 78 25 27 03',
    photo: img('2024/09/SUNP0220-1024x768.jpg'),
    maps: 'https://www.google.fr/maps/place/Paroisse+Catholique+Sainte+Anne+de+M%C3%A9nival/@45.7564677,4.7801342,17z',
    lat: 45.756464,
    lng: 4.7823229,
    masses: [
      { day: 'Dimanche', time: '9h30' },
      { day: 'Mercredi', time: '8h00', note: '8h30 pendant les vacances scolaires' },
    ],
    prayer: [{ day: 'Mercredi', time: '17h30', label: 'Chapelet', note: "d'octobre à début juillet" }],
  },
  {
    id: 'ndpj',
    name: 'Notre-Dame du Point-du-Jour',
    short: 'Notre-Dame',
    color: '#1f5fae',
    bg: 'bg-ndpj',
    text: 'text-ndpj',
    border: 'border-ndpj',
    address: '20 rue des Aqueducs',
    city: '69005 Lyon',
    phone: '04 78 25 27 03',
    photo: img('2024/06/ndpj.jpeg'),
    maps: 'https://www.google.fr/maps/place/%C3%89glise+Notre+Dame+du+Point+du+Jour/@45.7579718,4.7933951,17z',
    lat: 45.7579681,
    lng: 4.7955838,
    masses: [
      { day: 'Dimanche', time: '11h00' },
      { day: 'Mardi', time: '12h15', note: '8h30 pendant les vacances scolaires estivales' },
    ],
    prayer: [
      { day: 'Mardi', time: '8h00', label: 'Adoration' },
      { day: 'Jeudi', time: '17h45', label: 'Adoration', note: 'hors vacances scolaires' },
      { day: 'Jeudi', time: '19h00', label: 'Groupe de prière' },
      { day: 'Dimanche', time: '16h30', label: 'Chapelet', note: '17h30 de Pâques à la Toussaint' },
    ],
    reception: [
      'Du lundi au jeudi : 9h30 – 11h30 et 15h00 – 17h30',
      'Vendredi et samedi : 9h30 – 11h30',
      'Possibilité de voir un prêtre sur rendez-vous',
    ],
  },
  {
    id: 'joseph',
    name: 'Saint-Joseph de la Demi-Lune',
    short: 'St Joseph',
    color: '#2e8b4e',
    bg: 'bg-joseph',
    text: 'text-joseph',
    border: 'border-joseph',
    address: '2 bis avenue de la République',
    city: '69160 Tassin-la-Demi-Lune',
    phone: '04 78 34 14 28',
    photo: img('2024/06/saint-joseph-de-tassin.jpeg'),
    maps: 'https://www.google.com/maps/place/Paroisse+Saint+Joseph+Demi+Lune/@45.7644013,4.7849378,19z',
    lat: 45.7645423,
    lng: 4.7851367,
    masses: [
      { day: 'Samedi', time: '18h00', note: '18h30 pendant les vacances scolaires estivales' },
      { day: 'Dimanche', time: '10h30', note: 'pas de messe pendant les vacances scolaires estivales' },
      { day: 'Jeudi', time: '18h00', note: "à l'oratoire de la communauté (8h30 pendant les vacances scolaires estivales)" },
    ],
    prayer: [{ day: 'Vendredi', time: '17h30', label: 'Chapelet' }],
    reception: [
      'Du lundi au vendredi : 9h30 – 11h30',
      'Samedi : 10h00 – 11h30',
      "Fermé les jours fériés et pendant les vacances scolaires : contactez alors l'accueil de Notre-Dame du Point-du-Jour",
    ],
  },
]



/* ------------------------------------------------------------------ */
/* Équipe                                                              */
/* ------------------------------------------------------------------ */

export const clergy = [
  { first: 'Vincent', last: 'Grodziski', role: "Prêtre, curé de l'ensemble paroissial", email: 'v.grodziski@lyon.catholique.fr' },
  { first: 'Christian', last: 'Tshala Wika', role: "Prêtre, vicaire de l'ensemble paroissial", email: 'tshibikufa2@gmail.com' },
  { first: 'Joa', last: 'Shamukeke', role: "Prêtre assistant de l'ensemble paroissial" },
  { first: 'Benjamin', last: 'Dewitte', role: 'Frère salésien de Don Bosco', email: 'b.dewitte@lyon.catholique.fr' },
  { first: 'Francis', last: 'Gallot', role: 'Frère salésien de Don Bosco' },
]

export const deacons = [
  { name: 'Arnaud Gazagnes', email: 'arnaud.gazagnes@orange.fr' },
  { name: 'Jean-Baptiste Hibon', email: 'diacre@hibon.net' },
  { name: 'Yves Rémond', email: 'yves-remond@wanadoo.fr' },
  { name: 'Gérard Bourtoul' },
]

export const communities = [
  { name: 'Missionnaires de la Société de Marie', detail: '33 rue du Dr Albéric Pont, 69005 Lyon', contact: '04 78 25 38 12' },
  { name: 'Religieuses du Sacré-Cœur de Jésus', detail: '57 rue Edmond Locard, 69005 Lyon', contact: '04 78 34 59 23' },
  { name: 'Communauté de la Sainte-Croix de Jérusalem', detail: '62 avenue Champvert, 69005 Lyon', contact: 'theresedavila@gmail.com' },
  { name: 'Salésiens Coopérateurs', detail: 'Mouvement de laïcs au service de la Mission', contact: 'mireille-imbert@wanadoo.fr' },
  { name: 'Salésiens de Don Bosco', detail: '2 bis avenue de la République, 69160 Tassin-la-Demi-Lune', contact: 'pascal.harmel@orange.fr' },
  { name: 'Filles de Marie Auxiliatrice', detail: '12 montée Saint-Laurent, 69005 Lyon', contact: '04 72 41 14 54' },
]

/* ------------------------------------------------------------------ */
/* Liens externes (inscriptions Enoria, dons, etc.)                    */
/* ------------------------------------------------------------------ */

export const links = {
  intentionMesse: 'https://public.enoria.app/pubinsc/intention/7f57b59793234c2/477',
  appliFlash: 'https://previewer.adalo.com/b8f5066e-e20d-4815-8554-c3fa0cd6424d',
  funerailles: 'https://public.enoria.app/pubinsc/auth?type=groupe&t=28be2417d8de0e1',
  musiciens: 'https://public.enoria.app/pubinsc/auth?type=acteurs&e=477',
  professionFoi: 'https://public.enoria.app/pubinsc/gp/7d30e281303950b/open',
  bapteme: 'https://public.enoria.app/pubinsc/baptemes/477/NjA2NjAzODU3NDg',
  mariage: 'https://public.enoria.app/pubinsc/mariage/477/MjkwMzQ0OTMxMzU',
  quetePrelevee:
    'https://www.donnons-lyon.catholique.fr/quetes-et-ceremonies/je-donne-a-la-quete-prelevee/?fid=7&montants-mensuel=15&par=617',
  denier: 'https://www.donnons-lyon.catholique.fr/denier-de-leglise/',
  donnons: 'https://www.donnons-lyon.catholique.fr',
  credofunding: 'https://www.credofunding.fr/fr/associations/diocese-de-lyon',
  newsletterForm:
    'https://1f1b42d1.sibforms.com/serve/MUIFAOlnn2JrV1kjxEyEyTHL_xIt4stRbxd80WjuPzg1oH7eU2altKHOql-HKrJTvI9mGzrAxwoG84pJ8Q-MgSwZp2oR9FBPKADnQByEYJh5XbGAoOmhUi4BN3jTrpv5L8P9P1HZ0374eYjX5TlZhAcC3UXwHH7yLph-_23YbHyrgoMMi6FjDvOWV10IrmYF6tzRv-CTvt7x-KRO',
  aelf: 'https://www.aelf.org/',
  diocese: 'https://lyon.catholique.fr/',
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; to: string; description?: string }
export type NavGroup = { label: string; to?: string; children?: NavItem[] }

export const navigation: NavGroup[] = [
  { label: 'Qui sommes-nous', to: '/qui-sommes-nous' },
  { label: 'Horaires', to: '/horaires' },
  {
    label: 'Sacrements',
    to: '/sacrements',
    children: [
      { label: 'Baptême', to: '/bapteme', description: 'Devenir chrétien' },
      { label: 'Communion', to: '/communion', description: 'Pour votre bonheur sans fin' },
      { label: 'Confirmation', to: '/confirmation', description: "Recevoir l'Esprit" },
      { label: 'Mariage', to: '/mariage', description: "S'engager devant Dieu" },
      { label: 'Pénitence et réconciliation', to: '/penitence-et-reconciliation', description: 'Retrouver votre joie' },
      { label: 'Onction des malades', to: '/onction-des-malades', description: 'Force physique et intérieure' },
      { label: 'Ordination', to: '/ordination', description: "Le sacrement de l'Ordre" },
      { label: 'Funérailles', to: '/funerailles', description: 'Être accompagné dans le deuil' },
    ],
  },
  {
    label: 'Prière',
    to: '/priere',
    children: [
      { label: 'Livrets', to: '/livrets', description: 'Carnet de chants, Vivre la messe…' },
      { label: 'Si tu savais le don de Dieu', to: '/si-tu-savais-le-don-de-dieu', description: 'Louange, le jeudi à 19h' },
      { label: 'Goûtons la Parole', to: '/goutons-la-parole', description: 'Lectio divina mensuelle' },
      { label: 'Les Veill(h)eureuses', to: '/les-veillheureuses', description: 'Veillées de prière' },
      { label: 'Musiciens', to: '/musiciens', description: 'Chanter pour la gloire de Dieu' },
      { label: 'Méditation du dimanche', to: '/meditation-du-dimanche', description: 'Méditation et lectures' },
    ],
  },
  {
    label: 'Missions',
    to: '/missions',
    children: [
      { label: 'Pastorale des jeunes', to: '/pastorale-des-jeunes', description: 'Éveil à la foi, KT XXL, camps…' },
      { label: 'Formation', to: '/formation', description: 'Groupe Bible, UCLy, Châtelard…' },
      { label: 'Entraide', to: '/entraide', description: 'Solidarité et associations' },
      { label: 'Don Bosco', to: '/don-bosco', description: 'La spiritualité salésienne' },
    ],
  },
  {
    label: 'Actualités',
    to: '/actualites',
    children: [
      { label: 'Toute l’actualité', to: '/actualites' },
      { label: 'Célébrations & annonces', to: '/celebrations' },
      { label: 'Rencontres', to: '/rencontre-avec-cesare-baldi' },
      { label: 'Passerelle', to: '/passerelle' },
      { label: 'Recevoir les infolettres', to: '/infolettres' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

/** Anciennes adresses du site WordPress → nouvelles adresses */
export const redirects: Record<string, string> = {
  '/home': '/qui-sommes-nous',
  '/soutien': '/donner',
  '/animation': '/missions',
  '/sacrements-2': '/sacrements',
  '/demande-sacrement': '/sacrements',
  '/onction-de-malade': '/onction-des-malades',
  '/organisation-de-funerailles': '/funerailles',
  '/associative': '/priere',
  '/charismatique': '/si-tu-savais-le-don-de-dieu',
  '/goutons': '/goutons-la-parole',
  '/coeur-a-coeur': '/musiciens',
  '/spirituelle': '/entraide',
  '/phare-ouest': '/pastorale-des-jeunes',
  '/news': '/actualites',
  '/recevoir-les-infolettres': '/infolettres',
  '/mention-legale': '/mentions-legales',
}
