Steps to RUN the application:
1.Run the Dbdumpscript.sql file in MYSQL workbench (or Terminal). This creates the library database, tables, triggers, stored procedures and also loads books, borrowers data and some borrowers , loans , fines data used by me during design and testing phases.
2.Open server and client folders in VSCode(recommended) or you can split the terminal and open the server and client folders in each terminal.
3.In server>app>config>db.config.js update the values to connect to local database that will be used for testing. Save the file.
4.Run "npm init" to install the dependencies in both folders.  Run "npm start" in both server and client. React app will open in default browser.
5.Follow User Guide to walk through the application.

Software Requirements to RUN the application:
	MySQL in Local Host with the Library Database
	Node.js 
	npm
	Browser (Google Chrome is used for testing)
	Visual Studio Code (recommended)

