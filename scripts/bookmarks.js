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
  var addFolder = function(folderObj, parentEl) {
    parentEl = parentEl || $bookmarkContainer;
    // TODO: Add click event listener to open folder
    var $folderObj = $("<li class='folder-li'></li>")
    $folderObj.clicked = false;
    $folderObj.append("<a>" + folderObj.title+ "</a>")
    parentEl.append($folderObj)
    $folderObj.on('click', function(e) {
      // Add back button
      // Set Parent ID
      // Open up children
      if (!$folderObj.clicked) {
        addBookMarksFromObj(folderObj.children, $folderObj);
        $folderObj.clicked = true;
        e.preventDefault();
        e.stopPropagation();
      } else {
        $folderObj.find('li').empty();
        $folderObj.clicked = false;
        $folderObj.toggleClass('active');
      }
    });

    $folderObj.hover(function(e) {
      $folderObj.toggleClass('active');
    })
  };
  var addBookmark = function(bookmarkObj, parentEl) {
    parentEl = parentEl || $bookmarkContainer;
    // TODO: Add click event listener to open tab on new page, or on current page?
    var $bookmarkObj = $("<li class='bookmark-li'></li>")
    $bookmarkObj.append("<a target=\"_blank\" href=\"" + bookmarkObj.url + "\">" + bookmarkObj.title+ "</a>")
    parentEl.append($bookmarkObj);
  };

  $bookmarkContainer.setDefaultState = function() {
    chrome.bookmarks.getTree(function(marks) {
      addBookMarksFromObj(_.first(marks).children);
    })
  };

  $bookmarkContainer.setDefaultState();

  var addBookMarksFromObj = function(marks, parent) {
    _.each(marks, function(bookmark) {
      addBookMarks(bookmark, parent);
    });
  };
  var addBookMarks = function(bookmarkObj, parent) {
    $parentEl = parent || $bookmarkContainer;
    if (bookmarkObj.children) {
      addFolder(bookmarkObj, $parentEl);
    }
    else {
      addBookmark(bookmarkObj, $parentEl);
    }
  };

  $('input.search').on('input', _.debounce(function() {
      $bookmarkContainer.empty();
      if (_.isEmpty(this.value)) {
        $bookmarkContainer.setDefaultState();
      }
      else {
        chrome.bookmarks.search(this.value, addBookMarksFromObj);
      }
    }, 700));

})();
