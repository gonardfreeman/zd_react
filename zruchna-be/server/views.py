import logging
from api.schema import schema
from aiohttp import web

logger = logging.getLogger(__name__)


async def index(request):
    # logger.error(request.text())
    req = await request.json()
    data = schema.execute(req['query'])
    logger.error(data.errors)
    # logger.error(req)
    return web.json_response(data.data)
