# Product Store (MERN mini)

A small, full‑stack product catalog app. Create, list, update, and delete products with image, name, and price.

- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React + Vite + Tailwind utility classes + Axios + React Router

## Monorepo Structure
```
/ (project root)
├── backend/            # Express API + MongoDB
│   ├── controllers/    # Product CRUD handlers
│   ├── routes/         # /api/products routes
│   ├── model/          # Mongoose model
│   ├── config/         # db connection
│   └── server.js       # app bootstrap
└── frontend/           # React app (Vite)
    └── src/            # components, pages, routing
```

## Features
- Add new products (name, price, image URL)
- Edit products with pre‑filled form fields
- Delete products from the list
- Simple, modern UI with responsive cards

## Quick Start
Make sure you have Node 18+ and a MongoDB instance (local or cloud).

### 1) Install dependencies
```bash
# from project root
cd backend && npm install
cd ../frontend && npm install
```

### 2) Configure environment
Create a `.env` in `backend/` (if you don’t already have one):
```bash
# backend/.env
MONGO_URI=mongodb://127.0.0.1:27017/product_store
PORT=5555
```
The backend already defaults to `PORT=5555` when not provided.

### 3) Run the backend
```bash
cd backend
npm start
# server runs on http://localhost:5555
```

### 4) Run the frontend
```bash
cd frontend
npm run dev
# app runs on http://localhost:5173 (by default)
```

## API Reference (Express)
Base URL: `http://localhost:5555/api`

- GET `/products` → list all products
- GET `/products/:id` → get a single product
- POST `/products` → create a product
- PUT `/products/:id` → update a product
- DELETE `/products/:id` → delete a product

### Schemas
```json
{
  "_id": "string",
  "name": "string",
  "price": 0,
  "image": "https://...",
  "createdAt": "ISO",
  "updatedAt": "ISO"
}
```

### Example Requests
Create:
```bash
curl -X POST http://localhost:5555/api/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"iPhone","price":999.99,"image":"https://..."}'
```

Update:
```bash
curl -X PUT http://localhost:5555/api/products/PRODUCT_ID \
  -H 'Content-Type: application/json' \
  -d '{"name":"iPhone 15","price":1099,"image":"https://..."}'
```

Delete:
```bash
curl -X DELETE http://localhost:5555/api/products/PRODUCT_ID
```

## Frontend Notes
- React Router routes:
  - `/` → product grid
  - `/create` → create form
  - `/create/:id` → edit form (prefills from API)
- API base used by the frontend lives in `frontend/config/config.js`.

## Scripts
Backend:
```bash
npm start         # start Express API
```
Frontend:
```bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview prod build
```

## Troubleshooting
- Prefill not working when editing:
  - Ensure backend is running and `GET /api/products/:id` responds with `{ success: true, message: <product> }`.
  - Confirm the frontend is navigating to `/create/:id`.
- CORS errors:
  - CORS is enabled in `backend/server.js`. If you changed origins, adjust `cors()` options accordingly.
- Mongo connection:
  - Verify `MONGO_URI` and that the database is reachable.

## License
MIT — feel free to use and adapt.
