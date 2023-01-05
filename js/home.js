jQuery(document).ready(function(){

		var text0 = 'Xóa Tất Cả';
		var text1 = 'Đang Theo Dõi';
		var text2 = 'Truyện Đang Theo Dõi';
		var text3 = 'Dữ liệu không thể không phục lại. Bạn có chắc chắn muốn xóa tất cả những truyện đã xem?';
		var text4 = 'Không';
		var text5 = 'Có';
		var text6 = 'Xem Thêm';
		var text7 = 'Xóa Theo Dõi';
		var text8 = 'Thành công! Vui lòng tải lại trang.';
		var text9 = 'Đang tải dữ liệu. Vui lòng chờ giây lát.';
		var text10 = 'Đọc Tiếp';

	function js_home_click_more_tab_1 (click, result, length_result ) {
		html = '<div id="notice" class="notice_tab_home_1"><div id="notice-child"><div class="explanation">';
		// start reverse object
		var arr = [];
		for (var key in result) {
			arr.push(key);
		}
		k = length_result - 1 - 5*click;
		start = length_result - 5 - 5*click;
		stt = 5*click
		if (start < 0) { start = 0 }
		for (i = k; i>=start; i--) {
			stt ++;
			// arr[i] chính là value
			html += '<div style="margin: 10px 0px 11px 0px;"><div class="row"><div class="col-xs-9 col-md-8 crop-text"><span class="list">'+stt+'</span><a href="/truyen/'+result[arr[i]]['url']+'"> '+result[arr[i]]['name']+'</a></div><div class="col-xs-3 col-md-4 crop-text"><a href="/truyen/'+result[arr[i]]['url']+'/'+result[arr[i]]['chap']+'">'+text10+'</a></div></div></div>';
		}

		if (start != 0) {
			html += '<div class="line"></div><div id="more_tab_home_1" class="more"><span class="remove-all">'+text0+'</span><div class="load-more text-center pull-right"><i class="fa fa-angle-double-right" aria-hidden="true"></i> '+text6+'</div><div></div>';
		} else {
			html += '<div style="margin-top:5px"></div>';
		}

		html += '</div></div>';
		html += '<style>.notice_tab_home_1 .explanation::after {content: "\\f06e  '+text1+'";}</style>';
		return html;
	}



	$('.btn-home-icon').click(function(event) {
		event.stopImmediatePropagation();
		tab = $(this).data('value');


	    $('#show-layout-home-1').html('');
		$('.btn-home-icon').css({"background": "rgba(0,0,0,0.1)", "color": "black", "border": "0.5px #1ebbf0 solid",  });
		$('#'+tab+' .btn-home-icon').css({"background": "linear-gradient(135deg,#1ebbf0 30%,#39dfaa 100%)", "color": "white", "border": "unset",  });
		//$('#'+tab+' .number-home-icon').css({"right": "0px", "background" : "black" });

		$('.btn-home-icon-2').click(function(event) {
			$('.btn-home-icon').css({"background": "rgba(0,0,0,0.1)", "color": "black", "border": "0.5px #1ebbf0 solid",});
			$('.btn-home-icon-2').css({"background": "linear-gradient(135deg,#1ebbf0 30%,#39dfaa 100%)", "color": "white", "border": "unset",  });
		});

		result = eval('var_'+tab);

		if (tab == 'tab_home_1' ) {

			if ($(window).width() >= 1024 ) {
				$('#decu').html('');
			}
			
			html = js_home_click_more_tab_1 (0, result, number_da_doc );
			$('#show-layout-home-1').append(html) 	

			// Xem thêm những truyện đã xem
			click_more_tab_home_1 = 0
			$('#show-layout-home-1').on('click', '.load-more', function(event) {
				event.preventDefault();
				event.stopImmediatePropagation();
				click_more_tab_home_1++;
				html = js_home_click_more_tab_1 (click_more_tab_home_1, var_tab_home_1, number_da_doc );
				$('#show-layout-home-1').html(html);
			});


			// Xóa hết những truyện đã xem
			$('#show-layout-home-1').on('click', '.remove-all', function(event) {
				$('.explanation').html('<div style="font-size:16px;margin: 10px 0px;">'+text3+'</div><span class="btn-primary-border font-12 font-oswald no-remove-all" style="color:white;background:#17b31c;">'+text4+'</span><span class="pull-right btn-primary-border font-12 font-oswald yes-remove-all" style="color:white;background:red">'+text5+'</span>');
				$('#show-layout-home-1').on('click', '.yes-remove-all', function(event) {	
					localStorage.removeItem('last_seen');
					$('.explanation').html('<div style="font-size:14px;margin: 10px 0px;">'+text8+'</div>');
				});
				$('#show-layout-home-1').on('click', '.no-remove-all', function(event) {
					html = js_home_click_more_tab_1 (0, result, number_da_doc );
					$('#show-layout-home-1').html(html)
				});
			});

		} else if (tab == 'tab_home_3' ) {

			if ($(window).width() >= 1024 ) {
				$('#decu').html('');
			}

			$('#show-layout-home-1').css({"margin-top": "8px"  });

			html = '<style>.notice_tab_home_3 .explanation::after {content: "\\f02c  BookMark";}</style>';
			html += '<div id="notice" class="notice_tab_home_3"><div id="notice-child"><div class="explanation">';

			$.each(result, function(index, val) {
				number_tab_3 = Object.keys(val).length;
				html += '<div style="margin: 10px 0px 11px 0px;" class="crop-text bookmark-more" data-bookmark="'+index+'"><span class="list"><i class="fa fa-tags" aria-hidden="true"></i></span> '+index;
				html += ' ('+number_tab_3+')</div>';
			});
			html += '</div></div>';

	    	$('#show-layout-home-1').html(html);
	    	//click more bookmark
			$('#show-layout-home-1').on('click', '.bookmark-more', function(event) {
				event.preventDefault();					
				bookmark = $(this).data('bookmark');
				html = '';
				$.each(result[bookmark], function(index, val) {
					html += '<span class="btn-primary-border border-radius font-12 font-oswald"><a href="/'+bookmark+'/'+index+'/" rel="tag">'+val+'</a></span>'
				});
				html += '<style>.notice_tab_home_3 .explanation::after {content: "\\f02c  '+bookmark+'";}</style>';
				$('.explanation').html(html);
			});

		} 
	});


	
    $('#newest-category').change(function(){ // Khi click vào button thì sẽ gọi hàm ajax
    	var name_cate = $(this).val();
        $.ajax({
           type : "post",
           dataType : "html",
           url : ajaxurl,
           data : {
                action: "newest",
                name_cate: name_cate,
           },
           beforeSend: function(){
                $('#newest').html('<div class="alert alert-info alert-dismissible" role="alert"><span class="fa fa-spinner fa-spin"></span> '+text9+'</div>')
           },
           success: function(response) {
                $('#newest').html(response);
           }
       });
    });
    $('#ajax-topdanhvong').change(function(){ // Khi click vào button thì sẽ gọi hàm ajax
    	var type = $(this).val();
        $.ajax({
           type : "post",
           dataType : "html",
           url : ajaxurl,
           data : {
                action: "topdanhvong",
                type: type,
           },
           beforeSend: function(){
                $('#ajax-topdanhvong-show').html('')
                $('#ajax-topdanhvong-show2').html('<div class="alert alert-info alert-dismissible" role="alert"><span class="fa fa-spinner fa-spin"></span> '+text9+'</div>')
           },
           success: function(response) {
                $('#ajax-topdanhvong-show').html(response);
                $('#ajax-topdanhvong-show2').html('');
           },
       });
    });
    $('.select-bxh').change(function(){ 
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()    	
    	var method = $(this).data('id');
    	var slug_cate = $(this).val();
    	var date = $('.nav-tabs.nav-'+method+' .active').data('date');
        $.ajax({ 
           type : "post", 
           dataType : "html", 
           url : ajaxurl, 
           data : {
                action: "home_bxh_truyen", 
                slug_cate: slug_cate,
                date: date,
                method: method,
           },
           beforeSend: function(){
                $('#'+method+'_echo').html('<div class="alert alert-info alert-dismissible" role="alert"><span class="fa fa-spinner fa-spin"></span> '+text9+'</div>')
           },
           success: function(response) {
                $('#'+method+'_echo').html(response);
           },
       });
    });	

	$('.nav-tabs li').click(function(event) {
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()   	
		let check = $(this).hasClass("active");
		if (check == false) {
		    var method = $(this).parent().data('id');  

		    $('.nav-tabs.nav-'+method+' li').removeClass('active');
		    $(this).addClass("active");

		    var date = $(this).data("date");
		    var slug_cate = $(".select-"+method).val();

		    $.ajax({ 
		       type : "post", 
		       dataType : "html", 
		       url : ajaxurl, 
		       data : {
		            action: "home_bxh_truyen", 
		            slug_cate: slug_cate,
		            date: date,
		            method: method,
		       },
		       beforeSend: function(){
		            $('#'+method+'_echo').html('<div class="alert alert-info alert-dismissible" role="alert"><span class="fa fa-spinner fa-spin"></span> '+text9+'</div>')
		       },
		       success: function(response) {
		            $('#'+method+'_echo').html(response);
		       },
		   }); 
		}
    }); 


    $('#slider-premiumItem-img').slick({
		dots: false,
        slidesToScroll: 1,
        infinite: true, // vòng lặp vô hạn
        arrows: true, // button next pre
        mobileFirst: true,
        centerMode: true, 
        focusOnSelect: true, //Cho phép tập trung vào yếu tố được chọn (nhấp)
        variableWidth: true, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
        autoplay: true, 
        swipeToSlide: true, //Cho phép người dùng kéo hoặc vuốt trực tiếp vào một slide bất kể slide là gì            
		autoplaySpeed: 3000,
        prevArrow: '<span class="slick-prev slick-arrow"><span class="fa fa-angle-left"></span></span>',
        nextArrow: '<span class="slick-next slick-arrow"><span class="fa fa-angle-right"></span></span>',
		responsive: [
		{
			breakpoint: 1920,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 5
			}
		},            
		{
			breakpoint: 768,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1,
			}
		}
		]            
    });
	$('#slider-premiumItem-img-2').slick({
		dots: false,
        slidesToScroll: 1,
        infinite: true, // vòng lặp vô hạn
        arrows: true, // button next pre
        mobileFirst: true,
        centerMode: true, 
        focusOnSelect: true, //Cho phép tập trung vào yếu tố được chọn (nhấp)
        variableWidth: true, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
        autoplay: true, 
        swipeToSlide: true, //Cho phép người dùng kéo hoặc vuốt trực tiếp vào một slide bất kể slide là gì            
		autoplaySpeed: 3000,
        prevArrow: '<span class="slick-prev-2 slick-arrow"><span class="fa fa-angle-left"></span></span>',
        nextArrow: '<span class="slick-next-2 slick-arrow"><span class="fa fa-angle-right"></span></span>',
		responsive: [
		{
			breakpoint: 1920,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3
			}
		},            
		{
			breakpoint: 768,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 480,
			settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1,
			}
		}
		]            
    });

    $('#slider-premiumItem-img2').slick({
        slidesToScroll: 3,
        infinite: true, // vòng lặp vô hạn
        arrows: true, // button next pre
        mobileFirst: true,
        centerMode: true, 
        focusOnSelect: true, //Cho phép tập trung vào yếu tố được chọn (nhấp)
        variableWidth: true, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
        autoplay: true, 
        swipeToSlide: true, //Cho phép người dùng kéo hoặc vuốt trực tiếp vào một slide bất kể slide là gì            
        autoplaySpeed: 4000,
        dots: false,

        prevArrow: '<span class="slick-prev slick-arrow"><span class="fa fa-angle-left"></span></span>',
        nextArrow: '<span class="slick-next slick-arrow"><span class="fa fa-angle-right"></span></span>',
        responsive: [
        {
            breakpoint: 991,
            settings: {
				arrows: true,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1,
                dots: true,
                arrows: false, // button next pre
                variableWidth: false, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
			}
            // settings: {
            //     arrows: true,
            //     centerMode: true,
            //     centerPadding: '10px',
            //     slidesToShow: 5,
            //     infinite: false, // vòng lặp vô hạn
            //     dots: true,
            //     arrows: false, // button next pre
            //     variableWidth: false, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
            // }
        },            
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3,
            }
        }
        ]            
    });
    
    $('#slider-premiumItem-img3').slick({
        slidesToScroll: 3,
        infinite: true, // vòng lặp vô hạn
        arrows: true, // button next pre
        mobileFirst: true,
        centerMode: true, 
        focusOnSelect: true, //Cho phép tập trung vào yếu tố được chọn (nhấp)
        variableWidth: true, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
        autoplay: true, 
        swipeToSlide: true, //Cho phép người dùng kéo hoặc vuốt trực tiếp vào một slide bất kể slide là gì            
        autoplaySpeed: 4000,
        dots: false,
        infinite: true, // vòng lặp vô hạn
        asNavFor: '#slider-premiumItem-img4',

        prevArrow: '<span class="slick-prev slick-arrow"><span class="fa fa-angle-left"></span></span>',
        nextArrow: '<span class="slick-next slick-arrow"><span class="fa fa-angle-right"></span></span>',
        responsive: [
        {
            breakpoint: 991,
            settings: {
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3,
                arrows: false, // button next pre
                variableWidth: false, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
            }
        },            
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1,
            }
        }
        ]            
    });
    $('#slider-premiumItem-img4').slick({
        slidesToScroll: 3,
        infinite: true, // vòng lặp vô hạn
        arrows: true, // button next pre
        mobileFirst: true,
        centerMode: true, 
        focusOnSelect: true, //Cho phép tập trung vào yếu tố được chọn (nhấp)
        variableWidth: true, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
        autoplay: true, 
        swipeToSlide: true, //Cho phép người dùng kéo hoặc vuốt trực tiếp vào một slide bất kể slide là gì            
        autoplaySpeed: 4000,
        dots: true,
        arrows: false,
                slidesToShow: 1,
        infinite: true, // vòng lặp vô hạn
        asNavFor: '#slider-premiumItem-img3',
        responsive: [
        {
            breakpoint: 991,
            settings: {
                centerMode: true,
                centerPadding: '10px',
                arrows: false, // button next pre
                variableWidth: false, // Các slide chiều rộng thay đổi không cần thuộc tính slidesToShow
            }
        },            
        {
            breakpoint: 480,
            settings: {
                centerMode: true,
                centerPadding: '10px',
            }
        }
        ]            
    });
});	