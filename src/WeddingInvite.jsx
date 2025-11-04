import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';

// Wedding Invite - React Component (Enhanced Visuals, Romantic Palette)
// - Uses Tailwind utility classes for layout; additional custom CSS is embedded via a <style> tag.
// - RSVP handled with React (no inline <script> tags).
// - Uses Unsplash images for preview; replace URLs with your local /images/* when ready.

export default function WeddingInvite() {
  const formRef = useRef(null);
  const [savedCount, setSavedCount] = useState(0);
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxIn357B-3rk0vNfLAqyzIinXHcW8Uenx-14_N8yR3zxVNqfh4jrqc4_1VWsQj6s87urA/exec";

  useEffect(() => {
    // load existing RSVPs count
    // const store = JSON.parse(localStorage.getItem('ankit_rsvps') || '{}');
    // setSavedCount(Object.keys(store).length);

    async function fetchCount() {
      try {
        const res = await fetch(GOOGLE_SCRIPT_URL);
        const data = await res.json();
        setSavedCount(data.totalRSVPs);
      } catch (error) {
        console.error("Error fetching RSVP count:", error);
      }
    }

    fetchCount();

    // Optional: refresh every 30s for live updates
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    // Get data from form
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    
    const key = data.phone || data.email || data.name;

    // Basic validation
    if (!key) return alert("Please provide at least a name or contact");

    // Save locally (your existing logic)
    const store = JSON.parse(localStorage.getItem("ankit_rsvps") || "{}");
    store[key] = data;
    localStorage.setItem("ankit_rsvps", JSON.stringify(store));

    // Update count on page
    setSavedCount(Object.keys(store).length);
    
    // ✅ Send to Google Sheet
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (data?.attend === "yes") {
        alert("We're thrilled you can make it! Bring your dancing shoes!");
      } else if (data?.attend === "no") {
        alert("We'll miss your sparkle but understand. Check out the Gallery & celebrate with us virtually!");
      }else {
        alert("Maybe means 'You need more time to practice your dance moves' right?");
      }
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      // alert("Saved locally, but failed to send to Google Sheet.");
      alert("We're having trouble with your RSVP submission. Please try again or contact us at +91-7597517909.");
    }

    // Reset form
    form.reset();

  }

  // gentle falling petals animation (small decorative effect)
  const [petals] = useState(() => Array.from({ length: 12 }).map((_, i) => ({ id: i })));
  const [name, setName] = useState("");

  return (
    <div className="reltive min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#fff6f4,_#fff)] text-[#2b2b2b] antialiased overflow-hidden">
      {/* paste near the top-level wrapper */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <span className="petal" style={{ left: '8%', top: '18%', fontSize: 30, transform: 'rotate(-10deg)' }}>🌸</span>
        <span className="petal" style={{ left: '70%', top: '24%', fontSize: 36, animationDelay: '1s' }}>💮</span>
        <span className="petal" style={{ left: '40%', top: '78%', fontSize: 42, animationDelay: '1s' }}>✨</span>
      </div>
      
      {/* Embedded styles: fonts, ornaments, small overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Montserrat:wght@300;400;600&family=Great+Vibes&display=swap');
        .script { font-family: 'Great Vibes', cursive; }
        .serif { font-family: 'Playfair Display', serif; }
        .sans { font-family: 'Montserrat', sans-serif; }

        /* Petals animation */
        .petal { position: fixed; top: -10vh; width: 20px; height: 20px; opacity: 0.9; transform: translateX(0); pointer-events: none; animation: fall 9s linear infinite; }
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(120vh) rotate(360deg); } }

        /* decorative divider under headings */
        .divider { height: 6px; width: 80px; border-radius: 6px; background: linear-gradient(90deg,#ff7b6b,#f4b5a7); margin: 12px auto 0; }

        /* center headings */
        .section-title { text-align: center; font-family: 'Playfair Display', serif; font-weight:700; }

        /* gallery masonry simple */
        .masonry { column-count: 3; column-gap: 16px; }
        .masonry img { width: 100%; display: block; margin-bottom: 16px; border-radius: 12px; }
        @media (max-width: 1024px) { .masonry { column-count: 2; } }
        @media (max-width: 640px) { .masonry { column-count: 1; } }

        /* badge for dress theme */
        .badge { display:inline-block; padding:6px 12px; background:linear-gradient(90deg,#d81b60,#ff7b6b); color:white; border-radius:999px; font-weight:700; }
      `}</style>

      {/* floating petals (decorative) */}
      {petals.map((p, i) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            transform: `translateY(-10vh) rotate(${Math.random() * 360}deg)`,
            background: 'radial-gradient(circle at 30% 30%, #ffd7df, #ffb3c6)'
          }}
        />
      ))}

      {/* HERO */}
      <motion.header
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        {/* Left Section */}
        <div className="px-2 sm:px-6 md:px-8 lg:px-12">
          <div className="text-md sans text-[#b9804a] font-semibold mb-6 sm:mb-8">
            You're Invited
          </div>

          <h1 className="script text-5xl sm:text-6xl md:text-7xl leading-tight text-[#3a2b2b]">
            Ankit &amp; Divya
          </h1>

          <p className="mt-6 max-w-2xl sans text-base sm:text-lg text-[#5a5858]">
            With joy in our hearts, we invite you to join us for a beautiful two-day celebration of love and family. Please find the events, venue details and ways to share your photos below.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
            >
              RSVP
            </motion.a>

            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-3 border border-slate-200 px-5 py-3 rounded-lg text-slate-700 bg-white font-semibold shadow-md cursor-pointer"
            >
              Wedding Details
            </motion.a>
          </div>

          {/* Date & Venue */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg">
            <div>
              <div className="text-sm text-[#8b8b8b]">Date</div>
              <div className="mt-1 serif text-base font-semibold">
                November 24 - 25, 2025
              </div>
            </div>
            <div>
              <div className="text-sm text-[#8b8b8b]">Venue</div>
              <div className="mt-1 serif text-base font-semibold">
                Agrasen Resort &amp; Hotel, Didwana
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex justify-center md:justify-end w-full md:w-auto p-2 sm:p-4"
        >
          <div className="bg-white rounded-3xl p-4 shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm">
            <img
              src="/images/MCL_5388.JPG"
              alt="couple"
              className="w-full h-64 sm:h-72 object-cover rounded-xl"
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="font-semibold">#AnD_That’s_Love</div>
              <div className="text-sm text-[#b9804a]">Nov 24 • 25</div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* DETAILS */}
      <section id="details" className="max-w-6xl mx-auto px-6 mt-20 pt-8">
        <h2 className="section-title text-3xl serif">Wedding Events</h2>
        <div className="divider" />
        <p className="text-center sans text-[#6b6b6b] mt-4">We have planned meaningful ceremonies across two days — we hope you can celebrate with us.</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
              <h4 className="serif text-xl font-semibold text-[#C76D6D] drop-shadow-[0_0_5px_rgba(199,109,109,0.4)] hover-shimmer">Swarna Aarambh — The Haldi Ceremony 💛</h4>
              {/* <h4 className="serif text-xl font-semibold">Minted Sunshine Haldi</h4> */}
              <div className="text-sm text-[#007C77] mt-1">Monday, November 24, 2025 • 12:15 PM - 3:15 PM</div>
              <p className="mt-3 text-[#4b4b4b]">Traditional Haldi ceremony followed by lunch. <br></br>
              {/* <strong>Theme:</strong> <span className="font-semibold text-[#7c5cc4]">Lavender / Purple</span></p> */}
              <strong>Theme:</strong> <span className="font-semibold text-[#DDA0DD]">Lavender / </span>
              <span className="font-semibold text-[#7c5cc4]">Purple</span></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
              <h4 className="serif text-xl font-semibold text-[#C76D6D] drop-shadow-[0_0_5px_rgba(199,109,109,0.4)] hover-shimmer">Rang Mahal Raas — The Sangeet Evening 💃</h4>
              {/* <h4 className="serif text-xl font-semibold">Jashn-e-Mastani (Mahila Sangeet)</h4> */}
              <div className="text-sm text-[#007C77] mt-1">Monday, November 24, 2025 • 7:15 PM - 10:30 PM</div>
              <p className="mt-3 text-[#4b4b4b]">An evening of music and dance — ladies take the spotlight. <br></br>Dress comfortably to groove!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
              <h4 className="serif text-xl font-semibold text-[#C76D6D] drop-shadow-[0_0_5px_rgba(199,109,109,0.4)] hover-shimmer">Vansh Vandana — The Mayra Ritual 🌺</h4>
              <div className="text-sm text-[#007C77] mt-1">Tuesday, November 25, 2025 • 12:15 PM</div>
              <p className="mt-3 text-[#4b4b4b]">A serene family ritual — joyful shower of love and gifts from the maternal uncle.<br></br>
              {/* <strong> Theme:</strong> <span className="badge">Rani Pink</span></p> */}
              <strong> Theme:</strong> <span className="font-semibold text-[#AA336A]">Rani Pink</span></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* <motion.article initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: .2, ease: 'easeOut' }} className="bg-white p-4 rounded-2xl shadow-md"> */}
              <h4 className="serif text-xl font-semibold text-[#C76D6D] drop-shadow-[0_0_5px_rgba(199,109,109,0.4)] hover-shimmer">Divya Milan — The Royal Wedding Night 💍</h4>
              {/* <h4 className="serif text-xl font-semibold">Shaam-e-Shahi Shagna</h4> */}
              {/* <h4 className="serif text-xl font-semibold">Shagna di Shaam — Wedding Night</h4> */}
              <div className="text-sm text-[#007C77] mt-1">Tuesday, November 25, 2025 • Nikasi 6:15 PM</div>
              <p className="mt-3 text-[#4b4b4b]">An auspicious evening ceremony followed by a celebratory dinner.</p>
            {/* </motion.article> */}
          </motion.div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="max-w-6xl mx-auto px-6 mt-20 pt-4">
        <h2 className="section-title text-3xl serif">Venue &amp; Location</h2>
        <div className="divider" />
        <div className="bg-white rounded-3xl shadow-lg mt-6 overflow-hidden p-6 grid md:grid-cols-2 gap-6 items-center">
          <img src="/images/Venue.jpg" alt="venue" className="rounded-2xl object-cover w-full h-72" />
          <div>
            <h3 className="serif text-2xl font-semibold">Agrasen Resort &amp; Hotel</h3>
            <p className="text-sm text-[#6b6b6b] mt-2">Didwana D.T.O. office, Didwana, Rajasthan 341303</p>
            <p className="mt-4 text-[#4b4b4b]">A comfortable and welcoming property with lawns and halls — perfect for our multi-day gathering. Easy road access and ample parking are available.</p>
            <div className="mt-6 flex gap-4">
              <a href="https://www.google.com/maps/search/Agrasen+Resort+Didwana" target="_blank" rel="noreferrer" className="bg-gradient-to-r from-[#d81b60] to-[#ff7b6b] text-white px-5 py-3 rounded-lg font-semibold shadow-md">View on Google Maps</a>
              <a href="tel:+919024223336" className="border border-slate-200 px-5 py-3 rounded-lg">Contact Venue</a>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 mt-20 pt-12">
        <h2 className="section-title text-3xl serif">Photo Gallery</h2>
        <div className="divider" />
        <p className="text-center mt-3 text-[#6b6b6b]">A glimpse into our journey together — upload photos during the wedding to see them here.</p>

        <div className="masonry mt-8">
          {["DSC08009.JPG","MCL_5711.JPG","DSC07925.JPG","MCL_5388.JPG","MCL_5189.JPG"].map((img, i) => (
            <img key={i} src={`/images/${img}`} alt={`gallery-${i}`} />
          ))}
        </div>
      </section>

      {/* SHARE PHOTOS */}
      <section id="share" className="max-w-6xl mx-auto px-6 mt-20 pt-16">
        <h2 className="section-title text-3xl serif">Share Your Photos</h2>
        <div className="divider" />
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6 flex flex-col md:flex-row items-center gap-6">
          <img src={`/images/Qrcode.png`} alt="qrcode" className="w-44 h-44 object-contain rounded-lg" />
          <div>
            <p className="text-[#4b4b4b]">Scan the QR code during the wedding to upload your photos to our shared album.</p>
            <ol className="list-decimal ml-6 mt-3 text-sm text-[#6b6b6b]"><li>Open your phone camera and scan the QR code.</li><li>Select photos from your gallery.</li><li>Add a caption (optional) and upload.</li></ol>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="max-w-6xl mx-auto px-6 mt-20 pb-16 pt-8">
        <h2 className="section-title text-3xl serif">RSVP</h2>
        <div className="divider" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }} className="mt-6 bg-gradient-to-r from-[#d81b60] to-[#ff7b6b] p-8 rounded-3xl text-white shadow-xl">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
              <input name="name" placeholder="Full Name" className="p-3 rounded-lg text-slate-800" required />
              <input name="phone" placeholder="WhatsApp number for updates" className="p-3 rounded-lg text-slate-800" />
              <input name="count" placeholder="Number of Adults" className="p-3 rounded-lg text-slate-800" />
              <input name="email" placeholder="Email (optional)" className="p-3 rounded-lg text-slate-800" />
              <select name="attend" className="p-3 rounded-lg text-slate-800">
                {/* <option value="" disabled selected hidden>Will you be able to join us for our special day? 💕</option> */}
                <option value="" disabled selected hidden>Will you celebrate with us? 💕</option>
                <option value="yes">Yes, absolutely! 🎉</option>
                <option value="no">Sorry, can't make it 😔</option>
                <option value="maybe">Maybe, still figuring it out 🤔</option>
              </select>
              <div className="md:col-span-2 flex items-center justify-between">
                <div className="text-md">Saved RSVPs: <strong>{savedCount}</strong></div>
                <button type="submit" className="bg-white text-[#d81b60] px-6 py-3 rounded-lg font-semibold">Submit RSVP</button>
                
              </div>
            </form>
        </motion.div>
      </section>

      <footer className="text-center text-[#6b6b6b] mt-12 pb-12">Made with ❤️ — See you on Nov 24–25, 2025</footer>
    </div>
  )
}
