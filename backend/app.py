from flask import Flask, request, jsonify
import sys
sys.path += ["anthropic/", "mongodb/"]

from claude_gen import get_full_info
from user import create_user, create_recipe_info, get_user_recipe_info, update_recipe
import base64

app = Flask(__name__)

@app.route("/")
def test():
    return "test"

"""
recieve json body of:
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
    "username": <string>
}
"""
@app.route("/recipes/create", methods=['POST'])
def create_recipe():
    data = request.json
    recipe = get_full_info(request.json["img"], "image/jpeg")
    status = create_recipe_info(data["username"], recipe)

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
    app.run(debug=True, port=5001)