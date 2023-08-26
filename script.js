const myLibrary=[];

function Book(title, author, pages, status){
    this.title= title;
    this.author= author;
    this.pages= pages;
    this.status= status;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

const container= document.querySelector(".container");
const newBook= document.querySelector(".newBook");
const bookForm= document.querySelector("#bookForm");
const closeForm= document.querySelector(".close");
const bookTitle= document.querySelector("#title");
const bookAuthor= document.querySelector("#author");
const bookPages= document.querySelector("#pages");
const bookStatus= document.querySelector("#status");
const submit= document.querySelector(".submit");
 
submit.addEventListener("click", (e) => {
    let book1= new Book(bookTitle, bookAuthor, bookPages, bookStatus);
    //input is blank
    console.log(bookTitle.innerText)
    addBookToLibrary(book1);
    e.preventDefault();
    console.table(myLibrary);
    displayBook(myLibrary);
    bookForm.reset();
});

function displayBook(array){
    array.forEach(book => {
        const bookCard= document.createElement("div");
        submit.addEventListener("click", () => {
            bookCard.remove();
        });
        bookCard.setAttribute("style", "display:flex; font-size: 2rem;");
        bookCard.innerText = `"${book.title}", ${book.author}, ${book.pages} pages`;
        container.appendChild(bookCard);
        const statusBook= document.createElement("button");
        (book.status == "Not Read") ? 
            statusBook.innerText= "Not Read" : statusBook.innerText= "Read";
        statusBook.setAttribute("style", "margin-left: 10px;");
        bookCard.appendChild(statusBook);
        statusBook.addEventListener("click", () => {
            statusBook.innerText= "Read";
            book.status = "Read";
        });
        const removeCard= document.createElement("button");
        removeCard.innerText= "X";
        removeCard.setAttribute("style", "margin-left: 10px;");
        bookCard.appendChild(removeCard);
        removeCard.addEventListener("click", () => {
            bookCard.remove();
            let i= array.indexOf(book);
            array.splice(i, 1);
        });
    });
};

newBook.addEventListener("click", () =>{
    bookForm.setAttribute("style", "display:block");
    closeForm.setAttribute("style", "display: flex;");
});

closeForm.addEventListener("click", () => {
    bookForm.setAttribute("style", "display:none;");
    closeForm.setAttribute("style", "display:none;");
});
