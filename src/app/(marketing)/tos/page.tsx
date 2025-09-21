import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service - Auxonia LMS',
    description: 'Terms of Service for Auxonia LMS - Educational Project',
}

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-4xl px-4 py-16">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                            🎓 Educational Project Notice
                        </h2>
                        <p className="text-yellow-700 dark:text-yellow-300 m-0">
                            <strong>Important:</strong> This is an educational project created for learning and demonstration purposes only.
                            This platform is not intended for production use or real commercial activities.
                        </p>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Educational Purpose</h2>
                        <p>
                            Auxonia LMS is developed as an educational project to demonstrate web development concepts,
                            including but not limited to:
                        </p>
                        <ul>
                            <li>Next.js application development</li>
                            <li>User authentication and authorization</li>
                            <li>Database integration and management</li>
                            <li>Learning Management System features</li>
                            <li>Modern web technologies and best practices</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. No Commercial Use</h2>
                        <p>
                            This platform is provided solely for educational and demonstration purposes. Any commercial use,
                            real course sales, or actual learning services are strictly prohibited and not supported.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. Data and Privacy</h2>
                        <p>
                            As this is an educational project:
                        </p>
                        <ul>
                            <li>Do not enter real personal or sensitive information</li>
                            <li>Use test data and dummy information only</li>
                            <li>Data may be reset or deleted without notice</li>
                            <li>No guarantees are made regarding data persistence or security</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Availability and Support</h2>
                        <p>
                            This educational platform:
                        </p>
                        <ul>
                            <li>May be unavailable at any time without notice</li>
                            <li>Does not provide customer support or service level agreements</li>
                            <li>May contain bugs, incomplete features, or experimental functionality</li>
                            <li>Is provided "as-is" for learning purposes only</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                        <p>
                            This project is created for educational purposes and may incorporate various open-source
                            libraries and frameworks. All content is used under fair use for educational purposes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                        <p>
                            The creators and contributors of this educational project shall not be liable for any damages,
                            losses, or issues arising from the use of this platform. Use at your own risk for educational
                            purposes only.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
                        <p>
                            This is an educational project. For questions about the codebase or learning objectives,
                            please refer to the project documentation or repository.
                        </p>
                    </section>

                    <div className="border-t pt-8 mt-12 text-sm text-muted-foreground">
                        <p>
                            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Project type:</strong> Educational demonstration only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}