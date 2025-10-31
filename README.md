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
| Tailwind CSS + shadcn/ui | UI moderne et accessible     |

---

## Installation

```bash
git clone https://github.com/AntoineBendafiSchulmann/azuresync-ui
cd azuresync-ui
npm install
cp .env.example .env
# puis configure ton .env avec les infos Azure
npm run dev

```

## Configuration Microsoft Entra ID

Pour configurer l'application dans Microsoft Entra ID, suivez ces étapes :

1. Accédez au portail Microsoft Entra ID : [https://portal.azure.com](https://portal.azure.com).
2. Naviguez vers **Microsoft Entra ID** > **Applications enregistrées**.
3. Sélectionnez votre application ou créez-en une nouvelle.
4. Configurez les redirections URI dans la section **Authentification** :
   - `http://localhost:5173`
   - `http://localhost:5173/auth/callback`
5. Ajoutez les permissions API nécessaires dans la section **API Permissions** :
   - **Calendars.Read**
   - **Calendars.ReadWrite**
   - **User.Read**
6. Accédez à votre application enregistrée via ce lien :  
   [Application enregistrée dans Microsoft Entra ID](https://portal.azure.com/#home).

## Benchmark des composants calendrier React

| Composant                     | Affichage agenda              | Création d'événement | Adapté au mobile        | Licence              | Implémenté ? |
| ----------------------------- | ----------------------------- | -------------------- | ----------------------- | -------------------- | ------------ |
| **react-big-calendar**        | Semaine, Jour, Mois           | Oui                  | Moyen (pas très adapté) | MIT                  | Oui          |
| **FullCalendar (React)**      | Jour, Semaine, Mois           | Oui (sélection)      | Oui                     | MIT                  | Oui          |
| **Scheduler from Syncfusion** | À tester                      | À tester             | À tester                | Gratuit / Commercial | Non          |
| **React Schedule**            | À tester                      | À tester             | À tester                | Libre / Commercial   | Non          |
| **TUI Calendar**              | À tester                      | À tester             | À tester                | MIT                  | Non          |
| **DayPilot React**            | À tester                      | À tester             | À tester                | Commercial / Essai   | Non          |
| **Kalend**                    | À tester                      | À tester             | À tester                | MIT                  | Non          |
| **react-calendar**            | Uniquement sélection de dates | Non                  | Oui                     | MIT                  | Oui          |
