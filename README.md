# 🤖 AI-Powered Expense Tracker

A comprehensive financial tracking application with AI-based predictions for future expenses, built with React, Flask, and machine learning.

## 🌟 Features

- **🔐 Secure Authentication** - JWT-based user registration and login
- **💰 Expense Management** - Add, view, edit, and delete expenses with categories
- **�� AI Predictions** - Machine learning-powered expense forecasting
- **📊 Analytics Dashboard** - Interactive charts and spending insights
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **💾 Dual Database** - SQLite for development, PostgreSQL for production
- **🔄 Real-time Updates** - Live data synchronization
- **🎯 Indian Currency** - INR formatting and localization

## �� Tech Stack

### Frontend
- **React 18** with Hooks and Context API
- **Chart.js** for interactive data visualizations
- **Axios** for API communication
- **Responsive CSS** with modern design patterns

### Backend
- **Flask** with SQLAlchemy ORM
- **JWT Authentication** with Flask-JWT-Extended
- **Scikit-learn** for AI predictions and analytics
- **Pandas & NumPy** for data analysis and processing
- **BCrypt** for secure password hashing

### Database
- **SQLite** for development
- **PostgreSQL** for production deployment

### Deployment
- **Heroku** for cloud hosting
- **Docker** containerization support
- **GitHub Actions** for CI/CD

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository:**
git clone https://github.com/Viki2223/ai-expense-tracker.git
cd ai-expense-tracker

2. **Install backend dependencies:**
pip install -r requirements.txt

text

3. **Install frontend dependencies:**
cd frontend
npm install
cd ..
4. **Start the backend server:**
cd backend
python app.py

text

5. **Start the frontend development server:**
cd frontend
npm start

text

6. **Open your browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
## 🤖 AI Features

The application uses advanced machine learning algorithms to:

- **Analyze Spending Patterns** - Identifies trends in your expense data
- **Predict Future Expenses** - Forecasts spending for the next 30 days
- **Confidence Scoring** - Provides reliability metrics for predictions
- **Seasonal Adjustments** - Accounts for monthly spending variations
- **Category Analysis** - Breaks down expenses by category
- **Trend Detection** - Identifies increasing, decreasing, or stable patterns

## 📊 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/verify-token` - Token verification

### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Create new expense
- `DELETE /api/expenses/:id` - Delete expense

### AI & Analytics
- `GET /api/predict` - Get AI expense predictions

## 🚀 Deployment

### Deploy to Heroku

1. **Build the application:**
chmod +x build.sh
./build.sh

text

2. **Deploy to Heroku:**
chmod +x deploy.sh
./deploy.sh

text

### Environment Variables

Set these environment variables in your production environment:

NODE_ENV=production
FLASK_ENV=production
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
DATABASE_URL=your-database-url

text

## 📱 Usage

1. **Register** a new account with your email and password
2. **Login** to access the dashboard
3. **Add Expenses** by selecting category, amount, and description
4. **View AI Predictions** based on your spending patterns
5. **Analyze Trends** with interactive charts and statistics
6. **Manage Data** by editing or deleting expenses as needed

## 🎯 Screenshots

[Add screenshots of your application here]

## 🧪 Testing

The application includes comprehensive testing:

- **Unit Tests** for individual components
- **Integration Tests** for API endpoints
- **User Flow Tests** for complete user journeys

Run tests with:
Backend tests
cd backend && python -m pytest

Frontend tests
cd frontend && npm test

text

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Viki2223**
- GitHub: [@Viki2223](https://github.com/Viki2223)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- OpenAI for inspiration on AI integration
- Flask and React communities for excellent documentation
- Heroku for reliable cloud hosting
- All contributors and testers

## 📈 Roadmap

- [ ] Multi-currency support
- [ ] Export data to CSV/PDF
- [ ] Expense categories customization
- [ ] Budget setting and tracking
- [ ] Expense sharing with family/friends
- [ ] Mobile app development
- [ ] Advanced AI insights and recommendations

---

⭐ **Star this repository if you find it helpful!**

## 🔗 Live Demo

[Your deployed application URL will go here]

---

**Built with ❤️ using React, Flask, and Machine Learning**
