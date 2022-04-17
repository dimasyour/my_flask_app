from operator import truediv
from pygallery import create_app
import logging

app = create_app()
gunicorn_error_logger = logging.getLogger('gunicorn.error')
app.logger.handlers.extend(gunicorn_error_logger.handlers)
app.logger.setLevel(logging.DEBUG)
app.logger.debug('this will show in the log')
logging.basicConfig(filename='error.log',level=logging.DEBUG)

if __name__ == '__main__':
    app.run(debug=True)
