# 📸 Insta Share — Instagram Clone

A fully responsive **Instagram-inspired social media web application** built with **React.js**, featuring JWT-based authentication, dynamic post interactions, user stories, search functionality, and complete profile management.

> 🎓 Built as part of the **NxtWave MERN Full Stack Development** certification by **Katta Rahul Krishna**

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login with token-based session management and protected routes
- 🏠 **Home Feed** — Paginated posts with real-time like/unlike toggling and comment display
- 📖 **User Stories** — Horizontal story carousel using React Slick slider
- 🔍 **Search Posts** — Search by post caption with live API queries and empty-state handling
- 👤 **My Profile** — View your own posts, stories, followers, and following count
- 🧑‍🤝‍🧑 **User Profile** — Browse any user's profile with their posts and stories
- ❤️ **Like System** — Toggle likes via POST API with instant UI feedback and live count update
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts using CSS media queries
- ⚠️ **Error & Loader States** — Skeleton loaders and retry-enabled failure views on every API call
- 🚫 **Not Found Route** — Custom 404 page for undefined paths

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React.js (Class Components) |
| Routing | React Router v5 |
| HTTP Requests | Fetch API |
| Authentication | JWT (stored in Cookies via `js-cookie`) |
| UI Carousel | React Slick |
| Icons | React Icons (`BsHeart`, `FcLike`, `FaSearch`, `FaRegComment`, `BiShareAlt`, `BsGrid3X3`, `BiCamera`) |
| Styling | CSS3 + Media Queries |
| Package Manager | pnpm |
| Linting | ESLint + Prettier |

---

## 📁 Project Structure

```
Instagram-Clone/
│
├── public/
│   └── index.html              # CDN links for React Slick CSS
│
├── src/
│   ├── components/
│   │   ├── Login/              # Login form with JWT cookie handling
│   │   ├── Header/             # Navigation with search icon & logout
│   │   ├── Home/               # Feed with stories + posts
│   │   ├── UserStories/        # Horizontal story carousel (React Slick)
│   │   ├── Posts/              # Posts list with loader & failure view
│   │   ├── PostItem/           # Single post card with like/comment
│   │   ├── MyProfile/          # Authenticated user's profile page
│   │   ├── UserProfile/        # Other users' profile pages
│   │   ├── SearchResults/      # Caption-based search with results
│   │   └── NotFound/           # 404 page
│   │
│   ├── App.js                  # Route definitions & protected route logic
│   └── index.js                # React DOM entry point
│
├── .eslintrc                   # ESLint config
├── .prettierrc                 # Prettier config
├── package.json
└── pnpm-lock.yaml
```

---

## 🚀 Getting Started

## 🔑 Demo Credentials

Use any of the following to log in:

| Username | Password |
|---|---|
| rahul | rahul@2021 |
| aakash | sky@007 |
| agastya | myth#789 |
| deepak | lightstar@1 |
| harshad | joy@85 |

---

## 🌐 API Reference

Base URL: `https://apis.ccbp.in`

| Endpoint | Method | Description |
|---|---|---|
| `/login` | POST | Authenticate and receive JWT token |
| `/insta-share/stories` | GET | Fetch all user stories |
| `/insta-share/posts` | GET | Fetch paginated posts feed |
| `/insta-share/posts?search={query}` | GET | Search posts by caption |
| `/insta-share/posts/{postId}/like` | POST | Like or unlike a post |
| `/insta-share/my-profile` | GET | Get authenticated user's profile |
| `/insta-share/users/{userId}` | GET | Get any user's profile by ID |

> All GET requests require `jwt_token` in cookies for authorization.

---

## 🗺️ Application Routes

| Path | Component | Access |
|---|---|---|
| `/login` | Login | Public only |
| `/` | Home | Protected |
| `/my-profile` | MyProfile | Protected |
| `/users/:id` | UserProfile | Protected |
| `*` | NotFound | Public |

---

## 🧠 Key Implementation Highlights

- **Protected Routes** — Unauthenticated users are redirected to `/login`; authenticated users visiting `/login` are redirected to `/`
- **Component Lifecycle** — All API calls managed via `componentDidMount` with state-driven re-rendering
- **Like Toggle** — Optimistic UI: like count updates instantly while the POST request fires in the background
- **React Slick Carousel** — User stories rendered as a sliding horizontal carousel with custom arrow buttons and CSS overrides
- **Responsive Design** — All layouts built with CSS media queries; no layout duplication across breakpoints
- **Search** — Query sent as a URL parameter on every search icon click; empty state handled gracefully with a dedicated view

---

## 📦 Key Dependencies

```json
{
  "react": "^17.x",
  "react-router-dom": "^5.x",
  "react-slick": "latest",
  "react-icons": "latest",
  "js-cookie": "latest"
}
```

---

## 🔮 Possible Future Enhancements

- 📤 Upload new posts with image and caption
- 💬 Live comment posting (currently read-only)
- 🔔 Notifications system
- 🌙 Dark mode toggle
- 👥 Follow / Unfollow functionality with persistent state
- 🔄 Infinite scroll on home feed

---

## 👨‍💻 Author

**Katta Rahul Krishna**
- 📧 kattarahulkrishna05853@gmail.com
- 💻 [GitHub](https://github.com/kattaRahulkrishna)
- 🔗 [LinkedIn](https://linkedin.com/in/katta-rahul-krishna)
