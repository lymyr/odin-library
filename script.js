const myLibrary = [];

function Book(title, author, haveRead=false, pages=undefined) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book); 
  renderLibrary();
}

function assignReadTxt(bookContainer, book=undefined) {
  if (book != undefined) {
    if (book.haveRead)
      book.haveRead = false;
    else
      book.haveRead = true;
  }
  return bookContainer.classList.contains("read") ? "unread" : "read"
}

function renderLibrary() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  myLibrary.forEach(book => displayBook(book));
}

const library = document.querySelector(".library");
function displayBook(book) {
  const bookContainer = document.createElement("div");
  const title = document.createElement("h1");
  const author = document.createElement("h2");
  const pages = document.createElement("p");
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;

  bookContainer.setAttribute("class", "book");
  if (book.haveRead) {
    bookContainer.setAttribute("class", "book read");
  }

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    renderLibrary();
  });
  const readButton = document.createElement("button");
  readButton.textContent = assignReadTxt(bookContainer);
  readButton.addEventListener("click", (e) => {
    e.target.parentElement.classList.toggle("read");
    e.target.textContent = assignReadTxt(e.target.parentElement, book);
  });

  bookContainer.append(title, author, pages, removeButton, readButton);
  library.append(bookContainer);
}

const book2 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", true, 223);
addBookToLibrary(book2);

const book3 = new Book("The Hobbit", "J.R.R. Tolkien", false, 310);
addBookToLibrary(book3);

const book4 = new Book("1984", "George Orwell", true, 328);
addBookToLibrary(book4);

const book5 = new Book("The Great Gatsby", "F. Scott Fitzgerald", false, 180);
addBookToLibrary(book5);


const dialog = document.querySelector("dialog")
const addBook = document.querySelector(".controls button");
addBook.addEventListener("click", () => {
  dialog.showModal();
});

const submitBtn = document.querySelector("form button");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputTitle = document.querySelector("#title");
  const inputAuthor = document.querySelector("#author");
  const inputPages = document.querySelector('#pages');
  const inputRead = document.querySelector("#hasRead");
  
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    const inputBook = new Book(inputTitle.value, inputAuthor.value, inputRead.checked, inputPages.value);
    addBookToLibrary(inputBook);
    const form = document.querySelector("form")
    form.reset();
    dialog.close();
  }
  else {
    const inv = form.querySelectorAll(":invalid");
    inv.forEach((input) => {
      input.setAttribute("style", "border:2px solid red; transition:200ms");
    })
  }
})

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", (e) => {
    e.target.setAttribute("style", "transition:200ms; border:none; transition: 200ms");
  })
})