function Position(x,y){
	this.x = x;
	this.y = y;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function initView(){
	var view = new Array();
	for(var i=0; i<8; i++)
		view[i] = new Array();
	for(var i=0; i<8; i++)
		for (var j=0; j<8; j++)
			view[i][j] = 0;
	return view;
}
function initMinesWeeepers(){
	var mine = new Array();
	for(var i=0; i<8; i++)
		mine[i] = new Array();
	
	for(var i=0; i<8; i++)
		for (var j=0; j<8; j++)
			mine[i][j] = 0;

	return mine;
}
function addNumber(mine, x, y){
	for(var i=-1;i<2;i++){
		for(var j=-1;j<2;j++){
			var a = x+i;
			var b = y+j;
			if((a>=0)&&(a<8)&&(b>=0)&&(b<8)){
				if(mine[a][b] != 'x')
					mine[a][b]++;
			}
		}
	}
}
function addMine(mine){
	var i = 1;
	var encore;
	while (i <= 8){
		encore = 'true';
		while(encore == 'true'){
			var x = getRandomInt(8);
			var y = getRandomInt(8);
			if(mine[x][y] == '0'){
				mine[x][y] = 'x';
				addNumber(mine,x,y);
				encore = 'false';
			}
		}
		i++;
	}
	return mine;
}
function displayTable(mine){
	for(var i=0; i<8; i++){
		var x = i+1;
		for(var j=0; j<8; j++){
			var y = j+1;
			if(mine[i][j] == '0')
				$("#1"+x+y).text(' ');
			else if(mine[i][j] == 'x')
				$("#1"+x+y).text(String.fromCharCode(9675));
			else
				$("#1"+x+y).text(mine[i][j]);
		}
	}
}
// ==== showMine ====
// affiche toutes les mines
function showMine(mine){
	for(var i=1; i<9; i++)
		for (var j=1; j<9; j++)
			if(mine[i-1][j-1] == 'x')
				$("#"+i+j).text(String.fromCharCode(9675));
}

// ==== showPosition ====
// affiche une position s
//	     x : position x de la case à afficher sur le tableau mine ou view
//  	 y : position y de la case à afficher sur le tableau mine ou view
//    mine : Tableau de position des mines
function showPosition(x, y, mine){
	var a = x+1;
	var b = y+1;
	$("#"+a+b).removeClass('hidenCase').addClass('visibleCase');
	if (mine[x][y] == '0')
		$("#"+a+b).text(' ');
	else if (mine[x][y] == 'x')
		$("#"+a+b).text(String.fromCharCode(9675));
	else
		$("#"+a+b).text(mine[x][y]);
}
// ==== deminage ====
function deminage(x, y, mine, view){
	var maPile = new Array();
	var pos = new Position(x-1, y-1);

	//affichage de la pos cliqué
	showPosition(pos.x, pos.y, mine);
	view[pos.x][pos.y]++;	

	if(mine[pos.x][pos.y] == 'x'){
		$("#"+x+y).addClass('red');
		showMine(mine);
	}
	
	if(mine[pos.x][pos.y] == '0'){
		maPile.push(pos);
		// tant qu'il y'a des position 0 (vide) dans la pile
		while(maPile.length > 0){
			// récupération de la derniere pos de la pile
			var pos = maPile.pop();
			// pos est une case vide, on parcour les case adjacente et on les affiches (il n'y a pas de mine)
			for(var i=-1;i<2;i++){
				for(var j=-1;j<2;j++){
					// Si la position adja ne sort pas du tableau, on l'affiche
					if(((pos.x+i)>=0)&&((pos.x+i)<8)&&((pos.y+j)>=0)&&((pos.y+j)<8)){
						//si la position adja n'a pas été vue
						if(view[pos.x+i][pos.y+j]=='0'){
							view[pos.x+i][pos.y+j]++;				// vue -> oui
							showPosition(pos.x+i, pos.y+j, mine);		// affichage de la pos adja
							//si la position adja est aussi une case vide, on l'ajoute a la pile
							if(mine[pos.x+i][pos.y+j] == '0'){
								var newPos = new Position(pos.x+i, pos.y+j);
								maPile.push(newPos);
							}
						}
					}
				}
			}
		}
	}
	return view;
}

$(function(){
	var mine = new Array();
	var view = new Array();
	view = initView();
	mine = initMinesWeeepers();
	addMine(mine);
	displayTable(mine);

	$('td').click(function(event){
		var boxClicked = $(this).text();
		var position = $(this).attr('id');
		var x = position.substr(0,1);
		var y = position.substr(1,2);

		if (view[x-1][y-1] == 0){
			view = deminage(x, y, mine, view);
		}
	});
	$('#restart').click( function(){
		view = initView();
		$('#minesweeper td').text(' ');
		$('#minesweeper td').removeClass('visibleCase', 'red').addClass('hidenCase');
	});
	$('#new').click( function(){
		view = initView();
		mine = initMinesWeeepers();
		addMine(mine);
		$('#minesweeper td').text(' ');
		$('#minesweeper td').removeClass('visibleCase', 'red').addClass('hidenCase');
		displayTable(mine);
	});
	$('#rep').click( function(){
		displayTable(mine);
	});
})

// OK - le demineur est affiché au millieux de lécran 'css'
// OK - Cacher toute les case du jeux
// OK - si on clique sur une mine, toute les mines sont affichés et la partie est perdu
// OK - codage du boutons recommencer 
// OK - codage du boutons nouvelle partie
// compteur de case qui, une fois arrivé a 8, dit victoire (les 8 derniere case sont les mines)
// Amélioration des boutons recommencer et nouvelle partie css
// ajout d'un panneau victoire ou defaite avec temps et nbr de mine restante


// implémenter un compteur en debut de partie
// lors d'un debut de partie
//	- la partie commence sur une case vide
//	- le minier est définit par la case de commencement
// trouver un moyen pour le clique droits