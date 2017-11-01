from aiohttp import web

async def index(request):
    data = dict(
        test="Hello Aiohttp!"
    )
    return web.json_response(data)