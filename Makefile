all:
	uglifyjs jquery-rescale.js > jquery-rescale.min.js

clean:
	rm jquery-rescale.min.js
