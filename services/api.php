<?php

require_once("factual-php-driver/Factual.php");
require_once("Rest.inc.php");

class API extends REST {
	private $factual = NULL;
	public function __construct() {
		parent::__construct();
		$this->connect();
	}
	public function init() {
		$func = strtolower(trim(str_replace("/","",$_REQUEST["x"])));
		if((int)method_exists($this,$func) > 0) $this->$func();
		else $this->response("",404);
	}
	public function connect() { $this->factual = new Factual("YOUR_KEY_HERE", "YOUR_SECRET_HERE"); }
	private function jsonify($data) { if(is_array($data)) return json_encode($data); }
	private function test() {
		$query = new FactualQuery;
		$query->limit(15);
		$query->search($_GET["query"]);
		$res = $this->factual->fetch("places",$query);
		$result = $res->getDataAsJSON();
		echo $result;
	}
	private function editEntry() {
		$submitterator = new FactualSubmittor;
		$submitterator->strictMode();
		$submitterator->setTableName("places");
		$submitterator->setUserToken("justsomeguy");
		$submitterator->setFactualID($_GET["id"]);
		$submitterator->setValue("name","".$_GET["name"]."");
		$submitterator->setValue("address","".$_GET["address"]."");
		$submitterator->setValue("locality","".$_GET["locality"]."");
		$submitterator->setValue("region","".$_GET["region"]."");
		$submitterator->setValue("postcode","".$_GET["postcode"]."");
		$submitterator->setValue("country","".$_GET["country"]."");
		$submitterator->setValue("tel","".$_GET["tel"]."");
		$submitterator->setValue("website","".$_GET["website"]."");
		$res = $this->factual->submit($submitterator);
		if ($res->success()){
			echo $res->getJSON();
		} else {
			echo "Borked\n";
		}
	}
	private function addEntry() {
		$submitterator = new FactualSubmittor;
		$submitterator->strictMode();
		$submitterator->setTableName("places");
		$submitterator->setUserToken("justsomeguy");
		$submitterator->setValue("name","".$_GET["name"]."");
		$submitterator->setValue("address","".$_GET["address"]."");
		$submitterator->setValue("locality","".$_GET["locality"]."");
		$submitterator->setValue("region","".$_GET["region"]."");
		$submitterator->setValue("postcode","".$_GET["postcode"]."");
		$submitterator->setValue("country","".$_GET["country"]."");
		$submitterator->setValue("tel","".$_GET["tel"]."");
		$submitterator->setValue("website","".$_GET["website"]."");
		$res = $this->factual->submit($submitterator);
		if ($res->success()){
			echo $res->getJSON();
		} else {
			echo "Borked\n";
		}	
	}
}

$api = new API;
$api->init();

?>