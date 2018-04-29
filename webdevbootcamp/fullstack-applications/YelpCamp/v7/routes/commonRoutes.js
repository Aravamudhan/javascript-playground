const express = require('express'),
    router = express.Router({
        mergeParams: true
    });

function renderError(req, res) {
    let errorMessage = req.query.errorMessage;
    res.render("error", {
        errorMessage
    });
}
router.get("/error", renderError);
module.exports = router;