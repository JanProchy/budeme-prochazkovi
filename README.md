# Budeme Procházkovi

![Angular](https://img.shields.io/badge/Angular-20.0.0-red?logo=angular)  [![Netlify Status](https://api.netlify.com/api/v1/badges/14e3a8cc-4003-438a-bca5-d40f9301d10f/deploy-status)](https://app.netlify.com/projects/budeme-prochazkovi/deploys)

A modern wedding website built with Angular.

## 🌸 About

**Budeme Procházkovi** is a wedding web application designed to provide guests with all the important information about the wedding day. It features a beautiful, responsive design and is optimized for both desktop and mobile devices.

## 🚀 Features

- Elegant, mobile-friendly UI
- Guest information and RSVP
- Social media sharing (Open Graph & Twitter meta tags)
- Google Analytics integration
- Deployed with Netlify

## 🛠️ Tech Stack

- [Angular 20](https://angular.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Netlify](https://www.netlify.com/) for deployment

## 📦 Project Structure

```
.
├── src/
│   ├── app/                # Angular components & modules
│   ├── assets/             # Images and static assets
│   ├── index.html          # Main HTML file with meta tags
│   └── styles.scss         # Global styles
├── public/                 # Public assets
├── .netlify/               # Netlify configuration
├── package.json            # Project dependencies & scripts
├── angular.json            # Angular workspace config
└── README.md               # Project documentation
```

## 🧑‍💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)

### Installation

```bash
git clone https://github.com/your-username/budeme-prochazkovi.git
cd budeme-prochazkovi
npm install
```

### Development Server

Start the local dev server:

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

```bash
npm test
```

### Deploying

Deploy to Netlify (requires [Netlify CLI](https://docs.netlify.com/cli/get-started/)):

```bash
npm run deploy
```

## 📄 Meta Tags & SEO

The site includes Open Graph and Twitter meta tags for rich link previews.  
Google Analytics is enabled via [gtag.js](https://developers.google.com/analytics/devguides/collection/gtagjs).

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📃 License

This project is licensed under the MIT License.

---

Made with ❤️ for our wedding.
