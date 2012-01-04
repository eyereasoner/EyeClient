(function ($) {
  var tabCount = 0;
  
  var eye = $.fn.eye = function (options) {
    return this.each(function () {
      var resultCount = 0;
      options = options || {};

      // activate component and wrap old contents
      var $this = $(this).addClass('eye');
      var $contents = $('<div>').addClass('old')
                                .append($this.children());

      // create list and container for input tabs
      var $inputList = $('<ul>').append($('<li class="label">').text(labels.input));
      var $inputContainer = $('<div>').addClass('data');
      // create query button and status label
      var $submit = $('<button>');
      var $status = $('<span>');
      // create list and container for result tabs
      var $resultList = $('<ul>').append($('<li class="label">').text(labels.results));
      var $resultContainer = $('<div>').addClass('results');

      // add new contents
      var $panel = $('<div>').addClass('client');
      $this.append($contents,
                   $panel.append($inputContainer.append($inputList),
                                 $('<p>').append($submit, $status),
                                 $resultContainer.append($resultList)));

      // create data, query, and result tabs
      var dataTabs = [];
      $contents.find('.data').each(function () {
        var $this = $(this), dataUri = $this.attr('href') || $this.text();
        dataTabs.push(appendCodeTabFromUrl(dataUri, $inputList, $inputContainer, 'data'));
      });
      var queryTab;
      $contents.find('.query').each(function () {
        var $this = $(this), queryUri = $this.attr('href') || $this.text();
        $queryTab = appendCodeTabFromUrl(queryUri, $inputList, $inputContainer, 'query');
      });
      $inputContainer.tabs();
      $resultContainer.tabs().hide();
      
      // hook up submit button
      $submit.button()
             .text(labels.execute)
             .click(showEyeResult);

      function showEyeResult() {
          var data = [], query = $queryTab.val();
          // collect data
          $(dataTabs).each(function () {
            if (!$(this).hasClass('error'))
              data.push($(this).val());
          });
          
          // execute Eye
          $status.text(labels.executing).removeClass('error');
          executeEye({
              path: options.path,
              data: data,
              query: query
            })
            // EYE succes?
            .done(function (n3) {
              // create new result tab
              var resultName = 'result ' + (++resultCount);
              $status.text(labels.success.replace('$', resultName));
              appendCodeTab(resultName,
                            $resultList, $resultContainer, 'result')
                        .text(n3);
              $resultContainer.tabs('destroy')
                              .tabs()
                              .tabs('select', resultCount - 1)
                              .slideDown();
            })
            // EYE failure?
            .fail(function (reason) {
              // display error detail
              $status.text(labels.failure.replace('$', reason)).addClass('error');
            });
        }
    });
  };
  
  var executeEye = eye.executeEye = function (options) {
    return $.Deferred(function (deferred) {
      $.ajax({
          url: options.path,
          traditional: true,
          data: {
            'data': options.data,
            'query': options.query
          },
          cache: true,
          // try to use POST when possible, since the URI could become large
          type: $.support.cors ? 'POST' : 'GET',
          dataType: $.support.cors ? 'text' : 'jsonp'
        })
        // ajax succes?
        .done(function (n3) {
          // EYE failure?
          if (n3.error)
            deferred.reject(n3.error);
          // EYE success!
          else
            deferred.resolve(n3.trimRight());
        })
        // ajax failure?
        .fail(function (response) {
          if (response.responseText)
            deferred.reject(response.responseText.trim());
          else if (response.status)
            deferred.reject('HTTP error ' + response.status + ' \u2013 ' + response.statusText);
          else
            deferred.reject('Unknown HTTP error. Check your connection');
        });
    }).promise();
  };
  
  var labels = eye.labels = {
    input: 'Input',
    results: 'Results',
    execute: 'Execute EYE',
    executing: 'Executing EYE...',
    success: 'EYE generated $, displayed below.',
    failure: 'Error executing EYE: $.'
  };
  
  function appendCodeTab(title, $tabList, $tabContainer, cssClass) {
    var tabId = 'eyetab' + (++tabCount),
        $tabLink = $('<li>').addClass(cssClass)
                            .append($('<a>').attr('href', '#' + tabId)
                            .text(title)),
        $tab = $('<textarea>').attr('id', tabId)
                              .addClass(cssClass)
                              .data('link', $tabLink);
    $tabList.append($tabLink);
    $tabContainer.append($tab);
    return $tab;
  }

  function appendCodeTabFromUrl(url, $tabList, $tabContainer, cssClass) {
    var titleMatch = /([\d\w\-_]+)(?:\.[\d\w]+?)$/i.exec(url),
        title = titleMatch ? titleMatch[1] : url,
        $tab = appendCodeTab(title, $tabList, $tabContainer, cssClass);
    $.ajax(url)
      .done(function (n3) {
        $tab.val(n3.trimRight());
        $tab.data('link').attr('title', url);
      })
      .fail(function () {
        $tab.addClass('error').val('Could not load ' + url + '.');
        $tab.data('link').addClass('error');
      });
    return $tab;
  }
}(jQuery));
