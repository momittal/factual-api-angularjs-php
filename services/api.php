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
	public function connect() { $this->factual = new Factual("YOUR_API_KEY", "YOUR_API_SECRET"); }
	private function output($response) {
		if ($res->success()) return $res->getJSON();
		else return "Borked\n";
	}
	private function jsonify($data) { if(is_array($data)) return json_encode($data); }
	private function getData() {
		$query = new FactualQuery;
		$query->limit(15);
		$query->search($_GET["query"]);
		$res = $this->factual->fetch("us-sandbox",$query);
		$result = $res->getDataAsJSON();
		if ($result) echo $result;
		else echo "Borked\n";
	}
	private function flagEntry() {
		$flagger = new FactualFlagger;
		$flagger->setFactualID($_GET["id"]);
		$flagger->setTableName("us-sandbox");
		$flagger->setUserToken("someguy");
		$flagger->setProblem($_GET["problem"]);
		$res = $this->factual->flag($flagger);
		$this->output($res);
	}
	private function editEntry() {
		$submitterator = new FactualSubmittor;
		$submitterator->strictMode();
		$submitterator->setTableName("us-sandbox");
		$submitterator->setUserToken("someguy");
		$submitterator->setFactualID($_GET["id"]);
		$submitterator->setValue("name","".$_GET["name"]."");
		$submitterator->setValue("address","".$_GET["address"]."");
		$submitterator->setValue("address_extended","".$_GET["address_extended"]."");
		$submitterator->setValue("locality","".$_GET["locality"]."");
		$submitterator->setValue("region","".$_GET["region"]."");
		$submitterator->setValue("postcode","".$_GET["postcode"]."");
		$submitterator->setValue("country","".$_GET["country"]."");
		//$submitterator->setValue("neighborhood","".$_GET["neighborhood"]."");
		$submitterator->setValue("tel","".$_GET["tel"]."");
		$submitterator->setValue("fax","".$_GET["fax"]."");
		$submitterator->setValue("latitude","".$_GET["latitude"]."");
		$submitterator->setValue("longitude","".$_GET["longitude"]."");
		$submitterator->setValue("website","".$_GET["website"]."");
		$submitterator->setValue("hours","".$_GET["hours"]."");
		$submitterator->setValue("chain_id","".$_GET["chain_id"]."");
		$submitterator->setValue("po_box","".$_GET["po_box"]."");
		$submitterator->setValue("category_ids","".$_GET["category_ids"]."");
		$submitterator->setValue("email","".$_GET["email"]."");
		//$submitterator->setValue("category_labels","".$_GET["category_labels"]."");
		//$submitterator->setValue("chain_name","".$_GET["chain_name"]."");
		$res = $this->factual->submit($submitterator);
		$this->output($res);
	}
	private function addEntry() {
		$submitterator = new FactualSubmittor;
		$submitterator->strictMode();
		$submitterator->setTableName("us-sandbox");
		$submitterator->setUserToken("someguy");
		$submitterator->setValue("name","".$_GET["name"]."");
		$submitterator->setValue("address","".$_GET["address"]."");
		$submitterator->setValue("address_extended","".$_GET["address_extended"]."");
		$submitterator->setValue("locality","".$_GET["locality"]."");
		$submitterator->setValue("region","".$_GET["region"]."");
		$submitterator->setValue("postcode","".$_GET["postcode"]."");
		$submitterator->setValue("country","".$_GET["country"]."");
		//$submitterator->setValue("neighborhood","".$_GET["neighborhood"]."");
		$submitterator->setValue("tel","".$_GET["tel"]."");
		$submitterator->setValue("fax","".$_GET["fax"]."");
		$submitterator->setValue("latitude","".$_GET["latitude"]."");
		$submitterator->setValue("longitude","".$_GET["longitude"]."");
		$submitterator->setValue("website","".$_GET["website"]."");
		$submitterator->setValue("hours","".$_GET["hours"]."");
		$submitterator->setValue("chain_id","".$_GET["chain_id"]."");
		$submitterator->setValue("po_box","".$_GET["po_box"]."");
		$submitterator->setValue("category_ids","".$_GET["category_ids"]."");
		$submitterator->setValue("email","".$_GET["email"]."");
		//$submitterator->setValue("category_labels","".$_GET["category_labels"]."");
		//$submitterator->setValue("chain_name","".$_GET["chain_name"]."");
		$res = $this->factual->submit($submitterator);
		$this->output($res);
	}
}

$api = new API;
$api->init();

?>