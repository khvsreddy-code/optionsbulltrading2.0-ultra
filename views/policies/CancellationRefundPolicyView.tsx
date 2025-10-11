import React from 'react';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface CancellationRefundPolicyViewProps {
    onNavigate: (path: string) => void;
}

const CancellationRefundPolicyView: React.FC<CancellationRefundPolicyViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Cancellation & Refund Policy" onNavigate={onNavigate}>
            <h2>Cancellation & Refund Policy</h2>
            <p>KALAMAKUNTLA HARINATHA REDDY believes in helping its customers as far as possible, and has therefore a liberal cancellation policy.</p>
            
            <h3>Cancellations</h3>
            <p>Under this policy:</p>
            <ul>
                <li>Cancellations will be considered only if the request is made within 1-2 days of placing the order.</li>
                <li>However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
                <li>KALAMAKUNTLA HARINATHA REDDY does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
            </ul>

            <h3>Damaged or Defective Items</h3>
            <ul>
                <li>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 1-2 days of receipt of the products.</li>
            </ul>
            
            <h3>Product Expectations</h3>
             <ul>
                <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 1-2 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
                <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
            </ul>

            <h3>Refunds</h3>
            <ul>
                <li>In case of any Refunds approved by the KALAMAKUNTLA HARINATHA REDDY, it’ll take 16-30 days for the refund to be processed to the end customer.</li>
            </ul>
        </PolicyPageLayout>
    );
};

export default CancellationRefundPolicyView;