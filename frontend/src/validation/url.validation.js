import * as Yup from "yup";

export const createLinkValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    originalUrl: Yup.string().url("Invalid URL format").required("Original URL is required"),
    customUrl: Yup.string().when("$customUrl", {
        is: (value) => value && value.length > 0, // Only validate if a value is provided
        then: (schema) => schema.matches(/^[a-zA-Z0-9_-]+$/, "Custom URL can only contain letters, numbers, hyphens, and underscores").min(3, "Custom URL must be at least 3 characters"),
        otherwise: (schema) => schema.notRequired(), // If empty, no validation error
    }),
});
