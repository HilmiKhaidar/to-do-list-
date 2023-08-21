 const BOOKS_KEY = 'books';

    function updateLocalStorage(books) {
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }

    function getBooksFromLocalStorage() {
      const storedBooks = localStorage.getItem(BOOKS_KEY);
      return storedBooks ? JSON.parse(storedBooks) : [];
    }

    function renderBook(book, parentElement) {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book-item');
      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        <button class="move-btn">Pindahkan</button>
        <button class="delete-btn">Hapus</button>
      `;

      const moveBtn = bookItem.querySelector('.move-btn');
      const deleteBtn = bookItem.querySelector('.delete-btn');

      moveBtn.addEventListener('click', () => {
        book.isComplete = !book.isComplete;
        updateBookshelfUI();
      });

      deleteBtn.addEventListener('click', () => {
        const index = books.findIndex(b => b.id === book.id);
        if (index !== -1) {
          books.splice(index, 1);
          updateLocalStorage(books);
          updateBookshelfUI();
        }
      });

      parentElement.appendChild(bookItem);
    }

    function updateBookshelfUI() {
      incompleteList.innerHTML = '';
      completeList.innerHTML = '';

      books.forEach(book => {
        if (book.isComplete) {
          renderBook(book, completeList);
        } else {
          renderBook(book, incompleteList);
        }
      });

      updateLocalStorage(books);
    }

    const form = document.getElementById('book-form');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const yearInput = document.getElementById('year');
    const isCompleteInput = document.getElementById('is-complete');
    const incompleteList = document.getElementById('incomplete-list');
    const completeList = document.getElementById('complete-list');

    let books = getBooksFromLocalStorage();

    form.addEventListener('submit', e => {
      e.preventDefault();

      const newBook = {
        id: +new Date(),
        title: titleInput.value,
        author: authorInput.value,
        year: parseInt(yearInput.value),
        isComplete: isCompleteInput.checked,
      };

      books.push(newBook);
      updateBookshelfUI();

      titleInput.value = '';
      authorInput.value = '';
      yearInput.value = '';
      isCompleteInput.checked = false;
    });

    updateBookshelfUI();