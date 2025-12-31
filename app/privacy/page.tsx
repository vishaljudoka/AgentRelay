export default function PrivacyPage() {
    return (
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="space-y-12">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Privacy Policy
                </h1>

                <div className="space-y-6 text-base leading-7 text-zinc-300">
                    <p>
                        Last updated: {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">1. Introduction</h2>
                        <p>
                            AgentRelay (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> When you sign up via Google or Email, we collect your email address and basic profile information.</li>
                            <li><strong>Usage Data:</strong> We collect data on the topics you analyze and the reports generated to provide and improve our service.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve our services.</li>
                            <li>Authenticate your identity and secure your account.</li>
                            <li>Communicate with you about service updates or support.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">4. Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect against unauthorized access, alteration, or destruction of your personal information.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">5. Third-Party Services</h2>
                        <p>
                            We use Supabase for authentication and database services. Your data may be processed by these third-party providers in accordance with their privacy policies.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at support@example.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
