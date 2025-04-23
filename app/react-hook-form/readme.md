## zod Schema (formSchema):

- We define an object schema using z.object({...}).
- Each key corresponds to a form field name (firstName, lastName, etc.).
- z.string(): Specifies the field must be a string.
- .min(length, { message: '...' }): Ensures the string has a minimum length and provides a custom error message.
- .regex(regex, { message: '...' }): Validates the string against a regular expression for specific formats (phone, zip, SSN).
- You can chain multiple validation methods.

## TypeScript Type (FormData):

- z.infer<typeof formSchema> automatically creates a TypeScript type based on your Zod schema. This gives you type safety and autocompletion for form data.

## useForm Hook:

- register: A function you spread ({...register('fieldName')}) onto your input elements. This connects the input to the form state and validation.
- handleSubmit: A wrapper function for your form's onSubmit. It first triggers validation based on your schema. If validation passes, it calls your onSubmit function with the validated form data.
- formState: { errors, isSubmitting }: An object containing the form's state.
- errors: An object where keys are field names and values are error objects (containing a message property from your Zod schema).
- isSubmitting: A boolean indicating if the form is currently being submitted (useful for disabling the submit button).
- resolver: zodResolver(formSchema): This tells react-hook-form to use your Zod schema for validation via the @hookform/resolvers/zod bridge.
- mode: 'onChange': Configures validation to trigger whenever an input's value changes. Other options include 'onBlur', 'onSubmit' (default).

## Form JSX:

- Standard HTML <form> element with onSubmit={handleSubmit(onSubmit)}.
- <label> elements with htmlFor linked to input ids for accessibility.
- <input> elements using {...register('fieldName')}.
- Conditional rendering {errors.fieldName && <span>...</span>} displays error messages below each input if validation fails for that field.
- The submit button is disabled using the isSubmitting state.

## onSubmit Function:

- This function only runs if the form data passes Zod validation.
- It receives the validated data object (typed with FormData).
- Crucially, it includes a warning about handling SSN securely. This is vital for real-world applications.

## Styling: Basic inline CSS using <style jsx> is included for demonstration. In a real app, you'd likely use CSS Modules, Styled Components, Tailwind CSS, or a global CSS file.
