
const addBookmarkBtn = document.getElementById("add-bookmarkbtn");
const bookmarkNameInput = document.getElementById("bookmarkname");
const bookmarkUrlInput = document.getElementById("bookmarkurl");
const bookmarList = document.getElementById("bookmark-list");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalConfirm = document.getElementById("modal-confirm");
const modalCancel = document.getElementById("modal-cancel");

let modalAction = null;
let modalData = null;

function showModal(message, action, data) {
    modalMessage.textContent = message;
    modal.style.display = "flex";
    modalAction = action;
    modalData = data;
}

function hideModal() {
    modal.style.display = "none";
    modalAction = null;
    modalData = null;
}

modalConfirm.addEventListener("click", function () {
    if (modalAction === "add") {
        const { name, url } = modalData;
        addBookmark(name, url);
        saveBookmark(name, url);
        bookmarkNameInput.value = "";
        bookmarkUrlInput.value = "";
    } else if (modalAction === "delete") {
        const { name, url, li } = modalData;
        bookmarList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    }
    hideModal();
});

modalCancel.addEventListener("click", hideModal);

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        showModal("Please enter both name and url.", null, null);
        return;
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            showModal("Please enter a valid url starting with http:// or https://", null, null);
            return;
        }
        showModal(`Are you sure you want to add the bookmark '${name}'?`, "add", { name, url });
    }
});

function addBookmark(name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        showModal(`Are you sure you want to delete the bookmark '${name}'?`, "delete", { name, url, li });
    });

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







