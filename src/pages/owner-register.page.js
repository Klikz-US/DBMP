import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import csc from "country-state-city";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { verifyTokenAsync } from "../actions/auth-async.action";
import { setAuthToken } from "../services/auth.service";
import { useFormInput } from "../utils/form-input.util";
import { ownerRegisterService } from "../services/owner.service";

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

    const history = useHistory();
    const [formError, setFormError] = useState("");

    const name = useFormInput("");
    const email = useFormInput("");
    const phone1 = useFormInput("");
    const phone2 = useFormInput("");
    const phone3 = useFormInput("");
    const phone4 = useFormInput("");
    const phone5 = useFormInput("");
    const phone6 = useFormInput("");
    const phone7 = useFormInput("");
    const address1 = useFormInput("");
    const address2 = useFormInput("");
    const city = useFormInput("");
    const state = useFormInput("");
    const zip = useFormInput("");
    const country = useFormInput("");
    const seccon = useFormInput("");
    const spenote = useFormInput("");

    const handleSubmit = (e) => {
        e.preventDefault();

        async function fetchData() {
            const owner = {
                email: email.value,
                ownerName: name.value,
                ownerPhone1: phone1.value,
                ownerPhone2: phone2.value,
                ownerPhone3: phone3.value,
                ownerPhone4: phone4.value,
                ownerPhone5: phone5.value,
                ownerPhone6: phone6.value,
                ownerPhone7: phone7.value,
                ownerAddress1: address1.value,
                ownerAddress2: address2.value,
                ownerCity: city.value,
                ownerState: state.value,
                ownerZip: zip.value,
                ownerCountry: country.value,
                ownerSecContact: seccon.value,
                ownerNote: spenote.value,
            };
            const result = await ownerRegisterService(owner);
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
        history.push("/users");
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
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    {...name}
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
                                                    id="phone1"
                                                    name="phone1"
                                                    type="text"
                                                    {...phone1}
                                                    placeholder="Owner's Primary Phone Number"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Label>
                                                    Secondary Phone
                                                </Form.Label>
                                                <Form.Control
                                                    id="phone2"
                                                    name="phone2"
                                                    type="text"
                                                    {...phone2}
                                                    placeholder="Owner's Secondary Phone Number"
                                                />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Label>Address</Form.Label>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="address1"
                                                    name="address1"
                                                    type="text"
                                                    {...address1}
                                                    placeholder="1234 Main St"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="address2"
                                                    name="address2"
                                                    type="text"
                                                    {...address2}
                                                    placeholder="Apartment, studio, or floor"
                                                />
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="city"
                                                    name="city"
                                                    type="text"
                                                    {...city}
                                                    placeholder="City"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="state"
                                                    name="state"
                                                    type="text"
                                                    {...state}
                                                    placeholder="State"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="zip"
                                                    name="zip"
                                                    type="text"
                                                    {...zip}
                                                    placeholder="12345 (12345-6789)"
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    id="country"
                                                    name="country"
                                                    as="select"
                                                    {...country}
                                                >
                                                    {listCountries(
                                                        country.value
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
                                                        id="seccon"
                                                        name="seccon"
                                                        type="text"
                                                        {...seccon}
                                                        placeholder="Owner's Secondary Contact Information"
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>
                                                        Special Note
                                                    </Form.Label>
                                                    <Form.Control
                                                        id="spenote"
                                                        name="spenote"
                                                        as="textarea"
                                                        {...spenote}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Additional Phones
                                                    </Form.Label>
                                                    <Form.Control
                                                        id="phone3"
                                                        name="phone3"
                                                        type="text"
                                                        {...phone3}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Control
                                                        id="phone4"
                                                        name="phone4"
                                                        type="text"
                                                        {...phone4}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Control
                                                        id="phone5"
                                                        name="phone5"
                                                        type="text"
                                                        {...phone5}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Control
                                                        id="phone6"
                                                        name="phone6"
                                                        type="text"
                                                        {...phone6}
                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Control
                                                        id="phone7"
                                                        name="phone7"
                                                        type="text"
                                                        {...phone7}
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
