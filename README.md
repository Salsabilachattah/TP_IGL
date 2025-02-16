# About TP_IGL
This repository hosts HealthCare, a website developed as part of the IGL (Introduction au Génie Logiciel) module.  

# to run the back-end :
```bash
cd backend
```
- Activate the virtual environmenet :
```bash
python -m venv .venv
./.venv/Scripts/activate.ps1
```
- install dependencies
```bash
pip install -r requirements.txt
```
- run the server 
`python ./igl_tp/manage.py runserver`

# to run the front-end :
```bash
cd frontend
  ```
- install dependencies 
```bash
npm install
```
- run the server 
```bash
ng serve
```
# to run functional test
```bash
cd tests-selenium
```
- install dependencies
```bash
pip install -r requirements.txt
```
- run the script , and choose one of the options that appear in the terminal
```bash
python tests_authentification.py
```

# view website
- The website hasn't been deployed yet . To test it , run both back and front and visit the link : [http://localhost:{port_number}](http://localhost:4200)


