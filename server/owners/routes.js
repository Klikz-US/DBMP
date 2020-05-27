const Controller = require("./controller");
const Authentication = require("../services/auth");

exports.routesConfig = function (app) {
    app.get("/admin/owners/count", [
        Authentication.authMiddleware,
        Controller.count,
    ]);
    app.get("/admin/owners/page/:pageId", [
        Authentication.authMiddleware,
        Controller.getByPage,
    ]);
    app.get("/admin/owners/:_id", [
        Authentication.authMiddleware,
        Controller.getById,
    ]);
    app.patch("/admin/owners/edit/:_id", [
        Authentication.authMiddleware,
        Controller.editById,
    ]);
    app.delete("/admin/owners/delete/:_id", [
        Authentication.authMiddleware,
        Controller.deleteById,
    ]);
    app.post("/admin/owners/register", [
        Authentication.authMiddleware,
        Controller.register,
    ]);
    app.post("/admin/owners/search", [
        Authentication.authMiddleware,
        Controller.search,
    ]);
};
