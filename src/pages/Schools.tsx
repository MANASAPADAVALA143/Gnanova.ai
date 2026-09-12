import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bus,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Package,
  RefreshCw,
  Shield,
  UserCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { SiteNav } from '../components/SiteNav';
import { GnanovaLogo } from '../components/GnanovaLogo';
import { useDemoModal } from '../contexts/DemoModalContext';

const coreSolutions = [
  {
    icon: MessageCircle,
    title: 'AI Voice & WhatsApp Agent',
    description:
      '24/7 parent and enquiry handling — fees, admissions, transport, and school updates without overloading admin staff.',
    color: 'from-[#667eea] to-[#764ba2]',
  },
  {
    icon: Bell,
    title: 'Automated Fee Reminders',
    description:
      'Scheduled WhatsApp/SMS/email reminders before due dates, with escalation for overdue balances.',
    color: 'from-[#f093fb] to-[#f5576c]',
  },
  {
    icon: Wallet,
    title: 'Smart Fee Reconciliation',
    description:
      'Match collections to student ledgers automatically — reduce mismatches between bank, gateway, and school records.',
    color: 'from-[#4facfe] to-[#00f2fe]',
  },
  {
    icon: FileText,
    title: 'Digital Enrollment & OCR',
    description:
      'Digitize admission forms and documents — extract student data, reduce re-keying, and speed up onboarding.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: LayoutDashboard,
    title: 'Real-Time School Dashboard',
    description:
      'Live visibility into fees, attendance, admissions pipeline, and operational KPIs without manual Excel packs.',
    color: 'from-[#43e97b] to-[#38f9d7]',
  },
  {
    icon: ClipboardList,
    title: 'Automated Notifications',
    description:
      'Exam schedules, holidays, circulars, and event updates pushed to the right parent groups automatically.',
    color: 'from-[#a855f7] to-[#ec4899]',
  },
  {
    icon: BookOpen,
    title: 'AI Educational Content',
    description:
      'Generate worksheets, summaries, and parent-friendly explanations to support teachers and academic coordinators.',
    color: 'from-[#667eea] to-[#4facfe]',
  },
];

const feeAdminItems = [
  { icon: Wallet, title: 'Fee structure & EMI plans', detail: 'Configure term fees, installments, and payment plans by class/stream.' },
  { icon: Bell, title: 'Late fee calculation', detail: 'Rules-based late fees with automated notices to parents.' },
  { icon: RefreshCw, title: 'Refunds & adjustments', detail: 'Track refunds, concessions, and ledger adjustments with an audit trail.' },
  { icon: Users, title: 'Defaulter escalation', detail: 'Escalate unpaid fees through reminder → warning → admin review workflows.' },
  { icon: UserCheck, title: 'Staff attendance', detail: 'Capture and report staff attendance with exception flags.' },
  { icon: Bus, title: 'Transport management', detail: 'Routes, stops, and transport fee linkage in one place.' },
  { icon: Package, title: 'Inventory & stores', detail: 'Track uniforms, books, and consumables across campuses.' },
  { icon: Shield, title: 'Visitor management', detail: 'Log visitors and gate passes with searchable history.' },
  { icon: Calendar, title: 'Timetable & substitutes', detail: 'Timetable changes and substitute teacher scheduling.' },
  { icon: FileText, title: 'Document management', detail: 'Centralize certificates, policies, and student records.' },
  { icon: ClipboardList, title: 'Compliance audit trail', detail: 'Who changed what, when — ready for inspections and board reviews.' },
];

export const Schools = () => {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav variant="sticky" />

      <section className="relative px-6 pt-16 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#667eea]/15 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <GraduationCap className="w-4 h-4 text-[#4facfe]" />
            <span className="text-sm text-gray-300">School Automation Solutions</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
            End-to-End AI Automation for Schools
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-8">
            Fee automation, parent communication, admissions, and admin workflows — so your staff
            spends less time chasing and more time educating.
          </p>
          <button
            type="button"
            onClick={() => openDemoModal()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all"
          >
            Book a School Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
            The Global School Operations Problem
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Admin load is eating teaching capacity</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Parents calling and messaging for fee status, transport, and circulars',
              'Manual fee chasing and spreadsheet reconciliation every month',
              'Paper-heavy admissions and re-keying of student data',
              'No single live view of collections, attendance, and admissions',
              'Teachers pulled into admin work instead of classroom focus',
              'Compliance and document trails scattered across folders and chats',
            ].map((item) => (
              <div
                key={item}
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 text-sm text-gray-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
              7 Core Solutions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">What we automate for schools</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreSolutions.map((item) => (
              <div
                key={item.title}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className="relative">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${item.color} rounded-2xl mb-6`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
              Fee Operations & Admin Automation
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">From fee plans to compliance trails</h2>
            <p className="text-gray-400 max-w-2xl">
              A practical ops layer for fee structure, collections, staff, transport, visitors, and
              document control — built for multi-campus school groups.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feeAdminItems.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 bg-[#0a0a0a] border border-white/10 rounded-2xl p-5"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#667eea]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See it on your school data</h2>
          <p className="text-gray-400 mb-8">
            Book a demo for fee operations, parent communication, or full school automation.
          </p>
          <button
            type="button"
            onClick={() => openDemoModal()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all"
          >
            Book a Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GnanovaLogo height={32} />
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/finance" className="hover:text-white transition-colors">
              Finance
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-xs text-gray-500 text-center md:text-right max-w-sm">
            © 2026 Gnanova Pro AI Technologies Private Limited. All rights reserved. | CIN:
            U62099TS2026PTC221233
          </p>
        </div>
      </footer>
    </div>
  );
};
