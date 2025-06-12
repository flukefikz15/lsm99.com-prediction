// ตรวจสอบการล็อกอิน
document.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("loggedInUser");
  const userDisplay = document.getElementById("userId");

  if (!userId) {
    alert("กรุณาเข้าสู่ระบบก่อน!");
    window.location.href = "login.html";
  } else if (userDisplay) {
    userDisplay.textContent = userId;
  }
});

// ฟังก์ชันล็อกอิน
function login() {
  const inputId = document.getElementById("userIdInput").value.trim();
  const error = document.getElementById("error");

  if (!inputId) {
    error.textContent = "กรุณากรอก User ID"; // ป้องกันไม่ให้กรอกช่องว่าง
    return;
  }

  const isValid = validUserIds.includes(inputId); // ตรวจสอบว่า User ID อยู่ในลิสต์หรือไม่

  if (isValid) {
    sessionStorage.setItem("loggedInUser", inputId);
    window.location.href = "dashboard.html"; // ไปหน้าแดชบอร์ด
  } else {
    error.textContent = "User ID ไม่ถูกต้อง";
  }
}

// ฟังก์ชันทายผลกิจกรรม
function predict(choice) {
  document.getElementById("predictionResult").textContent = `คุณเลือก: ${choice}`;
}

// ฟังก์ชันเปลี่ยนหน้า
function goToPrediction() {
  window.location.href = "prediction.html";
}

// ฟังก์ชันออกจากระบบ
function logout() {
  sessionStorage.clear(); // ล้างข้อมูลทั้งหมด
  window.location.href = "login.html";
  location.reload(); // รีโหลดหน้าเพื่อเคลียร์ข้อมูล Session ที่อาจค้างอยู่
}

function goBack() {
  window.location.href = "dashboard.html";
}