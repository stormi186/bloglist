const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const emptyList = []

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '123456',
      title: 'First blog',
      author: 'Me',
      url: 'http://me.com',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const listWithMultipleBlogs = [
    {
      _id: '123456',
      title: 'First blog',
      author: 'Me',
      url: 'http://me.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '789123',
      title: 'Second blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '456789',
      title: 'Third blog',
      author: 'Him',
      url: 'http://him.com',
      likes: 15,
      __v: 0
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(30)
  })
})

describe('favorite blog', () => {

  const listWithMultipleBlogs = [
    {
      _id: '123456',
      title: 'First blog',
      author: 'Me',
      url: 'http://me.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '789123',
      title: 'Second blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '456789',
      title: 'Third blog',
      author: 'Him',
      url: 'http://him.com',
      likes: 15,
      __v: 0
    }
  ]

  test('of returning the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(listWithMultipleBlogs[2])
  })
})

describe('most blogs', () => {

  const listWithMultipleBlogs = [
    {
      _id: '123456',
      title: 'Me first blog',
      author: 'Me',
      url: 'http://me.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '789123',
      title: 'You first blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '789123',
      title: 'You second blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '789123',
      title: 'You third blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '456789',
      title: 'Him first blog',
      author: 'Him',
      url: 'http://him.com',
      likes: 15,
      __v: 0
    }
  ]

  test('of returning the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual({author: 'You', blogs: 3})
  })
})

describe('most author likes', () => {

  const listWithMultipleBlogs = [
    {
      _id: '123456',
      title: 'Me first blog',
      author: 'Me',
      url: 'http://me.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '789123',
      title: 'You first blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '789123',
      title: 'You second blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '789123',
      title: 'You third blog',
      author: 'You',
      url: 'http://you.com',
      likes: 10,
      __v: 0
    },
    {
      _id: '456789',
      title: 'Him first blog',
      author: 'Him',
      url: 'http://him.com',
      likes: 15,
      __v: 0
    }
  ]

  test('of returning the author with largest amount of likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual({author: 'You', likes: 30})
  })
})