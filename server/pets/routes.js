const Controller = require("./controller");
const Authentication = require("../services/auth");

exports.routesConfig = function (app) {
    app.get("/admin/pets/page/:pageId", [
        Authentication.authMiddleware,
        Controller.getByPage,
    ]);
    app.get("/admin/pets/:_id", [
        Authentication.authMiddleware,
        Controller.getById,
    ]);
    app.patch("/admin/pets/update/:_id", [
        Authentication.authMiddleware,
        Controller.editById,
    ]);
    app.delete("/admin/pets/delete/:_id", [
        Authentication.authMiddleware,
        Controller.deleteById,
    ]);
    app.post("/admin/pets/register", [
        Authentication.authMiddleware,
        Controller.register,
    ]);
    app.post("/admin/pets/search", [
        Authentication.authMiddleware,
        Controller.search,
    ]);

    // API for External Platforms
};
