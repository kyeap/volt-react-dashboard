## Table of Contents

* [Version](#versions)
* [Demo](#demo)
* [Quick Start](#quick-start)
* [Documentation](#documentation)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)
* [Resources](#resources)
* [Upgrade to PRO](#upgrade-to-pro)
* [Reporting Issues](#reporting-issues)
* [Technical Support or Questions](#technical-support-or-questions)
* [Licensing](#licensing)
* [Useful Links](#useful-links)


## Versions

[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/html-logo.jpg?raw=true" width="60" height="60" />](https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard)[<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/react-logo.jpg?raw=true" width="60" height="60" />](https://themesberg.com/product/dashboard/volt-react)

| HTML | React  |
| --- | ---  |
| [![Volt Bootstrap 5 Dashboard HTML](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-bootstrap-5-dashboard/volt-bootstrap-5-dashboard-preview.jpg)](https://github.com/themesberg/volt-bootstrap-5-dashboard) | [![Volt React Dashboard](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-react-dashboard/thumbnail.png)](https://demo.themesberg.com/volt-react-dashboard/)

## Demo

| Dashboard | Transactions | Settings | Forms |
| --- | --- | --- | --- |
| [![Dashboard](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/overview.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/dashboard/overview) | [![Transactions](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/transactions.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/transactions) | [![Settings](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/settings.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/settings) | [![Tables](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/tables.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/tables/bootstrap-tables)

| Sign in | Sign up | Forgot password | Reset password |
| --- | --- | --- | --- |
| [![Sign in](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/sign-in.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/sign-in) | [![Sign up](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/sign-up.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/sign-up) | [![Forgot Password](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/forgot-password.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/forgot-password) | [![Reset password](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/reset-password.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/reset-password)

| Lock Profile | 404 Not Found | 500 Server Error | Documentation |
| --- | --- | --- | --- |
| [![Lock Profile](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/lock.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/lock) | [![404 Not Found](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/404.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/404) | [![500 Server Error](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/500.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/examples/500) | [![Documentation](https://themesberg.s3.us-east-2.amazonaws.com/public/products/volt-pro-react-dashboard/github/docs.jpg)](https://demo.themesberg.com/volt-react-dashboard/#/documentation/quick-start)

-   [Live Demo](https://demo.themesberg.com/volt-react-dashboard)
-   [Download](https://themesberg.com/product/dashboard/volt-react)

## Quick start

1. Register and Download from [Themesberg](https://themesberg.com/product/dashboard/volt-react) or clone this repository
2. Download the project's zip

### Using Yarn

3. Make sure you have [Yarn](https://yarnpkg.com/) installed.
4. After installing `yarn`, open a terminal and run `yarn install` in the main volt folder to download all project dependencies.

```
yarn install
```

5. Then start the app in development mode by running the following command in terminal:

```
yarn start
```

6. Open http://localhost:3000 to view it in the browser. Any changes you make to the code will be automatically reflected in the browser.

7. If you want to generate the production files, change the `homepage` value from the `package.json` to the domain name that the app will be hosted on, and then run the following command in the terminal:

```
yarn build
```

### Using NPM

3. Make sure you have [Node.js](https://nodejs.org/en/) installed. Make sure the installed Node version is >= 8.10 and of npm >= 5.6

4. After installing Node.js, open a terminal and run `npm install` in the main `volt-react-dashboard/` folder to download all project dependencies. You'll find them in the `node_modules/` folder.

```
npm install
```

5. Then start the app in development mode by running the following command in terminal:

```
npm run start
```

6. Open http://localhost:3000 to view it in the browser. Any changes you make to the code will be automatically reflected in the browser.

7. If you want to generate the production files, change the `homepage` value from the `package.json` to the domain name that the app will be hosted on, and then run the following command in the terminal:

```
npm run build
```

## Documentation

Every component, plugin and getting started is thoroughly documented on our [online documentation](https://demo.themesberg.com/volt-react-dashboard/#/documentation/quick-start).

## File Structure

Within the download you'll find the following directories and files:

```
Volt React Dashboard
.
├── LICENSE.md
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── browserconfig.xml
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── mstile-150x150.png
│   ├── robots.txt
│   ├── safari-pinned-tab.svg
│   └── site.webmanifest
├── src
│   ├── assets
│   │   ├── img
│   │   └── syntax-themes
│   ├── components
│   │   ├── AccordionComponent.js
│   │   ├── Charts.js
│   │   ├── Code.js
│   │   ├── CodeEditor.js
│   │   ├── Documentation.js
│   │   ├── Footer.js
│   │   ├── Forms.js
│   │   ├── Navbar.js
│   │   ├── Preloader.js
│   │   ├── Progress.js
│   │   ├── ScrollToTop.js
│   │   ├── Sidebar.js
│   │   ├── Tables.js
│   │   └── Widgets.js
│   ├── data
│   │   ├── charts.js
│   │   ├── commands.js
│   │   ├── features.js
│   │   ├── notifications.js
│   │   ├── pages.js
│   │   ├── tables.js
│   │   ├── teamMembers.js
│   │   └── transactions.js
│   ├── index.js
│   ├── pages
│   │   ├── HomePage.js
│   │   ├── Presentation.js
│   │   ├── Settings.js
│   │   ├── Transactions.js
│   │   ├── components
│   │   ├── dashboard
│   │   ├── documentation
│   │   ├── examples
│   │   └── tables
│   ├── routes.js
│   └── scss
│       ├── volt
│       └── volt.scss
└── yarn.lock

```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources

- Demo: <https://demo.themesberg.com/volt-react-dashboard>
- Download Page: <https://themesberg.com/product/dashboard/volt-react>
- Documentation: <https://demo.themesberg.com/volt-react-dashboard/#/documentation/overview>
- License Agreement: <https://themesberg.com/licensing>
- Support: <https://themesberg.com/contact>
- Issues: [Github Issues Page](https://github.com/themesberg/volt-react-dashboard/issues)

## Upgrade to Pro

If you'd like to support this open source software, we invite you to check out the premium version of this React dashboard called [Volt Pro React Dashboard](https://themesberg.com/product/dashboard/volt-pro-react). It features over 800 React components, customized pugins, and 20 example pages.

## Reporting Issues

We use GitHub Issues as the official bug tracker for Volt React Dashboard. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of Volt React Dashboard. Check the CHANGELOG from your dashboard on our [website](https://themesberg.com/product/dashboard/volt-react#changelog).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://themesberg.com/contact) instead of opening an issue.

## Licensing

- Copyright 2021 Themesberg (Crafty Dwarf LLC) (https://themesberg.com)
- Themesberg [license](https://themesberg.com/licensing#mit) (MIT License)

## Useful Links

- [React themes](https://themesberg.com/templates/react) from Themesberg
- [Affiliate Program](https://themesberg.com/affiliate)

##### Social Media

Twitter: <https://twitter.com/themesberg>

Facebook: <https://www.facebook.com/themesberg/>

Dribbble: <https://dribbble.com/themesberg>

Instagram: <https://www.instagram.com/themesberg/>
