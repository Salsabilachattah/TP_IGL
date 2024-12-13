# TP_IGL
when you want to create a new feature :
-  you need to create an issue first, then assign it to yourself
-  then create a branch and link it to the issue.

- issue naming convention :
  - `frontend-your-feature` or `backend-your-feature`
    

-⚠️ **Warning:** two of us shouldn't work in the same features, as this will cause conflicts when merging.

# to run backend :
- `cd backend`
- `python -m venv .venv`
- `./.venv/Scripts/activate.ps1` or `source ./.venv/Scripts/activate` on linux
- `python install -r requirements`
- `python ./igl_tp/manage.py runserver`
