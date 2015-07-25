function CreateButtons() {
	var game_window = $( '#game_window' );
	
	var light_table = $( '<table id="light_table"></table>' ).appendTo( game_window );
	var current_row = null;
	var current_cell = null;
	
	for (var i = 0; i < 5; i++) {
		current_row = $( '<tr></tr>' ).appendTo( light_table );
		
		for (var j = 0; j < 5; j++) {
			current_cell = $( '<td></td>' ).appendTo( current_row );
			$( '<input id="light' + i + j + '" class="light light0" type="button" value="0" />').appendTo( current_cell );
		}
	}
}

function IncrementLight( light_element ) {
	var current_value = +$( light_element ).val();
	
	if (current_value < 6) {
		$( light_element ).val(current_value + 1);
		$( light_element ).removeClass( 'light' + current_value);
		$( light_element ).addClass( 'light' + (current_value + 1));
	}
	else {
		$( light_element ).val(0);
		$( light_element ).removeClass( 'light6');
		$( light_element ).addClass( 'light0');
	}
}

function GetAdjacentLights( light_element ) {
	var current_id = $( light_element ).attr('id');
	
	var coordinates = current_id.substring(5);
	var row = coordinates[0];
	var column = coordinates[1];
	var ids = [];
	
	if ( row < 1 ) {
		if ( column < 1) {
			ids.push(row + (+column + 1));
			ids.push((+row + 1) + column);
		}
		else if ( column > 3 ) {
			ids.push(row + (+column - 1));
			ids.push((+row + 1) + column);
		}
		else
		{
			ids.push(row + (+column + 1));
			ids.push(row + (+column - 1));
			ids.push((+row + 1) + column);
		}
	}
	else if (row > 3) {
		if ( column < 1) {
			ids.push(row + (+column + 1));
			ids.push((+row - 1) + column);
		}
		else if ( column > 3 ) {
			ids.push(row + (+column - 1));
			ids.push((+row - 1) + column);
		}
		else
		{
			ids.push(row + (+column + 1));
			ids.push(row + (+column - 1));
			ids.push((+row - 1) + column);
		}
	}
	else
	{
		if ( column < 1) {
			ids.push(row + (+column + 1));
			ids.push((+row + 1) + column);
			ids.push((+row - 1) + column);
		}
		else if ( column > 3 ) {
			ids.push(row + (+column - 1));
			ids.push((+row + 1) + column);
			ids.push((+row - 1) + column);
		}
		else
		{
			ids.push(row + (+column + 1));
			ids.push(row + (+column - 1));
			ids.push((+row + 1) + column);
			ids.push((+row - 1) + column);
		}
	}
	
	return ids;
}

function ClearButtons() {
	var current_value = 0;
	var current_element = null;
	
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			current_element = $( ('#light' + i) + j);
			current_value = current_element.val();
			
			current_element.val("0");
			current_element.removeClass('light' + current_value);
			current_element.addClass('light0');
		}
	}
}

function RandomizeButtons() {
	var random_value = 0;
	var current_element = null;

	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			current_element = $( ('#light' + i) + j);
			
			random_value = Math.floor(Math.random() * 7);
			
			current_element.val(random_value);
			current_element.removeClass('light0');
			current_element.addClass('light' + random_value);
		}
	}
}

$( document ).ready( function() {
	CreateButtons();
	
	$( '.light' ).click(function() {
		IncrementLight( $( this ) );
		var ids = GetAdjacentLights( $( this ) );
		
		for (var i = 0; i < ids.length; i++) {
			IncrementLight( $( '#light' + ids[i] ) );
		}
	});
	
	$( '#clear_button' ).click(function() {
		ClearButtons();
	});
	
	$( '#randomize_button' ).click(function() {
		ClearButtons();
		RandomizeButtons();
	});
});