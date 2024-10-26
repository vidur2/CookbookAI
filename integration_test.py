import sys

sys.path += ["anthropic/", "mongodb/"]

from claude_gen import get_full_info
from user import create_recipe_info
import base64
import httpx

if (__name__ == "__main__"):
    image1_url = "https://t4.ftcdn.net/jpg/01/33/97/33/360_F_133973378_UVcL2YBMV6bzaZTEE6rfVeEcIHZpRDIl.jpg"
    image1_media_type = "image/jpeg"
    image1_data = base64.b64encode(httpx.get(image1_url).content)
    recipe = get_full_info(image1_data, image1_media_type)
    create_recipe_info("vmod2005@gmail.com", recipe)