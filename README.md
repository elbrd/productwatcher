# Produktbevakare

En automatiserad produktbevakare utvecklad med Node.js. Applikationen använder SerpApi för att söka efter produkter via Google Shopping, filtrerar sökresultaten utifrån definierade kriterier och använder en språkmodell via Groq API för att bedöma relevansen och sammanställa resultaten till ett mejl.

Projektet använder GitHub Actions för schemalagda körningar och Resend för automatiska e-postutskick. Det har främst fungerat som en plattform för att utforska AI-integration, externa API:er och automatiserade arbetsflöden.

## Teknik

- Node.js
- Axios
- SerpApi
- LangChain
- Groq API
- Zod
- Resend
- GitHub Actions

## Projektstruktur

```text
.github/
└── workflows/
    └── product-watch.yml

src/
├── ai/
│   ├── llm.ai.js
│   ├── prompts.ai.js
│   └── schemas.ai.js
├── api/
│   ├── email.api.js
│   └── search.api.js
├── config/
│   └── products.config.js
├── jobs/
│   └── productWatch.jobs.js
└── utils/
    └── productFilter.utils.js

productWatch.js
```

## Funktionalitet

- Produktsökning via Google Shopping
- Flera söktermer per bevakad produkt
- Filtrering och deduplicering av sökresultat
- Hämtning av produktlänkar
- AI-baserad relevansbedömning av sökresultat
- Strukturerade AI-svar med Zod
- Generering av mejlinnehåll på svenska
- Automatiska e-postutskick via Resend
- Schemalagd körning var tredje dag via GitHub Actions

## Arkitektur

- Modulär Node.js-applikation med separerade ansvarsområden
- SerpApi för produktsökning och hämtning av produktinformation
- Separat filtreringslogik för att förbereda sökresultat
- LangChain och Groq API för AI-baserad bearbetning
- Zod för validering av AI-genererade svar
- Resend för e-postutskick
- GitHub Actions för automatisering och schemaläggning
- Miljövariabler för API-nycklar och känslig konfiguration
