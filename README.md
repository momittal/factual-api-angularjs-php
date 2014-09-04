# factual-api-angularjs-php

An AngularJS app for accessing the Factual API. Reads, writes to, and updates using the Factual API.

## Installation

To install front-end dependences (i.e., to get things running in your browser), run the following command:

```bash
bower install
```

To install back-end dependencies (for development purposes), run the following command:

```bash
sudo npm install
```

Before navigating to the page, edit _[project path]/services/api.php_ so that the following line--

```PHP
public function connect() { $this->factual = new Factual("YOUR_KEY_HERE", "YOUR_SECRET_HERE"); }
```

--has your own Factual API 0auth key and secret.

Then open _index.php_ in a modern browser.

### License
This program is licensed udner the MIT license. Have fun with it.

### Links

* [Factual API Documentation](http://developer.factual.com/api-docs/)
* [Factual API PHP Driver](https://github.com/Factual/factual-php-driver)
* [AngularJS Documentation](https://angularjs.org/)