import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { verifyTokenAsync } from "../actions/auth-async.action";
import { setAuthToken } from "../services/auth.service";

const DashboardPage = () => {
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

    return <></>;
};

export default DashboardPage;
