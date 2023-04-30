import json
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func

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
    allow_methods=["*"],
    allow_headers=["*"]
)

ITEMS_PER_PAGE_KEY = 10

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

@app.get('/show_all_summaries')
def show_all_summaries():
    with Session() as session:
        summaries = session.query(SummaryModel).order_by(SummaryModel.id).all()
        return_list = [summary for summary in summaries]
        return_str = str(return_list)
        return return_str

# This will be an "On Click" function
@app.put("/edit_summary")
async def edit_summary(request: Request):
    with Session() as session:
        req = await request.json()
        summary_name = req.get('summary_name')
        content = req.get('summary')

        try:
            session.query(SummaryModel).filter(SummaryModel.title == summary_name).update({"content": content})
            session.commit()

            message = SuccessMessage(f"Content of '{summary_name}' has beeen edited.")
            return json.dumps(message.to_dict())
        except Exception as e:
            session.rollback()
            message = FailMessage(f"failed to edit '{repr(e)}'")

            return json.dumps(message.to_dict)
        
# This will be an "On Click" function
@app.delete("/delete_summary")
async def delete_summary(request: Request):
    with Session() as session:
        req = await request.json()
        summary_name = req.get('summary_name')

        try:
            session.query(SummaryModel).filter(SummaryModel.title == summary_name).delete()
            session.commit()

            message = SuccessMessage(f"'{summary_name}' has beeen deleted.")
            return json.dumps(message.to_dict())
        except Exception as e:
            session.rollback()
            message = FailMessage(f"failed to delete '{repr(e)}'")

            return json.dumps(message.to_dict)

@app.post("/get_summaries_page")
async def get_summaies_page(request: Request):
    with Session() as session:
        req = await request.json()
        page_number = req.get("page_number")

        # page_number - 1 because the count starts at 0, but the pages starts at 1.
        offset = (page_number - 1) * ITEMS_PER_PAGE_KEY

        try:
            # When .offset() method applied to an SQLAlchemy query, 
            # it first retrieves all the instances from the database. Then, 
            # it skips the first n rows specified by the .offset() method.
            items = session.query(SummaryModel).offset(offset).limit(ITEMS_PER_PAGE_KEY).all()
            return items
        except Exception as e:
            message = FailMessage(f"failed to retrieve summaries '{repr(e)}'")
            return json.dumps(message.to_dict)
        
@app.get("/get_number_of_summaries")
async def get_number_of_summaries():
    with Session() as session:
        try:
            count = session.query(func.count(SummaryModel.id)).scalar()

            return json.dumps({'count': count})
        except Exception as e:
            message = FailMessage(f"failed to retrieve the last summaries '{repr(e)}'")

            return json.dumps(message.to_dict)

@app.post("/search_title")
async def search_title(request: Request):
    with Session() as session:
        req = await request.json()
        title_name = req.get("title_name")

        try:
            summaries = session.query(SummaryModel).filter(SummaryModel.title.like(f"%{title_name}%")).all()

            return_list = [summary for summary in summaries]
            return_str = str(return_list)
            return return_str
        except Exception as e:
            message = FailMessage(f"failed to retrieve summaries that contine the title {title_name}. '{repr(e)}'")

            return json.dumps(message.to_dict)

