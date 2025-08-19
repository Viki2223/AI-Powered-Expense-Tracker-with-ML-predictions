# 🤖 AI-Powered Expense Tracker with ML Predictions

<div align="center">

[![React](https://img.shields.io/badge/React-18.0+-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776ab?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--Learn-1.4+-f7931e?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

**A comprehensive financial tracking application with AI-based predictions for future expenses**

[🚀 Live Demo](https://your-deployed-app.herokuapp.com) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions/issues) • [✨ Request Feature](https://github.com/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions/issues)

</div>

---

## 🌟 Features

### 🔐 **Secure Authentication**
- JWT-based user registration and login
- Secure password hashing with BCrypt
- Session management with automatic token refresh
- Protected routes and API endpoints

### 💰 **Smart Expense Management**
- Add, view, edit, and delete expenses with categories
- Real-time expense tracking and validation
- Category-based expense organization
- Date-wise expense filtering and sorting

### 🤖 **AI-Powered Predictions**
- Machine learning-powered expense forecasting
- 30-day spending predictions with confidence scoring
- Pattern recognition and trend analysis
- Personalized insights based on historical data

### 📊 **Interactive Analytics Dashboard**
- Real-time charts and visualizations
- Category-wise spending breakdown
- Monthly and weekly spending trends
- Statistical insights and spending patterns

### 📱 **Modern UI/UX**
- Responsive design for all devices
- Intuitive and user-friendly interface
- Real-time updates and notifications
- Indian Rupee (₹) formatting and localization

---

## 🛠 Tech Stack

<details>
<summary><b>Frontend Technologies</b></summary>

- **React 18** - Modern UI library with Hooks and Context API
- **Chart.js** - Interactive data visualizations and charts
- **Axios** - HTTP client for API communication
- **CSS3** - Responsive design with Flexbox and Grid
- **Local Storage** - Client-side data persistence

</details>

<details>
<summary><b>Backend Technologies</b></summary>

- **Flask 3.0** - Lightweight Python web framework
- **SQLAlchemy** - Python SQL toolkit and ORM
- **Flask-JWT-Extended** - JWT authentication for Flask
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **Flask-BCrypt** - Password hashing utilities

</details>

<details>
<summary><b>AI & Machine Learning</b></summary>

- **Scikit-learn** - Machine learning library for predictions
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing and data processing
- **Custom ML Pipeline** - Expense prediction algorithms

</details>

<details>
<summary><b>Database & Storage</b></summary>

- **SQLite** - Development database
- **PostgreSQL** - Production database (Heroku)
- **Local Storage** - Client-side session management

</details>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Python 3.9+**
- **Node.js 18+**
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository:**
git clone https://github.com/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions.git
cd AI-Powered-Expense-Tracker-with-ML-predictions

text

2. **Install Python dependencies:**
pip install -r requirements.txt

text

3. **Install Node.js dependencies:**
cd frontend
npm install
cd ..

text

### Running the Application

1. **Start the Backend Server:**
cd backend
python app.py

text
The backend server will start on `http://localhost:5000`

2. **Start the Frontend Development Server:**
cd frontend
npm start

text
The frontend application will start on `http://localhost:3000`

3. **Open your browser and navigate to:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000/api/health

---

## 🤖 AI & Machine Learning Features

### Expense Prediction Algorithm

The application uses advanced machine learning techniques to analyze spending patterns and predict future expenses:

#### **Data Processing Pipeline**
- **Data Cleaning:** Removes outliers and validates expense data
- **Feature Engineering:** Extracts patterns from historical spending
- **Temporal Analysis:** Considers seasonal and weekly spending variations
- **Category Analysis:** Analyzes spending behavior across different categories

#### **Prediction Models**
- **Weighted Average Model:** For users with limited expense history
- **Trend Analysis Model:** For users with substantial data
- **Confidence Scoring:** Provides reliability metrics for predictions

#### **Key Metrics**
- **30-Day Predictions:** Forecasts spending for the next month
- **Confidence Levels:** Low, Medium, High based on data quality
- **Category Breakdown:** Spending predictions by expense category
- **Trend Detection:** Identifies increasing, stable, or decreasing patterns

---

## 📊 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | User login |
| `GET` | `/api/verify-token` | Verify JWT token |

### Expense Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/expenses` | Get user expenses |
| `POST` | `/api/expenses` | Create new expense |
| `PUT` | `/api/expenses/:id` | Update expense |
| `DELETE` | `/api/expenses/:id` | Delete expense |

### AI & Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/predict` | Get AI expense predictions |
| `GET` | `/api/health` | Health check endpoint |

### Example API Usage

<details>
<summary><b>Login Request</b></summary>

curl -X POST http://localhost:5000/api/login
-H "Content-Type: application/json"
-d '{
"email": "user@example.com",
"password": "password123"
}'

text

**Response:**
{
"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
"user": {
"id": 1,
"email": "user@example.com",
"first_name": "John",
"last_name": "Doe"
}
}

text

</details>

<details>
<summary><b>Add Expense Request</b></summary>

curl -X POST http://localhost:5000/api/expenses
-H "Content-Type: application/json"
-H "Authorization: Bearer YOUR_JWT_TOKEN"
-d '{
"category": "Food",
"amount": 250.50,
"description": "Lunch at restaurant",
"date": "2025-08-19"
}'

text

</details>

---

## 🎯 Usage Guide

### 1. **User Registration & Login**
- Create a new account with email and password
- Secure login with JWT authentication
- Automatic session management and token refresh

### 2. **Adding Expenses**
- Select from predefined categories (Food, Transportation, etc.)
- Enter amount in Indian Rupees (₹)
- Add optional descriptions for better tracking
- Real-time validation and error handling

### 3. **Viewing Analytics**
- **Dashboard Overview:** Total expenses, monthly spending, transaction count
- **AI Predictions:** 30-day spending forecasts with confidence scores
- **Category Breakdown:** Visual representation of spending by category
- **Trend Analysis:** Identify spending patterns and habits

### 4. **Managing Expenses**
- Edit existing expenses with updated information
- Delete unnecessary or incorrect entries
- Filter and search through expense history
- Export data for external analysis

---

## 📱 Screenshots

<div align="center">

### Login & Authentication
![Login Screen](screenshots/login.png)

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### AI Predictions
![AI Predictions](screenshots/predictions.png)

### Expense Management
![Expense Management](screenshots/expenses.png)

</div>

---

## 🚀 Deployment

### Deploy to Heroku

1. **Prepare for deployment:**
chmod +x build.sh deploy.sh
./build.sh

text

2. **Deploy to Heroku:**
Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

Login and create app
heroku login
heroku create your-app-name

Set environment variables
heroku config:set NODE_ENV=production
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=$(openssl rand -base64 32)
heroku config:set JWT_SECRET_KEY=$(openssl rand -base64 32)

Deploy
git push heroku main
heroku open

text

### Environment Variables

Set these environment variables for production:

NODE_ENV=production
FLASK_ENV=production
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=your-database-url (automatically set by Heroku Postgres)

text

---

## 🧪 Testing

The application includes comprehensive testing coverage:

### Backend Tests
cd backend
python -m pytest tests/ -v

text

### Frontend Tests
cd frontend
npm test

text

### API Testing
Test health endpoint
curl http://localhost:5000/api/health

Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/expenses

text

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch:**
git checkout -b feature/amazing-feature

text
3. **Make your changes and commit:**
git commit -m 'Add some amazing feature'

text
4. **Push to your branch:**
git push origin feature/amazing-feature

text
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📈 Roadmap

### Short-term Goals (Q4 2025)
- [ ] **Multi-currency support** with real-time exchange rates
- [ ] **Data export** to CSV, PDF, and Excel formats
- [ ] **Budget tracking** with spending limits and alerts
- [ ] **Receipt scanning** with OCR technology
- [ ] **Expense categories customization**

### Medium-term Goals (Q1-Q2 2026)
- [ ] **Mobile app** for iOS and Android
- [ ] **Expense sharing** with family and friends
- [ ] **Bank integration** for automatic expense import
- [ ] **Advanced AI insights** with spending recommendations
- [ ] **Multi-language support**

### Long-term Goals (Q3-Q4 2026)
- [ ] **Investment tracking** and portfolio management
- [ ] **Financial goal setting** and progress tracking
- [ ] **Tax preparation** assistance and reporting
- [ ] **Business expense management** for freelancers
- [ ] **API marketplace** for third-party integrations

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

MIT License

Copyright (c) 2025 Viki2223

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

text

---

## 🙏 Acknowledgments

- **OpenAI** for inspiring AI integration patterns
- **Flask Community** for excellent documentation and support
- **React Team** for the amazing frontend framework
- **Scikit-learn Contributors** for powerful ML libraries
- **Heroku** for reliable cloud hosting platform
- **All Contributors** who helped improve this project

---

## 👨‍💻 Author

<div align="center">

**Viki2223**

[![GitHub](https://img.shields.io/badge/GitHub-Viki2223-181717?style=for-the-badge&logo=github)](https://github.com/Viki2223)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5722?style=for-the-badge&logo=web)](https://your-portfolio.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourprofile)

*Full-Stack Developer specializing in AI/ML applications*

</div>

---

## 📊 Project Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions?style=social)
![GitHub Issues](https://img.shields.io/github/issues/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions)
![GitHub License](https://img.shields.io/github/license/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions)

</div>

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Built with ❤️ using React, Flask, and Machine Learning**

[🔝 Back to Top](#-ai-powered-expense-tracker-with-ml-predictions)

</div>
