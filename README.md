# College Lost and Found System (MERN)

A full-stack application for managing campus lost and found reports.

## Features

- Authentication (Signup/Login with JWT)
- Report Lost Items
- Report Found Items
- Browse lost/found lists
- Item detail view
- Claim/resolve workflow
- Search and category filtering
- View own posts via `?mine=true` query on list APIs

## Project Structure

```text
hospital_2/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.css
├── config/
├── controllers/
│   ├── authController.js
│   └── itemController.js
├── middleware/
├── models/
│   ├── User.js
│   ├── LostItem.js
│   └── FoundItem.js
├── routes/
│   ├── authRoutes.js
│   └── itemRoutes.js
├── server.js
└── package.json
```

## API Endpoints

### Auth
- `POST /auth/signup`
- `POST /auth/login`

### Lost/Found
- `POST /api/lost-items`
- `GET /api/lost-items`
- `GET /api/lost-items/:id`
- `POST /api/found-items`
- `GET /api/found-items`
- `PUT /api/items/:id/claim`

All lost/found routes require `Authorization: Bearer <token>`.

## Run Locally

1. Install dependencies
```bash
npm install
cd client && npm install && cd ..
```

2. Configure environment (`.env`)
```bash
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

3. Start backend
```bash
npm run dev
```

4. Start frontend (optional separate dev server)
```bash
cd client
npm start
```

## Notes
- `image` is currently stored as URL text (optional).
- You can filter list APIs with `q`, `category`, and `mine=true`.
