$(document).ready(function () {

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    $("#price-slider-range").slider({
        range: true,
        min: 0,
        max: 30000000000,
        step: 100000000,
        slide: function (event, ui) {
            if ((ui.values[0]) == ui.values[1]) {
                return false;
            }
            $("#min-price").html(formatNumber(ui.values[0]));

            suffix = '';
            if (ui.values[1] == $("#max-price").data('max')) {
                suffix = ' +';
            }
            $("#max-price").html(formatNumber(ui.values[1]) + suffix);
        },
        create: function (event, ui) {
            $(this).slider('values', 0, 0);
            $(this).slider('values', 1, 30000000000);
        }
    });

    $("#area-slider-range").slider({
        range: true,
        min: 0,
        max: 1000,
        step: 5,
        slide: function (event, ui) {
            if ((ui.values[0]) == ui.values[1]) {
                return false;
            }
            $("#min-area").html(formatNumber(ui.values[0]));

            suffix = '';
            if (ui.values[1] == $("#max-area").data('max')) {
                suffix = ' +';
            }
            $("#max-area").html(formatNumber(ui.values[1]) + suffix);
        },
        create: function (event, ui) {
            $(this).slider('values', 0, 0);
            $(this).slider('values', 1, 1000);
        }
    });

    $('#get_ranger_price').on('click', function (e) {
        e.preventDefault();
        var min_price = $('#min-price').text();
        var max_price = $('#max-price').text();
        $('#btn-price-range div span').html(min_price + ' đ - ' + max_price + ' đ');
        $('.dropdown-menu.cs-dropdown-menu.show').removeClass('show')
    })

    $('#get_ranger_area').on('click', function (e) {
        e.preventDefault();
        var min_area = $('#min-area').text();
        var max_area = $('#max-area').text();
        $('#btn-area-range div span').html(min_area + ' m² - ' + max_area + ' m²');
        $('.dropdown-menu.cs-dropdown-menu.show').removeClass('show')
    })

    $('.dropdown-menu-search .dropdown-item').on('click', function () {
        $('.dropdown-toggle').html($(this).html());
    })

    // fancybox
    $('[data-fancybox="gallery"]').fancybox({
        thumbs: {
            showOnStart: true
        },
        hash: true
    })

    $('input.search-input').on('focusin change keyup paste', function () {
        if (this.value.length !== 0) {
            $('.listAutocomplete').show();
        } else {
            $('.listAutocomplete').hide();
        }
    })

    $('input.search-input').on('focusout', function () {
        $('.listAutocomplete').hide();
    })

    //Khi event click #menuMoreMB
    // Kiểm tra tồn tại class active
    // Nếu tồn tại thì xóa class active (Close menuMore-mobile)
    // Nếu không tồn tại thì add class active (Open menuMore-mobile)
    $('#menuMoreMB').on('click', function () {
        if (!$('.menuMore-mobile').hasClass('active')) {
            $('.menuMore-mobile').addClass('active');
            $(document).one('click', function closeTooltip(e) {
                if ($('.menuMore-mobile').has(e.target).length === 0 && $('div#menuMoreMB').has(e.target).length === 0) {
                    $('.menuMore-mobile').removeClass('active');
                } else if ($('.menuMore-mobile').hasClass('active')) {
                    $(document).one('click', closeTooltip);
                }
            });
        } else {
            $('.menuMore-mobile').removeClass('active');
        }
    })

    //Kiểm tra khi thay đổi kích thước màn hình <= 768px
    // Nếu menuMore-mobile active
    // Xóa Class active
    $(window).resize(function () {
        if ($(window).width() <= 768) {
            if ($('.menuMore-mobile').hasClass('active')) {
                $('.menuMore-mobile').removeClass('active');
            }
        }
    })

    // MENU MORE
    $('div#menuMore').on('click', function (e) {
        e.preventDefault();
        if (!$('.navItem-dropdown').hasClass('active')) {
            $('.navItem-dropdown').addClass('active');
            $(document).one('click', function closeTooltip(e) {
                if ($('.navItem-dropdown').has(e.target).length === 0 && $('div#menuMore').has(e.target).length === 0) {
                    $('.navItem-dropdown').removeClass('active');
                } else if ($('.navItem-dropdown').hasClass('active')) {
                    $(document).one('click', closeTooltip);
                }
            });
        } else {
            $('.navItem-dropdown').removeClass('active');
        }
    })

    $(window).resize(function () {
        if ($(window).width() > 768) {
            if ($('.navItem-dropdown').hasClass('active')) {
                $('.navItem-dropdown').removeClass('active');
            }
        }
    })

    // MENU NOTIFICATIO
    $('div#notification').on('click', function (e) {
        e.preventDefault();
        if (!$('.notification-layoutContainer').hasClass('active')) {
            $('.notification-layoutContainer').addClass('active');
            $(document).one('click', function closeTooltip(e) {
                if ($('.notification-layoutContainer').has(e.target).length === 0 && $('div#notification').has(e.target).length === 0) {
                    $('.notification-layoutContainer').removeClass('active');

                } else if ($('.notification-layoutContainer').hasClass('active')) {
                    $('.notification-layoutContainer .nav-tabs .nav-link').on("click.bs.dropdown", function (e) {
                        $('.notification-layoutContainer .nav-tabs .nav-link').removeClass('active');
                        $(this).addClass('active');
                        e.stopPropagation();
                    });
                    $(document).one('click', closeTooltip);
                }
            });
        } else {
            $('.notification-layoutContainer').removeClass('active');
        }
    })

    $(window).resize(function () {
        if ($(window).width() > 768) {
            if ($('.notification-layoutContainer').hasClass('active')) {
                $('.notification-layoutContainer').removeClass('active');
            }
        }
    })

    //Khi event click #notificationMB
    // Kiểm tra tồn tại class active
    // Nếu tồn tại thì xóa class active (Close notification-mobile)
    // Nếu không tồn tại thì add class active (Open notification-mobile)
    $('#notificationMB').on('click', function (e) {
        e.preventDefault();
        if (!$('.notification-mobile').hasClass('active')) {
            $('.notification-mobile').addClass('active');
            $(document).one('click', function closeTooltip(e) {
                if ($('.notification-mobile').has(e.target).length === 0 && $('div#notificationMB').has(e.target).length === 0) {
                    $('.notification-mobile').removeClass('active');

                } else if ($('.notification-mobile').hasClass('active')) {
                    $('.notification-mobile .nav-tabs .nav-link').on("click.bs.dropdown", function (e) {
                        $('.notification-mobile .nav-tabs .nav-link').removeClass('active');
                        $(this).addClass('active');
                        e.stopPropagation();
                    });
                    $(document).one('click', closeTooltip);
                }
            });
        } else {
            $('.notification-mobile').removeClass('active');
        }
    })

    //Kiểm tra khi thay đổi kích thước màn hình <= 768px
    // Nếu notification-mobile active
    // Xóa Class active
    $(window).resize(function () {
        if ($(window).width() < 768) {
            if ($('.notification-mobile').hasClass('active')) {
                $('.notification-mobile').removeClass('active');
            }
        }
        if ($(window).width() >= 768) {
            $('div.right').addClass('d-none');
            $('div.left').removeClass('d-none');
        }
    })
    $('#list').click(function (e) {
        e.preventDefault();
        $('#pr_id .item').addClass('list-group-item');
        $('#list').addClass('active')
        $('#grid').removeClass('active')
    });

    $('#grid').click(function (e) {
        e.preventDefault();
        $('#pr_id .item').removeClass('list-group-item');
        $('#list').removeClass('active')
        $('#grid').addClass('active')
    });

    $('.ThreadList .ThreadItem').click(function (e) {
        e.preventDefault();
        $('.ThreadList .ThreadItem').removeClass('Active')
        $(this).addClass('Active')
        if ($(window).width() < 768) {
            $('div.right').removeClass('d-none');
            $('div.left').addClass('d-none');

        } else {
            $('div.right').addClass('d-none');
            $('div.left').removeClass('d-none');
        }
    })

    $(' .mess-backBtnWrapper').click(function (e) {
        e.preventDefault();
        $('div.right').addClass('d-none');
        $('div.left').removeClass('d-none');
    })

    $('#get_file').on('click', function (e) {
        e.preventDefault();
        $('#my_file').click();
    })

    $('.input-group').on('click', '.button-plus', function (e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

        if (!isNaN(currentVal)) {
            parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            parent.find('input[name=' + fieldName + ']').val(0);
        }
    });

    $('.input-group').on('click', '.button-minus', function (e) {
        e.preventDefault();
        var fieldName = $(e.target).data('field');
        var parent = $(e.target).closest('div');
        var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

        if (!isNaN(currentVal) && currentVal > 0) {
            parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            parent.find('input[name=' + fieldName + ']').val(0);
        }
    });

    $('.input-max .input-maxlength').on('input propertychange', function (e) {
        e.preventDefault();
        var length = $('.input-max .input-maxlength').val().length;
        var max_length = $('.input-max .input-maxlength').attr('maxlength');
        $('.input-max .text-maxlength').text(length + '/' + max_length);
    });

    $('.input-txt-max .input-maxlength').on('input propertychange', function (e) {
        e.preventDefault();
        var length = $('.input-txt-max .input-maxlength').val().length;
        var max_length = $('.input-txt-max .input-maxlength').attr('maxlength');
        $('.input-txt-max .text-maxlength').text(length + '/' + max_length);
    });

    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        if (n <= x.length - 1) {
            x[n].style.display = "flex";
        }
        //... and fix the Previous/Next buttons:
        if (n == 0) {
            if(document.getElementById("prevBtn"))
                document.getElementById("prevBtn").style.display = "none";
        } else {
            if(document.getElementById("prevBtn"))
                document.getElementById("prevBtn").style.display = "inline-block";
        }
        if (n >= x.length - 1) {
            if (document.getElementById("prevBtn"))
                document.getElementById("nextBtn").style.display = "none";
        }
        loadingProgress(n, x.length - 1);
    };

    $('#nextBtn').on('click', function (e) {
        e.preventDefault();
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + 1;
        // Otherwise, display the correct tab:
        showTab(currentTab);
        if (currentTab >= x.length)
            document.getElementById("nextBtn").style.display = "none";
    });

    $('#prevBtn').on('click', function (e) {
        e.preventDefault();
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab - 1;
        // Otherwise, display the correct tab:
        showTab(currentTab);
        if (currentTab >= x.length)
            document.getElementById("nextBtn").style.display = "none";
    });

    function loadingProgress(current, length) {
        if(document.getElementById("cs-progress-bar")) {
            var x = document.getElementById("cs-progress-bar");
            var width = current / length * 100;
            x.style.width = width + "%";
        }
    };

    $('.list-group a.list-group-item').on('click', function (e) {
        e.preventDefault();
        $('.list-group a.list-group-item').removeClass('active');
        $(this).addClass('active');
        var data = $(this).attr('data-field');
        $(this).parent().find('input').val(data);
        $('.list-group input').val(data);
    });

    var currentIndexTab = 0; // Current tab is set to be the first tab (0)
    showIndexTab(currentIndexTab); // Display the current tab

    function showIndexTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("info-tab");
        if (n <= x.length - 1) {
            x[n].style.display = "block";
        }
    };

    $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
    });

    $('.nextIndexBtn').on('click', function (e) {
        e.preventDefault();
        // Remove class active
        $(this).parent().find('li.active').removeClass('active');
        // Add class active
        $(this).addClass('active');
        $('#SelectDropDown div span').html($(this).text());

        // This function will figure out which tab to display
        var x = document.getElementsByClassName('info-tab');
        if(currentIndexTab == x.length-1){
            $('.backIndexBtn a span').html($(this).text());
            return false;
        }
        // Hide the current tab:
        x[currentIndexTab].style.display = 'none';
        // // Increase or decrease the current tab by 1:
        currentIndexTab = currentIndexTab + 1;
        // // Otherwise, display the correct tab:
        showIndexTab(currentIndexTab);
    });

    $('.backIndexBtn').on('click', function (e) {
        e.preventDefault();
        // This function will figure out which tab to display
        var x = document.getElementsByClassName('info-tab');
        // Hide the current tab:
        x[currentIndexTab].style.display = 'none';
        // Increase or decrease the current tab by 1:
        currentIndexTab = currentIndexTab - 1;
        // Otherwise, display the correct tab:
        showIndexTab(currentIndexTab);
    });

    $('')
});