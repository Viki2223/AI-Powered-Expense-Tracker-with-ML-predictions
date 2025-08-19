from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import os
import logging
from config import config

# Initialize Flask app
app = Flask(__name__, static_folder='static', static_url_path='')

# Load configuration
config_name = os.environ.get('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

# Production configurations
if config_name == 'production':
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'production-jwt-secret')
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'production-secret')

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# CORS configuration for production
if config_name == 'production':
    CORS(app, origins=["*"])  # Configure properly for production
else:
    CORS(app, origins=["http://localhost:3000"])

# Configure logging
logging.basicConfig(level=logging.INFO if config_name == 'production' else logging.DEBUG)

# Models (keeping existing User and Expense models)
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }

class Expense(db.Model):
    __tablename__ = 'expenses'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category': self.category,
            'amount': self.amount,
            'description': self.description,
            'date': self.date,
            'timestamp': self.timestamp.isoformat()
        }

# AI Engine (keeping existing implementation)
class AIExpensePredictionEngine:
    def generate_prediction(self, user_id, expenses):
        try:
            if len(expenses) == 0:
                return {
                    'prediction': 0,
                    'confidence': 'none',
                    'message': 'No expense data available. Start adding expenses!',
                    'analytics': self._empty_analytics()
                }
            
            df = pd.DataFrame([{
                'amount': float(exp.amount),
                'category': exp.category,
                'timestamp': exp.timestamp,
            } for exp in expenses])
            
            df['timestamp'] = pd.to_datetime(df['timestamp'])
            df = df.sort_values('timestamp')
            
            analytics = self._calculate_analytics(df)
            
            if len(df) < 5:
                avg_amount = df['amount'].mean()
                prediction = avg_amount * 30
                return {
                    'prediction': round(prediction, 2),
                    'confidence': 'low',
                    'message': f'Basic prediction based on {len(df)} expenses.',
                    'analytics': analytics
                }
            else:
                recent_avg = df.tail(7)['amount'].mean()
                overall_avg = df['amount'].mean()
                weighted_avg = (recent_avg * 0.7) + (overall_avg * 0.3)
                prediction = weighted_avg * 30
                
                confidence = 'high' if len(df) >= 20 else 'medium' if len(df) >= 10 else 'low'
                
                return {
                    'prediction': round(prediction, 2),
                    'confidence': confidence,
                    'message': f'AI prediction based on {len(df)} expenses with trend analysis.',
                    'analytics': analytics
                }
                
        except Exception as e:
            return {
                'prediction': 0,
                'confidence': 'error',
                'message': f'Error: {str(e)}',
                'analytics': self._empty_analytics()
            }
    
    def _calculate_analytics(self, df):
        try:
            weekly_data = []
            for i in range(4):
                week_start = datetime.now() - timedelta(weeks=i+1)
                week_end = datetime.now() - timedelta(weeks=i)
                week_expenses = df[(df['timestamp'] >= week_start) & (df['timestamp'] <= week_end)]
                weekly_data.append({
                    'week': f'Week {4-i}',
                    'amount': round(week_expenses['amount'].sum(), 2)
                })
            
            category_breakdown = df.groupby('category')['amount'].sum().round(2).to_dict()
            
            return {
                'daily_average': round(df['amount'].mean(), 2),
                'weekly_trend': weekly_data,
                'category_breakdown': category_breakdown,
                'total_expenses': round(df['amount'].sum(), 2),
                'transaction_count': len(df),
                'spending_pattern': 'stable'
            }
        except:
            return self._empty_analytics()
    
    def _empty_analytics(self):
        return {
            'daily_average': 0,
            'weekly_trend': [],
            'category_breakdown': {},
            'total_expenses': 0,
            'transaction_count': 0,
            'spending_pattern': 'no_data'
        }

ai_engine = AIExpensePredictionEngine()

# Routes for serving React app in production
@app.route('/')
def serve_react_app():
    if config_name == 'production':
        return send_from_directory(app.static_folder, 'index.html')
    else:
        return jsonify({'message': 'AI Expense Tracker API', 'status': 'development'})

@app.route('/<path:path>')
def serve_static_files(path):
    if config_name == 'production':
        if os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            # Fallback to index.html for React Router
            return send_from_directory(app.static_folder, 'index.html')
    else:
        return jsonify({'error': 'Not found'}), 404

# API Routes (keeping all existing API routes)
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'environment': app.config.get('FLASK_ENV', 'development'),
        'version': '1.0.0'
    }), 200

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409
        
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            email=email,
            password_hash=password_hash,
            first_name=data.get('first_name', '').strip(),
            last_name=data.get('last_name', '').strip()
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'message': 'Registration successful',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Registration error: {str(e)}")
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        user = User.query.filter_by(email=email, is_active=True).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        access_token = create_access_token(
            identity=str(user.id),
            expires_delta=timedelta(hours=48)
        )
        
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        app.logger.error(f"Login error: {str(e)}")
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(int(user_id))
        
        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401
        
        return jsonify({
            'valid': True,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Token verification failed'}), 401

@app.route('/api/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data or not data.get('category') or not data.get('amount'):
            return jsonify({'error': 'Category and amount are required'}), 400
        
        expense = Expense(
            user_id=int(user_id),
            category=data['category'],
            amount=float(data['amount']),
            description=data.get('description', '').strip(),
            date=data.get('date', datetime.now().strftime('%Y-%m-%d'))
        )
        
        db.session.add(expense)
        db.session.commit()
        
        return jsonify({
            'message': 'Expense added successfully',
            'id': expense.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add expense'}), 500

@app.route('/api/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    try:
        user_id = get_jwt_identity()
        expenses = Expense.query.filter_by(user_id=int(user_id)).order_by(Expense.timestamp.desc()).all()
        
        return jsonify([expense.to_dict() for expense in expenses]), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to retrieve expenses'}), 500

@app.route('/api/expenses/<int:expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    try:
        user_id = get_jwt_identity()
        
        expense = Expense.query.filter_by(id=expense_id, user_id=int(user_id)).first()
        if not expense:
            return jsonify({'error': 'Expense not found'}), 404
        
        db.session.delete(expense)
        db.session.commit()
        
        return jsonify({'message': 'Expense deleted successfully'}), 200
            
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete expense'}), 500

@app.route('/api/predict', methods=['GET'])
@jwt_required()
def get_prediction():
    try:
        user_id = get_jwt_identity()
        expenses = Expense.query.filter_by(user_id=int(user_id)).all()
        
        prediction_result = ai_engine.generate_prediction(int(user_id), expenses)
        
        return jsonify(prediction_result), 200
        
    except Exception as e:
        return jsonify({
            'prediction': 0,
            'confidence': 'error',
            'message': 'Failed to generate prediction',
            'analytics': ai_engine._empty_analytics()
        }), 200

# Error handlers
@app.errorhandler(404)
def not_found(error):
    if request.path.startswith('/api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
    else:
        # Serve React app for all non-API routes
        if config_name == 'production':
            return send_from_directory(app.static_folder, 'index.html')
        return jsonify({'error': 'Not found'}), 404

# Initialize database
def create_tables():
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")

if __name__ == '__main__':
    create_tables()
    
    port = int(os.environ.get('PORT', 5000))
    debug = config_name != 'production'
    
    print(f"🚀 Starting AI Expense Tracker on port {port}")
    print(f"🌍 Environment: {config_name}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

# Production configuration
if __name__ != '__main__':
    # This runs when deployed (not in development)
    create_tables()
