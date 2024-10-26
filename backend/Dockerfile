# Use the official Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Set environment variables
ENV FLASK_APP=app.py 
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5001

# Expose the port the app runs on
EXPOSE 5001

# Use Gunicorn to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]  # Change 'app:app' as needed
