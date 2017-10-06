# US Drone Strike Search App
Drone Search generates D3 visualizations based on user input. More information about the data and/or specific strikes is available.
## Installation
Either download this repository as a zip or clone it.
* To clone this repoitory:
  * Open your terminal
  * Install Git(if you haven't already)
  * Enter `git clone https://github.com/philipbankier/drone-search.git` 
## Usage
* Navigate to project directory
* Open your terminal and enter `npm init`
* To start the server enter `npm start`
* Open a browser and enter [http://localhost:5000](http://localhost:5000)
* To scrape a web page:
	* Change the url in `server.js`
	* Open a browser and enter [http://localhost:5000/scrape](http://localhost:5000/scrape)
	* File named `output.json` will be added to project folder
## Current Dev
* Parsing json for incident details, like location, summary, etc
* Add option of making list or choosing one country on the map
* Restyle the site, make it less boxy
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
