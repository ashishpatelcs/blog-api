const Blog = require('../models/Blog')
const shortid = require('shortid')
const response = require('../libs/response')
const time = require('../libs/time')
const check = require('../libs/check')
const logger = require('../libs/logger')

let getAllBlogs = (req, res) => {
    Blog.find({}, {_id: 0, __v: 0})
    .then(blogs => {
        if (check.isEmpty(blogs)) {
            logger.captureError('No Blogs Found', 'blogControler : getAllBlogs', 5)
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            logger.captureInfo('All Blogs Found', 'blogControler : getAllBlogs', 0)
            const apiResponse = response.generate(false, 'All blog details found', 200, blogs)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        logger.captureError('Error Occured: ' + error, 'blogControler : getAllBlogs', 10)
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let viewBlogById = (req, res) => {
    let blogId = req.params.blogId
    Blog.find({ blogId }, { _id: 0, __v: 0 })
    .then(blog => {
        if (check.isEmpty(blog)) {
            logger.captureError('No Blog Found', 'blogControler : viewBlogById', 5)
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            logger.captureInfo('Blog Found!', 'blogControler : viewBlogById', 0)
            const apiResponse = response.generate(false, 'blog with id ' + blogId + ' found!', 200, blog)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        logger.captureError('Error occured: ' + error, 'blogControler : viewBlogById', 10)
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let viewBlogsByAuthor = (req, res) => {  
    let author = req.params.author
    Blog.find({ author }, { _id: 0, __v: 0 })
    .then(blogs => {
        if (check.isEmpty(blogs)) {
            logger.captureError('No Blogs Found', 'blogControler : viewBlogsByAuthor', 5)
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            logger.captureInfo('All blog  with ' + author + ' as author found', 'blogControler : viewBlogsByAuthor', 0)
            const apiResponse = response.generate(false, 'All blog  with ' + author + ' as author found', 200, blogs)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        logger.captureError('Error occured: ' + error, 'blogControler : viewBlogsByAuthor', 10)
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let viewBlogsByCategory = (req, res) => {
    let category = req.params.category
    Blog.find({ category }, { _id: 0, __v: 0 })
    .then(blogs => {
        if (check.isEmpty(blogs)) {
            logger.captureError('No Blogs Found', 'blogControler : viewBlogsByCategory', 5)
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            logger.captureInfo('All blog  with ' + category + ' category found', 'blogControler : viewBlogsByCategory', 0)
            const apiResponse = response.generate(false, 'All blog with ' + category + ' category found', 200, blogs)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        logger.captureError('Error occured: ' + error, 'blogControler : viewBlogsByCategory', 10)
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let deleteBlogById = (req, res) => { 
    let blogId = req.params.blogId
    Blog.findOneAndRemove({ blogId })
    .then(blog => {
        logger.captureInfo('blog with id : ' + blogId + ' deleted successfully', 'blogControler : deleteBlogById', 0)
            const apiResponse = response.generate(false, 'blog with id : ' + blogId + ' deleted successfully', 200, null)
            res.json(apiResponse)
    })
    .catch(error => {
        logger.captureError('Error occured: ' + error, 'blogControler : deleteBlogById', 10)
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let editBlogById = (req, res) => {
    let blog = req.body
    blog.lastModified = time.now()
    let id = req.params.blogId

    Blog.findOneAndUpdate(id, blog, {new: true})
    .then(blog => {
        if (check.isEmpty(blog)) {
            logger.captureError('No Blogs Found', 'blogControler : editBlogById', 5)
            const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
            res.json(apiResponse)
        } else {
            logger.captureInfo('blog with id : ' + id + ' edited successfully', 'blogControler : editBlogById', 0)
            const apiResponse = response.generate(false, 'blog edited successfully', 200, blog)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        logger.captureError('Error occured: ' + error, 'blogControler : editBlogById', 10)
        const apiResponse = response.generate(true, 'Error occured!', 500, null)
        res.json(apiResponse)
    })
}

let createBlog = (req, res) => {
    let blog = req.body
    blog.blogId = shortid.generate()
    blog.isPublished = true
    blog.created = time.now()
    blog.lastModified = time.now()

    blog.tags = (blog.tags) ? blog.tags.split(',') : []

    Blog.create(blog)
    .then(blog => {
        if (check.isEmpty(blog)) {
            logger.captureError('No Blogs Found', 'blogControler : createBlog', 5)
            const apiResponse = response.generate(true, 'No Blog Found', 404, null)
            res.json(apiResponse)
        } else {
            logger.captureInfo('blog created successfully!', 'blogControler : createBlog', 0)
            const apiResponse = response.generate(false, 'Blog created successfully', 200, blog)
            res.json(apiResponse)
        }
    })
    .catch(error => {
        logger.captureError('Error occured: ' + error, 'blogControler : createBlog', 10)
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
            if (check.isEmpty(blog)) {
                logger.captureError('No Blogs Found', 'blogControler : increaseBlogViews', 5)
                const apiResponse = response.generate(true, 'No Blogs Found', 404, null)
                res.json(apiResponse)
            } else {
                logger.captureInfo('blog with id ' + blogId + ' views count increased!', 'blogControler : increaseBlogViews', 0)
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
        logger.captureError('Error occured: ' + error, 'blogControler : increaseBlogViews', 10)
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