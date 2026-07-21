# Hotel Booking App

A full-stack hotel booking application with an Express.js backend and React Native (Expo) mobile frontend.

## Tech Stack

**Backend:** Express 5, MongoDB/Mongoose, JWT auth, Zod validation, TypeScript  
**Mobile:** Expo SDK 54, React Native 0.81, Redux Toolkit Query, React Hook Form

## Features

- User authentication (JWT-based login/signup/profile)
- Admin panel with room/user/booking management
- Room browsing with type/status filters and infinite scroll
- Room detail page with image carousel and date picker booking
- Booking system with status management (pending/confirmed/cancelled)
- Profile editing (name/password)
- Dark mode support

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev        # starts with hot reload
npm run build      # compile TypeScript
npm test           # run tests
```

Create a `.env` file in `backend/`:
```
SECRET=your_jwt_secret
MONGODB_URL=your_mongodb_uri
```

The server runs on port 4000.

### Mobile

```bash
cd mobile
npm install
npx expo start
```

Update `mobile/redux/api/apiSlice.ts` with your backend URL.

## Project Structure

```
├── backend/
│   └── src/
│       ├── Bookings/        # Bookings module
│       ├── Room/            # Room module
│       ├── User/            # User & Auth module
│       ├── helper/          # Utility helpers
│       ├── router/          # Route aggregator
│       ├── server/          # Express server setup
│       └── util/            # JWT, validation, errors
└── mobile/
    ├── app/                 # Expo Router pages
    │   ├── (tabs)/          # Home, Booking, More tabs
    │   └── admin/           # Admin panel pages
    ├── components/          # Reusable UI components
    ├── constants/           # Theme, tab config
    ├── hooks/               # Custom hooks
    ├── interface/           # TypeScript interfaces
    ├── redux/               # Redux store & API slices
    │   ├── api/             # RTK Query endpoints
    │   └── features/        # State slices
    └── util/                # Date formatting, token storage
```
