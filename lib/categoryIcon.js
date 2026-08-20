// เดา emoji ที่เหมาะกับชื่อหมวดหมู่จากคำสำคัญ ไม่ต้องแม่นยำ 100% แค่ช่วยให้ดูออกไว ๆ
const CATEGORY_ICONS = [
  { keywords: ["อาหาร", "กิน", "ข้าว"], icon: "🍔" },
  { keywords: ["เดินทาง", "รถ", "น้ำมัน", "แท็กซี่"], icon: "🚗" },
  { keywords: ["เงินเดือน", "รายได้", "โบนัส"], icon: "💰" },
  { keywords: ["ของใช้", "ช้อปปิ้ง", "ซื้อของ"], icon: "🛒" },
  { keywords: ["ที่พัก", "บ้าน", "ค่าเช่า"], icon: "🏠" },
  { keywords: ["ค่าไฟ", "ค่าน้ำ", "บิล"], icon: "🧾" },
  { keywords: ["สุขภาพ", "หมอ", "ยา"], icon: "💊" },
  { keywords: ["บันเทิง", "หนัง", "เกม"], icon: "🎮" },
  { keywords: ["การศึกษา", "เรียน", "หนังสือ"], icon: "📚" },
  { keywords: ["ของขวัญ"], icon: "🎁" },
  { keywords: ["ท่องเที่ยว"], icon: "✈️" },
  { keywords: ["ออม"], icon: "🏦" },
  { keywords: ["โทรศัพท์", "มือถือ", "เน็ต"], icon: "📱" },
];

const DEFAULT_ICON = "🏷️";

export function getCategoryIcon(category) {
  const normalized = category.trim().toLowerCase();
  const match = CATEGORY_ICONS.find((group) =>
    group.keywords.some((keyword) => normalized.includes(keyword))
  );
  return match ? match.icon : DEFAULT_ICON;
}
