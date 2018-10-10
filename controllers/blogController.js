const Blog = require('../models/Blog')
const shortid = require('shortid')
const response = require('../libs/response')

let getAllBlogs = (req, res) => {
    Blog.find({}, {_id: 0, __v: 0})
    .then(blogs => {
        if (blogs === null || blogs === undefined || blogs === '') {
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            const apiResponse = response.generate(false, 'All blog details found', 200, blogs)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let viewBlogById = (req, res) => {
    let blogId = req.params.blogId
    Blog.find({ blogId }, { _id: 0, __v: 0 })
    .then(blog => {
        if (blog === null || blog === undefined || blog === '') {
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            const apiResponse = response.generate(false, 'blog with id ' + blogId + ' found!', 200, blog)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let viewBlogsByAuthor = (req, res) => {  
    let author = req.params.author
    Blog.find({ author }, { _id: 0, __v: 0 })
    .then(blogs => {
        if (blogs === null || blogs === undefined || blogs === '') {
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            const apiResponse = response.generate(false, 'All blog  with ' + author + ' as author found', 200, blogs)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let viewBlogsByCategory = (req, res) => {
    let category = req.params.category
    Blog.find({ category }, { _id: 0, __v: 0 })
    .then(blogs => {
        if (blogs === null || blogs === undefined || blogs === '') {
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            const apiResponse = response.generate(false, 'All blog with ' + category + ' category found', 200, blogs)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let deleteBlogById = (req, res) => { 
    let blogId = req.params.blogId
    Blog.findOneAndRemove({ blogId })
    .then(blog => {
            const apiResponse = response.generate(false, 'blog with id : ' + blogId + ' deleted successfully', 200, null)
            res.json(apiResponse)
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let editBlogById = (req, res) => {
    let blog = req.body
    blog.lastModified = new Date()
    let id = req.params.blogId

    Blog.findOneAndUpdate(id, blog, {new: true})
    .then(blog => {
        if (blog === null || blog === undefined || blog === '') {
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            const apiResponse = response.generate(false, 'blog editted successfully', 200, blog)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let createBlog = (req, res) => {
    let blog = req.body
    blog.blogId = shortid.generate()
    blog.isPublished = true

    blog.tags = (blog.tags) ? blog.tags.split(',') : []

    Blog.create(blog)
    .then(blog => {
        if (blog === null || blog === undefined || blog === '') {
            const apiResponse = response.generate(true, 'No Blog Found', 404, null)
            res.json(apiResponse)
        } else {
            const apiResponse = response.generate(false, 'Blog created successfully', 200, blog)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let increaseBlogViews = (req, res) => {
    let blogId = req.params.blogId
    Blog.find({ blogId })
    .then(blog => {
        let post = blog[0]
        post.views += 1
        // console.log(post)
        Blog.findOneAndUpdate(blogId, post, {new: true})
        .then(blog => {
            if (blog === null || blog === undefined || blog === '') {
                const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
                res.json(apiResponse)
            } else {
                const apiResponse = response.generate(false, 'blog views count increased!', 200, blog)
                res.json(apiResponse)
            }
        })
        .catch(error => {
            const apiResponse = response.generate(true, 'Error occured!', 500, null)
            res.json(apiResponse)
        })
    })
    .catch(error => {
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

module.exports = {
    getAllBlogs,
    viewBlogById,
    viewBlogsByAuthor,
    viewBlogsByCategory,
    deleteBlogById,
    editBlogById,
    createBlog,
    increaseBlogViews
}