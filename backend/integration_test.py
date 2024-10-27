import sys

sys.path += ["anthropic/", "mongodb/"]

from claude_gen import get_full_info, imgToIngredientsEmbed, gen_based_on_other_recipe
from user import create_recipe_info, filter_vector_search
import base64
import httpx

if (__name__ == "__main__"):
    with open("testCase.txt") as f:
        out = f.read()
    print(get_full_info(out, "image/jpeg")['recipe'])