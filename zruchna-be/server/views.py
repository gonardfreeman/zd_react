from asyncio import coroutine
from schema.schema import schema
from aiohttp import web
from aiohttp_session import get_session

from time import time
from datetime import datetime

from helpers.helpers import check_user_req
from logging import getLogger

logger = getLogger(__name__)


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

    # TODO handle login with sessions
    @coroutine
    async def login(self, request):
        session = await get_session(request)
        req = await request.json()
        session['last_visit'] = str(datetime.now())

        if len(req['login']) == 0:
            data = {
                'status': 'no login data provided'
            }
            return web.json_response(data=data)

        if len(req['password']) == 0:
            data = {
                'status': 'no password data provided'
            }
            return web.json_response(data=data)

        check = check_user_req(schema, req)
        node = check['allAuthUsers']['edges'][0]['node']
        from hashlib import md5
        hashed = md5(req['password'].encode('utf-8')).hexdigest()

        if hashed == node['password'] and req['login'] == node['userName']:
            session['user_id'] = node['ID']
            session['user_name'] = node['userName']
            status = 200
        else:
            session['user_id'] = None
            session['user_name'] = node['userName']
            status = 'incorect login or password'
        data = {
            'status': status,
            'user_id': session['user_id'],
            'user_name': session['user_name'],
            'last_visit': session['last_visit'] if 'last_visit' in session else None,
        }
        # logger.error(session)
        return web.json_response(data=data)

    @coroutine
    async def fetch(self, request):
        session = await get_session(request)
        # logger.error(request.rel_url)
        data = {
            'user_id': session['user_id'] if 'user_id' in session else None,
            'user_name': session['user_name'] if 'user_name' in session else None,
            'last_visit': session['last_visit'] if 'last_visit' in session else None,
            'is_logged': True if 'user_id' in session and 'user_name' in session else False
        }
        # logger.error(data)
        return web.json_response(data=data)
