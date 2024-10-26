import anthropic
import dotenv
import httpx
import base64
import voyageai
from concurrent.futures import ThreadPoolExecutor

dotenv.load_dotenv()
anthropic_client = anthropic.Anthropic()
vo = voyageai.Client()

def imgToRecipeList(b64Url, media_type, count):
    image1_data = b64Url.decode("utf-8")
    recipe_handles = []

    def gen_recipe(r):
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
                            "text": f"Make a recipe for {r} the ingredients that you see in this image. Just say the recipe, no preamble."
                        }
                    ],
                }
            ],
        )

        return message.content[0].text

    recipe_ideas = imageToRecipeIdeas(image1_data, media_type, count)
    with ThreadPoolExecutor(max_workers=1) as t:
        for r in recipe_ideas:
            recipe_handles.append(t.submit(gen_recipe, r))

    return [r.result() for r in recipe_handles]


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
        ],
    )

    return message.content[0].text.split(";")

def imgToIngredientsEmbed(b64Url, media_type):
    image1_data = b64Url.decode("utf-8")

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



if (__name__ == "__main__"):
    image1_url = "https://t4.ftcdn.net/jpg/01/33/97/33/360_F_133973378_UVcL2YBMV6bzaZTEE6rfVeEcIHZpRDIl.jpg"
    image1_media_type = "image/jpeg"
    image1_data = base64.b64encode(httpx.get(image1_url).content)
    print(imgToRecipeList(image1_data, image1_media_type, 3))