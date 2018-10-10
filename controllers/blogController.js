const Blog = require('../models/Blog')
const shortid = require('shortid')

let getAllBlogs = (req, res) => {
    Blog.find({}, {_id: 0, __v: 0})
    .then(blogs => {
        res.json({
            status: 200,
            message: 'success',
            data: blogs
        })
    })
    .catch(error => {
        res.json({
            message: 'some error occured'
        })
    })
}

let viewBlogById = (req, res) => {
    let blogId = req.params.blogId
    Blog.find({ blogId }, { _id: 0, __v: 0 })
    .then(blog => {
        res.json({
            status: 200,
            message: 'success',
            data: blog
        })
    })
    .catch(error => {
        res.json({
            message: 'some error occured' 
        })
    })
}

function viewBlogsByAuthor(req, res) {  
}

function viewBlogsByCategory(req, res) {
}

function deleteBlogById(req, res) { 
}

let editBlogById = (req, res) => {
    let blog = req.body
    blog.lastModified = new Date()
    let id = req.params.blogId

    Blog.findOneAndUpdate(id, blog, {new: true})
    .then(post => {
        res.json({
            status: 200,
            message: 'success'
        })
    })
    .catch(error => {
        res.json({
            message: 'some error occured' 
        })
    })
}

let createBlog = (req, res) => {
    let blog = req.body
    blog.blogId = shortid.generate()
    blog.isPublished = true

    blog.tags = (blog.tags) ? blog.tags.split(',') : []

    Blog.create(blog)
    .then(post => {
        res.json({
            status: 200,
            message: 'success',
            data: post
        })
    })
    .catch(error => {
        res.json({
            message: 'some error occured' 
        })
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
        .then(post => {
            res.json({
                status: 200,
                message: 'success',
                data: post
            })
        })
        .catch(error => {
            res.json({
                message: 'some error occured' 
            })
        })
    })
    .catch(error => {
        res.json({
            message: 'some error' 
        })
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