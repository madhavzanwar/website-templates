import React from 'react';
import { MessageCircle, PhoneCall, MapPin, Clock } from 'lucide-react';

export default function BookingSection({ content }: { content: any }) {
  return (
    <section id="book" className="bg-[#C8A94A] py-24 px-6 md:px-16 text-[#0F241C]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        
        <div className="w-full md:w-1/2">
          <h2 className="font-cormorant text-6xl md:text-8xl mb-8 leading-none">
            {content.bookingSection.title}
          </h2>
          <p className="font-nunito text-xl mb-12 opacity-90 max-w-md">
            {content.bookingSection.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <a 
              href={`https://wa.me/${content.contact.whatsappNumber}?text=${encodeURIComponent(content.contact.whatsappPrefillMessage)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#0F241C] text-[#F5F0E8] px-8 py-4 font-nunito font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#1B4332] transition-colors"
            >
              <MessageCircle /> {content.bookingSection.directWhatsappLabel}
            </a>
            <a 
              href={`tel:${content.contact.phone}`}
              className="border-2 border-[#0F241C] text-[#0F241C] px-8 py-4 font-nunito font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#0F241C] hover:text-[#C8A94A] transition-colors"
            >
              <PhoneCall /> {content.bookingSection.directCallLabel}
            </a>
          </div>
          
          <div className="font-nunito space-y-6 opacity-90">
            <div className="flex items-start gap-4">
              <MapPin className="flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg">Clinic Address</p>
                <p>{content.location.fullAddress}</p>
                <p className="text-sm mt-1">{content.bookingSection.parkingNotice}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-lg">Clinic Hours</p>
                <p>{content.hours.weekdays}</p>
                <p>{content.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-[#F5F0E8] p-10 md:p-16">
          <h3 className="font-cormorant text-4xl mb-8 text-[#1B4332]">
            {content.bookingSection.formTitle}
          </h3>
          <form className="font-nunito flex flex-col gap-6">
            <div>
              <label className="block text-[#1B4332] font-semibold mb-2">Full Name</label>
              <input type="text" className="w-full bg-transparent border-b-2 border-[#1B4332]/30 py-3 outline-none focus:border-[#C8A94A] transition-colors text-[#1B4332]" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label className="block text-[#1B4332] font-semibold mb-2">Phone Number</label>
              <input type="tel" className="w-full bg-transparent border-b-2 border-[#1B4332]/30 py-3 outline-none focus:border-[#C8A94A] transition-colors text-[#1B4332]" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label className="block text-[#1B4332] font-semibold mb-2">Primary Condition / Pain Area</label>
              <input type="text" className="w-full bg-transparent border-b-2 border-[#1B4332]/30 py-3 outline-none focus:border-[#C8A94A] transition-colors text-[#1B4332]" placeholder="e.g. Lower Back Pain" />
            </div>
            <div>
              <label className="block text-[#1B4332] font-semibold mb-2">Preferred Slot</label>
              <select className="w-full bg-transparent border-b-2 border-[#1B4332]/30 py-3 outline-none focus:border-[#C8A94A] transition-colors text-[#1B4332]">
                {content.bookingSection.slots.map((slot: string, idx: number) => (
                  <option key={idx} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <button type="button" className="bg-[#1B4332] text-[#F5F0E8] py-4 mt-4 font-bold text-lg hover:bg-[#0F241C] transition-colors">
              Submit Request
            </button>
          </form>
        </div>
        
      </div>
    </section>
  );
}
