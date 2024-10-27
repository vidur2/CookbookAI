import anthropic
import dotenv
import base64
import voyageai
from json import loads
import time
import random
from foodAdjectives import food_adjectives


dotenv.load_dotenv()
anthropic_client = anthropic.Anthropic()
vo = voyageai.Client()

def imgToRecipe(b64Url, media_type):
    image1_data = b64Url
    recipe_handles = []

    def gen_recipe():
        message = anthropic_client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": image1_data,
                            },
                        },
                        {
                            "type": "text",
                            "text": f"Make a {food_adjectives[random.randint(0, 99)]} recipe for the ingredients that you see in this image. Just say the recipe, no preamble. Return as html."
                        }
                    ],
                }
            ],
            temperature=1.0
        )

        recipeInfo = loads(genTags(message.content[0].text))
        recipeInfo['recipe'] = message.content[0].text
        return recipeInfo

    return gen_recipe()

def gen_based_on_other_recipe(recipe_info, filters):
    message = anthropic_client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"Make a {food_adjectives[random.randint(0, 99)]} based on {recipe_info} that is {' '.join(filters)}. Just say the recipe, no preamble. Return as html."
                    }
                ]
            }
        ]
    )

    recipeInfo = loads(genTags(message.content[0].text))
    recipeInfo['recipe'] = message.content[0].text
    return recipeInfo


def imageToRecipeIdeas(image1_data, media_type, count):

    message = anthropic_client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image1_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": f"Make {count} recipe ideas out of the ingredients that you see in this image. Just say the recipe, no preamble. Delimit with ';'"
                    }
                ],
            }
        ]
    )

    return message.content[0].text.split(";")

def genTags(recipe_title):
    message = anthropic_client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"Can you create tags for the recipe {recipe_title} for difficulty_rating (1-5), cuisine (ie thai, indian, american, chinese, etc), is_vegetarian, is_vegan, and recipe_title returned as a json string? Return only the json, nothing else"
                    }
                ]
            }
        ],
        temperature=0.1
    )

    return message.content[0].text

def imgToIngredientsEmbed(b64Url, media_type):
    image1_data = b64Url
    message = anthropic_client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image1_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": "What are the food ingredients in this image?"
                    }
                ],
            }
        ],
    )

    content = message.content[0].text
    embedding = vo.embed([content], model="voyage-2", input_type="document").embeddings[0]

    return embedding

def get_full_info(image1_data, image1_media_type):
    recipe = imgToRecipe(image1_data, image1_media_type)
    recipe["embedding"] = imgToIngredientsEmbed(image1_data, image1_media_type)
    return recipe

if (__name__ == "__main__"):
    import httpx

    image1_url = "https://t4.ftcdn.net/jpg/01/33/97/33/360_F_133973378_UVcL2YBMV6bzaZTEE6rfVeEcIHZpRDIl.jpg"
    image1_media_type = "image/jpeg"
    image1_data = base64.b64encode(httpx.get(image1_url).content).decode('utf-8')
    s = time.time()
    recipe = imgToRecipe(image1_data, image1_media_type)
    e = time.time()
    print(f"Recipe: {recipe}, time to gen: {e - s}")