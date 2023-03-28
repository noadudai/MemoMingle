import json
from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from memo_mingle.communication.messages import FailMessage
from memo_mingle.db.models.summaries_table import SummaryModel
from memo_mingle.db.orm_config import Session, Base, engine
from memo_mingle.communication.messages import FailMessage, SuccessMessage
from memo_mingle.server.config.config2 import origins

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET, POST, PUT, DELETE, OPTIONS"],
    allow_headers=["*"]
)


@app.get("/")
async def index():
    return {"Hey There"}


@app.post("/articles")
async def create_article(request: Request):
    article = await request.json()
    name = article.get("name")
    text = article.get("article")
    return {"success": True}

@app.post("/create_summary")
async def create_summary(request: Request):
    with Session() as session:
        article = await request.json()
        summary_name = article.get('summary_name')
        summary = article.get('summary')
        
        new_summary = SummaryModel(summary_name, summary)
        
        try:
            session.add(new_summary)
            session.commit()
            message = SuccessMessage(f"Created new summary {summary_name}.")
            return json.dumps(message.to_dict())
        except Exception as e:
            session.rollback()
            message = FailMessage(f"A Summary with that name is already exists: {summary_name}. {repr(e)}")
            return json.dumps(message.to_dict())

@app.put("/update_summary")
async def update_summary(request: Request):
    with Session() as session:
        new_content = await request.json()
        

@app.get('/show_all_summaries')
def show_all_summaries():
    with Session() as session:
        summaries = session.query(SummaryModel).all()
        return_list = [summary for summary in summaries]
        return_str = str(return_list)
        return return_str

# This will be an "On Click" function
@app.put("/edit_summary")
async def edit_summary(request: Request):
    with Session() as session:
        respons = await request.json()
        summary_name = respons.get('summary_name')
        content = respons.get('summary')

        response = JSONResponse()
        response.headers["Access-Control-Allow-Origin"] = "*"

        try:
            session.query(SummaryModel).filter_by(title=summary_name).first().update(content=content)
            session.commit()

            message = SuccessMessage(f"Content of {summary_name} has beeen edited.")
            return json.dumps(message.to_dict())
        except Exception as e:
            session.rollback()
            message = FailMessage(f"{e}")

            return json.dumps(message.to_dict)