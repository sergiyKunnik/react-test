export const commentsService = {
  getAll,
  create,
};

function getAll(projectId) {
  const key = `comments-${projectId}`;
  console.log('key => ', key)
  let comments = localStorage.getItem(key);
  if (comments) {
    comments = JSON.parse(comments);
  } else {
    comments = []
  }
  return comments;
}

function create(projectId, comment) {
  const key = `comments-${projectId}`;
  const newComment = {text: comment};
  let comments = localStorage.getItem(key);
  console.log('comments => ', comments)
  if (comments) {
    comments = JSON.parse(comments);
  } else {
    comments = []
  }
  comments.push(newComment);
  comments = JSON.stringify(comments);
  localStorage.setItem(key, comments)
  return newComment;
}