import { useValidatableForm } from "react-validatable-form";
import MyErrorComponent from "./MyErrorComponent";
import "./styles.css";

const initialFormData = {
  value3: ["", ""]
};
const rules = [
  {
    path: "value",
    ruleSet: [{ rule: "required", customMessage: "An error occured." }]
  },
  {
    path: "value2",
    ruleSet: [
      {
        rule: "length",
        greaterThan: 5,
        applyToNulls: true,
        disableIf: (formData) => {
          return formData.value;
        }
      }
    ],
    dependantPaths: ["value"]
  },
  {
    listPath: "value3",
    ruleSet: [
      {
        rule: "required"
      },
      {
        rule: "unique"
      }
    ]
  }
];

const MyComponent1 = () => {
  const {
    isValid,
    formData,
    setPathValue,
    getValue,
    getError,
    setFormIsSubmitted,
    setPathIsBlurred
  } = useValidatableForm({
    rules,
    initialFormData
  });

  const handleInputChange = (path, event) => {
    setPathValue(path, event.target.value);
  };
  const handleSubmit = () => {
    setFormIsSubmitted();
  };

  const listJSX = formData.value3.map((element, index) => {
    return (
      <div>
        <input
          className={
            getError(`value3{${index}}`) ? "inputError" : "inputNormal"
          }
          value={getValue(`value3[${index}]`)}
          onChange={(event) => handleInputChange(`value3[${index}]`, event)}
          onBlur={() => setPathIsBlurred(`value3[${index}]`)}
          id={`value3{${index}}`}
        ></input>
        <MyErrorComponent errorMessage={getError(`value3{${index}}`)} />
      </div>
    );
  });
  return (
    /*<>
      <div>MyComponent1</div>
      <input onChange={handleInputChange} value={value} />
    </>*/
    <>
      <div>
        <input
          className={getError("value") ? "inputError" : "inputNormal"}
          value={getValue("value")}
          onChange={(event) => handleInputChange("value", event)}
          onBlur={() => setPathIsBlurred("value")}
          id="value"
        ></input>
        <MyErrorComponent errorMessage={getError("value")} />
      </div>
      <div>
        <input
          className={getError("value2") ? "inputError" : "inputNormal"}
          value={getValue("value2")}
          onChange={(event) => handleInputChange("value2", event)}
          onBlur={() => setPathIsBlurred("value2")}
          id="value2"
        ></input>
        <MyErrorComponent errorMessage={getError("value2")} />
      </div>
      {listJSX}
      <p>
        {" "}
        Form is {""} {isValid ? "valid" : "invalid"}
      </p>
      <button onClick={handleSubmit}>submit form</button>
    </>
  );
};

export default MyComponent1;
