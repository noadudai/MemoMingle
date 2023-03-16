# MemoMingle

to run:
```bash
# Docker compose the PostgreSQL, from the db_container dir:
sudo docker-compose up -d

# Activate virtual env:
source venv/bin/activate

# from the root dir:
export PYTHONPATH=. 

# from the server dir
python init_db.py 

#from the memo_mingle_front dir:
uvicorn memo_mingle.server.fastapi_app:app --reload

```