import './button.styles.scss'
//So basically here we are trying to control the styling for different types of button so if we pass in a buttonType and it is equal to the value of google in the BUTTON_TYPES_CLASS object then it should give the button a class of the value and same with the inverted

const BUTTON_TYPES_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
}

const Button = (props) => {
    const {children, buttonType, ...otherProps} = props;
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;