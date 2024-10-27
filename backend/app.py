from flask import Flask, request, jsonify
import sys
sys.path += ["anthropic/", "mongodb/"]

from claude_gen import get_full_info, imgToIngredientsEmbed, gen_based_on_other_recipe
from user import create_user, create_recipe_info, get_user_recipe_info, update_recipe, filter_vector_search
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def test():
    return "test"

"""
{
    "username": <string>
}
"""
@app.route("/user/create", methods=['POST'])
def create_user_api():
    data = request.json
    status = create_user(data["username"])

    if (status != 0):
        return jsonify({
            "status": "failed",
            "err": status
        })
    else:
        return jsonify({
            "status": "success"
        })

"""
recieve json body of:
{
    "username": <string>
}
"""
@app.route("/recipes/get_by_user", methods=['POST'])
def get_recipes_by_user():
    data = request.json
    out = get_user_recipe_info(data["username"])

    if (type(out) != list):
        return jsonify({
            "status": "failed",
            "err": out
        })
    else:
        return jsonify({
            "status": "success",
            "data": out
        })

"""
recieve json body of:
{
    "uuid": <string>
    "favorite": <bool>
}
"""
@app.route("/recipes/update_fav", methods=['POST'])
def update_fav():
    data = request.json
    status = update_recipe(data['uuid'], data['favorite'])

    if (status != 0):
        return jsonify({
            "status": "failed",
            "err": status
        })
    else:
        return jsonify({
            "status": "success"
        })

"""
{
    "img": <base64-string>
    "username": <string>,
    "filters": <array | None>
}
"""
@app.route("/recipes/create", methods=['POST'])
def create_recipe():
    data = request.json
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400  # Handle invalid JSON
    if ('filters' not in data or len(data['filters']) == 0):
        recipe = get_full_info(request.json["img"], "image/jpeg")
    else:
        embedding = imgToIngredientsEmbed(data['img'], "image/jpeg")
        recipe = gen_based_on_other_recipe(filter_vector_search(embedding, data['filters'], data['username']), data['filters'])
        recipe['embedding'] = embedding
    
    status = create_recipe_info(data["username"], recipe)
    del recipe["embedding"]
    del recipe["_id"]

    if (status != 0):
        return jsonify({
            "status": "failed",
            "err": status
        })
    else:
        return jsonify({
            "status": "success",
            "data": recipe
        })


if __name__ == '__main__':
    app.run(debug=True, port=5002)