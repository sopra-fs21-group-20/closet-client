import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, buttonStyle, textStyle }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} buttonStyle={buttonStyle} textStyle={textStyle} />;
}

export default SubmitButton;
