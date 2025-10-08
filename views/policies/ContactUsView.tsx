import React from 'react';
import type { View } from '../../types';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface ContactUsViewProps {
    onNavigate: (view: View) => void;
}

const ContactUsView: React.FC<ContactUsViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Contact Us" onNavigate={onNavigate}>
            <h2>Get in Touch</h2>
            <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
            
            <h3>Contact Information</h3>
            <p>Please feel free to reach out to us through the following channels for any support or inquiries.</p>
            
            <h4>Customer Support</h4>
            <ul>
                <li><strong>Email:</strong> <a href="mailto:Hemanthwork240@gmail.com">Hemanthwork240@gmail.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+919951373380">+91 9951373380</a></li>
                <li><strong>Response Time:</strong> We aim to respond to all inquiries within 24-48 business hours.</li>
            </ul>

            <h4>Business Address</h4>
            <address>
                Optionsbulltrading Inc.<br/>
                123 Trading Avenue<br/>
                Financial District, Mumbai, 400001<br/>
                India
            </address>
            
            <p><em>Please note that our office is not open for public visits. For all support inquiries, please contact us via email for the quickest response.</em></p>
        </PolicyPageLayout>
    );
};

export default ContactUsView;