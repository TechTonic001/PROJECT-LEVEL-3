import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Signin() {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validate={Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().required("Password is required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const res = await axios.post("http://localhost:5000/auth/signin", values);
                    localStorage.setItem("token", res.data.token);
                    alert("Signin successful!");
                } catch (err) {
                    alert(err.response?.data?.error || "Signin failed");
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <Field name="email" type="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                    </div>
                    <div>
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>Signin</button>
                </Form>
            )}
        </Formik>
    );
}

export default Signin;