// แปลงตัวเลขเป็นสกุลเงินบาท เช่น 1000 -> "฿1,000.00"
export function formatCurrency(amount) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
}

// แปลงวันที่จาก input type="date" (YYYY-MM-DD) เป็น DD/MM/YYYY
// หมายเหตุ: ไม่ใช้ toLocaleDateString('th-TH') เพราะจะได้ปี พ.ศ. (เช่น 2569) ไม่ใช่ปี ค.ศ.
export function formatDateForDisplay(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}
