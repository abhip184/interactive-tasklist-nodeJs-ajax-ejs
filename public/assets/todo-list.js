$(document).ready(function () {
  var $ul = $('#todo-ul');
  $('form').on('submit', function () {
    var item = $('form input');
    var todo = { item: item.val() };
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function (data) {
        //do something with the data via front-end framework
        $ul.append('<li>' + data.item + '</li>');
      },
    });

    return false;
  });

  $('li').on('click', function () {
    var item = $(this).text().replace(/ /g, '-');
    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function (data) {
        //do something with the data via front-end framework
        $li.fadeOut(500, function () {
          $(this).remove();
        });
      },
    });
  });
});
