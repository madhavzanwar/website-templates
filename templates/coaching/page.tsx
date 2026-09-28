'use client';

import React, { useState } from 'react';
import defaultContent from './fallback_content.json';
import { 
  GraduationCap, BookOpen, Award, Users, CheckCircle, 
  Phone, Mail, MapPin, MessageSquare, Clock, ArrowRight, Star
} from 'lucide-react';

interface CoachingPageProps {
  customContent?: any;
}

export default function CoachingPage({ customContent }: CoachingPageProps = {}) {
  const content = customContent || defaultContent;
  const { branding, stats, about, courses, gallery, faculty, testimonials, contact, footer } = content;

  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedClass, setSelectedClass] = useState('11th / 12th Science (JEE/NEET)');
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = (contact.whatsapp_number || contact.phone || '').replace(/\D/g, '');
  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello! I would like to book a demo class at ${branding.business_name}. Name: ${studentName}, Phone: ${studentPhone}, Course: ${selectedClass}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    setSubmitted(true);
    window.open(waUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#1E40AF] selection:text-white">
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --color-brand-primary: ${branding.primary_color || '#1E40AF'};
          --color-brand-secondary: ${branding.secondary_color || '#0F172A'};
        }
      `}</style>

      {/* Top Notification Bar */}
      <div className="bg-[#1E40AF] text-white px-4 py-2 text-center text-xs sm:text-sm font-medium tracking-wide">
        <span className="inline-block mr-2 px-2 py-0.5 bg-amber-400 text-slate-900 text-xs font-bold rounded">ADMISSIONS OPEN</span>
        {branding.badge || "Admissions Open for 2026-27 Academic Year — Limited Batch Size"}
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                {branding.business_name}
              </div>
              <div className="text-xs text-blue-700 font-semibold tracking-wide uppercase mt-0.5">
                {branding.tagline || "Tuition & Competitive Coaching"}
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-700 transition">About Us</a>
            <a href="#courses" className="hover:text-blue-700 transition">Courses</a>
            <a href="#results" className="hover:text-blue-700 transition">Results</a>
            <a href="#contact" className="hover:text-blue-700 transition">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(contact.whatsapp_message || 'Hello!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href="#enroll"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md shadow-blue-700/20 transition"
            >
              Book Free Demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-gradient-to-b from-blue-50/50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <Award className="h-4 w-4 text-blue-700" />
                Trusted Coaching Institute in Pune
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {branding.hero_headline || "Empowering Bright Minds For Academic Excellence"}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {branding.hero_subheadline || "Personalized academic mentoring, structured test series, and dedicated concept teachers in Pune."}
              </p>

              {/* Stats Bar */}
              {stats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                  {stats.map((st: any, idx: number) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="text-xl sm:text-2xl font-black text-blue-700">{st.value}</div>
                      <div className="text-xs font-medium text-slate-500 mt-0.5">{st.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#enroll"
                  className="px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-700/25 transition flex items-center gap-2"
                >
                  Book Free Demo Class
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#courses"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-xs transition"
                >
                  Explore All Batches
                </a>
              </div>
            </div>

            {/* Hero Image / Form Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                <img
                  src={branding.hero_image}
                  alt={branding.business_name}
                  className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">Interactive Classroom</div>
                    <div className="text-lg font-bold">Small Batches with Individual Doubt Solving</div>
                    <div className="text-xs text-slate-300">Modern AC Classrooms · Paud Road & Pune Center</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              PROGRAMS & BATCHES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Targeted Academic & Competitive Courses
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Structured year-round curricula aligned with latest school board exams and national entrance patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses && courses.map((course: any) => (
              <div
                key={course.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white p-6 sm:p-8 hover:shadow-xl hover:border-blue-300 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-800 rounded-md">
                      {course.category}
                    </span>
                    <span className="text-sm font-extrabold text-blue-700">
                      {course.fee}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {course.highlights && course.highlights.map((h: string, hidx: number) => (
                      <div key={hidx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">Duration: {course.duration}</span>
                  <a
                    href="#enroll"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    Inquire For Syllabus →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-md">
                PEDAGOGY & PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {about.title}
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {about.paragraphs.map((p: string, pidx: number) => (
                  <p key={pidx}>{p}</p>
                ))}
              </div>

              {about.features && (
                <div className="space-y-3 pt-2">
                  {about.features.map((f: string, fidx: number) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {gallery && gallery.slice(0, 4).map((img: any, gidx: number) => (
                  <div key={gidx} className="rounded-xl overflow-hidden shadow-sm group">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="results" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              PROVEN TRACK RECORD
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Student Stories & Academic Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials && testimonials.map((t: any, tidx: number) => (
              <div key={tidx} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-2 border-t border-slate-200">
                  <div className="font-bold text-slate-900">{t.student}</div>
                  <div className="text-xs font-semibold text-blue-700">{t.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking / Enrollment Form */}
      <section id="enroll" className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                FREE DEMO SESSION
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {contact.inquiry_form?.title || "Book Your Free Diagnostic Test & Demo Lecture"}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {contact.inquiry_form?.description || "Experience our teaching firsthand. Attend any ongoing subject class for free with zero obligation."}
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>{contact.phone}</span>
                </div>
                {contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>{contact.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>Office Hours: 08:00 AM – 08:30 PM (Mon-Sat)</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-white text-slate-900 p-8 shadow-2xl">
                <h3 className="text-xl font-extrabold mb-2">Register For Free Demo Class</h3>
                <p className="text-xs text-slate-500 mb-6">Enter details below to confirm attendance with the faculty.</p>

                {submitted ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
                    <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                    <div className="font-bold text-emerald-900 text-lg">Inquiry Sent via WhatsApp!</div>
                    <div className="text-xs text-emerald-700">Our academic counselor will get in touch with you shortly.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Student / Parent Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Rahul Patil"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        WhatsApp Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        placeholder="e.g. 98220 12345"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Target Class / Exam
                      </label>
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="11th / 12th Science (JEE Main & Adv)">11th / 12th Science (JEE Main & Adv)</option>
                        <option value="11th / 12th Science (NEET Medical)">11th / 12th Science (NEET Medical)</option>
                        <option value="Class 8th to 10th (CBSE / ICSE / SSC)">Class 8th to 10th (CBSE / ICSE / SSC)</option>
                        <option value="11th / 12th Commerce & CA Foundation">11th / 12th Commerce & CA Foundation</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 mt-4"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Confirm Free Demo on WhatsApp →
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>{footer?.copyright || `© 2026 ${branding.business_name}. All Rights Reserved.`}</div>
          <div className="text-slate-500">
            {branding.business_name} · Pune, Maharashtra · Verified Educational Facility
          </div>
        </div>
      </footer>
    </main>
  );
}
