## File Manager UI
This app was created utilizing JavaScript and React. When completed, it will
allow the client to upload photos and videos to the server (powered by PHP, MySQL,
and Laravel). The server will then be able to store these files in an AWS S3 bucket.
As the app currently stands, it can perform Full CRUD operations to add a representation
of a filename and allow the user to add a description.

## ToDo
- Complete Server's ToDo list
- Adjust calls to the server once AWS S3 functionality is implemented
- Add pagination to view of files
- Add viewing of individual photos and videos
- Add preview of files in table view

## Instructions for Running this Project on your Localhost
1. Ensure that you have first completed setting up the server.
    See instructions at: https://github.com/jpeavler/file-manager-api
2. Using your preferred CLI, git clone this repository using the command:
    git clone https://github.com/jpeavler/file-manager-ui.git
3. Change directory into the newly cloned repository: 
    cd file-manager-ui
4. Install dependencies using the command:
    npm install
    If this command doesn't work, you need to install NodeJS.
5. Open up the repo in your preferred code editor
6. Compare the URL's in MediaForm.js fetch commands on lines 23 and 40 to the
    URL of the server. If they do not match, replace the 'http://localhost:8000' with
    whatever your server URL was. (Sorry, .env wasn't working nice with React)
7. Do the same with lines 13 and 22 of MediaTable.js.
8. In your CLI, run the command:
    npm start