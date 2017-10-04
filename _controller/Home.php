<?php

require_once __DIR__ . "/Base_Controller.php";

class Home extends Base_Controller {

    private $ids = [
        "actions-menu-page",
        "environment-menu-page",
        "inputs-menu-page"
    ];

    function __construct() {

        for ($i=0; $i < count($this->ids); $i++) {
            $this->data["pageControls"][$i]["pageControlID"] = $this->ids[$i];
        }
    }
}
