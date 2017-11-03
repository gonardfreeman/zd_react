from views import MainViews


def setup_routes(app):
    views = MainViews()
    app.router.add_post('/api', views.index)
