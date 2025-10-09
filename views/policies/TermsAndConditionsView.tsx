import React from 'react';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface TermsAndConditionsViewProps {
    onNavigate: (path: string) => void;
}

const TermsAndConditionsView: React.FC<TermsAndConditionsViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Terms & Conditions" onNavigate={onNavigate}>
            <h2>Terms & Conditions</h2>
            <p>Last updated on: October 6, 2025</p>
            <p>
                For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean <strong>Optionsbulltrading Inc.</strong>, whose registered/operational office is 123 Trading Avenue, Financial District, Mumbai, 400001, India. "You", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
            </p>

            <h3>Your use of the website and/or purchase from us are governed by following Terms and Conditions:</h3>
            <ul>
                <li>The content of the pages of this website is subject to change without notice.</li>
                <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                <li>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
                <li>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                <li>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
                <li>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
                <li>You may not create a link to our website from another website or document without Optionsbulltrading Inc.'s prior written consent.</li>
                <li>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</li>
            </ul>

            <h3>Educational Content and Risk Disclaimer</h3>
            <p>
                Optionsbulltrading provides educational content on financial markets and is in the process of applying for SEBI registration as a Research Analyst. All content is for <strong>educational purposes only</strong> and should not be construed as investment or financial advice. Trading involves significant risk, and you are solely responsible for your own investment decisions.
            </p>
            
            <h3>Subscriptions and No-Refund Policy</h3>
            <p>
                All purchases of digital products and subscriptions are final. We operate a strict <strong>no-refund and no-cancellation policy</strong>. By completing a purchase, you agree to these terms.
            </p>

            <h3>Limitation of Liability</h3>
            <p>
                We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
            </p>
        </PolicyPageLayout>
    );
};

export default TermsAndConditionsView;
