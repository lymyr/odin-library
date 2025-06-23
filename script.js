const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToLibrary() {

}

function addNewBook