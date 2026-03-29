import { useMemo, useState, useEffect, type ImgHTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MotionSection from "@/components/motion/Section";
import { fadeInUp, stagger, hoverLift } from "@/lib/motion";

import idliImg from "@/assets/menu/idli.png";
import masalaDosaImg from "@/assets/menu/masala-dosa.webp";
import pesarattuImg from "@/assets/menu/pesarattu-upma.jpg";
import vegMealsImg from "@/assets/menu/andhra-veg-meals.jpg";
import naatuKodiImg from "@/assets/menu/naatu-kodi-pulusu.webp";
import gonguraMuttonImg from "@/assets/menu/gongura-mutton-biryani.jpeg";
import chicken65Img from "@/assets/menu/chicken-65.jpg";
import gunturChickenImg from "@/assets/menu/guntur-chilli-chicken.webp";
import gonguraChickenImg from "@/assets/menu/gongura-chicken-biryani.JPG";
import fishFryImg from "@/assets/menu/rayalaseema-fish-fry.jpg";
import prawnsRoastImg from "@/assets/menu/prawns-roast.jpg";
import haleemImg from "@/assets/menu/haleem.jpg";
import malabarFishCurryImg from "@/assets/menu/malabar-fish-curry.jpg";
import potlamBiryaniImg from "@/assets/menu/potlam-biryani.jpg";
import chettinadChickenImg from "@/assets/menu/chettinad-chicken.jpeg";
import meduVadaImg from "@/assets/menu/medu-vada.webp";
import koliwadaPrawnsImg from "@/assets/menu/koliwada-prawns.jpg";
import gunpowderDosaImg from "@/assets/menu/gunpowder-dosa.jpg";
import filterCoffeeImg from "@/assets/menu/filter-coffee.jpg";
import payasamImg from "@/assets/menu/payasam.jpg";
import teaImg from "@/assets/menu/prakasham-special-tea.jpg";
import fallbackImg from "@/assets/menu/fallback.jpg";

/* =========================
   Types
   ========================= */
type Category = "All" | "Breakfast" | "Lunch" | "Dinner" | "Specials";
type CollectionKey = "signature" | "starters" | "beverages";

type Dish = {
  id: string;
  name: string;
  price: number;
  category: Exclude<Category, "All">;
  image: string;
  desc: string;
  spicy?: boolean;
};

/* =========================
   Helpers
   ========================= */
const FALLBACK_IMG = fallbackImg;

function ImageWithFallback(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      {...props}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG;
      }}
      loading="lazy"
    />
  );
}

/* =========================
   Data
   ========================= */
const DISHES: Dish[] = [
  // BREAKFAST
  {
    id: "bf-idli",
    name: "Steamed Idli (3)",
    price: 49,
    category: "Breakfast",
    image: idliImg,
    desc: "Soft rice cakes with coconut & tomato chutneys, ghee.",
  },
  {
    id: "bf-dosa",
    name: "Masala Dosa",
    price: 99,
    category: "Breakfast",
    image: masalaDosaImg,
    desc: "Crispy dosa stuffed with spiced potato masala.",
  },
  {
    id: "bf-pesarattu",
    name: "Pesarattu & Upma",
    price: 149,
    category: "Breakfast",
    image: pesarattuImg,
    desc: "Andhra green gram dosa with hot upma, ginger chutney.",
  },

  // LUNCH
  {
    id: "l-meals",
    name: "Andhra Veg Meals",
    price: 249,
    category: "Lunch",
    image: vegMealsImg,
    desc: "Multiple Veg Dishes",
  },
  {
    id: "l-natukodi",
    name: "Naatu Kodi Pulusu",
    price: 399,
    category: "Lunch",
    image: naatuKodiImg,
    desc: "Country-chicken stew simmered with Andhra spices.",
    spicy: true,
  },
  {
    id: "l-gongura-bir",
    name: "Gongura Mutton Biryani",
    price: 499,
    category: "Lunch",
    image: gonguraMuttonImg,
    desc: "Signature biryani scented with sorrel leaves and ghee.",
    spicy: true,
  },

  // DINNER
  {
    id: "d-chicken65",
    name: "Chicken 65 (Andhra style)",
    price: 269,
    category: "Dinner",
    image: chicken65Img,
    desc: "Crispy fried chicken tossed with curry leaves & chillies.",
    spicy: true,
  },
  {
    id: "d-guntur-chicken",
    name: "Guntur Chilli Chicken",
    price: 199,
    category: "Dinner",
    image: gunturChickenImg,
    desc: "Fiery and addictive, finished with crushed chilli.",
    spicy: true,
  },
  {
    id: "d-gongura-chicken-bir",
    name: "Gongura Chicken Biryani",
    price: 349,
    category: "Dinner",
    image: gonguraChickenImg,
    desc: "Marinated chicken biryani with sorrel leaves & ghee.",
    spicy: true,
  },
  {
    id: "d-fish",
    name: "Rayalaseema Fish Fry",
    price: 299,
    category: "Dinner",
    image: fishFryImg,
    desc: "Seer fish marinated and pan-seared, lemon & onion.",
  },

  // SPECIALS
  {
    id: "s-prawn-roast",
    name: "Prawns Roast",
    price: 249,
    category: "Specials",
    image: prawnsRoastImg,
    desc: "Prawns with tasty special masalas speciality.",
    spicy: true,
  },
  {
    id: "s-gongura-bir",
    name: "Gongura Mutton Biryani",
    price: 499,
    category: "Specials",
    image: gonguraMuttonImg,
    desc: "Signature biryani scented with sorrel leaves and ghee.",
    spicy: true,
  },
  {
    id: "s-hyderabadi-haleem",
    name: "Weekend Haleem (Seasonal)",
    price: 149,
    category: "Specials",
    image: haleemImg,
    desc: "Slow-cooked with butter & meat, topped with fried onions.",
  },

  // SIGNATURE
  {
    id: "c-malabar-fish-curry",
    name: "Malabar Fish Curry",
    price: 350,
    category: "Dinner",
    image: malabarFishCurryImg,
    desc: "Fresh catch in coconut curry with Kodampuli.",
  },
  {
    id: "c-potlam-biryani",
    name: "Potlam Biryani",
    price: 400,
    category: "Dinner",
    image: potlamBiryaniImg,
    desc: "Fragrant basmati rice with tender mutton and saffron.",
  },
  {
    id: "c-chettinad-chicken",
    name: "Chettinad Chicken",
    price: 300,
    category: "Dinner",
    image: chettinadChickenImg,
    desc: "Spicy Tamil specialty with roasted spices and curry leaves.",
    spicy: true,
  },

  // STARTERS
  {
    id: "c-medu-vada",
    name: "Medu Vada",
    price: 60,
    category: "Breakfast",
    image: meduVadaImg,
    desc: "Crispy lentil donuts served with sambar and chutneys.",
  },
  {
    id: "c-koliwada-prawns",
    name: "Koliwada Prawns",
    price: 250,
    category: "Dinner",
    image: koliwadaPrawnsImg,
    desc: "Spicy battered prawns with curry leaf tempering.",
    spicy: true,
  },
  {
    id: "c-gunpowder-dosa",
    name: "Gunpowder Dosa",
    price: 149,
    category: "Breakfast",
    image: gunpowderDosaImg,
    desc: "Crispy dosa with spicy gun powder and ghee.",
  },

  // BEVERAGES / DESSERTS
  {
    id: "c-filter-coffee",
    name: "Filter Coffee",
    price: 150,
    category: "Specials",
    image: filterCoffeeImg,
    desc: "Authentic South Indian coffee in a traditional tumbler.",
  },
  {
    id: "c-payasam",
    name: "Payasam",
    price: 199,
    category: "Specials",
    image: payasamImg,
    desc: "Variety of traditional sweet puddings.",
  },
  {
    id: "c-prakasham-special-tea",
    name: "Prakasham Special Tea",
    price: 80,
    category: "Specials",
    image: teaImg,
    desc: "Soothing, ginger-infused tea.",
  },
];

/* =========================
   Collections (STRICT ID lists)
   ========================= */
const COLLECTION_LABEL: Record<CollectionKey, string> = {
  signature: "Signature Dishes",
  starters: "Traditional Starters",
  beverages: "Beverages & Desserts",
};

const COLLECTION_IDS: Record<CollectionKey, string[]> = {
  signature: [
    "c-malabar-fish-curry",
    "c-potlam-biryani",
    "c-chettinad-chicken",
  ],
  starters: [
    "c-medu-vada",
    "c-koliwada-prawns",
    "c-gunpowder-dosa",
  ],
  beverages: [
    "c-filter-coffee",
    "c-payasam",
    "c-prakasham-special-tea",
  ],
};

/* =========================
   Page
   ========================= */
const CATS: Category[] = ["All", "Breakfast", "Lunch", "Dinner", "Specials"];

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const deepCat = (params.get("cat") as CollectionKey | null) ?? null;
  const inCollectionsMode = !!deepCat && deepCat in COLLECTION_LABEL;

  const [cat, setCat] = useState<Category>("All");

  const classicItems = useMemo(
    () => (cat === "All" ? DISHES : DISHES.filter((d) => d.category === cat)),
    [cat]
  );

  const collectionItems = useMemo(() => {
    if (!inCollectionsMode || !deepCat) return [];
    const ids = COLLECTION_IDS[deepCat];
    const set = new Set(ids);
    return DISHES.filter((d) => set.has(d.id)).sort(
      (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)
    );
  }, [inCollectionsMode, deepCat]);

  useEffect(() => { }, [inCollectionsMode]);

  return (
    <MotionSection className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
      <motion.h1
        variants={fadeInUp(0)}
        className="text-4xl md:text-5xl font-extrabold text-amber-400"
      >
        {inCollectionsMode ? COLLECTION_LABEL[deepCat as CollectionKey] : "Menu"}
      </motion.h1>

      <motion.p variants={fadeInUp(0.05)} className="mt-3 text-white/70">
        {inCollectionsMode
          ? "Curated selection from this collection."
          : "Our curated South Indian selection."}
      </motion.p>

      {!inCollectionsMode && (
        <motion.div
          variants={stagger(0.06, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {CATS.map((c) => (
            <motion.button
              key={c}
              variants={fadeInUp(0)}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition ${cat === c
                  ? "bg-amber-400 text-black"
                  : "bg-white/5 text-white hover:bg-white/10"
                }`}
              {...hoverLift}
            >
              {c}
            </motion.button>
          ))}
        </motion.div>
      )}

      <motion.div
        variants={stagger(0.07, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {(inCollectionsMode ? collectionItems : classicItems).map((d, i) => (
          <motion.article
            key={d.id}
            variants={fadeInUp(i * 0.05, 16)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            whileHover={hoverLift.whileHover}
            whileTap={hoverLift.whileTap}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-amber-300/60"
          >
            <ImageWithFallback
              src={d.image}
              alt={d.name}
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{d.name}</h3>
                <span className="shrink-0 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold text-black">
                  ₹{d.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/70">{d.desc}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <span className="rounded-full bg-white/10 px-2 py-1">
                  {d.category}
                </span>
                {d.spicy && (
                  <span className="rounded-full bg-red-500/20 px-2 py-1">
                    🌶 Spicy
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {inCollectionsMode && collectionItems.length === 0 && (
        <motion.p variants={fadeInUp(0.1)} className="mt-8 text-white/60">
          No dishes yet in this collection.
        </motion.p>
      )}

      {inCollectionsMode && (
        <motion.div variants={fadeInUp(0.1)} className="mt-10">
          <button
            onClick={() => navigate("/menu", { replace: true })}
            className="rounded-full bg-white/10 hover:bg-white/15 text-white px-4 py-2 text-sm"
          >
            ← Back to full menu
          </button>
        </motion.div>
      )}
    </MotionSection>
  );
}