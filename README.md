# StreamHive

A production-grade backend API for a video streaming platform, built with **Node.js**, **Express**, and **MongoDB**. StreamHive provides complete REST APIs for user authentication, video management, social interactions, playlists, subscriptions, and a creator dashboard.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication (access + refresh tokens) |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Media storage (videos, images) |
| **Multer** | File upload handling |
| **cookie-parser** | Cookie-based token management |

## Features

- **Authentication** — Register, login, logout with JWT access & refresh token flow
- **User Management** — Profile update, avatar & cover image upload, password change
- **Video** — Upload, update, delete, toggle publish status, search with sort & pagination
- **Comments** — Nested comments on videos with full CRUD
- **Likes** — Toggle likes on videos, comments, and tweets
- **Tweets** — Community posts with reply threads
- **Playlists** — Create, update, delete playlists and manage videos within them
- **Subscriptions** — Subscribe/unsubscribe to channels, view subscribers & subscriptions
- **Dashboard** — Channel stats (views, subscribers, video count, likes) and video management
- **Healthcheck** — API status endpoint

## Project Structure

```
streamhive/
├── src/
│   ├── index.js                  # Entry point — connects DB & starts server
│   ├── app.js                    # Express app — middleware & route mounting
│   ├── constants.js              # App-level constants
│   ├── db/
│   │   └── connection.js         # MongoDB connection via Mongoose
│   ├── models/
│   │   ├── user.models.js
│   │   ├── video.models.js
│   │   ├── comment.models.js
│   │   ├── like.models.js
│   │   ├── tweet.models.js
│   │   ├── playlist.models.js
│   │   └── subscription.models.js
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── video.controller.js
│   │   ├── comment.controller.js
│   │   ├── like.controller.js
│   │   ├── tweet.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── dashboard.controller.js
│   │   └── healthcheck.controller.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── video.routes.js
│   │   ├── comment.routes.js
│   │   ├── like.routes.js
│   │   ├── tweet.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── dashboard.routes.js
│   │   └── healthcheck.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── multer.middleware.js  # File upload config
│   └── utils/
│       ├── apiError.js           # Custom error class
│       ├── apiResponse.js        # Standardized response wrapper
│       ├── asyncHandler.js       # Async error wrapper for controllers
│       ├── cloudinary.js         # Cloudinary upload/delete helpers
│       ├── deleteNestedItems.js  # Cascade delete utility
│       └── validate.js           # Input validation helpers
├── public/                       # Static files & temp uploads
├── frontend/                     # Frontend (Vite + React)
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Cloudinary** account (for media storage)

### 1. Clone the Repository

```bash
git clone <repo-url>
cd streamhive
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the Server

```bash
# Production
npm start

# Development (auto-restart on file changes)
npm run watch
```

The server starts at `http://localhost:8000`.

## API Reference

All endpoints are prefixed with `/api/v1`. Authenticated routes require a Bearer token in the `Authorization` header.

### Auth & User — `/api/v1/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | No | Register with avatar & optional cover image |
| `POST` | `/login` | No | Login with email/username + password |
| `POST` | `/logout` | Yes | Logout & clear refresh token |
| `POST` | `/refresh-token` | No | Get new access token using refresh token |
| `POST` | `/change-password` | Yes | Change password |
| `GET` | `/current-user` | Yes | Get logged-in user profile |
| `PATCH` | `/update-account` | Yes | Update name & email |
| `PATCH` | `/avatar` | Yes | Update avatar image |
| `PATCH` | `/cover-image` | Yes | Update cover image |
| `GET` | `/c/:username` | Yes | Get channel profile with sub counts |
| `GET` | `/history` | Yes | Get watch history |

### Videos — `/api/v1/videos`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | Yes | Get all videos (search, sort, paginate) |
| `POST` | `/upload` | Yes | Upload video + thumbnail |
| `GET` | `/:videoId` | Yes | Get video by ID |
| `PATCH` | `/:videoId` | Yes | Update video details + thumbnail |
| `DELETE` | `/:videoId` | Yes | Delete video |
| `PATCH` | `/toggle/publish/:videoId` | Yes | Toggle publish status |

### Comments — `/api/v1/comments`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/:videoOrCommentId` | Yes | Get comments for a video/comment |
| `POST` | `/:videoOrCommentId` | Yes | Add comment to video/comment |
| `PATCH` | `/:commentId` | Yes | Update comment |
| `DELETE` | `/:commentId` | Yes | Delete comment |

### Likes — `/api/v1/likes`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/toggle/v/:videoId` | Yes | Toggle video like |
| `POST` | `/toggle/c/:commentId` | Yes | Toggle comment like |
| `POST` | `/toggle/t/:tweetId` | Yes | Toggle tweet like |
| `GET` | `/videos` | Yes | Get liked videos |
| `GET` | `/comments` | Yes | Get liked comments |
| `GET` | `/tweets` | Yes | Get liked tweets |

### Tweets — `/api/v1/tweets`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/` | Yes | Create tweet |
| `POST` | `/:tweetId` | Yes | Reply to tweet |
| `DELETE` | `/:tweetId` | Yes | Delete tweet |
| `GET` | `/:userId` | Yes | Get user's tweets |
| `GET` | `/c/:tweetId` | Yes | Get tweet replies |

### Playlists — `/api/v1/playlists`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/` | Yes | Create playlist |
| `GET` | `/get-all` | Yes | Get all user playlists |
| `GET` | `/:playlistId` | Yes | Get playlist with videos |
| `PATCH` | `/:playlistId` | Yes | Update playlist details |
| `DELETE` | `/:playlistId` | Yes | Delete playlist |
| `PATCH` | `/:playlistId/video` | Yes | Add video to playlist |
| `DELETE` | `/:playlistId/video` | Yes | Remove video from playlist |

### Subscriptions — `/api/v1/subscriptions`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/c/:channelId` | Yes | Toggle subscription |
| `GET` | `/subscribers` | Yes | Get subscriber list |
| `GET` | `/channels` | Yes | Get subscribed channels |

### Dashboard — `/api/v1/dashboard`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/stats` | Yes | Get channel statistics |
| `GET` | `/videos` | Yes | Get channel videos for management |

### Healthcheck — `/api/v1/healthcheck`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | No | API health status |

## Frontend

The frontend is built with **Vite + React** and is located in the `frontend/` directory.

```bash
cd frontend
npm install
npm run dev
```
