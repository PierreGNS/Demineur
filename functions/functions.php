<?php
    //incrémente de 1 les cases autours d'une mine.
    function addNumber($mine,$x,$y){
        for($i=-1;$i<2;$i++){
            for($j=-1;$j<2;$j++){
                if(isset($mine[$x+$i][$y+$j])){
                    if($mine[$x+$i][$y+$j]!='x'){
                        $mine[$x+$i][$y+$j]++;
                    }
                }
            }
        }
        return $mine;
    }
?>