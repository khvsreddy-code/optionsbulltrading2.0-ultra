import React from 'react';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface ShippingPolicyViewProps {
    onNavigate: (path: string) => void;
}

const ShippingPolicyView: React.FC<ShippingPolicyViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Shipping & Delivery Policy" onNavigate={onNavigate}>
            <h2>Shipping & Delivery Policy</h2>
            <p>Last updated: October 6, 2025</p>

            <p>
                At Optionsbulltrading Inc., we specialize in digital educational content. All our products, including courses and subscriptions, are delivered electronically. There are no physical goods that require shipping.
            </p>
            
            <h3>Order Confirmation & Delivery</h3>
            <p>
                Upon successful payment, access to your purchased digital content is granted immediately. Delivery of our services will be confirmed on your mail ID as specified during registration. You can access your courses directly through your account dashboard on our platform.
            </p>

            <h3>Delivery Time</h3>
            <p>
                Since all products are digital, they are available instantly. There are no shipping delays.
            </p>

            <h3>Customer Support</h3>
            <p>
                Optionsbulltrading Inc. is committed to providing excellent service. For any issues in utilizing our services, you may contact our helpdesk at <strong><a href="tel:+919951373380">9951373380</a></strong> or <strong><a href="mailto:harinathareddy515@gmail.com">harinathareddy515@gmail.com</a></strong>.
            </p>

        </PolicyPageLayout>
    );
};

export default ShippingPolicyView;