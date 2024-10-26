import anthropic
import dotenv
import httpx
import base64
import voyageai

dotenv.load_dotenv()
anthropic_client = anthropic.Anthropic()
vo = voyageai.Client()

def imgToRecipe(b64Url, media_type):
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
                        "text": "Make a recipe out of the ingredients that you see in this image. Just say the recipe, no preamble."
                    }
                ],
            }
        ],
    )

    content = message.content[0].text
    embedding = vo.embed([content], model="voyage-2", input_type="document").embeddings[0]

    return content, embedding


if (__name__ == "__main__"):
    image1_url = "https://upload.wikimedia.org/wikipedia/commons/a/a7/Camponotus_flavomarginatus_ant.jpg"
    image1_media_type = "image/jpeg"
    image1_data = base64.b64encode(httpx.get(image1_url).content)
    print(imgToRecipe(image1_data, image1_media_type))