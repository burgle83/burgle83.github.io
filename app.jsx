const { useState, useEffect, useRef } = React;

// ─── Parts & Product Data ────────────────────────────────────────────────────
const OIL_BRANDS = [
  // --- OEM ---
  { label: "── OEM ──", value: "", disabled: true },
  { label: "Subaru Genuine 0W-16 Synthetic (SOA427V3000)", value: "Subaru OEM 0W-16" },
  // --- Major Synthetics ---
  { label: "── Full Synthetic (Major Brands) ──", value: "", disabled: true },
  { label: "Mobil 1 Advanced Fuel Economy 0W-16", value: "Mobil 1 0W-16" },
  { label: "Pennzoil Platinum 0W-16 Full Synthetic", value: "Pennzoil Platinum 0W-16" },
  { label: "Pennzoil Ultra Platinum 0W-16 Full Synthetic", value: "Pennzoil Ultra Platinum 0W-16" },
  { label: "Castrol Edge 0W-16 Advanced Full Synthetic", value: "Castrol Edge 0W-16" },
  { label: "Valvoline Advanced Full Synthetic 0W-16", value: "Valvoline 0W-16" },
  { label: "Valvoline Extended Protection 0W-16", value: "Valvoline Ext Protection 0W-16" },
  { label: "Shell Rotella Gas Truck 0W-16 Full Synthetic", value: "Shell Rotella GT 0W-16" },
  // --- Premium / Specialty ---
  { label: "── Premium / Specialty ──", value: "", disabled: true },
  { label: "AMSOIL OE 0W-16 Synthetic", value: "AMSOIL OE 0W-16" },
  { label: "AMSOIL Signature Series 0W-16 Synthetic", value: "AMSOIL Signature 0W-16" },
  { label: "Royal Purple 0W-16 High Performance", value: "Royal Purple 0W-16" },
  { label: "Liqui Moly Special Tec V 0W-16", value: "Liqui Moly 0W-16" },
  { label: "Red Line 0W-16 Full Synthetic", value: "Red Line 0W-16" },
  { label: "Motul 8100 ECO-lite 0W-16", value: "Motul 8100 0W-16" },
  // --- Budget / Store Brand ---
  { label: "── Budget / Store Brand ──", value: "", disabled: true },
  { label: "Idemitsu 0W-16 Full Synthetic", value: "Idemitsu 0W-16" },
  { label: "Amazon Basics 0W-16 Full Synthetic", value: "Amazon Basics 0W-16" },
  { label: "SuperTech (Walmart) 0W-16 Full Synthetic", value: "SuperTech 0W-16" },
  { label: "Kirkland Signature 0W-16 Full Synthetic", value: "Kirkland 0W-16" },
  { label: "Carquest 0W-16 Full Synthetic", value: "Carquest 0W-16" },
  { label: "O'Reilly Full Synthetic 0W-16", value: "O'Reilly 0W-16" },
  // --- Alt Viscosity (emergency) ---
  { label: "── 0W-20 (only if 0W-16 unavailable) ──", value: "", disabled: true },
  { label: "⚠ 0W-20 Conventional (temp substitute only)", value: "0W-20 CONVENTIONAL (temp)" },
  // --- Other ---
  { label: "── Other ──", value: "", disabled: true },
  { label: "Other (specify below)", value: "other" },
];

const OIL_FILTERS = [
  // --- OEM ---
  { label: "── Subaru OEM ──", value: "", disabled: true },
  { label: "Subaru 15208AA21A — current OEM (recommended)", value: "Subaru OEM 15208AA21A" },
  { label: "Subaru 15208AA20A — prior gen (compatible)", value: "Subaru OEM 15208AA20A" },
  { label: "Subaru 15208AA15A — superseded (compatible)", value: "Subaru OEM 15208AA15A" },
  { label: "Subaru 15208AA160 — black / Japan factory (compatible)", value: "Subaru OEM 15208AA160" },
  // --- Premium Aftermarket ---
  { label: "── Premium Aftermarket ──", value: "", disabled: true },
  { label: "K&N HP-1010 (reusable, 1\" nut for easy removal)", value: "K&N HP-1010" },
  { label: "K&N PS-1010 Pro Series", value: "K&N PS-1010" },
  { label: "Bosch 3323 Premium FILTECH", value: "Bosch 3323" },
  { label: "Bosch D3323 Distance Plus (extended life)", value: "Bosch D3323" },
  { label: "Purolator PBL14610 Boss (synthetic media)", value: "Purolator PBL14610" },
  { label: "Purolator PL14610 PureONE", value: "Purolator PL14610" },
  { label: "Royal Purple 10-2835 Extended Life", value: "Royal Purple 10-2835" },
  { label: "AMSOIL EA15K13 (15,000 mi capacity)", value: "AMSOIL EA15K13" },
  // --- Standard Aftermarket ---
  { label: "── Standard Aftermarket ──", value: "", disabled: true },
  { label: "Wix 57055 / Wix XP 57055XP", value: "Wix 57055" },
  { label: "NAPA Gold 7055 (same as Wix 57055)", value: "NAPA Gold 7055" },
  { label: "Fram XG7317 Ultra Synthetic", value: "Fram XG7317" },
  { label: "Fram PH7317 Extra Guard", value: "Fram PH7317" },
  { label: "Fram TG7317 Tough Guard", value: "Fram TG7317" },
  { label: "Mobil 1 M1-110A Extended Performance", value: "Mobil 1 M1-110A" },
  { label: "Motorcraft FL-910S", value: "Motorcraft FL-910S" },
  { label: "ACDelco PF64 UPF64R", value: "ACDelco PF64" },
  // --- Budget / Store Brand ---
  { label: "── Budget / Store Brand ──", value: "", disabled: true },
  { label: "SuperTech ST7317 (Walmart)", value: "SuperTech ST7317" },
  { label: "Carquest Premium 85060 / R85060", value: "Carquest 85060" },
  { label: "MicroGard MGL57055", value: "MicroGard MGL57055" },
  { label: "STP S7317 / S10590", value: "STP S7317" },
  // --- Cross-reference (other OEM that fit) ---
  { label: "── Cross-Reference (other OEM fits) ──", value: "", disabled: true },
  { label: "Mazda N3R1-14-302 (Tokyo Roki, well-regarded)", value: "Mazda N3R1-14-302" },
  // --- Other ---
  { label: "── Other ──", value: "", disabled: true },
  { label: "Other (specify below)", value: "other" },
];

const CABIN_FILTERS = [
  { label: "Subaru OEM 72880FN00A (2025 frameless)", value: "Subaru OEM 72880FN00A" },
  { label: "Bosch 6092C HEPA", value: "Bosch 6092C HEPA" },
  { label: "PureFlow PC99497HX HEPA", value: "PureFlow PC99497HX" },
  { label: "Wix WP10320", value: "Wix WP10320" },
  { label: "Other (specify below)", value: "other" },
];

const PARTS_CATALOG = [
  { category: "Engine Oil", items: [
    { name: "Required Oil", value: "0W-16 Full Synthetic" },
    { name: "Acceptable Substitute", value: "0W-20 Conventional (temp only)" },
    { name: "Oil Grade", value: "ILSAC GF-6A/GF-6B · API SP" },
    { name: "Capacity (with filter)", value: "4.7 US qt (4.4 L)" },
    { name: "Capacity (without filter)", value: "4.4 US qt (4.2 L)" },
    { name: "Drain Plug Gasket", value: "803916010" },
  ]},
  { category: "Oil Filter", items: [
    { name: "OEM Current", value: "15208AA21A" },
    { name: "OEM Superseded", value: "15208AA20A → 15208AA15A → 15208AA160" },
    { name: "Crush Gasket", value: "803916010" },
    { name: "Drain Plug Size", value: "17 mm head" },
    { name: "Bypass Pressure", value: "22-23 psi (OEM spec)" },
    { name: "── Cross-Ref ──", value: "──────────────" },
    { name: "K&N", value: "HP-1010 / PS-1010" },
    { name: "Bosch", value: "3323 / D3323 Distance Plus" },
    { name: "Purolator", value: "PBL14610 Boss / PL14610" },
    { name: "Wix / NAPA Gold", value: "57055 / 7055" },
    { name: "Fram", value: "XG7317 / PH7317 / TG7317" },
    { name: "Mobil 1", value: "M1-110A" },
    { name: "Mazda (Tokyo Roki)", value: "N3R1-14-302" },
    { name: "SuperTech", value: "ST7317" },
    { name: "MicroGard", value: "MGL57055" },
  ]},
  { category: "Cabin Air Filter", items: [
    { name: "OEM Filter (2025 new style)", value: "72880FN00A (frameless)" },
    { name: "OEM Charcoal Filter", value: "72880AJ010" },
    { name: "Replace Every", value: "12,000 miles" },
    { name: "⚠ Note", value: "2025 uses NEW frameless design — not same as 2024" },
  ]},
  { category: "Engine Air Filter", items: [
    { name: "Replace Every", value: "30,000 miles" },
    { name: "⚠ Note", value: "Dry-type filter — do NOT wash or oil" },
  ]},
  { category: "Spark Plugs", items: [
    { name: "OEM Plug", value: "NGK DILKAR7Q8" },
    { name: "Replace Every", value: "60,000 miles" },
    { name: "Qty Needed", value: "4" },
  ]},
  { category: "Windshield Wipers", items: [
    { name: "Driver Side", value: '26"' },
    { name: "Passenger Side", value: '16"' },
    { name: "Rear", value: '14"' },
    { name: "Attachment", value: "J-hook" },
  ]},
  { category: "Tires (Limited 18\")", items: [
    { name: "Limited Size", value: "225/55R18 98V" },
    { name: "Base/Premium (17\")", value: "225/60R17 99H" },
    { name: "Touring (19\")", value: "235/50R19 99V" },
    { name: "Front Pressure", value: "33 psi (230 kPa)" },
    { name: "Rear Pressure", value: "32 psi (220 kPa)" },
    { name: "Lug Nut Torque", value: "89 lb-ft (120 N·m)" },
    { name: "Spare Tire", value: "T145/80D17 or T155/80D17 @ 60 psi" },
  ]},
  { category: "Brake Fluid", items: [
    { name: "Type", value: "FMVSS No. 116 — DOT 3 or DOT 4" },
    { name: "Replace Every", value: "30,000 miles" },
    { name: "⚠ Warning", value: "Never mix DOT 3 and DOT 4" },
  ]},
  { category: "Coolant", items: [
    { name: "Type", value: "Subaru Super Coolant (pre-filled)" },
    { name: "Capacity", value: "8.7 US qt (8.2 L)" },
    { name: "First Replace", value: "11 years / 137,500 miles" },
    { name: "Then Every", value: "6 years / 75,000 miles" },
    { name: "⚠ Warning", value: "Do NOT mix with other coolant brands" },
  ]},
  { category: "Differential Gear Oil", items: [
    { name: "Front Diff", value: "Subaru Extra MT — GL-5 75W-90 — 1.4 qt" },
    { name: "Rear Diff", value: "GL-5 75W-90 — 0.8 qt" },
  ]},
  { category: "Battery & Electrical", items: [
    { name: "12V Battery", value: "Q-85" },
    { name: "Alternator", value: "12V-130A" },
    { name: "Key Fob Battery", value: "CR2025" },
  ]},
  { category: "Bulbs", items: [
    { name: "Rear Turn Signal", value: "12V-21W — WY21W" },
    { name: "Door Step Light", value: "12V-5W — W5W" },
    { name: "Front Turn Signal", value: "12V-21W — WY21W (if equipped)" },
    { name: "Vanity Mirror", value: "12V-2W" },
    { name: "Headlights / DRL / Fog", value: "LED — consult dealer" },
  ]},
];

// ─── Schedule Data ───────────────────────────────────────────────────────────
const mkItems = (ids) => ids.map(([id,task,type,ft]) => ({id,task,type,formType:ft}));
const SCHEDULE = [
  {miles:6000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["tires","Tire rotation","service","check"]])},
  {miles:12000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["tires","Tire rotation","service","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"]])},
  {miles:18000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["tires","Tire rotation","service","check"]])},
  {miles:24000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["tires","Tire rotation","service","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"],["alt","Inspect alternator and starter motor","inspect","check"]])},
  {miles:30000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["airfilter","Replace engine air cleaner element","replace","generic"],["brakefluid","Replace brake fluid (DOT 3 or DOT 4)","replace","generic"],["tires","Tire rotation","service","check"],["belt","Inspect drive belt(s)","inspect","check"],["fuel","Inspect fuel systems, lines & connections","inspect","check"],["cooling","Inspect cooling system, hoses & connections","inspect","check"]])},
  {miles:36000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["tires","Tire rotation","service","check"],["cvt","Inspect CVT fluid","inspect","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"]])},
  {miles:42000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["tires","Tire rotation","service","check"]])},
  {miles:48000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["tires","Tire rotation","service","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"],["alt","Inspect alternator and starter motor","inspect","check"]])},
  {miles:54000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["tires","Tire rotation","service","check"]])},
  {miles:60000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["spark","Replace spark plugs — NGK DILKAR7Q8","replace","generic"],["brakefluid","Replace brake fluid (DOT 3 or DOT 4)","replace","generic"],["airfilter","Replace engine air cleaner element","replace","generic"],["tires","Tire rotation","service","check"],["belt","Inspect drive belt(s)","inspect","check"],["fuel","Inspect fuel systems, lines & connections","inspect","check"],["cooling","Inspect cooling system, hoses & connections","inspect","check"],["wheel","Inspect wheel bearings","inspect","check"],["clutch","Inspect clutch operation","inspect","check"]])},
  {miles:66000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["tires","Tire rotation","service","check"],["cvt","Inspect CVT fluid","inspect","check"]])},
  {miles:72000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["fuelfilter","Replace fuel filter (dealer recommended)","replace","generic"],["tires","Tire rotation","service","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"]])},
  {miles:78000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["tires","Tire rotation","service","check"]])},
  {miles:84000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["tires","Tire rotation","service","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"]])},
  {miles:90000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["airfilter","Replace engine air cleaner element","replace","generic"],["brakefluid","Replace brake fluid (DOT 3 or DOT 4)","replace","generic"],["tires","Tire rotation","service","check"],["belt","Inspect drive belt(s)","inspect","check"],["fuel","Inspect fuel systems, lines & connections","inspect","check"],["cooling","Inspect cooling system, hoses & connections","inspect","check"]])},
  {miles:96000, items:mkItems([["oil","Replace engine oil (0W-16 synthetic)","replace","oil"],["filter","Replace engine oil filter","replace","oilfilter"],["cabin","Replace cabin air filter","replace","cabinfilter"],["tires","Tire rotation","service","check"],["cvt","Inspect CVT fluid","inspect","check"],["brakes","Inspect brake lines & brake systems","inspect","check"],["pads","Inspect disc brake pads & discs","inspect","check"],["axle","Inspect axle boots and joints","inspect","check"],["steering","Inspect steering and suspension","inspect","check"],["clutch","Inspect clutch operation","inspect","check"],["wheel","Inspect wheel bearings","inspect","check"]])},
];

const WARRANTY = [
  {n:"Basic",c:"3 yr / 36k mi"},{n:"Powertrain",c:"5 yr / 60k mi"},{n:"Hybrid Battery",c:"8 yr / 100k mi"},{n:"Corrosion",c:"5 yr / ∞ mi"},{n:"CA PZEV",c:"15 yr / 150k mi"},
];

const DEFAULT = {vehicle:{vin:"",color:"",trim:"Limited",purchaseDate:"",dealership:"",stockNumber:"",licensePlate:"",currentMiles:""},logs:[],receipts:[]};
const fmt = m => m.toLocaleString();

async function load(){
  try{
    const r=localStorage.getItem("forester-v2");
    return r?JSON.parse(r):null;
  }catch(e){console.log("Storage read skipped:",e)}
  return null;
}
async function save(s){
  try{
    localStorage.setItem("forester-v2",JSON.stringify(s));
  }catch(e){console.log("Storage write skipped:",e)}
}

const I={
  sched:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>,
  log:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  parts:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
  car:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>,
  chk:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>,
  plus:<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M12 5v14m-7-7h14"/></svg>,
  trash:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  cam:<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><circle cx="12" cy="13" r="3"/></svg>,
  dn:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>,
  wr:<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  book:<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
};

function App(){
  const[pg,setPg]=useState("schedule");
  const[st,setSt]=useState(DEFAULT);
  const[ok,setOk]=useState(false);
  const[sv,setSv]=useState(false);
  useEffect(()=>{
    let mounted=true;
    const init=async()=>{
      try{
        const s=await load();
        if(mounted&&s)setSt(p=>({...DEFAULT,...s}));
      }catch(e){console.log("Init error:",e)}
      if(mounted)setOk(true);
    };
    init();
    // Fallback: if storage hangs, show app anyway after 500ms
    const t=setTimeout(()=>{if(mounted&&!ok)setOk(true)},500);
    return ()=>{mounted=false;clearTimeout(t)};
  },[]);
  const persist=n=>{setSt(n);setSv(true);save(n).then(()=>setTimeout(()=>setSv(false),600))};
  if(!ok) return (<div style={S.loadWrap}><div style={S.spin}/></div>);
  const tabs=[{id:"schedule",icon:I.sched,l:"Schedule"},{id:"log",icon:I.log,l:"Log"},{id:"parts",icon:I.parts,l:"Parts"},{id:"manual",icon:I.book,l:"Manual"},{id:"vehicle",icon:I.car,l:"My Car"}];
  return(
    <div style={S.shell}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}input:focus,textarea:focus,select:focus{border-color:#0369a1!important;box-shadow:0 0 0 2px rgba(3,105,161,.15)}`}</style>
      <header style={S.hdr}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={S.logo}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><div><h1 style={S.hdrT}>Forester Maintenance</h1><p style={S.hdrS}>2025 Subaru Forester Hybrid Limited</p></div></div>{sv&&<span style={S.svB}>Saving...</span>}</header>
      <nav style={S.nav}>{tabs.map(t=><button key={t.id} onClick={()=>setPg(t.id)} style={{...S.navBtn,...(pg===t.id?S.navA:{})}}><span style={{opacity:pg===t.id?1:.5}}>{t.icon}</span><span style={{fontSize:11,fontWeight:600}}>{t.l}</span></button>)}</nav>
      <main style={S.main}>
        {pg==="schedule"&&<SchedulePg st={st} persist={persist}/>}
        {pg==="log"&&<LogPg st={st} persist={persist}/>}
        {pg==="parts"&&<PartsPg/>}
        {pg==="manual"&&<ManualPg/>}
        {pg==="vehicle"&&<VehiclePg st={st} persist={persist}/>}
      </main>
    </div>
  );
}

// ─── Task Log Inline Form ────────────────────────────────────────────────────
function TaskForm({item,miles,onSave,onCancel}){
  const[f,setF]=useState({date:new Date().toISOString().split("T")[0],odometer:"",product:"",otherProduct:"",parts:[""],notes:"",cost:"",completed:false,receiptImg:null});
  const ref=useRef();
  const handleImg=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setF(p=>({...p,receiptImg:ev.target.result}));r.readAsDataURL(file)};
  const updPart=(i,v)=>{const p=[...f.parts];p[i]=v;setF({...f,parts:p})};
  const addPart=()=>setF({...f,parts:[...f.parts,""]});
  const rmPart=i=>{if(f.parts.length<=1)return;const p=[...f.parts];p.splice(i,1);setF({...f,parts:p})};
  const doSave=()=>{
    const product=f.product==="other"?f.otherProduct:f.product;
    const allParts=[product,...f.parts.filter(p=>p.trim())].filter(Boolean).join(" · ");
    onSave({id:Date.now(),milestoneLinked:miles,taskId:item.id,taskName:item.task,date:f.date,odometer:f.odometer,product:allParts,notes:f.notes,cost:f.cost,completed:item.formType==="check"?f.completed:true,receiptImg:f.receiptImg});
  };
  const ft=item.formType;
  return (
    <div style={{marginTop:8,padding:12,background:"#f8fafc",borderRadius:10,border:"1px solid #e2e8f0"}} onClick={e=>e.stopPropagation()}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        <div><label style={S.fL}>Date</label><input type="date" value={f.date} onChange={e=>setF({...f,date:e.target.value})} style={S.inp}/></div>
        <div><label style={S.fL}>Odometer</label><input type="number" placeholder={`${fmt(miles)}`} value={f.odometer} onChange={e=>setF({...f,odometer:e.target.value})} style={S.inp}/></div>
      </div>
      {ft==="oil"&&<div style={{marginBottom:8}}><label style={S.fL}>Oil Brand</label><select value={f.product} onChange={e=>setF({...f,product:e.target.value})} style={S.inp}><option value="">— Select oil —</option>{OIL_BRANDS.map((o,i)=>o.disabled?<option key={i} disabled style={{fontWeight:700,color:"#0369a1",background:"#f1f5f9"}}>{o.label}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select>{f.product==="other"&&<input style={{...S.inp,marginTop:4}} placeholder="Enter oil brand & weight" value={f.otherProduct} onChange={e=>setF({...f,otherProduct:e.target.value})}/>}</div>}
      {ft==="oilfilter"&&<div style={{marginBottom:8}}><label style={S.fL}>Oil Filter</label><select value={f.product} onChange={e=>setF({...f,product:e.target.value})} style={S.inp}><option value="">— Select filter —</option>{OIL_FILTERS.map((o,i)=>o.disabled?<option key={i} disabled style={{fontWeight:700,color:"#0369a1",background:"#f1f5f9"}}>{o.label}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select>{f.product==="other"&&<input style={{...S.inp,marginTop:4}} placeholder="Enter filter brand & part #" value={f.otherProduct} onChange={e=>setF({...f,otherProduct:e.target.value})}/>}</div>}
      {ft==="cabinfilter"&&<div style={{marginBottom:8}}><label style={S.fL}>Cabin Air Filter</label><select value={f.product} onChange={e=>setF({...f,product:e.target.value})} style={S.inp}><option value="">— Select filter —</option>{CABIN_FILTERS.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>{f.product==="other"&&<input style={{...S.inp,marginTop:4}} placeholder="Enter brand & part #" value={f.otherProduct} onChange={e=>setF({...f,otherProduct:e.target.value})}/>}</div>}
      {ft==="generic"&&<div style={{marginBottom:8}}><label style={S.fL}>Product / Part Used</label><input style={S.inp} placeholder="Brand, part #, qty..." value={f.product} onChange={e=>setF({...f,product:e.target.value})}/></div>}
      {ft==="check"&&<div style={{marginBottom:8,display:"flex",alignItems:"center",gap:8}}><div onClick={()=>setF({...f,completed:!f.completed})} style={{width:22,height:22,borderRadius:6,border:f.completed?"2px solid #059669":"2px solid #cbd5e1",background:f.completed?"#059669":"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>{f.completed&&<span style={{color:"#fff"}}>{I.chk}</span>}</div><span style={{fontSize:13,fontWeight:600,color:f.completed?"#059669":"#64748b"}}>{f.completed?"Completed":"Mark completed"}</span></div>}
      {/* Additional Materials / Parts */}
      <div style={{marginBottom:8}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
          <label style={S.fL}>{ft==="check"||ft==="generic"?"Materials / Parts":"Additional Materials"}</label>
          <button onClick={addPart} type="button" style={{background:"none",border:"1px solid #cbd5e1",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600,color:"#0369a1",cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>{I.plus} Add Part</button>
        </div>
        {f.parts.map((p,i) => (
          <div key={i} style={{display:"flex",gap:4,marginBottom:4}}>
            <input style={{...S.inp,flex:1}} placeholder={`Part ${i+1}: brand, part #, qty...`} value={p} onChange={e=>updPart(i,e.target.value)}/>
            {f.parts.length>1&&<button onClick={()=>rmPart(i)} type="button" style={{background:"none",border:"1px solid #fecaca",borderRadius:6,padding:"4px 6px",cursor:"pointer",color:"#ef4444",flexShrink:0}}>{I.trash}</button>}
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        <div><label style={S.fL}>Cost</label><input placeholder="$0.00" value={f.cost} onChange={e=>setF({...f,cost:e.target.value})} style={S.inp}/></div>
        <div><label style={S.fL}>Receipt</label><div style={{...S.inp,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,color:"#64748b"}} onClick={()=>ref.current.click()}>{I.cam}<span style={{fontSize:12}}>{f.receiptImg?"Added ✓":"Upload"}</span></div><input ref={ref} type="file" accept="image/*" onChange={handleImg} style={{display:"none"}}/></div>
      </div>
      {f.receiptImg&&<img src={f.receiptImg} alt="" style={{maxWidth:"100%",maxHeight:120,borderRadius:8,marginBottom:8,border:"1px solid #e2e8f0"}}/>}
      <div style={{marginBottom:8}}><label style={S.fL}>Notes</label><textarea rows={2} placeholder="Observations, issues..." value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} style={{...S.inp,resize:"vertical"}}/></div>
      <div style={{display:"flex",gap:6}}><button onClick={doSave} style={S.pri}>Save</button><button onClick={onCancel} style={S.sec}>Cancel</button></div>
    </div>
  );
}

// ─── Schedule Page ───────────────────────────────────────────────────────────
function SchedulePg({st,persist}){
  const[expM,setExpM]=useState(null);
  const[actTask,setActTask]=useState(null);
  const curMi=parseInt(st.vehicle.currentMiles)||0;
  const next=SCHEDULE.find(s=>s.miles>curMi)||SCHEDULE[0];
  const getLog=(mi,tid)=>st.logs.find(l=>l.milestoneLinked===mi&&l.taskId===tid);
  const allDone=mi=>{const s=SCHEDULE.find(x=>x.miles===mi);return s&&s.items.every(i=>getLog(mi,i.id))};
  const saveTask=log=>{persist({...st,logs:[log,...st.logs]});setActTask(null)};
  const delTask=(mi,tid)=>persist({...st,logs:st.logs.filter(l=>!(l.milestoneLinked===mi&&l.taskId===tid))});

  return(
    <div>
      {curMi>0&&<div style={S.nextBnr}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={S.nextDot}/><span style={{fontSize:11,fontWeight:700,color:"#065f46",textTransform:"uppercase",letterSpacing:".05em"}}>Next Service</span></div><div style={{fontSize:24,fontWeight:700,color:"#064e3b",fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{fmt(next.miles)} mi</div><div style={{fontSize:11,color:"#047857"}}>{fmt(next.miles-curMi)} mi away · Current: {fmt(curMi)} mi</div></div>}
      <div style={{display:"flex",gap:5,marginBottom:14,overflowX:"auto",paddingBottom:4}}>{WARRANTY.map((w,i)=><div key={i} style={{flexShrink:0,padding:"5px 9px",background:"#eff6ff",borderRadius:7,border:"1px solid #bfdbfe"}}><div style={{fontSize:9,fontWeight:700,color:"#1e40af",whiteSpace:"nowrap"}}>{w.n}</div><div style={{fontSize:10,color:"#1d4ed8",fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"}}>{w.c}</div></div>)}</div>
      <h2 style={S.secT}>Service Intervals</h2>
      <p style={{fontSize:11,color:"#64748b",margin:"-8px 0 12px"}}>Tap a milestone → tap any task to log it with parts & receipt</p>
      <div style={{display:"grid",gap:8}}>
        {SCHEDULE.map(s=>{
          const isN=s.miles===next.miles&&curMi>0,isD=allDone(s.miles),isO=expM===s.miles;
          const svc=s.items.filter(i=>i.type!=="inspect"),insp=s.items.filter(i=>i.type==="inspect");
          const logged=s.items.filter(i=>getLog(s.miles,i.id)).length;
          return(
            <div key={s.miles} style={{...S.mC,...(isN?S.mN:{}),...(isD?S.mD:{})}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setExpM(isO?null:s.miles)}>
                <div style={{display:"flex",alignItems:"center",gap:9}}>
                  {isD?<span style={S.dB}>{I.chk}</span>:isN?<span style={S.nB}>{I.wr}</span>:<span style={S.pB}>{String(s.miles/1000)}k</span>}
                  <div>
                    <span style={{fontSize:14,fontWeight:700,color:"#0f172a",fontFamily:"'JetBrains Mono',monospace"}}>{fmt(s.miles)} mi</span>
                    {isN&&<span style={S.nT}>NEXT</span>}
                    <div style={{fontSize:10,color:"#64748b",marginTop:1}}>
                      <span style={{color:logged===s.items.length?"#16a34a":"#64748b",fontWeight:logged===s.items.length?700:400}}>{logged}/{s.items.length} logged</span> · {svc.length} svc · {insp.length} inspect
                    </div>
                  </div>
                </div>
                <span style={{transform:isO?"rotate(180deg)":"",transition:"transform .2s"}}>{I.dn}</span>
              </div>
              {isO&&<div style={{marginTop:10,borderTop:"1px solid #e2e8f0",paddingTop:10}}>
                {[{label:"Replace / Service",items:svc},{label:"Inspect",items:insp}].map(g=>g.items.length>0&&<div key={g.label} style={{marginBottom:8}}>
                  <div style={{fontSize:10,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".06em",marginBottom:4}}>{g.label}</div>
                  {g.items.map(item=>{
                    const log=getLog(s.miles,item.id);const isA=actTask===`${s.miles}-${item.id}`;
                    return(<div key={item.id} style={{marginBottom:3}}>
                      <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 7px",borderRadius:7,cursor:"pointer",background:log?"#f0fdf4":isA?"#f1f5f9":"transparent",border:log?"1px solid #bbf7d0":"1px solid transparent",transition:"all .15s"}}
                        onClick={e=>{e.stopPropagation();if(!log)setActTask(isA?null:`${s.miles}-${item.id}`)}}>
                        <span style={{width:7,height:7,borderRadius:"50%",flexShrink:0,background:log?"#22c55e":item.type==="inspect"?"#3b82f6":"#ef4444"}}/>
                        <span style={{fontSize:12,color:log?"#166534":"#1e293b",flex:1}}>{item.task}</span>
                        {log?<div style={{display:"flex",alignItems:"center",gap:5}}>
                          <span style={{fontSize:10,color:"#16a34a",fontWeight:600}}>{new Date(log.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>
                          <button onClick={e=>{e.stopPropagation();delTask(s.miles,item.id)}} style={{background:"none",border:"none",color:"#d1d5db",cursor:"pointer",padding:1}}>{I.trash}</button>
                        </div>:<span style={{fontSize:10,color:"#94a3b8"}}>{isA?"▲":"Log ▼"}</span>}
                      </div>
                      {isA&&!log&&<TaskForm item={item} miles={s.miles} onSave={saveTask} onCancel={()=>setActTask(null)}/>}
                      {log&&log.product&&<div style={{marginLeft:22,fontSize:10,color:"#64748b",padding:"0 7px"}}>Used: {log.product}{log.cost?` · ${log.cost}`:""}</div>}
                      {log&&log.receiptImg&&<div style={{marginLeft:22,padding:"4px 7px"}}><img src={log.receiptImg} alt="" style={{maxHeight:60,borderRadius:6,border:"1px solid #e2e8f0"}}/></div>}
                    </div>);
                  })}
                </div>)}
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Log Page ────────────────────────────────────────────────────────────────
function LogPg({st,persist}){
  const[show,setShow]=useState(false);
  const[filt,setFilt]=useState("all");
  const[f,setF]=useState({date:new Date().toISOString().split("T")[0],odometer:"",milestoneLinked:"",taskName:"",parts:[""],notes:"",cost:"",receiptImg:null});
  const ref=useRef();
  const handleImg=e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=ev=>setF(p=>({...p,receiptImg:ev.target.result}));r.readAsDataURL(file)};
  const updPart=(i,v)=>{const p=[...f.parts];p[i]=v;setF({...f,parts:p})};
  const addPart=()=>setF({...f,parts:[...f.parts,""]});
  const rmPart=i=>{if(f.parts.length<=1)return;const p=[...f.parts];p.splice(i,1);setF({...f,parts:p})};
  const add=()=>{if(!f.date||!f.taskName)return;const product=f.parts.filter(p=>p.trim()).join(" · ");persist({...st,logs:[{...f,product,id:Date.now(),milestoneLinked:f.milestoneLinked?parseInt(f.milestoneLinked):null,taskId:"manual-"+Date.now()},...st.logs]});setF({date:new Date().toISOString().split("T")[0],odometer:"",milestoneLinked:"",taskName:"",parts:[""],notes:"",cost:"",receiptImg:null});setShow(false)};
  const del=id=>persist({...st,logs:st.logs.filter(l=>l.id!==id)});
  const ms=[...new Set(st.logs.map(l=>l.milestoneLinked).filter(Boolean))].sort((a,b)=>a-b);
  const fl=filt==="all"?st.logs:filt==="other"?st.logs.filter(l=>!l.milestoneLinked):st.logs.filter(l=>l.milestoneLinked===parseInt(filt));

  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <h2 style={S.secT}>Maintenance Log</h2>
        <button onClick={()=>setShow(!show)} style={S.addBtn}>{I.plus} Add</button>
      </div>
      <div style={{display:"flex",gap:5,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
        {[{v:"all",l:"All"},...ms.map(m=>({v:String(m),l:`${fmt(m)} mi`})),{v:"other",l:"Other"}].map(c=><button key={c.v} onClick={()=>setFilt(c.v)} style={{...S.chip,...(filt===c.v?S.chipA:{})}}>{c.l}</button>)}
      </div>
      {show&&<div style={S.fCard}>
        <h3 style={{margin:"0 0 12px",fontSize:14,fontWeight:700}}>New Entry</h3>
        <div style={{marginBottom:8}}><label style={S.fL}>Link to Milestone</label><select value={f.milestoneLinked} onChange={e=>setF({...f,milestoneLinked:e.target.value})} style={S.inp}><option value="">— Other (no milestone) —</option>{SCHEDULE.map(s=><option key={s.miles} value={s.miles}>{fmt(s.miles)} mi service</option>)}</select></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
          <div><label style={S.fL}>Date *</label><input type="date" value={f.date} onChange={e=>setF({...f,date:e.target.value})} style={S.inp}/></div>
          <div><label style={S.fL}>Odometer</label><input type="number" placeholder="miles" value={f.odometer} onChange={e=>setF({...f,odometer:e.target.value})} style={S.inp}/></div>
        </div>
        <div style={{marginBottom:8}}><label style={S.fL}>Work Performed *</label><textarea rows={2} value={f.taskName} onChange={e=>setF({...f,taskName:e.target.value})} style={{...S.inp,resize:"vertical"}} placeholder="What did you do?"/></div>
        <div style={{marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
            <label style={S.fL}>Materials / Parts</label>
            <button onClick={addPart} type="button" style={{background:"none",border:"1px solid #cbd5e1",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:600,color:"#0369a1",cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>{I.plus} Add Part</button>
          </div>
          {f.parts.map((p,i) => (
            <div key={i} style={{display:"flex",gap:4,marginBottom:4}}>
              <input style={{...S.inp,flex:1}} placeholder={`Part ${i+1}: brand, part #, qty...`} value={p} onChange={e=>updPart(i,e.target.value)}/>
              {f.parts.length>1&&<button onClick={()=>rmPart(i)} type="button" style={{background:"none",border:"1px solid #fecaca",borderRadius:6,padding:"4px 6px",cursor:"pointer",color:"#ef4444",flexShrink:0}}>{I.trash}</button>}
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
          <div><label style={S.fL}>Cost</label><input placeholder="$0.00" value={f.cost} onChange={e=>setF({...f,cost:e.target.value})} style={S.inp}/></div>
          <div><label style={S.fL}>Receipt</label><div style={{...S.inp,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,color:"#64748b"}} onClick={()=>ref.current.click()}>{I.cam}<span style={{fontSize:12}}>{f.receiptImg?"Added ✓":"Upload"}</span></div><input ref={ref} type="file" accept="image/*" onChange={handleImg} style={{display:"none"}}/></div>
        </div>
        {f.receiptImg&&<img src={f.receiptImg} alt="" style={{maxWidth:"100%",maxHeight:120,borderRadius:8,marginBottom:8}}/>}
        <div style={{marginBottom:8}}><label style={S.fL}>Notes</label><input value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} style={S.inp} placeholder="Additional notes"/></div>
        <div style={{display:"flex",gap:6}}><button onClick={add} style={S.pri}>Save Entry</button><button onClick={()=>setShow(false)} style={S.sec}>Cancel</button></div>
      </div>}
      {fl.length===0?<div style={S.empty}><span style={{fontSize:32}}>🔧</span><p style={{fontSize:13,fontWeight:600,color:"#475569",margin:"6px 0 2px"}}>No entries yet</p><p style={{fontSize:11,color:"#94a3b8",margin:0}}>Log from Schedule or add here</p></div>:
      <div style={{display:"grid",gap:8}}>{fl.map(l=><div key={l.id} style={S.logC}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div><div style={{fontSize:12,fontWeight:700,color:"#0f172a"}}>{new Date(l.date+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</div>
            <div style={{display:"flex",gap:5,marginTop:3,flexWrap:"wrap"}}>
              {l.odometer&&<span style={S.tag}>{fmt(parseInt(l.odometer))} mi</span>}
              {l.milestoneLinked&&<span style={{...S.tag,background:"#dbeafe",color:"#1d4ed8"}}>{fmt(l.milestoneLinked)} mi svc</span>}
              {l.cost&&<span style={{...S.tag,background:"#dcfce7",color:"#166534"}}>{l.cost}</span>}
            </div>
          </div>
          <button onClick={()=>del(l.id)} style={{background:"none",border:"none",color:"#d1d5db",cursor:"pointer",padding:2}}>{I.trash}</button>
        </div>
        <div style={{marginTop:6,fontSize:12,color:"#334155"}}>{l.taskName}</div>
        {l.product&&<div style={{marginTop:4,fontSize:11,color:"#64748b"}}>{l.product.includes(" · ")?l.product.split(" · ").map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,marginTop:i>0?2:0}}><span style={{width:4,height:4,borderRadius:"50%",background:"#94a3b8",flexShrink:0}}/>{p}</div>):<span>Parts: {l.product}</span>}</div>}
        {l.notes&&<div style={{marginTop:3,fontSize:11,color:"#94a3b8",fontStyle:"italic"}}>{l.notes}</div>}
        {l.receiptImg&&<img src={l.receiptImg} alt="" style={{marginTop:6,maxWidth:"100%",maxHeight:180,borderRadius:8,border:"1px solid #e2e8f0"}}/>}
      </div>)}</div>}
    </div>
  );
}

// ─── Parts Page ──────────────────────────────────────────────────────────────
function PartsPg(){
  const[q,setQ]=useState("");
  const[op,setOp]=useState(null);
  const fl=q?PARTS_CATALOG.filter(c=>c.category.toLowerCase().includes(q.toLowerCase())||c.items.some(i=>i.name.toLowerCase().includes(q.toLowerCase())||i.value.toLowerCase().includes(q.toLowerCase()))):PARTS_CATALOG;
  return(
    <div>
      <h2 style={S.secT}>Parts Quick Lookup</h2>
      <p style={{fontSize:11,color:"#64748b",margin:"-8px 0 12px"}}>From your 2025 Forester Hybrid Owner's Manual</p>
      <div style={{position:"relative",marginBottom:14}}><input placeholder="Search parts, filters, sizes..." value={q} onChange={e=>setQ(e.target.value)} style={{...S.inp,paddingLeft:34}}/><span style={{position:"absolute",left:10,top:9,color:"#94a3b8"}}>{I.parts}</span></div>
      <div style={{display:"grid",gap:7}}>
        {fl.map((c,ci)=>{const isO=op===ci||q.length>0;return(
          <div key={ci} style={{background:"#fff",borderRadius:10,border:"1px solid #e2e8f0",overflow:"hidden",boxShadow:"0 1px 2px rgba(0,0,0,.04)"}}>
            <div onClick={()=>setOp(isO&&!q?null:ci)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",cursor:"pointer"}}>
              <span style={{fontSize:13,fontWeight:700,color:"#0f172a"}}>{c.category}</span>
              <span style={{transform:isO?"rotate(180deg)":"",transition:"transform .2s"}}>{I.dn}</span>
            </div>
            {isO&&<div style={{padding:"0 14px 12px"}}>{c.items.map((item,ii)=><div key={ii} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"6px 0",borderTop:ii>0?"1px solid #f1f5f9":"none",gap:10,flexWrap:"wrap"}}>
              <span style={{fontSize:11,fontWeight:600,color:"#64748b"}}>{item.name}</span>
              <span style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",textAlign:"right",fontWeight:500,color:item.name.startsWith("⚠")?"#dc2626":"#0f172a"}}>{item.value}</span>
            </div>)}</div>}
          </div>
        )})}
      </div>
    </div>
  );
}

// ─── Manual Page ─────────────────────────────────────────────────────────────
const MANUAL_SECTIONS = [
  { title: "Quick Start & Break-In", icon: "🚗", entries: [
    { q: "Break-in period", a: "First 1,000 miles (1,600 km). Avoid full-throttle starts, sudden braking, and sustained high RPM. Vary your speed. This allows piston rings, bearings, and gears to properly seat." },
    { q: "First oil change", a: "Change oil and filter at or before 6,000 miles (or 6 months). Many owners do an early break-in change around 1,000–3,000 miles — not required but commonly recommended." },
    { q: "Required fuel", a: "Unleaded gasoline, 87 AKI (91 RON) minimum. Tank capacity: 16.6 gallons." },
    { q: "Required oil", a: "0W-16 full synthetic (ILSAC GF-6A/GF-6B, API SP). Only use 0W-20 conventional as a temporary substitute if 0W-16 is unavailable — return to 0W-16 at next change." },
  ]},
  { title: "Engine & Drivetrain", icon: "⚙️", entries: [
    { q: "Engine", a: "FB25 — 2.5L DOHC 16-valve horizontally-opposed (Boxer) 4-cylinder + electric hybrid motor. Naturally aspirated." },
    { q: "Transmission", a: "Lineartronic CVT (Continuously Variable Transmission) with manual mode (paddle shifters on Limited/Touring)." },
    { q: "AWD system", a: "Symmetrical All-Wheel Drive — full-time, active torque split." },
    { q: "Oil capacity", a: "4.7 US qt (4.4 L) with filter change. 4.4 US qt (4.2 L) without filter." },
    { q: "Coolant", a: "Subaru Super Coolant (long-life, pre-filled). 8.7 US qt total capacity. First change at 11 years / 137,500 mi, then every 6 years / 75,000 mi. Do NOT mix with other brands." },
    { q: "CVT fluid", a: "Subaru CVT Fluid — inspect at 36k/66k/96k miles. Do not use generic ATF." },
    { q: "Differential oil", a: "Front: GL-5 75W-90 (Subaru Extra MT), 1.4 qt. Rear: GL-5 75W-90, 0.8 qt." },
  ]},
  { title: "Tires & Wheels", icon: "🛞", entries: [
    { q: "Tire size (Limited 18\")", a: "225/55R18 98V" },
    { q: "Tire size (Base/Premium 17\")", a: "225/60R17 99H" },
    { q: "Tire size (Touring 19\")", a: "235/50R19 99V" },
    { q: "Tire pressure", a: "Front: 33 psi (230 kPa). Rear: 32 psi (220 kPa). Check cold." },
    { q: "Spare tire", a: "Temporary: T145/80D17 or T155/80D17 @ 60 psi max. Max speed 50 mph. Do NOT use for extended driving." },
    { q: "Lug nut torque", a: "89 lb-ft (120 N·m). Re-torque after first 1,000 miles if wheels were removed." },
    { q: "Rotation pattern", a: "Front-to-rear, same side (AWD requirement). Rotate every 6,000 miles. Keep all four tires within 2/32\" tread depth difference." },
  ]},
  { title: "Brakes", icon: "🛑", entries: [
    { q: "Brake fluid", a: "FMVSS No. 116 DOT 3 or DOT 4. Replace every 30,000 miles. Never mix DOT 3 and DOT 4." },
    { q: "Brake pad minimum thickness", a: "Replace when pad thickness reaches 1.0 mm (0.039 in) or less." },
    { q: "Brake disc minimum thickness", a: "Front: check owner's manual for exact spec. Replace if scored, grooved, or below minimum." },
    { q: "Parking brake", a: "Electronic parking brake (EPB). Engages/disengages automatically with auto-hold feature." },
  ]},
  { title: "Electrical & Battery", icon: "🔋", entries: [
    { q: "12V battery", a: "Q-85 (enhanced flooded battery for start-stop systems). Do NOT replace with a standard battery." },
    { q: "Hybrid battery", a: "Lithium-ion. Warranty: 8 years / 100,000 miles. No owner-serviceable components." },
    { q: "Alternator", a: "12V, 130A output." },
    { q: "Key fob battery", a: "CR2025. Replace when range decreases. Use mechanical key backup if fob dies." },
    { q: "Jump starting", a: "Connect positive (+) to battery terminal, negative (−) to engine ground bolt — NOT to hybrid components. See manual pg 563 for safe procedure." },
  ]},
  { title: "Lights & Wipers", icon: "💡", entries: [
    { q: "Headlights / DRL / Fog", a: "LED — not user-replaceable. Consult dealer." },
    { q: "Rear turn signal", a: "12V-21W, bulb type WY21W" },
    { q: "Door step light", a: "12V-5W, bulb type W5W" },
    { q: "Vanity mirror light", a: "12V-2W" },
    { q: "Wiper sizes", a: "Driver: 26\". Passenger: 16\". Rear: 14\". J-hook attachment." },
  ]},
  { title: "Fluids & Capacities", icon: "🧪", entries: [
    { q: "Engine oil", a: "0W-16 synthetic — 4.7 qt with filter" },
    { q: "Coolant", a: "Subaru Super Coolant — 8.7 qt" },
    { q: "Fuel tank", a: "16.6 US gallons (62.8 L)" },
    { q: "Brake fluid", a: "DOT 3 or DOT 4" },
    { q: "CVT fluid", a: "Subaru CVT Fluid (dealer service)" },
    { q: "Front differential", a: "GL-5 75W-90 — 1.4 qt" },
    { q: "Rear differential", a: "GL-5 75W-90 — 0.8 qt" },
    { q: "Washer fluid", a: "Use Subaru windshield washer fluid or equivalent. Do not use plain water (freezing risk)." },
  ]},
  { title: "Towing & Load", icon: "🏋️", entries: [
    { q: "Towing capacity", a: "1,500 lbs (680 kg) with proper hitch. Subaru-approved hitch recommended." },
    { q: "Roof rail load", a: "Refer to roof rail/crossbar specifications — typically ~150 lbs dynamic." },
    { q: "Flat towing", a: "Do NOT flat-tow (all four wheels on ground). Use a flatbed trailer or dolly with drive wheels off the ground." },
  ]},
  { title: "Hybrid System", icon: "⚡", entries: [
    { q: "Hybrid type", a: "Mild hybrid (e-BOXER). Electric motor assists the gas engine — not a plug-in hybrid." },
    { q: "Hybrid battery warranty", a: "8 years / 100,000 miles." },
    { q: "Regenerative braking", a: "Automatic — recovers energy during deceleration to charge hybrid battery." },
    { q: "Auto start-stop", a: "Engine shuts off at stops to save fuel. Requires Q-85 battery. Can be disabled per-trip via dashboard button." },
    { q: "Hybrid maintenance", a: "No additional maintenance required beyond standard schedule. Hybrid components are sealed and dealer-serviced only." },
  ]},
  { title: "Safety Systems (EyeSight)", icon: "👁️", entries: [
    { q: "EyeSight features", a: "Pre-collision braking, adaptive cruise control, lane departure warning, lane keep assist, lead vehicle start alert, automatic emergency steering." },
    { q: "EyeSight maintenance", a: "Keep windshield clean in front of cameras (top center). Do not apply tint or stickers in camera zone. Recalibrate after windshield replacement." },
    { q: "Tire pressure monitoring (TPMS)", a: "Direct sensors in each wheel. Warning light at ~25% below recommended pressure. Reset after inflation via dash menu." },
  ]},
  { title: "Warranty Coverage", icon: "📋", entries: [
    { q: "Basic warranty", a: "3 years / 36,000 miles — bumper-to-bumper" },
    { q: "Powertrain warranty", a: "5 years / 60,000 miles — engine, transmission, drivetrain" },
    { q: "Hybrid battery warranty", a: "8 years / 100,000 miles" },
    { q: "Corrosion (perforation)", a: "5 years / unlimited miles" },
    { q: "California emissions (PZEV)", a: "15 years / 150,000 miles (if applicable)" },
    { q: "Maintaining warranty with DIY", a: "You CAN do your own maintenance. Keep all receipts, log dates/mileage/parts used. Magnuson-Moss Warranty Act protects your right to self-service. Dealers cannot void warranty solely for using aftermarket parts — they must prove the part caused the failure." },
  ]},
  { title: "DIY Tips from the Manual", icon: "🔧", entries: [
    { q: "Oil drain plug", a: "17 mm head. Be careful NOT to drain the CVT fluid by mistake — the CVT drain is nearby. Confirm location before draining." },
    { q: "Oil filter location", a: "Top-mount (accessible from engine bay). Righty-tighty, lefty-loosey. Hand-tighten only — do not over-torque." },
    { q: "Cabin filter access", a: "Behind the glove box. Open glove box, squeeze sides inward to drop past stops, remove old filter, insert new one (2025 uses frameless design 72880FN00A)." },
    { q: "Engine air filter", a: "Driver's side of engine bay in a plastic housing. Unclip housing, remove old filter, insert new. Dry-type — do NOT wash or oil." },
    { q: "Jack points", a: "Factory jack: front — under the front crossmember. Rear — under rear differential. Use jack stands on the pinch welds for floor jack. Never work under vehicle supported only by the factory jack." },
    { q: "Wheel removal", a: "Loosen lugs before jacking. Lower spare from under rear cargo area. Torque to 89 lb-ft when reinstalling." },
  ]},
];

function ManualPg() {
  const [open, setOpen] = useState(null);
  const [q, setQ] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const fRef = useRef();

  // Load PDF from storage
  useEffect(() => {
    (async () => {
      try {
        const r = localStorage.getItem("forester-manual-pdf");
          if (r) setPdfData(r);
      } catch (e) { console.log("No stored PDF"); }
    })();
  }, []);

  const handlePdf = e => {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = async ev => {
      setPdfData(ev.target.result);
      try { localStorage.setItem("forester-manual-pdf", ev.target.result); } catch (e) { console.log("PDF too large for storage — available this session only"); }
    };
    r.readAsDataURL(file);
  };

  const removePdf = async () => {
    setPdfData(null); setShowPdf(false);
    try { localStorage.removeItem("forester-manual-pdf"); } catch (e) {}
  };

  const filtered = q ? MANUAL_SECTIONS.map(s => ({
    ...s,
    entries: s.entries.filter(e => e.q.toLowerCase().includes(q.toLowerCase()) || e.a.toLowerCase().includes(q.toLowerCase()))
  })).filter(s => s.entries.length > 0) : MANUAL_SECTIONS;

  if (showPdf && pdfData) {
    return (
      <div>
        <button onClick={() => setShowPdf(false)} style={{...S.sec, marginBottom: 12, display: "flex", alignItems: "center", gap: 5}}>← Back to Manual</button>
        <object data={pdfData} type="application/pdf" style={{ width: "100%", height: "75vh", borderRadius: 10, border: "1px solid #e2e8f0" }}>
          <p style={{ padding: 20, textAlign: "center", color: "#64748b", fontSize: 13 }}>PDF preview not supported in this browser. Try downloading the file instead.</p>
        </object>
      </div>
    );
  }

  return (
    <div>
      <h2 style={S.secT}>Owner's Manual</h2>
      <p style={{ fontSize: 11, color: "#64748b", margin: "-8px 0 12px" }}>Quick reference from your 2025 Forester Hybrid manual</p>

      {/* PDF Upload / View */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 12, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22 }}>📕</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{pdfData ? "PDF Attached" : "Attach Your Manual PDF"}</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>{pdfData ? "Tap View to open" : "Upload for quick access"}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {pdfData ? (
            <>
              <button onClick={() => setShowPdf(true)} style={{ ...S.pri, padding: "5px 12px", fontSize: 11 }}>View</button>
              <button onClick={removePdf} style={{ background: "none", border: "1px solid #fecaca", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: "#ef4444", fontSize: 11 }}>Remove</button>
            </>
          ) : (
            <button onClick={() => fRef.current.click()} style={{ ...S.pri, padding: "5px 12px", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>{I.plus} Upload</button>
          )}
          <input ref={fRef} type="file" accept="application/pdf" onChange={handlePdf} style={{ display: "none" }} />
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <input placeholder="Search manual topics..." value={q} onChange={e => setQ(e.target.value)} style={{ ...S.inp, paddingLeft: 34 }} />
        <span style={{ position: "absolute", left: 10, top: 9, color: "#94a3b8" }}>{I.parts}</span>
      </div>

      {/* Sections */}
      <div style={{ display: "grid", gap: 8 }}>
        {filtered.map((sec, si) => {
          const isO = open === si || q.length > 0;
          return (
            <div key={si} style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,.04)" }}>
              <div onClick={() => setOpen(isO && !q ? null : si)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{sec.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{sec.title}</span>
                  <span style={{ fontSize: 10, color: "#94a3b8" }}>{sec.entries.length}</span>
                </div>
                <span style={{ transform: isO ? "rotate(180deg)" : "", transition: "transform .2s" }}>{I.dn}</span>
              </div>
              {isO && (
                <div style={{ padding: "0 14px 12px" }}>
                  {sec.entries.map((e, ei) => (
                    <div key={ei} style={{ padding: "8px 0", borderTop: ei > 0 ? "1px solid #f1f5f9" : "none" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#0369a1", marginBottom: 2 }}>{e.q}</div>
                      <div style={{ fontSize: 11, color: "#334155", lineHeight: 1.5 }}>{e.a}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer links */}
      <div style={{ marginTop: 16, padding: 12, background: "#eff6ff", borderRadius: 8, border: "1px solid #bfdbfe" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e40af", marginBottom: 4 }}>Official Resources</div>
        <div style={{ fontSize: 11, color: "#1e3a5f", lineHeight: 1.7 }}>
          Subaru Vehicle Resources: subaru.com/owners/vehicle-resources<br />
          Subaru Technical Info (STIS): techinfo.subaru.com<br />
          Full manual download: Check your MySubaru account or dealer
        </div>
      </div>
    </div>
  );
}

// ─── Vehicle Page ────────────────────────────────────────────────────────────
function VehiclePg({st,persist}){
  const v=st.vehicle;const upd=(k,val)=>persist({...st,vehicle:{...st.vehicle,[k]:val}});
  const fields=[{k:"vin",l:"VIN",p:"e.g. JF2SKAUC1SH000000",t:"text"},{k:"color",l:"Exterior Color",p:"e.g. Crystal White Pearl",t:"text"},{k:"trim",l:"Trim Level",p:"Limited",t:"text"},{k:"purchaseDate",l:"Delivery Date",p:"",t:"date"},{k:"dealership",l:"Dealership",p:"e.g. Rafferty Subaru",t:"text"},{k:"stockNumber",l:"Stock / Order #",p:"",t:"text"},{k:"licensePlate",l:"License Plate",p:"e.g. ABC-1234",t:"text"},{k:"currentMiles",l:"Current Odometer (miles)",p:"0",t:"number"}];
  return(
    <div>
      <h2 style={S.secT}>My Vehicle</h2>
      <div style={S.fCard}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:12,borderBottom:"2px solid #e2e8f0"}}>
          <div style={{width:46,height:46,borderRadius:10,background:"linear-gradient(135deg,#0369a1,#0c4a6e)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg></div>
          <div><div style={{fontSize:15,fontWeight:700,color:"#0f172a"}}>2025 Subaru Forester Hybrid</div><div style={{fontSize:11,color:"#64748b"}}>{v.trim||"Limited"} · AWD · FB25 2.5L + Hybrid</div></div>
        </div>
        <div style={{display:"grid",gap:10}}>{fields.map(f=><div key={f.k}><label style={S.fL}>{f.l}</label><input type={f.t} placeholder={f.p} value={v[f.k]||""} onChange={e=>upd(f.k,e.target.value)} style={{...S.inp,...(f.k==="vin"?{fontFamily:"'JetBrains Mono',monospace",letterSpacing:".08em",textTransform:"uppercase"}:{})}}/></div>)}</div>
        <div style={{marginTop:16,padding:10,background:"#eff6ff",borderRadius:8,border:"1px solid #bfdbfe"}}><div style={{fontSize:11,fontWeight:700,color:"#1e40af",marginBottom:2}}>DIY Warranty Tip</div><div style={{fontSize:10,color:"#1e3a5f",lineHeight:1.6}}>Log directly from the Schedule tab — each task captures date, mileage, parts used, and receipt photos. This creates the documentation trail you need for warranty claims.</div></div>
      </div>
      <button onClick={()=>{if(confirm("Reset ALL data?"))persist(DEFAULT)}} style={{marginTop:16,padding:"9px 14px",background:"none",border:"1px solid #fca5a5",borderRadius:8,color:"#dc2626",fontSize:12,fontWeight:600,cursor:"pointer",width:"100%"}}>Reset All Data</button>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const S={
  shell:{fontFamily:"'DM Sans',sans-serif",maxWidth:640,margin:"0 auto",minHeight:"100vh",background:"#f1f5f9"},
  loadWrap:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#f1f5f9"},
  spin:{width:30,height:30,border:"3px solid #e2e8f0",borderTopColor:"#0369a1",borderRadius:"50%",animation:"spin .8s linear infinite"},
  hdr:{background:"linear-gradient(135deg,#0c4a6e,#075985,#0369a1)",padding:"12px 16px 10px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,.15)",display:"flex",justifyContent:"space-between",alignItems:"center"},
  logo:{width:36,height:36,borderRadius:9,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",justifyContent:"center"},
  hdrT:{fontSize:15,fontWeight:700,color:"#fff",margin:0},hdrS:{fontSize:10,color:"rgba(255,255,255,.6)",margin:0},
  svB:{fontSize:10,fontWeight:600,color:"#a7f3d0",background:"rgba(255,255,255,.1)",padding:"2px 9px",borderRadius:20},
  nav:{display:"flex",background:"#fff",borderBottom:"1px solid #e2e8f0",position:"sticky",top:58,zIndex:99},
  navBtn:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"7px 4px 5px",background:"none",border:"none",cursor:"pointer",borderBottom:"2px solid transparent",color:"#64748b"},
  navA:{color:"#0369a1",borderBottomColor:"#0369a1"},
  main:{padding:"12px 12px 32px"},
  secT:{fontSize:17,fontWeight:700,color:"#0f172a",margin:"0 0 10px"},
  nextBnr:{background:"linear-gradient(135deg,#d1fae5,#a7f3d0)",border:"1px solid #6ee7b7",borderRadius:11,padding:12,marginBottom:12},
  nextDot:{width:6,height:6,borderRadius:"50%",background:"#059669",display:"inline-block",boxShadow:"0 0 0 3px rgba(5,150,105,.2)"},
  mC:{background:"#fff",borderRadius:9,padding:"10px 12px",border:"1px solid #e2e8f0",boxShadow:"0 1px 2px rgba(0,0,0,.04)"},
  mN:{borderColor:"#059669",boxShadow:"0 0 0 2px rgba(5,150,105,.15)"},
  mD:{borderColor:"#86efac",background:"#f0fdf4"},
  dB:{width:24,height:24,borderRadius:6,background:"#22c55e",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  nB:{width:24,height:24,borderRadius:6,background:"#059669",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  pB:{width:24,height:24,borderRadius:6,background:"#f1f5f9",color:"#64748b",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:9,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"},
  nT:{fontSize:8,fontWeight:700,color:"#fff",background:"#059669",padding:"1px 5px",borderRadius:3,marginLeft:7,verticalAlign:"middle"},
  fCard:{background:"#fff",borderRadius:11,padding:16,marginBottom:14,border:"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0,0,0,.06)"},
  fL:{fontSize:10,fontWeight:600,color:"#475569",display:"block",marginBottom:2},
  inp:{padding:"7px 10px",border:"1px solid #cbd5e1",borderRadius:7,fontSize:12,color:"#0f172a",background:"#f8fafc",fontFamily:"'DM Sans',sans-serif",outline:"none",width:"100%",boxSizing:"border-box"},
  pri:{padding:"8px 18px",background:"#0369a1",color:"#fff",border:"none",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer"},
  sec:{padding:"8px 18px",background:"#f1f5f9",color:"#475569",border:"1px solid #e2e8f0",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer"},
  addBtn:{display:"flex",alignItems:"center",gap:4,padding:"6px 12px",background:"#0369a1",color:"#fff",border:"none",borderRadius:7,fontSize:12,fontWeight:600,cursor:"pointer"},
  chip:{padding:"4px 10px",background:"#fff",border:"1px solid #cbd5e1",borderRadius:20,fontSize:10,fontWeight:600,color:"#475569",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0},
  chipA:{background:"#0369a1",borderColor:"#0369a1",color:"#fff"},
  empty:{textAlign:"center",padding:"36px 18px",background:"#fff",borderRadius:11,border:"1px dashed #cbd5e1"},
  logC:{background:"#fff",borderRadius:9,padding:12,border:"1px solid #e2e8f0",boxShadow:"0 1px 2px rgba(0,0,0,.04)"},
  tag:{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,background:"#f1f5f9",color:"#475569"},
};
