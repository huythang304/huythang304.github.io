

	function stripHtml(html) {
		let tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}

	function countWords(str) {
		str = stripHtml(str);
		str = str.replace(/(&nbsp;|<br>|\(|\)|\"|'|-|\?|!|:|;|,|\.|\+|=|\*|\n)/gi," ");
		str = str.replace(/\s+/gi," ");			   		
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		//console.log (str);
		return str.split(' ').length;
	}


	jQuery(document).ready(function($) {

		var noi_dung 			= $( "#richeditor" ).html();
		$('#cwords').html('<i class="fa fa-file-word-o" aria-hidden="true"></i> '+countWords(noi_dung)+ ' words');


		$('#mission_type_price').change(function(event) {
			var type_price = $(this).val();
			if (type_price == '1') {
				$('#mission_price_parent').removeClass('tf_hidden');
			} else {
				$('#mission_price_parent').addClass('tf_hidden');	
			}
		});

		$('#password').change(function(event) {
			var password = $(this).val();
			if (password == '1') {
				$('#password_child').removeClass('tf_hidden');
				$('#suggest_password_parent').removeClass('tf_hidden');
			} else {
				$('#password_child').addClass('tf_hidden');	
				$('#suggest_password_parent').addClass('tf_hidden');	
			}
		});


		$('#status').change(function(event) {
			var status = $(this).val();
			if (status == 'publish') {
				$('#exclamation_publish').removeClass('tf_hidden');
			} else {
				$('#exclamation_publish').addClass('tf_hidden');	
			}

			if (status == 'future') {
				$('#status_future').removeClass('tf_hidden');
				$('#exclamation_future').removeClass('tf_hidden');
			} else {
				$('#status_future').addClass('tf_hidden');	
				$('#exclamation_future').addClass('tf_hidden');				
			}
		});

		$('#mm').change(function(event) {
			var mm = $(this).val();

			switch(mm) {
				case '01':
				case '03':
				case '05':
				case '07':
				case '08':
				case '10':
					$("#dd").append(new Option("29", "29"));
					$("#dd").append(new Option("30", "30"));
					$("#dd").append(new Option("31", "31"));
					break;

				case '04':
				case '06':
				case '09':
				case '11':
					$("#dd").append(new Option("29", "29"));
					$("#dd").append(new Option("30", "30"));
					$("#dd option[value='31']").remove();
					break;

				case '02':
					$("#dd option[value='29']").remove();
					$("#dd option[value='30']").remove();
					$("#dd option[value='31']").remove();
					break;

				default:
			}
		});


		$('body').on('DOMSubtreeModified', '#richeditor', function(){
			var noi_dung 			= $( this ).html();
			noi_dung = noi_dung.trim();

			$('#cwords').html('<i class="fa fa-file-word-o" aria-hidden="true"></i> '+countWords(noi_dung)+ ' words');
		});

		$('#edit_chuong').click(function(event) {
			var ten_chuong 			= $( "input#ten_chuong" ).val();
			var noi_dung 			= $( "#richeditor" ).html();

			var min_words = '500';

			if (countWords(noi_dung) < min_words) {
				$('#myModal .modal-body').html('<div class="alert alert-danger" role="alert"><i class="fa fa-info-circle" aria-hidden="true"></i> Nội dung chương tối thiểu '+min_words+' words</div>');
				$('#myModal').modal('show');	
				return;				
			}

			var post_id 			= $( "#edit_chuong" ).data('id');
			var status 				= $('#status').val();
			var ads 				= $('#ads').val();

			var type_price = $('#mission_type_price').val();
			if (type_price == '1') {
				var price = $( "#price" ).val();
			} else {
				var price = 0;
			}

			var password = $('#password').val();
			if (password == '1') {
				var value_password 		= $( "#value_password" ).val();
				var suggest_password 	= $( "#suggest_password" ).val();	
			} else {
				var value_password 		= '';
				var suggest_password 	= '';
			}			

			var dd = $('#dd').val();
			var mm = $('#mm').val();
			var yy = $('#yy').val();
			var hh = $('#hh').val();
			var ii = $('#ii').val();

			$.ajax({ 
				type : "post", 
				dataType : "html", 
				url : ajaxurl, 
				data : {
					action: "user_sua_chuong", 
					ten_chuong: ten_chuong, 
					noi_dung: noi_dung, 
					status: status, 
					ads: ads, 
					post_id: post_id, 
					price: price, 
					value_password: value_password, 
					suggest_password: suggest_password, 
					dd: dd, 
					mm: mm, 
					yy: yy, 
					hh: hh, 
					ii: ii, 
					security: '47c4b91fa7',
				},
				beforeSend: function(){
					$('#edit_chuong').html('');
					$('#show_edit_chuong').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
				},
				success: function(response){
					$('#edit_chuong').html('<span class="btn btn-primary color-white"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Sửa Chương</span>');
					$('#show_edit_chuong').html('');
					$('#myModal .modal-body').html(response);
					$('#myModal').modal('show');						
				},

			});	
			
		});
	});
