# Project Structure

AI-Powered-Expense-Tracker-with-ML-predictions/
├── backend/
│ ├── app.py # Main Flask application
│ ├── config.py # Configuration settings
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── utils/ # Utility functions
│ └── static/ # Built frontend files (production)
├── frontend/
│ ├── public/
│ │ └── index.html # Main HTML template
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── utils/
│ │ │ ├── api.js # API communication
│ │ │ └── storage.js # Storage management
│ │ ├── App.js # Main React component
│ │ └── index.js # React entry point
│ ├── package.json # Frontend dependencies
│ └── build/ # Production build
├── requirements.txt # Python dependencies
├── Procfile # Heroku deployment
├── runtime.txt # Python version
├── build.sh # Build script
├── deploy.sh # Deployment script
├── .gitignore # Git ignore rules
├── README.md # Project documentation
└── LICENSE # MIT License

text
