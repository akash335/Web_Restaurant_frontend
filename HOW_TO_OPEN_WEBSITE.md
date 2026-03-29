# How to Open AKIR Restaurant Website

## Local frontend only
```bash
npm install
npm run dev
```

Then open `http://localhost:5175` in your browser.

## If you want to use a local backend too
1. Start the backend separately from the backend project on port `4000`.
2. In this frontend project, create a `.env.local` file:

```env
VITE_API_URL=http://localhost:4000
```

3. Run `npm run dev` and open `http://localhost:5175`.

## Important
- Do not open the backend URL as the website.
- The backend URL is only for API requests.
