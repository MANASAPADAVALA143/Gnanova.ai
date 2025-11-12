import { Layout } from '../components/Layout';

export const Calendar = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Calendar</h1>
        <p className="text-slate-600 mb-8">Plan and schedule your content</p>

        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Calendar View Coming Soon</h3>
          <p className="text-slate-600">
            Visual calendar interface for managing your content schedule will be available here
          </p>
        </div>
      </div>
    </Layout>
  );
};
