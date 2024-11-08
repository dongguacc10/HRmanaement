import { useState } from 'react';
import { FileText, Download, Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '../../components/Button';

export default function Resumes() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resume Database</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resumes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">John Smith</h3>
                      <p className="text-sm text-gray-500">Software Engineer</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">React</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Node.js</span>
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">TypeScript</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">John Smith</h3>
                      <p className="text-sm text-gray-500">Software Engineer</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">React</span>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Node.js</span>
                        <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">TypeScript</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}