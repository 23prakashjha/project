# Hacker News Scraper - MERN Stack Application

A full-stack web application that scrapes top stories from Hacker News, provides user authentication, and allows bookmarking favorite stories. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **Web Scraper**: Automatically fetches top 10 stories from Hacker News
- **User Authentication**: JWT-based registration and login system
- **Story Management**: View stories with pagination, sort by points
- **Bookmark System**: Users can bookmark/unbookmark stories
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Updates**: Manual scraping trigger with refresh functionality

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cheerio** - Web scraping
- **Axios** - HTTP client

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## 📁 Project Structure

```
project/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── storyController.js
│   │   └── scrapeController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Story.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── stories.js
│   │   └── scrape.js
│   ├── scraper/
│   │   └── hackerNewsScraper.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Bookmarks.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── index.tsx
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hacker-news-scraper
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hacker-news-scraper
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

**Important**: Replace `JWT_SECRET` with a secure random string in production.

### 4. Frontend Setup

```bash
cd frontend
npm install
```

### 5. Configure Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Start MongoDB

Make sure MongoDB is running on your system:
- For local MongoDB: `mongod`
- Or use MongoDB Atlas and update the `MONGODB_URI` in backend `.env`

### 7. Run the Application

Start the backend server:

```bash
cd backend
npm run dev
```

In a new terminal, start the frontend:

```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Stories
- `GET /api/stories?page=1&limit=10` - Get paginated stories
- `GET /api/stories/:id` - Get a single story
- `POST /api/stories/:id/bookmark` - Toggle bookmark (requires auth)
- `GET /api/stories/bookmarks` - Get user bookmarks (requires auth)

### Scraper
- `POST /api/scrape` - Trigger manual scraping

## 🎯 Usage

1. **Register/Login**: Create an account or login to access bookmark features
2. **View Stories**: Browse top stories from Hacker News, sorted by points
3. **Refresh Stories**: Use the "Refresh Stories" button to fetch latest stories
4. **Bookmark Stories**: Click the bookmark icon to save stories (requires login)
5. **View Bookmarks**: Access your saved stories from the Bookmarks page
6. **Pagination**: Navigate through stories using Previous/Next buttons

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🌟 Bonus Features Implemented

- ✅ Pagination for stories
- ✅ Responsive design for mobile devices
- ✅ Real-time bookmark toggling
- ✅ Automatic scraping on server start
- ✅ Manual scraping trigger
- ✅ TypeScript for type safety
- ✅ Modern UI with Tailwind CSS
- ✅ Context API for state management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the `MONGODB_URI` in backend `.env`

2. **CORS Errors**
   - Backend runs on port 5000, frontend on port 3000
   - CORS is configured in the backend

3. **Authentication Issues**
   - Check JWT_SECRET is set in backend `.env`
   - Verify token is being stored in localStorage

4. **Scraping Issues**
   - Hacker News might block frequent requests
   - Check internet connection
   - Verify scraper logic in `hackerNewsScraper.js`

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
