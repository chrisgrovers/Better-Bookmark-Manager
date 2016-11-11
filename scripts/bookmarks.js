/**
* TODO:
* Create a list of bookmarks
* - Account for folders
* - Nesting of folders
* - Batch delete bookmarks
* - Batch move bookmarks
* - Open up to the last viewed tree
* - Bookmark search
* Last visited feature?
*
*
**/
(function() {
  // var bookmarkUtils = {
  //   getRecentBookMarks = function(num) {
  //     return chrome.bookmarks.getRecentBookMarks(num, function(bookmarks) {
  //       return bookmarks;
  //     });
  //   }
  // }

  var $bookmarkContainer = $('.bookmark-container');
  $bookmarkContainer.addFolder = function(folderObj) {
    // TODO: Add click event listener to open folder
    var $folderObj = $("<li class='folder-li'></li>")
    $folderObj.append("<a>" + folderObj.title+ "</a>")
    this.append($folderObj)
  };
  $bookmarkContainer.addBookmark = function(bookmarkObj) {
    // TODO: Add click event listener to open tab on new page, or on current page?
    var $bookmarkObj = $("<li class='bookmark-li'></li>")
    $bookmarkObj.append("<a target=\"_blank\" href=\"" + bookmarkObj.url + "\">" + bookmarkObj.title+ "</a>")
    this.append($bookmarkObj);
  };

  $bookmarkContainer.setDefaultState = function() {
    chrome.bookmarks.getTree(function(marks) {
      addBookMarksFromObj(_.first(marks).children);
    })
  };

  $bookmarkContainer.setDefaultState();

  var addBookMarksFromObj = function(marks) {
    _.each(marks, function(bookmark) {
      addBookMarks(bookmark);
    });
  };
  var addBookMarks = function(bookmarkObj) {
    if (bookmarkObj.children) {
      $bookmarkContainer.addFolder(bookmarkObj);
    }
    else {
      $bookmarkContainer.addBookmark(bookmarkObj);
    }
  };

  $('input.search').on('input', function(e) {
    $bookmarkContainer.empty();
    if (_.isEmpty(this.value)) {
      $bookmarkContainer.setDefaultState();
    }
    else {
      chrome.bookmarks.search(this.value, addBookMarksFromObj);
    }
  });

  $('.button').on('click', function() {
    chrome.bookmarks.getTree(function(marks) {
      console.log(marks)
    });
  });

})();
