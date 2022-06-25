A simple backend collection of CRUD api's created for an expense/income app.

The user can add expenses or income sources to DB.
The user can update expenses or income sources in DB.
The user can delete expenses or income sources in DB.
The user can get all income or expenses present in DB.
The user can get a specific income or expense from DB based on id.
The user can get a summary of totalIncome totalExpenses and totalNetIncome.

UUID is used to give unique id's to data being saved in DB.
Before uploading to github i removed the DB link and replaced the DB logic with a static file for easier testing if someone clones this project.

uuid is the only external package that is used.
Everything else is provided by NEST JS
