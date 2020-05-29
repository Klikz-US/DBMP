import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import csc from "country-state-city";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import { verifyTokenAsync } from "../actions/auth-async.action";
import { setAuthToken } from "../services/auth.service";
import { useFormInput } from "../utils/form-input.util";
import { useFormCheck } from "../utils/form-check.util";
import { petRegisterService } from "../services/pet.service";
import { photoAddService } from "../services/photo.service";

import nophoto from "../assets/nophoto.png";

export default function PetRegister() {
    /*
     * Private Page Token Verification Module.
     */
    const auth_obj = useSelector((state) => state.auth);
    const { token, expiredAt } = auth_obj;
    const dispatch = useDispatch();
    useEffect(() => {
        setAuthToken(token);
        const verifyTokenTimer = setTimeout(() => {
            dispatch(verifyTokenAsync(true));
        }, moment(expiredAt).diff() - 10 * 1000);
        return () => {
            clearTimeout(verifyTokenTimer);
        };
    }, [expiredAt, token, dispatch]);
    /* ----------------------- */

    const history = useHistory();
    const [formError, setFormError] = useState("");

    const microchip = useFormInput("");
    const petName = useFormInput("");
    const petSpecies = useFormInput("");
    const petBreed = useFormInput("");
    const petColor = useFormInput("");
    const petGender = useFormCheck("");
    const petBirth = useFormInput("");
    const specialNeeds = useFormInput("");
    const vetInfo = useFormInput("");
    const dateRV = useFormInput("");
    const implantedCompany = useFormInput("");
    const email = useFormInput("");
    const ownerName = useFormInput("");
    const ownerPhone1 = useFormInput("");
    const ownerPhone2 = useFormInput("");
    const ownerPhone3 = useFormInput("");
    const ownerPhone4 = useFormInput("");
    const ownerPhone5 = useFormInput("");
    const ownerPhone6 = useFormInput("");
    const ownerPhone7 = useFormInput("");
    const ownerAddress1 = useFormInput("");
    const ownerAddress2 = useFormInput("");
    const ownerCity = useFormInput("");
    const ownerState = useFormInput("");
    const ownerZip = useFormInput("");
    const ownerCountry = useFormInput("US");
    const ownerSecContact = useFormInput("");
    const ownerNote = useFormInput("");

    const [petPhoto, setpetPhoto] = useState("");
    const [petPhotoPath, setPetPhotoPath] = useState("");
    const [petPhotoPreview, setPetPhotoPreview] = useState(nophoto);

    const handleSubmit = (e) => {
        e.preventDefault();

        const pet = {
            microchip: microchip.value,
            petName: petName.value,
            petSpecies: petSpecies.value,
            petBreed: petBreed.value,
            petColor: petColor.value,
            petGender: petGender.value,
            petBirth: petBirth.value,
            specialNeeds: specialNeeds.value,
            vetInfo: vetInfo.value,
            dateRV: dateRV.value,
            implantedCompany: implantedCompany.value,
            email: email.value,
            ownerName: ownerName.value,
            ownerPhone1: ownerPhone1.value,
            ownerPhone2: ownerPhone2.value,
            ownerPhone3: ownerPhone3.value,
            ownerPhone4: ownerPhone4.value,
            ownerPhone5: ownerPhone5.value,
            ownerPhone6: ownerPhone6.value,
            ownerPhone7: ownerPhone7.value,
            ownerAddress1: ownerAddress1.value,
            ownerAddress2: ownerAddress2.value,
            ownerCity: ownerCity.value,
            ownerState: ownerState.value,
            ownerZip: ownerZip.value,
            ownerCountry: ownerCountry.value,
            ownerSecContact: ownerSecContact.value,
            ownerNote: ownerNote.value,
        };

        async function fetchData() {
            const result = await petRegisterService({
                ...pet,
                ...{ photoPath: petPhotoPath },
            });
            if (result.error) {
                setFormError(result.errMsg);
            } else {
                if (petPhoto !== "") {
                    const photoData = new FormData();
                    photoData.append("petMicrochip", pet.microchip);
                    photoData.append(
                        "petPhotoName",
                        pet.microchip +
                            "." +
                            petPhoto.name.split(".")[
                                petPhoto.name.split(".").length - 1
                            ]
                    );
                    photoData.append("petPhotoData", petPhoto);

                    const addPhoto = await photoAddService(photoData);
                    if (addPhoto.error) {
                        setFormError(result.errMsg);
                    } else {
                        history.goBack();
                    }
                } else {
                    history.goBack();
                }
            }
        }
        fetchData();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
    };

    const photoErrorHandle = (e) => {
        e.preventDefault();
        e.target.src = nophoto;
    };

    const photoUpdate = (e) => {
        e.preventDefault();

        const photo = e.target.files[0];
        if (e.target.files[0]) {
            setpetPhoto(photo);
            setPetPhotoPath(
                "/uploads/photo/" +
                    microchip +
                    "." +
                    photo.name.split(".")[photo.name.split(".").length - 1]
            );
            setPetPhotoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const CountryOptions = (props) => (
        <option value={props.sortname}>{props.name}</option>
    );

    const listCountries = () => {
        return csc.getAllCountries().map(function (country, index) {
            return (
                <CountryOptions
                    name={country.name}
                    sortname={country.sortname}
                    key={index}
                ></CountryOptions>
            );
        });
    };

    return (
        <>
            <Container>
                <h1 className="m-5 text-center">Update Pet Information</h1>

                <Form autoComplete="off">
                    <Container>
                        <Row>
                            <Col>
                                <Card className="h-100 shadow">
                                    <Card.Header className="bg-danger text-white">
                                        <h5 className="m-0">Pet Information</h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group>
                                            <Form.Label>
                                                Microchip Number
                                            </Form.Label>
                                            <Form.Control
                                                id="microchip"
                                                name="microchip"
                                                type="text"
                                                {...microchip}
                                                placeholder="Microchip Number"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                id="petName"
                                                name="petName"
                                                type="text"
                                                {...petName}
                                                placeholder="Pet's Name"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Species</Form.Label>
                                            <Form.Control
                                                as="select"
                                                id="petSpecies"
                                                name="petSpecies"
                                                {...petSpecies}
                                            >
                                                <option>Choose One</option>
                                                <option>Dog</option>
                                                <option>Cat</option>
                                                <option>Bird</option>
                                                <option>Ferret</option>
                                                <option>Goat</option>
                                                <option>Horse</option>
                                                <option>Pig</option>
                                                <option>Rabbit</option>
                                                <option>Snake</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Breed</Form.Label>
                                            <Form.Control
                                                id="petBreed"
                                                name="petBreed"
                                                type="text"
                                                {...petBreed}
                                                placeholder="Pet's Breed"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control
                                                id="petColor"
                                                name="petColor"
                                                type="text"
                                                {...petColor}
                                                placeholder="Pet's Color"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Gender</Form.Label>
                                            <Col className="p-0">
                                                <Form.Check
                                                    inline
                                                    className="mr-5"
                                                    type="radio"
                                                    name="petGender"
                                                    value="male"
                                                    label="Male"
                                                    checked={
                                                        petGender.selected ===
                                                        "male"
                                                    }
                                                    {...petGender}
                                                />
                                                <Form.Check
                                                    inline
                                                    className="mr-5"
                                                    type="radio"
                                                    name="petGender"
                                                    value="female"
                                                    label="Female"
                                                    checked={
                                                        petGender.selected ===
                                                        "female"
                                                    }
                                                    {...petGender}
                                                />
                                                <Form.Check
                                                    inline
                                                    className="mr-5"
                                                    type="radio"
                                                    name="petGender"
                                                    value="other"
                                                    label="Other"
                                                    checked={
                                                        petGender.selected ===
                                                        "other"
                                                    }
                                                    {...petGender}
                                                />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Birthdate</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="petBirth"
                                                {...petBirth}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Any Special Needs or Medications
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                id="specialNeeds"
                                                name="specialNeeds"
                                                {...specialNeeds}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Veterinary Information
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                id="vetInfo"
                                                name="vetInfo"
                                                {...vetInfo}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Date of Rabies Vaccination
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                id="dateRV"
                                                name="dateRV"
                                                {...dateRV}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Veterinary Hospital or Clinic
                                                where Microchip was registered.
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="implantedCompany"
                                                name="implantedCompany"
                                                placeholder="Veterinary Hospital or Clinic"
                                                {...implantedCompany}
                                            />
                                            <Form.Text className="text-muted">
                                                Please Type Full Name as it
                                                appears. i.e. "ZEPPY's Pet
                                                Hospital"
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Pet's Photo</Form.Label>
                                            <Form.File custom>
                                                <Form.File.Input
                                                    name="petPhoto"
                                                    onChange={photoUpdate}
                                                />
                                                <Form.File.Label data-browse="Upload">
                                                    Max. 512mb. Type: .jpg /
                                                    .jpeg / .png / .gif
                                                </Form.File.Label>
                                            </Form.File>
                                        </Form.Group>

                                        <Image
                                            src={petPhotoPreview}
                                            width="100%"
                                            height="auto"
                                            thumbnail
                                            onError={photoErrorHandle}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col>
                                <Card className="h-100 shadow">
                                    <Card.Header className="bg-success text-white">
                                        <h5 className="m-0">
                                            Owner Information
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                id="email"
                                                name="email"
                                                type="email"
                                                {...email}
                                                placeholder="Pet Owner's Email Address"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                id="ownerName"
                                                name="ownerName"
                                                type="text"
                                                {...ownerName}
                                                placeholder="Pet Owner's Full Name"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Primary Phone
                                            </Form.Label>
                                            <Form.Control
                                                id="ownerPhone1"
                                                name="ownerPhone1"
                                                type="text"
                                                {...ownerPhone1}
                                                placeholder="Owner's Primary Phone Number"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Secondary Phone
                                            </Form.Label>
                                            <Form.Control
                                                id="ownerPhone2"
                                                name="ownerPhone2"
                                                type="text"
                                                {...ownerPhone2}
                                                placeholder="Owner's Secondary Phone Number"
                                            />
                                        </Form.Group>

                                        <Form.Label>Address</Form.Label>
                                        <Form.Group>
                                            <Form.Control
                                                id="ownerAddress1"
                                                name="ownerAddress1"
                                                type="text"
                                                {...ownerAddress1}
                                                placeholder="1234 Main St"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                id="ownerAddress2"
                                                name="ownerAddress2"
                                                type="text"
                                                {...ownerAddress2}
                                                placeholder="Apartment, studio, or floor"
                                            />
                                        </Form.Group>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="ownerCity"
                                                    name="ownerCity"
                                                    type="text"
                                                    {...ownerCity}
                                                    placeholder="City"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="ownerState"
                                                    name="ownerState"
                                                    type="text"
                                                    {...ownerState}
                                                    placeholder="State"
                                                />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="ownerZip"
                                                    name="ownerZip"
                                                    type="text"
                                                    {...ownerZip}
                                                    placeholder="12345 (12345-6789)"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="ownerCountry"
                                                    name="ownerCountry"
                                                    as="select"
                                                    {...ownerCountry}
                                                >
                                                    {listCountries(
                                                        ownerCountry.value
                                                    )}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Group>
                                            <Form.Label>
                                                Secondary Contact
                                            </Form.Label>
                                            <Form.Control
                                                id="ownerSecContact"
                                                name="ownerSecContact"
                                                type="text"
                                                {...ownerSecContact}
                                                placeholder="Owner's Secondary Contact Information"
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Additional Phones
                                            </Form.Label>
                                            <Form.Control
                                                id="ownerPhone3"
                                                name="ownerPhone3"
                                                type="text"
                                                {...ownerPhone3}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                id="ownerPhone4"
                                                name="ownerPhone4"
                                                type="text"
                                                {...ownerPhone4}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                id="ownerPhone5"
                                                name="ownerPhone5"
                                                type="text"
                                                {...ownerPhone5}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                id="ownerPhone6"
                                                name="ownerPhone6"
                                                type="text"
                                                {...ownerPhone6}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                id="ownerPhone7"
                                                name="ownerPhone7"
                                                type="text"
                                                {...ownerPhone7}
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>
                                                Special Note
                                            </Form.Label>
                                            <Form.Control
                                                id="ownerNote"
                                                name="ownerNote"
                                                as="textarea"
                                                {...ownerNote}
                                            />
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button
                                    className="float-right mt-5"
                                    variant="outline-secondary"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="float-right mr-2 mt-5"
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Update Pet
                                </Button>

                                {formError && (
                                    <Form.Text className="text-danger float-right mr-4">
                                        {formError}
                                    </Form.Text>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </Container>
        </>
    );
}
