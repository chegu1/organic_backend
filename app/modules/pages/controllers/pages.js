const Pages = require('../models/Page');
const asyncHandler = require('express-async-handler');
const {
    RESPONSE_MESSAGES,
    STATUS_CODES } = require('../../../../constants/statusCodeMessage')

/**Create a new page */
exports.createPage = asyncHandler(async (req, res) => {

    const { title, content, keywords } = req.body;
    let createdBy = req.params.userId;
    const createPageData = await new Pages(
        {
            title,
            content,
            keywords,
            createdBy
        })

    const savePageIntoDb = await createPageData.save();

    return successResponse(RESPONSE_MESSAGES.PAGE_CREATED_SUCCESS,
        savePageIntoDb, STATUS_CODES.SUCCESS)
})

/**list of all pages */
exports.listOfAllPages = asyncHandler(async (req, res) => {
    let pagesList = await Pages.find();
    if (!pagesList) {
        return errorResponse(RESPONSE_MESSAGES.NOT_FOUND,
            STATUS_CODES.NOT_FOUND)
    }
    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        pagesList, STATUS_CODES.SUCCESS)
})

/**Get single page based upon id || middleware for Update,Delete*/
exports.pageById = asyncHandler(async (req, res, next, id) => {
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
    let { title, content, keywords } = req.pagesList;

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

    let updateIntoDb = await singlePage.save()

    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        updateIntoDb, STATUS_CODES.SUCCESS)

})

/**Deleting a page */
exports.deletePage = asyncHandler(async (req, res) => {
    let removePage = await Pages.deleteOne({ _id: req.pagesList._id });
    if (!removePage)
        return errorResponse(RESPONSE_MESSAGES.NOT_FOUND,
            STATUS_CODES.NOT_FOUND)
    return successResponse(RESPONSE_MESSAGES.DEFAULT_SUCCESS_MESSAGE,
        removePage, STATUS_CODES.SUCCESS)

})