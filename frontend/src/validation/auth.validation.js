import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email Address").required("Email Is Required"),
    password: Yup.string().min(6, "Password Must Be At Least 6 Characters").required("Password is required"),
});

const registerValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Is Required"),
    lastName: Yup.string().required("Last Name Is Required"),
    email: Yup.string().email("Invalid email address").required("Email Is Required"),
    password: Yup.string().min(6, "Password Must Be At Least 6 Characters").required("Password Is Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords Must Match")
        .required("Confirm Password Is Required"),
});

export { loginValidationSchema, registerValidationSchema };
