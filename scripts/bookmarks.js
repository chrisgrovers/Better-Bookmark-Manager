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
  chrome.browserAction.onClicked.addListener(function(tab) {

  });
  $('.button').on('click', function() {
    chrome.bookmarks.getTree(function(marks) {
      console.log(marks)
    });
  })
})();
