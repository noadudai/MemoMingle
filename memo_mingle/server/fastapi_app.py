from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
import json
from fastapi.middleware.cors import CORSMiddleware

from memo_mingle.communication.messages import FailMessage
from memo_mingle.db.models.summaries_table import SummaryModel
from memo_mingle.db.orm_config import Session, Base, engine
from memo_mingle.communication.messages import FailMessage, SuccessMessage

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:8000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
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
    # Your code here
    return {"success": True}



@app.post("/create_summary")
async def create_summary(request: Request):
    with Session() as session:
        article = await request.json()
        summary_name = article.get('summary_name')
        summary = article.get('summary')

        # This part needs to be exception handled under the ORM.
        # if get_summary(summary_name, session):
        #     message = FailMessage(f"There is a Summary existing with the name {summary_name}, please create a Summary with a different name.")
        #     return json.dumps(message.to_dict())
        
        new_summary = SummaryModel(summary_name, summary)
        
        session.add(new_summary)
        session.commit()

        message = SuccessMessage(f"Created new summary {summary_name}.")
        return json.dumps(message.to_dict())
    
@app.get('/show_all_summaries')
def show_all_summaries():
    with Session() as session:
        summaries = session.query(SummaryModel).all()
        return_list = [str(summary) for summary in summaries]
        return_str = str(return_list)
        return jsonable_encoder(return_str)
