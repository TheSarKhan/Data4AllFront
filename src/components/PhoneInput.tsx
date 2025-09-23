import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../../src/assets/sass/phoneInput.scss';
import { E164Number } from 'libphonenumber-js/core';


interface CustomPhoneInputProps {
    value?: E164Number | undefined;
    onChange: (value: E164Number | undefined) => void;
}

const CustomPhoneInput = ({ value, onChange }: CustomPhoneInputProps) => {
    return (
        <div className="phone-input-container">
            <PhoneInput
                international
                defaultCountry="AZ"
                value={value}
                onChange={onChange}
                className="custom-phone-input"
            />
        </div>
    );
};

export default CustomPhoneInput;
