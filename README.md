# AzureSync UI

**Application React Vite** avec authentification Microsoft (MSAL) et synchronisation complète du calendrier Outlook via Microsoft Graph API.

---

## Objectif

- Connexion via Microsoft Entra ID
- Affichage des événements du calendrier Outlook
- Navigation jour / semaine / mois
- Benchmark de plusieurs composants calendrier React
- Création et gestion future d’événements Outlook
- Interface mobile-friendly (responsive)

---

## Technologies utilisées

| Stack                    | Usage                        |
| ------------------------ | ---------------------------- |
| React                    | Front-end principal          |
| Vite                     | Bundler                      |
| TypeScript               | Typage                       |
| MSAL (Microsoft Auth)    | Authentification Azure       |
| Microsoft Graph API      | Accès aux événements Outlook |
| Tailwind CSS + shadcn/ui | UI                           |

---

## Installation

```bash
git clone https://github.com/AntoineBendafiSchulmann/azuresync-ui
cd azuresync-ui
npm install
cp .env.example .env
# puis configure ton .env avec les infos Azure

```

## Lancer le projet :

```bash
npm run dev
```

---

## Configuration Microsoft Entra ID

1. Accédez au portail Microsoft Entra ID : [https://portal.azure.com](https://portal.azure.com).
2. Naviguez vers **Microsoft Entra ID** dans le menu latéral gauche.
3. Cliquez sur **Applications enregistrées** dans la section **Gérer**.
   - Si vous avez déjà créé votre application, utilisez la barre de recherche en haut pour la retrouver rapidement.
   - Si vous n'avez pas encore d'application, cliquez sur **+ Nouvelle inscription** pour en créer une.
4. Configurez les redirections URI dans la section **Authentification** :
   - Cliquez sur **Authentification** dans le menu latéral gauche de votre application.
   - Ajoutez les URI suivantes dans la section **URI de redirection** :
     - `http://localhost:12345` (ou un autre port dépendant de comment vous lancez ce projet)
   - Sauvegarder vos modifications.
5. Ajoutez les permissions API nécessaires dans la section **API autorisées** :
   - Cliquez sur **API autorisées** dans le menu latéral gauche de votre application.
   - Cliquez sur **Ajouter une autorisation**.
   - Sélectionnez **Microsoft Graph**.
   - Choisissez **Permissions déléguées**.
   - Recherchez et ajoutez les permissions suivantes :
     - **Calendars.Read** : Permet de lire les calendriers utilisateur.
     - **Calendars.ReadWrite** : Permet de lire et écrire dans les calendriers utilisateur.
     - **User.Read** : Permet de lire les informations utilisateur.
   - Accordez le consentement administrateur pour ces permissions si nécessaire.

---

## Configuration du fichier `.env`

Pour configurer le fichier `.env`, vous devez récupérer les valeurs suivantes dans le portail Azure :

1. **VITE_MS_CLIENT_ID** :

   - C'est l'ID de l'application enregistrée.
   - Où le trouver :
     - Accédez à votre application dans **Applications enregistrées**.
     - L'ID d'application (client) est affiché dans la section **Vue d'ensemble**.

2. **VITE_MS_TENANT_ID** :

   - C'est l'ID de votre organisation (tenant).
   - Où le trouver :
     - Accédez à **Microsoft Entra ID** > **Vue d'ensemble**.
     - L'ID du locataire est affiché sous le nom **ID de tenant**.

3. **VITE_MS_REDIRECT_URI** :
   - C'est l'URI de redirection utilisée pour l'authentification.
   - Où le configurer :
     - Accédez à votre application dans **Applications enregistrées**.
     - Cliquez sur **Authentification** dans le menu latéral gauche.
     - Ajoutez l'URI de redirection dans la section **URI de redirection** (par exemple, `http://localhost:12345`).

### Exemple de fichier `.env`

```bash
VITE_MS_CLIENT_ID="<ID d'application (client)>"
VITE_MS_TENANT_ID="<ID de votre organisation (tenant)>"
VITE_MS_REDIRECT_URI="http://localhost:12345"
```

## Benchmark des composants calendrier React

| Composant                | Affichage agenda              | Création d'événement | Adapté au mobile        | Licence              | Implémenté ? |
| ------------------------ | ----------------------------- | -------------------- | ----------------------- | -------------------- | ------------ |
| **react-big-calendar**   | Semaine, Jour, Mois           | Oui                  | Moyen (pas très adapté) | MIT                  | Oui          |
| **FullCalendar (React)** | Jour, Semaine, Mois           | Oui (sélection)      | Oui                     | MIT                  | Oui          |
| **Syncfusion**           | Jour, Semaine, Mois, Agenda   | Oui                  | Oui                     | Gratuit / Commercial | Non          |
| **TUI Calendar**         | Jour, Semaine, Mois           | Oui                  | Oui                     | MIT                  | Oui          |
| **DayPilot React**       | Jour, Semaine, Mois           | Oui                  | Oui                     | Commercial / Essai   | Oui          |
| **react-calendar**       | Uniquement sélection de dates | Non                  | Oui                     | MIT                  | Oui          |
| **Kalend**               | Jour, Semaine, Mois           | Oui                  | Oui                     | MIT                  | Non          |
| **RSuite Calendar**      | Jour, Semaine, Mois           | Non                  | Oui                     | MIT                  | Non          |
| **Ant Design Calendar**  | Mois                          | Non                  | Oui                     | MIT                  | Non          |

# bugs

- gérer les sessions exipirées
