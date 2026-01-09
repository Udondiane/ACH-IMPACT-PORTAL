import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ach-primary rounded-lg flex items-center justify-center">
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
          Demonstrate Your Impact.
          <br />
          <span className="text-ach-primary">Drive Better Outcomes.</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A unified platform for measuring refugee capability development and 
          employer inclusion practices.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="btn-primary text-lg px-8 py-3">Get Started</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">Choose Your Portal</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Employment Partners</h4>
            <p className="text-gray-600 text-sm mb-4">
              See your business value and inclusion scores. Track candidate outcomes.
            </p>
            <Link href="/partner/dashboard" className="text-ach-primary font-medium text-sm hover:underline">
              Access Portal
            </Link>
          </div>

          <div className="card hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Training Partners</h4>
            <p className="text-gray-600 text-sm mb-4">
              Measure training effectiveness. Track staff development.
            </p>
            <Link href="/partner/training" className="text-amber-600 font-medium text-sm hover:underline">
              Access Portal
            </Link>
          </div>

          <div className="card hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">ACH Staff</h4>
            <p className="text-gray-600 text-sm mb-4">
              Full programme oversight. Manage candidates and partners.
            </p>
            <Link href="/staff/dashboard" className="text-blue-600 font-medium text-sm hover:underline">
              Access Portal
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Ashley Community Housing. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
