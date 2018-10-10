 const express = require('express')
const blogcontroller = require('./../controllers/blogController')
const appconfig = require('../config/appConfig')

let setRouter = (app) => {
    let BASEURL = appconfig.apiVersion + '/blogs'

    app.get(BASEURL + '/all', blogcontroller.getAllBlogs)
    app.get(BASEURL + '/view/:blogId', blogcontroller.viewBlogById)
    app.get(BASEURL + '/view/author/:author', blogcontroller.viewBlogsByAuthor)
    app.get(BASEURL + '/view/category/:category', blogcontroller.viewBlogsByCategory)
    app.post(BASEURL + '/:blogId/delete', blogcontroller.deleteBlogById)
    app.put(BASEURL + '/:blogId/edit', blogcontroller.editBlogById)
    app.post(BASEURL + '/create', blogcontroller.createBlog)
    app.post(BASEURL + '/:blogId/count/view', blogcontroller.increaseBlogViews)
}

module.exports = {
    setRouter: setRouter 
}