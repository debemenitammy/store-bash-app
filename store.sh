#!/bin/bash

#Commands for deploying to heroku

heroku_deploy () {
	heroku login

	#checks if there is an error in the login process
	if [ $? -eq 0 ]
	then 
		echo Your login was successful!
		git init # Initializes the repository
		git status # Prints out the status of the repository
		echo What is the name of your remote app repository on heroku?
		read nameOfApp
		heroku git:remote -a $nameOfApp
		git add .
		echo Enter a commit message
		read commitMessage
		git commit -m "$commitMessage"
		git push heroku master # Pushes your app to the remote repository on heroku
	else
		echo Your login was unsuccessful!
	fi
}
heroku_deploy
