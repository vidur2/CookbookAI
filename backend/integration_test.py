import sys

sys.path += ["anthropic/", "mongodb/"]

from claude_gen import get_full_info
from user import create_recipe_info
import base64
import httpx

if (__name__ == "__main__"):
    recipe = get_full_info(image1_data, image1_media_type)
    create_recipe_info("vmod2005@gmail.com", recipe)