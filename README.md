This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

handleiding
Handleiding: Installatie van de No-Code Website Builder
Inhoudsopgave
1.	Inleiding
2.	Benodigde Software
3.	Installatie Stappen
4.	Veelvoorkomende Fouten & Oplossingen
5.	Projectstructuur
6.	Eerste Opstart
7.	Veelgestelde Vragen
________________________________________
1. Inleiding
Deze handleiding beschrijft hoe een nieuwe gebruiker de No-Code Website Builder correct kan installeren en uitvoeren. Daarnaast bevat het veelvoorkomende foutmeldingen met oplossingen.
2. Benodigde Software
Om het project correct te draaien, zorg dat de volgende software is geïnstalleerd:
Software	Downloadlink
Node.js (LTS versie)	Node.js Download

Git	Git Download

VS Code (Aanbevolen IDE)	VS Code Download

Strapi (Headless CMS)	Strapi Documentatie

Firebase (Authenticatie & Database)	Firebase Console

________________________________________
3. Installatie Stappen
Stap 1: Clone het project vanaf GitHub
1.	Open PowerShell of Command Prompt en ga naar de gewenste map: 
2.	cd C:\Development
3.	Clone de repository: 
4.	git clone https://github.com/jouw-gebruikersnaam/no-code-builder.git
5.	Ga naar de projectmap: 
6.	cd no-code-builder
Stap 2: Installeer afhankelijkheden
npm install
Stap 3: Start de ontwikkelserver
npm run dev
•	Open http://localhost:3000 in je browser om de website te bekijken.
Stap 4: Start de backend (Strapi CMS)
cd backend
npm install
npm run develop
•	Open http://localhost:1337/admin en maak een account aan.
________________________________________
4. Veelvoorkomende Fouten & Oplossingen
1. Node.js is niet geïnstalleerd
Foutmelding:
npm : The term 'npm' is not recognized as the name of a cmdlet.
Oplossing:
•	Installeer Node.js via Node.js Download.
•	Herstart je computer en probeer opnieuw npm -v.
2. npm install geeft ENOENT fout
Foutmelding:
npm error enoent Could not read package.json
Oplossing:
•	Zorg dat je in de juiste map zit: 
•	cd C:\Development\no-code-builder
•	Controleer of package.json aanwezig is met: 
•	ls
•	Als het ontbreekt, clone het project opnieuw vanaf GitHub.
3. npm start werkt niet (geen build gevonden)
Foutmelding:
Could not find a production build in the '.next' directory.
Oplossing:
•	Voer eerst de build uit: 
•	npm run build
•	npm start
4. localhost:3000 laadt niet (leeg scherm)
Oplossing:
•	Open de browser console (F12) en check de errors.
•	Probeer de server opnieuw te starten: 
•	npm run dev -- --no-turbo
•	Controleer of je in de juiste map zit (cd C:\Development\no-code-builder).
5. OneDrive problemen
Fout: npm kan bestanden niet vinden omdat het project in OneDrive staat.
Oplossing: Verplaats het project naar een stabiele locatie:
mkdir C:\Development
Move-Item "C:\Users\Gebruiker\OneDrive\Documenten\no-code-builder" -Destination "C:\Development"
________________________________________
5. Projectstructuur
/no-code-builder
├── /app
│   ├── /components
│   ├── /pages
├── /backend (Strapi CMS)
├── /public
├── .gitignore
├── package.json
├── README.md
________________________________________
6. Eerste Opstart
1.	Start de frontend met npm run dev.
2.	Start de backend met npm run develop.
3.	Open localhost:3000 en localhost:1337.
________________________________________

