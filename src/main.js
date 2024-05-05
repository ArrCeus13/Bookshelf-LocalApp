(() => {
    let books = JSON.parse(localStorage.getItem("books")) || [];

    document.addEventListener("DOMContentLoaded", () => {
        displayBooks();
        document.querySelector("#inputBook").addEventListener("submit", handleBookSubmit);
        document.querySelector("#searchBook").addEventListener("submit", handleSearch);
    });

    function handleBookSubmit(event) {
        event.preventDefault();
        const title = document.querySelector("#inputBookTitle").value,
              author = document.querySelector("#inputBookAuthor").value,
              yearInput = document.querySelector("#inputBookYear"),
              year = parseInt(yearInput.value),
              isComplete = document.querySelector("#inputBookIsComplete").checked,
              idInput = document.querySelector("#inputBookId"),
              id = idInput.value ? parseInt(idInput.value) : Date.now();
    
        // if (year.length !== 4 || isNaN(year)) {
        //     alert("Tahun harus berisi 4 angka valid.");
        //     yearInput.focus();
        //     return;
        // }
    
        // const currentYear = new Date().getFullYear();
        // if (year < 1900 || year > currentYear) {
        //     alert("Tahun harus dalam rentang yang diketahui.");
        //     yearInput.focus();
        //     return;
        // }
    
        const index = books.findIndex(book => book.id === id);
        const newBook = { id, title, author, year, isComplete };
    
        if (index === -1) {
            books.push(newBook);
        } else {
            books[index] = newBook;
        }
    
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
        resetForm();
    }
    

    function handleSearch(event) {
        event.preventDefault();
        const query = document.querySelector("#searchBookTitle").value.toLowerCase();
        displayBooks(books.filter(book => book.title.toLowerCase().includes(query)));
    }

    function displayBooks(filteredBooks = books) {
        const incompleteList = document.querySelector("#incompleteBookshelfList"),
              completeList = document.querySelector("#completeBookshelfList");
    
        incompleteList.innerHTML = '';
        completeList.innerHTML = '';
    
        filteredBooks.forEach(book => {
            const bookElement = document.createElement("article");
            bookElement.classList.add("book_item");
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                <div class="action">
                    <button class="edit">Edit</button>
                    <button class="delete">Hapus</button>
                    <button class="${book.isComplete ? 'incomplete' : 'complete'}">${book.isComplete ? 'Belum Selesai dibaca' : 'Selesai dibaca'}</button>
                </div>
            `;
            book.isComplete ? completeList.appendChild(bookElement) : incompleteList.appendChild(bookElement);
    
            bookElement.querySelector('.edit').addEventListener('click', () => showEditForm(book.id));
            bookElement.querySelector('.delete').addEventListener('click', () => confirmDelete(book.id));
            bookElement.querySelector(book.isComplete ? '.incomplete' : '.complete').addEventListener('click', () => toggleBookStatus(book.id));

        });
    }
    

    function toggleBookStatus(id) {
        const index = books.findIndex(book => book.id === id);
        if (index !== -1) {
            books[index].isComplete = !books[index].isComplete;
            localStorage.setItem("books", JSON.stringify(books));
            displayBooks();
        }
    }

    function confirmDelete(id) {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Sudahkah Cukup Ilmu Yang Anda Dapatkan Dari Buku Ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                books = books.filter(book => book.id !== id);
                localStorage.setItem("books", JSON.stringify(books));
                Swal.fire(
                    'Dihapus!',
                    'Buku Anda telah dihapus.',
                    'success'
                )
                displayBooks();
            }
        });
    }

    function showEditForm(id) {
        const book = books.find(book => book.id === id);
        document.querySelector("#inputBookId").value = book.id;
        Swal.fire({
            title: 'Edit Book',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Title" value="${book.title}">
                <input id="swal-input2" class="swal2-input" placeholder="Author" value="${book.author}">
                <input id="swal-input3" class="swal2-input" placeholder="Year" value="${book.year}">`,
            focusConfirm: false,
            preConfirm: () => {
                const title = document.getElementById('swal-input1').value,
                      author = document.getElementById('swal-input2').value,
                      yearInput = document.getElementById('swal-input3'),
                      year = parseInt(yearInput.value);
    
                // if (year.length !== 4 || isNaN(year)) {
                //     Swal.showValidationMessage("Tahun harus berisi 4 angka valid.");
                //     yearInput.focus();
                //     return false;
                // }
    
                // const currentYear = new Date().getFullYear();
                // if (year < 1900 || year > currentYear) {
                //     Swal.showValidationMessage("Tahun harus dalam rentang yang diketahui.");
                //     yearInput.focus();
                //     return false;
                // }
    
                return { title, author, year };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { title, author, year } = result.value;
                const index = books.findIndex(book => book.id === id);
                if (index !== -1) {
                    books[index].title = title;
                    books[index].author = author;
                    books[index].year = year;
                    localStorage.setItem("books", JSON.stringify(books));
                    displayBooks();
                }
            }
        });
    }
    

    function resetForm() {
        document.querySelector("#inputBook").reset();
        document.querySelector("#inputBookId").value = '';
    }
})();
