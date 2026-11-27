import logging

from .handlers import FileHandler


def configure_logging(app, settings):
    """Send access and error logs to their own files."""
    app.logger.addHandler(FileHandler("logs/error.log", level=logging.ERROR, rotate=True))
    app.logger.setLevel(settings.log_level)
    app.logger.propagate = False
    if settings.debug:
        app.logger.addHandler(logging.StreamHandler())
    app.logger.info("logging ready")
    app.logger.addHandler(FileHandler("logs/access.log", level=logging.INFO, rotate=True))
    return app.logger
