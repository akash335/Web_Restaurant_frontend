# AKIR Restaurant Frontend

## About the Project

This is the frontend for the AKIR Restaurant website.
It is built using React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

The website includes a modern responsive design, menu pages, contact form, reservation form, and 3D hero effects.

---

## Features

* Built with **React + TypeScript**
* Powered by **Vite**
* Styled using **Tailwind CSS** and **shadcn/ui**
* Responsive design
* 3D hero section
* Menu page with dish cards
* Contact form
* Reservation form
* Easy deployment

---

## Installation & Setup

Clone and run locally:

```sh
# Step 1: Clone the repo
git clone https://github.com/akash335/AKIR_Restaurant.git

# Step 2: Go to the frontend folder
cd AKIR_Restaurant/Web_Restaurant_frontend-main

# Step 3: Install dependencies
npm install

# Step 4: Start the dev server
npm run dev
```

The frontend runs on:

```sh
http://localhost:5175
```

---

## Environment Variables

Create a `.env` file if needed:

```env
VITE_API_URL=http://localhost:4000
```

This connects the frontend to the backend API.

---

## Build for Production

```sh
npm run build
```

The production files will be generated in the `dist/` folder.

---

## Deployment

You can deploy the frontend on platforms like:

* Vercel
* Netlify

Make sure the backend API is deployed separately and update:

```env
VITE_API_URL=https://your-backend-url.com
```

---

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Framer Motion
* React Three Fiber / Three.js

---

## Notes

* Make sure backend is running before testing forms locally
* Reservation and contact forms depend on the backend API
* If 3D is not supported on some devices, fallback rendering should be used

---

## Author

**Porumamilla Akash**
Email: [porumamillaakash@gmail.com](mailto:porumamillaakash@gmail.com)
LinkedIn: https://www.linkedin.com/in/porumamilla-akash-06b3122aa/

---# Web_Restaurant_frontend