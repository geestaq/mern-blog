// get all posts
exports.getPosts = function (req, res) {
  const data = [
    { id: "1", title: 'Lorem Ipsum', content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit' },
    { id: "2", title: 'Lorem Ipsum II', content: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit' },
  ]
  res.json(data);
};
