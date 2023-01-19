import { Jobs } from "../../services/IndexService";

export function GetPostedJobs() {
    Jobs()
    .then((response) => {
        // saveTokenInLocalStorage(response.data);
        // runLogoutTimer(
        //     dispatch,
        //     response.data.expiresIn * 1000,
        //     history,
        // );
        // dispatch(confirmedSignupAction(response.data));
        // history.push('/');
        console.log(response.data);
       // return response.data;
    })
    .catch((error) => {
        // const errorMessage = formatError(error.response.data);
        // dispatch(signupFailedAction(errorMessage));
    });
}