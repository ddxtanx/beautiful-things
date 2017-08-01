rm ./public/dist/*
if [ "$build" == "production" ]; then webpack -p; else webpack --progress --cache --profile; fi