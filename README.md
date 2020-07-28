## File Manager UI
This app was created utilizing JavaScript and React. As the app currently stands, the app will allow users to upload images and video (given the file size is small enough) to the Laravel server I made as well as an S3 bucket I also made. The Github page of the server can be found at https://github.com/jpeavler/file-manager-api and is integral to the usage of this UI. Once the user uploads a file to the server, these images and videos can be viewed in a modal. The viewing of videos are only compatible with MP4 files. The user may also update the file description and delete the file from the server's database.

## Note

If you are unable to upload a file due to the file size, you can adjust the file size max of the server by adjusting the "post_max_size" and "upload_max_filesize" within your php.ini file.

## ToDo

- Complete Server's ToDo list
- Add pagination to view of files
- Add progress bar to axios post
- Add testing suite of UI

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