import React from 'react';
import PolicyPageLayout from '../../components/layout/PolicyPageLayout';

interface PrivacyPolicyViewProps {
    onNavigate: (path: string) => void;
}

const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onNavigate }) => {
    return (
        <PolicyPageLayout title="Privacy Policy" onNavigate={onNavigate}>
            <h2>Privacy Policy</h2>
            <p>Last updated: July 26, 2024</p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            
            <h3>1. Information We Collect</h3>
            <p>We collect information to provide and improve our services to you. The types of information we collect are:</p>
            <h4>a. Information You Provide to Us</h4>
            <p>
                When you create an account using Google Sign-In, we receive Personal Data from your Google account. This includes:
            </p>
            <ul>
                <li><strong>Full Name</strong></li>
                <li><strong>Email Address</strong></li>
                <li><strong>Profile Picture (Avatar)</strong></li>
            </ul>
            <h4>b. Information We Collect Automatically (Usage Data)</h4>
            <p>
                As you use our services, we may automatically collect information about your activity, such as the pages you visit, the features you use, and the time, frequency, and duration of your activities. This helps us understand how our service is used and where we can make improvements.
            </p>
            
            <h3>2. How We Use Your Information</h3>
            <p>The Company uses the collected data for various purposes:</p>
            <ul>
                <li><strong>To Provide and Maintain Our Service:</strong> Including managing your account, providing access to courses, and enabling features.</li>
                <li><strong>To Communicate with You:</strong> To contact You by email regarding your account, our services, updates, or promotional offers.</li>
                <li><strong>To Improve Our Service:</strong> To understand and analyze how you use our Service and develop new products, services, features, and functionality.</li>
            </ul>

            <h3>3. How We Share Your Information</h3>
            <p>We do not sell your personal information. We may share your information in the following limited circumstances:</p>
            <ul>
                <li><strong>With Service Providers:</strong> Our application is built using Supabase for authentication and database management. Your data (e.g., name, email) is stored securely with Supabase. We recommend you review their privacy policy.</li>
                <li><strong>For Legal Reasons:</strong> We may share information if we believe that disclosure is reasonably necessary to comply with a law, regulation, legal process, or governmental request.</li>
            </ul>

            <h3>4. Security of Your Personal Data</h3>
            <p>The security of Your Personal Data is important to Us. We rely on the robust security infrastructure of our service provider, Supabase, which employs industry-standard security measures to protect your data. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            
            <h3>5. Your Data Rights</h3>
            <p>You have the right to access, update, or request deletion of your personal data. You can manage your account information through your profile settings or by contacting us for assistance.</p>

            <h3>6. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, You can contact us via our 'Contact Us' page.</p>
        </PolicyPageLayout>
    );
};

export default PrivacyPolicyView;
