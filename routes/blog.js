 const express = require('express')
const blogcontroller = require('./../controllers/blogController')
const appconfig = require('../config/appConfig')

let setRouter = (app) => {
    let BASEURL = appconfig.apiVersion + '/blogs'

    app.get(BASEURL + '/all', blogcontroller.getAllBlogs)
    /**
	 * @api {get} /api/v1/blogs/all Get All The Blog Posts.
	 * @apiVersion 1.0.0
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Blog Details Found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(BASEURL + '/view/:blogId', blogcontroller.viewBlogById)
    /**
	 * @api {get} /api/v1/blogs/view/:blogId Get A Single Blog Post.
	 * @apiVersion 1.0.0
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
	    			__v: number
					blogId: "string",
					title: "string",
					description: "string",
					bodyHtml: "string",
					views: number,
					isPublished: boolean,
					category: "string",
					author: "string",
					tags: object(type = array),
					created: "date",
					lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(BASEURL + '/view/author/:author', blogcontroller.viewBlogsByAuthor)
    /**
	 * @api {get} /api/v1/blogs/view/by/author/:author Get All Blogs By A Particular Author.
	 * @apiVersion 1.0.0
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} author author of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.get(BASEURL + '/view/category/:category', blogcontroller.viewBlogsByCategory)
    /**
	 * @api {get} /api/v1/blogs/view/by/category/:category Get All Blogs From A Particular Category.
	 * @apiVersion 1.0.0
	 * @apiGroup Read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} category category of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(BASEURL + '/:blogId/delete', blogcontroller.deleteBlogById)
    /**
	 * @api {post} /api/v1/blogs/:blogId/delete Delete A Blog By blogId.
	 * @apiVersion 1.0.0
	 * @apiGroup Delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.put(BASEURL + '/:blogId/edit', blogcontroller.editBlogById)
    /**
	 * @api {put} /api/v1/blogs/:blogId/edit Edit A Blog By blogId.
	 * @apiVersion 1.0.0
	 * @apiGroup Update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(BASEURL + '/create', blogcontroller.createBlog)
    /**
	 * @api {post} /api/v1/blogs/create Create A Blog Post.
	 * @apiVersion 1.0.0
	 * @apiGroup Create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title title of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} blogBody blogBody of the blog passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(BASEURL + '/:blogId/count/view', blogcontroller.increaseBlogViews)
    /**
	 * @api {get} /api/v1/blogs/:blogId/count/view Increase A Blogs View Count.
	 * @apiVersion 1.0.0
	 * @apiGroup Update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Updated Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
}

module.exports = {
    setRouter: setRouter 
}