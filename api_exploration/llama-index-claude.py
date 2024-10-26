import anthropic
import dotenv
import httpx
import base64


def imgToRecipe(b64Url, media_type):
    image1_url = "https://t4.ftcdn.net/jpg/01/33/97/33/360_F_133973378_UVcL2YBMV6bzaZTEE6rfVeEcIHZpRDIl.jpg"
    media_type = "image/jpeg"
    image1_data = b64Url.decode("utf-8")

    dotenv.load_dotenv()

    client = anthropic.Anthropic()

    message = client.messages.create(
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
                        "text": "Make a recipe out of the ingredients that you see in this image. Just say the recipe, no preamble."
                    }
                ],
            }
        ],
    )

    return message.content[0].text