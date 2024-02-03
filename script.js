
async function showComments() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await response.json();
  const app = document.querySelector(".app");

  comments.forEach(comment => {
    const commentElement = generateElements(comment);
    app.appendChild(commentElement);
  });

  console.log(comments);
}

function generateElements(arrayApi) {
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
    commentsSection.remove();
  })
  action.appendChild(deleteButton);

  return commentsSection;
}

showComments();
