const addBookmarkBtn = document.getElementById("add-bookmarkbtn")
const bookmarkNameInput = document.getElementById("bookmarkname")
const bookmarkUrlInput = document.getElementById("bookmarkurl")
const bookmarList = document.getElementById("bookmark-list")


document.addEventListener("DOMContentLoaded", loadBookmarks)

addBookmarkBtn.addEventListener("click", function (){
    const name =bookmarkNameInput.value.trim()
    const url = bookmarkUrlInput.value.trim()
    
    if(!name||!url){
        alert("Please enter both name and url");
        return;
    } else{
        if (!url.startsWith("http://") && !url.startsWith("https://")){
            alert("please enter a valid url starting with http:// or https://")
            return;
        }

        addBookmark(name,url);
        saveBookmark(name,url);
        bookmarkNameInput.value =""
        bookmarkUrlInput.value =""
    }
});

function addBookmark(name,url){
    const li = document.createElement("li")
    const link = document.createElement("a")
    link.href =url
    link.textContent= name
    link.target = "_blank"


    const removeButton = document.createElement("button")
    removeButton.textContent ="Remove"
    removeButton.addEventListener("click", function(){
        bookmarList.removeChild(li)
        removeBookmarkFromStorage(name,url)
    })

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarList.appendChild(li);
}

function getBookmarkFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : [];
}
function saveBookmark(name,url){
    const bookmarks = getBookmarkFromStorage();
     bookmarks.push({name,url});
     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}


function loadBookmarks(){
     const bookmarks = getBookmarkFromStorage()
     bookmarks.forEach((bookmark) => addBookmark(bookmark.name,bookmark.url))

}

function removeBookmarkFromStorage(name,url){
     let bookmarks = getBookmarkFromStorage();
     bookmarks = bookmarks.filter((bookmark) => bookmark.name !==name || bookmark.url !==url);
     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}







