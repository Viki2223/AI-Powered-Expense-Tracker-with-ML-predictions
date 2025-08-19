# 🤖 AI-Powered Expense Tracker with ML Predictions

<div align="center">

[![React](https://img.shields.io/badge/React-18.0+-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776ab?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--Learn-1.4+-f7931e?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003b57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## 📌 Overview  

The **AI-Powered Expense Tracker** is a **full-stack financial management system** that helps users track their daily expenses and **predict future spending trends using Machine Learning**.  

This app provides **secure authentication, expense management, interactive reports, and AI-powered predictions** – all wrapped in a modern **React + Flask** architecture.  

---

## 🚀 Live Demo  

- 🌐 [Live Demo (Heroku)](https://your-deployed-app.herokuapp.com)  
- 🌐 [Live Demo (Render)](https://ai-expense-tracker-backend-nhy7.onrender.com)  

---

## ✨ Features  

- 📊 **Track Expenses** – Add, update, and delete expenses with ease  
- 🔐 **Secure Authentication** – JWT-based login and registration  
- 🤖 **ML Predictions** – Predict upcoming expenses based on past data  
- 📈 **Analytics Dashboard** – Visualize spending trends with charts  
- 💾 **SQLite Database** – Lightweight and reliable data storage  
- 🌍 **Cloud Deployment** – Accessible online via **Heroku** & **Render**  

---

## 🛠️ Tech Stack  

**Frontend:** React, Tailwind CSS  
**Backend:** Flask (Python)  
**Database:** SQLite  
**Machine Learning:** Scikit-learn, Pandas, NumPy  
**Authentication:** JWT  

---

## 🏗️ System Architecture  

```mermaid
graph TD;
    A[Frontend - React] -->|API Calls| B[Backend - Flask];
    B --> C[Database - SQLite];
    B --> D[Machine Learning Model - Scikit-learn];
    D --> B;
    C --> B;
    B -->|JSON Response| A;
````

---

## ⚙️ Installation

### 🔹 Clone the repository

```bash
git clone https://github.com/Viki2223/AI-Powered-Expense-Tracker-with-ML-predictions.git
cd AI-Powered-Expense-Tracker-with-ML-predictions
```

### 🔹 Backend Setup (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 🔹 Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| POST   | `/api/register` | Register new user       |
| POST   | `/api/login`    | Authenticate user (JWT) |
| GET    | `/api/expenses` | Get all expenses        |
| POST   | `/api/expenses` | Add a new expense       |
| PUT    | `/api/expenses` | Update expense          |
| DELETE | `/api/expenses` | Delete expense          |
| GET    | `/api/predict`  | Predict future expenses |

---

## 🚀 Deployment

This project is deployed on:

* 🌐 **Heroku** → [Live App](https://your-deployed-app.herokuapp.com)
* 🌐 **Render** → [Live App](https://ai-expense-tracker-backend-nhy7.onrender.com)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit changes (`git commit -m 'Add feature xyz'`)
4. Push to your branch (`git push origin feature-xyz`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

<div align="center">

⭐ If you found this project helpful, don’t forget to **star the repo**! ⭐

**Built with ❤️ using React, Flask, and Machine Learning**

</div>
```

---

✅ This version includes a **Mermaid architecture diagram** that GitHub automatically renders, making it look professional.

Do you want me to also add **screenshots / demo GIFs** section (UI + prediction graphs) in the README so recruiters can see visuals at first glance?
