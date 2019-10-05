const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + (b['likes'] || 0), 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })
}

const mostBlogs = (blogs) => { 
  const reducedBlogs = _.reduce(blogs, function (result, blog) {
    (result[blog.author] || (result[blog.author] = [])).push(blog.title)
    return result
  }, {}) 
  Object.keys(reducedBlogs).forEach(e => reducedBlogs[e] = reducedBlogs[e].length)
  const authors = Object.entries(reducedBlogs)
  const author = authors.reduce(function(prev, current) {
    return (prev[1] > current[1]) ? prev : current
  })
  return {author: author[0], blogs: author[1]}
}

const mostLikes = (blogs) => { 
  const reducedBlogs = _.reduce(blogs, function (result, blog) {
    (result[blog.author] || (result[blog.author] = [])).push(blog.likes)
    return result
  }, {}) 
  Object.keys(reducedBlogs).forEach(e => reducedBlogs[e] = reducedBlogs[e].reduce((a, b) => a + b, 0))
  const authors = Object.entries(reducedBlogs)
  const author = authors.reduce(function(prev, current) {
    return (prev[1] > current[1]) ? prev : current
  })
  return {author: author[0], likes: author[1]}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}