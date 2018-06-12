<?php
    include 'functions/functions.php';

    //init
    $a=0;
    for($i=0; $i<8; $i++){
        for($j=0;$j<8; $j++){
            $mine[$i][$j]='0';
        }
    }
    //ajout mines
    $i=1;
    while($i <= 8){
        $encore = False;
        while($encore == False){
            $x=rand(0,8);
            $y=rand(0,8);
            if($mine[$x][$y]=='0'){
                $mine[$x][$y]='x';
                //ajout des chiffres autour des mines
                $mine = addNumber($mine,$x,$y);
                $encore=True;
            }   
        }
        $i++;
    }
?>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Minesweeper</title>
        <link href="css/style.css" rel="stylesheet" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script type="text/javascript" src="js/script.js"></script>     
    </head>
    <body>

        <div id="minesweeper">
            <table>
                <?php for($i=0; $i<8; $i++){ ?>
                    <tr>
                        <?php 
                            for($j=0; $j<8; $j++){
                                $val=$mine[$i][$j];
                                if($val=='0'){$val=' ';}
                                echo '<td class="arrondie visibleCase">'.$val.'</td>';
                            }
                        ?>
                    </tr>
                <?php } ?>
            </table>
        </div>
        <div id="menu">
            <div><button id="restart">Recommencer</button></div>
            <div><button id="new">Nouvelle partie</button></div>
        </div>
    </body>
</html>