import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import csc from "country-state-city";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import {
    verifyTokenAsync,
    userLogoutAsync,
} from "../actions/auth-async.action";
import { setAuthToken } from "../services/auth.service";
import { useFormInput } from "../utils/form-input.util";
import { ownerGetService, ownerUpdateService } from "../services/owner.service";

export default function OwnerRegister() {
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

    const { id } = useParams();
    const [owner, setOwner] = useState({
        ownerName: "",
        email: "",
        ownerPhone1: "",
        ownerPhone2: "",
        ownerPhone3: "",
        ownerPhone4: "",
        ownerPhone5: "",
        ownerPhone6: "",
        ownerPhone7: "",
        ownerAddress1: "",
        ownerAddress2: "",
        ownerCity: "",
        ownerState: "",
        ownerZip: "",
        ownerCountry: "",
        ownerSecContact: "",
        ownerNote: "",
    });

    const history = useHistory();
    const [formError, setFormError] = useState("");

    const ownerName = useFormInput(owner.ownerName);
    const email = useFormInput(owner.email);
    const ownerPhone1 = useFormInput(owner.ownerPhone1);
    const ownerPhone2 = useFormInput(owner.ownerPhone2);
    const ownerPhone3 = useFormInput(owner.ownerPhone3);
    const ownerPhone4 = useFormInput(owner.ownerPhone4);
    const ownerPhone5 = useFormInput(owner.ownerPhone5);
    const ownerPhone6 = useFormInput(owner.ownerPhone6);
    const ownerPhone7 = useFormInput(owner.ownerPhone7);
    const ownerAddress1 = useFormInput(owner.ownerAddress1);
    const ownerAddress2 = useFormInput(owner.ownerAddress2);
    const ownerCity = useFormInput(owner.ownerCity);
    const ownerState = useFormInput(owner.ownerState);
    const ownerZip = useFormInput(owner.ownerZip);
    const ownerCountry = useFormInput(owner.ownerCountry);
    const ownerSecContact = useFormInput(owner.ownerSecContact);
    const ownerNote = useFormInput(owner.ownerNote);

    useEffect(() => {
        async function getData() {
            const result = await ownerGetService(id);
            if (result.error) {
                dispatch(userLogoutAsync());
            } else {
                setOwner(result.data);
            }
        }
        getData();
    }, [dispatch, id, setOwner]);

    const handleSubmit = (e) => {
        e.preventDefault();

        async function fetchData() {
            const owner = {
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
            const result = await ownerUpdateService(owner);
            if (result.error) {
                setFormError(result.errMsg);
            } else {
                history.push("/owners");
            }
        }
        fetchData();
    };

    const handleCancel = (e) => {
        e.preventDefault();
        history.goBack();
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
                <h1 className="m-5 text-center">Add A New Portal User</h1>

                <Form autoComplete="off">
                    <Container>
                        <Row>
                            <Col>
                                <Card className="h-100 shadow">
                                    <Card.Header className="bg-success text-white">
                                        <h5 className="m-0">
                                            Owner Information
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    {...email}
                                                    placeholder="Pet Owner's Email Address"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    id="ownerName"
                                                    name="ownerName"
                                                    type="text"
                                                    {...ownerName}
                                                    placeholder="Pet Owner's Full Name"
                                                />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col}>
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

                                            <Form.Group as={Col}>
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
                                        </Form.Row>

                                        <Form.Label>Address</Form.Label>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="ownerAddress1"
                                                    name="ownerAddress1"
                                                    type="text"
                                                    {...ownerAddress1}
                                                    placeholder="1234 Main St"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="ownerAddress2"
                                                    name="ownerAddress2"
                                                    type="text"
                                                    {...ownerAddress2}
                                                    placeholder="Apartment, studio, or floor"
                                                />
                                            </Form.Group>
                                        </Form.Row>

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

                                        <Form.Row>
                                            <Col>
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
                                                        Special Note
                                                    </Form.Label>
                                                    <Form.Control
                                                        id="ownerNote"
                                                        name="ownerNote"
                                                        as="textarea"
                                                        {...ownerNote}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col>
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
                                            </Col>
                                        </Form.Row>
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
                                    Add User
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
