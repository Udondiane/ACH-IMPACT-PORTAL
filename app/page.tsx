import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ACH</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Impact Intelligence</h1>
              <p className="text-sm text-gray-500">Measuring refugee employment impact</p>
            </div>
          </div>
          <Link href="/login" className="btn-primary">Sign In</Link>
        </div>
      </header>
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Demonstrate Your Impact.<br />
          <span className="text-teal-600">Drive Better Outcomes.</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A unified platform for measuring refugee capability development and employer inclusion practices.
        </p>
        <Link href="/login" className="btn-primary text-lg px-8 py-3">Get Started</Link>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">Choose Your Portal</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <h4 className="text-lg font-semibold mb-2">Employment Partners</h4>
            <p className="text-gray-600 text-sm mb-4">See your business value and inclusion scores.</p>
            <Link href="/partner/dashboard" className="text-teal-600 font-medium">Access Portal</Link>
          </div>
          <div className="card text-center">
            <h4 className="text-lg font-semibold mb-2">Training Partners</h4>
            <p className="text-gray-600 text-sm mb-4">Measure training effectiveness.</p>
            <Link href="/partner/training" className="text-teal-600 font-medium">Access Portal</Link>
          </div>
          <div className="card text-center">
            <h4 className="text-lg font-semibold mb-2">ACH Staff</h4>
            <p className="text-gray-600 text-sm mb-4">Full programme oversight.</p>
            <Link href="/staff/dashboard" className="text-teal-600 font-medium">Access Portal</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
