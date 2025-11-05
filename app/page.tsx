import { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  // Fetch employees from Supabase
  const { data: employees, error } = await supabase
    .from('employees')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching employees:', error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Employee Directory
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {employees?.length || 0} employees
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Error loading employees</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        {employees && employees.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee: any) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-bold text-gray-600">
                              {employee.full_name?.charAt(0) || employee.name?.charAt(0) || employee.first_name?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {employee.full_name || employee.name || `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || 'Unknown'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.position || employee.title || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.department || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.email ? (
                          <a
                            href={`mailto:${employee.email}`}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {employee.email}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : !error && (
          <div className="text-center py-12 text-gray-500">
            <p>No employees found in the database.</p>
            <p className="text-sm mt-2">Add some employees to your Supabase 'employees' table to see them here.</p>
          </div>
        )}
      </div>
    </main>
  )
}
