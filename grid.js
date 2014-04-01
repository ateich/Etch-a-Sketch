var option = 1;
var lastOption = -1;

$(document).ready(function()
{
	//Start out with 16 rows and 16 columns
	createSquares(16);

	//Clear the squares of any color
	$('#clear').click(function(){
		clear();
	});

	//Resize grid
	$('#setRows').click(function(){
		setNumberOfRows();
	});

	//Color squares red on hover
	$('#defaultColor').click(function(){
		lastOption = option;
		option = 1;
		clear();
	});

	//Color squares a random color on hover
	$('#randomColor').click(function(){
		lastOption = option;
		option = 2;
		clear();
	});

	//Increase opacity of squares until underlying color is fully visible
	$('#opacityColor').click(function(){
		if(option !== 3)
		{
			lastOption = option;
		}
		option = 3;
		clear();
	});
});

function setNumberOfRows () {
	clear();
	var squaresInOneRow = parseInt(prompt("How many tiles in a row?"));

	while(isNaN(squaresInOneRow))
	{
		var squaresInOneRow = parseInt(prompt("Please enter a number for how many tiles in a row."));
	}

	createSquares(squaresInOneRow);
}

function setRandomColor(item)
{
	var r = parseInt(Math.random()*255);
	var g = parseInt(Math.random()*255);
	var b = parseInt(Math.random()*255);

	var colorString = "rgb(" + r + "," + g + "," + b + ")";
	$(item).css({"background-color":colorString});
}

function increaseOpacity(item)
{
	var opacity = parseFloat($(item).css("opacity"));
	if(isNaN(opacity))
	{
		opacity = 0;
	}

	opacity += .1;
	if(opacity < 1)
	{
		$(item).css({"opacity":opacity});
	}
}

function clear()
{
	var opacity = 1;
	if(option === 3)
	{
		opacity = 0;
	}

	//Set all squares to have the default background color
	$('.square').css({"background-color":$('#container').css("background-color"), "opacity":opacity});
	setSquareColorPreferences();
}

//Create the squares in a grid of specified size
function createSquares(squaresInOneRow)
{
	var html = '';

	for(var i=0; i<squaresInOneRow; i++)
	{
		html = html + '<div class="row">';
		for(var j=0; j<squaresInOneRow; j++)
		{
			html = html + '<div class="square"></div>';
		}
		html = html + '</div>';
	}

	$('#container').html(html);
	setSquareSize(squaresInOneRow);
	setSquareColorPreferences();
}

//Set user chosen preferences for color of squares
function setSquareColorPreferences()
{
	$('.square').unbind();
	
	if(option === 1)
	{
		$('.square').bind({
		  mouseenter: function(e) {
		  	setDefaultColor(this);
		  }
		});
	}
	else if(option === 2)
	{
		$('.square').bind({
		  mouseenter: function(e) {
		  	setRandomColor(this);
		  }
		});
	}
	else if(option === 3)
	{
		$('.square').bind({
		  mouseenter: function(e) {
		  	//Randomly Colored Squares
		  	if(lastOption === 2)
		  	{
		  		setRandomColor(this);
		  	}

		  	//Squares of default color
		  	else
		  	{
		  		setDefaultColor(this);
		  	}

		  	//Gradually increase the squares visibility
		  	increaseOpacity(this);
		  }
  		});
	}
}

function setDefaultColor(item)
{
	$(item).css({"background-color":"red"});
}

function setSquareSize(squaresInOneRow)
{
	var rowWidth = parseFloat($('#container').css("width"));
	var squareWidth = rowWidth/squaresInOneRow;

	$('.row').css({"width":rowWidth, "height":squareWidth});
	$('.square').css({"width":squareWidth, "height":squareWidth, "display":"inline-block"});
}