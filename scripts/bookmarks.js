/**
* TODO:
* Create a list of bookmarks
* - Account for folders
*   - Folder click should change parent id
*   - Open up to the last viewed tree
*     - Parent ID should persist
* - Nesting of folders
* - Batch delete bookmarks
* - Batch move bookmarks
* - Bookmark search
*   - Ability to hide certain bookmarks from searches
* Last visited feature?
*
*
**/
(function() {
  var $bookmarkContainer = $('.bookmark-container');
  $bookmarkContainer.addFolder = function(folderObj) {
    // TODO: Add click event listener to open folder
    var $folderObj = $("<li class='folder-li'></li>")
    $folderObj.append("<a>" + folderObj.title+ "</a>")
    this.append($folderObj)
    $folderObj.on('click', function(e) {
      // Add back button
      // Set Parent ID
      // Open up children
      addBookMarksFromObj(folderObj.children);
    })
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

})();
