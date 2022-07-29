const MyErrorComponent = (props) => {
  return (
    props.errorMessage && <span className="Error">{props.errorMessage}</span>
  );
};

export default MyErrorComponent;
