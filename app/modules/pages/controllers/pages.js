const Pages = require('../models/Page');
const asyncHandler = require('express-async-handler');
const {
    RESPONSE_MESSAGES,
    STATUS_CODES } = require('../../../../constants/statusCodeMessage')

/**Create a new page */
exports.createPage = asyncHandler(async (req, res) => {

    const { title, content, keywords } = req.body;
    /**User id-->Created by user */
    let createdBy = req.params.userId;
    /**Created page */
    const createPageData = await new Pages(
        {
            title,
            content,
            keywords,
            createdBy
        })
    /**Saved into the database */
    const savePageIntoDb = await createPageData.save();

    return successResponse(RESPONSE_MESSAGES.PAGE_CREATED_SUCCESS,
        savePageIntoDb, STATUS_CODES.SUCCESS)
})

/**list of all pages */
exports.listOfAllPages = asyncHandler(async (req, res) => {
    /**List of all pages */
    let pagesList = await Pages.find();
    /**If Pages not found */
    if (!pagesList) {
        return errorResponse(RESPONSE_MESSAGES.NOT_FOUND,
            STATUS_CODES.NOT_FOUND)
    }
    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        pagesList, STATUS_CODES.SUCCESS)
})

/**Get single page based upon id || middleware for Update,Delete*/
exports.pageById = asyncHandler(async (req, res, next, id) => {
    /**Single page */
    let pagesList = await Pages.findById(id);
    if (!pagesList) {
        return errorResponse(RESPONSE_MESSAGES.NOT_FOUND,
            STATUS_CODES.NOT_FOUND)
    }
    req.pagesList = pagesList;
    next();
})

/**Single page */
exports.singlePage = (req, res) => {
    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        req.pagesList, STATUS_CODES.SUCCESS)
}

/**Update Page by id */
exports.updatePage = asyncHandler(async (req, res) => {
    /**Original values */
    let { title, content, keywords } = req.pagesList;
    /**FInd particular page to update with new values */
    let singlePage = await Pages.findOne({ _id: req.pagesList._id });
    if (req.body.title) {
        title = req.body.title
    }
    if (req.body.content) {
        content = req.body.content
    }
    if (req.body.keywords) {
        keywords = req.body.keywords
    }
    /**Saving values into the database */
    let updateIntoDb = await singlePage.save()

    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        updateIntoDb, STATUS_CODES.SUCCESS)

})

/**Deleting a page */
exports.deletePage = asyncHandler(async (req, res) => {
    /**Delete single page */
    let removePage = await Pages.deleteOne({ _id: req.pagesList._id });
    if (!removePage)
        return errorResponse(RESPONSE_MESSAGES.NOT_FOUND,
            STATUS_CODES.NOT_FOUND)
    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        removePage, STATUS_CODES.SUCCESS)

})