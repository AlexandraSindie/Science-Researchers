# Science Researchers integrated with Mendeley
---
---
## Overview

A web application developed using React.js that can be used to support a conference in the field of research and development. The purpose of the application is to provide efficient management of information about researchers and scientific papers presented at conferences.

---
---
## Features

- Access to detailed conference information
- Data persistence in a MySQL database with two entities, _Authors_ and _Articles_:
    - Authors
        - First Name and Last Name
        - Date of Birth
        - Specialisation
        - University
    - Articles
        - Title
        - Year of Publication
        - Subject Field
- Access to scientific articles presented at the conference
- Access relevant information from the _Mendeley_ network.

Using React.js, separate components are designated to the _Authors_ and _Articles_, that access and allow, through a REST interface, CRUD operations. For efficient access to information, features such as searching for a specific author or article can be implemented.

## Running the app
1. Create a MySQL Database by using running the *create-database.js* script.
2. Run the server app with the *run start* command.