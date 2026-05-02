# GeoGeek

GeoGeek is a modern, interactive geography explorer built with **Next.js 14+**, **TypeScript**, and **Tailwind CSS**. Originally a legacy jQuery-based project, it has been modernized to provide better performance, maintainability, and a seamless developer experience while preserving the original educational and interactive design.

## Features
- **Interactive Map:** Drill-down explorer from continents to world-level details using **AmCharts v5**.
- **Country Explorer:** Detailed information and statistics for countries around the world.
- **Geography Rankings:** Rankings based on population, area, and population density.
- **Contact:** User feedback form.

## Modernization Highlights
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS v4 with custom design tokens.
- **Data:** Dynamic data fetching from [country-info-scraper](https://mucadoo.github.io/country-info-scraper/countries.min.json).
- **Deployment:** Fully automated static deployment to GitHub Pages.

## Tech Stack
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AmCharts v5](https://www.amcharts.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://github.com/features/actions)

## Development
To start the development server:
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

## Deployment
This project is automatically deployed to GitHub Pages upon pushing to the `main` branch.
