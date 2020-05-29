const Model = require("./model");
const PetModel = require("../pets/model");

exports.getByPage = (req, res) => {
    const pageId = req.params.pageId;

    async function process() {
        try {
            const count = await Model.find().countDocuments();
            const owners = await Model.paginate(
                {},
                {
                    select:
                        "ownerName email ownerPhone1 ownerCity ownerState registered_at",
                    page: pageId,
                    limit: 20,
                    sort: {
                        _id: -1,
                    },
                }
            );
            if (owners) {
                res.json({
                    owners: owners.docs,
                    count: count,
                });
            } else {
                res.status(404).send("Owners not found");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    process();
};

exports.getById = (req, res) => {
    const _id = req.params._id;
    Model.findOne({ _id: _id }, function (err, owner) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!owner) {
                res.status(404).send("No Owner found");
            } else {
                res.json(owner);
            }
        }
    });
};

exports.editById = (req, res) => {
    const _id = req.params._id;
    const data = req.body;

    async function process() {
        try {
            const owner = await Model.findByIdAndUpdate(_id, data);
            if (owner) {
                const pet = await PetModel.findOneAndUpdate(
                    { email: owner.email },
                    {
                        ownerName: data.ownerName,
                    }
                );
                res.json({ ...owner, ...pet });
            } else {
                res.status(404).send("Owner not found");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    process();
};

exports.deleteById = (req, res) => {
    const _id = req.params._id;

    Model.findOneAndDelete({ _id: _id }, function (err, owner) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!owner) {
                res.status(404).send("No Owner found");
            } else {
                res.json(owner);
            }
        }
    });
};

exports.register = (req, res) => {
    const email = req.body.email;
    Model.findOne({ email: email }, function (err, owner) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (owner) {
                res.status(403).send("Owner already exist");
            } else {
                const newOwner = new Model(req.body);
                newOwner
                    .save()
                    .then((owner) => {
                        res.json(owner);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        }
    });
};

exports.search = (req, res) => {
    const searchCategory = req.body.field;
    const searchValue = req.body.value;

    async function fetchRelatedData() {
        let owners = [];
        switch (searchCategory) {
            case "email":
                try {
                    owners = await Model.find({
                        email: searchValue,
                    });
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "ownerName":
                try {
                    const owners_data = await Model.paginate(
                        {
                            ownerName: searchValue,
                        },
                        {
                            page: 1,
                            limit: 20,
                            sort: {
                                _id: -1,
                            },
                        }
                    );
                    owners = owners_data.docs;
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "ownerState":
                try {
                    const owners_data = await Model.paginate(
                        {
                            ownerState: searchValue,
                        },
                        {
                            page: 1,
                            limit: 20,
                            sort: {
                                _id: -1,
                            },
                        }
                    );
                    owners = owners_data.docs;
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            default:
                return res.status(404).send("Invalid Search Category");
        }

        if (owners.length === 0) {
            res.status(404).send("no result");
        } else {
            return res.json(owners);
        }
    }
    fetchRelatedData();
};
