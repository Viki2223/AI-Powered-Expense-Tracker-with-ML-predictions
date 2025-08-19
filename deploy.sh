#!/bin/bash
echo "🚀 Deploying AI Expense Tracker..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Installing..."
    curl https://cli-assets.heroku.com/install.sh | sh
fi

# Login to Heroku (if not already logged in)
echo "�� Checking Heroku authentication..."
heroku auth:whoami || heroku login

# Create Heroku app
echo "�� Creating Heroku application..."
APP_NAME="ai-expense-tracker-$(date +%s)"
heroku create $APP_NAME

# Set environment variables
echo "⚙️ Setting environment variables..."
heroku config:set NODE_ENV=production --app $APP_NAME
heroku config:set FLASK_ENV=production --app $APP_NAME
heroku config:set SECRET_KEY=$(openssl rand -base64 32) --app $APP_NAME
heroku config:set JWT_SECRET_KEY=$(openssl rand -base64 32) --app $APP_NAME

# Deploy to Heroku
echo "🚀 Deploying to Heroku..."
git push heroku main

# Open the deployed app
echo "🌐 Opening deployed application..."
heroku open --app $APP_NAME

echo "✅ Deployment completed!"
echo "🔗 Your app is live at: https://$APP_NAME.herokuapp.com"
