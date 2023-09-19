const library = (() => {
    const container= document.querySelector(".container");
    const newBook= document.querySelector(".newBook");
    const bookForm= document.querySelector("#bookForm");
    const closeForm= document.querySelector(".close");
    const bookTitle= document.querySelector("#title");
    const bookAuthor= document.querySelector("#author");
    const bookPages= document.querySelector("#pages");
    const bookYes= document.querySelector("#yes");
    const titleError = document.querySelector(".titleError");
    const authorError = document.querySelector(".authorError");
    const pagesError = document.querySelector(".pagesError");

    const myLibrary=[];

    class Book{
        constructor (title, author, pages, status){
            this.title= title;
            this.author= author;
            this.pages= pages;
            this.status= status;
        };
    };

    function addBookToLibrary(book){
        myLibrary.push(book);
    };

    bookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (bookTitle.validity.valid && bookAuthor.validity.valid && bookPages.validity.valid) {
            validateForm();
            checkInBook();
        } else {
            validateForm();
        }
    });

    const validateForm = () => {
        validateTitle();
        validateAuthor();
        validatePages();
    };

    const validateTitle = () => {
        if (bookTitle.validity.valueMissing) {
            titleError.classList.add("activeError");
            titleError.innerText = "Title Required";
        } else {
            titleError.innerText = "";
        }
    };

    const validateAuthor = () => {
        if (bookAuthor.validity.valueMissing) {
            authorError.classList.add("activeError");
            authorError.innerText = "Author Required";
        } else {
            authorError.innerText = "";
        }
    }

    const validatePages = () => {
        if (bookPages.validity.valueMissing) {
            pagesError.classList.add("activeError");
            pagesError.innerText = "Page Count Required";
        } else {
            pagesError.innerText = "";
        }
    }

    const checkInBook = () => {
        (bookYes.checked === true) ? bookStatus = "Read" : bookStatus = "Not Read";
        const book= new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus);
        addBookToLibrary(book);
        displayBook(myLibrary);
        bookForm.reset();
    };

    const displayBook = (array) => {
        clearElement(container);
        array.forEach(book => {
            const bookCard= document.createElement("div");
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

    const clearElement = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    };

    newBook.addEventListener("click", () =>{
        newBook.setAttribute("style", "display:none;");
        bookForm.setAttribute("style", "display: block");
        closeForm.setAttribute("style", "display: flex;");
    });

    closeForm.addEventListener("click", () => {
        newBook.setAttribute("style", "display:block;");
        bookForm.setAttribute("style", "display:none;");
        closeForm.setAttribute("style", "display:none;");
    });
})();