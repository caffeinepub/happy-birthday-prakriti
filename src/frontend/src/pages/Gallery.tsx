import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PHOTOS = [
  {
    src: "/assets/uploads/images_5-019d3509-9ec4-7437-a513-2551ddeaf850-1.jpeg",
    caption: "Radiant & Ready! 🌟",
  },
  {
    src: "/assets/uploads/images_3-019d3509-bd33-7605-a383-aebf9f58ad43-2.jpeg",
    caption: "Pure Squad Energy 💛",
  },
  {
    src: "/assets/uploads/images_2-019d3509-d18e-77c5-92f8-583e85af1da7-3.jpeg",
    caption: "Camera-Ready Always 📸",
  },
  {
    src: "/assets/uploads/images_1-019d3509-d1ab-767a-aba0-a30243ba027f-4.jpeg",
    caption: "The One & Only Prakriti ✨",
  },
  {
    src: "/assets/uploads/images_6-019d3509-d169-7786-93a1-6c0cd6a17c64-5.jpeg",
    caption: "Iconic Moments 🎬",
  },
  {
    src: "/assets/uploads/images_4-019d3509-d1af-7230-a531-6e4b690f02fd-6.jpeg",
    caption: "Content Creator Mode: ON 🎥",
  },
  {
    src: "/assets/uploads/images-019d3509-d245-77c1-aa04-4c36ac15868a-7.jpeg",
    caption: "Shining Like the Star She Is 🌟",
  },
  {
    src: "/assets/uploads/images_1-019d37dd-80b4-74ff-ae39-ba7534951897-1.webp",
    caption: "Pihu's Iconic Look 🎬",
  },
  {
    src: "/assets/uploads/images_1-019d37dd-80e9-7249-9314-1c61f6a7a6b4-2.jpeg",
    caption: "The Star of the Show ✨",
  },
  {
    src: "/assets/uploads/5cf9b59802ad1b874cde01b2cd96226d-019d37dd-80de-7605-b5a4-4f2fb691539e-3.jpg",
    caption: "Pihu's Squad Vibes 💛",
  },
  {
    src: "/assets/uploads/images-019d37dd-80d5-7388-b03c-da841a2b473c-4.jpeg",
    caption: "Candid Moments 📸",
  },
  {
    src: "/assets/uploads/images_2-019d37dd-81a7-761f-983a-8f517a123a51-5.jpeg",
    caption: "Airport Looks 🌸",
  },
  {
    src: "/assets/uploads/bbd19915e45ac650f417b625c356132f-019d37dd-81a9-75a3-8e94-8d4bd4ed3aed-6.jpg",
    caption: "Gorgeous & Graceful 🌹",
  },
  {
    src: "/assets/uploads/images-019d37dd-82dc-753f-9e4a-ecc7e4d94695-7.webp",
    caption: "Festival Queen 👑",
  },
];

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null,
    );
  const next = () =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % PHOTOS.length : null));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page Header */}
      <section
        className="py-16 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.90 0.04 15) 0%, oklch(0.951 0.022 88) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, oklch(0.64 0.10 70 / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.56 0.08 10 / 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-inter text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.54 0.07 12)" }}
          >
            📸 All 14 Photos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-playfair font-bold text-4xl md:text-5xl mb-4"
            style={{ color: "oklch(0.20 0.018 42)" }}
          >
            Prakriti's Photo Gallery 🎬
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-inter text-base"
            style={{ color: "oklch(0.45 0.03 40)" }}
          >
            Iconic moments from our favourite content creator ✨
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section
        className="py-12 px-4"
        style={{ background: "oklch(0.951 0.022 88)" }}
        data-ocid="gallery.section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                className="photo-card group rounded-2xl overflow-hidden cursor-pointer relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                style={{
                  boxShadow: "0 4px 20px oklch(0.20 0.018 42 / 0.12)",
                  border: "2px solid oklch(0.88 0.02 80)",
                  aspectRatio: i % 3 === 0 ? "3/4" : "1/1",
                }}
                onClick={() => setLightboxIdx(i)}
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.20 0.018 42 / 0.7), transparent)",
                  }}
                >
                  <p className="font-playfair text-white text-sm font-medium">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "oklch(0.10 0.01 42 / 0.92)" }}
            onClick={() => setLightboxIdx(null)}
            data-ocid="gallery.modal"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[lightboxIdx].src}
                alt={PHOTOS[lightboxIdx].caption}
                className="w-full max-h-[75vh] object-contain rounded-2xl"
              />
              <p
                className="text-center font-playfair font-medium mt-3 text-lg"
                style={{ color: "oklch(0.88 0.02 80)" }}
              >
                {PHOTOS[lightboxIdx].caption}
              </p>

              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.64 0.10 70)", color: "white" }}
                data-ocid="gallery.close_button"
              >
                <X size={16} />
              </button>

              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.98 0.008 80 / 0.9)",
                  color: "oklch(0.20 0.018 42)",
                }}
                data-ocid="gallery.pagination_prev"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.98 0.008 80 / 0.9)",
                  color: "oklch(0.20 0.018 42)",
                }}
                data-ocid="gallery.pagination_next"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
