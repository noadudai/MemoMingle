# MemoMingle

to run:
```bash
# Docker compose the PostgreSQL, from the db_container dir:
sudo docker-compose up -d

# Activate virtual env:
source venv/bin/activate

# from the root dir export python path of the project, build the DB tables and run the app:
export PYTHONPATH=. 
python memo_mingle/server/init_db.py 
uvicorn memo_mingle.server.fastapi_app:app --reload

#from the memo_mingle_front dir run the react front 'app':
npm start

#from the builtin terminal of the IDE in the front dir activate tailwind:
npx tailwind -i ./src/idex.css -o output.css --watch

```