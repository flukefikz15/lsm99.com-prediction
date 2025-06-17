// ตรวจสอบการล็อกอิน
document.addEventListener("DOMContentLoaded", function () {
    loadEventData();

    const userId = sessionStorage.getItem("loggedInUser");
    const userDisplay = document.getElementById("userId");

    if (!userId) {
        alert("กรุณาเข้าสู่ระบบก่อน!");
        window.location.href = "login.html";
    } else if (userDisplay) {
        userDisplay.textContent = userId;
    }
});

// ลิสต์เฉพาะแอดมินที่ได้รับอนุญาต
const validUserIds = ["adminlsm99", "user123", "manager99"]; // เพิ่มผู้ใช้ที่ได้รับอนุญาต

// ฟังก์ชันล็อกอิน
function login() {
    const inputId = document.getElementById("userIdInput").value.trim();
    const error = document.getElementById("error");

    if (!inputId) {
        error.textContent = "กรุณากรอก User ID";
        return;
    }

    const isValid = validUserIds.includes(inputId);

    if (isValid) {
        sessionStorage.setItem("loggedInUser", inputId);
        window.location.href = "admin-dashboard.html";
    } else {
        error.textContent = "User ID ไม่ถูกต้อง";
    }
}

// ฟังก์ชันล็อกอินแอดมิน
function adminLogin() {
    const user = document.getElementById("adminUser").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    // ควรใช้ระบบเข้ารหัสหรือ API แทนการเก็บรหัสผ่านในโค้ด
    if (user === "adminlsm99" && password === "99lsm145632+@") {
        sessionStorage.setItem("loggedInUser", user);
        alert("✅ เข้าสู่ระบบสำเร็จ!");
        window.location.href = "admin-dashboard.html";
    } else {
        alert("❌ User หรือ Password ไม่ถูกต้อง");
    }
}

// ฟังก์ชันตั้งค่ากิจกรรมโดยแอดมิน
function createEvent() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser || loggedInUser !== "adminlsm99") {
        alert("❌ คุณไม่มีสิทธิ์จัดกิจกรรม");
        return;
    }

    localStorage.removeItem("footballEvent");
    localStorage.removeItem("footballPrediction");

    const teamA = prompt("กรุณากรอกชื่อทีม A:");
    const teamB = prompt("กรุณากรอกชื่อทีม B:");
    if (!teamA || !teamB) {
        alert("❌ กรุณากรอกชื่อทีมให้ครบ");
        return;
    }

    localStorage.setItem("footballEvent", JSON.stringify({ teamA, teamB }));
    alert("✅ ตั้งชื่อทีมใหม่สำเร็จ!");

    // โหลดข้อมูลใหม่โดยไม่ต้องรีเฟรชหน้า
    loadEventData();
}

// ฟังก์ชันโหลดข้อมูลกิจกรรม
function loadEventData() {
    const eventData = localStorage.getItem("footballEvent");
    if (eventData) {
        const { teamA, teamB } = JSON.parse(eventData);

        // อัปเดตชื่อทีมในหัวข้อการแข่งขัน
        document.getElementById("teamAName").textContent = teamA;
        document.getElementById("teamBName").textContent = teamB;

        // อัปเดตชื่อทีมในตัวเลือก "ทีมใดจะยิงประตูก่อน?"
        const firstTeamInput = document.querySelector("#firstTeam");
        const secondTeamInput = document.querySelector("#secondTeam");
        const firstTeamLabel = document.querySelector("#firstTeamLabel");
        const secondTeamLabel = document.querySelector("#secondTeamLabel");

        if (firstTeamInput && secondTeamInput && firstTeamLabel && secondTeamLabel) {
            firstTeamInput.value = teamA; 
            secondTeamInput.value = teamB;
            firstTeamLabel.textContent = teamA;
            secondTeamLabel.textContent = teamB;
        }
    } else {
        document.getElementById("result").textContent = "❌ ไม่มีข้อมูลกิจกรรม กรุณาให้แอดมินตั้งค่ากิจกรรมใหม่";
    }
}

// ฟังก์ชันรีเฟรชข้อมูลกิจกรรมโดยอัตโนมัติ
function refreshUserData() {
    loadEventData(); 
}