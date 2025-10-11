import React from 'react';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface ContactUsViewProps {
    onNavigate: (path: string) => void;
}

const ContactUsView: React.FC<ContactUsViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Contact Us" onNavigate={onNavigate}>
            <h2>Contact Us</h2>
            <p>You may contact us using the information below:</p>
            
            <h3>Merchant Legal entity name</h3>
            <p>KALAMAKUNTLA HARINATHA REDDY</p>
            
            <h3>Registered Address</h3>
            <address>
                kadapa, ngo colony<br/>
                Cuddapah, ANDHRA PRADESH 516002
            </address>

            <h3>Contact Details</h3>
            <ul>
                <li><strong>Telephone No:</strong> <a href="tel:9951373380">9951373380</a></li>
                <li><strong>E-Mail ID:</strong> <a href="mailto:hemanthwork240@gmail.com">hemanthwork240@gmail.com</a></li>
            </ul>
        </PolicyPageLayout>
    );
};

export default ContactUsView;