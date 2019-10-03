const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Me first blog',
    author: 'Me',
    url: 'http://me.com',
    likes: 5
  },
  {
    title: 'You first blog',
    author: 'You',
    url: 'http://you.com',
    likes: 10
  },
  {
    title: 'You second blog',
    author: 'You',
    url: 'http://you.com',
    likes: 10
  },
  {
    title: 'You third blog',
    author: 'You',
    url: 'http://you.com',
    likes: 10
  },
  {
    title: 'Him first blog',
    author: 'Him',
    url: 'http://him.com',
    likes: 15
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}