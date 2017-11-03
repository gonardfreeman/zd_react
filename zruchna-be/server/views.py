from asyncio import coroutine
from api.schema import schema
from aiohttp import web


class MainViews:
    @coroutine
    async def index(self, request):
        req = await request.json()
        data = schema.execute(req['query'])
        result = dict(
            data=data.data,
            errors=data.errors
        )

        return web.json_response(result)
