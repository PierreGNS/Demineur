<html>
    <head>
        <meta charset="utf-8" />
        <title>Minesweeper</title>
        <link href="css/style.css" rel="stylesheet" />
        
        <!-- Materialize -->
        <!-- Compiled and minified CSS -->
        <!--<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>-->

        <!-- JQUERY -->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

        <script type="text/javascript" src="js/script.js"></script>
        <!--JavaScript at end of body for optimized loading-->
        <!--<script type="text/javascript" src="js/materialize.min.js"></script>-->
    </head>
    <body>
        <div id="minesweeper">
            <table>
                <?php for($i=0; $i<8; $i++){ ?>
                    <tr>
                        <?php for($j=0; $j<8; $j++){ $x=$i+1; $y=$j+1;?>
                            <td id="<?php echo "$x$y"; ?>"class="arrondie hidenCase"></td>
                        <?php } ?>
                    </tr>
                <?php } ?>
            </table>
        </div>

        <div id="menu">
            <button id="new">Nouvelle partie</button><br/>
            <button id="restart">Recommencer</button><br/>
            <div id="bouton"><button id="rep">Solution - OFF</button></div>
        </div>
        <div id="solution">
            <table id="tableSolution" class="elementHide">
                <?php for($i=0; $i<8; $i++){ ?>
                    <tr>
                        <?php for($j=0; $j<8; $j++){ $x=$i+1; $y=$j+1;?>
                            <td id="<?php echo "1$x$y"; ?>"class="mine arrondie hidenCase"></td>
                        <?php } ?>
                    </tr>
                <?php } ?>
            </table>
        </div>

    </body>
</html>