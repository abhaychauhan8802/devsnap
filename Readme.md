# Devsnap

<p>Devsnap is a developer-focused social media platform where developers can find the latest news, articles, blog posts, and trends related to the tech industry. The platform allows users to create their own profiles, follow other users, and engage with each other by commenting on posts. Users can also search for specific topics, authors, and publishers. Additionally, users can communicate with each other in real-time using the live chat feature. The platform is fully responsive and works well on all devices.</p>

## Features

- **Relevant Feed**: Users can view a feed with posts tailored to their interests and interactions.
- **Explore**: Discover new content and users by exploring various topics and trends.
- **Search**: Find specific posts, users, and topics quickly and efficiently.
- **User Profile**: Showcase personal skills, experience, and achievements on customizable user profiles.
- **Like Posts**: Express appreciation for content by liking posts.
- **Commenting**: Engage with content by commenting on posts and interacting with other users.
- **Follow and Followings**: Follow other users to see their posts in your feed and manage your followings.
- **Real-Time Chat**: Communicate with other users instantly through a live chat feature.
- **Responsive Design**: Enjoy a seamless experience across all devices with a fully responsive design.
- **Notifications**: Stay updated with notifications for new comments, posts from followed users, and other interactions.
- **Bookmark Posts**: Save posts to a personal bookmark list for later.
- **Add Post**: Create and share new content with the community.
- **Dark Mode**: Switch between light and dark modes for a different visual experience.

## Tech Stack

- **Frontend**: The frontend is built using React.js, Tailwind CSS with Shadcn and Zustand as state management store. The New Post page editor is built using Tiptap editor.
- **Backend**: The backend is built using Node.js, Express.js, and MongoDB as database. Redis for caching, and Cloudinary for image storage.
- **Database**: The database is MongoDB.
- **API**: The API is RESTful and uses JSON Web Tokens for authentication.

## Installation

Clone the repository: `git clone https://github.com/abhaychauhan8802/devsnap.git`

### Frontend

1. Go to the frontend directory: `cd client`
2. Install dependencies: `pnpm install`
3. Start the frontend: `pnpm run dev`
4. Open the app in your browser: `http://localhost:5173`

### Backend

1. Install dependencies: `pnpm install`
2. Start the server: `pnpm run dev`
3. Server is start on: `http://localhost:3000/`

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## Environment Variables

The following environment variables are required to run the app:

### Frontend

### Backend

- `PORT`=
- `CLIENT_URL`= The URL of the client.
- `MONGODB_URI`= Mongodb URI
- `JWT_SECRET`= Token secret

- `CLOUD_NAME`= Cloudnary Name
- `API_KEY`= Cloudnary Key
- `API_SECRET`= Cloudnary Secret

## Folder Structure

### Frontend

The frontend is structured as follows:

- `client`
  - `public`
    - `favicon.ico`
  - `src`
    - `App.jsx`
    - `components`
      - `ui`
        - `Button.jsx`
        - `Input.jsx`
        - ...
      - `common`
        - `Logo.jsx`
        - `UserAvatar.jsx`
        - ...
      - ...
    - `features`
      - `users`
        - `components`
          - `Profile.jsx`
          - `UserCard.jsx`
          - ...
        - ...
      - `posts`
        - `components`
          - `PostCard.jsx`
          - `PostFeed.jsx`
        - ...
      - ...
    - `lib`
    - `index.css`
    - `main.jsx`
    - `tailwind.config.js`

### Backend

The backend is structured as follows:

- `server`
  - `src`
    - `index.js`
    - `src`
      - `controllers`
        - `post.controller.js`
        - `user.controller.js`
        - ...
      - `middlewares`
        - `verifyToken.middleware.js`
        - `multer.middleware.js`
        - ...
      - `models`
        - `post.model.js`
        - `user.model.js`
        - ...
      - `routes`
        - `post.routes.js`
        - `user.routes.js`
        - ...
      - `utils`
      - `socket`
      - `lib`
