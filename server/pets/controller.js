const Model = require("./model");
const OwnerModel = require("../owners/model");

exports.count = (req, res) => {
    Model.find().countDocuments(function (err, count) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(count);
        }
    });
};

exports.getByPage = (req, res) => {
    const pageId = req.params.pageId;

    async function process() {
        try {
            const count = await Model.find().countDocuments();
            const pets = await Model.paginate(
                {},
                {
                    select:
                        "microchip petName email ownerId ownerName membership photoPath registered_at",
                    page: pageId,
                    limit: 20,
                    sort: {
                        _id: -1,
                    },
                }
            );
            if (pets) {
                res.json({
                    pets: pets.docs,
                    count: count,
                });
            } else {
                res.status(404).send("Pets not found");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    process();
};

exports.getById = (req, res) => {
    const _id = req.params._id;

    async function process() {
        try {
            const pet = await Model.findById(_id);
            if (!pet) {
                return res.status(404).send("No Pet found");
            }
            const owner = await OwnerModel.findById(pet.ownerId);
            res.json({ ...pet._doc, ...owner._doc });
        } catch (error) {
            res.status(500).send(error);
        }
    }
    process();
};

exports.editById = (req, res) => {
    const _id = req.params._id;
    const data = req.body;

    async function process() {
        try {
            const pet = await Model.findByIdAndUpdate(_id, data);
            if (pet) {
                const owner = await OwnerModel.findByIdAndUpdate(
                    pet.ownerId,
                    data
                );
                if (owner) {
                    res.json({ ...pet, ...owner });
                } else {
                    res.status(404).send("Owner not found");
                }
            } else {
                res.status(404).send("Pet not found");
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
    process();
};

exports.deleteById = (req, res) => {
    const _id = req.params._id;

    Model.findByIdAndDelete(_id, function (err, pet) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!pet) {
                res.status(404).send("No Pet found");
            } else {
                res.json(pet);
            }
        }
    });
};

exports.register = (req, res) => {
    async function process() {
        const email = req.body.email;
        let ownerId = "";
        try {
            const owner = await OwnerModel.findOneAndUpdate(
                { email: email },
                req.body
            );

            if (owner) {
                ownerId = owner._id;
            } else {
                const newOwner = new OwnerModel(req.body);
                try {
                    const new_owner = await newOwner.save();
                    ownerId = new_owner._id;
                } catch (error) {
                    res.status(500).send(error);
                }
            }
        } catch (error) {
            res.status(500).send(error);
        }

        const microchip = req.body.microchip;
        Model.findOne({ microchip: microchip }, function (err, pet) {
            if (err) {
                res.status(500).send(err);
            } else {
                if (pet) {
                    res.status(403).send("Pet already exist");
                } else {
                    const newPet = new Model({
                        ...req.body,
                        ...{ ownerId: ownerId },
                    });
                    newPet
                        .save()
                        .then((pet) => {
                            res.json(pet);
                        })
                        .catch((err) => {
                            res.status(500).send(err);
                        });
                }
            }
        });
    }
    process();
};

exports.search = (req, res) => {
    const searchCategory = req.body.field;
    const searchValue = req.body.value;

    async function fetchRelatedData() {
        let pets = [];
        switch (searchCategory) {
            case "microchip":
                try {
                    pets = await Model.find({
                        microchip: searchValue,
                    });
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "email":
                try {
                    pets = await Model.find({
                        email: searchValue,
                    });
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "petName":
                try {
                    const pets_data = await Model.paginate(
                        {
                            petName: searchValue,
                        },
                        {
                            page: 1,
                            limit: 20,
                            sort: {
                                _id: -1,
                            },
                        }
                    );
                    pets = pets_data.docs;
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "ownerName":
                try {
                    const pets_data = await Model.paginate(
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
                    pets = pets_data.docs;
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "petBreed":
                try {
                    const pets_data = await Model.paginate(
                        {
                            petBreed: searchValue,
                        },
                        {
                            page: 1,
                            limit: 20,
                            sort: {
                                _id: -1,
                            },
                        }
                    );
                    pets = pets_data.docs;
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            case "implanted":
                try {
                    const pets_data = await Model.paginate(
                        {
                            implantedCompany: searchValue,
                        },
                        {
                            page: 1,
                            limit: 20,
                            sort: {
                                _id: -1,
                            },
                        }
                    );
                    pets = pets_data.docs;
                } catch (error) {
                    return res.status(500).send(error);
                }

                break;

            default:
                return res.status(500).send("Invalid Search Category");
        }

        if (pets.length === 0) {
            res.status(404).send("no result");
        } else {
            return res.json(pets);
        }
    }
    fetchRelatedData();
};
