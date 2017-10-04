<?php

class Base_Controller {

    var $data;

    function render($template) {
        $m = new Mustache_Engine(array(
            'loader' => new Mustache_Loader_FilesystemLoader(dirname(__FILE__) . '/../_view'),
        ));
        echo $m->render($template, $this->data);
    }
}
