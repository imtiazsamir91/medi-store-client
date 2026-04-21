"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createReview } from "@/services/medicine.service";
import { useRouter } from "next/navigation";
import { Star, MessageSquare, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewForm({ medicineId, userId }: { medicineId: string; userId: string }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createReview(medicineId, {
      userId,
      rating,
      comment,
    });

    if (res.success) {
      toast.success("Experience shared successfully!");
      setComment("");
      setRating(5);
      router.refresh();
    } else {
      toast.error(res.message || "Failed to submit review");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-[#0F0E47]/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/5 shadow-2xl"
    >
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute -top-24 -right-24 size-48 bg-[#8686AC]/10 blur-[80px] rounded-full" />
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-[#272757] to-[#505081] flex items-center justify-center border border-white/10 shadow-inner">
            <Star className="text-yellow-400 fill-yellow-400 size-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight leading-none uppercase">
              Rate Experience
            </h3>
            <p className="text-[#8686AC] text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
              MediStore Trust & Care
            </p>
          </div>
        </div>

       
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#8686AC] uppercase tracking-widest block">
            Overall Satisfaction
          </label>
          <div className="flex gap-2 p-4 bg-white/[0.03] rounded-2xl border border-white/5 w-fit">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
              >
                <Star
                  className={`size-7 transition-colors duration-300 ${
                    star <= (hover || rating)
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                      : "text-zinc-700 fill-transparent"
                  }`}
                />
              </button>
            ))}
            <span className="ml-4 text-white font-black text-lg self-center">
              {hover || rating}.0
            </span>
          </div>
        </div>

       
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#8686AC] uppercase tracking-widest block">
            Detailed Feedback
          </label>
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 text-[#8686AC] size-5 group-focus-within:text-white transition-colors" />
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the effectiveness or side effects..."
              className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/5 rounded-[24px] text-white text-sm min-h-[140px] focus:outline-none focus:border-[#8686AC]/40 focus:bg-white/[0.05] transition-all placeholder:text-zinc-600 resize-none"
            />
          </div>
        </div>

       
        <button
          type="submit"
          disabled={loading}
          className="relative w-full group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#272757] via-[#505081] to-[#272757] group-hover:opacity-90 transition-opacity" />
          <div className="relative flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 text-white font-black text-[11px] uppercase tracking-[0.2em]">
            {loading ? (
              <Loader2 className="animate-spin size-5" />
            ) : (
              <>
                <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Publish Review
              </>
            )}
          </div>
        </button>
      </form>
    </motion.div>
  );
}