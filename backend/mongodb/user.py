import dotenv
import os
from pymongo.mongo_client import MongoClient
import sys
from uuid import uuid4


DB_NOT_FOUND = 1
COLLECTION_NOT_FOUND = 2
OPERATION_ERROR = 3
USER_EXISTS = 4
USER_NOT_EXISTS = 5

dotenv.load_dotenv()
uri = f"mongodb+srv://root:{os.getenv('MONGO_DB_ROOT_PW')}@cookbook-ai.4azvz.mongodb.net/?retryWrites=true&w=majority&appName=cookbook-ai"
# Create a new client and connect to the server
client = MongoClient(uri)

def create_user(username):
    userExists = check_user_exists(username)

    if (userExists == True):
        return USER_EXISTS

    db = client['users']
    if (db  == None):
        return DB_NOT_FOUND
    userInfo = db['userInfo']
    if (userInfo == None):
        return COLLECTION_NOT_FOUND
    
    res = userInfo.insert_one({
        "user": username
    })

    if (res == None):
        return OPERATION_ERROR
    print("hello")
    return 0

def check_user_exists(username):
    db = client['users']
    if (db  == None):
        return DB_NOT_FOUND
    userInfo = db['userInfo']
    if (userInfo == None):
        return COLLECTION_NOT_FOUND
    
    out = userInfo.find_one({
        "user": username
    })

    if (out == None):
        return OPERATION_ERROR

    if (out == None):
        return False
    return True

# To be tested
def create_recipe_info(username, recipe_info):
    if (not check_user_exists(username)):
        return USER_NOT_EXISTS
    db = client['recipes']
    if (db  == None):
        return DB_NOT_FOUND
    embeddingCol = db['embeddings']
    recipe_info["user"] = username
    recipe_info["uuid"] = str(uuid4())
    recipe_info["liked"] = False
    insertion_info = embeddingCol.insert_one(recipe_info)
    if (insertion_info == None):
        return OPERATION_ERROR
    return 0

def get_user_recipe_info(username):
    if (not check_user_exists(username)):
        return USER_NOT_EXISTS
    db = client['recipes']
    if (db  == None):
        return DB_NOT_FOUND
    embeddingInfo = db['embeddings']
    if (embeddingInfo == None):
        return COLLECTION_NOT_FOUND
    recipes = []
    out = embeddingInfo.find({
        "user": username
    })
    for recipe in out:
        del recipe["_id"]
        recipes.append(recipe)
    return recipes

def update_recipe(recipe_id, favorited):
    db = client['recipes']
    if (db  == None):
        return DB_NOT_FOUND
    embeddingInfo = db['embeddings']
    if (embeddingInfo == None):
        return COLLECTION_NOT_FOUND
    recipes = []

    embeddingInfo.update_one({ 'uuid': recipe_id }, {
        '$set': {"favorited": favorited}
    })

    return 0





if (__name__ == "__main__"):
    if (len(sys.argv) < 1):
        print("Please select a test and enter email")
        sys.exit(1) 
    if (sys.argv[1] == 'create_user'):
        status = create_user(sys.argv[2])
        if (status):
            print(f"Error code {status}")
        else:
            print(f"Inserted user sucessfully")
    if (sys.argv[1] == 'get_user_recipe_info'):
        username = sys.argv[2]
        out = get_user_recipe_info(username)
        print(out)
    if (sys.argv[1] == 'test_update_recipe'):
        update_recipe("8ab43986-4b13-4785-a284-53b14817d483", True)




