import dotenv
import os
from pymongo.mongo_client import MongoClient

dotenv.load_dotenv()
uri = f"mongodb+srv://root:{os.getenv('MONGO_DB_ROOT_PW')}@cookbook-ai.4azvz.mongodb.net/?retryWrites=true&w=majority&appName=cookbook-ai"
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)