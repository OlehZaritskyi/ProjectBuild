$(document).ready(function () {
    $('.category_title').on('click', function () {
        $(this).next('.dropdown-menu').slideToggle();
    });
    $('.datepicker_item').datepicker({
        format: 'dd.mm.yyyy',
        startDate: ''
    });
    $('select').extendSelect({
        search: ''
    });
    $('.table-data td').each(function () {
        var tdIndex = $(this).index();
        if ($('tr').find('th').eq(tdIndex).attr('data-label')) {
            var thText = $('tr').find('th').eq(tdIndex).data('label');
        } else {
            var thText = $('tr').find('th').eq(tdIndex).text();
        }
        $(this).attr('data-label', thText + ':');
    });

    //==Adaptive==//
    if ($(window).width() < 767) {
        $('.navbar-toggler').on('click', function () {
            $('#descriptionTab.nav-tabs').slideToggle();
        });
        $(document).mouseup(function (e) {
            var container = $('.header');
            if (container.has(e.target).length === 0 || $('#descriptionTab.nav-tabs').has(e.target).length === 1) {
                $('#descriptionTab.nav-tabs').slideUp();
            }
        });
    }
});