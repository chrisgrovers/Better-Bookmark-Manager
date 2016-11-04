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
    this.append("<div>" + folderObj.title+ "</div>")
  };
  $bookmarkContainer.addBookmark = function(folderObj) {
    // TODO: Add click event listener to open tab on new page, or on current page?
    this.append("<div>" + folderObj.title+ "</div>")
  };

  $bookmarkContainer.setDefaultState = function() {
    chrome.bookmarks.getTree(function(marks) {
      _.each(_.first(marks).children, function(bookmark) {
        addBookMarks(bookmark);
      })
    })
  };

  $bookmarkContainer.setDefaultState();

  var addBookMarks = function(bookmarkObj) {
    if (bookmarkObj.children) {
      $bookmarkContainer.addFolder(bookmarkObj);
    }
    else {
      $bookmarkContainer.addBookmark(bookmarkObj);
    }
  }

  $('.input').on('change', function(text) {
    debugger;
    $bookmarkContainer.empty();
    if (_.isEmpty(text)) {
      $bookmarkContainer.setDefaultState();
    }
    else {
      chrome.bookmarks.search(text, addBookMarks);
    }
  })

  $('.button').on('click', function() {
    chrome.bookmarks.getTree(function(marks) {
      console.log(marks)
    });
  })

})();
