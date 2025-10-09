import React from 'react';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface CancellationRefundPolicyViewProps {
    onNavigate: (path: string) => void;
}

const CancellationRefundPolicyView: React.FC<CancellationRefundPolicyViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Cancellation & Refund Policy" onNavigate={onNavigate}>
            <h2>Cancellation & Refund Policy</h2>
            <p>Last updated: October 6, 2025</p>
            <p>Optionsbulltrading Inc. believes in helping its customers as far as possible, and has therefore a clear cancellation and refund policy.</p>
            
            <h3>Cancellations</h3>
            <ul>
                <li>
                    Due to the instant nature of digital product delivery, all orders are processed immediately upon payment confirmation. Consequently, we operate under a strict no-cancellation policy. Cancellation requests are <strong>Not Applicable</strong> as access to the purchased content (such as courses and premium subscriptions) is granted instantly.
                </li>
            </ul>

            <h3>Refunds</h3>
            <ul>
                <li>
                    Optionsbulltrading Inc. provides digital products and services that are non-tangible and irrevocable. Therefore, we do not issue refunds once the order is accomplished and the product is sent or access is granted. All sales are final.
                </li>
                <li>
                    As a customer, you are responsible for understanding this upon purchasing any item at our site. We strongly encourage you to review course details and previews before making a purchase.
                </li>
                 <li>
                    In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 24 hours of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
                </li>
                <li>
                    Since no refunds are approved by Optionsbulltrading Inc., the processing time for a refund is <strong>Not Applicable</strong>.
                </li>
            </ul>
        </PolicyPageLayout>
    );
};

export default CancellationRefundPolicyView;
