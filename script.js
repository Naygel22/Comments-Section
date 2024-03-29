(async () => {
  const inappropriateWord = 'alias';
  let currentPage = 1;
  const commentsPerPage = 20;
  let comments;
  let checkedComments = [];

  async function getComments() {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    comments = await response.json();
  }
  console.log(comments);

  await getComments();

  async function showComments() {

    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const limitedComments = comments.slice(startIndex, endIndex);

    generateElements(limitedComments);
    // const existingHeaders = document.querySelector('.headersBar');
    // app.innerHTML = '';
    // app.appendChild(existingHeaders);

    // limitedComments.forEach(comment => {
    //   comment.innerHTML = '';
    //   const commentElement = generateElements(comment);
    //   app.appendChild(commentElement);
    //   checkForInappropriate(commentElement, comment.name, comment.body);

    // });
  }

  async function filterCommentsByTitles() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    createSelectWithTitles(posts);
  }

  function createSelectWithTitles(arrayApiWithTitles) {
    const selectTitle = document.querySelector('#selectTitle');
    arrayApiWithTitles.forEach(element => {
      const optionTitle = document.createElement('option');
      optionTitle.value = element.id;
      optionTitle.textContent = element.title;
      selectTitle.appendChild(optionTitle);
    });

    selectTitle.addEventListener('change', () => {
      const selectedId = parseInt(selectTitle.value);
      if (selectedId === -1) {
        showComments();
      } else {
        const filteredComments = comments.filter(comment => comment.postId === selectedId);
        generateElements(filteredComments);
      }
    });
  }

  // function showFilteredComments(filteredComments) {
  //   const app = document.querySelector(".app");
  //   const existingHeaders = document.querySelector('.headersBar');
  //   app.innerHTML = '';
  //   app.appendChild(existingHeaders);

  //   filteredComments.forEach(comment => {
  //     const commentElement = generateElements(comment);
  //     app.appendChild(commentElement);
  //     checkForInappropriate(commentElement, comment.name, comment.body);
  //   });
  // }



  function generateElements(comments) {
    const app = document.querySelector(".app");
    const existingHeaders = document.querySelector('.headersBar');
    app.innerHTML = '';
    app.appendChild(existingHeaders);

    comments.forEach(arrayApi => {
      const commentsSection = document.createElement('div');
      commentsSection.classList.add('commentsSection');

      const name = document.createElement('div');
      name.classList.add('name');
      name.textContent = arrayApi.name;
      commentsSection.appendChild(name);

      const email = document.createElement('div');
      email.classList.add('email');
      email.textContent = arrayApi.email;
      commentsSection.appendChild(email);

      const body = document.createElement('div');
      body.classList.add('body');
      body.textContent = arrayApi.body;
      commentsSection.appendChild(body);

      const action = document.createElement('div');
      action.classList.add('action');
      commentsSection.appendChild(action);

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('deleteButton');
      deleteButton.textContent = 'Delete';

      deleteButton.addEventListener('click', () => {
        deleteComment(arrayApi.id);
        console.log(arrayApi.body);
      })
      action.appendChild(deleteButton);


      //selecting comments and deleting selected with a button
      commentsSection.addEventListener('click', () => {
        commentsSection.classList.toggle('selected');
        commentsSection.classList.remove('showChecked');
      })

      const deleteSelectedCommentsButton = document.querySelector('#deleteSelectedCommentsButton');

      deleteSelectedCommentsButton.addEventListener('click', () => {
        if (commentsSection.classList.contains('selected')) {
          deleteComment(arrayApi.id);
          console.log(arrayApi.body);
        }
      })

      
      app.appendChild(commentsSection);
      checkForInappropriate(commentsSection, arrayApi.name, arrayApi.body, arrayApi.id);

    })


  }

  function deleteComment(elementId) {
    const newComments = comments.filter(element => element.id !== elementId);
    comments = newComments;

    // generateElements(newComments);
    showComments();
  }

  checkbox.addEventListener('change', () => {
    showComments();
  })


  function checkForInappropriate(element, name, body, id) {
    const checkbox = document.querySelector('#checkbox');
      const containsInappropriateWord = name.includes(inappropriateWord) || body.includes(inappropriateWord);
      if (checkbox.checked && containsInappropriateWord) {
        element.classList.add('showChecked');
        checkedComments.push(id);
        console.log(checkedComments);
      } else element.classList.remove('showChecked');
  }

  const leftarrow = document.querySelector('#leftarrow');
  const rightarrow = document.querySelector('#rightarrow');

  leftarrow.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showComments();
    }
  });

  rightarrow.addEventListener('click', () => {
    const maxPage = Math.ceil(comments.length / commentsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      showComments();
    }

  })
  const findWordsInput = document.querySelector('#findWordsInput');

  function findWords() {
    const app = document.querySelector(".app");
    const existingHeaders = document.querySelector('.headersBar');
    app.innerHTML = '';
    app.appendChild(existingHeaders);

    const wordToFind = findWordsInput.value;
    const filteredComments = comments.filter(comment =>
      comment.name.includes(wordToFind) || comment.email.includes(wordToFind) || comment.body.includes(wordToFind)
    );

    generateElements(filteredComments);
  }

  findWordsInput.addEventListener('input', findWords);

  showComments();
  filterCommentsByTitles();
})();