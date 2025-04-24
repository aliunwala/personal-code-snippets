"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// --- Zod Schema Definition ---
// Define the validation rules for your form fields
const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/, {
      // Basic US phone format
      message: "Invalid phone number format (e.g., 123-456-7890)",
    }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    // US ZIP code format (5 or 5+4 digits)
    message: "Invalid zip code format (e.g., 12345 or 12345-6789)",
  }),
  ssn: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, {
      // Basic SSN format XXX-XX-XXXX
      message: "Invalid SSN format (XXX-XX-XXXX)",
    })
    .min(1, { message: "SSN is required" }), // Ensure it's not empty *after* format check if needed
});

// --- TypeScript Type (Optional but Recommended) ---
// Infer the type from the Zod schema
type FormData = z.infer<typeof formSchema>;

// --- React Form Component ---
function UserInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // Get errors and submission state
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // Use Zod for validation
    mode: "onChange", // Validate on input change for better UX
  });

  // --- Submission Handler ---
  const onSubmit = (data: FormData) => {
    console.log("Form Submitted Successfully:", data);
    // --- !!! IMPORTANT SECURITY NOTE !!! ---
    // Be EXTREMELY careful handling SSN data.
    // Ensure secure transmission (HTTPS) and storage (encryption at rest).
    // Only collect SSN if absolutely necessary and comply with all regulations.
    // Consider masking the input or using more secure collection methods.
    // ----------------------------------------

    // Example: Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(
          `Form submitted! Check the console for data.\n(SSN handled hypothetically - see code comments) ${JSON.stringify(
            data
          )}`
        );
        resolve(true); // Indicate submission success
      }, 1000); // Simulate network delay
    });
  };

  // --- Helper to display errors ---
  const renderError = (fieldName: keyof FormData) => {
    return errors[fieldName] ? (
      <span className="error-message">{errors[fieldName]?.message}</span>
    ) : null;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
      <h2>User Information</h2>

      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" {...register("firstName")} />
        {renderError("firstName")}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" {...register("lastName")} />
        {renderError("lastName")}
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber")}
          placeholder="e.g., 123-456-7890"
        />
        {renderError("phoneNumber")}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input id="address" {...register("address")} />
        {renderError("address")}
      </div>

      <div className="form-group">
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          id="zipCode"
          {...register("zipCode")}
          placeholder="e.g., 12345 or 12345-6789"
        />
        {renderError("zipCode")}
      </div>

      <div className="form-group">
        <label htmlFor="ssn">SSN:</label>
        <input id="ssn" {...register("ssn")} placeholder="XXX-XX-XXXX" />
        {renderError("ssn")}
        <small className="security-note">
          Handle SSN with extreme care and security.
        </small>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {/* Basic Styling (add this to a CSS file or use styled-components/Tailwind) */}
      <style jsx>{`
        .user-info-form {
          max-width: 500px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-family: sans-serif;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-group input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box; /* Include padding in width */
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error-message {
          color: red;
          font-size: 0.8em;
          margin-top: 4px;
          display: block;
        }
        .security-note {
          display: block;
          font-size: 0.75em;
          color: #555;
          margin-top: 4px;
        }
        button {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1em;
        }
        button:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `}</style>
    </form>
  );
}

export default UserInfoForm;
