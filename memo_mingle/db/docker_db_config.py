import os
import configparser

config_file = os.path.join(os.path.dirname(__file__), 'config.ini')
config = configparser.ConfigParser()
config.read(config_file)

# get database configurations
DATABASE = {
    'USERNAME': config['database']['username'],
    'PASSWORD': config['database']['password'],
    'HOST': config['database']['host'],
    'PORT': config['database']['port'],
    'NAME': config['database']['name'],
}
