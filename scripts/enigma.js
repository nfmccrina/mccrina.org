var machine_creator = function (m) {
	var rotor_creator = function (t, pos, rs) {
		var position = (pos >= 0 && pos < 26) ? pos : 0;
		var ring_setting = (rs >= 0 && rs < 26) ? rs : 0;
		var rotor_type = (t >= 0 && t < 10) ? t : 0;
		
		//Royal Flags Wave Kings Above! Yeah!
		var rotor_notch_matrix = [
			[16],
			[4],
			[21],
			[9],
			[25],
			[25, 12],
			[25, 12],
			[25, 12]];
			
		var rotor_wiring_matrix = [
			[4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0, 8, 1, 17, 2, 9],
			[0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 6, 25, 13, 15, 24, 5, 21, 14, 4],
			[1, 3, 5, 7, 9, 11, 2, 15, 17, 19, 23, 21, 25, 13, 24, 4, 8, 22, 6, 0, 10, 12, 20, 18, 16, 14],
			[4, 18, 14, 21, 15, 25, 9, 0, 24, 16, 20, 8, 17, 7, 23, 11, 13, 5, 19, 6, 10, 3, 2, 12, 22, 1],
			[21, 25, 1, 17, 6, 8, 19, 24, 20, 15, 18, 3, 13, 7, 11, 23, 0, 22, 12, 9, 16, 14, 5, 4, 2, 10],
			[9, 15, 6, 21, 14, 20, 12, 5, 24, 16, 1, 4, 13, 7, 25, 17, 3, 10, 0, 18, 23, 11, 8, 2, 19, 22],
			[13, 25, 9, 7, 6, 17, 2, 23, 12, 24, 18, 22, 1, 14, 20, 5, 0, 8, 21, 11, 15, 4, 10, 16, 3, 19],
			[5, 10, 16, 7, 19, 11, 23, 14, 2, 1, 9, 18, 15, 3, 25, 17, 0, 12, 4, 22, 13, 8, 20, 24, 6, 21],
			[11, 4, 24, 9, 21, 2, 13, 8, 23, 22, 15, 1, 16, 12, 3, 17, 19, 0, 10, 25, 6, 5, 20, 7, 14, 18],
			[5, 18, 14, 10, 0, 13, 20, 4, 17, 7, 12, 1, 19, 8, 24, 2, 22, 11, 16, 15, 25, 23, 21, 6, 9, 3]];
		
		r = {};
		r.setPosition = function (p) {
			position = (p >= 0 && p < 26) ? p : position;
			};
		r.setRingSetting = function (r) {
			ring_setting = (r >= 0 && r < 26) ? r : ring_setting;
			};
		r.setRotorType = function (i) {
			rotor_type = (i >= 0 && i < 10) ? i : rotor_type;
			};
		r.getPosition = function () {
			return position;
			};
		r.getRingSetting = function () {
			return ring_setting;
			};
		r.getRotorType = function () {
			return rotor_type;
			};
		r.step = function () {
			position = (position + 1) % 26;
		};
		r.isInCarryPosition = function () {
			//window.alert(rotor_type + ', ' + position);
			if (rotor_type > 7)
			{
				return false;
			}
			
			var i;
			for (i = 0; i < rotor_notch_matrix[rotor_type].length; i += 1)
			{
				if (rotor_notch_matrix[rotor_type][i] === position)
				{
					return true;
				}
			}
			
			return false;
			};
		r.transposeForward = function (s) {
			var v = (s + (((position + 26) - ring_setting)) % 26) % 26;
			v = rotor_wiring_matrix[rotor_type][v];
			return (((v + 26) - (((position + 26) - ring_setting) % 26)) % 26);
			};
		r.transposeReverse = function (s) {
			var v = (s + (((position + 26) - ring_setting)) % 26) % 26;
			var i;
			for (i = 0; i < 26; i += 1)
			{
				if (v === rotor_wiring_matrix[rotor_type][i])
				{
					v = i;
					break;
				}
			}
			return (((v + 26) - (((position + 26) - ring_setting) % 26)) % 26);
			};
		
		return r;
		};
	
	var reflector_creator = function (t) {
		var reflector_matrix = [
			[24, 17, 20, 7, 16, 18, 11, 3, 15, 23, 13, 6, 14, 10, 12, 8, 4, 1, 5, 25, 2, 22, 21, 9, 0, 19],
			[5, 21, 15, 9, 8, 0, 14, 24, 4, 3, 17, 25, 23, 22, 6, 2, 19, 10, 20, 16, 18, 1, 13, 12, 7, 11],
			[4, 13, 10, 16, 0, 20, 24, 22, 9, 8, 2, 14, 15, 1, 11, 12, 3, 23, 25, 21, 5, 19, 7, 17, 6, 18],
			[17, 3, 14, 1, 9, 13, 19, 10, 21, 4, 7, 12, 11, 5, 2, 22, 25, 0, 23, 6, 24, 8, 15, 18, 20, 16]];
		
		var reflector_type = (t >= 0 && t < 4) ? t : 0;
		
		var r = {};
		
		r.setReflectorType = function (v) {
			reflector_type = (t >= 0 && t < 4) ? t : reflector_type;
			};
		r.getReflectorType = function () {
			return reflector_type;
			};
		r.reflect = function (i) {
			return reflector_matrix[reflector_type][i];
			};
		
		return r;
		};
		
	var plugboard_creator = function () {
		var connections = [
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1],
                    [-1, -1]];
		
		var r = {};
		
		r.removeConnection = function (v) {
			var i;
			for (i = 0; i < connections.length; i += 1)
			{
				if (connections[i][0] === v)
				{
				    connections[i][0] = -1;
                                    break;
				}
                else if (connections[i][1] === v)
                {
					connections[i][1] = -1;
                    break;
                }
			}
			};
		r.addConnection = function (v, r, c) {
			this.removeConnection(v);
			connections[r][c] = v;
			};
		r.clear = function () {
			connections = [
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1],
                            [-1, -1]];
			};
                r.isValid = function () {
                        var i;
                        for (i = 0; i < 10; i += 1)
                        {
                            if ((connections[i][0] != -1 && connections[i][1] == -1)
                                || (connections[i][0] == -1 && connections[i][1] != -1))
                            {
                                return false;
                            }
                        }

                        return true;
                    };
                r.getValue = function (r, c) {
                        return connections[r][c];
                    };
		r.transpose = function (s) {
			
			/*window.alert(connections[0][0] + ', ' + connections[0][1] + '\n' +
					connections[1][0] + ', ' + connections[1][1] + '\n' +
					connections[2][0] + ', ' + connections[2][1] + '\n' +
					connections[3][0] + ', ' + connections[3][1] + '\n' +
					connections[4][0] + ', ' + connections[4][1] + '\n' +
					connections[5][0] + ', ' + connections[5][1] + '\n' +
					connections[6][0] + ', ' + connections[6][1] + '\n' +
					connections[7][0] + ', ' + connections[7][1] + '\n' +
					connections[8][0] + ', ' + connections[8][1] + '\n' +
					connections[9][0] + ', ' + connections[9][1] + '\n');*/
			var i;
			for (i = 0; i < connections.length; i += 1)
			{
						
				if (connections[i][0] === s)
				{
					return connections[i][1];
				}
				
				if (connections[i][1] === s)
				{
					return connections[i][0];
				}
			}
			
			return s;
			};
			
		return r;
		};
		
	var model = (m >= 0 && m < 2) ? m : 0;
	
	var right_rotor = rotor_creator(0, 25, 0);
	var middle_rotor = rotor_creator(1, 0, 0);
	var left_rotor = rotor_creator(2, 0, 0);
	var fourth_rotor = rotor_creator(8, 0, 0);
	
	var reflector = {};
	
	if (model === 0)
	{
		reflector = reflector_creator(0);
	}
	else
	{
		reflector = reflector_creator(2);
	}
	
	var plugboard = plugboard_creator();
	
	var tmp = {};
	
	tmp.getModel = function () {
			return model;
		};
	tmp.reset = function (m) {
		model = (m >= 0 && m < 2) ? m : 0;
		right_rotor = rotor_creator(0, 25, 0);
		middle_rotor = rotor_creator(1, 0, 0);
		left_rotor = rotor_creator(2, 0, 0);
		fourth_rotor = rotor_creator(8, 0, 0);
		
		if (model === 0)
		{
			reflector = reflector_creator(0);
		}
		else
		{
			reflector = reflector_creator(2);
		}
		};
	tmp.setRotorPosition = function (rotor, pos) {
		switch (rotor)
		{
			case 0:
			{
				right_rotor.setPosition(pos);
			}
			break;
			case 1:
			{
				middle_rotor.setPosition(pos);
			}
			break;
			case 2:
			{
				left_rotor.setPosition(pos);
			}
			break;
			case 3:
			{
				fourth_rotor.setPosition(pos);
			}
			break;
		}
		};
	tmp.getRotorPosition = function (rotor) {
		switch (rotor)
		{
			case 0:
			{
				return right_rotor.getPosition();
			}
			break;
			case 1:
			{
				return middle_rotor.getPosition();
			}
			break;
			case 2:
			{
				return left_rotor.getPosition();
			}
			break;
			case 3:
			{
				return fourth_rotor.getPosition();
			}
			break;
		}
		};
	tmp.setRotorRingSetting = function (rotor, rs) {
		switch (rotor)
		{
			case 0:
			{
				right_rotor.setRingSetting(rs);
			}
			break;
			case 1:
			{
				middle_rotor.setRingSetting(rs);
			}
			break;
			case 2:
			{
				left_rotor.setRingSetting(rs);
			}
			break;
			case 3:
			{
				fourth_rotor.setRingSetting(rs);
			}
			break;
		}
		};
	tmp.getRotorRingSetting = function (rotor) {
		switch (rotor)
		{
			case 0:
			{
				return right_rotor.getRingSetting();
			}
			break;
			case 1:
			{
				return middle_rotor.getRingSetting();
			}
			break;
			case 2:
			{
				return left_rotor.getRingSetting();
			}
			break;
			case 3:
			{
				return fourth_rotor.getRingSetting();
			}
			break;
		}
		};
	tmp.setRotorType = function (rotor, rt) {
		switch (rotor)
		{
			case 0:
			{
				right_rotor.setRotorType((rt < 8) ? rt : -1);
			}
			break;
			case 1:
			{
				middle_rotor.setRotorType((rt < 8) ? rt : -1);
			}
			break;
			case 2:
			{
				left_rotor.setRotorType((rt < 8) ? rt : -1);
			}
			break;
			case 3:
			{
				fourth_rotor.setRotorType((rt > 7) ? rt : -1);
			}
			break;
		}
		};
	tmp.getRotorType = function (rt) {
		switch (rt)
		{
			case 0:
			{
				return right_rotor.getRotorType();
			}
			break;
			case 1:
			{
				return middle_rotor.getRotorType();
			}
			break;
			case 2:
			{
				return left_rotor.getRotorType();
			}
			break;
			case 3:
			{
				return fourth_rotor.getRotorType();
			}
			break;
		}
		};
	tmp.setReflectorType = function (ref) {
		if (model === 0)
		{
			if (ref < 2)
			{
				reflector = reflector_creator(ref);
			}
		}
		else
		{
			if (ref > 1 && ref < 4)
			{
				reflector = reflector_creator(ref);
			}
		}
		};
	tmp.getReflector = function () {
		return reflector.getReflectorType();
		};
	tmp.addPlugboardLetter = function (v, r, c) {
		plugboard.addConnection(v, r, c);
		};
	tmp.removePlugboardLetter = function (v) {
		plugboard.removeConnection(v);
		};
        tmp.resetPlugboard = function () {
                plugboard.clear();
            };
        tmp.isPlugboardValid = function () {
                return plugboard.isValid();
            };
        tmp.getPlugboardValue = function (r, c) {
                return plugboard.getValue(r, c);
            };
	tmp.processLetter = function (s) {
		var signal = s;
		
		if (middle_rotor.isInCarryPosition())
		{
			left_rotor.step();
			middle_rotor.step();
			right_rotor.step();
		}
		else if (right_rotor.isInCarryPosition())
		{
			middle_rotor.step();
			right_rotor.step();
		}
		else
		{
			right_rotor.step();
		}
		
		signal = plugboard.transpose(signal);
		signal = right_rotor.transposeForward(signal);
		signal = middle_rotor.transposeForward(signal);
		signal = left_rotor.transposeForward(signal);
		signal = (model === 1) ? fourth_rotor.transposeForward(signal) : signal;
		signal = reflector.reflect(signal);
		signal = (model === 1) ? fourth_rotor.transposeReverse(signal) : signal;
		signal = left_rotor.transposeReverse(signal);
		signal = middle_rotor.transposeReverse(signal);
		signal = right_rotor.transposeReverse(signal);
		//window.alert(String.fromCharCode(signal + 65));
		signal = plugboard.transpose(signal);
		
		return signal;
		};
	
	return tmp;
	};


	
$(document).ready(function() {
	var rotorConvert = function (param) {
		if (typeof param === 'number')
		{
			switch (param)
			{
				case 0:
				{
					return 'I';
				}
				break;
				case 1:
				{
					return 'II';
				}
				break;
				case 2:
				{
					return 'III';
				}
				break;
				case 3:
				{
					return 'IV';
				}
				break;
				case 4:
				{
					return 'V';
				}
				break;
				case 5:
				{
					return 'VI';
				}
				break;
				case 6:
				{
					return 'VII';
				}
				break;
				case 7:
				{
					return 'VIII';
				}
				break;
				case 8:
				{
					return 'Beta';
				}
				break;
				case 9:
				{
					return 'Gamma';
				}
				break;
			}
		}
		else if (typeof param === 'string')
		{
			switch (param)
			{
				case 'I':
				{
					return 0;
				}
				break;
				case 'II':
				{
					return 1;
				}
				break;
				case 'II':
				{
					return 2;
				}
				break;
				case 'IV':
				{
					return 3;
				}
				break;
				case 'V':
				{
					return 4;
				}
				break;
				case 'VI':
				{
					return 5;
				}
				break;
				case 'VII':
				{
					return 6;
				}
				break;
				case 'VIII':
				{
					return 7;
				}
				break;
				case 'Beta':
				{
					return 8;
				}
				break;
				case 'Gamma':
				{
					return 9;
				}
				break;
			}
		}
		else
		{
			return -1;
		}
	};
	
	var reflectorConvert = function (param) {
		if (typeof param === 'number')
		{
			switch (param)
			{
				case 0:
				{
					return 'B';
				}
				break;
				case 1:
				{
					return 'C';
				}
				break;
				case 2:
				{
					return 'B (thin)';
				}
				break;
				case 3:
				{
					return 'C (thin)';
				}
				break;
			}
		}
		else if (typeof param === 'string')
		{
			switch (param)
			{
				case 'B':
				{
					return 0;
				}
				break;
				case 'C':
				{
					return 1;
				}
				break;
				case 'B (thin)':
				{
					return 2;
				}
				break;
				case 'C (thin)':
				{
					return 3;
				}
				break;
			}
		}
		else
		{
			return -1;
		}
	};
	
	var enigma = machine_creator(0);
    var app_output = '';

        var refreshGui = function () {
			var count;
			for (count = 1; count < 11; count += 1)
			{
				$('input[name="plug-' + count + '-first"]').val((enigma.getPlugboardValue(count - 1, 0) === -1) ? "" : String.fromCharCode(enigma.getPlugboardValue(count - 1, 0) + 65));
				$('input[name="plug-' + count + '-second"]').val((enigma.getPlugboardValue(count - 1, 1) === -1) ? "" : String.fromCharCode(enigma.getPlugboardValue(count - 1, 1) + 65));
			}

			$('input[name="right_rotor_position"]').val(String.fromCharCode(enigma.getRotorPosition(0) + 65));
			$('input[name="middle_rotor_position"]').val(String.fromCharCode(enigma.getRotorPosition(1) + 65));
			$('input[name="left_rotor_position"]').val(String.fromCharCode(enigma.getRotorPosition(2) + 65));
			$('input[name="fourth_rotor_position"]').val(String.fromCharCode(enigma.getRotorPosition(3) + 65));
			$('input[name="right_rotor_ring"]').val(String.fromCharCode(enigma.getRotorRingSetting(0) + 65));
			$('input[name="middle_rotor_ring"]').val(String.fromCharCode(enigma.getRotorRingSetting(1) + 65));
			$('input[name="left_rotor_ring"]').val(String.fromCharCode(enigma.getRotorRingSetting(2) + 65));
			$('input[name="fourth_rotor_ring"]').val(String.fromCharCode(enigma.getRotorRingSetting(3) + 65));
			$('select[name="right_rotor_select"]').val(rotorConvert(enigma.getRotorType(0)));
			$('select[name="middle_rotor_select"]').val(rotorConvert(enigma.getRotorType(1)));
			$('select[name="left_rotor_select"]').val(rotorConvert(enigma.getRotorType(2)));
			$('select[name="fourth_rotor_select"]').val(rotorConvert(enigma.getRotorType(3)));
			$('select[name="model_select"]').val((enigma.getModel() === 0) ? 'Enigma M3' : 'Enigma M4');
			$('select[name^="reflector"]').val(reflectorConvert(enigma.getReflector()));
			$('textarea').val(app_output);
		};

	var enigma_reset = function (model) {
		enigma.reset(model);
		$('select[name="right_rotor_select"]').empty();
		$('select[name="middle_rotor_select"]').empty();
		$('select[name="left_rotor_select"]').empty();
		$('select[name="fourth_rotor_select"]').empty();
		$('select[name="reflector_select"]').empty();
		$('select[name="model_select"]').empty();
		
		var selectWidgets = ['right_rotor_select', 'middle_rotor_select', 'left_rotor_select'];
		var rotorTypes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
		var count;
		var count2;
		
		for (count = 0; count < selectWidgets.length; count += 1)
		{
			for (count2 = 0; count2 < rotorTypes.length; count2 += 1)
			{
				$('<option>' + rotorTypes[count2] + '</option>').appendTo($('select[name="' + selectWidgets[count] + '"]'));
			}
		}
		
		$('<option>Beta</option>').appendTo($('select[name="fourth_rotor_select"]'));
		$('<option>Gamma</option>').appendTo($('select[name="fourth_rotor_select"]'));
		$('<option>Enigma M3</option>').appendTo($('select[name="model_select"]'));
		$('<option>Enigma M4</option>').appendTo($('select[name="model_select"]'));
		
		if (model === 0)
		{
			$('div[id="fourth-rotor"]').addClass('hidden');
			$('<option>B</option>').appendTo($('select[name="reflector_select"]'));
			$('<option>C</option>').appendTo($('select[name="reflector_select"]'));
		}
		else
		{
			$('div').removeClass('hidden');
			$('<option>B (thin)</option>').appendTo($('select[name="reflector_select"]'));
			$('<option>C (thin)</option>').appendTo($('select[name="reflector_select"]'));
		}					
	};
	
	var enigma_init = function () {
		enigma_reset(0);
		$('div[id="reflector"]').insertAfter('#model-select');
		$('div[id="fourth-rotor"]').insertAfter('#reflector');
		$('div[id="left-rotor"]').insertAfter('#fourth-rotor');
		$('div[id="middle-rotor"]').insertAfter('#left-rotor');
		$('div[id="right-rotor"]').insertAfter('#middle-rotor');
		$('div').addClass("enigmaGuiItem");
		$('div[id="keyboard"] button').addClass('keyboardButtonMargin');
		$('div[id="keyboard"]').addClass('darkBackground');
		$('div[id="keyboard"]').addClass('keyboardStyle');
		$('input').attr({size: '1'});
                $('textarea').attr({readonly: "readonly", cols: "100"});
		$('input[name$="position"]').attr({readonly: "readonly"});
		$('input[name$="ring"]').attr({readonly: "readonly"});
		$('div[id^="row"]').addClass('keyRow');
		};
    
	var app_reset = function () {
		enigma_reset(0);
		enigma.resetPlugboard();
		app_output = '';
		refreshGui();
	};

	enigma_init();
        refreshGui();

    $('button[name="reset-button"]').on('click', function () {
            app_reset();
        });
	
    $('select[name^="model"]').change(function () {
        if ($(this).val() == 'Enigma M3')
		{
			enigma_reset(0);
		}
		else
		{
			enigma_reset(1);
		}
        refreshGui();
    });
	
	$('button[name$="inc"]').on('click', function (event) {
		switch ($(this).attr('name'))
		{
			case 'right_position_inc':
			{
				enigma.setRotorPosition(0, (enigma.getRotorPosition(0) + 1) % 26);
			}
			break;
			case 'right_ring_inc':
			{
				enigma.setRotorRingSetting(0, (enigma.getRotorRingSetting(0) + 1) % 26);
			}
			break;
			case 'middle_position_inc':
			{
				enigma.setRotorPosition(1, (enigma.getRotorPosition(1) + 1) % 26);
			}
			break;
			case 'middle_ring_inc':
			{
				enigma.setRotorRingSetting(1, (enigma.getRotorRingSetting(1) + 1) % 26);
			}
			break;
			case 'left_position_inc':
			{
				enigma.setRotorPosition(2, (enigma.getRotorPosition(2) + 1) % 26);
			}
			break;
			case 'left_ring_inc':
			{
				enigma.setRotorRingSetting(2, (enigma.getRotorRingSetting(2) + 1) % 26);
			}
			break;
			case 'fourth_position_inc':
			{
				enigma.setRotorPosition(3, (enigma.getRotorPosition(3) + 1) % 26);
			}
			break;
			case 'fourth_ring_inc':
			{
				enigma.setRotorRingSetting(3, (enigma.getRotorRingSetting(3) + 1) % 26);
			}
			break;
		}

                refreshGui();
		});
		
	$('button[name$="dec"]').on('click', function (event) {
		switch (event.target['name'])
		{
			case 'right_position_dec':
			{
				enigma.setRotorPosition(0, ((enigma.getRotorPosition(0) + 26) - 1) % 26);
			}
			break;
			case 'right_ring_dec':
			{
				enigma.setRotorRingSetting(0, ((enigma.getRotorRingSetting(0) + 26) - 1) % 26);
			}
			break;
			case 'middle_position_dec':
			{
				enigma.setRotorPosition(1, ((enigma.getRotorPosition(1) + 26) - 1) % 26);
			}
			break;
			case 'middle_ring_dec':
			{
				enigma.setRotorRingSetting(1, ((enigma.getRotorRingSetting(1) + 26) - 1) % 26);
			}
			break;
			case 'left_position_dec':
			{
				enigma.setRotorPosition(2, ((enigma.getRotorPosition(2) + 26) - 1) % 26);
			}
			break;
			case 'left_ring_dec':
			{
				enigma.setRotorRingSetting(2, ((enigma.getRotorRingSetting(2) + 26) - 1) % 26);
			}
			break;
			case 'fourth_position_dec':
			{
				enigma.setRotorPosition(3, ((enigma.getRotorPosition(3) + 26) - 1) % 26);
			}
			break;
			case 'fourth_ring_dec':
			{
				enigma.setRotorRingSetting(3, ((enigma.getRotorRingSetting(3) + 26) - 1) % 26);
			}
			break;
		}
                refreshGui();
		});
		
		$('select[name$="fourth_rotor_select"]').change(function () {
			enigma.setRotorType(3, rotorConvert($(this).val()));
			});
		$('select[name$="left_rotor_select"]').change(function () {
			enigma.setRotorType(2, rotorConvert($(this).val()));
			});
		$('select[name$="middle_rotor_select"]').change(function () {
			enigma.setRotorType(1, rotorConvert($(this).val()));
			});
		$('select[name$="right_rotor_select"]').change(function () {
			enigma.setRotorType(0, rotorConvert($(this).val()));
			});
                $('select[name^="reflector"]').change(function () {
                        enigma.setReflectorType(reflectorConvert($(this).val()));
                    });


                $('input[name^="plug"]').keyup(function () {
                        var curValue = $(this).val();
                        var newValue = curValue;
                        
                        newValue = curValue.charAt(0);
                        
                        if (curValue.length === 0)
                        {
                            newValue = '';
                        }
                        else if (newValue.charCodeAt(0) >= 97 && newValue.charCodeAt(0) < 123)
                        {
                            newValue = String.fromCharCode(newValue.charCodeAt(0) - 32);
                        }
                        else if (newValue.charCodeAt(0) < 65 || newValue.charCodeAt(0) > 90)
                        {
                            newValue = '';
                        }
						
                        switch ($(this).attr('name'))
                        {
                            case 'plug-1-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 0, 0);
                            }
                            break;
                            case 'plug-2-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 1, 0);
                            }
                            break;
                            case 'plug-3-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 2, 0);
                            }
                            break;
                            case 'plug-4-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 3, 0);
                            }
                            break;
                            case 'plug-5-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 4, 0);
                            }
                            break;
                            case 'plug-6-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 5, 0);
                            }
                            break;
                            case 'plug-7-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 6, 0);
                            }
                            break;
                            case 'plug-8-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 7, 0);
                            }
                            break;
                            case 'plug-9-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 8, 0);
                            }
                            break;
                            case 'plug-10-first':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 9, 0);
                            }
                            break;
                            case 'plug-1-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 0, 1);
                            }
                            break;
                            case 'plug-2-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 1, 1);
                            }
                            break;
                            case 'plug-3-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 2, 1);
                            }
                            break;
                            case 'plug-4-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 3, 1);
                            }
                            break;
                            case 'plug-5-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 4, 1);
                            }
                            break;
                            case 'plug-6-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 5, 1);
                            }
                            break;
                            case 'plug-7-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 6, 1);
                            }
                            break;
                            case 'plug-8-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 7, 1);
                            }
                            break;
                            case 'plug-9-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 8, 1);
                            }
                            break;
                            case 'plug-10-second':
                            {
                                enigma.addPlugboardLetter((newValue === '') ? -1 : newValue.charCodeAt(0) - 65, 9, 1);
                            }
                            break;
                        }

                        refreshGui();
                    });

        var count;
        for (count = 97; count < 123; count += 1)
        {
            var bname = String.fromCharCode(count) + '-button';
			var handleClick = true;
			var toggleClick = function () {
				handleClick = true;
			};
			
            $('button[name="' + bname + '"]').on('click', function () {
					if (!handleClick)
					{
						return;
					}
					
                    if (!enigma.isPlugboardValid())
                    {
                        window.alert('Invalid plugboard configuration. Are there any incomplete pairs?');
						return;
                    }

                    app_output += String.fromCharCode(enigma.processLetter($(this).attr('name').charCodeAt(0) - 97) + 65);

                    refreshGui();
					handleClick = false;
					setTimeout(toggleClick, 250);
                });
        }
});
