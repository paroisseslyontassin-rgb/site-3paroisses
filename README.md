# Site des 3 Paroisses Lyon 5 – Tassin

Site de l'ensemble paroissial Sainte-Anne de Ménival, Notre-Dame du Point-du-Jour et Saint-Joseph de la Demi-Lune.

- **Le site** (dossier racine) : React + TypeScript + Tailwind CSS (Vite), hébergé chez one.com.
- **L'administration** (dossier `studio/`) : [Sanity](https://www.sanity.io), offre gratuite. L'équipe y écrit
  les actualités, l'alerte importante et les horaires ; le site les affiche aussitôt.

---

## Pour l'équipe paroissiale (sans toucher au code)

L'administration se trouve à l'adresse **https://paroisses3-lyon5-tassin.sanity.studio** (connexion avec son compte Google
ou une adresse e-mail, sur invitation). Elle est en français, sur ordinateur comme sur téléphone.

À gauche, trois rubriques :

### 📰 Actualités

1. Cliquer sur **Actualités**, puis sur le crayon **✎** (nouveau document).
2. Remplir le **titre**, cliquer sur **Générer** à côté de « Adresse de la page ».
3. Choisir une **catégorie** et, si possible, une **image de couverture**.
4. Écrire le **contenu** : texte, titres, listes, liens, et avec le bouton **+** : *Image / affiche* ou *Bouton*.
   Les affiches qui se suivent s'affichent en grille ; un clic les agrandit.
5. Cliquer sur **Publier** (en bas à droite). L'article est en ligne.

Tant qu'on n'a pas cliqué sur *Publier*, les modifications restent un **brouillon** invisible sur le site.
On peut programmer un article en mettant une **date de publication** dans le futur : il apparaîtra ce jour-là.

Chaque semaine : ouvrir **« Célébrations & annonces »** et **« Méditation du dimanche »**, remplacer les affiches
et le texte, puis *Publier*.

### 📢 Alerte importante (bandeau rouge)

Pour une information exceptionnelle (« Dimanche : une seule messe à 11h à Notre-Dame »…) :

1. Ouvrir **Alerte importante**.
2. Cocher **« Afficher l'alerte sur le site »** et écrire le **message** (court).
3. Facultatif : une **date de fin** (l'alerte disparaît toute seule après ce jour) et des **détails**
   (un lien « En savoir plus » apparaît alors).
4. **Publier.**

Le bandeau apparaît en haut de toutes les pages et en rappel à côté des horaires.
Pour le retirer : décocher la case, puis *Publier*.

### 🕰️ Horaires des messes

Une fiche par église, avec ses **messes** et ses **temps de prière**. Pour chaque ligne : jour, heure (écrite
`18h00`), activité (pour la prière) et remarque. Modifier, puis **Publier**. Les messes du samedi et du dimanche
s'affichent aussi sur la page d'accueil.

### Les accès

L'offre gratuite de Sanity propose deux rôles :

| Rôle | Peut… | Pour qui |
| --- | --- | --- |
| **Administrateur** | écrire, publier, supprimer, inviter d'autres personnes | les 3 à 5 rédacteurs de confiance |
| **Lecteur** (*Viewer*) | consulter les contenus et brouillons, sans rien modifier | relecteurs, curé… (gratuit, illimité) |

Inviter quelqu'un : [sanity.io/manage](https://www.sanity.io/manage) → le projet → **Members** → **Invite**.
Pour avoir un rôle « Contributeur » (écrit sans pouvoir publier), il faut l'offre payante *Growth* ; le site n'a
alors rien à changer.

Tout l'historique des modifications est conservé : en cas d'erreur, on peut revenir à une version précédente
(menu **⋯** → *Historique*).

---

## Pour la personne qui gère le site technique

### Mise en route de Sanity (une seule fois)

1. Créer un compte et un projet sur [sanity.io/manage](https://www.sanity.io/manage) (offre *Free*),
   avec un dataset **`production`** en visibilité **publique**. Noter le **Project ID**.
2. Reporter ce Project ID dans `.env` (racine, `VITE_SANITY_PROJECT_ID`) et dans `studio/.env`
   (`SANITY_STUDIO_PROJECT_ID`).
3. Autoriser le site à lire les contenus : sanity.io/manage → **API → CORS origins** → ajouter
   `http://localhost:5173`, `http://localhost:4173` et `https://3paroisses-lyon5-tassin.eu` (sans *Allow credentials*).
4. Mettre l'administration en ligne :
   ```bash
   cd studio
   npm install
   npx sanity login      # ouvre le navigateur
   npm run deploy        # → https://paroisses3-lyon5-tassin.sanity.studio
   ```
5. Recopier les contenus de WordPress (articles, affiches, PDF, horaires) :
   créer un jeton **Editor** (sanity.io/manage → **API → Tokens**), le mettre dans `studio/.env.local` :
   `SANITY_WRITE_TOKEN=…`, puis :
   ```bash
   npm run import-wordpress -- --essai   # vérification, rien n'est envoyé
   npm run import-wordpress              # import réel (peut être relancé sans doublons)
   ```
   Ensuite, supprimer le jeton (il n'est plus utile).

Après l'import, WordPress n'est plus nécessaire : il peut être désactivé chez one.com.

### Lancer le site sur son ordinateur

```bash
npm install      # une seule fois
npm run dev      # puis ouvrir http://localhost:5173
```

### Mettre en ligne le site

**C'est automatique** : à chaque modification envoyée sur GitHub (`git push`), GitHub compile le site et
l'envoie chez one.com (voir `.github/workflows/deploy.yml`). On suit la progression dans l'onglet **Actions**
du dépôt GitHub ; on peut aussi relancer à la main (*Actions → Mise en ligne → Run workflow*).

Réglages faits une seule fois dans GitHub (*Settings → Secrets and variables → Actions*) :
`SFTP_HOST`, `SFTP_USER`, `SFTP_PASSWORD` (accès SFTP donnés par one.com) et `SFTP_DIR` (dossier du site sur le
serveur). Tant que `SFTP_DIR` est vide, GitHub affiche le contenu du serveur sans rien envoyer.

L'envoi ne supprime jamais rien sur le serveur. Le fichier `.htaccess` inclus permet aux adresses comme `/bapteme`
de fonctionner. Les anciennes adresses
WordPress (`/home`, `/soutien`, `/phare-ouest`…) redirigent vers les nouvelles pages, et les articles gardent
leur adresse (`/celebrations`, `/passerelle`…). Publier un article dans Sanity **ne demande pas** de remettre le
site en ligne.

### Ce qui reste dans le code

| Je veux changer…                                        | Fichier                              |
| ------------------------------------------------------- | ------------------------------------ |
| Horaires de secours, adresses, téléphones, équipe       | `src/data/site.ts`                   |
| Liens d'inscription (Enoria), dons, menu                | `src/data/site.ts`                   |
| Champs disponibles dans l'administration               | `studio/schemas/`                    |
| Le texte d'une page fixe (sacrements, Don Bosco…)       | `src/pages/…` (un fichier par thème) |
| Pied de page                                            | `src/components/Footer.tsx`          |
| Couleurs et polices                                     | `src/index.css`                      |

### Ajouter une image dans une page fixe

1. Déposer l'image (jpg, png ou gif) dans `public/media/AAAA/MM/`.
2. Lancer `npm run images` : elle est convertie en `.webp` léger.
3. Dans le code, l'appeler avec `img('AAAA/MM/nom-du-fichier.jpg')` (l'extension d'origine suffit).
